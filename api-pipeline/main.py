

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from scipy.sparse import hstack

app = FastAPI()

# Load saved models and preprocessors
rf_classifier = joblib.load('models/random_forest_model.pkl')
tfidf_vectorizer = joblib.load('models/tfidf_vectorizer.pkl')
label_encoder = joblib.load('models/label_encoder.pkl')

class NFTMetadata(BaseModel):
    success: bool
    message: str
    result: dict

@app.post("/predict/")
async def predict_nft_authenticity(metadata: NFTMetadata):
    try:
        # Extract 'result' object and create DataFrame
        data = metadata.result
        df = pd.DataFrame([data])

        # Fill missing fields with default values
        default_values = {
            'name': 'Unknown',
            'description': 'Unknown',
            'royalty': 0,
            'symbol': 'Unknown',
            'primary_sale_happened': False,
            'owner': 'Unknown'
        }
        for field, default in default_values.items():
            df[field] = df.get(field, default)

        # Preprocess the data
        name_tfidf = tfidf_vectorizer.transform(df['name'])
        description_tfidf = tfidf_vectorizer.transform(df['description'])

        try:
            symbol_encoded = label_encoder.transform(df['symbol'])
            primary_sale_happened_encoded = label_encoder.transform(df['primary_sale_happened'])
            owner_encoded = label_encoder.transform(df['owner'])
        except Exception as e:
            if "unseen labels" in str(e):
                raise HTTPException(status_code=400, detail="Unseen labels encountered. Please update the model.")
            raise e

        # Combine all features
        X = hstack([
            name_tfidf,
            description_tfidf,
            df[['royalty']].values,
            symbol_encoded.reshape(-1, 1),
            primary_sale_happened_encoded.reshape(-1, 1),
            owner_encoded.reshape(-1, 1)
        ])

        # Get the probability estimates
        probability = rf_classifier.predict_proba(X)
        authentic_probability = probability[0][1]

        return {"likelihood_score": authentic_probability}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

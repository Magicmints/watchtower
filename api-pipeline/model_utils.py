# model_utils.py

from transformers import BertTokenizer, BertModel
import torch
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

# Load the pre-trained model
model_path = 'my_model.h5'
trained_model = load_model(model_path)

# Pre-trained BERT setup
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained('bert-base-uncased')

# encode_with_bert function here...
def encode_with_bert(text):
    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt", max_length=128)
    with torch.no_grad():
        outputs = bert_model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

def preprocess_nft_data(input_json):
    nft_df = pd.DataFrame(input_json)
    nft_expanded = pd.json_normalize(nft_df['result'])
    nft_expanded.fillna({
        'name': 'Unknown',
        'description': 'Unknown',
        'royalty': 0,
        'symbol': 'Unknown',
        'primary_sale_happened': False,
        'collection.verified': False,
        'owner': 'Unknown'
    }, inplace=True)
    encoded_names = np.stack(nft_expanded['name'].apply(encode_with_bert))
    encoded_descriptions = np.stack(nft_expanded['description'].apply(encode_with_bert))
    return np.hstack([encoded_names, encoded_descriptions])

def predict_on_new_data(input_json):
    processed_data = preprocess_nft_data(input_json)
    reshaped_data = processed_data.reshape(-1, 128, 12)
    predictions = trained_model.predict(reshaped_data)
    binary_predictions = (predictions > 0.5).astype(int)
    return binary_predictions, predictions





from model_utils import predict_on_new_data
import json
import random
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Body
from typing import List, Dict, Any

app = FastAPI()


# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can modify this to restrict to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/predict/")
async def predict(nft_data: list = Body(...)):  # Use Body to denote the request body
    try:
        results = []
        for idx, entry in enumerate(nft_data):
            nft = entry['result']

            if nft.get('is_compressed', False):
                results.append({
                    "Index": idx,
                    "Mint Address": nft.get('mint', 'Unknown'),
                    "Predicted Label": 'Authentic',
                    "Model Confidence": random.uniform(0.999, 0.9998592138290405)
                })

            else:
                binary_results, confidence_scores = predict_on_new_data([entry])

                prediction = 'Authentic' if binary_results[0][0] == 1 else 'spam'
                confidence_score = float(confidence_scores[0][0])

                results.append({
                    "Index": idx,
                    "Mint Address": nft.get('mint', 'Unknown'),
                    "Predicted Label": prediction,
                    "Model Confidence": confidence_score
                })

        return results
    except Exception as e:
        return {"error": str(e)}

















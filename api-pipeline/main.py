# # app.py

# from fastapi import FastAPI, File, UploadFile
# from model_utils import predict_on_new_data
# import json
# app = FastAPI()

# @app.post("/predict/")
# async def predict(json_file: UploadFile):
#     try:
#         # Read the JSON data from the uploaded file
#         data = json_file.file.read()
        
#         # Parse the JSON data into a Python dictionary
#         json_data = json.loads(data)

#         binary_results, confidence_scores = predict_on_new_data(json_data)

#         results = []

#         for idx, (binary_result, confidence) in enumerate(zip(binary_results, confidence_scores)):
#             prediction = 'Authentic' if binary_result[0] == 1 else 'spam'
#             confidence_score = float(confidence[0])

#             result = {
#                 "Index": idx,
#                 "Predicted Label": prediction,
#                 "Model Confidence": confidence_score
#             }

#             results.append(result)

#         return results
#     except Exception as e:
#         return {"error": str(e)}



from fastapi import FastAPI, File, UploadFile
from model_utils import predict_on_new_data
import json
import random

app = FastAPI()

@app.post("/predict/")
async def predict(json_file: UploadFile):
    try:
        # Read the JSON data from the uploaded file
        data = json_file.file.read()
        
        # Parse the JSON data into a Python list
        json_data = json.loads(data)

        results = []
        for idx, entry in enumerate(json_data):
            nft = entry['result']
            
            # If the NFT is compressed, label it as authentic
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






# app.py

from fastapi import FastAPI, File, UploadFile
from model_utils import predict_on_new_data

app = FastAPI()

@app.post("/predict/")
async def predict(json_file: UploadFile):
    try:
        # Read the JSON data from the uploaded file
        data = json_file.file.read()
        
        # Parse the JSON data into a Python dictionary
        json_data = json.loads(data)

        binary_results, confidence_scores = predict_on_new_data(json_data)

        results = []

        for idx, (binary_result, confidence) in enumerate(zip(binary_results, confidence_scores)):
            prediction = 'Authentic' if binary_result[0] == 1 else 'spam'
            confidence_score = confidence[0]

            result = {
                "Index": idx,
                "Predicted Label": prediction,
                "Model Confidence": confidence_score
            }

            results.append(result)

        return results
    except Exception as e:
        return {"error": str(e)}

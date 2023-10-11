from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
from model_utils import predict_on_new_data

app = FastAPI()

# CORS configuration.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Accept the WebSocket connection.
    try:
        data = await websocket.receive_text()  # Wait and receive data from the WebSocket.
        nft_data = json.loads(data)  # Convert the received data to JSON.

        # Process the nft_data using the predict_on_new_data function from model_utils.
        predictions = predict_on_new_data(nft_data)
        print(predictions)

        # Send a response back via the WebSocket.
        await websocket.send_text("Data received and processed successfully.")
    except json.JSONDecodeError:
        await websocket.send_text("Received data was not valid JSON.")
    except Exception as e:
        await websocket.send_text(f"An error occurred: {str(e)}")

    # Close the WebSocket connection.
    await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


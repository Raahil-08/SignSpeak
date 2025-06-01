from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from hand_tracking_processor import HandTrackingProcessor
import cv2
import numpy as np
import base64
import json
from typing import List, Dict

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the hand tracking processor
processor = HandTrackingProcessor()

@app.websocket("/ws/hand-tracking")
async def hand_tracking_websocket(websocket: WebSocket):
    await websocket.accept()
    
    try:
        while True:
            # Receive the base64 encoded frame from the client
            data = await websocket.receive_text()
            frame_data = json.loads(data)
            base64_frame = frame_data['frame']
            
            # Decode base64 image
            img_bytes = base64.b64decode(base64_frame.split(',')[1])
            nparr = np.frombuffer(img_bytes, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Process the frame and get hand landmarks
            _, landmarks = processor.process_frame(frame)
            
            # Send the landmarks back to the client
            await websocket.send_json({
                'landmarks': landmarks
            })
            
    except Exception as e:
        print(f"Error in websocket connection: {e}")
    finally:
        await websocket.close()

@app.get("/")
def read_root():
    return {"status": "Hand tracking server is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

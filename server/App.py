# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os, time, json, base64
import cv2, numpy as np
from collections import deque
import mediapipe as mp
import joblib

# ---------- YOUR OWN helper -----------------
from preprocess_keypoints import preprocess_keypoints
from blur_detection import is_blurry            # keep if you need blur tagging

# ---------------------------------------------------------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# now explicitly add the Allow-Origin header on every response
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin']  = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
    return response

# ---------- paths / constants ----------------------------------------
RECORDINGS_DIR = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                              'recordings')
os.makedirs(RECORDINGS_DIR, exist_ok=True)

# ---------- load model + labels --------------------------------------
MODEL = joblib.load('random_forest_model.pkl')
with open('label_classes.txt') as f:
    LABELS = [ln.strip() for ln in f]

# ---------- runtime state --------------------------------------------
active_recordings = {}

# ---------- MediaPipe -------------------------------------------------
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.5,
)

def extract_keypoints(frame):
    """Return np array shape (1, 21, 3) or None if no hand."""
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    res = hands.process(rgb)
    if res.multi_hand_landmarks:
        lm = res.multi_hand_landmarks[0].landmark
        kp = np.array([[p.x, p.y, p.z] for p in lm]).reshape(1, 21, 3)
        return kp
    return None

# =====================================================================
#                           ROUTES
# =====================================================================

@app.post('/start-recording')
def start_recording():
    session_id = str(int(time.time()))
    session_dir = os.path.join(RECORDINGS_DIR, session_id)
    os.makedirs(session_dir, exist_ok=True)

    active_recordings[session_id] = {
        'frame_count': 0,
        'directory': session_dir,
        'start_time': time.time(),
        'metadata': request.json.get('metadata', {}),
    }
    return jsonify({
        'success': True,
        'session_id': session_id,
        'message': 'Recording session started',
    })


@app.post('/process-frame')
def process_frame():
    data = request.get_json(force=True)
    if 'frame' not in data:
        return jsonify({'error': 'No frame provided'}), 400

    # ------------ session bookkeeping --------------------------------
    session_id = data.get('session_id') or str(int(time.time()))
    session = active_recordings.setdefault(
        session_id,
        {'frame_count': 0, 'directory': os.path.join(RECORDINGS_DIR, session_id)}
    )
    frame_no = session['frame_count']

    # ------------ decode base64 --------------------------------------
    try:
        img_bytes = base64.b64decode(data['frame'].split(',')[-1])
        frame = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
    except Exception as e:
        return jsonify({'error': f'Bad image: {e}'}), 400

    # ------------ (optional) save frame ------------------------------
    blur_flag = is_blurry(frame, threshold=100.0)
    save_dir = os.path.join(session['directory'], 'blurry' if blur_flag else '')
    os.makedirs(save_dir, exist_ok=True)
    cv2.imwrite(os.path.join(save_dir, f'frame_{frame_no:06d}.jpg'), frame)

    # ------------ keypoints + model ----------------------------------
    letter = None
    kp = extract_keypoints(frame)
    if kp is not None:
        proc = preprocess_keypoints(kp)[0].reshape(1, -1)  # (1,63)
        idx = int(MODEL.predict(proc)[0])
        letter = LABELS[idx]

    session['frame_count'] += 1

    return jsonify({
        'success': True,
        'session_id': session_id,
        'frame_number': frame_no,
        'letter': letter,
    })


@app.post('/stop-recording')
def stop_recording():
    session_id = request.json.get('session_id')
    if not session_id or session_id not in active_recordings:
        return jsonify({'error': 'Invalid session ID'}), 400

    session = active_recordings.pop(session_id)
    duration = time.time() - session['start_time']

    meta = {
        'session_id': session_id,
        'frame_count': session['frame_count'],
        'duration_seconds': duration,
        'start_time': session['start_time'],
        'end_time': time.time(),
        'user_metadata': session.get('metadata', {}),
    }
    with open(os.path.join(session['directory'], 'metadata.json'), 'w') as f:
        json.dump(meta, f, indent=2)

    return jsonify({
        'success': True,
        'session_id': session_id,
        'frame_count': session['frame_count'],
        'duration_seconds': duration,
        'message': 'Recording stopped successfully',
    })


@app.get('/recordings')
def list_recordings():
    recs = []
    for sid in os.listdir(RECORDINGS_DIR):
        path = os.path.join(RECORDINGS_DIR, sid)
        if os.path.isdir(path):
            meta_file = os.path.join(path, 'metadata.json')
            if os.path.exists(meta_file):
                with open(meta_file) as f:
                    recs.append(json.load(f))
            else:
                count = len([f for f in os.listdir(path) if f.endswith('.jpg')])
                recs.append({'session_id': sid, 'frame_count': count, 'incomplete': True})
    return jsonify({'recordings': recs})

# =====================================================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)


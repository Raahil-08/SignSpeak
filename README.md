# 🧠 SignSpeak: Real-Time ASL Recognition System

> A production-ready American Sign Language recognition platform powered by computer vision and deep learning. Built for real-world mobile use. ✨

![Banner](./SignSpeak.png)

---

## 🚀 What It Does

SignSpeak is a cross-platform solution that:

* 🕐️ Recognizes ASL signs **in real-time**
* 📱 Runs on your **mobile phone** (React Native + Expo)
* 🧠 Leverages deep learning models on the backend (Flask)
* 🗪 Supports multiple recognition strategies:

  * Keypoint detection (MediaPipe)
  * CNN-based classification
  * Object detection (YOLOv5)

> 🎥 [Watch Model Demo Video](./Model_proof.mp4)

---

## 🗂 Project Structure

```
📆 SignSpeak
🔹 UI_expo/           # 📱 React Native mobile app (Expo)
🔹 server/            # 🧠 Python backend (Flask API)
🔹 models/            # 🧠 Trained ML models
🔹 Scripts/           # 🗪 Experimental/Training scripts
│   🔹 Keypoints/
│   🔹 YOLO/
│   └️ train/
🔹 docs/              # 📄 Documentation (optional)
🔹 deploy/            # ⚙️ Docker / Nginx configs
🔹 ASL Alphabet.jpg   # 📸 ASL Alphabet Reference
└️ requirements.txt   # 🐍 Python dependencies
```

---

## ⚙️ Quick Start

### 💪 1. Clone the Repo

```bash
git clone https://github.com/your-username/signspeak.git
cd signspeak
```

---

### 🧠 2. Run the Backend (Flask)

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
python App.py
```

Backend runs at: `http://localhost:5000`

---

### 📱 3. Run the Mobile App (Expo)

```bash
cd UI_expo
npm install
npx expo start
```

Scan the QR code with Expo Go app to test it live on your phone.

---

## 🧠 Model Proof

* 🔍 See it in action: [`Model_proof.mp4`](./Model_proof.mp4)
* 📸 Visuals used: [`ASL Alphabet.jpg`](./ASL%20Alphabet.jpg)

---

## 🔐 Security

* Backend API enforces HTTPS (in production)
* Input validation + sanitization
* Rate limiting enabled via middleware
* CORS handled securely

---

## 🐳 Deployment (Optional)

### Option 1: Docker

```bash
docker-compose up -d
```

### Option 2: Manual Prod Build

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 server.App:app
```

---

## 👀 Monitoring

* Health endpoints (e.g. `/ping`)
* Logs structured via Flask logging
* Docker healthcheck configured

---

## 🛠️ Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Frontend   | React Native (Expo)        |
| Backend    | Python Flask API           |
| CV/ML      | MediaPipe, OpenCV, YOLOv5  |
| Deployment | Docker, Gunicorn, Nginx    |
| Platform   | Mobile-first (Android/iOS) |

---

## 🙌 Contributing

Pull requests welcome! See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## 📖 License

MIT — free to modify and distribute.

---

## 📢 Contact / Support

* Create an [Issue](https://github.com/your-username/signspeak/issues)
* Use GitHub Discussions for help
* Email: [yourname@domain.com](mailto:yourname@domain.com)

---

> Made with ❤️ by Pratham Patel & Raahil Desai & Tashvi Patel

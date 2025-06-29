FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# ───── install system deps for OpenCV ─────
RUN apt-get update && apt-get install -y libgl1

# ───── install Python deps ─────
COPY requirements.txt .            
RUN pip install --no-cache-dir -r requirements.txt

# ───── copy source ─────
COPY . /app                        

EXPOSE 5050
CMD ["python", "App.py"]

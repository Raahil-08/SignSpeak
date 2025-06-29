FROM node:20

# ───── install new Expo CLI ─────
RUN npm install -g expo

WORKDIR /app

# deps
COPY package*.json ./

# source
COPY . /app

EXPOSE 19006
CMD ["npx", "expo", "start", "--web", "--host", "lan"]

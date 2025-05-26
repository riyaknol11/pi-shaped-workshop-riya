FROM node:18-alpine

LABEL org.opencontainers.image.source=https://github.com/riyaknol11/pi-shaped-workshop-riya

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY app.js .

EXPOSE 3000

USER node

CMD ["npm", "start"]
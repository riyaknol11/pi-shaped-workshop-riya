FROM node:18-alpine

LABEL org.opencontainers.image.source=https://github.com/riyaknol11/pi-shaped-workshop-yourname

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
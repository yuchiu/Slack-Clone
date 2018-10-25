FROM node:10.10
WORKDIR /app
COPY package.json .
RUN npm install
COPY build .
COPY .env .
CMD node server.js
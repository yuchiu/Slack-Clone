FROM node:10.10
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY build .
CMD node index.js
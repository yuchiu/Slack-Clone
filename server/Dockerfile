FROM node:10.10
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY dist .
CMD node index.js
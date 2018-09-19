FROM node:10.10
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
ENV NODE_ENV production
COPY build .
CMD node index.js
USER node
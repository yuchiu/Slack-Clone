# Slack Clone

## Tech Stack

### Client Side

    React ∙ Redux ∙ React-Redux ∙ React-Router ∙ React-Thunk ∙ Reselect ∙ Axios ∙ Jest ∙ SCSS ∙ Semantic UI

### Server Side

    Node ∙ TypeScript ∙ Express ∙ RESTful API ∙ Socket io ∙ Redis ∙ PostgreSQL ∙ Sequelize ∙ Jest ∙ Nginx ∙ Docker

## Environment & Required Softwares

- OS environment

  ```version
  ubuntu 18.04.1
  ```

- Required softwares and the versions this project is running on

  ```version
  npm            6.4.1
  nodejs         10.10.0
  postgres       10.5
  redis-server   4.0.3
  ```

- postgres client for version need to be installed globally

  ```npm
  npm install pg -global
  ```

- .env file is required for setting up environment variables  
  an example of .env file is located at ./server/.env

## Development Environment

### Server (Development)

- install dependencies

  ```npm ./server
  npm install
  ```

- optional: populate/reset Postgres database with initial seed data  
  seed configuration & schema is in dir ./server/seed

  ```npm ./server
  npm run seed
  ```

- for initial run on the machine, output a build directory  
  build directory will output to ./server/build

  ```npm ./server
  npm run build
  ```

- start application in server  
  server will be listening to [http://localhost:3030]

  ```npm ./server
  npm start
  ```

### Client (Development)

- install dependencies & start application in client  
  application will be running on [http://localhost:3000]

  ```npm ./client
  npm install
  npm start
  ```

## Production Environment

### Server (Production)

- install dependencies & output production build in server  
  production build directory will be output to ./server/build

  ```npm ./server
  npm install
  npm run build
  ```

#### Option A. Serve Application on Local Machine

- start server application with production build locally  
  server will be listening to [http://localhost:3030] by default

  ```npm ./server
  npm run serve
  ```

#### Option B. Serve Application with Nginx & Docker Container (Recommended)

- softwares required for this build

  ```version
  nginx            1.14.0
  docker           18.06.1-ce
  docker-compose   1.22.0
  ```

- build the Docker image as "slack-clone" with Dockerfile using the server's production build
  Docker build file is located at ./server/Dockerfile

  ```shell ./server
  sudo docker build -t slack-clone .
  ```

- start server application as Docker container locally using docker-compose  
  docker-compose file is located at ./server/docker-compose.yml
  server will be listening to [http://localhost:3030] by default

  ```shell ./server
  docker-compose up
  ```

### Client (Production)

- install dependencies & output production build in client  
  production build directory will be output to ./client/build

  ```npm ./client
  npm install
  npm run build
  ```

- serve client application with static server locally  
  static server will be running on [http://localhost:5000] by default

  ```npm ./client
  npm i -g serve
  npm run serve
  ```

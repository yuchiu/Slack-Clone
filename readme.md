# Slack Clone

- Required softwares and the versions this project is using

  ```version
  postgres 10.5
  npm 6.4.1
  nodejs 10.10.0
  ```

## Development Environment

### DataBases

- postgres needs to be setup first
- configuration for database is store in server/src/config/index.js
- PostgreSQL client also need to be install globally

  ```npm
  npm install pg -global
  ```

### Server (Development)

- install dependencies & start application in server  
  server will be listening to port 3030

  ```npm ./server
  npm install
  npm start
  ```

- populate postgres with sample data

  ```npm ./server
  npm run seed
  ```

### Client (Development)

- install dependencies & start application in client  
  application will be running on http://localhost:3000

  ```npm ./client
  npm install
  npm start
  ```

## Production Environment

### 1. Production Build

#### Client (Production)

- install dependencies & run production build in client  
  production build directory will be output to ./client/build

  ```npm ./client
  npm install
  npm run build
  ```

- move client production build directory as client into server's production build directory

  ```npm ./client
  npm run afterbuild
  ```

#### Server (Production)

- install dependencies & run production build in server  
  production build directory will be output to ./server/build
  the complete production include both frontend and backend will be contained inside server's build directory

  ```npm ./server
  npm install
  npm run build
  ```

### 2. Serving the Application

#### Option A. Local Machine

- start application with production build  
  server will be listening to port 3030

  ```npm ./server
  npm run serve
  ```

#### Option B. Docker Container

- Softwares required for this build

  ```version
  docker
  docker-compose
  ```

- create directories in server for volumes that allows docker containers to persist its data

  ```shell ./server
  mkdir pgdata files
  ```

- build the Docker image "slack-clone" using the production build

  ```shell ./server
  sudo docker build -t slack-clone .
  ```

- start application with docker-compose  
  server will be listening to [https://localhost]

  ```shell ./server
  docker-compose up -d
  ```

# Slack Clone

- Softwares required and versions this project is using

  ```shell
  postgres 10.5
  npm 6.4.1
  nodejs 10.10.0
  ```

## Development Environment

### DataBases

- postgres needs to be setup first  
  configuration for database is store in server/src/config/index.js

- PostgreSQL client also need to be install globally

  ```npm
  npm install pg -g
  ```

### Server(Development)

- install dependencies & start application in server
  server will be listening to port 3030

  ```npm
  npm install
  npm start
  ```

- populate postgres with sample data

  ```npm
  npm run seed
  ```

### Client(Development)

- install dependencies & start application in client
  application will be running on http://localhost:3000

  ```npm
  npm install
  npm start
  ```

## Production Environment

### 1. Production Build

#### Client(Production)

- install dependencies & run production build in client  
  production build directory will be output to ./client/build

  ```npm
  npm install
  npm run build
  ```

- move client production build directory as client into server's production build directory

  ```npm
  npm postbuild
  ```

#### Server(Production)

- install dependencies & run production build in server  
  production build directory will be output to ./server/build
  the complete production include frontend and backend will be contained inside server's build directory

  ```npm
  npm install
  npm run build
  ```

### 2. Serving the Application

#### Option A. Local Machine

- start application with production build  
  server will be listening to port 3030

  ```npm
  npm run serve
  ```

#### Option B. Docker Container

- Softwares required for this build

  ```shell
  docker
  docker-compose
  ```

- build the Docker image "slack-clone" using the production build

  ```shell
  sudo docker build -t slack-clone .
  ```

- start application with docker-compose
  server will be listening to [https://localhost]

  ```shell
  docker-compose up -d
  ```

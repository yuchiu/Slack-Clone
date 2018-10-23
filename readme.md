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
- configuration for database with sequelize is in server/src/config/sequelizeConfig.ts
- PostgreSQL client also need to be install globally

  ```npm
  npm install pg -global
  ```

### Server (Development)

- populate postgres with sample data & generate initial demo team in server/seed  
  All new users will join the initial demo team by default once they were registered  
  seed configuration & schema is in dir ./server/seed

  ```npm ./server
  npm run seed
  ```

- For initial run on the machine, install dependencies & Output build directory

  ```npm ./server
  npm install
  npm run initial-build
  ```

- start application in server  
  server will be listening to http://localhost:3030

  ```npm ./server
  npm start
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

#### Server (Production)

- install dependencies & run production build in server  
  production build directory will be output to ./server/build  
  the complete production include both frontend and backend will be contained inside server's build directory

  ```npm ./server
  npm install
  npm run build
  ```

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
  mkdir pgdata assets
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

# Slack Clone

- Required softwares and the versions this project is using

  ```version
  postgres 10.5
  npm 6.4.1
  nodejs 10.10.0
  ```

- postgres client need to be installed globally  
  configuration for postgres database with sequelize is in server/src/config/sequelizeConfig.ts

  ```npm
  npm install pg -global
  ```

## Development Environment

### Server (Development)

- install dependencies

  ```npm ./server
  npm install
  ```

- For initial run on the machine populate postgres with initial sample data & Output build directory  
  all new users will join the initial demo team by default once they were registered, seed configuration & schema is in dir ./server/seed  
  build directory will output to ./server/build as default

  ```npm ./server
  npm run seed
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

### Client (Production)

- install dependencies & run production build in client  
  production build directory will be output to ./client/build

  ```npm ./client
  npm install
  npm run build
  ```

- serve client application with static server  
  static server will be listening to port 5000 by default

  ```npm ./client
  npm i -g serve
  npm run serve
  ```

### Server (Production)

- install dependencies & run production build in server  
  production build directory will be output to ./server/build

  ```npm ./server
  npm install
  npm run build
  ```

#### Option A. serve application on local machine

- start server application with production build  
  server will be listening to port 3030 by default

  ```npm ./server
  npm run serve
  ```

#### Option B. serve application with Nginx & Docker Container

- Softwares required for this build

  ```version
  nginx
  docker
  docker-compose
  ```

- build the Docker image as "slack-clone" with Dockerfile using the production build

  ```shell ./server
  sudo docker build -t slack-clone .
  ```

- start application with docker-compose  
  server will be listening to [https://localhost]

  ```shell ./server
  docker-compose up
  ```

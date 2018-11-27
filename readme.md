# Slack Clone

## Quick Link

[Demo](#demo)

- [Live Site Demo](#live-site-demo)
- [Video Demo](#video-demo)

[Tech Stack](#tech-stack)

- [Client Side](#client-side)
- [Server Side](#server-side)

[System Architecture Diagram](#system-architecture-diagram)

- [Client Diagram](#client-diagram)
- [Server Diagram](#server-diagram)

[Required Development Tools](#required-development-tools)

[Development Environment](#development-environment)

- [Server Development](#server-development)
- [Client Development](#client-development)

[Production Environment](#production-environment)

- [Server Production](#server-production)
- [Client Production](#client-production)

---

## Demo

### Live Site Demo

Link: Not deployed yet

### Video Demo

![demogif](https://i.imgur.com/L7nUeVU.gif)

---

## Tech Stack

### Client Side

- Reactjs ∙ Redux ∙ React-Redux ∙ React-Router ∙ Redux-Thunk ∙ Reselect ∙ Axios ∙ Jest ∙ SCSS ∙ Semantic UI

### Server Side

- Nodejs ∙ TypeScript ∙ Expressjs ∙ RESTful API ∙ Socket io ∙ Redis ∙ PostgreSQL ∙ Sequelize ∙ Nginx ∙ Docker

---

## System Architecture Diagram

### Client Diagram

![client](https://i.imgur.com/iAgUV0i.jpg)

### Server Diagram

![server](https://i.imgur.com/WcDg0xQ.jpg)

---

## Required Development Tools

- **required development tools** and the versions this project is running on

  | Softwares                         | Versions   |
  | --------------------------------- | ---------- |
  | npm                               | 6.4.1      |
  | nodejs                            | 10.10.0    |
  | postgres                          | 10.5       |
  | redis-server                      | 4.0.3      |
  | **Optional for production build** |
  | nginx                             | 1.14.0     |
  | docker                            | 18.06.1-ce |
  | docker-compose                    | 1.22.0     |

---

## Development Environment

### Server Development

- postgres client for Nodejs need to be installed globally

  ```npm
  npm install pg -global
  ```

- **!important** .env file is required for setting up environment variables  
  an example of .env file is located at ./server/.env

- we are using default value for redis's environment variables in this application, modify accordingly to your environment

- postgres database needs to be setup first  
  Postgres configuration is stored in .env file, modifiy .env variables for your own environment  
  The list of default .env variable values this this application use:  
  PSQL_HOST(database host) = "localhost"  
  PSQL_NAME(database name) = "slack"  
  PSQL_USER(database admin username) = "postgres"  
  PSQL_PASS(database admin password) = "postgres"

* install Slack-Clone server's dependencies

  ```npm ./server
  cd slack-clone/server
  npm install
  ```

* **optional:** populate/reset Postgres database with initial seed data  
  seed configuration & schema is in dir ./server/seed

  ```npm ./server
  npm run seed
  ```

* for initial run on the machine, output a build directory  
  build directory will output to ./server/build

  ```npm ./server
  npm run build
  ```

* start application in server  
  server will be listening to [http://localhost:3030]

  ```npm ./server
  npm start
  ```

### Client Development

- install dependencies & start application in client  
  application will be running on [http://localhost:3000]

  ```npm ./client
  cd slack-clone/client
  npm install
  npm start
  ```

---

## Production Environment

### Server Production

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

- **!important**: client API url's port is set to **80** by default in its production build  
  change client API url's port setting to **3030** that's located at **./client/src/actions/services/API.js**

#### Option B. Serve Application with Nginx & Docker Container (Recommended)

- softwares required for this build

  | Softwares      | Versions   |
  | -------------- | ---------- |
  | nginx          | 1.14.0     |
  | docker         | 18.06.1-ce |
  | docker-compose | 1.22.0     |

- build the Docker image as "slack-clone" with Dockerfile using the server's production build
  Docker build file is located at ./server/Dockerfile

  ```shell ./server
  sudo docker build -t slack-clone .
  ```

- start server application as Docker container locally using docker-compose  
  docker-compose file is located at ./server/docker-compose.yml
  server will be listening to [http://localhost:80] by default

  ```shell ./server
  docker-compose up
  ```

### Client Production

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

# Slack Clone

## Quick Links

[Demo](#demo)

- [Live Site Demo](#live-site-demo)
- [Video Demo](#video-demo)

[Objectives](#objectives)

- [User Stories](#user-stories)
- [Future Expansions](#future-expansions)

[Tech Stack](#tech-stack)

[System Architecture Diagram](#system-architecture-diagram)

- [Client Diagram](#client-diagram)
- [Server Diagram](#server-diagram)

[Getting Started](#getting-started)

- [Prerequisites](#prerequisites)
- [Server Development Environment](#server-development-emvironment)
- [Client Development Environment](#client-development-environment)

[Testing](#testing)

[Production Deployment](#production-deployment)

- [Prerequisites](#prerequisites)
- [Server Production Deployment](#server-production-deployment)
- [Client Production Deployment](#client-production-deployment)

[Author](#author)

[License](#liscense)

[Acknowledgments](#acknowledgments)

---

## Demo

### Live Site Demo

[Link](http://yuchiu-slack.surge.sh)

### Video Demo

![demogif](https://i.imgur.com/L7nUeVU.gif)

---

## Objectives

- single page application with React and its ecosystem
- Flexbox and CSS Grid for UI layout
- User authentications with sessions and OAuth2
- Real time messaging and file sharing
- cache SQL queries and static files for optimized performance
- loading balancing for scalability
- Containerized with Docker

### User Stories

- users can register and log in to their account
- users can edit his/her profile info, including profile image & password
- users can create team
- teams description can be edited only by admin
- users can invite people to join their team
- users can create channel inside his/her team
- channels can be public or private for invited members only
- channels description can be edited by channel members
- users can create direct message or group message with other team members
- users can send real time message within channels or direct message
- users can share images, audio or text files to other users

### Future Expansions

- Splitting different functionalities into its own services to maximize resource allocations
- implemented more features in WebSocket instead of REST, similiar to Slack's implementation
- Implements more test coverage
- Optimization
  - More advanced webpack config
  - Prerendering

---

## Tech Stack

- [React](https://github.com/facebook/react) ∙ [React-Router](https://github.com/ReactTraining/react-router)
  - component based single page application
- [Redux](https://github.com/reduxjs/redux) ∙ [Redux-Thunk](https://github.com/reduxjs/redux-thunk) ∙ [Reselect](https://github.com/reduxjs/reselect)
  - client side data management
- [SCSS](https://sass-lang.com/) ∙ [Semantic UI](https://github.com/Semantic-Org/Semantic-UI-React)
  - Styling
- [Node.js](https://github.com/nodejs) ∙ [Express](https://github.com/expressjs/express) ∙ [TypeScript](https://github.com/Microsoft/TypeScript)
  - web server & services in service oriented architecure
- RESTful API ∙ [Socket.io](https://github.com/socketio/socket.io)
  - HTTP & WebSocket implementations
- [Redis](https://github.com/antirez/redis)
  - session store, cache SQL query results
- [Postgres](https://github.com/postgres/postgres) ∙ [Sequelize](https://github.com/sequelize/sequelize)
  - persisted database
- [Nginx](https://github.com/nginx/nginx)
  - load balancer, reverse proxy, caching static file
- [Docker](https://github.com/docker)
  - containerization

---

## System Architecture Diagram

### Client Diagram

![client](https://i.imgur.com/iAgUV0i.jpg)

### Server Diagram

![server](https://i.imgur.com/ZCWscsa.jpg)

---

## Getting Started

### Prerequisites

**!important** .env file is required for setting up environment variables for this project  
 an example of .env file client is using by default is located at ./client/.env  
 an example of .env file server is using by default is located at ./server/.env

#### Tools & Versions

| Softwares    | Versions |
| ------------ | -------- |
| npm          | 6.4.1    |
| nodejs       | 10.10.0  |
| postgres     | 10.5     |
| redis-server | 4.0.3    |

### Server Development Environment

- postgres client for Nodejs need to be installed globally

  ```npm
  npm install pg -global
  ```

* we are using default value for redis's environment variables in this application, modify accordingly to your environment in .env file

* postgres database needs to be setup first  
  Postgres configuration is stored in .env file, modifiy .env variables for your own environment

- install Slack-Clone server's dependencies

  ```npm ./server
  cd slack-clone/server
  npm install
  ```

- **optional:** populate/reset Postgres database with initial seed data  
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

#### Client Development Environment

- install dependencies & start application in client  
  application will be running on [http://localhost:3000]

  ```npm ./client
  cd slack-clone/client
  npm install
  npm start
  ```

---

## Testing

### Client

- Redux data flow are covered in the tests including actions, reducers, selectors

  ```npm ./client
  cd slack-clone/client
  npm install
  npm run test
  ```

---

## Production Deployment

### Prerequisites

#### Tools & Versions

| Softwares for Production Deployment | Versions   |
| ----------------------------------- | ---------- |
| nginx                               | 1.14.0     |
| docker                              | 18.06.1-ce |
| docker-compose                      | 1.22.0     |

### Server Production Deployment

- install dependencies & output production build in server  
  production build directory will be output to ./server/build

  ```npm ./server
  cd slack-clone/server
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
  change server port from **3030** to **80** in server's .env file

#### Option B. Serve Application with Nginx & Docker Container (Recommended)

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

### Client Production Deployment

- install dependencies & output production build in client  
  production build directory will be output to ./client/build

  ```npm ./client
  cd slack-clone/client
  npm install
  npm run build
  ```

- serve client application with static server locally  
  static server will be running on [http://localhost:5000] by default

  ```npm ./client
  npm i -g serve
  npm run serve
  ```

## Author

- Yu Chiu

---

## License

This project is licensed under the MIT License - see the LICENSE file for details

---

## Acknowledgments

- Project inspired by [Ben Awad](https://github.com/benawad)'s [Slack Clone](https://github.com/benawad/slack-clone-client).

- key differences are the followings:

  - Restructure Client and Server code base from ground zero
  - Use Redux as state management instead of Apollo
  - Use sessions and OAuth2 intead of JWT for authentications
  - Use RESTful and Socket.io instead of GraphQL and Redis Pub Sub for data transmission
  - Use TypeScript in Server instead of ES6 JavaScript
  - modified database schema for better performance
  - expanded functionalities including uploading profile image, sidebars, profile editing and so on

---

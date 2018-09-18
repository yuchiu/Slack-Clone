# Slack Clone

## Usage

### softwares this project is using during development

- postgres 10.5
- npm 6.4.1
- nodejs 10.10.0

### DataBases

- postgres needs to be setup first  
  configuration for database is in server/src/config/index.js

  ```dir
  /
  └─server
    └─src
      └─config
        └─index.js
  ```

### Web Server - Terminal A

#### development(Server)

- install dependencies & start application  
  server will be listening to port 3030

  ```npm
  npm install
  npm start
  ```

- populate postgres with sample data

  ```npm
  npm run seed
  ```

#### production

- production build, output dist directory

  ```npm
  npm run build
  ```

- start application with production build  
  server will be listening to port 3030

  ```npm
  npm run serve
  ```

### Web Client - Terminal B

#### development(Client)

- install dependencies & start application  
   application will be running on http://localhost:3000

  ```npm
  npm install
  npm start
  ```

  `

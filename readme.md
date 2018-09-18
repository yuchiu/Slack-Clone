# Usage

### softwares this project is using during development

```
postgres  10.5

npm       6.4.1
nodejs    10.10.0
```

### DataBases

- postgres needs to be setup first.
  server's configuration for database is in server/src/config/index.js

  ```
  /
  └─server
    └─src
      └─config
        └─index.js
  ```

### Web Server - Terminal A

#### development

- install dependencies & start application
  server will be listening to port 3030

  ```
  npm install
  npm start
  ```

- populate postgres with sample data

  ```
  npm run seed
  ```

#### production

- production build, output dist directory

  ```
  npm run build
  ```

- start application with production build
  server will be listening to port 3030

  ```
  npm run serve
  ```

### Web Client - Terminal B

#### development

- install dependencies & start application
  application will be running on http://localhost:3000

  ```
  npm install
  npm start
  ```

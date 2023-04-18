# CS3002 DS04 Backend Web Service

## Setup the Project

1. To install dependencies run the following command: 
```
mvn install
```
2. Add `serviceAccountKey.json` file provided by [Firebase console](https://console.firebase.google.com/u/1/project/ds04-7d54b/overview) at `src/main/resources/`
3. Open Ngrok and run the following command:
```
ngrok HTTP 8080
```

## Run the Application

1. To start the application, run the following command:
```
mvn run
```
2. Visit `http://localhost:8080/swagger-ui/index.html` for Swagger Documentation

## Run Tests

1. To run the test suite, run the following command:
```
mvn test
```
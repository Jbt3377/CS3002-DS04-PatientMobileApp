# CS3002 DS04 Patient Mobile Application

## Setup the Project

1. Create a `.env` file at `./src/main/ui/`
    - Add a variable `REACT_APP_LOCAL_BACKEND_BASE_URL` and set to the HTTPS URL provided by [Ngrok](https://ngrok.com/)
2. Add Firebase config values copied from [Firebase console](https://console.firebase.google.com/u/1/project/ds04-7d54b/overview) to `Firebase.js` file
    - Note: this cannot be abstracted to the `.env` file due to start up order 
3. Open terminal and install dependencies using:
```
npm install
```

## Run the Application

1. Open terminal and run:
```
expo start --clear
```
2. Using the ExpoGo app, scan the QR Code in the terminal

## Useful commands

- Use `prettier --write .` command to run Prettier formatting tool
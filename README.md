# CS3002-DS04-PatientMobileApp

## Description

This repository contains code which was developed in part of the **Mobile App for Colourimetric Analysis of Smart Wound Dressings for Patients** project.

Project consists of a mobile application allowing Patients to sign-up, record information about chronic wounds, and track the status of their wounds by recording captures of their wound dressings.
RGB Pixel values are extracted from chemical indicators on the surface of the wound dressing, and can be used for colourimetric analysis of CO2 absorbance.

Mobile app communicates with a backend web service which handles creating, reading, updating and deleting relevant data, as well as performing image processing and analysis of wound captures.

Backend service communicates with a NoSQL Firebase database which stores patient information, and handles storage of images and authentication of users.

## Repo Structure

This repo contains the mobile application, backend web service, mock wound dressings and meeting minutes

    .
    ├── ...
    ├── src
    │   ├── main
    │       ├── java/com/ds04/PatientMobileApp      # Java Backend Web Service
    │       └── ui                                  # React Native Mobile Application
    │   └── test
    │       └── java/com/ds04/PatientMobileApp      # Automated Tests
    ├── bandageMocks
    │   └── ...                                     # Mock Wound Dressings
    ├── meetingMinutes
    │   └── ...                                     # Meeting Minutes Sept 2022 - April 2023
    ├── .gitignore
    ├── README.md                                   # Documentation
    ├── LICENSE
    └── pom.xml

## Getting started

### Backend Java Web Service

- Install [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or higher
- Install [Maven 3.8](https://maven.apache.org/download.cgi) or higher
- Install [Ngrok v3](https://ngrok.com/download) for port-forwarding
- Install dependencies in `.\pom.xml`

### Frontend Expo App

- Install [Node.js 18](https://nodejs.org/en) or higher
- Install [ExpoGo](https://expo.dev/client) mobile app on an Android device
- Install dependencies in `.\src\main\ui\package.json`

### Firebase

- Request access to the [Firebase](https://firebase.google.com/) project by contacting jbeatty05@qub.ac.uk
- See README.md files in `.../main/ui` and `.../main/java/com/ds04/PatientMobileApp` for specific instructions on connecting each project to Firebase

### Recommended Tools

- Install [Git](https://git-scm.com/downloads)
- Install [IntelliJ](https://www.jetbrains.com/idea/) for java project
- Install [VS Code](https://code.visualstudio.com/) for react-native expo
- Install [Spotify](https://open.spotify.com/) for sanity

## Credits

Project completed by student Josh Beatty, with guidance from Dr Darryl Stewart of Queen's University Belfast.

For questions, please reach out to jbeatty05@qub.ac.uk

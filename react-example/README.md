# Overview

This is a simple web app that implements Manifest Bridge using React. After user exit the Manifest Bridge, the app retrieve the transfer status and renders on the home page.

Full documentation [here](https://manifest.stoplight.io/docs/documentation/199d301709248-embedding-bridge-inside-your-web-application#react)

## Prerequisite

- React >=16.8
- Valid credentials (If you have not yet signed up for an account, sign up [here](https://api.dashboard.usemanifest.com/))

## Get started

```
npm install
```

Equip the app with credentials
Copy the included .env.example to a file called .env

```
cp .env.example .env
```

Fill out the contents of the .env file with the client id and client secret in your Manifest Portal.

Complete the functions of fetching transfer intent reference and saving transfer data in lib/bridge.ts

Start the app

```
npm run start
```

The app will run on port 3000

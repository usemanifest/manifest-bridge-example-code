# Overview

This is a simple web app that implements Manifest Bridge using basic HTML and Javascript with an Express backend. After user exit the Manifest Bridge, the app retrieve the transfer status and renders on the home page.

Full documentation [here](https://manifest.stoplight.io/docs/documentation/199d301709248-embedding-bridge-inside-your-web-application#javascript)

## Prerequisite

- Stable version of Node
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

Start the server

```
npm run start
```

The app will run on port 8080

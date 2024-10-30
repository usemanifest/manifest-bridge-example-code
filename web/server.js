require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fetch = require("node-fetch");

const apiURL =
  process.env.BRIDGE_ENVIRONMENT === "production"
    ? "https://api.usemanifest.com/v1" // PROD URL is under progress
    : "https://api.development.usemanifest.com/v1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/transfer_check", async (_, res) => {
  res.sendFile(path.join(__dirname, "transfer-check.html"));
});

app.get("/api/get_access_token", async (_, res) => {
  // Authenticate
  const response = await fetch(`${apiURL}/authentication`, {
    method: "POST",
    body: JSON.stringify({
      clientId: process.env.BRIDGE_CLIENT_ID,
      clientSecret: process.env.BRIDGE_CLIENT_SECRET,
    }),
  });

  try {
    const data = await response.json();
    res.json({ accesstoken: data.accessToken });
  } catch (e) {
    res.json(e);
  }
});

app.get("/api/get_client_id", async (_, res) => {
  // YOUR logic of getting clientid
  res.json({ clientId: process.env.BRIDGE_CLIENT_ID });
});

app.post("/api/create_transfer_intent", async (req, res) => {
  // FULL DATA REFERENCE HERE: https://manifest.stoplight.io/docs/api-reference/4i0a6agythco0-create-transfer-intent
  const userObject = {
    userId: "user-id",
    clientUserId: "client-user-id",
    email: "user-17263@example.com",
    phoneNumber: "+13334445555",
    firstName: "Jamie",
    middleName: "",
    lastName: "Smith",
  };
  const transferAccountObject = {
    accountType: "IRA",
    accountNumber: "account-number",
    acceptsRothFunds: "YES",
    providerName: "InvestCo",
    created: "2024-06-20T14:15:22Z",
  };
  const transferIntentObject = {
    mode: "TRANSFER_IN",
    transferAccount: transferAccountObject,
    accounts: [],
    user: userObject,
  };
  const transferIntentResponse = await fetch(`${apiURL}/transferIntents`, {
    method: "POST",
    body: JSON.stringify(transferIntentObject),
    headers: {
      Authorization: `Bearer ${req.body.accessToken}`,
    },
  });

  const data = await transferIntentResponse.json();
  res.json({ transferIntentId: data.transferIntentResponse.transferIntentId });
});

app.get("/api/get_user_id", async (_, res) => {
  // Your logic of getting user id (Manifest user id)
  res.json({ userId: "YOUR_USER_ID" });
});

app.post("/api/save_user_id", async(req, res)=>{
    // Your logic of saving user id - this is useful to retrieve user's transfer status
    res.json(true)
})

app.post("/api/save_transfer_id", async(req, res)=>{
  // Your logic of saving transfer id
  res.json(true)
})
app.listen(process.env.PORT || 8080);

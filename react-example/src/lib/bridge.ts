import axios from "axios";
const API_URL =
  import.meta.env.VITE_BRIDGE_ENVIRONMENT === "development"
    ? "https://api.development.usemanifest.com/v1"
    : "PROD_URL_TBC";
export const fetchBridgeAccessToken = async () => {
  // YOUR API of fetching bridge access token
  // MORE information about authentication
  // https://manifest.stoplight.io/docs/api-reference/qdc0yvckbu3ng-authenticate
  const authRes = await axios({
    baseURL: API_URL,
    url: '/authentication',
    data:{
      clientId: import.meta.env.VITE_BRIDGE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_BRIDGE_CLIENT_SECRET

    },
    method:'POST',
  })
  return authRes.data.accessToken
};

export const fetchBridgeTransferIntentReference = async () => {
  // YOUR API of fetching / creating transfer intent
  // MORE information about transfer intent reference:
  // https://manifest.stoplight.io/docs/api-reference/4i0a6agythco0-create-transfer-intent
  return "YOUR_TRANSFER_INTENT_REFERENCE";
};

export const onTransferCompleteHandler = async ({
  transferReference,
  userReference,
}: {
  transferReference: string;
  userReference: string;
}) => {
  // FETCH Transfer details: More information about fetching transfer details:
  // https://manifest.stoplight.io/docs/api-reference/eaapapk7ht2nb-get-transfer
  const transferDetailsRes = await axios.get(
    `${API_URL}/transfers?transferId=${transferReference}`,
    {
      headers: {
        Authentication: `Bearer YOUR TOKEN`,
      },
    }
  );
  // YOUR API of saving transfer data for future use
  console.log(transferDetailsRes);

  // FETCH User details: More information about fetching user details:
  // https://manifest.stoplight.io/docs/api-reference/g2f2gaho1zmfo-get-user
  const userDetailsRes = await axios.get(
    `${API_URL}/users?userId=${userReference}`,
    {
      headers: {
        Authentication: `Bearer YOUR TOKEN`,
      },
    }
  );
  console.log(userDetailsRes);
  // YOUR API of saving transfer data for future use
  return true;
};

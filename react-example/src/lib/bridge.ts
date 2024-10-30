import axios from "axios";
const API_URL =
  import.meta.env.VITE_BRIDGE_ENVIRONMENT === "development"
    ? "https://api.development.usemanifest.com/v1"
    : "https://api.usemanifest.com/v1";

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

export const fetchBridgeTransferIntentId = async () => {
  // YOUR API of fetching / creating transfer intent
  // MORE information about transfer intent id:
  // https://manifest.stoplight.io/docs/api-reference/4i0a6agythco0-create-transfer-intent
  return "YOUR_BRIDGE_ACCESS_TOKEN";
};

export const onTransferCompleteHandler = async ({
  transferId,
  userId,
}: {
  transferId: string[];
  userId: string;
}) => {
  // FETCH the user's transfer details: More information about fetching user transfer details:
  // https://manifest.stoplight.io/docs/api-reference/cf86p6qiar2lf-get-transfers
  const userDetailsRes = await axios.get(
    `${API_URL}/users/${userId}/transfers`,
    {
      headers: {
        Authentication: `Bearer YOUR_TOKEN`,
      },
    }
  );
  // YOUR API of saving transfer data for future use
  console.log(userDetailsRes);

  // OR

  // You can fetch transfer details one by one
  // https://manifest.stoplight.io/docs/api-reference/eaapapk7ht2nb-get-transfer
  const transferDetails = Promise.all(transferId.map((id: string) =>
   axios.get(`${API_URL}/transfer?transferId=${id}`,{
    headers: {
      Authentication: `Bearer YOUR_TOKEN`,
    },
    
    }),
  ),)
  console.log(transferDetails)

  // YOUR API of saving transfer data for future use
  return true;
};

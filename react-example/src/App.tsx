import { ManifestBridgeOnCloseData } from "react-manifest-bridge";
import "./App.css";
import { useEffect, useState } from "react";
import {
  fetchBridgeAccessToken,
  fetchBridgeTransferIntentReference,
  onTransferCompleteHandler,
} from "./lib/bridge";
import TransferIn from "./components/TransferIn";
import TransferStatus from "./components/TransferStatus";

function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [transferIntentReference, setTransferIntentReference] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransferCompleted, setIsTransferCompleted] = useState<boolean>(false);
  const [transferReference, setTransferReference] = useState<string>(
    ""
  );

  const onClose = ({
    transferData,
    transferStatus,
  }: ManifestBridgeOnCloseData) => {
    setIsTransferCompleted(transferStatus === "COMPLETED");

    const { transferReference: lTransferReference, userReference } = transferData;
    if (lTransferReference) {
      setTransferReference(lTransferReference);
    }
    if (lTransferReference && userReference) {
      onTransferCompleteHandler({ transferReference:lTransferReference, userReference });
    }
  };

  useEffect(() => {
    const init = async () => {
      const accessToken = await fetchBridgeAccessToken();
      setAccessToken(accessToken);
      const transferIntentReference =
        await fetchBridgeTransferIntentReference();
      setTransferIntentReference(transferIntentReference);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <>
      <h1>InvestCo</h1>
      {isTransferCompleted && transferReference ? (
        <TransferStatus
          clientId={import.meta.env.VITE_BRIDGE_CLIENT_ID}
          accessToken={accessToken}
          transferReference={transferReference}
          onCloseHandler={onClose}
        />
      ) : (
        !isLoading && (
          <TransferIn
            clientId={import.meta.env.VITE_BRIDGE_CLIENT_ID}
            accessToken={accessToken}
            onCloseHandler={onClose}
            transferIntentReference={transferIntentReference}
          />
        )
      )}
    </>
  );
}

export default App;

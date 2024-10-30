import { ManifestBridgeOnCloseData } from 'react-manifest-bridge';
import './App.css';
import { useEffect, useState } from 'react';
import {
  fetchBridgeAccessToken,
  fetchBridgeTransferIntentId,
  onTransferCompleteHandler,
} from './lib/bridge';
import TransferIn from './components/TransferIn';
import TransferStatus from './components/TransferStatus';

function App() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [transferIntentId, setTransferIntentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransferCompleted, setIsTransferCompleted] =
    useState<boolean>(false);

  const [userId, setUserId] = useState<string>();

  const onClose = ({
    transferData,
    transferStatus,
  }: ManifestBridgeOnCloseData) => {
    setIsTransferCompleted(transferStatus === 'COMPLETED');

    const { transferId: lTransferId, userId: lUserId } = transferData;

    if (transferStatus === 'COMPLETED' && lTransferId && lUserId) {
      setUserId(lUserId);
      onTransferCompleteHandler({
        transferId: lTransferId as string[],
        userId: lUserId,
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      const accessToken = await fetchBridgeAccessToken();
      setAccessToken(accessToken);
      const transferIntentId = await fetchBridgeTransferIntentId();
      setTransferIntentId(transferIntentId);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <>
      <h1>InvestCo</h1>
      {isTransferCompleted && userId ? (
        <TransferStatus
          clientId={import.meta.env.VITE_BRIDGE_CLIENT_ID}
          accessToken={accessToken}
          userId={userId}
          onCloseHandler={onClose}
        />
      ) : (
        !isLoading && (
          <TransferIn
            clientId={import.meta.env.VITE_BRIDGE_CLIENT_ID}
            accessToken={accessToken}
            onCloseHandler={onClose}
            transferIntentId={transferIntentId}
          />
        )
      )}
    </>
  );
}

export default App;

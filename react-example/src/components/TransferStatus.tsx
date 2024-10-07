import { FunctionComponent } from "react";
import { useManifestBridge } from "react-manifest-bridge";

import { TransferProps } from "../typings";

interface TransferStatusProps extends TransferProps {
  transferReference: string;
}
const TransferStatus: FunctionComponent<TransferStatusProps> = ({
    transferReference,
  onCloseHandler,
  accessToken,
  clientId,
}) => {
  const { open } = useManifestBridge({
    clientId,
    accessToken,
    transferReference,
    onClose: onCloseHandler,
    onError: (e) => console.error(e),
    environment: import.meta.env.VITE_BRIDGE_ENVIRONMENT,
  });

  return (
    <>
      <p>
        Good job in maximizing your retirement savings!
      </p>
      <button onClick={open}>Check status</button>
    </>
  );
};

export default TransferStatus;

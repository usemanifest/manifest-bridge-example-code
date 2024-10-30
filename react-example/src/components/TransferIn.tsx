import { FunctionComponent } from "react";
import { useManifestBridge } from "react-manifest-bridge";

import { TransferProps } from "../typings";

interface TransferInProps extends TransferProps {
  transferIntentId: string;
}
const TransferIn: FunctionComponent<TransferInProps> = ({
  transferIntentId,
  onCloseHandler,
  accessToken,
  clientId,
}) => {
  const { open } = useManifestBridge({
    clientId,
    accessToken,
    transferIntentId,
    onClose: onCloseHandler,
    onError: (e) => console.error(e),
    environment: import.meta.env.VITE_BRIDGE_ENVIRONMENT,
  });

  return (
    <>
      <p>
        Hi Jamie, transfer your old retirement accounts to maximize your
        retirement savings
      </p>
      <button onClick={open}>Transfer now</button>
    </>
  );
};

export default TransferIn;

import { ManifestBridgeOnCloseHandler } from "react-manifest-bridge"

export interface TransferProps {
    accessToken:string
    clientId:string
    onCloseHandler: ManifestBridgeOnCloseHandler
}
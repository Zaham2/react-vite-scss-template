import { useContext } from "react"
import { SocketContext } from "../lib/WebSocketContext"

export const useWebSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}

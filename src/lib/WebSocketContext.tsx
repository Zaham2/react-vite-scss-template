import { createContext, ReactNode } from "react"

export const SocketContext = createContext<WebSocket>(new WebSocket("ws://localhost:3001"))

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SocketContext.Provider value={new WebSocket("ws://localhost:3001")}>
            {children}
        </SocketContext.Provider>
    )
}

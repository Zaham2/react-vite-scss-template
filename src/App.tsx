import { useWebSocket } from "./hooks/useWebSocket"

function App() {
  
  
  const socket = useWebSocket()
  

  const handleClickStart = () => {
    console.log("clicked!")
    socket.send("Hello, server!")
  }

  const handleClickEnd = () => {
    console.log("clicked!")
    socket.send("Bye Bye, server!")
  }


  return (
    <>
      <button onClick={handleClickStart}>
        Click me to start
      </button>
      <button onClick={handleClickEnd}>
        Click me to end
      </button>
    </>
  )
}

export default App

import socket from "@/utils/socket";
import { FC, useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom: FC = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off('message')
    }
  }, [])

  const joinRoom = () => {
    if(room && username){
      socket.emit('joinRoom', room)
      setJoined(true)
    }
  }

  const sendMessage = (message: string) => {
    if(message && room && username){
      socket.emit('chatMessage', {room, user: username, message})
    }
  }

  return (
    <div className="flex fex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-2xl font-bold text-center">Real-time Chat App</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {joined ? (
          <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} />
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={joinRoom}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >Join Room</button>
          </div>
        )}
      </main>
    </div>
  )
}
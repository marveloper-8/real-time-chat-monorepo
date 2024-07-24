import { FC } from "react";

interface Message {
  user: string;
  message: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({messages}) => {
  return (
    <div className="flex-grow overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div key={index} className="mb-4">
          <div className="font-bold">{msg.user}</div>
          <div className="bg-gray-100 rounded-lg p-2">
            <p>{msg.message}</p>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
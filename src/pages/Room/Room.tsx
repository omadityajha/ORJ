import { useState } from 'react'

interface Message {
  id: number
  user: string
  text: string
  timestamp: Date
}

const Room = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'User 1', text: 'Hello, how are you?', timestamp: new Date(Date.now() - 3600000) },
    { id: 2, user: 'User 2', text: 'I\'m good, thanks for asking!', timestamp: new Date(Date.now() - 1800000) },
    { id: 3, user: 'User 1', text: 'What are you working on today?', timestamp: new Date(Date.now() - 900000) },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return

    const message: Message = {
      id: messages.length + 1,
      user: 'You',
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Room</h1>
      
      <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">General Chat</h2>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.user === 'You' ? 'bg-primary-100 text-primary-900' : 'bg-gray-100'}`}>
                  <div className="font-medium">
                    {message.user}
                    <span className="text-xs text-gray-500 ml-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="mt-1">{message.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Room
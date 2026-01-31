import { useState, useRef, useEffect, use } from 'react'
import './App.css'
import { io } from "socket.io-client";

function App() {

  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([
    /*{
      id:1,
      text: 'Hello! How can I assist you today?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }*/
  ])
  const [inputValue, setInputValue] = useState('')
  const [theme, setTheme] = useState('purple')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    // Add user message to history
    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([...messages, newMessage])
    
    socket.emit("ai-message", inputValue);

    setInputValue('')

  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }


  // Initialize socket connection
  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance)

    socketInstance.on("ai-message-response", (response)=>{

      const botMessage = {
        id: Date.now()+1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }//it is response from backend

      setMessages((prevMessages) => [...prevMessages, botMessage])//put in history array
    })
  }, [])

  return (
    <div className={`chat-container theme-${theme}`}>
      <div className="chat-header">
        <div className="header-content">
          <div className="header-title">
            <h1>💬 AI Assistant</h1>
            <p className="status-badge">Online</p>
          </div>
          <div className="theme-switcher">
            <button 
              className={`theme-btn ${theme === 'purple' ? 'active' : ''}`}
              onClick={() => setTheme('purple')}
              title="Purple Theme"
            >
              🟣
            </button>
            <button 
              className={`theme-btn ${theme === 'blue' ? 'active' : ''}`}
              onClick={() => setTheme('blue')}
              title="Blue Theme"
            >
              🔵
            </button>
            <button 
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              title="Dark Theme"
            >
              ⚫
            </button>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🤖</div>
            <h2>Welcome to AI Chat</h2>
            <p>Start a conversation by typing a message below</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-bubble">
                <div className="message-content">
                  <p>{message.text}</p>
                </div>
                <span className="message-time">{message.timestamp}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          ➤
        </button>
      </div>
    </div>
  )
}

export default App

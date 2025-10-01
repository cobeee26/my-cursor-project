import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading chats data
    const mockChats = [
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        role: "Mathematics Professor",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        lastMessage: "Please review the assignment guidelines before submitting.",
        time: "2:30 PM",
        unread: 2,
        online: true
      },
      {
        id: 2,
        name: "Study Group - Physics",
        role: "Group Chat",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        lastMessage: "Anyone available for the lab session tomorrow?",
        time: "1:45 PM",
        unread: 5,
        online: false
      },
      {
        id: 3,
        name: "Dr. Michael Brown",
        role: "Chemistry Professor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        lastMessage: "Great work on the lab report!",
        time: "11:20 AM",
        unread: 0,
        online: true
      },
      {
        id: 4,
        name: "Class Discussion - Biology",
        role: "Class Chat",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        lastMessage: "The exam will cover chapters 5-8",
        time: "10:15 AM",
        unread: 1,
        online: false
      }
    ];
    
    setTimeout(() => {
      setChats(mockChats);
      setSelectedChat(mockChats[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Simulate sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex"
    >
      {/* Chat List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-1/3 bg-white border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ backgroundColor: '#f8fafc' }}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-500">{chat.role}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 flex flex-col"
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img 
                  src={selectedChat.avatar} 
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-500">{selectedChat.role}</p>
                </div>
                <div className="ml-auto">
                  {selectedChat.online ? (
                    <span className="text-green-500 text-sm">Online</span>
                  ) : (
                    <span className="text-gray-500 text-sm">Offline</span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {[
                  { text: "Hello! I have a question about the assignment.", sender: "me", time: "2:25 PM" },
                  { text: "Hi! I'd be happy to help. What's your question?", sender: "other", time: "2:26 PM" },
                  { text: "I'm not sure about the formatting requirements for the lab report.", sender: "me", time: "2:27 PM" },
                  { text: "Please review the assignment guidelines before submitting. The format should follow APA style with proper citations.", sender: "other", time: "2:30 PM" }
                ].map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'me' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white text-gray-800 shadow-sm'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send
                </motion.button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Chat;

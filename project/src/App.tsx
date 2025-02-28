import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { fetchCDPAnswer } from './services/cdpService';

// Define types for our chat messages
type MessageType = 'user' | 'bot';

interface Message {
  id: string;
  type: MessageType;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I can help you with questions about Segment, mParticle, Lytics, and Zeotap. Ask me how to do something with these CDPs!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Fetch an answer from the CDP documentation
      const answer = await fetchCDPAnswer(input);
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: answer
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Sorry, I encountered an error while processing your question. Please try again.'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center">
          <Bot className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-xl font-semibold text-gray-800">CDP Knowledge Assistant</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 overflow-hidden max-w-4xl w-full mx-auto flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white shadow-sm rounded-bl-none'
                }`}
              >
                <div className="flex items-start">
                  {message.type === 'bot' && (
                    <Bot className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                  )}
                  {message.type === 'user' && (
                    <User className="h-5 w-5 ml-2 mt-0.5 flex-shrink-0 text-white order-last" />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm rounded-lg rounded-bl-none p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-500">Searching CDP documentation...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input form */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask how to do something with Segment, mParticle, Lytics, or Zeotap..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-3 text-center text-sm text-gray-500">
        <div className="max-w-4xl mx-auto">
          <p>Powered by documentation from Segment, mParticle, Lytics, and Zeotap</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
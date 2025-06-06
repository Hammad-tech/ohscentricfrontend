import { useState } from "react";
import { Send, Paperclip, Bot, User } from "lucide-react";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", message: "Hello! I'm Ohscentric. Ask me any workplace safety questions." }
  ]);
  const [promptsRemaining, setPromptsRemaining] = useState(3);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    if (promptsRemaining > 0) {
      setChatHistory([...chatHistory, { sender: "user", message }]);
      
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          sender: "bot", 
          message: "This is a demo response. In the actual application, I'll provide detailed information about workplace safety regulations and best practices based on your query."
        }]);
      }, 1000);
      
      setPromptsRemaining(promptsRemaining - 1);
    } else {
      setShowPaywall(true);
    }
    
    setMessage("");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100" id="chatbot">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Try Our Safety Chatbot</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant answers to your workplace safety questions. Try it now with 3 free prompts.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Ohscentric</h3>
                <div className="text-xs opacity-90">
                  {promptsRemaining > 0 ? 
                    `${promptsRemaining} free ${promptsRemaining === 1 ? 'prompt' : 'prompts'} remaining` : 
                    'Free prompts used'
                  }
                </div>
              </div>
            </div>
            <div className="text-xs bg-blue-500/20 px-2 py-1 rounded-full">
              AI Workplace Safety Assistant
            </div>
          </div>
          <div className="h-96 overflow-y-auto p-4 bg-gray-50/50">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[85%] ${chat.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-shrink-0 mt-1 ${chat.sender === "user" ? "ml-3" : "mr-3"}`}>
                    {chat.sender === "user" ? (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div 
                    className={`p-3 rounded-xl ${
                      chat.sender === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : "bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100"
                    }`}
                  >
                    <div className="text-sm">{chat.message}</div>
                    <div className={`text-xs mt-1 opacity-70 ${chat.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showPaywall ? (
            <div className="p-6 bg-gradient-to-b from-yellow-50 to-white border-t border-yellow-100 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
                <h4 className="font-semibold text-lg mb-2 text-gray-800">
                  You've used all your free prompts
                </h4>
                <p className="mb-4 text-gray-600">
                  Subscribe to our service to continue using Ohscentric and get unlimited access to workplace safety expertise.
                </p>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
                    Subscribe Now
                  </button>
                  <button 
                    onClick={() => setShowPaywall(false)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                  title="Attach file"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about workplace safety..."
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Ohscentric may produce inaccurate information about workplace safety regulations.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatBot;
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Menu, Settings, Crown, Zap, MessageSquare, Calendar, Plus, Trash } from "lucide-react";
import { sendMessageToGPT, streamMessageFromGPT } from "@/app/services/openaiService";

const ChatBotPage = () => {
  const [message, setMessage] = useState("");
  const [apiError, setApiError] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: "bot", 
      message: "👋 Welcome to Ohsist! I'm your AI workplace safety assistant. I can help you with safety regulations, compliance questions, risk assessments, and best practices. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  
  const [trialData, setTrialData] = useState(() => {
    const startDate = new Date();
    const today = new Date().toDateString();
    
    return {
      startDate,
      chatsUsedToday: 0,
      lastDate: today,
      isActive: true
    };
  });
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const getDaysRemaining = () => {
    const startDate = new Date(trialData.startDate);
    const currentDate = new Date();
    const diffTime = currentDate - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, 3 - diffDays);
  };

  const getChatsRemaining = () => {
    return Math.max(0, 3 - trialData.chatsUsedToday);
  };

  const isTrialExpired = () => {
    return getDaysRemaining() === 0 && getChatsRemaining() === 0;
  };

  const canSendMessage = () => {
    return getDaysRemaining() > 0 && getChatsRemaining() > 0;
  };

  const handleSubmit = async (e: any) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    if (!canSendMessage()) {
      setShowUpgradeModal(true);
      return;
    }

    const userMessage = {
      sender: "user",
      message: message.trim(),
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    setTrialData(prev => ({
      ...prev,
      chatsUsedToday: prev.chatsUsedToday + 1,
      lastDate: new Date().toDateString()
    }));

    try {
      const apiMessages = chatHistory.map(msg => ({
        role: msg.sender === "bot" ? "assistant" : "user",
        content: msg.message
      }));
      apiMessages.push({
        role: "user",
        content: message.trim()
      });

      if (chatHistory.length === 1) {
        apiMessages.unshift({
          role: "system",
          content: "You are Ohsist, an AI workplace safety assistant..."
        });
      }

      const botMessage = {
        sender: "bot",
        message: "",
        timestamp: new Date()
      };
    
      setChatHistory(prev => [...prev, botMessage]);
    
      await streamMessageFromGPT(apiMessages, (content: any) => {
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].message = content;
          return newHistory;
        });
      });
    } catch (error) {
      setApiError(error.message);
      const errorMessage = {
        sender: "bot",
        message: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const savedChat = localStorage.getItem('ohsist_chat_history');
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        const withDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setChatHistory(withDates);
      } catch (e) {
        console.error('Failed to parse saved chat', e);
      }
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 1) {
      const forStorage = chatHistory.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }));
      localStorage.setItem('ohsist_chat_history', JSON.stringify(forStorage));
    }
  }, [chatHistory]);

  {apiError && (
    <div className="max-w-3xl mx-auto px-4 py-2 bg-red-50 text-red-600 rounded-lg mb-4 text-sm">
      Error: {apiError}
    </div>
  )}

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {isTrialExpired() ? "Trial Expired" : "Daily Limit Reached"}
          </h3>
          <p className="text-gray-600">
            {isTrialExpired() 
              ? "Your 3-day free trial has ended. Upgrade to continue using Ohsist."
              : "You've used all 3 free chats for today. Upgrade for unlimited access."}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            Premium Features
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Unlimited daily conversations
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Advanced safety analysis
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Priority support
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Document upload & analysis
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
            Upgrade to Premium
          </button>
          <button 
            onClick={() => setShowUpgradeModal(false)}
            className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900">
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 w-64 h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-white">Chatbot</h2>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Trial</span>
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  {getDaysRemaining()} days
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {trialData.chatsUsedToday}/3 chats used today
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${(trialData.chatsUsedToday / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center text-sm">
                <MessageSquare className="w-4 h-4 mr-3" />
                Safety Regulations
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-3" />
                Risk Assessment
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center text-sm">
                <Settings className="w-4 h-4 mr-3" />
                Compliance Check
              </button>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to clear this conversation?')) {
                    setChatHistory([chatHistory[0]]);
                    localStorage.removeItem('ohsist_chat_history');
                  }
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center text-sm"
              >
                <Trash className="w-4 h-4 mr-3" />
                Clear Conversation
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center text-sm"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-semibold text-gray-800 dark:text-white">Ohsist AI</h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {getChatsRemaining()} free messages left
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4">
              {chatHistory.length === 1 && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Welcome to Ohsist AI
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                    Your AI workplace safety assistant. Ask me about safety regulations, compliance questions, risk assessments, and best practices.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                    <button 
                      onClick={() => setMessage("What are the basic OSHA requirements for my workplace?")}
                      className="p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-800 dark:text-white">OSHA Requirements</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Learn about workplace safety standards</div>
                    </button>
                    <button 
                      onClick={() => setMessage("How do I conduct a workplace risk assessment?")}
                      className="p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-800 dark:text-white">Risk Assessment</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Identify and evaluate workplace hazards</div>
                    </button>
                  </div>
                </div>
              )}
              <div className="py-8 space-y-8">
                {chatHistory.map((chat, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {chat.sender === "user" ? (
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-800 dark:text-white">
                            {chat.sender === "user" ? "You" : "Ohsist AI"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                          {chat.message}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="group">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-800 dark:text-white">Ohsist AI</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {!canSendMessage() && (
            <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {isTrialExpired() ? "Your free trial has ended." : "You've reached today's chat limit."}
                </p>
                <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md transition-colors"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}
          <div className="p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={canSendMessage() ? "Ask about workplace safety..." : "Upgrade to continue chatting..."}
                  disabled={!canSendMessage()}
                  className="w-full p-4 pr-16 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400"
                  rows="1"
                  style={{
                    minHeight: '56px',
                    maxHeight: '200px',
                    height: 'auto'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                />
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={!message.trim() || !canSendMessage()}
                  className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                Ohsist AI may produce inaccurate information. Always verify safety information with official sources.
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUpgradeModal && <UpgradeModal />}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatBotPage;
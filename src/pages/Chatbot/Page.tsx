import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Menu, Settings, Crown, Zap, MessageSquare, Calendar, Plus, Trash } from "lucide-react";
import { sendMessageToChatbot, testConnection } from "@/app/services/chatbotService";
import { useAuth } from "@/app/context/AuthContext";
import { useTrialData } from "@/app/hooks/useTrialData";
import stripeService from "@/app/services/stripeService";
import ReactMarkdown from 'react-markdown';

const ChatBotPage = () => {
  const [message, setMessage] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: "bot", 
      message: "👋 Welcome to Safety Chatbot! I'm your safety assistant. I can help you with safety regulations, compliance questions, and best practices. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  
  // Use the new trial data hook
  const { user, getAuthToken } = useAuth();
  const { trialData, refreshTrialData } = useTrialData();
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  // Test connection to FastAPI backend on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const token = await getAuthToken();
      const connected = await testConnection(token);
      setIsConnected(connected);
      if (!connected) {
        const apiUrl = import.meta.env.VITE_FASTAPI_URL || 'http://127.0.0.1:8000';
        setApiError(`Cannot connect to the chatbot backend. Please make sure your FastAPI server is running on ${apiUrl}`);
      } else {
        setApiError(null);
      }
    };
    checkConnection();
  }, [getAuthToken]);

  const getDaysRemaining = () => {
    return trialData?.trialDaysRemaining || 0;
  };

  const getChatsRemaining = () => {
    if (!trialData) return 0;
    if (trialData.plan === 'professional' || trialData.plan === 'admin') return Infinity;
    if (trialData.isUnlimited) return Infinity;
    return Math.max(0, trialData.dailyLimit - trialData.chatsUsedToday);
  };

  const isTrialExpired = () => {
    if (!trialData) return true;
    return !trialData.isActive || (getDaysRemaining() === 0 && getChatsRemaining() === 0);
  };

  const canSendMessage = () => {
    if (!trialData) return false;
    if (!trialData.isActive) return false;
    if (trialData.isUnlimited) return true;
    return getChatsRemaining() > 0;
  };

  const getStatusMessage = () => {
    if (!trialData) return "Loading...";
    
    if (trialData.plan === 'admin') {
      return '🔧 Admin Account - Unlimited Access';
    }
    
    if (trialData.plan === 'professional') {
      return '💼 Professional Plan - Unlimited Messages';
    }
    
    // For free/starter users
    if (!canSendMessage()) {
      return '🚫 Daily limit reached';
    }

    return `💬 ${getChatsRemaining()} messages remaining today`;
  };

  const getTrialMessage = () => {
    if (!trialData || trialData.plan === 'admin' || trialData.plan === 'professional') return null;
    
    if (trialData.trialDaysRemaining === -1) {
      return '♾️ Lifetime access';
    }
    
    if (trialData.trialDaysRemaining === 0) {
      return '⚠️ Trial expired';
    }
    
    return `📅 ${trialData.trialDaysRemaining} trial days remaining`;
  };

  const handleUpgradeToProffesional = async () => {
    setIsUpgrading(true);
    try {
      const successUrl = `${window.location.origin}/payment/success`;
      const cancelUrl = `${window.location.origin}/payment/cancel`;
      
      await stripeService.upgradeToProffesional(successUrl, cancelUrl);
      // User will be redirected to Stripe Checkout
    } catch (error) {
      console.error('Failed to start upgrade process:', error);
      setApiError('Failed to start upgrade process. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    if (!isConnected) {
      setApiError("Not connected to the backend. Please check if your FastAPI server is running.");
      return;
    }
    
    if (!canSendMessage()) {
      setShowUpgradeModal(true);
      return;
    }

    const userMessage = {
      sender: "user",
      message: message.trim(),
      timestamp: new Date()
    };
    
    // Create the updated history that includes the current user message
    const updatedHistory = [...chatHistory, userMessage];
    
    setChatHistory(updatedHistory);
    const currentMessage = message.trim();
    setMessage("");
    setIsTyping(true);
    setApiError(null);

    try {
      // Use the new FastAPI service with auth
      const token = await getAuthToken();
      const response = await sendMessageToChatbot(
        currentMessage, 
        updatedHistory, // ✅ Now passing the complete history including current user message
        token, 
        user?.id
      );
      
      const botMessage = {
        sender: "bot",
        message: response,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, botMessage]);
      
      // Refresh trial data to update usage count
      refreshTrialData();
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setApiError(`Error: ${errorMessage}`);
      const botErrorMessage = {
        sender: "bot",
        message: "Sorry, I encountered an error while processing your request. Please make sure the FastAPI backend is running and try again.",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, botErrorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Load user-specific chat history (this would come from your backend)
  useEffect(() => {
    const loadUserChatHistory = async () => {
      if (!user) return;
      
      try {
        // TODO: Replace with actual API call to load user's chat history
        // For now, using localStorage with user-specific key as fallback
        const userChatKey = `chat_history_${user.id}`;
        const savedChat = localStorage.getItem(userChatKey);
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
      } catch (error) {
        console.error('Failed to load user chat history:', error);
      }
    };

    loadUserChatHistory();
  }, [user]);

  // Save user-specific chat history
  useEffect(() => {
    if (chatHistory.length > 1 && user) {
      try {
        // TODO: Replace with actual API call to save user's chat history
        // For now, using localStorage with user-specific key as fallback
        const userChatKey = `chat_history_${user.id}`;
        const forStorage = chatHistory.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        }));
        localStorage.setItem(userChatKey, JSON.stringify(forStorage));
      } catch (error) {
        console.error('Failed to save user chat history:', error);
      }
    }
  }, [chatHistory, user]);

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
              ? "Your 3-day free trial has ended. Upgrade to continue using Ohscentric."
              : "You've used all 3 free chats for today. Upgrade for unlimited access."}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            Professional Plan - $19/month
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
          <button 
            onClick={handleUpgradeToProffesional}
            disabled={isUpgrading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpgrading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              'Upgrade to Professional'
            )}
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
              {trialData?.plan === 'professional' ? (
                // Professional Plan Display
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Plan</span>
                    <div className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Unlimited conversations
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                  </div>
                </>
              ) : (
                // Free Trial Display
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Trial</span>
                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {getDaysRemaining()} days
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {trialData?.chatsUsedToday || 0}/{trialData?.dailyLimit || 3} chats used today
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${trialData ? (trialData.chatsUsedToday / trialData.dailyLimit) * 100 : 0}%` }}
                    ></div>
                  </div>
                </>
              )}
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
                    if (user) {
                      localStorage.removeItem(`chat_history_${user.id}`);
                    }
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
            {trialData?.plan !== 'professional' && (
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center text-sm"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </button>
            )}
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
            <h1 className="font-semibold text-gray-800 dark:text-white">Ohscentric</h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {getStatusMessage()}
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
                    Welcome to Ohscentric
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                    Your AI workplace safety assistant. Ask me about safety regulations, compliance questions, risk assessments, and best practices.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                    <button 
                      onClick={() => setMessage("What are the basic OSH/WHS requirements for my workplace?")}
                      className="p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-800 dark:text-white">OSH/WHS Requirements</div>
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
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                    <div className={`max-w-[80%] rounded-xl px-4 py-2 ${chat.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100"}`}>
                      {chat.sender === "bot" ? (
                        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                          <ReactMarkdown
                            components={{
                              h1: (props) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                              h2: (props) => <h2 className="text-xl font-bold mb-3" {...props} />,
                              h3: (props) => <h3 className="text-lg font-bold mb-2" {...props} />,
                              p: (props) => <p className="mb-4" {...props} />,
                              ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
                              ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                              li: (props) => <li className="mb-1" {...props} />,
                              table: (props) => <table className="border-collapse border border-gray-300 mb-4" {...props} />,
                              th: (props) => <th className="border border-gray-300 px-4 py-2 bg-gray-100" {...props} />,
                              td: (props) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                              code: (props) => <code className="bg-gray-100 px-1 rounded" {...props} />,
                              pre: (props) => <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto" {...props} />,
                            }}
                          >
                            {chat.message}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span>{chat.message}</span>
                      )}
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {chat.timestamp instanceof Date ? chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
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
                          <span className="font-medium text-gray-800 dark:text-white">Ohscentric</span>
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
          {!isConnected && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Not connected to backend. Please make sure your FastAPI server is running on {import.meta.env.VITE_FASTAPI_URL || 'http://127.0.0.1:8000'}
                </p>
                <button 
                  onClick={async () => {
                    const token = await getAuthToken();
                    const connected = await testConnection(token);
                    setIsConnected(connected);
                    if (connected) setApiError(null);
                  }}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
          {isConnected && !canSendMessage() && (
            <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {getTrialMessage()}
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
                  placeholder={
                    !isConnected 
                      ? "Connect to backend to start chatting..." 
                      : canSendMessage() 
                        ? "Ask about workplace safety..." 
                        : "Upgrade to continue chatting..."
                  }
                  disabled={!canSendMessage() || !isConnected}
                  className="w-full p-4 pr-16 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400"
                  rows={1}
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
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                  }}
                />
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={!message.trim() || !canSendMessage() || !isConnected}
                  className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                Ohscentric may produce inaccurate information. Always verify safety information with official sources.
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
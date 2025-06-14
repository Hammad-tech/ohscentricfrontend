import { FC } from "react";
import { Home, MessageSquare, Layers, Settings, BookOpen, Users, HelpCircle, X, Notebook, AlertCircle, Radio, Video, Bot, Link, LogIn, UserPlus, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";
import logo from "@/app/assets/images/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({ icon, text, active, onClick, isCollapsed }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      }`}
      title={isCollapsed ? text : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span 
        className="text-lg"
        animate={active ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.span>
      {!isCollapsed && (
        <motion.span 
          className="font-medium truncate"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      )}
    </motion.button>
  );
};

interface ComingSoonItemProps {
  title: string;
  isCollapsed?: boolean;
  icon: React.ReactNode;
}

const ComingSoonItem: FC<ComingSoonItemProps> = ({ title, isCollapsed, icon }) => {
  return (
    <motion.div 
      className={`border border-gray-200 flex items-center ${isCollapsed ? 'justify-center' : ''} rounded-lg p-3 mb-3 hover:bg-gray-50 transition-colors group cursor-pointer relative overflow-hidden`}
      whileHover={{ 
        y: -2,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="flex items-center gap-3 relative z-10">
        <motion.div 
          className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        {!isCollapsed ? (
          <div>
            <p className="text-gray-800 font-medium">{title}</p>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-gray-500 mr-1">Coming Soon</p>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-xs">✨</span>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <p className="sr-only">{title}</p>
        )}
      </div>
    </motion.div>
  );
};

interface SidebarProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ 
  isCollapsed = false, 
  toggleSidebar,
  isMobile = false,
  isOpen = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sidebarVariants = {
    open: { 
      x: 0,
      width: isCollapsed && !isMobile ? "5rem" : "16rem",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        variants={sidebarVariants}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <motion.div 
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <img src={logo} alt="Ohscentric" className="h-20 w-auto" />
            </motion.div>
          )}
          {isCollapsed && !isMobile && (
            <motion.div 
              className="mx-auto"
              whileHover={{ scale: 1.1 }}
            >
              <img src={logo} alt="Ohscentric" className="h-10 w-auto" />
            </motion.div>
          )}
          <motion.button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobile ? (
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600 dark:text-gray-400"
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <polyline points="15 18 9 12 15 6" />
              </motion.svg>
            )}
          </motion.button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          <SidebarLink 
            onClick={() => navigate('/')} 
            icon={<Home />} 
            text="Home" 
            active={isActiveRoute('/')} 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            onClick={() => navigate('/chatbot')} 
            icon={<Bot />} 
            text="Chatbot" 
            active={isActiveRoute('/chatbot')} 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            onClick={() => navigate('/links')} 
            icon={<Link />} 
            text="Links" 
            active={isActiveRoute('/links')} 
            isCollapsed={isCollapsed} 
          />

          <motion.div 
            className="mt-10 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {!isCollapsed && (
              <motion.h3 
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                COMING SOON
              </motion.h3>
            )}
            <div className={`${isCollapsed ? "px-1" : ""} space-y-1`}>
              <ComingSoonItem title="OhsVid" icon={<Video size={16} />} isCollapsed={isCollapsed} />
              <ComingSoonItem title="OhsAware" icon={<AlertCircle size={16} />} isCollapsed={isCollapsed} />
              <ComingSoonItem title="OhsPodcast" icon={<Radio size={16} />} isCollapsed={isCollapsed} />
            </div>
          </motion.div>
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          <SidebarLink 
            icon={<HelpCircle />} 
            text="Help & Support" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            icon={<Settings />} 
            text="Settings" 
            isCollapsed={isCollapsed} 
          />
        </div>
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {user ? (
            <SidebarLink 
              onClick={handleLogout}
              icon={<LogOut />} 
              text="Logout" 
              isCollapsed={isCollapsed} 
            />
          ) : (
            <>
              <SidebarLink 
                onClick={() => navigate('/login')} 
                icon={<LogIn />} 
                text="Login" 
                active={isActiveRoute('/login')} 
                isCollapsed={isCollapsed} 
              />
              <SidebarLink 
                onClick={() => navigate('/signup')} 
                icon={<UserPlus />} 
                text="Sign Up" 
                active={isActiveRoute('/signup')} 
                isCollapsed={isCollapsed} 
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
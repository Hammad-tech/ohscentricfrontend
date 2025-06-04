import { FC } from "react";
import { Home, MessageSquare, Layers, Settings, BookOpen, Users, HelpCircle, X, Notebook, AlertCircle, Radio, Video, Bot, Link, LogIn, UserPlus, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({ icon, text, active, onClick, isCollapsed }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      }`}
      title={isCollapsed ? text : undefined}
    >
      <span className="text-lg">{icon}</span>
      {!isCollapsed && <span className="font-medium truncate">{text}</span>}
    </button>
  );
};

interface ComingSoonItemProps {
  title: string;
  isCollapsed?: boolean;
  icon: React.ReactNode;
}

const ComingSoonItem: FC<ComingSoonItemProps> = ({ title, isCollapsed, icon }) => {
  return (
    <div className={`border border-gray-200 flex items-center ${isCollapsed ? 'justify-center' : ''} rounded-lg p-3 mb-3 hover:bg-gray-50 transition-colors group cursor-pointer`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
          {icon}
        </div>
        {!isCollapsed ? (
          <div>
            <p className="text-gray-800 font-medium">{title}</p>
            <p className="text-xs text-gray-500">Coming Soon...</p>
          </div>
        ) : (
          <p className="sr-only">{title}</p>
        )}
      </div>
    </div>
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

  return (
    <div>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          isCollapsed && !isMobile ? "w-20" : "w-64"
        } ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}`}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Notebook size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white truncate">Ohist</h1>
            </div>
          )}
          {isCollapsed && !isMobile && (
            <div className="mx-auto">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <MessageSquare size={20} className="text-white" />
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMobile ? (
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <svg
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
              >
                <polyline points={isCollapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
              </svg>
            )}
          </button>
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
          <div className="mt-10 mb-2">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-3">
                COMING SOON
              </h3>
            )}
            <div className={`${isCollapsed ? "px-1" : ""} space-y-1`}>
              <ComingSoonItem title="OhsVid" icon={<Video size={16} />} isCollapsed={isCollapsed} />
              <ComingSoonItem title="OhsAware" icon={<AlertCircle size={16} />} isCollapsed={isCollapsed} />
              <ComingSoonItem title="OhsPodcast" icon={<Radio size={16} />} isCollapsed={isCollapsed} />
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          <SidebarLink icon={<HelpCircle />} text="Help & Support" isCollapsed={isCollapsed} />
          <SidebarLink icon={<Settings />} text="Settings" isCollapsed={isCollapsed} />
        </div>
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {user ? (
            // Show logout when user is logged in
            <SidebarLink 
              onClick={handleLogout}
              icon={<LogOut />} 
              text="Logout" 
              isCollapsed={isCollapsed} 
            />
          ) : (
            // Show login/signup when user is not logged in
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
      </div>
    </div>
  );
};

export default Sidebar;
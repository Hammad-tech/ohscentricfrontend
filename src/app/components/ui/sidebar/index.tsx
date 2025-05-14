import { FC } from "react";
import { Home, MessageSquare, Layers, Settings, BookOpen, Users, HelpCircle, X, Notebook } from "lucide-react";

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
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Notebook size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white truncate">SafetyBot</h1>
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
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <SidebarLink icon={<Home />} text="Dashboard" active isCollapsed={isCollapsed} />
          <SidebarLink icon={<MessageSquare />} text="Messages" isCollapsed={isCollapsed} />
          <SidebarLink icon={<Layers />} text="Projects" isCollapsed={isCollapsed} />
          <SidebarLink icon={<BookOpen />} text="Documentation" isCollapsed={isCollapsed} />
          <SidebarLink icon={<Users />} text="Community" isCollapsed={isCollapsed} />
        </div>
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          <SidebarLink icon={<HelpCircle />} text="Help & Support" isCollapsed={isCollapsed} />
          <SidebarLink icon={<Settings />} text="Settings" isCollapsed={isCollapsed} />
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 dark:text-white truncate">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">john.doe@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
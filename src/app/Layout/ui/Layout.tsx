import { FC, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/app/components/ui/sidebar";

const Layout: FC = () => {
  const location = useLocation();
  const authRoutes = ["/login", "/signup", "/forget-password"];
  const showSidebar = !authRoutes.includes(location.pathname);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false);
      }
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {showSidebar && (
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile}
          isOpen={sidebarOpen}
        />
      )}
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${
        showSidebar && !isMobile && !sidebarCollapsed ? "lg:ml-64" : 
        showSidebar && !isMobile && sidebarCollapsed ? "lg:ml-20" : ""
      }`}>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
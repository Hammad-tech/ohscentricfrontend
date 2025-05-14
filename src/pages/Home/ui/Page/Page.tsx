import { FC, useState, useEffect } from "react";
import Sidebar from "@/app/components/ui/sidebar";
import Hero from "../../sections/hero";
import Features from "../../sections/features";
import Pricing from "../../sections/pricing";
import Footer from "@/app/components/ui/footer";
import ChatBot from "../../sections/chatbot";
import { Bell, Menu } from "lucide-react";

const Home: FC = () => {
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
        isMobile={isMobile}
        isOpen={sidebarOpen}
      />
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${
        !isMobile && !sidebarCollapsed ? "lg:ml-64" : !isMobile && sidebarCollapsed ? "lg:ml-20" : ""
      }`}>
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center flex-1">
            {isMobile && (
              <button 
                onClick={toggleSidebar}
                className="p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Overview</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
             <Bell size={24} />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto space-y-8">
            <Hero />
            <ChatBot />
            <Features />
            <Pricing />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
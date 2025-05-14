import { Facebook, Twitter, Linkedin, Instagram, MessageSquare, Shield, LifeBuoy, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white !m-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                <Shield size={20} />
              </div>
              <h3 className="text-2xl font-bold">SafetyBot</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your AI-powered workplace safety assistant, providing instant answers and compliance guidance to keep your team protected.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <MessageSquare size={18} className="mr-2 text-blue-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <BookOpen size={18} className="mr-2 text-blue-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Safety Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <Shield size={18} className="mr-2 text-blue-400" />
              Legal
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                GDPR Compliance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <LifeBuoy size={18} className="mr-2 text-blue-400" />
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for safety tips and updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} SafetyBot. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Accessibility</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Sitemap</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
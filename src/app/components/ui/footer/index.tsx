import { Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white !m-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                <Shield size={20} />
              </div>
              <h3 className="text-2xl font-bold">Ohscentric</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your AI-powered workplace safety assistant, providing instant answers and compliance guidance to keep your team protected.
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl">🇦🇺</span>
              <span className="text-2xl">🇦🇮</span>
              <span className="text-2xl">🏳️‍🌈</span>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <Mail size={18} className="mr-2 text-blue-400" />
              MAIL
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start">
                <span className="w-1 h-1 mt-2.5 mr-2 bg-gray-500 rounded-full"></span>
                Email Us: <a href="mailto:obscentric@gmail.com" className="hover:text-white transition-colors ml-1">ohscentric@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5">
              DIVERSITY & INCLUSION
            </h4>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Ohscentric recognises Aboriginal and Torres Strait Islander people as the traditional 
              owners and custodians of Australia. We pay our deepest respect to all Aboriginal and Torres Strait 
              Islander Elders past, present and emerging. We recognise and value diversity and 
              acknowledge inclusion in everything we strive for.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-wrap gap-4">
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">About Us</a>
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Contact Us</a>
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Disclaimer</a>
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms And Conditions</a>
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
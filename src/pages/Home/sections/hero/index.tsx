import { useState } from "react";
import { ChevronRight, ShieldCheck, MessageSquareText, Users } from "lucide-react";
import HeroImage from '@/app/assets/images/hero.svg'

const Hero = () => {
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);

  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-gradient-to-br bg-blue-600">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-2 bg-blue-800 bg-opacity-40 rounded-full mb-6">
              <span className="text-blue-200 font-medium text-sm flex items-center">
                <ShieldCheck size={16} className="mr-2" />
                OSHA Compliant Solution
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Workplace <span className="text-blue-200">Safety Assistant</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Get instant answers to your workplace safety questions with our AI-powered chatbot. Improve compliance and keep your team safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                className={`group px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${isHoveredPrimary ? "bg-opacity-90 transform -translate-y-1" : ""}`}
                onMouseEnter={() => setIsHoveredPrimary(true)}
                onMouseLeave={() => setIsHoveredPrimary(false)}
              >
                Try For Free
                <ChevronRight 
                  size={20} 
                  className={`ml-2 transition-transform duration-300 ${isHoveredPrimary ? "transform translate-x-1" : ""}`}
                />
              </button>
              <button 
                className={`px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center ${isHoveredSecondary ? "bg-blue-700 bg-opacity-30 transform -translate-y-1" : ""}`}
                onMouseEnter={() => setIsHoveredSecondary(true)}
                onMouseLeave={() => setIsHoveredSecondary(false)}
              >
                Learn More
              </button>
            </div>
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center font-bold text-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-blue-100 text-sm">
                <span className="font-bold">500+</span> companies trust our solution
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-400 bg-opacity-20 rounded-lg rotate-12"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-300 bg-opacity-20 rounded-xl -rotate-12"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/20 shadow-2xl">
              <img 
                src={HeroImage}
                alt="Workplace Safety Bot Demo" 
                className="rounded-lg w-full"
              />
              <div className="absolute -bottom-5 -left-5 bg-blue-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
                <MessageSquareText size={20} className="mr-2 text-blue-200" />
                <span className="font-medium text-white">24/7 Support</span>
              </div>
              <div className="absolute -top-5 -right-5 bg-blue-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
                <Users size={20} className="mr-2 text-blue-200" />
                <span className="font-medium text-white">Team Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
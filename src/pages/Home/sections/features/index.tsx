import { Shield, BookOpen, Clock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield size={28} className="text-blue-600" />,
      title: "Compliance Guidance",
      description: "Get instant answers about workplace safety regulations and compliance requirements.",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <BookOpen size={28} className="text-green-600" />,
      title: "Extensive Knowledge Base",
      description: "Access a comprehensive database of safety protocols, guidelines, and best practices.",
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: <Clock size={28} className="text-purple-600" />,
      title: "24/7 Availability",
      description: "Get the information you need anytime, without waiting for business hours.",
      gradient: "from-purple-50 to-purple-100"
    },
    {
      icon: <Users size={28} className="text-orange-600" />,
      title: "Team Training",
      description: "Use our chatbot to help train your team on important safety procedures.",
      gradient: "from-orange-50 to-orange-100"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            Why SafetyBot?
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Workplace Safety
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered workplace safety assistant helps you maintain compliance 
            and create a safer working environment with cutting-edge technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative p-6 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg mb-5 flex items-center justify-center bg-gradient-to-br ${feature.gradient} bg-opacity-10`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a 
                    href="#chatbot" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a 
            href="#chatbot" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            Try SafetyBot Now
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
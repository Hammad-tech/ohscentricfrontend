import { FC } from "react";
import { Shield, Users, BarChart3, FileText, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features: FC = () => {
  const navigate = useNavigate();

  const handleOhsistClick = () => {
    navigate('/chatbot');
  };

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Safety Guidance",
      description: "Get instant answers to complex workplace safety questions with our advanced AI assistant trained on current regulations and best practices."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share safety insights across your organization and keep everyone informed about the latest compliance requirements and safety protocols."
    },
    {
      icon: BarChart3,
      title: "Risk Assessment Tools",
      description: "Conduct comprehensive risk assessments with guided templates and automated reporting to ensure nothing falls through the cracks."
    },
    {
      icon: FileText,
      title: "Compliance Documentation",
      description: "Generate and manage all necessary safety documentation with templates that meet regulatory standards and requirements."
    },
    {
      icon: CheckCircle,
      title: "Real-time Updates",
      description: "Stay current with the latest safety regulations and industry standards through our continuously updated knowledge base."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access safety guidance whenever you need it, ensuring your team can address safety concerns at any time of day."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            Why Ohsist?
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Workplace Safety
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered workplace safety assistant helps you maintain compliance 
            and create a safer working environment with cutting-edge technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button 
            onClick={handleOhsistClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            Try Ohsist Now
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
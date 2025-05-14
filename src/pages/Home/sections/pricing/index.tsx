import { Check, Zap, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Try our chatbot with limited features",
      features: [
        "3 free prompts per day",
        "Basic safety questions",
        "Limited file uploads",
        "Standard response time",
        "Community support"
      ],
      button: "Get Started",
      popular: false,
      icon: <Star size={20} className="text-blue-500" />
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams and businesses",
      features: [
        "Unlimited prompts",
        "Advanced safety guidance",
        "Priority support",
        "File upload capability",
        "Compliance recommendations",
        "Email support"
      ],
      button: "Subscribe Now",
      popular: true,
      icon: <Zap size={20} className="text-yellow-500" />
    },
    {
      name: "Enterprise",
      price: "$249",
      period: "per year",
      description: "Best value for long-term use",
      features: [
        "Everything in Professional",
        "Save 28% compared to monthly",
        "Company-wide access",
        "Custom safety protocols",
        "Regular compliance updates",
        "Dedicated account manager"
      ],
      button: "Subscribe Now",
      popular: false,
      icon: <Check size={20} className="text-green-500" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your workplace safety needs. Scale up or down as needed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? "border-blue-500 shadow-lg transform md:-translate-y-4" 
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md" 
                      : "bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Need a custom solution for your enterprise?
            </h4>
            <p className="text-gray-600 mb-4">
              We offer tailored plans for large organizations with specific compliance needs.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-800 hover:bg-gray-900 transition-colors"
            >
              Contact Sales
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Secure payment processing through Stripe. Cancel anytime.</p>
            <p className="mt-1">30-day money-back guarantee on annual plans.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
import { useState } from "react";
import { ArrowRight, Check, Zap, Shield, FileText, Headset, CreditCard, Star, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      await signup(name.trim(), email.trim(), password, selectedPlan);
      
      if (selectedPlan === "enterprise") {
        alert("Enterprise plan selected! We'll contact you shortly at " + email);
      } else {
        alert(`${selectedPlan === "starter" ? "Free account" : "Premium subscription"} created successfully!`);
      }
      
      navigate("/chatbot");
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Try our chatbot with limited features",
      icon: Star,
      cta: "Get Started",
      buttonStyle: "border border-blue-500 text-blue-600 hover:bg-blue-50"
    },
    {
      id: "professional",
      name: "Professional",
      price: "$19",
      period: "per month",
      description: "Perfect for small teams and businesses",
      icon: Zap,
      cta: "Subscribe Now",
      popular: true,
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Contact Sales",
      period: "",
      description: "Best value for long-term use",
      icon: Shield,
      contactEmail: "ohscentric@gmail.com",
      cta: "Subscribe Now",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">Ohsist</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Workplace Safety,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Powered by AI
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                Ohsist helps you navigate workplace safety regulations, conduct risk assessments, and ensure compliance with AI-powered guidance.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">OSHA Compliant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Certified recommendations</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Real-time Updates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Always current compliance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Document Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Smart safety audits</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
                Choose Your Plan
              </h2>
              <div className="space-y-4">
                {plans.map((plan) => {
                  const IconComponent = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-200 border-2 ${
                        selectedPlan === plan.id
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            MOST POPULAR
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {plan.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {plan.description}
                            </p>
                            {plan.contactEmail && (
                              <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="w-4 h-4 mr-1" />
                                {plan.contactEmail}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {plan.price}
                          </div>
                          {plan.period && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {plan.period}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create Your Account
                </h2>
                <p className="text-blue-100">
                  Get started with {plans.find(p => p.id === selectedPlan)?.name} plan
                </p>
              </div>
              <div className="p-6 sm:p-8">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Create a strong password"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Must be at least 8 characters long
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Selected Plan: {plans.find(p => p.id === selectedPlan)?.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {plans.find(p => p.id === selectedPlan)?.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {plans.find(p => p.id === selectedPlan)?.price}
                      </span>
                      {plans.find(p => p.id === selectedPlan)?.period && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          / {plans.find(p => p.id === selectedPlan)?.period}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      disabled={isLoading}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 mt-1 disabled:opacity-50"
                    />
                    <label htmlFor="terms" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        {selectedPlan === "starter" 
                          ? "Create Free Account" 
                          : selectedPlan === "enterprise"
                          ? "Contact Sales Team"
                          : "Continue to Payment"
                        }
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
                <div className="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Secure payment powered by Stripe • SSL encrypted
                  </span>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-start">
                <Headset className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                    Need enterprise solutions?
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Contact our sales team for custom plans, volume discounts, and dedicated support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
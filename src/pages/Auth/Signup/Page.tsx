import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Check, Zap, Shield, FileText, Headset, CreditCard, Star, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";
import stripeService from "@/app/services/stripeService";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [error, setError] = useState("");
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  
  const { signup, signupWithGoogle, isLoading, isGoogleLoaded } = useAuth();

  useEffect(() => {
    if (isGoogleLoaded && window.google && googleButtonRef.current) {
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'outline',
          size: 'large',
          text: 'signup_with',
          shape: 'rectangular',
          width: '100%',
          logo_alignment: 'left',
          locale: 'en_US',
        }
      );
    }
  }, [isGoogleLoaded]);

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
      // Create account first
      await signup(name.trim(), email.trim(), password, selectedPlan);
      
      if (selectedPlan === "professional") {
        // Redirect to Stripe for payment
        setIsProcessingPayment(true);
        const successUrl = `${window.location.origin}/payment/success`;
        const cancelUrl = `${window.location.origin}/payment/cancel`;
        
        await stripeService.upgradeToProffesional(successUrl, cancelUrl);
        // User will be redirected to Stripe Checkout
      } else if (selectedPlan === "enterprise") {
        alert("Enterprise plan selected! We'll contact you shortly at " + email);
        navigate("/chatbot");
      } else {
        // Starter plan - go directly to chatbot
        alert("Free account created successfully!");
        navigate("/chatbot");
      }
      
    } catch (err) {
      setIsProcessingPayment(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsGoogleSignup(true);
    
    try {
      await signupWithGoogle(selectedPlan);
      
      if (selectedPlan === "professional") {
        // Redirect to Stripe for payment
        setIsProcessingPayment(true);
        const successUrl = `${window.location.origin}/payment/success`;
        const cancelUrl = `${window.location.origin}/payment/cancel`;
        
        await stripeService.upgradeToProffesional(successUrl, cancelUrl);
        // User will be redirected to Stripe Checkout
      } else if (selectedPlan === "enterprise") {
        alert("Enterprise plan selected! We'll contact you shortly.");
        navigate("/chatbot");
      } else {
        // Starter plan - go directly to chatbot
        alert("Free account created successfully!");
        navigate("/chatbot");
      }
      
    } catch (err) {
      setIsProcessingPayment(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Google signup failed. Please try again.");
      }
    } finally {
      setIsGoogleSignup(false);
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

  const getButtonText = () => {
    if (isLoading || isProcessingPayment) {
      return "Processing...";
    }
    
    if (selectedPlan === "starter") {
      return "Create Free Account";
    } else if (selectedPlan === "enterprise") {
      return "Contact Sales Team";
    } else {
      return "Continue to Payment";
    }
  };

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
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Quick signup with Google
                    </p>
                    {isGoogleLoaded ? (
                      <div 
                        ref={googleButtonRef}
                        onClick={handleGoogleSignup}
                        className="flex justify-center"
                      />
                    ) : (
                      <button
                        onClick={handleGoogleSignup}
                        disabled={isLoading || isGoogleSignup}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGoogleSignup ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                            Signing up with Google...
                          </div>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </div>

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
                    disabled={isLoading || isProcessingPayment}
                    className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading || isProcessingPayment ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isProcessingPayment ? "Redirecting to payment..." : "Creating Account..."}
                      </div>
                    ) : (
                      <>
                        {getButtonText()}
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
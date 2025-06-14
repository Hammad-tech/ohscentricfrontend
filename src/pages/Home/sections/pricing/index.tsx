import { Check, Zap, Star, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import stripeService from "@/app/services/stripeService";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Pricing = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleStarterClick = () => {
    navigate('/chatbot');
  };

  const handleProfessionalClick = async () => {
    try {
      const successUrl = `${window.location.origin}/payment/success`;
      const cancelUrl = `${window.location.origin}/payment/cancel`;
      await stripeService.upgradeToProffesional(successUrl, cancelUrl);
    } catch (error) {
      console.error('Failed to start upgrade process:', error);
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Try our chatbot with limited features",
      features: [
        "3 free prompts per day",
        "Basic safety questions",
        "Limited file downloads",
        "Standard response time",
        "Community support"
      ],
      button: "Get Started",
      popular: false,
      icon: <Star size={20} className="text-blue-500" />,
      onClick: handleStarterClick
    },
    {
      name: "Professional",
      price: "$19",
      period: "per month",
      description: "Perfect for small teams and businesses",
      features: [
        "Unlimited prompts",
        "Advanced safety guidance",
        "File download capability",
        "Compliance recommendations",
        "Email support"
      ],
      button: "Subscribe Now",
      popular: true,
      icon: <Zap size={20} className="text-yellow-500" />,
      onClick: handleProfessionalClick
    },
    {
      name: "Enterprise",
      price: "",
      period: "ohscentric@gmail.com",
      description: "Best value for long-term use",
      features: [
        "Everything in Professional",
        "Company-wide access",
        "Custom safety protocols",
      ],
      button: "Contact Sales",
      popular: false,
      icon: <Check size={20} className="text-green-500" />,
      onClick: () => window.location.href = "mailto:ohscentric@gmail.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  const popularTagVariants = {
    hidden: { 
      opacity: 0, 
      y: -20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden" 
      id="pricing"
      style={{ y }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-10 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-25"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/4 w-8 h-8 bg-blue-300 rounded-full opacity-20"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.span 
            className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-6 border border-blue-100"
            variants={badgeVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
            }}
          >
            Pricing Plans
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={headerVariants}
          >
            Simple,{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Transparent
            </motion.span>{" "}
            Pricing
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={headerVariants}
          >
            Choose the plan that works best for your workplace safety needs. Scale up or down as needed.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                plan.popular 
                  ? "border-blue-500 shadow-lg transform md:-translate-y-4" 
                  : "border-gray-200"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              {plan.popular && (
                <motion.div 
                  className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg"
                  variants={popularTagVariants}
                >
                  MOST POPULAR
                </motion.div>
              )}
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {plan.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 inline-flex gap-3 items-center">
                    {plan.name === "Enterprise" && (
                      <Mail size={24} />
                    )}
                    <span className={plan.name === "Enterprise" ? 'hidden' : 'block'} >/</span>
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start text-gray-700"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  onClick={plan.onClick}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
                    plan.popular 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md" 
                      : "bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600"
                  }`}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: plan.popular 
                      ? "0 10px 20px rgba(59, 130, 246, 0.3)" 
                      : "0 5px 15px rgba(59, 130, 246, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span 
                    className="relative z-10"
                    animate={{
                      x: [0, 2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {plan.button}
                  </motion.span>
                  {plan.popular && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div 
            className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Need a custom solution for your enterprise?
            </h4>
            <p className="text-gray-600 mb-4">
              We offer tailored plans for large organizations with specific compliance needs.
            </p>
            <motion.a 
              href="#" 
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-800 hover:bg-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales
              <motion.svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>Secure payment processing through Stripe. Cancel anytime.</p>
            <p className="mt-1">30-day money-back guarantee on annual plans.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Pricing;
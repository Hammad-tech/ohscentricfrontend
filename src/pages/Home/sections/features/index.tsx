import { FC, useRef } from "react";
import { Shield, Users, BarChart3, FileText, CheckCircle, Clock } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Features: FC = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleOhscentricClick = () => {
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
      icon: FileText,
      title: "Compliance Documentation",
      description: "Generate and manage all necessary safety documentation with templates that meet regulatory standards and requirements."
    },
    {
      icon: CheckCircle,
      title: "Real-time Updates",
      description: "Stay current with the latest safety regulations and industry standards through our continuously updated knowledge base."
    },
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
      scale: 0.9
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
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden" 
      id="features"
      style={{ y }}
    >
      <motion.div 
        className="absolute top-10 right-10 w-24 h-24 bg-blue-100 rounded-full opacity-30"
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
        className="absolute bottom-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-25"
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
        className="absolute top-1/2 right-1/4 w-8 h-8 bg-blue-300 rounded-full opacity-20"
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
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Why Ohscentric?
            </motion.span>
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={headerVariants}
          >
            Transform Your{" "}
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
              Workplace Safety
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={headerVariants}
          >
            Our AI-powered workplace safety assistant helps you maintain compliance 
            and create a safer working environment with cutting-edge technology.
          </motion.p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`${index == 3 ? 'col-start-2': ''} group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden`}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <motion.div 
                className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300"
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 border-2 border-blue-300 rounded-xl opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <div className="relative z-10">
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {feature.description}
                </motion.p>
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            onClick={handleOhscentricClick}
            className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center">
              Try Ohscentric Now
              <motion.svg 
                className="w-5 h-5 ml-2 -mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0"
              animate={{
                scale: [0, 2],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
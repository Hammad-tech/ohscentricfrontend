import { FC, useState } from "react";
import { ChevronRight, ShieldCheck, MessageSquareText, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroImage from '@/app/assets/images/hero.svg';
import { useNavigate } from "react-router-dom";

const Hero: FC = () => {
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);
  const navigate = useNavigate();
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const handleTryForFree = () => {
    navigate('/chatbot');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0, 
      x: -20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden"
      style={{ y, opacity }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-25"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/30"
              variants={badgeVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </motion.div>
              <span className="text-sm font-medium text-gray-700">
                WHS Compliant Solution
              </span>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Your{" "}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  Workplace Safety
                </motion.span>{" "}
                Assistant
              </motion.h1>
            </motion.div>
            <motion.p 
              className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              Get instant answers to your workplace safety questions with our AI-powered chatbot. 
              Improve compliance and keep your team safe.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="group relative overflow-hidden bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl"
                onMouseEnter={() => setIsHoveredPrimary(true)}
                onMouseLeave={() => setIsHoveredPrimary(false)}
                onClick={handleTryForFree}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-50 opacity-0"
                  animate={{ opacity: isHoveredPrimary ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  Try For Free
                  <motion.div
                    animate={{ x: isHoveredPrimary ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
              </motion.button>
              <motion.button
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white/50 transition-all duration-300"
                onMouseEnter={() => setIsHoveredSecondary(true)}
                onMouseLeave={() => setIsHoveredSecondary(false)}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ color: isHoveredSecondary ? "#DBEAFE" : "#FFFFFF" }}
                  transition={{ duration: 0.2 }}
                >
                  Learn More
                </motion.span>
              </motion.button>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
              variants={containerVariants}
            >
              {[
                { icon: ShieldCheck, text: "WHS Compliant", color: "text-blue-200" },
                { icon: MessageSquareText, text: "AI Powered", color: "text-blue-200" },
                { icon: Users, text: "24/7 Support", color: "text-blue-200" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                  variants={featureVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    // whileHover={{ rotate: 360 }}
                    // transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`h-6 w-6 group-hover:rotate-[90deg] duration-[0.5] ${feature.color}`} />
                  </motion.div>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={HeroImage}
                alt="Workplace Safety Assistant"
                className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-300 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
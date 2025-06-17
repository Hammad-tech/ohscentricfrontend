import { useState, useRef } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { sections } from "./EulaContent";

const EulaPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

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
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px"
      }
    }

  return (
    <motion.div 
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      style={{ y }}
    >
      <motion.section 
        className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
          >
            <motion.div 
              className="inline-block px-4 py-2 bg-blue-800 bg-opacity-40 rounded-full mb-6"
              variants={badgeVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
              }}
            >
              <span className="text-blue-200 font-medium text-sm flex items-center justify-center">
                <BookOpen size={16} className="mr-2" />
                Legal Documentation
              </span>
            </motion.div>
            <motion.h1 
              className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={headerVariants}
            >
              End User License{" "}
              <motion.span 
                className="text-blue-200"
                animate={{
                  textShadow: ["0 0 8px rgba(191,219,254,0.5)", "0 0 16px rgba(191,219,254,0.7)", "0 0 8px rgba(191,219,254,0.5)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Agreement
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto"
              variants={headerVariants}
            >
              Please read these terms carefully before using Ohscentric. By accessing or using our services, you agree to be bound by these terms.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
      <motion.section 
        className="py-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700">
              <motion.div className="text-2xl mb-2 text-white">
                <BookOpen size={32} />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Ohscentric End User License Agreement Terms
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                Effective Date: June 16, 2025
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <motion.div 
                  className="text-sm text-gray-600 mb-4"
                  variants={itemVariants}
                >
                  <p className="font-bold text-red-400 mb-2">WARNING</p>
                  <p className="mb-4">
                    Kann Safe Pty Ltd (ACN 687 219 272) (Kann Safe) owns and operates this Ohscentric app (Ohscentric). Access to and use of this Ohscentric and the services available through this Ohscentric (collectively, Services) are subject to the following terms, conditions and notices.
                  </p>
                  <p className="mb-4">
                    By clicking "I Accept", you will be deemed to have accepted the following terms. If you do not wish to accept the terms, you must not click "I Accept" and you may not use the Ohscentric. Please read these Terms of Use carefully before using the Ohscentric.
                  </p>
                </motion.div>
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={() => toggleSection(index)}
                      className="flex items-center justify-between w-full text-left mb-4"
                      whileHover={{ color: "#2563eb" }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {section.title}
                      </h3>
                      {expandedSections.has(index) ? (
                        <ChevronUp size={20} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                      )}
                    </motion.button>
                    {expandedSections.has(index) && (
                      <div className="space-y-3 text-sm text-gray-600">
                        {section.content.map((paragraph, pIndex) => (
                          <motion.p 
                            key={pIndex}
                            className="leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: pIndex * 0.05 }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Accept the Agreement
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            By clicking "I Accept" below, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions of this Agreement.
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"
              whileHover={{ opacity: 0.1 }}
            />
            <span className="relative z-10">
              I Accept
            </span>
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default EulaPage;
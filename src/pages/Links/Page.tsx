import { useState, useRef } from "react";
import { Search, ExternalLink, Filter, BookOpen, ChevronRight } from "lucide-react";
import { linksData } from "./Links";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const LinksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filteredData = linksData.filter(category => {
    if (selectedCategory !== "all" && !category.title.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return category.title.toLowerCase().includes(searchLower) ||
             category.description.toLowerCase().includes(searchLower) ||
             category.links.some(link => 
               link.name.toLowerCase().includes(searchLower) ||
               (link.description && link.description.toLowerCase().includes(searchLower))
             );
    }
    
    return true;
  });

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const categories = [
    "all",
    "legislation",
    "authorities",
    "associations",
    "international"
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
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      style={{ y }}
    >
      {/* Hero Section */}
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
                Comprehensive Resource Directory
              </span>
            </motion.div>
            <motion.h1 
              className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={headerVariants}
            >
              Workplace Safety{" "}
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
                Resources
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto"
              variants={headerVariants}
            >
              Access comprehensive workplace safety legislation, regulations, and resources from across Australia and internationally. Find everything you need to maintain compliance and create safer workplaces.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Section */}
      <motion.section 
        className="py-8 bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <motion.div 
              className="relative flex-1 max-w-md"
              whileHover={{ scale: 1.01 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search legislation, authorities, or resources..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.01 }}
            >
              <Filter size={20} className="text-gray-500" />
              <select
                className="px-4 py-3 border appearance-none text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="legislation">Legislation</option>
                <option value="authorities">Authorities</option>
                <option value="associations">Associations</option>
                <option value="international">International</option>
              </select>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Results Section */}
      <motion.section 
        className="py-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {filteredData.map((category, index) => {
                const isExpanded = expandedCards.has(index);
                const displayLinks = isExpanded ? category.links : category.links.slice(0, 3);
                return (
                  <motion.div
                    key={index}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className={`relative bg-gradient-to-br ${category.gradient} p-6`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <motion.div 
                            className="text-2xl mb-2"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            {category.icon}
                          </motion.div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {displayLinks.map((link, linkIndex) => (
                          <motion.div
                            key={linkIndex}
                            className="group/link p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            variants={linkVariants}
                            transition={{ delay: linkIndex * 0.05 }}
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start justify-between group/anchor"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 group-hover/anchor:text-blue-600 transition-colors text-sm leading-tight mb-1">
                                  {link.name}
                                </h4>
                                {link.description && (
                                  <p className="text-xs text-gray-500 leading-relaxed">
                                    {link.description}
                                  </p>
                                )}
                              </div>
                              <motion.div
                                whileHover={{ rotate: 45 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ExternalLink 
                                  size={14} 
                                  className="text-gray-400 group-hover/anchor:text-blue-600 transition-colors flex-shrink-0 ml-2 mt-0.5" 
                                />
                              </motion.div>
                            </a>
                          </motion.div>
                        ))}
                      </div>
                      {category.links.length > 3 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <motion.button
                            onClick={() => toggleCard(index)}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isExpanded ? (
                              <>
                                Show Less
                                <ChevronRight size={16} className="ml-1 transform rotate-90" />
                              </>
                            ) : (
                              <>
                                Show {category.links.length - 3} More
                                <ChevronRight size={16} className="ml-1 transform rotate-90" />
                              </>
                            )}
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {[
              { 
                value: linksData.reduce((total, category) => total + category.links.length, 0),
                label: "Total Resources",
                icon: "📚"
              },
              { 
                value: linksData.filter(cat => cat.title.includes('Act') || cat.title.includes('Legislation')).length,
                label: "Jurisdictions Covered",
                icon: "🗺️"
              },
              { 
                value: linksData.filter(cat => cat.title.includes('Authorities')).reduce((total, cat) => total + cat.links.length, 0),
                label: "Regulatory Bodies",
                icon: "🏛️"
              },
              { 
                value: linksData.filter(cat => cat.title.includes('International')).reduce((total, cat) => total + cat.links.length, 0),
                label: "International Resources",
                icon: "🌍"
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Access Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            variants={headerVariants}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Access by Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jump directly to the type of resource you need
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              { name: "State Legislation", count: linksData.filter(cat => !cat.title.includes('Commonwealth') && !cat.title.includes('Authorities') && !cat.title.includes('Professional') && !cat.title.includes('International')).length, icon: "📋", color: "blue" },
              { name: "Federal Laws", count: 1, icon: "🏛️", color: "indigo" },
              { name: "Regulatory Bodies", count: 1, icon: "🏢", color: "green" },
              { name: "Professional Orgs", count: 2, icon: "👥", color: "purple" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer group`}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setSelectedCategory(item.name.split(' ')[1].toLowerCase())}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-3xl mb-3"
                    whileHover={{ scale: 1.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className={`text-2xl font-bold text-${item.color}-600 mb-1`}>{item.count}</div>
                  <div className="text-sm text-gray-500">
                    {item.count === 1 ? 'Category' : 'Categories'}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Finding Something?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered workplace safety assistant can help you find specific information and answer your compliance questions.
          </p>
          <motion.a
            href="#chatbot"
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
            <span className="relative z-10 flex items-center">
              Ask Ohscentric
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ChevronRight size={20} className="ml-2" />
              </motion.div>
            </span>
          </motion.a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default LinksPage;
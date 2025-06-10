import { useState } from "react";
import { Search, ExternalLink, Filter, BookOpen, ChevronRight } from "lucide-react";
import { linksData } from "./Links";

const LinksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-800 bg-opacity-40 rounded-full mb-6">
              <span className="text-blue-200 font-medium text-sm flex items-center justify-center">
                <BookOpen size={16} className="mr-2" />
                Comprehensive Resource Directory
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Workplace Safety <span className="text-blue-200">Resources</span>
            </h1>
            
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Access comprehensive workplace safety legislation, regulations, and resources from across Australia and internationally. Find everything you need to maintain compliance and create safer workplaces.
            </p>
          </div>
        </div>
      </section>
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search legislation, authorities, or resources..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData.map((category, index) => {
                const isExpanded = expandedCards.has(index);
                const displayLinks = isExpanded ? category.links : category.links.slice(0, 3);
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`relative bg-gradient-to-br ${category.gradient} p-6`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-2xl mb-2">{category.icon}</div>
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
                          <div
                            key={linkIndex}
                            className="group/link p-3 rounded-lg hover:bg-gray-50 transition-colors"
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
                              <ExternalLink 
                                size={14} 
                                className="text-gray-400 group-hover/anchor:text-blue-600 transition-colors flex-shrink-0 ml-2 mt-0.5" 
                              />
                            </a>
                          </div>
                        ))}
                      </div>
                      {category.links.length > 3 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => toggleCard(index)}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
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
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {linksData.reduce((total, category) => total + category.links.length, 0)}
              </div>
              <div className="text-blue-200">Total Resources</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {linksData.filter(cat => cat.title.includes('Act') || cat.title.includes('Legislation')).length}
              </div>
              <div className="text-blue-200">Jurisdictions Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {linksData.filter(cat => cat.title.includes('Authorities')).reduce((total, cat) => total + cat.links.length, 0)}
              </div>
              <div className="text-blue-200">Regulatory Bodies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {linksData.filter(cat => cat.title.includes('International')).reduce((total, cat) => total + cat.links.length, 0)}
              </div>
              <div className="text-blue-200">International Resources</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Access by Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jump directly to the type of resource you need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "State Legislation", count: linksData.filter(cat => !cat.title.includes('Commonwealth') && !cat.title.includes('Authorities') && !cat.title.includes('Professional') && !cat.title.includes('International')).length, icon: "📋", color: "blue" },
              { name: "Federal Laws", count: 1, icon: "🏛️", color: "indigo" },
              { name: "Regulatory Bodies", count: 1, icon: "🏢", color: "green" },
              { name: "Professional Orgs", count: 2, icon: "👥", color: "purple" }
            ].map((item, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}>
                <div className="text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className={`text-2xl font-bold text-${item.color}-600 mb-1`}>{item.count}</div>
                  <div className="text-sm text-gray-500">
                    {item.count === 1 ? 'Category' : 'Categories'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Finding Something?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered workplace safety assistant can help you find specific information and answer your compliance questions.
          </p>
          <a
            href="#chatbot"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:-translate-y-1"
          >
            Ask Ohscentric
            <ChevronRight size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LinksPage;
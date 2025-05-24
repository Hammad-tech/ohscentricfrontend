export interface LinkItem {
  name: string;
  url: string;
  description?: string;
}

export interface LinkCategory {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  links: LinkItem[];
}

export const linksData: LinkCategory[] = [
  {
    title: "Commonwealth Legislation",
    description: "Federal workplace safety and discrimination laws",
    icon: "🏛️",
    gradient: "from-blue-50 to-blue-100",
    links: [
      { name: "Age Discrimination Act 2004", url: "#", description: "Federal age discrimination protections" },
      { name: "Asbestos Safety and Eradication Agency Act 2013", url: "#", description: "National asbestos safety framework" },
      { name: "Fair Work Act 2009", url: "#", description: "National employment relations framework" },
      { name: "Work Health and Safety Act 2011", url: "#", description: "Model WHS legislation" },
      { name: "Safety, Rehabilitation and Compensation Act 1988", url: "#", description: "Commonwealth workers compensation" },
      { name: "Sex Discrimination Act 1984", url: "#", description: "Federal sex discrimination protections" },
      { name: "Racial Discrimination Act 1975", url: "#", description: "Federal racial discrimination protections" }
    ]
  },
  {
    title: "Australian Capital Territory",
    description: "ACT workplace safety and discrimination legislation",
    icon: "🏢",
    gradient: "from-green-50 to-green-100",
    links: [
      { name: "Work Health and Safety Act 2011", url: "#", description: "ACT workplace safety legislation" },
      { name: "Workers Compensation Act 1951", url: "#", description: "ACT workers compensation framework" },
      { name: "Discrimination Act 1991", url: "#", description: "ACT anti-discrimination protections" },
      { name: "Dangerous Goods (Road Transport) Act 2009", url: "#", description: "Transport of dangerous goods" },
      { name: "Workplace Privacy Act 2011", url: "#", description: "Workplace surveillance and privacy" }
    ]
  },
  {
    title: "New South Wales",
    description: "NSW workplace safety and industrial relations laws",
    icon: "🌊",
    gradient: "from-indigo-50 to-indigo-100",
    links: [
      { name: "Work Health and Safety Act 2011", url: "#", description: "NSW workplace safety legislation" },
      { name: "Workers Compensation Act 1987", url: "#", description: "NSW workers compensation system" },
      { name: "Anti-Discrimination Act 1977", url: "#", description: "NSW anti-discrimination protections" },
      { name: "Industrial Relations Act 1996", url: "#", description: "NSW industrial relations framework" },
      { name: "Work Health and Safety (Mines and Petroleum Sites) Act 2013", url: "#", description: "Mining and petroleum safety" },
      { name: "Workplace Surveillance Act 2005", url: "#", description: "Employee monitoring and privacy" }
    ]
  },
  {
    title: "Northern Territory",
    description: "NT workplace safety and compensation legislation",
    icon: "🏜️",
    gradient: "from-orange-50 to-orange-100",
    links: [
      { name: "Work Health And Safety (National Uniform Legislation) Act 2011", url: "#", description: "NT workplace safety legislation" },
      { name: "Return to Work Act 1986", url: "#", description: "NT workers compensation and rehabilitation" },
      { name: "Anti-Discrimination Act 1992", url: "#", description: "NT anti-discrimination protections" },
      { name: "Mining Management Act 2001", url: "#", description: "Mining operations safety" },
      { name: "Electrical Safety Act 2022", url: "#", description: "Electrical safety standards" }
    ]
  },
  {
    title: "Queensland",
    description: "QLD workplace safety and industrial relations laws",
    icon: "☀️",
    gradient: "from-yellow-50 to-yellow-100",
    links: [
      { name: "Work Health and Safety Act 2011", url: "#", description: "QLD workplace safety legislation" },
      { name: "Workers' Compensation and Rehabilitation Act 2003", url: "#", description: "QLD workers compensation system" },
      { name: "Industrial Relations Act 2016", url: "#", description: "QLD industrial relations framework" },
      { name: "Coal Mining Safety and Health Act 1999", url: "#", description: "Coal mining safety regulations" },
      { name: "Mining and Quarrying Safety and Health Act 1999", url: "#", description: "Mining and quarrying safety" },
      { name: "Anti-Discrimination Act 1991", url: "#", description: "QLD anti-discrimination protections" }
    ]
  },
  {
    title: "South Australia",
    description: "SA workplace safety and equal opportunity laws",
    icon: "🍷",
    gradient: "from-red-50 to-red-100",
    links: [
      { name: "Work Health and Safety Act 2012", url: "#", description: "SA workplace safety legislation" },
      { name: "Return to Work Act 2014", url: "#", description: "SA workers compensation and rehabilitation" },
      { name: "Equal Opportunity Act 1984", url: "#", description: "SA equal opportunity protections" },
      { name: "Dangerous Substances Act 1979", url: "#", description: "Hazardous substance management" },
      { name: "Mines and Works Inspection Act 1920", url: "#", description: "Mining operations inspection" }
    ]
  },
  {
    title: "Tasmania",
    description: "TAS workplace safety and compensation legislation",
    icon: "🍃",
    gradient: "from-emerald-50 to-emerald-100",
    links: [
      { name: "Work Health and Safety Act 2012", url: "#", description: "TAS workplace safety legislation" },
      { name: "Workers Rehabilitation and Compensation Act 1988", url: "#", description: "TAS workers compensation system" },
      { name: "Anti-Discrimination Act 1998", url: "#", description: "TAS anti-discrimination protections" },
      { name: "Asbestos-Related Diseases (Occupational Exposure) Compensation Act 2011", url: "#", description: "Asbestos disease compensation" },
      { name: "Mines Work Health and Safety (Supplementary Requirements) Act 2012", url: "#", description: "Mining safety requirements" }
    ]
  },
  {
    title: "Victoria",
    description: "VIC workplace safety and equal opportunity laws",
    icon: "🏛️",
    gradient: "from-purple-50 to-purple-100",
    links: [
      { name: "Occupational Health and Safety Act 2004", url: "#", description: "VIC workplace safety legislation" },
      { name: "Workplace Injury Rehabilitation and Compensation Act 2013", url: "#", description: "VIC workers compensation system" },
      { name: "Equal Opportunity Act 2010", url: "#", description: "VIC equal opportunity protections" },
      { name: "Dangerous Goods Act 1985", url: "#", description: "Dangerous goods regulation" },
      { name: "Electricity Safety Act 1998", url: "#", description: "Electrical safety standards" }
    ]
  },
  {
    title: "Western Australia",
    description: "WA workplace safety and equal opportunity laws",
    icon: "⛏️",
    gradient: "from-amber-50 to-amber-100",
    links: [
      { name: "Work Health and Safety Act 2020", url: "#", description: "WA workplace safety legislation" },
      { name: "Workers Compensation and Injury Management Act 2023", url: "#", description: "WA workers compensation system" },
      { name: "Equal Opportunity Act 1984", url: "#", description: "WA equal opportunity protections" },
      { name: "Mines Safety and Inspection Act 1994", url: "#", description: "Mining safety and inspection" },
      { name: "Occupational Safety and Health Act 1984", url: "#", description: "General workplace safety" }
    ]
  },
  {
    title: "OHS & Workers' Compensation Authorities",
    description: "Government agencies and regulatory bodies",
    icon: "🏢",
    gradient: "from-teal-50 to-teal-100",
    links: [
      { name: "Safe Work Australia", url: "#", description: "National workplace safety policy body" },
      { name: "Comcare", url: "#", description: "Commonwealth workers compensation" },
      { name: "SafeWork NSW", url: "#", description: "NSW workplace safety regulator" },
      { name: "WorkSafe Victoria", url: "#", description: "VIC workplace safety regulator" },
      { name: "Workplace Health and Safety Queensland", url: "#", description: "QLD workplace safety regulator" },
      { name: "SafeWork SA", url: "#", description: "SA workplace safety regulator" },
      { name: "WorkSafe Tasmania", url: "#", description: "TAS workplace safety regulator" },
      { name: "WorkSafe WA", url: "#", description: "WA workplace safety regulator" },
      { name: "WorkSafe ACT", url: "#", description: "ACT workplace safety regulator" },
      { name: "NT WorkSafe", url: "#", description: "NT workplace safety regulator" }
    ]
  },
  {
    title: "Professional Associations & Resources",
    description: "Industry bodies and professional organizations",
    icon: "👥",
    gradient: "from-cyan-50 to-cyan-100",
    links: [
      { name: "Australian Institute of Health and Safety", url: "#", description: "Professional OHS body" },
      { name: "Australian Institute of Occupational Hygienists", url: "#", description: "Occupational hygiene professionals" },
      { name: "Australasian Faculty of Occupational and Environmental Medicine", url: "#", description: "Occupational medicine specialists" },
      { name: "Standards Australia", url: "#", description: "Australian standards development" },
      { name: "NSCA Foundation", url: "#", description: "National Safety Council Australia" }
    ]
  },
  {
    title: "International Resources",
    description: "Global workplace safety organizations and resources",
    icon: "🌍",
    gradient: "from-slate-50 to-slate-100",
    links: [
      { name: "International Labour Organization", url: "#", description: "UN agency for labour standards" },
      { name: "Health and Safety Executive (UK)", url: "#", description: "UK workplace safety regulator" },
      { name: "Occupational Safety and Health Administration (US)", url: "#", description: "US workplace safety regulator" },
      { name: "National Institute of Occupational Safety and Health (US)", url: "#", description: "US occupational safety research" },
      { name: "European Agency for Safety and Health at Work", url: "#", description: "EU workplace safety agency" },
      { name: "Canadian Centre for Occupational Health and Safety", url: "#", description: "Canadian workplace safety resource" },
      { name: "WorkSafe New Zealand", url: "#", description: "New Zealand workplace safety regulator" }
    ]
  }
];
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
      { name: "Age Discrimination Act 2004", url: "https://www.legislation.gov.au/Series/C2004A01302", description: "Federal age discrimination protections" },
      { name: "Asbestos Safety and Eradication Agency Act 2013", url: "https://www.legislation.gov.au/Series/C2013A00108", description: "National asbestos safety framework" },
      { name: "Asbestos-related Claims (Management of Commonwealth Liabilities) Act 2005", url: "https://www.legislation.gov.au/Series/C2005A00126", description: "Commonwealth asbestos liability management" },
      { name: "Fair Work Act 2009", url: "https://www.legislation.gov.au/Series/C2009A00028", description: "National employment relations framework" },
      { name: "Fair Work Regulations 2009", url: "https://www.legislation.gov.au/Series/F2009L02356", description: "Fair Work Act regulations" },
      { name: "Military Rehabilitation and Compensation Act 2004", url: "https://www.legislation.gov.au/Series/C2004A00947", description: "Military compensation framework" },
      { name: "Occupational Health and Safety (Maritime Industry) Act 1993", url: "https://www.legislation.gov.au/Series/C2004A04687", description: "Maritime industry OHS" },
      { name: "Occupational Health and Safety (Maritime Industry) Regulations 1995", url: "https://www.legislation.gov.au/Series/F1995B00103", description: "Maritime OHS regulations" },
      { name: "Racial Discrimination Act 1975", url: "https://www.legislation.gov.au/Series/C2004A02534", description: "Federal racial discrimination protections" },
      { name: "Safety, Rehabilitation and Compensation Act 1988", url: "https://www.legislation.gov.au/Series/C2004A04692", description: "Commonwealth workers compensation" },
      { name: "Safety, Rehabilitation and Compensation Regulations 2019", url: "https://www.legislation.gov.au/Series/F2019L00389", description: "SRC Act regulations" },
      { name: "Seafarers Rehabilitation and Compensation Act 1992", url: "https://www.legislation.gov.au/Series/C2004A04695", description: "Seafarers compensation" },
      { name: "Sex Discrimination Act 1984", url: "https://www.legislation.gov.au/Series/C2004A02868", description: "Federal sex discrimination protections" },
      { name: "Sex Discrimination Regulations 2018", url: "https://www.legislation.gov.au/Series/F2018L01309", description: "Sex discrimination regulations" },
      { name: "Work Health and Safety Act 2011", url: "https://www.legislation.gov.au/Series/C2011A00137", description: "Model WHS legislation" },
      { name: "Work Health and Safety Regulations 2011", url: "https://www.legislation.gov.au/Series/F2011L02664", description: "Model WHS regulations" }
    ]
  },
  {
    title: "Australian Capital Territory",
    description: "ACT workplace safety and discrimination legislation",
    icon: "🏢",
    gradient: "from-green-50 to-green-100",
    links: [
      { name: "Dangerous Goods (Road Transport) Act 2009", url: "https://www.legislation.act.gov.au/a/2009-22/", description: "Transport of dangerous goods" },
      { name: "Dangerous Goods (Road Transport) Regulation 2010", url: "https://www.legislation.act.gov.au/sl/2010-5/", description: "Dangerous goods transport regulations" },
      { name: "Dangerous Substances (Explosives) Regulation 2004", url: "https://www.legislation.act.gov.au/sl/2004-69/", description: "Explosives regulation" },
      { name: "Dangerous Substances Act 2004", url: "https://www.legislation.act.gov.au/a/2004-7/", description: "Dangerous substances framework" },
      { name: "Discrimination Act 1991", url: "https://www.legislation.act.gov.au/a/1991-81/", description: "ACT anti-discrimination protections" },
      { name: "Electricity Safety Act 1971", url: "https://www.legislation.act.gov.au/a/1971-6/", description: "Electrical safety standards" },
      { name: "Heavy Vehicle National Law (ACT)", url: "https://www.legislation.act.gov.au/a/2013-43/", description: "Heavy vehicle safety" },
      { name: "Heavy Vehicle National Law (ACT) (Transitional Provisions) Regulation 2014", url: "https://www.legislation.act.gov.au/sl/2014-16/", description: "Heavy vehicle transitional provisions" },
      { name: "Heavy Vehicle National Law (ACT) Act 2013", url: "https://www.legislation.act.gov.au/a/2013-43/", description: "Heavy vehicle national law adoption" },
      { name: "Rail Safety National Law (ACT) Act 2014", url: "https://www.legislation.act.gov.au/a/2014-15/", description: "Rail safety national law" },
      { name: "Rail Safety National Law (ACT) Regulation 2014", url: "https://www.legislation.act.gov.au/sl/2014-17/", description: "Rail safety regulations" },
      { name: "Work Health and Safety Act 2011", url: "https://www.legislation.act.gov.au/a/2011-35/", description: "ACT workplace safety legislation" },
      { name: "Work Health and Safety Regulation 2011", url: "https://www.legislation.act.gov.au/sl/2011-36/", description: "WHS regulations" },
      { name: "Workers Compensation Act 1951", url: "https://www.legislation.act.gov.au/a/1951-2/", description: "ACT workers compensation framework" },
      { name: "Workers Compensation Regulation 2002", url: "https://www.legislation.act.gov.au/sl/2002-21/", description: "Workers compensation regulations" },
      { name: "Workplace Privacy Act 2011", url: "https://www.legislation.act.gov.au/a/2011-24/", description: "Workplace surveillance and privacy" }
    ]
  },
  {
    title: "New South Wales",
    description: "NSW workplace safety and industrial relations laws",
    icon: "🌊",
    gradient: "from-indigo-50 to-indigo-100",
    links: [
      { name: "Anti-Discrimination Act 1977", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-1977-048", description: "NSW anti-discrimination protections" },
      { name: "Anti-Discrimination Regulation 2019", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2019-0611", description: "Anti-discrimination regulations" },
      { name: "Crimes Act 1900", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-1900-040", description: "NSW criminal law" },
      { name: "Dangerous Goods (Road and Rail Transport) Act 2008", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2008-095", description: "Dangerous goods transport" },
      { name: "Dangerous Goods (Road and Rail Transport) Regulation 2014", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2014-0669", description: "Dangerous goods regulations" },
      { name: "Heavy Vehicle (Adoption of National Law) Act 2013", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2013-022", description: "Heavy vehicle national law adoption" },
      { name: "Heavy Vehicle National Law (NSW)", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2013-022", description: "Heavy vehicle safety" },
      { name: "Industrial Relations (General) Regulation 2020", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2020-0669", description: "Industrial relations regulations" },
      { name: "Industrial Relations Act 1996", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-1996-017", description: "NSW industrial relations framework" },
      { name: "Marine Safety Act 1998", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-1998-121", description: "Marine safety" },
      { name: "Marine Safety Regulation 2016", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2016-0451", description: "Marine safety regulations" },
      { name: "Rail Safety (Adoption of National Law) Act 2012", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2012-082", description: "Rail safety adoption" },
      { name: "Rail Safety (Adoption of National Law) Regulation 2018", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2018-0542", description: "Rail safety regulations" },
      { name: "Rail Safety National Law (NSW)", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2012-082", description: "Rail safety framework" },
      { name: "Rail Safety National Law National Regulations 2012", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2012-0746", description: "Rail safety national regulations" },
      { name: "State Insurance and Care Governance Act 2015", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2015-019", description: "Insurance governance" },
      { name: "Work Health and Safety (Mines and Petroleum Sites) Act 2013", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2013-054", description: "Mining and petroleum safety" },
      { name: "Work Health and Safety (Mines and Petroleum Sites) Regulation 2022", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2022-0519", description: "Mining regulation" },
      { name: "Work Health and Safety Act 2011", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2011-010", description: "NSW workplace safety legislation" },
      { name: "Work Health and Safety Regulation 2017", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2017-0404", description: "WHS regulations" },
      { name: "Workers Compensation Act 1987", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-1987-070", description: "NSW workers compensation system" },
      { name: "Workers Compensation Regulation 2016", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2016-0307", description: "Workers compensation regulations" },
      { name: "Workplace Injury Management and Workers Compensation Act 1998", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-1998-086", description: "Injury management framework" },
      { name: "Workplace Surveillance Act 2005", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/act-2005-047", description: "Employee monitoring and privacy" },
      { name: "Workplace Surveillance Regulation 2017", url: "https://www.legislation.nsw.gov.au/view/html/inforce/current/sl-2017-0442", description: "Surveillance regulations" }
    ]
  },
  {
    title: "Northern Territory",
    description: "NT workplace safety and compensation legislation",
    icon: "🏜️",
    gradient: "from-orange-50 to-orange-100",
    links: [
      { name: "Anti-Discrimination Act 1992", url: "https://legislation.nt.gov.au/en/Legislation/ANTI-DISCRIMINATION-ACT-1992", description: "NT anti-discrimination protections" },
      { name: "Anti-Discrimination Regulations 1994", url: "https://legislation.nt.gov.au/en/Legislation/ANTI-DISCRIMINATION-REGULATIONS-1994", description: "Anti-discrimination regulations" },
      { name: "Compensation (Fatal Injuries) Act 1974", url: "https://legislation.nt.gov.au/en/Legislation/COMPENSATION-FATAL-INJURIES-ACT-1974", description: "Fatal injury compensation" },
      { name: "Dangerous Goods Act 1998", url: "https://legislation.nt.gov.au/en/Legislation/DANGEROUS-GOODS-ACT-1998", description: "Dangerous goods regulation" },
      { name: "Dangerous Goods Regulations 1985", url: "https://legislation.nt.gov.au/en/Legislation/DANGEROUS-GOODS-REGULATIONS-1985", description: "Dangerous goods regulations" },
      { name: "Electrical Safety Act 2022", url: "https://legislation.nt.gov.au/en/Legislation/ELECTRICAL-SAFETY-ACT-2022", description: "Electrical safety standards" },
      { name: "Electrical Safety Regulations 2024", url: "https://legislation.nt.gov.au/en/Legislation/ELECTRICAL-SAFETY-REGULATIONS-2024", description: "Electrical safety regulations" },
      { name: "Marine Safety (Domestic Commercial Vessel) (National Uniform Legislation) Act 2013", url: "https://legislation.nt.gov.au/en/Legislation/MARINE-SAFETY-DOMESTIC-COMMERCIAL-VESSEL-NATIONAL-UNIFORM-LEGISLATION-ACT-2013", description: "Marine vessel safety" },
      { name: "Mining Management Act 2001", url: "https://legislation.nt.gov.au/en/Legislation/MINING-MANAGEMENT-ACT-2001", description: "Mining operations safety" },
      { name: "Mining Management Regulations 2001", url: "https://legislation.nt.gov.au/en/Legislation/MINING-MANAGEMENT-REGULATIONS-2001", description: "Mining regulations" },
      { name: "Notifiable Diseases Act 1981", url: "https://legislation.nt.gov.au/en/Legislation/NOTIFIABLE-DISEASES-ACT-1981", description: "Disease notification" },
      { name: "Radiation Protection Act 2004", url: "https://legislation.nt.gov.au/en/Legislation/RADIATION-PROTECTION-ACT-2004", description: "Radiation safety" },
      { name: "Radiation Protection Regulations 2007", url: "https://legislation.nt.gov.au/en/Legislation/RADIATION-PROTECTION-REGULATIONS-2007", description: "Radiation protection regulations" },
      { name: "Rail Safety (National Uniform Legislation) Act 2012", url: "https://legislation.nt.gov.au/en/Legislation/RAIL-SAFETY-NATIONAL-UNIFORM-LEGISLATION-ACT-2012", description: "Rail safety framework" },
      { name: "Rail Safety (National Uniform Legislation) Regulations 2013", url: "https://legislation.nt.gov.au/en/Legislation/RAIL-SAFETY-NATIONAL-UNIFORM-LEGISLATION-REGULATIONS-2013", description: "Rail safety regulations" },
      { name: "Return to Work Act 1986", url: "https://legislation.nt.gov.au/en/Legislation/RETURN-TO-WORK-ACT-1986", description: "NT workers compensation and rehabilitation" },
      { name: "Return to Work Regulations 1986", url: "https://legislation.nt.gov.au/en/Legislation/RETURN-TO-WORK-REGULATIONS-1986", description: "Return to work regulations" },
      { name: "Work Health Administration Act 2011", url: "https://legislation.nt.gov.au/en/Legislation/WORK-HEALTH-ADMINISTRATION-ACT-2011", description: "WHS administration" },
      { name: "Work Health And Safety (National Uniform Legislation) Act 2011", url: "https://legislation.nt.gov.au/en/Legislation/WORK-HEALTH-AND-SAFETY-NATIONAL-UNIFORM-LEGISLATION-ACT-2011", description: "NT workplace safety legislation" },
      { name: "Work Health and Safety (National Uniform Legislation) Regulations 2011", url: "https://legislation.nt.gov.au/en/Legislation/WORK-HEALTH-AND-SAFETY-NATIONAL-UNIFORM-LEGISLATION-REGULATIONS-2011", description: "WHS regulations" }
    ]
  },
  {
    title: "Queensland",
    description: "QLD workplace safety and industrial relations laws",
    icon: "☀️",
    gradient: "from-yellow-50 to-yellow-100",
    links: [
      { name: "Anti-Discrimination Act 1991", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-1991-085", description: "QLD anti-discrimination protections" },
      { name: "Anti-Discrimination Regulation 2005", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2005-0168", description: "Anti-discrimination regulations" },
      { name: "Coal Mining Safety and Health Act 1999", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-1999-003", description: "Coal mining safety regulations" },
      { name: "Coal Mining Safety and Health Regulation 2017", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2017-0129", description: "Coal mining regulations" },
      { name: "Electrical Safety Act 2002", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2002-056", description: "Electrical safety" },
      { name: "Electrical Safety Regulation 2013", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2013-0222", description: "Electrical safety regulations" },
      { name: "Heavy Vehicle National Law (Queensland)", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2012-032", description: "Heavy vehicle safety" },
      { name: "Heavy Vehicle National Law Act 2012", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2012-032", description: "Heavy vehicle law adoption" },
      { name: "Industrial Relations Act 2016", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2016-063", description: "QLD industrial relations framework" },
      { name: "Industrial Relations Regulation 2018", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2018-0142", description: "Industrial relations regulations" },
      { name: "Mining and Quarrying Safety and Health Act 1999", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-1999-040", description: "Mining and quarrying safety" },
      { name: "Mining and Quarrying Safety and Health Regulation 2017", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2017-0128", description: "Mining regulations" },
      { name: "Petroleum and Gas (Production and Safety) Act 2004", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2004-014", description: "Petroleum safety" },
      { name: "Petroleum and Gas (Safety) Regulation 2018", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2018-0143", description: "Petroleum regulations" },
      { name: "Radiation Safety Act 1999", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-1999-041", description: "Radiation safety" },
      { name: "Radiation Safety Regulation 2010", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2010-0197", description: "Radiation regulations" },
      { name: "Rail Safety National Law (Queensland)", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2017-020", description: "Rail safety framework" },
      { name: "Rail Safety National Law (Queensland) Act 2017", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2017-020", description: "Rail safety adoption" },
      { name: "Rail Safety National Law (Queensland) Regulation 2017", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2017-0137", description: "Rail safety regulations" },
      { name: "Work Health and Safety Act 2011", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2011-018", description: "QLD workplace safety legislation" },
      { name: "Work Health and Safety Regulation 2011", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2011-240", description: "WHS regulations" },
      { name: "Workers' Compensation and Rehabilitation Act 2003", url: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2003-027", description: "QLD workers compensation system" }
    ]
  },
  {
    title: "South Australia",
    description: "SA workplace safety and equal opportunity laws",
    icon: "🍷",
    gradient: "from-red-50 to-red-100",
    links: [
      { name: "Dangerous Substances (Dangerous Goods Transport) Regulations 2008", url: "https://www.legislation.sa.gov.au/lz/v/r/2008/dangerous%20substances%20(dangerous%20goods%20transport)%20regulations%202008", description: "Dangerous goods transport" },
      { name: "Dangerous Substances (General) Regulations 2017", url: "https://www.legislation.sa.gov.au/lz/v/r/2017/dangerous%20substances%20(general)%20regulations%202017", description: "General dangerous substances" },
      { name: "Dangerous Substances Act 1979", url: "https://www.legislation.sa.gov.au/lz/c/a/dangerous%20substances%20act%201979", description: "Hazardous substance management" },
      { name: "Equal Opportunity Act 1984", url: "https://www.legislation.sa.gov.au/lz/c/a/equal%20opportunity%20act%201984", description: "SA equal opportunity protections" },
      { name: "Fair Work Act 1994", url: "https://www.legislation.sa.gov.au/lz/c/a/fair%20work%20act%201994", description: "SA fair work" },
      { name: "Heavy Vehicle National Law (South Australia) Act 2013", url: "https://www.legislation.sa.gov.au/lz/c/a/heavy%20vehicle%20national%20law%20(south%20australia)%20act%202013", description: "Heavy vehicle adoption" },
      { name: "Mines and Works Inspection Act 1920", url: "https://www.legislation.sa.gov.au/lz/c/a/mines%20and%20works%20inspection%20act%201920", description: "Mining operations inspection" },
      { name: "Mines and Works Inspection Regulations 1998", url: "https://www.legislation.sa.gov.au/lz/v/r/1998/mines%20and%20works%20inspection%20regulations%201998", description: "Mining inspection regulations" },
      { name: "Rail Safety National Law (South Australia) (Drug and Alcohol Testing) Regulations 2012", url: "https://www.legislation.sa.gov.au/lz/v/r/2012/rail%20safety%20national%20law%20(south%20australia)%20(drug%20and%20alcohol%20testing)%20regulations%202012", description: "Rail safety drug testing" },
      { name: "Rail Safety National Law (South Australia) (Transitional Arrangements) Regulations 2012", url: "https://www.legislation.sa.gov.au/lz/v/r/2012/rail%20safety%20national%20law%20(south%20australia)%20(transitional%20arrangements)%20regulations%202012", description: "Rail safety transitional" },
      { name: "Rail Safety National Law (South Australia) Act 2012", url: "https://www.legislation.sa.gov.au/lz/c/a/rail%20safety%20national%20law%20(south%20australia)%20act%202012", description: "Rail safety adoption" },
      { name: "Rail Safety National Law National Regulations 2012", url: "https://www.legislation.sa.gov.au/lz/v/r/2012/rail%20safety%20national%20law%20national%20regulations%202012", description: "Rail safety national regulations" },
      { name: "Return to Work Act 2014", url: "https://www.legislation.sa.gov.au/lz/c/a/return%20to%20work%20act%202014", description: "SA workers compensation and rehabilitation" },
      { name: "Return to Work Regulations 2015", url: "https://www.legislation.sa.gov.au/lz/v/r/2015/return%20to%20work%20regulations%202015", description: "Return to work regulations" },
      { name: "Work Health and Safety Act 2012", url: "https://www.legislation.sa.gov.au/lz/c/a/work%20health%20and%20safety%20act%202012", description: "SA workplace safety legislation" },
      { name: "Work Health and Safety Regulations 2012", url: "https://www.legislation.sa.gov.au/lz/v/r/2012/work%20health%20and%20safety%20regulations%202012", description: "WHS regulations" }
    ]
  },
  {
    title: "Tasmania",
    description: "TAS workplace safety and compensation legislation",
    icon: "🍃",
    gradient: "from-emerald-50 to-emerald-100",
    links: [
      { name: "Anti-Discrimination Act 1998", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-1998-046", description: "TAS anti-discrimination protections" },
      { name: "Asbestos-Related Diseases (Occupational Exposure) Compensation Act 2011", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2011-079", description: "Asbestos disease compensation" },
      { name: "Asbestos-Related Diseases (Occupational Exposure) Compensation Regulations 2011", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2011-144", description: "Asbestos compensation regulations" },
      { name: "Dangerous Goods (Road and Rail Transport) Act 2010", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2010-039", description: "Dangerous goods transport" },
      { name: "Dangerous Goods (Road and Rail Transport) Regulations 2010", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2010-179", description: "Dangerous goods regulations" },
      { name: "Electricity Safety Act 2022", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2022-007", description: "Electrical safety" },
      { name: "Explosives Act 2012", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2012-018", description: "Explosives regulation" },
      { name: "Explosives Regulations 2012", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2012-080", description: "Explosives regulations" },
      { name: "Heavy Vehicle National Law (Tasmania) Act 2013", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2013-013", description: "Heavy vehicle adoption" },
      { name: "Heavy Vehicle National Law (Tasmania) Regulations 2014", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2014-011", description: "Heavy vehicle regulations" },
      { name: "Mines Work Health and Safety (Supplementary Requirements) Act 2012", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2012-017", description: "Mining safety requirements" },
      { name: "Mines Work Health and Safety (Supplementary Requirements) Regulations 2022", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2022-095", description: "Mining safety regulations" },
      { name: "Rail Safety National Law (Tasmania) Act 2012", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2012-020", description: "Rail safety adoption" },
      { name: "Work Health and Safety Act 2012", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/act-2012-016", description: "TAS workplace safety legislation" },
      { name: "Work Health and Safety Regulations 2022", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2022-094", description: "WHS regulations" },
      { name: "Workers Rehabilitation and Compensation Act 1988", url: "http://www.thelaw.tas.gov.au/tocview/index.w3p;cond=;doc_id=4%2B%2B1988%2BAT%40EN%2B20070709100000", description: "TAS workers compensation and rehabilitation" },
      { name: "Workers Rehabilitation and Compensation Regulations 2021", url: "https://www.legislation.tas.gov.au/view/html/inforce/current/sr-2021-049", description: "Workers compensation regulations" }
    ]
  },
  {
    title: "Victoria",
    description: "VIC workplace safety and compensation legislation",
    icon: "🏛️",
    gradient: "from-purple-50 to-purple-100",
    links: [
      { name: "Accident Compensation (Occupational Health and Safety) Act 1996", url: "https://www.legislation.vic.gov.au/in-force/acts/accident-compensation-occupational-health-and-safety-act-1996", description: "VIC OHS and compensation framework" },
      { name: "Accident Compensation Act 1985", url: "https://www.legislation.vic.gov.au/in-force/acts/accident-compensation-act-1985", description: "VIC accident compensation system" },
      { name: "Asbestos Diseases Compensation Act 2008", url: "https://www.legislation.vic.gov.au/in-force/acts/asbestos-diseases-compensation-act-2008", description: "Asbestos disease compensation" },
      { name: "Crimes Act 1958", url: "https://www.legislation.vic.gov.au/in-force/acts/crimes-act-1958", description: "VIC criminal law" },
      { name: "Dangerous Goods (Explosives) Regulations 2011", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/dangerous-goods-explosives-regulations-2011", description: "Explosives regulations" },
      { name: "Dangerous Goods (Storage and Handling) Regulations 2012", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/dangerous-goods-storage-and-handling-regulations-2012", description: "Dangerous goods storage" },
      { name: "Dangerous Goods (Transport by Road or Rail) Regulations 2018", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/dangerous-goods-transport-road-or-rail-regulations-2018", description: "Dangerous goods transport" },
      { name: "Dangerous Goods Act 1985", url: "https://www.legislation.vic.gov.au/in-force/acts/dangerous-goods-act-1985", description: "Dangerous goods framework" },
      { name: "Electricity Safety Act 1998", url: "https://www.legislation.vic.gov.au/in-force/acts/electricity-safety-act-1998", description: "Electrical safety" },
      { name: "Energy Safe Victoria Act 2005", url: "https://www.legislation.vic.gov.au/in-force/acts/energy-safe-victoria-act-2005", description: "Energy safety regulation" },
      { name: "Equal Opportunity Act 2010", url: "https://www.legislation.vic.gov.au/in-force/acts/equal-opportunity-act-2010", description: "VIC equal opportunity protections" },
      { name: "Equipment (Public Safety) Act 1994", url: "https://www.legislation.vic.gov.au/in-force/acts/equipment-public-safety-act-1994", description: "Public safety equipment" },
      { name: "Equipment (Public Safety) Regulations 2017", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/equipment-public-safety-regulations-2017", description: "Equipment safety regulations" },
      { name: "Heavy Vehicle National Law Application (Infringements) Regulations 2013", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/heavy-vehicle-national-law-application-infringements-regulations-2013", description: "Heavy vehicle infringements" },
      { name: "Heavy Vehicle National Law Application Act 2013", url: "https://www.legislation.vic.gov.au/in-force/acts/heavy-vehicle-national-law-application-act-2013", description: "Heavy vehicle law adoption" },
      { name: "Occupational Health and Safety Act 2004", url: "https://www.legislation.vic.gov.au/in-force/acts/occupational-health-and-safety-act-2004", description: "VIC workplace safety legislation" },
      { name: "Occupational Health and Safety Regulations 2017", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/occupational-health-and-safety-regulations-2017", description: "OHS regulations" },
      { name: "Rail Safety National Law (Victoria) (Drug and Alcohol Controls) Regulations 2019", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/rail-safety-national-law-victoria-drug-and-alcohol-controls-regulations-2019", description: "Rail safety drug controls" },
      { name: "Rail Safety National Law Application Act 2013", url: "https://www.legislation.vic.gov.au/in-force/acts/rail-safety-national-law-application-act-2013", description: "Rail safety adoption" },
      { name: "Workers Compensation Act 1958", url: "https://www.legislation.vic.gov.au/in-force/acts/workers-compensation-act-1958", description: "VIC workers compensation system" },
      { name: "Workplace Injury Rehabilitation and Compensation Act 2013", url: "https://www.legislation.vic.gov.au/in-force/acts/workplace-injury-rehabilitation-and-compensation-act-2013", description: "Injury rehabilitation framework" },
      { name: "Workplace Injury Rehabilitation and Compensation Regulations 2024", url: "https://www.legislation.vic.gov.au/in-force/statutory-rules/workplace-injury-rehabilitation-and-compensation-regulations-2024", description: "WIRC regulations" }
    ]
  },
  {
    title: "Western Australia",
    description: "WA workplace safety and mining legislation",
    icon: "⚒️",
    gradient: "from-purple-50 to-purple-100",
    links: [
      { name: "Dangerous Goods Safety Act 2004", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_218_homepage.html", description: "Dangerous goods safety management" },
      { name: "Dangerous Goods Safety (Explosives) Regulations 2007", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13288_homepage.html", description: "Explosives safety regulations" },
      { name: "Dangerous Goods Safety (General) Regulations 2007", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13289_homepage.html", description: "General dangerous goods regulations" },
      { name: "Dangerous Goods Safety (Road and Rail Transport of Non-explosives) Regulations 2007", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13290_homepage.html", description: "Transport of non-explosive dangerous goods" },
      { name: "Dangerous Goods Safety (Storage and Handling of Non-explosives) Regulations 2007", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13291_homepage.html", description: "Storage of non-explosive dangerous goods" },
      { name: "Equal Opportunity Act 1984", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_305_homepage.html", description: "WA equal opportunity protections" },
      { name: "Heavy Vehicle National Law (WA) Act 2013", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13647_homepage.html", description: "Heavy vehicle law adoption" },
      { name: "Mines Safety and Inspection Act 1994", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_594_homepage.html", description: "Mining safety and inspection" },
      { name: "Mines Safety and Inspection Regulations 1995", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_595_homepage.html", description: "Mining safety regulations" },
      { name: "Workers Compensation and Injury Management Act 2023", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/law_a147404.html", description: "Compensation and Injury Management" },
      { name: "Workers Compensation and Injury Management Regulations 2024", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/law_s54452.html", description: "Compensation and Injury Management Regulations" },
      { name: "Rail Safety National Law (WA) (Alcohol and Drug Testing) Regulations 2015", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13678_homepage.html", description: "Rail safety drug testing" },
      { name: "Rail Safety National Law (WA) Act 2015", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13677_homepage.html", description: "Rail safety adoption" },
      { name: "Rail Safety National Law (WA) Regulations 2015", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13679_homepage.html", description: "Rail safety regulations" },
      { name: "Road Traffic (Administration) Act 2008", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13406_homepage.html", description: "Road traffic administration" },
      { name: "Road Traffic (Vehicles) Act 2012", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13583_homepage.html", description: "Vehicle safety standards" },
      { name: "Workers' Compensation (Common Law Proceedings) Act 2004", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_1027_homepage.html", description: "Common law compensation proceedings" },
      { name: "Workers Compensation and Injury Management Act 2023", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_14092_homepage.html", description: "WA workers compensation and injury management" },
      { name: "Workers Compensation and Injury Management Regulations 2024", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_14093_homepage.html", description: "Workers compensation regulations" },
      { name: "Work Health and Safety Act 2020", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_13965_homepage.html", description: "WA workplace safety legislation" },
      { name: "Work Health and Safety (General) Regulations 2022", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_14011_homepage.html", description: "General WHS regulations" },
      { name: "Work Health and Safety (Mines) Regulations 2022", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_14012_homepage.html", description: "Mining WHS regulations" },
      { name: "Work Health and Safety (Petroleum and Geothermal Energy Operations) Regulations 2022", url: "https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_14013_homepage.html", description: "Petroleum and geothermal WHS regulations" }
    ]
  }
]
  
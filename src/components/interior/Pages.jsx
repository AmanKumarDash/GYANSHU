import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowUpRight, BadgeCheck, Boxes, Building2, Compass, Eye, Layers, Mail, MapPin, Phone, Search, Send, ShieldCheck, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { caseStudies, faqs, services, team } from '../../data/content'
import { getPage, industryLinks, productLinks, serviceLinks } from '../../data/sitePages'
import { getScene } from '../../data/visualScenes'
import { defaultNeeds, faqPicks, imagePools, industryIcons, industryImages, operatingNeeds, serviceImages } from '../../data/pageMedia'
import { ArrowButton, Eyebrow, Reveal } from '../ui/Motion'
import { Bento, CaseGrid, CtaPhotos, FaqDark, FeatureCards, HeroCentered, KeyFeatures, NeedsSplit, Orbit, Quotes, Statement, StatsBand, StepsBanner } from './Blocks'
import { EASE, photo } from '../../utils/intro'

/* ---------- shared copy & helpers ---------- */

const delivery = [
  ['Assess', 'Understand the environment, priorities, and constraints.'],
  ['Design', 'Shape a practical architecture and roadmap.'],
  ['Implement', 'Deliver with documentation and clear accountability.'],
  ['Validate', 'Confirm outcomes against agreed acceptance criteria.'],
  ['Improve', 'Operate, measure, and refine over time.'],
]
const engagement = [
  ['Discover and assess', 'Start with the environment, the people, and the priorities.'],
  ['Design a practical roadmap', 'Sequence the work so value arrives early.'],
  ['Deliver with your team', 'Implement, integrate, and transfer knowledge.'],
  ['Improve and support', 'Stay accountable through ongoing operations.'],
]
const guiding = [
  { title: 'A clear path from assessment to delivery', text: 'Priorities, decisions, and ownership stay visible at every step.' },
  { title: 'Experienced, multidisciplinary teams', text: 'Security, infrastructure, software, and IoT expertise working as one.' },
  { title: 'Security and reliability built into the work', text: 'Controls, documentation, and evidence designed in from the start.' },
  { title: 'Support beyond launch', text: 'Managed operations, monitoring, and improvement after go-live.' },
]
const voices = team.map((t) => ({ name: t.name, role: t.role, quote: t.quote, colors: t.colors }))
const stats = [[productLinks.length, '', 'Purpose-built platforms'], [services.length, '', 'Capability areas'], [industryLinks.length, '', 'Industries served'], [delivery.length, '', 'Delivery phases']]
const serviceCards = serviceLinks.map((l) => ({ title: l.label, text: getPage(l.to).subtitle, image: serviceImages[l.to], to: l.to }))
const industryCards = industryLinks.map((l) => ({ title: l.label, text: getPage(l.to).subtitle, image: industryImages[l.to], to: l.to, tag: 'Industry' }))
const pool = (page) => imagePools[getScene(page).type] || imagePools.company
const pickFaqs = (key, n) => (faqPicks[key] || faqs.map((_, i) => i)).slice(0, n).map((i) => faqs[i])

/* ---------- listings ---------- */

export function ServicesListing({ page }) {
  return <main>
    <HeroCentered eyebrow="Technology solutions" crumbs={[['Solutions']]} title={page.title} pill={Object.values(serviceImages)} subtitle={page.subtitle} intro={page.intro}
      images={Object.values(serviceImages)} captions={serviceLinks.map((l) => l.label)} mediaLabel="Gyanshu practices" chips={['Cybersecurity', 'Infrastructure', 'IoT', 'Applications', 'Compliance']} />
    <Statement eyebrow="Our approach" text="Cybersecurity, infrastructure, software, AI, and connected operations—brought together around your environment and priorities. Practical expertise for critical technology environments." />
    <Bento eyebrow="Practices" title="Five practices," accent="one accountable team." lede="Each practice can stand alone or work together across a single engagement." items={serviceCards} />
    <FeatureCards eyebrow="Capabilities" title="Everything we bring," accent="end to end." lede="We consult, design, implement, integrate, operate, and improve environments with clear accountability." items={services.map((s) => ({ title: s.title, text: s.desc, tags: s.tags }))} />
    <StepsBanner eyebrow="How we work" title="From understanding to" accent="improvement." steps={delivery} image="photo-1639322537228-f710d846310a" note="A considered engineering sequence keeps priorities visible, decisions grounded, and ownership clear." />
    <FaqDark lede="What teams usually ask before an engagement begins." items={pickFaqs('/solutions', 5)} />
    <CtaPhotos images={Object.values(serviceImages).concat(imagePools.company.slice(0, 3))} />
  </main>
}

export function IndustriesListing({ page }) {
  const images = Object.values(industryImages)
  return <main>
    <HeroCentered eyebrow="Industries" crumbs={[['Industries']]} title={page.title} muted={2} pill={images.slice(0, 4)} pillAfter={0} subtitle={page.subtitle}
      images={images.slice(0, 5)} captions={industryLinks.slice(0, 5).map((l) => l.label)} mediaLabel="Sectors we serve" chips={industryLinks.slice(0, 3).map((l) => l.label)} />
    <Statement eyebrow="Our perspective" text={page.intro} />
    <Orbit eyebrow="Industries" image="photo-1484557052118-f32bd25b45b5" title="Built for the way your sector operates."
      text="Every industry faces a different mix of risk, regulation, and operational pressure. We design practical solutions that fit the environment and the people who run it."
      cta={{ label: 'Talk to a specialist', to: '/contact' }} items={industryLinks.map((l) => ({ label: l.label, to: l.to, icon: industryIcons[l.to] }))} />
    <CaseGrid eyebrow="All industries" title="See every industry we serve" muted={3} items={industryCards} pageSize={6} />
    <StatsBand eyebrow="At a glance" title="Secure technology for" accent="high-stakes environments." lede="Platforms, practices, and delivery discipline shaped around complex organizations." stats={stats} />
    <CtaPhotos images={images} />
  </main>
}

/* ---------- service detail ---------- */

export function ServiceDetail({ page }) {
  if (page.path === '/services/cybersecurity') return <CybersecurityServiceContent page={page} />
  const isNetwork = page.path === '/services/network'
  const isIot = page.path === '/services/iot'
  const isApplication = page.path === '/services/application'
  const isRegulatory = page.path === '/services/regulatory'
  const hero = serviceImages[page.path]
  const images = [hero, ...pool(page).filter((id) => id !== hero)].slice(0, 4)
  const related = isIot
    ? [
        { title: 'FLOWBITS NEXORA', text: 'Internet Protocol Detail Record System. Advanced IPDR and NAT logging platform designed for ISPs and telecom operators to achieve complete visibility, traceability, and compliance in network data flows.', image: imagePools.network[0], to: '/products/ipdr', tag: 'Related solution' },
      ]
    : isNetwork
    ? [
        { title: 'FLOWBITS NEXORA', text: 'Internet Protocol Detail Record System. Advanced IPDR and NAT logging platform designed for ISPs and telecom operators to achieve complete visibility, traceability, and compliance in network data flows.', image: imagePools.network[0], to: '/products/ipdr', tag: 'Network solution' },
        { title: 'Nested VA', text: 'Vulnerability Assessment & Pen-Testing. Automated platform to simulate attacks and secure your infrastructure against sophisticated threats with detailed reporting and compliance checks.', image: imagePools.security[0], to: '/products/vapt', tag: 'Security solution' },
      ]
    : serviceCards.filter((c) => c.to !== page.path).slice(0, 3).map((c) => ({ ...c, tag: 'Service' }))
  const process = isIot
    ? [['Discovery & Strategy', ''], ['Prototype Development', ''], ['Pilot Implementation', ''], ['Full-scale Deployment', ''], ['Monitoring & Optimization', '']]
    : isNetwork
    ? [['Current Infrastructure Audit', ''], ['Performance Analysis', ''], ['Security Assessment', ''], ['Design & Planning', ''], ['Implementation & Support', '']]
    : engagement
  const networkOfferings = [
    ['Network Design', 'Strategic network architecture design for optimal performance, scalability, and security.'],
    ['IT Setup', 'Complete IT infrastructure setup and configuration for new installations and upgrades.'],
    ['IT Infra AMC', 'Annual maintenance contracts for proactive monitoring and preventive maintenance.'],
    ['IT Operations', '24/7 IT operations support ensuring continuous system availability and performance.'],
    ['Micro Data Center', 'Compact, secure data center solutions for edge computing and local data processing.'],
    ['Open Source Solutions', 'Cost-effective open source networking solutions with enterprise-grade reliability.'],
    ['Cloud Networking', 'Hybrid and multi-cloud networking solutions for seamless cloud integration.'],
    ['NMS & NOC Services', 'Network monitoring and operations center services for proactive network management.'],
  ]
  const networkStrengths = [
    'Certified Network Engineers: CCNA, CCNP, and other industry-certified professionals with years of experience.',
    'Proactive Monitoring: 24/7 network monitoring with automated alerts and rapid response capabilities.',
    'Scalable Solutions: Network designs that grow with your business and adapt to changing requirements.',
    'Redundant Systems: High-availability network designs with built-in redundancy and failover mechanisms.',
  ]
  const iotOfferings = [
    ['Rapid Prototyping', 'Fast, iterative prototyping for IoT and industrial applications to accelerate product development.'],
    ['Industrial Automation', 'Smart automation systems that enhance productivity, precision, and operational safety in manufacturing.'],
    ['Smart Manufacturing', 'Transform traditional factories into intelligent, data-driven manufacturing hubs with IoT integration.'],
    ['Embedded Solutions', 'Custom embedded systems that seamlessly integrate with hardware for real-time control and monitoring.'],
    ['Platform & Cloud Migration', 'Seamless migration of legacy systems and applications to secure, scalable cloud infrastructure.'],
    ['Infrastructure Automation', 'Automated infrastructure provisioning, scaling, and management with cutting-edge DevOps tools.'],
    ['IoT Security', 'Advanced end-to-end IoT cybersecurity solutions to protect connected devices and networks.'],
    ['IoT Consulting', 'Expert guidance on IoT strategy, architecture, and implementation for successful digital transformation.'],
  ]
  const iotApplications = [
    ['Manufacturing', 'Predictive maintenance, quality control, and production optimization through IoT sensors and analytics.', ['Equipment monitoring', 'Quality assurance', 'Energy optimization']],
    ['Healthcare', 'Remote patient monitoring, asset tracking, and automated inventory management in healthcare facilities.', ['Patient monitoring', 'Asset tracking', 'Medication management']],
    ['Retail', 'Inventory management, customer behavior analytics, and smart shelving solutions for retail environments.', ['Smart inventory', 'Customer analytics', 'Loss prevention']],
    ['Smart Buildings', 'Energy management, occupancy tracking, and automated facility operations for intelligent buildings.', ['Energy efficiency', 'Space optimization', 'Security integration']],
    ['Agriculture', 'Precision farming, crop monitoring, and automated irrigation systems for modern agriculture.', ['Crop monitoring', 'Soil analysis', 'Automated irrigation']],
    ['Smart Cities', 'Urban infrastructure monitoring, traffic management, and environmental sensing for smart city initiatives.', ['Traffic management', 'Environmental monitoring', 'Infrastructure monitoring']],
  ]
  const iotImplementation = [
    ['Requirements Analysis', 'Understanding your specific needs and defining the IoT solution scope and objectives.'],
    ['Hardware Selection', 'Choosing the right sensors, devices, and connectivity solutions for your application.'],
    ['Platform Development', 'Building the IoT platform for data collection, processing, and visualization.'],
    ['Integration & Testing', 'Seamless integration with existing systems and comprehensive testing for reliability.'],
  ]
  const applicationServices = [
    ['Custom Application Development', 'Tailored software solutions designed specifically for your business processes and requirements.'],
    ['Web Application Development', 'Scalable, responsive web applications with seamless API integrations and modern architectures.'],
    ['Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android with intuitive user experiences.'],
    ['Business Process Automation', 'Streamline workflows and automate repetitive tasks to improve efficiency and reduce errors.'],
    ['Application Modernization', 'Upgrade legacy systems to modern frameworks, improving performance and maintainability.'],
    ['App Maintenance & Support', 'Ongoing maintenance, updates, and technical support to keep your applications running smoothly.'],
    ['UX/UI Design Services', 'Creating intuitive, user-friendly interfaces that enhance user satisfaction and engagement.'],
    ['Application Security Services', 'Built-in security features and regular security audits to protect your applications and data.'],
  ]
  const applicationApproach = [
    ['Requirements Analysis', 'Thorough analysis of business requirements and user needs to define project scope.'],
    ['Agile Development', 'Iterative development with regular sprints, reviews, and continuous feedback loops.'],
    ['Quality Assurance', 'Comprehensive testing including unit tests, integration tests, and user acceptance testing.'],
    ['Deployment & Support', 'Smooth deployment and ongoing support to ensure optimal application performance.'],
  ]
  const appLifecycle = [['Discovery & Planning', ''], ['Design & Prototyping', ''], ['Development & Testing', ''], ['Deployment & Launch', ''], ['Maintenance & Support', '']]
  const applicationStack = [
    ['React', 'Frontend'], ['React Native', 'Mobile'], ['Python', 'Backend'], ['Java', 'Enterprise'], ['PostgreSQL', 'Database'], ['AWS/Azure', 'Cloud'],
  ]
  const applicationSolutions = [
    { title: 'GYANSHU HMS', text: 'Hostel Management System. A comprehensive solution for modern student housing, streamlining operations from allocation to billing with automated efficiency.', tags: ['View Details'] },
    { title: 'GYANSHU LMS', text: 'Learning Management System. An intuitive platform for educational institutions and corporate training, facilitating course delivery, tracking, and assessment with ease.', tags: ['View Details'] },
  ]
  const regulatoryServices = [
    ['Compliance Management', 'Legal and regulatory requirements including ISO, GRC, GDPR, HIPAA, PCI DSS, FISMA, and SOC standards.'],
    ['Governance Framework', 'Designing frameworks and tools for accountability, decision-making, and ethical business practices.'],
    ['Internal Audit & Control', 'Evaluating the effectiveness of internal controls, governance, and risk management processes.'],
    ['Risk Management', 'Comprehensive risk identification, assessment, and mitigation strategies to protect your organization.'],
    ['Incident & Crisis Management', 'Rapid response, continuity planning, and crisis communication to ensure operational resilience.'],
    ['Cybersecurity & Data Privacy', 'Advanced data protection frameworks and management practices for regulatory compliance.'],
    ['Regulatory Change Management', 'Monitoring, evaluating, and adapting to regulatory changes affecting your organization.'],
    ['Training & Awareness Programs', 'Comprehensive training and workshops on governance, risk, and compliance for your team.'],
  ]
  const complianceStandards = [
    ['GDPR', 'General Data Protection Regulation compliance for EU data protection and privacy requirements.', ['Data protection impact assessments', 'Privacy by design implementation', 'Data subject rights management']],
    ['HIPAA', 'Health Insurance Portability and Accountability Act compliance for healthcare data protection.', ['PHI protection and handling', 'Security risk assessments', 'Breach notification procedures']],
    ['PCI DSS', 'Payment Card Industry Data Security Standard compliance for payment processing security.', ['Cardholder data protection', 'Network segmentation', 'Regular security testing']],
    ['FISMA', 'Federal Information Security Management Act compliance for U.S. government agencies.', ['Security controls implementation', 'Continuous monitoring', 'Federal compliance reporting']],
    ['SOC 2', 'System and Organization Controls 2 compliance for service organization security and privacy.', ['Trust principles assessment', 'Control environment evaluation', 'Compliance auditing']],
    ['ISO Standards', 'International Organization for Standardization compliance including ISO 27001, 27002, and others.', ['Information security management', 'Risk management frameworks', 'International standards alignment']],
  ]
  const complianceProcess = [
    ['Gap Analysis', 'Comprehensive assessment of current compliance status and identification of gaps.'],
    ['Framework Development', 'Design and implementation of governance, risk, and compliance frameworks.'],
    ['Policy & Procedure Creation', 'Development of comprehensive policies, procedures, and controls for compliance.'],
    ['Training & Awareness', 'Employee training programs and awareness campaigns for compliance culture.'],
  ]
  const complianceRoadmap = [['Assessment & Planning', ''], ['Framework Design', ''], ['Policy Implementation', ''], ['Testing & Validation', ''], ['Monitoring & Maintenance', '']]
  const complianceBenefits = [
    ['Risk Mitigation', 'Reduce legal and financial risks through proactive compliance measures and robust risk management.'],
    ['Stakeholder Trust', 'Build confidence with customers, partners, and regulators through demonstrated compliance commitment.'],
    ['Business Opportunities', 'Access new markets and partnerships that require specific compliance certifications and standards.'],
    ['Operational Excellence', 'Improve processes, reduce inefficiencies, and enhance overall business performance through compliance frameworks.'],
  ]
  const complianceTools = [
    { title: 'FLOWBITS NEXORA', text: 'Internet Protocol Detail Record System. Advanced IPDR and NAT logging platform designed for ISPs and telecom operators to achieve complete visibility, traceability, and compliance in network data flows.', tags: ['View Details'] },
    { title: 'Nested VA', text: 'Vulnerability Assessment & Pen-Testing. Automated platform to simulate attacks and secure your infrastructure against sophisticated threats with detailed reporting and compliance checks.', tags: ['View Details'] },
  ]
  return <main>
    <HeroCentered eyebrow={isRegulatory ? 'REGULATORY COMPLIANCE' : isApplication ? 'INITIALIZING APPLICATION SERVICES' : isIot ? 'INTERNET OF THINGS' : isNetwork ? 'Network Services' : 'Services / Expertise'} crumbs={[["Services", '/solutions'], [page.title]]} title={isRegulatory ? 'Navigate Regulations Confidently with Our Tailored GRC Services' : isApplication ? 'Empowering Businesses: Through Agile Development Smarter Solutions for Digital World' : isIot ? 'Driving Innovation with IoT' : page.title} pill={images}
      subtitle={isRegulatory ? 'Comprehensive Regulatory Compliance Services' : isApplication ? 'Custom Application Development' : isIot ? 'Smart Solutions That Connect Devices, Transform Industries' : isNetwork ? 'Optimizing Connectivity: Enhancing Performance with Reliable IT Infrastructure' : page.subtitle}
      intro={isRegulatory ? 'Gyanshu provides comprehensive regulatory compliance services designed to help businesses navigate complex regulatory landscapes.' : isApplication ? 'Gyanshu provides innovative application development services with custom software solutions that enhance operational efficiency and drive business growth.' : isIot ? 'Gyanshu provides truly network services with IoT integration for real-time data, automation, and enhanced decision-making across various industries.' : isNetwork ? 'Gyanshu provides truly network services with design, implementation, and management solutions that optimize connectivity and enhance performance for your business.' : undefined}
      images={images} mediaLabel={getScene(page).label} captions={[getScene(page).subtitle]} chips={isRegulatory ? ['GRC Services', 'Compliance Management', 'Risk Management'] : isApplication ? ['Web Applications', 'Mobile Apps', 'Business Automation'] : isIot ? ['IoT Solutions', 'Industrial Automation', 'Smart Manufacturing'] : isNetwork ? ['Network Design', 'IT Operations', 'NMS & NOC Services'] : page.features.slice(0, 3)} />
    <Statement eyebrow={isRegulatory ? 'Comprehensive GRC Solutions' : isApplication ? 'Comprehensive Application Development Services' : isIot ? 'Comprehensive IoT Solutions' : isNetwork ? 'Complete Network Infrastructure Solutions' : 'Overview'} text={isRegulatory ? 'From risk assessment to compliance auditing, we help you meet all regulatory requirements and industry standards.' : isApplication ? 'From concept to deployment, we deliver robust, scalable applications that meet your unique business requirements.' : isIot ? 'From rapid prototyping to industrial automation, we deliver end-to-end IoT solutions that drive digital transformation.' : isNetwork ? 'Gyanshu delivers end-to-end network services from design and implementation to ongoing management and support.' : page.intro} />
    {!isIot && !isApplication && !isRegulatory && <NeedsSplit eyebrow={isNetwork ? 'Why Gyanshu Network Services' : 'Business challenges'} title={isNetwork ? 'Enterprise-Grade Network Infrastructure' : 'Where focused expertise can help.'} items={isNetwork ? networkStrengths : (operatingNeeds[page.path] || defaultNeeds)} />}
    <FeatureCards eyebrow={isRegulatory ? 'GRC Services' : isApplication ? 'Application Development Services' : isNetwork ? 'Network Services' : 'What we bring'} title={isRegulatory ? 'Comprehensive GRC Solutions' : isApplication ? 'Comprehensive Application Development Services' : isNetwork ? 'Complete Network Infrastructure Solutions' : 'Expertise that moves'} accent={isNetwork || isApplication || isRegulatory ? '' : 'work forward.'}
      lede={isApplication || isRegulatory ? undefined : isNetwork ? 'Gyanshu delivers end-to-end network services from design and implementation to ongoing management and support.' : 'A focused team helps you make progress from the first assessment through implementation and continuous improvement.'}
      items={isRegulatory ? regulatoryServices.map(([title, text]) => ({ title, text })) : isApplication ? applicationServices.map(([title, text]) => ({ title, text })) : isIot ? iotOfferings.map(([title, text]) => ({ title, text })) : isNetwork ? networkOfferings.map(([title, text]) => ({ title, text })) : page.features.map((f) => ({ title: f }))} />
    {isRegulatory && <FeatureCards eyebrow="Compliance Standards" title="Industry Compliance Frameworks" lede="We help organizations navigate complex compliance frameworks and industry standards across various sectors." items={complianceStandards.map(([title, text, tags]) => ({ title, text, tags }))} cols={3} />}
    {isRegulatory && <FeatureCards eyebrow="Compliance Process" title="Structured Approach to Regulatory Compliance" items={complianceProcess.map(([title, text]) => ({ title, text }))} />}
    {isApplication && <FeatureCards eyebrow="Our Development Approach" title="Agile Development Methodology" items={applicationApproach.map(([title, text]) => ({ title, text }))} />}
    {isApplication && <FeatureCards eyebrow="Technology Stack" title="Technology Stack" lede="We leverage cutting-edge technologies to build robust, scalable applications." items={applicationStack.map(([title, text]) => ({ title, tags: [text] }))} cols={3} />}
    {isApplication && <FeatureCards eyebrow="Software Solutions" title="Software Solutions" items={applicationSolutions} cols={2} />}
    {isApplication && <FeatureCards eyebrow="Development Training" title="Development Training" items={['Web App Audit', 'Cloud'].map((title) => ({ title }))} cols={2} />}
    {isRegulatory && <StepsBanner eyebrow="Compliance Process" title="Compliance Implementation Roadmap" steps={complianceRoadmap} image={images[1] || hero} />}
    {isRegulatory && <FeatureCards eyebrow="Benefits of Compliance" title="Benefits of Compliance" lede="Regulatory compliance isn't just about avoiding penalties—it's about building trust and competitive advantage." items={complianceBenefits.map(([title, text]) => ({ title, text }))} />}
    {isRegulatory && <FeatureCards eyebrow="Compliance & Auditing Tools" title="Compliance & Auditing Tools" items={complianceTools} cols={2} />}
    {isRegulatory && <FeatureCards eyebrow="Compliance Training" title="Compliance Training" items={['VAPT', 'Web App Audit'].map((title) => ({ title }))} cols={2} />}
    {isIot && <FeatureCards eyebrow="IOT APPLICATIONS" title="Industry Solutions" lede="Our IoT solutions are tailored for specific industries, delivering measurable results and competitive advantages." items={iotApplications.map(([title, text, tags]) => ({ title, text, tags }))} cols={3} />}
    {isIot && <FeatureCards eyebrow="IMPLEMENTATION PROCESS" title="End-to-End IoT Solution Development" items={iotImplementation.map(([title, text]) => ({ title, text }))} />}
    {isNetwork && <FeatureCards eyebrow="Network Certification Training" title="Network Certification Training" items={['CCNA', 'CCNP', 'Firewall', 'Linux'].map((title) => ({ title }))} cols={4} />}
    {isIot && <FeatureCards eyebrow="IoT Training" title="IoT Training" items={['Cyber Security', 'IoT'].map((title) => ({ title }))} cols={2} />}
    {!isRegulatory && <StepsBanner eyebrow={isApplication ? 'Development Lifecycle' : isIot ? 'IMPLEMENTATION PROCESS' : isNetwork ? 'Network Assessment Process' : 'How engagements move'} title={isApplication ? 'Development Lifecycle' : isIot ? 'IoT Development Roadmap' : isNetwork ? 'Network Assessment Process' : 'From first conversation to'} accent={isApplication || isIot || isNetwork ? '' : 'ongoing support.'} steps={isApplication ? appLifecycle : process} image={images[1] || hero} note={isApplication || isIot || isNetwork ? undefined : 'Practical expertise. Clear communication. Dependable outcomes.'} />}
    {!isNetwork && !isIot && !isApplication && !isRegulatory && <FaqDark lede={`Common questions about ${page.title.toLowerCase()}.`} items={pickFaqs(page.path, 4)} />}
    {!isApplication && !isRegulatory && <CaseGrid eyebrow={isIot ? 'Related Solutions' : isNetwork ? 'Network Solutions' : 'Related services'} title={isIot ? 'Related Solutions' : isNetwork ? 'Network Solutions' : 'Explore related services'} muted={isNetwork || isIot ? 0 : 2} items={related} pageSize={isNetwork ? 2 : isIot ? 1 : 6} link={{ label: 'All solutions', to: '/solutions' }} />}
    <CtaPhotos eyebrow={isRegulatory ? 'Compliance & Auditing' : isApplication ? 'Application Development' : isIot ? 'IoT' : isNetwork ? 'Network Infrastructure' : undefined} title={isRegulatory ? 'Ensure Compliance, Protect Your Business' : isApplication ? 'Transform Your Business with Custom Applications' : isIot ? 'Transform Your Business with IoT' : isNetwork ? 'Secure Your Network Infrastructure' : undefined}
      text={isRegulatory ? "Let's discuss your compliance requirements and build a comprehensive regulatory strategy." : isApplication ? "Let's discuss your project requirements and build the perfect solution for your business needs. Call: +91 9938883028" : isIot ? "Unlock the power of connected devices and real-time data insights. Let’s build your IoT solution today." : isNetwork ? "Don't let network issues slow down your business. Contact us for a comprehensive network assessment." : undefined}
      cta={isRegulatory ? 'Compliance Assessment' : isApplication ? 'Start Your Project' : isIot ? 'Start IoT Project' : isNetwork ? 'Get Network Assessment' : undefined} images={images.concat(imagePools.company.slice(0, 2))} />
    {isNetwork && <section className="bg-ink px-5 py-4 text-center text-sm text-white/80"><span className="font-medium text-white">Emergency Support:</span> <a className="underline underline-offset-4" href="tel:+919938883028">+91 9938883028</a></section>}
  </main>
}

const cyberServices = [
  ['VAPT Services', 'Vulnerability Assessment and Penetration Testing to identify and remediate security weaknesses.', 'photo-1550751827-4bd374c3f58b'],
  ['Source Code Review', 'Comprehensive code analysis to identify security vulnerabilities in your applications.', 'photo-1515879218367-8466d910aaa4'],
  ['Mobile Security', 'Protect mobile applications and devices with advanced security measures and best practices.', 'photo-1516321318423-f06f85e504b3'],
  ['Cloud Security', 'Secure cloud infrastructure with next-gen security tools and compliance measures.', 'photo-1451187580459-43490279c0fa'],
  ['Threat Management', 'Continuous monitoring and rapid response to security incidents, ensuring your business stays protected 24/7.', 'photo-1526374965328-7f61d4dc18c5'],
  ['Incident Management', 'Rapid incident response and management to minimize downtime and damage.', 'photo-1551808525-51a94da548ce'],
  ['Red Teaming', 'Simulated attacks to test your defense strategies against real-world cyber threats.', 'photo-1563986768609-322da13575f3'],
  ['Security Solutions', 'Comprehensive security frameworks and solutions tailored to your business needs.', 'photo-1552664730-d307ca884978'],
]

const cyberStrengths = [
  ['Certified Security Professionals', 'Our team holds industry-recognized certifications and stays updated with the latest security trends.', 'photo-1521737711867-e3b97375f902'],
  ['Proactive Security Approach', 'We don’t just react to threats—we prevent them with continuous monitoring and threat intelligence.', 'photo-1516321318423-f06f85e504b3'],
  ['Compliance-Focused Solutions', 'Our services ensure compliance with industry standards and regulatory requirements.', 'photo-1454165804606-c3d57bc86b40'],
  ['24/7 Security Monitoring', 'Round-the-clock monitoring and incident response to protect your business at all times.', 'photo-1550751827-4bd374c3f58b'],
]

function CybersecurityServiceContent({ page }) {
  const hero = serviceImages[page.path]
  const securityImages = imagePools.security
  const steps = [
    ['Initial Security Assessment', ''],
    ['Vulnerability Scanning', ''],
    ['Penetration Testing', ''],
    ['Risk Analysis & Reporting', ''],
    ['Implementation & Monitoring', ''],
  ]

  return <main>
    <HeroCentered eyebrow="Cybersecurity Services" crumbs={[["Services", '/solutions'], [page.title]]} title="Cybersecurity Services"
      subtitle="Empower Your Business with Robust Cyber Defense"
      intro="Preparing for your success, Gyanshu provides cybersecurity solutions to protect your critical infrastructure."
      pill={[hero, ...securityImages.slice(0, 3)]} images={[hero, ...securityImages.slice(0, 3)]}
      captions={['Cybersecurity operations', 'Security monitoring', 'Threat analysis', 'Incident response']}
      mediaLabel="Cybersecurity services" chips={['VAPT Services', 'Threat Management', 'Incident Management']} />

    <section id="cybersecurity-solutions" className="bg-paper section-space">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Cybersecurity Solutions</Eyebrow>
          <h2 className="h-section mt-5">Comprehensive Cybersecurity Solutions</h2>
          <p className="lede mx-auto mt-5 max-w-2xl">Gyanshu offers cutting-edge cybersecurity services to safeguard your digital assets and ensure business continuity.</p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cyberServices.map(([title, text, image]) => <article key={title} className="group relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] bg-ink p-5 text-white shadow-card">
            <img src={photo(image, 900)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-ink-950/10" />
            <span className="mb-auto font-mono text-xs text-white/70">◆</span>
            <h3 className="font-display text-xl font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><Eyebrow>Why Gyanshu Cybersecurity</Eyebrow><h2 className="h-section mt-5">Advanced Protection for Modern Businesses</h2></div>
          <img src={photo(securityImages[1], 1400)} alt="Cybersecurity professionals monitoring digital threats" loading="lazy" className="h-64 w-full rounded-[24px] object-cover md:h-80" />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {cyberStrengths.map(([title, text, image]) => <article key={title} className="grid overflow-hidden rounded-[22px] border border-line bg-white shadow-card md:grid-cols-[.65fr_1fr]">
            <img src={photo(image, 700)} alt="" loading="lazy" className="h-44 w-full object-cover md:h-full" />
            <div className="p-5 sm:p-6"><h3 className="font-display text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{text}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <StepsBanner eyebrow="Assessment" title="Security Assessment Process" accent="" steps={steps} image={securityImages[2]} />

    <section className="bg-paper section-space">
      <div className="shell">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Eyebrow>Security Products</Eyebrow><h2 className="h-section mt-5">Security Products</h2></div><img src={photo(securityImages[3], 900)} alt="Security operations team reviewing network intelligence" loading="lazy" className="h-40 w-full rounded-[22px] object-cover md:w-[38%]" /></div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['FLOWBITS NEXORA', 'Internet Protocol Detail Record System', 'Advanced IPDR and NAT logging platform designed for ISPs and telecom operators to achieve complete visibility, traceability, and compliance in network data flows.', '/products/ipdr', 'photo-1597733336794-12d05021d510'],
            ['Nested VA', 'Vulnerability Assessment & Pen-Testing', 'Automated platform to simulate attacks and secure your infrastructure against sophisticated threats with detailed reporting and compliance checks.', '/products/vapt', 'photo-1550751827-4bd374c3f58b'],
          ].map(([title, subtitle, text, to, image]) => <article key={title} className="group overflow-hidden rounded-[24px] border border-line bg-white shadow-card">
            <img src={photo(image, 1100)} alt="" loading="lazy" className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="p-6"><span className="font-mono text-xs uppercase tracking-wider text-brand-600">{subtitle}</span><h3 className="mt-2 font-display text-2xl font-medium">{title}</h3><p className="mt-3 leading-relaxed text-muted">{text}</p><Link to={to} className="btn btn-brand mt-5 !pr-1.5"><span>View Details</span><span className="btn-chip"><ArrowUpRight size={15} /></span></Link></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="shell grid gap-8 lg:grid-cols-2 lg:items-center">
        <div><Eyebrow>Security Training</Eyebrow><h2 className="h-section mt-5">Security Training</h2><div className="mt-6 flex flex-wrap gap-2">{['Cyber Security', 'Ethical Hacking', 'VAPT', 'SOC'].map((item) => <span key={item} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium">{item}</span>)}</div></div>
        <img src={photo(imagePools.learning[0], 1400)} alt="Cybersecurity training in a classroom" loading="lazy" className="h-72 w-full rounded-[24px] object-cover md:h-96" />
      </div>
    </section>

    <CtaPhotos eyebrow="Cybersecurity" title="Secure Your Business Today" text="Let’s discuss your security requirements and build a comprehensive protection strategy." cta="Get Security Assessment" images={[hero, ...securityImages, ...imagePools.learning.slice(0, 2)]} />
    <section className="bg-ink px-5 py-7 text-center text-sm text-white/80"><span className="font-medium text-white">Emergency Support:</span> <a className="underline underline-offset-4" href="tel:+919938883028">+91 9938883028</a></section>
  </main>
}


/* ---------- industry detail ---------- */

const focusLinks = [
  { label: 'Resilient infrastructure', to: '/services/network', icon: Layers },
  { label: 'Practical cybersecurity', to: '/services/cybersecurity', icon: BadgeCheck },
  { label: 'Clear operational visibility', to: '/products/argos-enms', icon: Search },
  { label: 'IoT & smart operations', to: '/services/iot', icon: Boxes },
  { label: 'Scalable technology choices', to: '/solutions', icon: Compass },
]

export function IndustryDetail({ page }) {
  const hero = industryImages[page.path]
  const images = [hero, ...imagePools.industry.filter((id) => id !== hero)].slice(0, 4)
  const idx = industryLinks.findIndex((l) => l.to === page.path)
  const others = [1, 2, 3].map((k) => industryCards[(idx + k) % industryCards.length])
  if (page.path === '/industries/government') return <main>
    <HeroCentered eyebrow="National Security & Cyber Forensics" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Government & Law Enforcement" title="National Security" muted={1} items={[
      { title: '90%', text: 'Faster Investigations', icon: Target },
      { title: 'LEA Compliant', icon: BadgeCheck },
      { title: 'National Grade Security', icon: Layers },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Government & Law Enforcement." items={[
      { title: 'Cybercrime Investigation Delays', text: 'Time-consuming digital forensics processes slowing down case resolution.' },
      { title: 'IP Attribution & Subscriber Tracing', text: 'Difficulty correlating IP addresses with real subscribers across multiple data sources.' },
      { title: 'Multiple Data Sources', text: 'CGNAT, DHCP, and NetFlow data not correlated effectively.' },
      { title: 'Manual Compliance Reporting', text: 'Labor-intensive processes for generating legally admissible evidence reports.' },
    ]} />
    <KeyFeatures eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." muted={3} items={[
      { title: 'IPDR / AI-IPDR Platform', text: 'CGNAT correlation, session reconstruction, and evidence-ready LEA-compliant reports.', icon: Search },
      { title: 'Attack Surface Detection', text: 'Government portal exposure detection and continuous monitoring.', icon: Eye },
      { title: 'SOC & VAPT', text: '24/7 monitoring of government networks and infrastructure.', icon: ShieldCheck },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/telecom') return <main>
    <HeroCentered eyebrow="Carrier-Grade Network Intelligence" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Telecom Operators & ISPs" title="Carrier-Grade Network Intelligence" muted={1} items={[
      { title: 'Billion+', text: 'Sessions/Day', icon: Activity },
      { title: '100%', text: 'TRAI Compliant', icon: BadgeCheck },
      { title: '<5ms', text: 'Processing', icon: Zap },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Telecom Operators & ISPs." items={[
      { title: 'Lawful Interception Compliance', text: 'Meeting regulatory requirements for lawful interception of communications.' },
      { title: 'Massive CGNAT Data Volumes', text: 'Handling billions of sessions from carrier-grade NAT implementations.' },
      { title: 'Latency & Packet Visibility', text: 'Gaps in network visibility affecting performance and security monitoring.' },
      { title: 'Regulatory Penalties', text: 'TRAI/DoT compliance requirements and potential penalties for violations.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'Rust-Based IPDR Collection', text: 'High-performance packet processing at carrier scale.' },
      { title: 'CGNAT + RADIUS + DHCP Correlation', text: 'Unified subscriber identification across all network layers.' },
      { title: 'ClickHouse-Scale Storage', text: 'Petabyte-scale storage for billions of session records.' },
      { title: 'TRAI/DoT Compliant Reporting', text: 'Automated regulatory reporting and audit trails.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/finance') return <main>
    <HeroCentered eyebrow="Financial Cyber Defense" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Banking, NBFCs & FinTech" title="Financial Cyber Defense" muted={1} items={[
      { title: '70%', text: 'Fraud Reduction', icon: Activity },
      { title: 'RBI', text: 'Compliant', icon: BadgeCheck },
      { title: '24/7', text: 'SOC Coverage', icon: ShieldCheck },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Banking, NBFCs & FinTech." items={[
      { title: 'Fraud & Mule Accounts', text: 'Sophisticated fraud schemes and money mule account detection.' },
      { title: 'Account Takeover & Phishing', text: 'Increasing attacks targeting customer accounts and credentials.' },
      { title: 'Regulatory Compliance', text: 'RBI guidelines, ISO 27001, and PCI-DSS requirements.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'Network & Transaction Risk Intelligence', text: 'Correlating network behavior with transaction patterns.' },
      { title: 'Fraud Pattern Detection', text: 'AI-driven anomaly detection across financial transactions.' },
      { title: 'SOC + SIEM Integration', text: 'Centralized security monitoring and incident response.' },
      { title: 'VAPT & Red-Team Assessments', text: 'Proactive security testing and vulnerability assessment.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/enterprise') return <main>
    <HeroCentered eyebrow="Secure Digital Transformation" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Enterprises & Large Corporates" title="Secure Digital Transformation" muted={1} items={[
      { title: 'Unified', text: 'Security', icon: ShieldCheck },
      { title: '100%', text: 'Compliance', icon: BadgeCheck },
      { title: '24/7', text: 'Monitoring', icon: Activity },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Enterprises & Large Corporates." items={[
      { title: 'Complex Hybrid Networks', text: 'Managing security across on-prem, cloud, and hybrid environments.' },
      { title: 'Internal Threat Visibility', text: 'Detecting insider threats and lateral movement within the network.' },
      { title: 'Compliance Fatigue', text: 'Meeting multiple regulatory and industry compliance requirements.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'End-to-End IT Infra Services', text: 'Campus networking, firewall management, and data center design.' },
      { title: 'Cybersecurity Stack', text: 'SOC, DLP, and EDR integration for comprehensive protection.' },
      { title: 'Attack Surface Detection', text: 'Continuous discovery and monitoring of external vulnerabilities.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/datacenter') return <main>
    <HeroCentered eyebrow="Cloud Security Intelligence" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Data Centers & Cloud Providers" title="Cloud Security Intelligence" muted={1} items={[
      { title: '99.99%', text: 'Uptime', icon: Activity },
      { title: 'Zero', text: 'Breaches', icon: ShieldCheck },
      { title: '100%', text: 'Isolation', icon: BadgeCheck },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Data Centers & Cloud Providers." items={[
      { title: 'East-West Traffic Blind Spots', text: 'Limited visibility into traffic between virtual machines and containers.' },
      { title: 'SLA Violations', text: 'Network performance issues affecting service level commitments.' },
      { title: 'Customer Isolation', text: 'Ensuring proper isolation between multi-tenant environments.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'Flow-Based Network Intelligence', text: 'Deep packet inspection and flow analysis at scale.' },
      { title: 'Micro-Segmentation Visibility', text: 'Granular control and monitoring of network segments.' },
      { title: 'AI-Assisted Anomaly Detection', text: 'ML-powered threat detection without performance impact.' },
      { title: 'Compliance & Audit Reporting', text: 'Automated reporting for regulatory and customer audits.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/healthcare') return <main>
    <HeroCentered eyebrow="Healthcare Cyber Resilience" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Healthcare & Hospitals" title="Healthcare Cyber Resilience" muted={1} items={[
      { title: 'Zero', text: 'Ransomware', icon: ShieldCheck },
      { title: '100%', text: 'HIPAA Ready', icon: BadgeCheck },
      { title: '24/7', text: 'Protection', icon: Activity },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Healthcare & Hospitals." items={[
      { title: 'Ransomware Risk', text: 'Critical systems targeted by sophisticated ransomware attacks.' },
      { title: 'Patient Data Leakage', text: 'Protecting sensitive health information from breaches.' },
      { title: 'Legacy Medical Devices', text: 'Securing unpatchable and outdated medical IoT devices.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'Network Segmentation', text: 'Isolating medical devices and critical hospital systems.' },
      { title: 'Attack Surface Monitoring', text: 'Continuous discovery and assessment of vulnerabilities.' },
      { title: '24/7 SOC', text: 'Round-the-clock monitoring and incident response.' },
      { title: 'Compliance Support', text: 'HIPAA-aligned controls and documentation.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/education') return <main>
    <HeroCentered eyebrow="Smart Campus Security" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Education & Smart Campuses" title="Smart Campus Security" muted={1} items={[
      { title: 'Safe', text: 'Digital Learning', icon: BadgeCheck },
      { title: '100%', text: 'Policy Compliance', icon: ShieldCheck },
      { title: 'Campus Wide', text: 'Security', icon: Activity },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Education & Smart Campuses." items={[
      { title: 'Student Misuse & Cyber Abuse', text: 'Addressing inappropriate use of campus network resources.' },
      { title: 'Bandwidth Abuse', text: 'Managing limited bandwidth across thousands of concurrent users.' },
      { title: 'IT Policy Compliance', text: 'Ensuring students and staff adhere to acceptable use policies.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'Campus Network Design', text: 'Scalable, secure infrastructure for educational institutions.' },
      { title: 'User-Level Traffic Visibility', text: 'Granular monitoring of individual user activity.' },
      { title: 'Content Abuse & Anomaly Detection', text: 'Automated detection of policy violations and threats.' },
      { title: 'SOC-Lite for Campuses', text: 'Affordable security operations for educational environments.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/manufacturing') return <main>
    <HeroCentered eyebrow="Industrial Cyber Defense" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Manufacturing & Critical Infrastructure" title="Industrial Cyber Defense" muted={1} items={[
      { title: '100%', text: 'Production Uptime', icon: Activity },
      { title: 'Zero', text: 'Disruption', icon: ShieldCheck },
      { title: 'OT/IT', text: 'Secured', icon: BadgeCheck },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Manufacturing & Critical Infrastructure." items={[
      { title: 'OT/IT Convergence Risks', text: 'Security gaps between operational technology and enterprise IT.' },
      { title: 'Legacy PLC Exposure', text: 'Unpatchable programmable logic controllers and industrial equipment.' },
      { title: 'Downtime Impact', text: 'Production halts due to cyber incidents affecting operations.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'OT Network Visibility', text: 'Deep monitoring of industrial protocols without disruption.' },
      { title: 'Non-Intrusive Threat Detection', text: "Passive monitoring that doesn't affect industrial systems." },
      { title: 'Perimeter Hardening', text: 'Securing the boundary between IT and OT networks.' },
      { title: 'Risk-Based Monitoring', text: 'Prioritized security based on criticality of assets.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  if (page.path === '/industries/startup') return <main>
    <HeroCentered eyebrow="Cybersecurity for Growing Businesses" crumbs={[["Industries", '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features} />
    <KeyFeatures eyebrow="Startups & MSMEs" title="Cybersecurity for Growing Businesses" muted={1} items={[
      { title: 'Enterprise', text: 'Grade Security', icon: ShieldCheck },
      { title: 'Startup', text: 'Friendly Pricing', icon: BadgeCheck },
      { title: 'Zero', text: 'Headcount', icon: Activity },
    ]} />
    <FeatureCards eyebrow="Industry Challenges" title="Navigating the complex threat landscape of Startups & MSMEs." items={[
      { title: 'Limited Cybersecurity Budget', text: 'Lack of resources for enterprise-grade security solutions.' },
      { title: 'Lack of In-House Expertise', text: 'No dedicated security team or specialists on staff.' },
    ]} />
    <FeatureCards eyebrow="The GYANSHU Advantage" title="Tailored solutions for mission-critical operations." items={[
      { title: 'Cybersecurity as a Service', text: 'Managed security without the cost of internal team.' },
      { title: 'Cloud-Based SOC', text: '24/7 monitoring delivered from the cloud.' },
      { title: 'Affordable VAPT', text: 'Budget-friendly vulnerability assessments and penetration testing.' },
      { title: 'Compliance Starter Kits', text: 'Quick-start compliance packages for common regulations.' },
    ]} />
    <CtaPhotos eyebrow="Secure Your Future" title="Don't let cyber threats slow down your innovation." text="Partner with GYANSHU for industry-leading security." cta="Get Started" to="/contact" images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
  return <main>
    <HeroCentered eyebrow="Industry perspective" crumbs={[['Industries', '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features.slice(0, 3)} />
    <Statement eyebrow="The context" text={page.intro} />
    <NeedsSplit eyebrow="Industry pressures" title="Start with the realities on the ground." items={operatingNeeds[page.path] || defaultNeeds} />
    <Orbit eyebrow="Focus areas" image={hero} title="Technology shaped around the work."
      text="Every environment has its own pressures, people, and service expectations. We start there, then connect the right expertise."
      cta={{ label: 'Talk to a specialist', to: '/contact' }} items={focusLinks} />
    <KeyFeatures eyebrow="Our approach" title="Three steps to dependable operations" muted={2} items={[
      { title: 'Understand the environment', text: 'Map systems, people, regulation, and the service expectations you work under.', icon: Search },
      { title: 'Prioritize the pressure points', text: 'Focus effort where risk, downtime, or friction costs the most.', icon: Target },
      { title: 'Build for dependable operations', text: 'Deliver solutions your teams can run, measure, and improve.', icon: BadgeCheck },
    ]} />
    <Bento eyebrow="Capabilities" title="Expertise for this" accent="environment." lede="Connect security, infrastructure, software, and IoT expertise around your sector’s priorities." items={serviceCards} />
    <CaseGrid eyebrow="More industries" title="Explore other industries" muted={2} items={others} link={{ label: 'All industries', to: '/industries' }} tone="paper" />
    <CtaPhotos images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
}

/* ---------- company pages ---------- */

const companyConfig = {
  '/about': { eyebrow: 'Gyanshu / Company', sections: ['features', 'stats', 'quotes', 'bento'] },
  '/why-choose-us': { eyebrow: 'Why Gyanshu', sections: ['features', 'steps', 'quotes'] },
  '/mission': { eyebrow: 'Our mission', sections: ['features', 'stats', 'bento'] },
  '/core-values': { eyebrow: 'Core values', sections: ['values', 'quotes', 'steps'] },
  '/careers': { eyebrow: 'Careers', sections: ['features', 'quotes', 'bento'], cta: { title: 'Bring your skills to meaningful work.', muted: 2, text: 'Tell us about yourself and the work you want to do.', cta: 'Share your profile', href: 'mailto:Support.gyanshu@gmail.com?subject=Careers%20at%20Gyanshu' } },
  '/training': { eyebrow: 'Training & development', sections: ['topics', 'learning'], cta: { title: 'Build skills that last.', muted: 2, text: 'Ask about instructor-led programs for your team.', cta: 'Ask about training' } },
  '/our-work': { eyebrow: 'Our work', sections: ['cases', 'steps', 'stats'] },
}
const values = [
  { title: 'Responsibility', text: 'We own outcomes with clear accountability, documentation, and handover.', icon: Target },
  { title: 'Clarity', text: 'Progress stays understandable to the people who depend on it.', icon: Search },
  { title: 'Curiosity', text: 'We keep learning so systems keep improving as technology evolves.', icon: Compass },
  { title: 'Lasting partnerships', text: 'We stay with you beyond launch, through operations and improvement.', icon: Building2 },
]
const topics = [
  { title: 'Cybersecurity', text: 'Hands-on assessment, defence, and response practice.' },
  { title: 'Networking', text: 'Design, configuration, and troubleshooting fundamentals.' },
  { title: 'Cloud', text: 'Secure cloud networking and operations skills.' },
  { title: 'Connected technologies', text: 'IoT, sensors, and edge systems in practice.' },
]
const workItems = [
  ...caseStudies.map((c) => ({ title: c.result, text: c.desc, tag: c.industry, image: { 1: 'photo-1597733336794-12d05021d510', 2: 'photo-1639322537228-f710d846310a', 3: 'photo-1760199789455-49098afd02f0', 4: 'photo-1581092160562-40aa08e78837' }[c.id], to: { 1: '/products/ipdr', 2: '/products/argos-enms', 3: '/products/vapt', 4: '/services/iot' }[c.id] })),
  { title: 'Infrastructure intelligence', text: 'Understand network relationships, performance, and operational change.', tag: 'Illustrative use case', image: 'photo-1518770660439-4636190af475', to: '/products/argos-enms' },
  { title: 'Security exposure management', text: 'Connect assets, vulnerabilities, and response priorities.', tag: 'Illustrative use case', image: 'photo-1526374965328-7f61d4dc18c5', to: '/products/panoptix' },
  { title: 'Connected operations', text: 'Bring sensor data from edge environments into useful action.', tag: 'Illustrative use case', image: 'photo-1581091226825-a6a2a5aee158', to: '/services/iot' },
]

export function CompanyPage({ page }) {
  const cfg = companyConfig[page.path] || { eyebrow: 'Gyanshu / Company', sections: ['features', 'quotes'] }
  const images = page.path === '/training' ? imagePools.learning : page.path === '/our-work' ? workItems.slice(0, 4).map((w) => w.image) : imagePools.company
  const blocks = {
    features: <KeyFeatures key="f" eyebrow="What guides our work" title="People first, technology with purpose" muted={3} lede="We pair engineering depth with direct collaboration, so progress stays understandable and useful." items={guiding} cols={4} />,
    values: <KeyFeatures key="v" eyebrow="What we value" title="How we work shapes what we deliver" muted={3} items={values} cols={4} />,
    topics: <KeyFeatures key="t" eyebrow="Programs" title="Practical, hands-on learning" muted={2} lede="Instructor-led programs across the technologies organizations depend on." items={topics} cols={4} />,
    stats: <StatsBand key="s" eyebrow="At a glance" title="Built for" accent="critical operations." lede="Platforms, practices, and delivery discipline under one roof." stats={stats} />,
    quotes: <Quotes key="q" eyebrow="Voices from our teams" title="The people behind" accent="the work." lede="Principles our practice teams bring to every engagement." items={voices} image="photo-1600880292203-757bb62b4baf" />,
    bento: <Bento key="b" eyebrow="Capabilities" title="Capabilities that work" accent="together." lede="Cybersecurity, infrastructure, software, AI, and connected operations." items={serviceCards} />,
    steps: <StepsBanner key="st" eyebrow="How we deliver" title="From understanding to" accent="improvement." steps={delivery} image="photo-1639322537228-f710d846310a" note="A considered sequence that keeps priorities visible and ownership clear." />,
    learning: <StepsBanner key="l" eyebrow="The journey" title="Learn, practice," accent="grow." steps={[['Learn', 'Structured, instructor-led sessions.'], ['Practice', 'Hands-on labs with real tools and scenarios.'], ['Grow', 'Confidence you can apply on the job.']]} image="photo-1552664730-d307ca884978" note="Looking for a school operations platform? Explore SMMS for connected administration." />,
    cases: <CaseGrid key="c" eyebrow="Case studies" title="See all our work" muted={2} items={workItems} pageSize={6} />,
  }
  return <main>
    <HeroCentered eyebrow={cfg.eyebrow} title={page.title} pill={images} subtitle={page.subtitle} images={images} mediaLabel={getScene(page).label} />
    <Statement eyebrow="Overview" text={page.intro} />
    {cfg.sections.map((s) => blocks[s])}
    <CtaPhotos images={images.concat(imagePools.company).slice(0, 7)} {...(cfg.cta || {})} />
  </main>
}

/* ---------- contact, support & help ---------- */

const topicsList = ['Cybersecurity', 'Infrastructure', 'Software & AI', 'IoT', 'Managed services', 'Training', 'Something else']

function ContactBlock() {
  const [form, setForm] = useState({ name: '', org: '', topic: topicsList[0], message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const subject = `[${form.topic}] Enquiry${form.name ? ` from ${form.name}` : ''}${form.org ? ` (${form.org})` : ''}`
    window.location.href = `mailto:Support.gyanshu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(form.message)}`
  }
  const field = 'w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-muted-soft focus:border-ink focus:bg-white'
  return <section id="details" className="section-space-bottom">
    <div className="shell grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col gap-3">
        <Reveal>
          <a href="mailto:Support.gyanshu@gmail.com" className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] bg-ink-950 p-8 text-white">
            <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-400/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400 text-ink"><Mail size={20} /></span>
            <div className="relative">
              <p className="font-mono text-[10.5px] uppercase tracking-[.16em] text-white/45">Email the team</p>
              <p className="mt-2 flex items-center gap-3 font-display text-[1.15rem] font-medium tracking-[-.02em] sm:text-2xl md:text-3xl">Support.gyanshu@gmail.com<ArrowUpRight size={22} className="shrink-0 text-brand-300 transition-transform duration-500 group-hover:rotate-45" /></p>
            </div>
          </a>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          <Reveal delay={0.08}><a href="tel:+919040961361" className="group flex h-full flex-col gap-6 rounded-[24px] border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Phone size={17} /></span><span><span className="block font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">Call</span><span className="mt-1 block font-display text-lg font-medium">+91 90409 61361</span></span></a></Reveal>
          <Reveal delay={0.14}><div className="flex h-full flex-col gap-6 rounded-[24px] border border-line bg-white p-6 shadow-card"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><MapPin size={17} /></span><span><span className="block font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">Location</span><span className="mt-1 block font-display text-lg font-medium">India</span></span></div></Reveal>
        </div>
      </div>
      <Reveal delay={0.1}>
        <form onSubmit={submit} className="rounded-[28px] border border-line bg-white p-6 shadow-card md:p-9">
          <Eyebrow>Write to us</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-[-.03em] md:text-4xl">Tell us about your project.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <label className="block"><span className="sr-only">Your name</span><input className={field} placeholder="Your name" value={form.name} onChange={set('name')} /></label>
            <label className="block"><span className="sr-only">Organization</span><input className={field} placeholder="Organization" value={form.org} onChange={set('org')} /></label>
          </div>
          <fieldset className="mt-5">
            <legend className="font-mono text-[10.5px] uppercase tracking-[.16em] text-muted">What can we help with?</legend>
            <div className="mt-3 flex flex-wrap gap-2">{topicsList.map((t) => <button type="button" key={t} onClick={() => setForm((f) => ({ ...f, topic: t }))} aria-pressed={form.topic === t} className={`rounded-full border px-4 py-2 text-[13px] transition ${form.topic === t ? 'border-ink bg-ink text-white' : 'border-line bg-white text-muted hover:border-ink hover:text-ink'}`}>{t}</button>)}</div>
          </fieldset>
          <label className="mt-5 block"><span className="sr-only">Message</span><textarea rows={5} className={`${field} resize-none`} placeholder="Your security priorities, infrastructure challenge, or project idea…" value={form.message} onChange={set('message')} /></label>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xs text-xs leading-relaxed text-muted-soft">This opens your email app with your message ready to send to our team.</p>
            <button type="submit" className="btn btn-dark"><span>Compose email</span><span className="btn-chip"><Send size={14} /></span></button>
          </div>
        </form>
      </Reveal>
    </div>
  </section>
}

export function ContactPage({ page }) {
  const support = page.path === '/support'
  return <main>
    <HeroCentered eyebrow={support ? 'Support' : 'Contact'} title={page.title} pill={imagePools.company} subtitle={page.subtitle} intro={page.intro} actions={null} compact />
    <ContactBlock />
    <FaqDark lede="Quick answers before you get in touch." items={support ? faqs.slice(0, 6) : pickFaqs('/contact', 4)} />
    <div className="h-6" />
  </main>
}

export function HelpPage({ page }) {
  return <main>
    <HeroCentered eyebrow="Help & FAQ" title={page.title} pill={imagePools.company} subtitle={page.subtitle} intro={page.intro} compact
      actions={<><a href="#faq" className="btn btn-dark"><span>Browse answers</span><span className="btn-chip"><Search size={14} /></span></a><Link to="/contact" className="btn btn-outline">Contact us</Link></>} />
    <FaqDark id="faq" title="Everything you might ask." lede="Twelve answers covering services, platforms, deployment, and how to start." items={faqs} />
    <CtaPhotos title="Still have a question?" muted={2} text="Our team will help you find a clear next step." images={imagePools.company} />
  </main>
}

/* ---------- legal ---------- */

const legal = [['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Compliance', '/compliance'], ['Cookies Policy', '/cookies']]

export function LegalPage({ page }) {
  return <main>
    <HeroCentered eyebrow="Legal" crumbs={[[page.title]]} title={page.title} subtitle={page.subtitle} actions={null} compact />
    <section id="details" className="section-space-bottom">
      <div className="shell grid gap-6 lg:grid-cols-[260px_1fr]">
        <Reveal as="nav" aria-label="Legal pages" className="h-fit rounded-[24px] border border-line bg-white p-3 shadow-card lg:sticky lg:top-28">
          {legal.map(([label, to]) => <Link key={to} to={to} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] transition ${to === page.path ? 'bg-ink text-white' : 'text-muted hover:bg-paper hover:text-ink'}`}>{label}<ArrowUpRight size={14} className={to === page.path ? 'text-brand-300' : 'opacity-40'} /></Link>)}
        </Reveal>
        <Reveal delay={0.08} className="rounded-[28px] border border-line bg-white p-8 shadow-card md:p-14">
          <span className="font-mono text-[10.5px] uppercase tracking-[.16em] text-brand-600">{page.title}</span>
          <p className="mt-6 font-display text-2xl font-medium leading-[1.35] tracking-[-.02em] text-ink md:text-[2rem]">{page.intro}</p>
          <div className="mt-12 flex flex-col gap-4 rounded-[22px] bg-paper p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] text-muted">Questions about this policy or your information?</p>
            <ArrowButton href="mailto:Support.gyanshu@gmail.com" icon={Mail}>Email Support.gyanshu@gmail.com</ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
}

/* ---------- 404 ---------- */

export function NotFound({ page }) {
  return <main>
    <HeroCentered eyebrow="Error 404" title={page.title} pill={imagePools.network} subtitle={page.subtitle} intro={page.intro} compact
      actions={<><ArrowButton to="/">Back to home</ArrowButton><Link to="/contact" className="btn btn-outline">Contact us</Link></>} />
    <section className="section-space-bottom">
      <div className="shell grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[['Products', '/products', 'Platforms for network intelligence and security.'], ['Solutions', '/solutions', 'Cybersecurity, infrastructure, IoT, and more.'], ['Industries', '/industries', 'Secure technology for high-stakes environments.'], ['Contact', '/contact', 'Tell us what you need to make possible.']].map(([t, to, d], i) =>
          <motion.div key={to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08, duration: 0.7, ease: EASE }}>
            <Link to={to} className="group flex h-full min-h-[180px] flex-col justify-between rounded-[24px] border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <span className="flex items-center justify-between font-mono text-[11px] text-brand-500">◆<ArrowUpRight size={16} className="text-ink transition-transform duration-500 group-hover:rotate-45" /></span>
              <span><span className="block font-display text-xl font-medium tracking-[-.02em]">{t}</span><span className="mt-1 block text-sm text-muted">{d}</span></span>
            </Link>
          </motion.div>)}
      </div>
    </section>
  </main>
}


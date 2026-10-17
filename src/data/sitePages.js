const products = {
  ipdr: ['FLOWBITS NEXORA', 'Turn Network Data into Actionable Intelligence.', 'FLOWBITS NEXORA unifies IPDR, subscriber intelligence, network flow analysis, threat intelligence and forensic investigation within a secure, on-premises platform. Transform fragmented network records into connected insights, detect suspicious activity, investigate incidents and strengthen operational decision-making.', ['Network & Subscriber Intelligence', 'Threat & Behaviour Analytics', 'Digital Forensics & Investigation']],
  'argos-enms': ['ARGOS ENMS', 'Enterprise Network Operations & Intelligence Platform', 'ARGOS ENMS Enterprise is a comprehensive network operations and intelligence platform that provides end-to-end visibility across your infrastructure. It monitors device health, interfaces, traffic, events and dependencies — helping IT teams maintain performance, ensure availability and make data-driven decisions.', ['Unified Visibility', 'Proactive Monitoring', 'Faster Issue Resolution', 'Reliable Operations']],
  panoptix: ['PANOPTIX', 'Cyber Exposure Management System', 'PANOPTIX brings digital asset discovery, vulnerability intelligence, security misconfiguration assessment, risk-based prioritisation and remediation tracking into a unified cyber exposure management environment. Designed for organisations managing complex digital infrastructure, it helps security teams identify weaknesses, focus on critical exposures and strengthen security posture through continuous assessment.', ['Attack Surface Visibility', 'Risk-Based Prioritisation', 'Remediation & Validation']],
  vapt: ['VAPT Scanner', 'Vulnerability Assessment & Penetration Testing Platform', 'VAPT Scanner helps security teams identify vulnerabilities, assess configuration weaknesses, organise technical evidence and guide remediation through a unified assessment workflow. Combining automated checks with expert-led validation, it supports clearer findings, actionable reports and more confident security decisions.', ['Multi-Technology Assessment', 'Actionable Vulnerability Evidence', 'Remediation & Re-testing']],
  smms: ['SMMS', 'Smart Monitoring & Management System', 'SMMS brings infrastructure status, performance metrics, alerts, incidents and service-level visibility into a unified operational platform. Help IT and operations teams detect issues early, understand service health, coordinate escalation and manage distributed environments with greater consistency and control.', ['Unified Monitoring', 'Alert & Incident Management', 'Service Performance Intelligence']],
  'gyanshu-ai-office-assistance': ['AI Office Assistant', 'Private AI-Powered Enterprise Knowledge & Office Productivity Platform', 'Bring private AI into everyday office work. AI Office Assistant is designed to help teams find organisational knowledge, understand internal documents, draft business content and streamline information-intensive tasks through an AI environment hosted within your own infrastructure.', ['Private AI Deployment', 'Enterprise Knowledge Assistance', 'Everyday Office Productivity']],
}

const servicePages = {
  cybersecurity: ['Cybersecurity Services', 'Empower your business with robust cyber defense', ['VAPT services', 'Source code review', 'Mobile security', 'Cloud security', 'Threat management', 'Incident response', 'Red teaming', 'Security architecture']],
  network: ['Network Infrastructure Services', 'Reliable connectivity for always-on operations', ['Network design', 'IT setup and rollout', 'Infrastructure AMC', 'IT operations', 'Micro data centers', 'Open source solutions', 'Cloud networking', 'NMS and NOC services']],
  iot: ['IoT Solutions', 'Connect devices. Transform operations.', ['Rapid prototyping', 'Industrial automation', 'Smart manufacturing', 'Embedded solutions', 'Platform migration', 'Infrastructure automation', 'IoT security', 'IoT consulting']],
  application: ['Application Development Services', 'Build useful software for a changing world', ['Custom application development', 'Web applications', 'Mobile applications', 'Business process automation', 'Application modernization', 'Maintenance and support', 'UX and UI design', 'Application security']],
  regulatory: ['Regulatory Compliance & GRC', 'Navigate regulations with confidence', ['Compliance management', 'Governance frameworks', 'Internal audit and controls', 'Risk management', 'Incident and crisis planning', 'Cybersecurity and privacy', 'Regulatory change management', 'Training and awareness']],
}

const industries = {
  government: ['Government & Law Enforcement', 'Lawful network intelligence, cyber forensics, IPDR correlation, and evidence-ready reporting for cybercrime investigation and national cybersecurity programs.'], telecom: ['Telecom & ISPs', 'High-performance IPDR collection, CGNAT correlation, subscriber intelligence, and regulatory compliance solutions designed for high-volume telecom environments.'], finance: ['Banking, NBFCs & FinTech', 'Fraud detection, SOC services, VAPT, and secure infrastructure aligned with RBI and financial cybersecurity requirements.'], enterprise: ['Enterprises & Large Corporates', 'End-to-end IT infrastructure, campus and data center networking, firewall and security deployment, and continuous cyber monitoring.'], datacenter: ['Data Centers & Cloud Providers', 'Flow-based visibility, east-west traffic monitoring, anomaly detection, and multi-tenant security intelligence for modern cloud infrastructure.'], healthcare: ['Healthcare & Hospitals', 'Ransomware defense, patient data protection, network segmentation, and compliance-focused cybersecurity services.'], education: ['Education & Smart Campuses', 'Secure campus networks, user-level traffic visibility, abuse detection, and policy-driven monitoring for digital learning environments.'], manufacturing: ['Manufacturing & Critical Infrastructure', 'OT and IT network visibility, non-intrusive threat detection, perimeter security, and operational resilience monitoring.'], startup: ['Startups & MSMEs', 'Affordable cybersecurity-as-a-service, SOC-lite offerings, VAPT, and secure IT foundation for growing businesses.'],
}

const labels = {
  '/products': ['Products & Platforms', 'Tools for network intelligence, security, and connected operations.', 'Explore Gyanshu products built to make complex environments easier to understand and manage.'],
  '/solutions': ['Technology Solutions', 'Practical expertise for critical technology environments.', 'Explore our cybersecurity, infrastructure, IoT, application, and compliance capabilities.'],
  '/industries': ['Industries We Serve', 'Secure technology for high-stakes environments.', 'Gyanshu brings together IT infrastructure, cyber defense, and network intelligence for organizations with complex needs.'],
  '/about': ['About Gyanshu', 'Technology that keeps business moving.', 'We help organizations secure, automate, monitor, and operate critical technology environments with practical expertise and a long-term view.'],
  '/our-work': ['Our Work', 'Technology outcomes built around real operational needs.', 'Explore the kinds of challenges our teams help organizations address across security, infrastructure, and connected systems.'],
  '/training': ['Training & Development', 'Build skills through practical, hands-on learning.', 'Instructor-led programs help learners build confidence in cybersecurity, networking, cloud, and connected technologies.'],
  '/careers': ['Careers at Gyanshu', 'Do meaningful work with a curious, capable team.', 'Bring your skills to projects that strengthen the systems people and organizations rely on.'],
  '/contact': ['Contact Gyanshu', 'Let’s talk about what you need to make possible.', 'Tell us about your project, security priorities, or infrastructure challenge. Our team will help you find a clear next step.'],
  '/why-choose-us': ['Why Choose Gyanshu', 'A dependable partner for complex technology.', 'We combine engineering depth, security thinking, and hands-on delivery to help teams move forward with confidence.'],
  '/mission': ['Our Mission', 'Make critical technology more secure, useful, and resilient.', 'We work to help organizations build dependable systems and make informed decisions as technology evolves.'],
  '/core-values': ['Our Core Values', 'How we work shapes what we deliver.', 'We value responsibility, clarity, curiosity, and lasting partnerships in every engagement.'],
  '/support': ['Support', 'Help when you need a clear answer.', 'Reach the Gyanshu team for help with a product, service, or active engagement.'],
  '/help': ['Help & FAQ', 'Answers to common questions.', 'Learn how our services work and how to get started with Gyanshu.'],
  '/privacy': ['Privacy Policy', 'Your information deserves careful handling.', 'Gyanshu uses information shared with us to respond to enquiries and provide requested services. Contact us if you have a question about your information.'],
  '/terms': ['Terms of Service', 'Terms for using Gyanshu services.', 'Engagement scope, deliverables, and applicable terms are agreed with clients before work begins. Please contact us for details relevant to your project.'],
  '/compliance': ['Compliance', 'Responsible practices for trusted technology.', 'We help organizations understand their obligations and build practical governance, risk, and compliance programs.'],
  '/cookies': ['Cookies Policy', 'A clear view of how cookies are used.', 'Cookies may support essential site functionality and help us understand site usage. You can manage cookies in your browser settings.'],
}

export function getPage(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (labels[path]) return { title: labels[path][0], eyebrow: 'GYANSHU TECHNOLOGY', subtitle: labels[path][1], intro: labels[path][2], type: path === '/products' || path === '/industries' || path === '/solutions' ? 'listing' : 'standard', path }
  const productMatch = path.match(/^\/products\/([^/]+)$/)
  if (productMatch && products[productMatch[1]]) {
    const [title, eyebrow, intro, features] = products[productMatch[1]]
    return { title, eyebrow, subtitle: eyebrow, intro, features, type: 'product', path }
  }
  const serviceMatch = path.match(/^\/services\/([^/]+)$/)
  if (serviceMatch && servicePages[serviceMatch[1]]) {
    const [title, subtitle, features] = servicePages[serviceMatch[1]]
    return { title, eyebrow: 'SERVICES', subtitle, intro: `Gyanshu helps teams strengthen ${title.toLowerCase()} with expert guidance, thoughtful engineering, and reliable support from planning through ongoing operations.`, features, type: 'service', path }
  }
  const industryMatch = path.match(/^\/industries\/([^/]+)$/)
  if (industryMatch && industries[industryMatch[1]]) {
    const [title, intro] = industries[industryMatch[1]]
    const isGovernment = industryMatch[1] === 'government'
    const isTelecom = industryMatch[1] === 'telecom'
    const isFinance = industryMatch[1] === 'finance'
    const isEnterprise = industryMatch[1] === 'enterprise'
    const isDatacenter = industryMatch[1] === 'datacenter'
    const isHealthcare = industryMatch[1] === 'healthcare'
    const isEducation = industryMatch[1] === 'education'
    const isManufacturing = industryMatch[1] === 'manufacturing'
    const isStartup = industryMatch[1] === 'startup'
    return { title: isTelecom ? 'Telecom Operators & ISPs' : title, eyebrow: 'INDUSTRIES', subtitle: intro, intro: isGovernment || isTelecom || isFinance || isEnterprise || isDatacenter || isHealthcare || isEducation || isManufacturing || isStartup ? intro : `Every industry faces a different mix of risk, regulation, and operational pressure. Gyanshu works with ${title.toLowerCase()} teams to design practical solutions that fit the environment and the people who run it.`, features: isGovernment ? ['90% Faster Investigations', 'LEA Compliant', 'National Grade Security'] : isTelecom ? ['Billion+ Sessions/Day', '100% TRAI Compliant', '<5ms Processing'] : isFinance ? ['70% Fraud Reduction', 'RBI Compliant', '24/7 SOC Coverage'] : isEnterprise ? ['Unified Security', '100% Compliance', '24/7 Monitoring'] : isDatacenter ? ['99.99% Uptime', 'Zero Breaches', '100% Isolation'] : isHealthcare ? ['Zero Ransomware', '100% HIPAA Ready', '24/7 Protection'] : isEducation ? ['Safe Digital Learning', '100% Policy Compliance', 'Campus Wide Security'] : isManufacturing ? ['100% Production Uptime', 'Zero Disruption', 'OT/IT Secured'] : isStartup ? ['Enterprise Grade Security', 'Startup Friendly Pricing', 'Zero Headcount'] : ['Resilient infrastructure', 'Practical cybersecurity', 'Clear operational visibility', 'Scalable technology choices'], type: 'industry', path }
  }
  return { title: 'Page not found', eyebrow: '404', subtitle: 'We couldn’t find that page.', intro: 'The address may have changed. Head back to the home page or explore our services.', type: 'missing', path: '/' }
}

export const productLinks = Object.keys(products).map((slug) => ({
  label: ({ ipdr: 'FLOWBITS NEXORA', 'argos-enms': 'NetSight360', vapt: 'Nested VA' })[slug] || products[slug][0],
  to: `/products/${slug}`,
}))
export const serviceLinks = Object.keys(servicePages).map((slug) => ({ label: servicePages[slug][0], to: `/services/${slug}` }))
export const industryLinks = Object.keys(industries).map((slug) => ({ label: industries[slug][0], to: `/industries/${slug}` }))

const products = {
  ipdr: ['Flowbits IPDR Analytics', 'Flowbits IPDR', 'A high-performance IP traffic correlation and intelligence platform designed to collect, normalize, correlate, and analyze IP activity at scale. It turns raw network logs into actionable IP-level intelligence, helping network teams, SOCs, and security operations quickly identify who used which IP, when, and how.', ['IP & Subscriber Correlation', 'Session Reconstruction', 'High-Speed Data Ingestion', 'Powerful Search & Investigation', 'Analytics & Intelligence', 'Secure & Scalable Architecture']],
  'argos-enms': ['ARGOS ENMS', 'The All-Seeing Network Intelligence Platform', 'ARGOS ENMS is a next-generation Enterprise Network Management System designed to deliver complete visibility, control, and intelligence across modern networks. Inspired by the mythological Argos—the all-seeing guardian—ARGOS ENMS continuously observes network elements, traffic behaviour, and performance metrics in real time.', ['Unified Network Visibility', 'Performance & Availability Monitoring', 'Intelligent Alerting & Events', 'Topology & Dependency Awareness', 'Advanced Analytics & Insights', 'Secure & Scalable Architecture']],
  panoptix: ['PANOPTIX', 'Real-Time Attack Surface Detection', 'PANOPTIX is a real-time Attack Surface Detection System that continuously discovers, monitors, and analyzes exposed assets across your infrastructure—so you always know what is visible, reachable, and at risk.', ['Continuous Asset Discovery', 'Attack Surface Visibility', 'Exposure & Risk Intelligence', 'Change & Drift Detection', 'Intelligent Alerting', 'Analytics & Dashboards', 'Secure & Scalable Platform']],
  vapt: [' VAPT Scanner', 'Structured vulnerability assessment and compliance validation', ' VAPT Scanner is a structured Vulnerability Assessment & Penetration Testing (VAPT) scanning platform designed for periodic security assessments, hygiene checks, and compliance validation.', ['Periodic Vulnerability Scanning', 'Application & Service Assessment', 'Compliance-Oriented Checks', 'Risk Scoring & Reporting', 'Scan Scheduling & History', 'Secure Access & Auditability']],
  hms: [' HMS', 'Smart Hostel Administration', 'A connected suite for hostel and residential operations, from room allocation and billing to visitor tracking and student communication.', ['Smart room allocation', 'Automated billing', 'Attendance management', 'Visitor management', 'Student and parent portal', 'Inventory and assets']],
  lms: [' LMS', 'Engaging Learning Experiences', 'Deliver structured learning for academic institutions and corporate teams with flexible content, progress tracking, assessments, and certification workflows.', ['Multi-format content', 'Live class integration', 'Online assessments', 'Gamified learning', 'Performance analytics', 'Mobile learning']],
}

const servicePages = {
  cybersecurity: ['Cybersecurity Services', 'Empower your business with robust cyber defense', ['VAPT services', 'Source code review', 'Mobile security', 'Cloud security', 'Threat management', 'Incident response', 'Red teaming', 'Security architecture']],
  network: ['Network Infrastructure Services', 'Reliable connectivity for always-on operations', ['Network design', 'IT setup and rollout', 'Infrastructure AMC', 'IT operations', 'Micro data centers', 'Open source solutions', 'Cloud networking', 'NMS and NOC services']],
  iot: ['IoT Solutions', 'Connect devices. Transform operations.', ['Rapid prototyping', 'Industrial automation', 'Smart manufacturing', 'Embedded solutions', 'Platform migration', 'Infrastructure automation', 'IoT security', 'IoT consulting']],
  application: ['Application Development Services', 'Build useful software for a changing world', ['Custom application development', 'Web applications', 'Mobile applications', 'Business process automation', 'Application modernization', 'Maintenance and support', 'UX and UI design', 'Application security']],
  regulatory: ['Regulatory Compliance & GRC', 'Navigate regulations with confidence', ['Compliance management', 'Governance frameworks', 'Internal audit and controls', 'Risk management', 'Incident and crisis planning', 'Cybersecurity and privacy', 'Regulatory change management', 'Training and awareness']],
}

const industries = {
  government: ['Government & Law Enforcement', 'Secure digital services and evidence-ready network intelligence for public institutions.'], telecom: ['Telecom & ISPs', 'Network visibility, subscriber correlation, and resilient operations for providers.'], finance: ['Banking, NBFCs & FinTech', 'Protect sensitive financial services with measurable controls and dependable infrastructure.'], enterprise: ['Enterprises & Large Corporates', 'Connect security, networks, and business systems across complex organizations.'], datacenter: ['Data Centers & Cloud Providers', 'Improve service visibility, operational resilience, and exposure management.'], healthcare: ['Healthcare & Hospitals', 'Support connected care environments with secure infrastructure and reliable operations.'], education: ['Education & Smart Campuses', 'Enable safer, more connected campuses and digital learning experiences.'], manufacturing: ['Manufacturing & Critical Infrastructure', 'Secure industrial operations and connect equipment with useful operational insight.'], startup: ['Startups & MSMEs', 'Build secure, scalable technology foundations as your business grows.'],
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
    return { title, eyebrow: 'INDUSTRIES', subtitle: intro, intro: `Every industry faces a different mix of risk, regulation, and operational pressure. Gyanshu works with ${title.toLowerCase()} teams to design practical solutions that fit the environment and the people who run it.`, features: ['Resilient infrastructure', 'Practical cybersecurity', 'Clear operational visibility', 'Scalable technology choices'], type: 'industry', path }
  }
  return { title: 'Page not found', eyebrow: '404', subtitle: 'We couldn’t find that page.', intro: 'The address may have changed. Head back to the home page or explore our services.', type: 'missing', path: '/' }
}

export const productLinks = Object.keys(products).map((slug) => ({ label: products[slug][0], to: `/products/${slug}` }))
export const serviceLinks = Object.keys(servicePages).map((slug) => ({ label: servicePages[slug][0], to: `/services/${slug}` }))
export const industryLinks = Object.keys(industries).map((slug) => ({ label: industries[slug][0], to: `/industries/${slug}` }))

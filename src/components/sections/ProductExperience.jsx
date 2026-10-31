import { createElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getPage, productIdFor, productLinks } from '../../data/sitePages'
import { CtaPhotos, FaqDark, HeroCentered, StepsBanner } from '../interior/Blocks'
import { faqs } from '../../data/content'
import { faqPicks, iconFor } from '../../data/pageMedia'
import { photo as sharedPhoto } from '../../utils/intro'
import flowbitsProfile from '../../data/flowbitsProfile'

const categories = ['All platforms','Network intelligence','Cybersecurity','AI & productivity']
const profiles = {
  ipdr: {category:'Network intelligence',descriptor:'Network Intelligence Platform',heroEyebrow:'Netwno i want the exact conent of the leaflet to be add for the proeduct according to each setion as mention in the leafletork intelligence / forensic analytics',summary:'Turn your network data into actionable intelligence, FLOWBITS NEXORA unifies IPDR, subscriber intelligence, flow analytics, threat intelligence, behaviour analytics, forensics, alerts and reporting — empowering enterprises, ISPs and SOC teams to see more, know faster and stay ahead.',images:flowbitsProfile.images,flow:[['Ingest','Collect IPDR and flow data from your network.'],['Correlate','Link subscribers, sessions, devices and events.'],['Detect','Identify threats, fraud and anomalies.'],['Investigate','Deep-dive with forensic search and timelines.'],['Report','Generate insights, alerts and compliance reports.']],use:[],accent:'#0E8378',capabilityGroups:[
    {title:'IPDR Intelligence',items:['Ingest, process and analyse IPDR data at massive scale.']},
    {title:'Subscriber Correlation',items:['Correlate subscribers across IPDR, flows, devices and sessions.']},
    {title:'Flow Analytics',items:['Deep insights into network traffic, application usage and protocols.']},
    {title:'Threat Intelligence Enrichment',items:['Enrich with indicators, reputation data and threat feeds.']},
    {title:'Behavior Analytics',items:['Identify abnormal behaviour and insider threats.']},
    {title:'Alerts & Reporting',items:['Real-time alerts, custom rules and detailed reports.']},
    {title:'Forensic Search',items:['Fast, flexible search across IPDR, flows, subscribers and events.']},
    {title:'Extensible & Integrations',items:['Integrate with existing SOC, SIEM and OSS/BSS systems.']},
  ],why:[['Unified Network Intelligence','IPDR, flows, subscribers, threats and forensics — in one platform.'],['On-Premises Deployment','Complete data control, deployable in your environment.'],['Real-Time Threat Detection','Detect anomalies, fraud and security threats early.'],['Scalable & Customisable','Adapt to your network size, use cases and operational needs.']],whySubtitle:'Built for Networks, Security and Smarter Operations',useCases:[['Subscriber & Session Intelligence','Get a complete view of subscriber activity, sessions, devices and usage patterns.'],['Threat & Fraud Intelligence','Detect malicious activity, policy violations, fraud and network abuse in real time.'],['Forensic Investigation','Perform deep-dive investigations with powerful search, correlation and timelines.'],['Flow Analytics','Analyse network flows, application usage, traffic patterns and capacity insights.']],benefits:[['Faster Investigation','Find answers quickly and reduce mean time to resolution.'],['Better Traceability','Link network activity to subscribers, sessions and devices.'],['Operational Confidence','Proactive detection and improved network governance.'],['Stronger Threat Visibility','Detect and respond to threats and fraud earlier.'],['Evidence-Driven Reporting','Generate audit-ready reports for compliance and legal requirements.']],industries:[['Enterprises','Network visibility, security monitoring, policy compliance and internal investigations.'],['ISPs & Telecom Operators','Subscriber intelligence, fraud detection, regulatory compliance and network optimization.'],['SOC & Security Teams','Threat hunting, incident response, forensic analysis and security operations.']],controls:[['On-Premises Deployment','Deploy within your datacenter or private cloud.'],['Data Privacy by Design','Keep sensitive subscriber and network data within your environment.'],['Role-Based Access Control','Granular access for teams and departments.'],['Audit Logging','Track all activities for security and compliance.']],deployment:['Deploy within your datacenter or private cloud.','Keep sensitive subscriber and network data within your environment.','Granular access for teams and departments.','Track all activities for security and compliance.'],integrations:['SIEM','SOC','OSS/BSS','Firewall','NMS','Threat Feeds','Ticketing','Custom APIs']},  'argos-enms': {category:'Network intelligence',descriptor:'Enterprise Network Operations & Intelligence Platform',heroEyebrow:'Network operations / enterprise visibility',summary:'Gain unified visibility across your entire network. Monitor performance, detect issues early, understand dependencies and resolve problems faster — ensuring a resilient, high-performing and always-on enterprise.',images:['px-577195','px-19226354','px-4597280','px-6804585'],gallery:['px-10468213','px-37730212','px-2420212','px-1181320'],flowImage:'px-5092815',ctaImages:['px-1181336','photo-1608222351212-18fe0ec7b13b','photo-1783419752280-46a2073ef7dc','px-1624895'],flow:[['Discover','Auto-discover your network devices and infrastructure.'],['Monitor','Track real-time performance, health and events.'],['Correlate','Correlate alerts, dependencies and impact analysis.'],['Investigate','Drill down into root cause with rich context and insights.'],['Resolve','Take action, resolve issues faster and prevent recurrence.']],use:[],accent:'#0B4D49',leafletPage:true,heroFeatures:true,brandLabel:'NetSight360',capabilityGroups:[
    {title:'Unified Network Visibility',items:['Auto-discover devices, interfaces and services across your network.']},
    {title:'Performance & Availability Monitoring',items:['Track real-time and historical performance metrics and uptime.']},
    {title:'Intelligent Alerting',items:['Rule-based, threshold and anomaly-based alerting with escalation.']},
    {title:'Topology & Dependency Awareness',items:['Visualise network topology and understand service dependencies.']},
    {title:'Dashboards & Analytics',items:['Customisable dashboards, reports and capacity insights.']},
    {title:'Scalable Enterprise Deployment',items:['Built for large, complex environments with multi-site and multi-tenant support.']},
  ],why:[['Unified Network View','Complete visibility across sites, devices, interfaces and services.'],['Real-Time Monitoring','Track performance, health and availability 24×7.'],['Proactive Alerting','Detect and resolve issues before they impact business operations.'],['Enterprise Ready','Scalable, secure and customisable for complex environments.']],whySubtitle:'Built for Visibility, Performance and Enterprise Reliability',useCases:[['Network Infrastructure Monitoring','Monitor routers, switches, firewalls and wireless infrastructure across your entire network.'],['NOC Operations','Empower NOC teams with real-time visibility, alerts and intelligent insights for proactive operations.'],['Data Centre Systems','Monitor critical data centre infrastructure including servers, storage, network devices and virtual environments.'],['Multi-Site Enterprise Visibility','Get a unified view across multiple locations, branches and remote sites from a single platform.']],benefits:[['Faster Resolution','Identify and resolve issues quickly, minimising impact.'],['Better Visibility','End-to-end view across your network and services.'],['Reduced Downtime','Proactive monitoring helps prevent major outages.'],['Operational Efficiency','Automate monitoring, alerting and reporting tasks.'],['Built for Scale','Support growing infrastructure and evolving business needs.']],industries:[['Enterprises','IT networks, branch offices and corporate infrastructure.'],['ISPs & Telecom Providers','Core, aggregation and access networks.'],['Data Centres','Monitor physical, virtual and cloud infrastructure.'],['Critical Infrastructure','Power, manufacturing, transport, government and more.']],controls:[['Role-Based Access Control','Granular permissions for users and teams.'],['Audit Logging','Track user activity and system changes.'],['Secure Deployment Options','On-premises or private cloud deployment.'],['Data Privacy & Compliance','Support for organisational security policies.']],deployment:['Deploy in your datacentre.','Your private infrastructure.','AWS, Azure or others.','ITSM, CMDB, Syslog, Email, SNMP and more.'],integrations:['On-Premises','Private Cloud','Public Cloud','Integrations'],deploymentOptions:[['On-Premises','Deploy in your datacentre.'],['Private Cloud','Your private infrastructure.'],['Public Cloud','AWS, Azure or others.'],['Integrations','ITSM, CMDB, Syslog, Email, SNMP and more.']],useCasesTitle:'NetSight360 in Action',benefitsTitle:'Greater Visibility. Higher Availability. Stronger Business Outcomes.',industriesEyebrow:'Industry & Deployment',industriesTitle:'Designed for Diverse Environments',securityEyebrow:'Security & Governance',securityTitle:'Enterprise-Grade Security. Complete Control.',integrationsEyebrow:'Deployment & Integrations',integrationsTitle:'Flexible Deployment. Seamless Integration.'},  panoptix: {
    category: 'Cybersecurity',
    descriptor: 'Cyber Exposure Management System',
    heroEyebrow: 'CYBERSECURITY / EXPOSURE INTELLIGENCE',
    heroFeatures: true,
    summary: 'PANOPTIX brings digital asset discovery, vulnerability intelligence, security misconfiguration assessment, risk-based prioritisation and remediation tracking into a unified cyber exposure management environment. Designed for organisations managing complex digital infrastructure, it helps security teams identify weaknesses, focus on critical exposures and strengthen security posture through continuous assessment.',
    images: ['photo-1579389083078-4e7018379f7e','photo-1768839721176-2fa91fdce725','px-1901388','photo-1563986768609-322da13575f3'],
    gallery:['px-6805152','px-7988743','px-12899191'],flowImage:'px-5480781',ctaImages:['px-36598855','px-7988749','px-17489151','px-37605913'],
    accent: '#0C6B63',
    overviewTitle: 'Overview: See the Exposure Before It Becomes an Incident.',
    overview: [
      'Enterprise digital environments are constantly evolving. New assets, cloud services, configuration changes, vulnerabilities and external-facing systems introduce security exposures that are difficult to manage through periodic assessments and fragmented tools alone.',
      'PANOPTIX is designed to provide a consolidated view of organisational cyber exposure. By bringing together asset intelligence, vulnerability findings, configuration weaknesses and risk context, the platform helps security teams understand where weaknesses exist and which exposures require attention.',
      'The platform supports a structured approach to identifying, assessing, prioritising and tracking cyber risks — enabling organisations to move from reactive vulnerability management towards continuous exposure reduction.'
    ],
    use: ['Enterprises & Large IT Environments','BFSI & Regulated Organisations','Government & Critical Infrastructure','Security Operations & Risk Teams'],
    flow: [
      ['Discover','Identify assets, digital services and reachable systems.'],
      ['Assess','Identify vulnerabilities, weaknesses and misconfigurations.'],
      ['Prioritise','Evaluate asset criticality, severity, reachability and exploit context.'],
      ['Remediate','Track corrective work, owners and target dates.'],
      ['Validate','Reassess findings and verify corrective measures.'],
      ['Monitor','Observe changing assets and exposure trends.']
    ],
    flowTitle: 'How It Works: From Exposure Discovery to Continuous Risk Reduction.',
    flowEyebrow: 'Operational lifecycle',
    flowNote: 'A connected exposure-management workflow helps security teams identify what is at risk, understand why it matters, track who should act and verify whether exposures have been reduced.',
    exposureDomains: [
      ['External Attack Surface','Internet-facing assets, services and exposed systems.'],
      ['Internal Infrastructure','On-premises systems, network devices and internal weaknesses.'],
      ['Vulnerability Exposure','Known vulnerabilities, affected assets and technical indicators.'],
      ['Configuration Exposure','Insecure settings and deviations from approved baselines.'],
      ['Identity & Access Exposure','Privilege and access weaknesses, subject to supported integrations.'],
      ['Cloud & Application Exposure','Cloud and application security findings from integrated sources.']
    ],
    domainNote: 'Domain coverage depends on the supported collectors, scanners and connectors of the deployed edition.',
    domainTitle: 'Exposure Areas: Understand Cyber Exposure Across Your Digital Environment.',
    useCasesTitle: 'Use Cases: Exposure Intelligence for Real-World Security Challenges.',
    useCaseLead: 'PANOPTIX helps security teams discover risks, investigate affected assets and coordinate remediation across increasingly complex environments.',
    useCases: [
      ['Enterprise Attack Surface','Discover exposed assets and identify weaknesses across distributed infrastructure.'],
      ['Vulnerability & Risk Operations','Analyse findings, prioritise remediation and manage exposure.'],
      ['Security & Governance Teams','Track remediation ownership, validation progress and governance reporting.']
    ],
    capabilityGroups: [
      {title:'Asset Discovery & Inventory',items:['Identify digital assets and maintain a central visibility context.']},
      {title:'Attack Surface Monitoring',items:['Track internet-facing services and changes in exposure.']},
      {title:'Vulnerability Management',items:['Consolidate findings and affected infrastructure.']},
      {title:'Security Configuration Assessment',items:['Review configuration weaknesses against relevant baselines.']},
      {title:'Risk-Based Prioritisation',items:['Consider severity, exploitability, reachability and asset criticality.']},
      {title:'Remediation Management',items:['Assign, track and manage corrective actions.']},
      {title:'Exposure Validation',items:['Reassess findings and verify remediation.']},
      {title:'Dashboards & Reporting',items:['Visualise risk distribution, trends, ownership and closure.']}
    ],
    capabilityTitle: 'Capabilities: Cyber Exposure Management in One Platform.',
    capabilityLead: 'Discover, assess, prioritise and reduce exposure from one coordinated environment.',
    riskTitle: 'Prioritisation: Focus on the Exposures That Matter Most.',
    riskIntro: 'Not every vulnerability creates the same level of risk. PANOPTIX is designed to bring security findings into context so teams can distinguish critical exposures from lower-priority weaknesses. By considering vulnerability severity, potential exploitability, asset importance and exposure conditions, teams can establish meaningful remediation priorities.',
    riskSignals: [
      ['Vulnerability severity','CVSS score, assessed technical impact and severity category.'],
      ['Exploitability intelligence','Known exploitation, exploit availability and threat evidence, where integrated.'],
      ['Asset criticality','Importance of the system and its business service.'],
      ['Exposure reachability','Accessibility, attack surface and network context.'],
      ['Remediation status','Owner, target date, progress and validation outcome.']
    ],
    riskOutcome: 'Direct remediation effort towards the exposures with the greatest potential business impact.',
    differentiators: [
      ['Periodic security snapshots','Continuous assessment workflow and exposure trends'],
      ['Vulnerability lists without asset context','Findings linked with asset and exposure context'],
      ['Severity-first remediation','Contextual, risk-based prioritisation'],
      ['Disconnected correction follow-up','Central ownership and remediation tracking'],
      ['Standalone assessment reports','Consolidated exposure, trend and closure reporting']
    ],
    differentiatorSummary: 'Point-in-time assessments provide valuable findings. Exposure management adds ongoing visibility, prioritisation, remediation accountability and validation.',
    differentiatorTitle: 'Why PANOPTIX: Snapshots vs. Continuous Coverage.',
    comparisonNote: 'Comparison reflects a fragmented approach, not a claim that all vulnerability-management competitors lack these capabilities.',
    benefitsTitle: 'Reduce Exposure. Strengthen Resilience.',
    benefits: [
      ['Greater Attack Surface Visibility','Improve awareness of exposed services, assets and infrastructure changes.'],
      ['Smarter Risk Prioritisation','Help teams focus on the most consequential weaknesses.'],
      ['Faster Remediation Coordination','Improve accountability through ownership and corrective-action tracking.'],
      ['Improved Security Governance','Use exposure trends and closure evidence for oversight.'],
      ['Continuous Security Improvement','Track exposure reduction and validate corrections through reassessment.']
    ],
    industriesEyebrow: 'Industry applications',
    industriesTitle: 'Industries: Cyber Exposure Management for Complex Digital Environments.',
    industries: [
      ['Large Enterprises','Manage exposure across multi-site networks, endpoints, servers and digital services.'],
      ['BFSI & Financial Services','Support vulnerability governance and remediation for sensitive financial infrastructure.'],
      ['Government & Public Sector','Improve inventory awareness and support structured risk-reduction processes.'],
      ['Data Centres & Critical Infrastructure','Assess infrastructure exposure and coordinate remediation across key systems.']
    ],
    securityEyebrow: 'Security & Governance',
    securityTitle: 'Built for Security-Conscious Environments.',
    securityIntro: 'PANOPTIX should provide controlled access to assessment information, vulnerability evidence, asset context and remediation records. Its deployment architecture should support security controls aligned with sensitive environments and internal governance expectations. Confirm each control against the released edition.',
    controls: [
      ['Role-based permissions','Control access to assessment information and remediation records.'],
      ['Authentication safeguards','Support secure access to the platform.'],
      ['Encrypted communications','Protect communications in transit.'],
      ['Audit trails','Maintain accountability for user activity and changes.'],
      ['Scanner authorisation and scope controls','Limit assessments to approved targets and scopes.'],
      ['Assessment-data protection','Protect vulnerability evidence and asset context.'],
      ['Configurable evidence retention','Set evidence retention to align with internal governance.']
    ],
    trustNote: 'Designed to support accountability and security governance; PANOPTIX does not guarantee compliance or certification.',
    deploymentEyebrow: 'Deployment & integration',
    deploymentTitle: 'Deployment: Fit Cyber Exposure Management to Your Environment.',
    deploymentIntro: 'PANOPTIX can be positioned for organisations seeking controlled exposure assessment across existing infrastructure. Deployment planning should address asset scope, network access, supported assessment methods, integration requirements and security governance.',
    deploymentOptions: [
      ['Environment & Asset Scope','Identify targets, ownership, network boundaries and access rules.'],
      ['Scanner & Source Integration','Connect approved tools and vulnerability/configuration evidence sources.'],
      ['Access & Policy Setup','Configure roles, controls, priorities and reporting policies.'],
      ['Rollout & Operational Handover','Validate results and transfer workflow ownership to security teams.']
    ],
    faqs: [
      {q:'What is PANOPTIX?',a:'PANOPTIX is a Cyber Exposure Management System intended to unite asset visibility, vulnerability and configuration findings, risk context and remediation tracking.'},
      {q:'How is it different from a VAPT tool?',a:'VAPT identifies and validates technical weaknesses. Exposure management also connects asset context, priorities, ownership, follow-up and continuous reassessment.'},
      {q:'What can PANOPTIX assess?',a:'The target scope includes network assets, servers, externally accessible services and supported application/cloud findings. Actual coverage depends on available scanning engines and integrations.'},
      {q:'Does PANOPTIX support risk-based prioritisation?',a:'This is a central design capability. The live scoring methodology and data feeds must be verified for each released edition.'},
      {q:'Can remediation progress be tracked?',a:'The intended workflow covers owner assignment, status, corrective action and validation. Confirm production availability before advertising.'},
      {q:'Can PANOPTIX be deployed on-premises?',a:'On-premises deployment is a recommended direction for security-sensitive customers. Supported packaging and prerequisites should be confirmed.'},
      {q:'Can it help with cybersecurity compliance?',a:'It can provide technical assessment evidence for governance workflows, but does not independently guarantee compliance or certification.'}
    ]
  },
  vapt: {
    category: 'Cybersecurity',
    descriptor: 'Vulnerability Assessment & Penetration Testing Platform',
    heroEyebrow: 'SECURITY ASSESSMENT / VULNERABILITY INTELLIGENCE',
    heroFeatures: true,
    summary: 'Nested VA helps security teams identify vulnerabilities, assess configuration weaknesses, organise technical evidence and guide remediation through a unified assessment workflow. Combining automated checks with expert-led validation, it supports clearer findings, actionable reports and more confident security decisions.',
    images: ['photo-1774901128276-1eab48f1fb9c','photo-1576836165612-8bc9b07e7778','photo-1763568258330-039d2f3dfc76','photo-1776161560127-a8623e0fa820'],
    gallery:['photo-1542903660-eedba2cda473','px-36496927','px-34803990'],flowImage:'photo-1771189958197-06850d4828af',ctaImages:['px-12899168','px-6804076','px-7988086','photo-1571171637578-41bc2dd41cd2'],
    accent: '#0C6B63',
    overviewTitle: 'Overview: Proactive Security Assessment for a Safer Digital Environment.',
    overview: [
      'As organisations expand networks, applications and infrastructure, vulnerabilities and configuration weaknesses accumulate across technologies. Periodic tests become difficult to coordinate when assessment evidence, severity classifications, remediation actions and reports are distributed among disconnected tools.',
      'Nested VA is designed to unify assessment execution, findings management and security reporting. It supports repeatable checks, structured vulnerability evidence, consistent severity classification and clear remediation recommendations while preserving room for manual validation by qualified professionals.'
    ],
    use: ['Enterprises & IT Teams','Security Consultants & VAPT Teams','Government & Regulated Organisations','Internal Audit & Compliance Teams'],
    flow: [
      ['Plan','Define authorised targets, rules of engagement, testing windows and assessment objectives.'],
      ['Discover','Collect approved asset, software and service information within agreed scope.'],
      ['Assess','Execute applicable read-only or controlled vulnerability/configuration checks.'],
      ['Validate','Review findings and perform explicitly authorised manual testing where required.'],
      ['Report','Document evidence, severity, impact and prioritised corrective actions.'],
      ['Re-test','Reassess remediated issues and record verified closure or residual exposure.']
    ],
    flowTitle: 'How It Works: From Assessment Scope to Verified Remediation.',
    flowEyebrow: 'Security testing lifecycle',
    flowNote: 'A disciplined security testing lifecycle connects technical discovery, finding validation, remediation ownership and closure evidence without confusing scan results with proof of exploitability.',
    exposureDomains: [
      ['Network Devices','Assess supported firewalls, routers and switches for security-relevant configuration weaknesses.'],
      ['Windows Servers','Read-only checks of operating system posture, services, patch indicators and security settings.'],
      ['Linux Servers','SSH-based configuration and exposure assessment with defined credentials and scope.'],
      ['Firewall Policy','Review policy hygiene, remote administration, logging and selected vendor-specific security controls.'],
      ['Web & API Security','Planned or integration-dependent domain; promote only after supported scanners and manual workflows are validated.'],
      ['Cloud / Wireless','Potential future coverage through dedicated assessment engines or integrations; not confirmed as present capabilities.']
    ],
    domainTitle: 'Testing Scope: Targeted Testing Across Your Digital Environment.',
    domainEyebrow: 'Assessment coverage',
    domainNote: 'Coverage depends on supported assessment workers, tools, versions, credentials and agreed testing scope.',
    useCasesEyebrow: 'People and systems',
    useCasesTitle: 'Use Cases: Practical Security Testing for Complex Environments.',
    useCaseLead: '',
    useCases: [
      ['Network & Firewall Audits','Review supported vendor configurations to surface risky management services, rule weaknesses and security-control gaps.'],
      ['Server Vulnerability Assessment','Collect approved Windows and Linux security observations using read-only or controlled checks.'],
      ['VAPT Assessment & Closure','Translate validated weaknesses into evidence-rich reports, track action owners and verify remediations.']
    ],
    capabilityGroups: [
      {title:'Assessment Orchestration',items:['Coordinate approved scanning jobs and collect structured results across supported assessment workers.']},
      {title:'Multi-Vendor Check Modules',items:['Organise firewall and network-device checks for supported FortiGate, Cisco ASA and Palo Alto environments.']},
      {title:'Windows & Linux Audits',items:['Support operating system-focused checks through read-only scripts and SSH workflows.']},
      {title:'Structured Findings',items:['Capture severity, affected assets, description, evidence, impact, references and remediation.']},
      {title:'Reporting Outputs',items:['Generate consistent security-assessment reports, including HTML/PDF where implemented.']},
      {title:'Progress & Status Tracking',items:['Communicate assessment lifecycle states and execution progress to operators.']},
      {title:'Re-testing & Closure',items:['Support repeat assessment and closure confirmation, subject to release availability.']},
      {title:'Risk Prioritisation',items:['Present severity-oriented findings with business-context scoring as a proposed enhancement.']}
    ],
    capabilityTitle: 'Capabilities: Everything Nested VA Brings to an Assessment.',
    capabilityLead: 'Automate supported checks, organise evidence and guide remediation through a structured assessment workflow.',
    riskEyebrow: 'Vulnerability intelligence',
    riskTitle: 'Findings: Results That Lead to Action.',
    riskIntro: 'A useful VAPT report should help an engineer understand what is affected, why it matters, what evidence supports the conclusion and which corrective step comes next. Nested VA should maintain clear finding records suitable for technical remediation and management review.',
    riskSignals: [
      ['Finding details','Vulnerability title, description, affected IP, hostname or device, and vulnerable parameter or configuration item.'],
      ['Severity & impact','Severity classification, impact and CVSS context where applicable.'],
      ['Evidence & references','Evidence and proof-of-concept when authorised, reproduction steps, and CVE/CWE/OWASP references where applicable.'],
      ['Remediation','Recommendation, remediation owner and corrective action.'],
      ['Verification status','Re-test status and evidence of closure or residual exposure.']
    ],
    riskOutcome: 'Use severity as a starting point, then consider exploit evidence, internet exposure, asset criticality and operational constraints when setting remediation priorities.',
    differentiators: [
      ['Separate scripts and report files','Coordinated assessment workflow'],
      ['Inconsistent issue descriptions','Structured findings schema'],
      ['Manual consolidation across vendors','Vendor-specific check modules and consolidated results'],
      ['Unclear reassessment progress','Defined status and closure workflow'],
      ['Standalone technical reports','Consistent technical and executive reporting']
    ],
    differentiatorSummary: '',
    comparisonNote: 'These comparisons describe a fragmented workflow; they are not categorical claims that competing commercial tools lack these features.',
    differentiatorTitle: 'Why Nested VA: Scattered Tests vs. One Platform.',
    businessEyebrow: 'Business benefits',
    benefitsTitle: 'Stronger Security. Greater Assessment Confidence.',
    benefits: [
      ['Identify Risk Earlier','Find supported weaknesses before they become larger operational incidents.'],
      ['Improve Assessment Consistency','Apply repeatable procedures and reporting formats across engagements.'],
      ['Accelerate Remediation','Translate evidence into clearly prioritised corrective recommendations.'],
      ['Support Security Governance','Produce structured records for management review and audit preparation.'],
      ['Demonstrate Closure','Support re-testing and maintain evidence of validated remediation.']
    ],
    industriesEyebrow: 'Industry applications',
    industriesTitle: 'Industries: Structured Assessment for Complex Environments.',
    industries: [
      ['Enterprises','Assess network and server environments across business locations and technology teams.'],
      ['BFSI','Support structured infrastructure testing and remediation evidence for security governance.'],
      ['Government','Enable authorised security assessments of institutional infrastructure and controlled environments.'],
      ['Data Centres & MSPs','Repeat infrastructure and configuration reviews across supported asset groups.']
    ],
    deploymentEyebrow: 'Deployment & integrations',
    deploymentTitle: 'Deployment: Fit Security Testing to Your Environment.',
    deploymentIntro: 'Nested VA is intended for controlled deployment within customer-managed infrastructure. Assessment jobs are coordinated through a central control plane and executed by technology-specific workers. Deployment planning accounts for network reachability, target authorisation, credential handling, scanner scope, secure storage and reporting requirements; supported architecture and integrations depend on the release.',
    deploymentOptions: [
      ['Assessment Scope & Access','Confirm authorised targets, ownership, network reachability, testing windows and access rules.'],
      ['Environment Planning','Plan secure storage, credentials, scanner scope and reporting requirements.'],
      ['Worker & Scanner Configuration','Configure the validated assessment workers and supported tools for the approved environment.'],
      ['Training & Support','Prepare operational handover, training and ongoing support for the assessment team.']
    ],
    securitySectionId: 'security-trust',
    securityEyebrow: 'Platform security',
    securityTitle: 'Security Testing with Control and Accountability.',
    securityIntro: 'Security testing platforms handle sensitive targets, credentials and vulnerability evidence. Nested VA deployments should enforce approved scopes, role-based access, secure credential storage, controlled job execution, audit records and evidence-handling policies.',
    controls: [
      ['Role-based access control','Role availability and permission granularity depend on the released product.'],
      ['Credential hygiene','Credential storage and handling are defined for the approved deployment.'],
      ['Audit logs','Confirm audit coverage for assessment jobs and user activity.'],
      ['Evidence handling','Confirm access, retention and protection rules for sensitive evidence.'],
      ['Approved testing scope','Limit each assessment to explicitly authorised targets and scope.']
    ],
    trustNote: 'Security controls must be confirmed against the released product. Automated scanning is not equivalent to a complete manual penetration test and does not guarantee regulatory compliance or certification.',
    faqs: [
      {q:'What is Nested VA?',a:'Nested VA is a vulnerability assessment and penetration-testing workflow platform for organising supported technical checks, structured findings and assessment reports.'},
      {q:'Does Nested VA replace manual penetration testing?',a:'No. Automated checks help identify potential weaknesses, while meaningful exploitation testing and validation require qualified professionals and explicit authorisation.'},
      {q:'Which assets can it assess?',a:'The documented development scope includes FortiGate, Cisco ASA, Palo Alto, Windows and Linux check workflows. Exact supported versions and tests require confirmation.'},
      {q:'Can Nested VA be deployed on-premises?',a:'On-premises, customer-controlled deployment is the intended architecture; infrastructure sizing and packaged release requirements should be confirmed.'},
      {q:'Can the platform generate reports?',a:'The product design includes HTML/PDF security assessment reports and structured vulnerability evidence. Confirm report templates and export functionality in the installed release.'},
      {q:'Does it support re-testing?',a:'Re-testing and closure are part of the recommended assessment lifecycle. Confirm current availability in the released product.'},
      {q:'How do organisations get started?',a:'Request a demonstration and share the intended target classes, scope, assessment permissions and reporting requirements.'}
    ]
  },
  smms: {
    category: 'Network intelligence',
    descriptor: 'Smart Monitoring & Management System',
    heroEyebrow: 'SMART OPERATIONS / UNIFIED MONITORING',
    heroTitle: 'SMMS — Smart Monitoring & Management System',
    heroHeadline: 'Connected Visibility. Faster Response. Reliable Operations.',
    heroFeatures: true,
    summary: 'SMMS brings infrastructure status, performance metrics, alerts, incidents and service-level visibility into a unified operational platform. Help IT and operations teams detect issues early, understand service health, coordinate escalation and manage distributed environments with greater consistency and control.',
    images: [
      '/images/smms/01_SMMS_Hero_16x9.webp',
      '/images/smms/02_Infrastructure_Monitoring_3x4.webp',
      '/images/smms/03_Network_Operations_3x4.webp',
      '/images/smms/04_Service_Performance_3x4.webp',
      '/images/smms/05_SMMS_Workflow_3x1.webp'
    ],
    faqImage: '/images/smms/06_SMMS_FAQ_Trust_4x3.webp',
    accent: '#007b8c',
    overviewEyebrow: 'ABOUT SMMS',
    overviewTitle: 'Overview: One Operational View Across Your Critical Systems.',
    overview: [
      'Modern operations rely on interconnected infrastructure, applications and services. When device status, alerts, response workflows and service targets are managed separately, teams lose time understanding what requires action.',
      'SMMS brings monitoring data and operational workflows into a shared view. Device health and performance measurements connect with alert management, incident handling, notifications, escalations and SLA reporting to provide greater clarity across distributed services.',
      'The platform is intended to improve day-to-day operational oversight for organisations that need reliable infrastructure availability and structured response processes.'
    ],
    use: ['Enterprises & Multi-site IT','Data Centres & Managed Service Providers','Operations & Service Delivery Teams','IT Helpdesk & NOC Teams'],
    useCasesEyebrow: 'PEOPLE AND SYSTEMS',
    useCasesTitle: 'Use Cases: Smart Monitoring in the Real World.',
    useCaseLead: 'From infrastructure rooms to operational teams, SMMS connects systems, signals and action in a single monitoring approach.',
    useCases: [
      ['Infrastructure Monitoring','Track the health and status of servers, network assets and critical systems.'],
      ['Network Operations','Improve operational awareness and issue response across connected infrastructure.'],
      ['Service Performance','Review dashboards, alert patterns and service performance indicators.']
    ],
    capabilityTitle: 'Capabilities: Everything SMMS Brings Together.',
    capabilityLead: '',
    capabilityGroups: [
      {title:'Unified System Visibility',items:['Bring monitored assets, health indicators and operational status together.']},
      {title:'Health & Performance Monitoring',items:['Track device metrics, availability and changes over time.']},
      {title:'Intelligent Alerts & Events',items:['Apply alert rules and surface conditions needing investigation.']},
      {title:'Incident & Escalation Management',items:['Support incident workflows, notifications and ownership escalation.']},
      {title:'SLA & Service Reporting',items:['Measure service performance and review SLA-related indicators.']},
      {title:'Dashboards & Operational Insights',items:['Present metrics and status for operators and management.']}
    ],
    differentiatorEyebrow: 'WHY SMMS',
    differentiatorTitle: 'Why SMMS: Scattered Checks vs. Coordinated Operations.',
    differentiatorSummary: '',
    differentiators: [
      ['Separate status screens','Unified operational dashboard'],
      ['Manually reviewed device health','Centralised metrics and health visibility'],
      ['Isolated event notifications','Managed alerting and escalation workflows'],
      ['Disconnected support records','Incident-centred operations'],
      ['Ad hoc service reporting','SLA-related measurement and reporting']
    ],
    benefitsEyebrow: 'BUSINESS BENEFITS',
    benefitsTitle: 'Benefits: Improve Awareness. Reduce Response Friction.',
    benefits: [
      ['Clearer Operations','Understand service conditions from one monitoring environment.'],
      ['Timely Intervention','Surface emerging infrastructure faults through alert workflows.'],
      ['Better Accountability','Structure incident ownership, notifications and escalation.'],
      ['Consistent Service Oversight','Use SLA and performance records to review service delivery.'],
      ['Scalable Operating Model','Build repeatable monitoring processes as infrastructure grows.']
    ],
    flowEyebrow: 'HOW IT WORKS',
    flowTitle: 'How It Works: An Operational Workflow Teams Can Follow.',
    flow: [
      ['Monitor Systems',''],
      ['Detect & Prioritise Alerts',''],
      ['Manage Incidents',''],
      ['Resolve & Review','']
    ],
    flowNote: 'SMMS connects monitoring signals with incidents, notifications, escalation and service reporting so teams can move from observation to accountable action.',
    integrationsEyebrow: 'DATA SOURCES AND INTEGRATIONS',
    integrationsTitle: 'Integrations: Bring Operational Signals into One Monitoring Environment.',
    integrationsIntro: 'SMMS is built around health checks, metric collection, alert evaluation and operational records. Its architecture includes service components for polling, alert handling, dashboards and notification workflows. Specific SNMP, ICMP, API, syslog, IoT protocol and third-party integration support should be confirmed against the deployed release.',
    integrations: ['Assets & Devices','Polling & Metrics','Alerts & Incidents','SLA & Notifications'],
    deploymentEyebrow: 'DEPLOYMENT AND INTEGRATIONS',
    deploymentTitle: 'Deployment: Fit SMMS to Your Operating Environment.',
    deploymentIntro: 'Align the platform to existing infrastructure and service workflows through structured onboarding, source mapping, rules configuration and operational handover. Validate supported deployment packaging and technical capacity during solution scoping.',
    deploymentOptions: [
      ['Environment & Access Planning','Plan the operating environment, access needs and prerequisites.'],
      ['Monitoring Source Mapping','Map the monitoring sources and assets in scope.'],
      ['Alert & Escalation Configuration','Configure alert rules, notifications and escalation paths.'],
      ['Rollout & Knowledge Transfer','Support rollout and hand over operating knowledge to the team.']
    ],
    faqImageAlt: 'SMMS service operations and monitoring environment',
    faqs: [
      {q:'What is SMMS?',a:'SMMS is a Smart Monitoring & Management System intended to centralise infrastructure monitoring, health metrics, alerts, incidents and service performance workflows.'},
      {q:'Who is SMMS designed for?',a:'Enterprises, data centres, managed service providers and IT/operations teams responsible for complex services and infrastructure.'},
      {q:'Which systems can SMMS monitor?',a:'Its established scope includes assets, health and metrics. Exact device and integration compatibility must be checked for each version.'},
      {q:'Does SMMS support incidents and escalations?',a:'Incident, notification and escalation APIs and services form part of the product architecture; full workflow availability should be demonstrated in the current release.'},
      {q:'Can SMMS track SLAs?',a:'SLA endpoints and reporting concepts are part of the defined platform scope. Metric definitions and contractual SLA calculations need deployment-specific validation.'},
      {q:'Does it include industrial IoT or facility monitoring?',a:'Such use cases may be supported through additional collectors and integrations, but they are not assumed to be available in the baseline release.'},
      {q:'How do we evaluate SMMS?',a:'Request a technical demonstration covering supported monitoring methods, scale, notification rules, service reporting and deployment prerequisites.'}
    ],
    seoTitle: 'SMMS | Smart Monitoring & Management System | Gyanshu',
    seoDescription: 'Explore SMMS, a unified monitoring and management platform for infrastructure health, alerts, incidents, SLAs and operational dashboards.',
    seoKeywords: 'Smart Monitoring and Management System, Infrastructure Monitoring, Service Monitoring, Incident Management, SLA Monitoring, IT Operations Dashboard'
  },
  'gyanshu-ai-office-assistance': {
    category: 'AI & productivity',
    descriptor: 'Private AI-Powered Enterprise Knowledge & Office Productivity Platform',
    heroEyebrow: 'PRIVATE AI / ENTERPRISE PRODUCTIVITY',
    heroTitle: 'AI Office Assistant',
    heroHeadline: 'Your Knowledge. Your Infrastructure. Smarter Work.',
    heroFeatures: true,
    summary: 'Bring private AI into everyday office work. AI Office Assistant is designed to help teams find organisational knowledge, understand internal documents, draft business content and streamline information-intensive tasks through an AI environment hosted within your own infrastructure.',
    images: ['/images/ai-office-assistant/01_AI_Office_Assistant_Hero_16x9.webp','/images/ai-office-assistant/02_Enterprise_Knowledge_3x4.webp','/images/ai-office-assistant/03_Document_Assistance_3x4.webp','/images/ai-office-assistant/04_Office_Productivity_3x4.webp','/images/ai-office-assistant/05_AI_Workflow_3x1.webp','/images/ai-office-assistant/06_Private_AI_Trust_4x3.webp'],
    heroImages: ['/images/ai-office-assistant/01_AI_Office_Assistant_Hero_16x9.webp','/images/ai-office-assistant/02_Enterprise_Knowledge_3x4.webp','/images/ai-office-assistant/03_Document_Assistance_3x4.webp','/images/ai-office-assistant/04_Office_Productivity_3x4.webp'],
    faqImage: '/images/ai-office-assistant/06_Private_AI_Trust_4x3.webp',
    faqImageAlt: 'On-premises server infrastructure for private AI processing',
    accent: '#07898a',
    overviewEyebrow: 'PLATFORM OVERVIEW',
    overviewTitle: 'Make Organisational Knowledge More Useful.',
    overview: [
      'Across organisations, valuable information sits in policies, circulars, SOPs, reports, shared drives and departmental records. Employees spend time locating documents, comparing information and preparing routine communication instead of focusing on decisions and service delivery.',
      'AI Office Assistant is conceived as a secure, organisation-controlled AI workspace that connects local model inference with approved enterprise knowledge sources. Employees can interact in natural language, receive relevant assistance and prepare first drafts from available information.',
      'Its phased implementation approach allows organisations to start with private AI inference and expand to indexed document retrieval, contextual answers, citations and departmental workflows as integration and governance controls are completed.'
    ],
    use: ['Government & Public Sector','Enterprises & Corporate Offices','Knowledge-Intensive Teams','Administration & HR Departments'],
    useCasesEyebrow: 'REAL-WORLD APPLICATIONS',
    useCasesTitle: 'AI Assistance for the Work That Matters.',
    useCaseLead: 'Help teams work with approved knowledge, understand documents and prepare everyday office content.',
    useCases: [
      ['Enterprise Knowledge Search','Find relevant policies, circulars, SOPs and technical information using natural language.'],
      ['Document Understanding','Summarise long documents, extract key points and compare information for human review.'],
      ['Office Productivity','Prepare drafts, meeting summaries, action-item outlines and internal correspondence.']
    ],
    capabilityTitle: 'Private AI Designed for Enterprise Workflows.',
    capabilityLead: '',
    capabilityGroups: [
      {title:'Local AI Inference',items:['Run a language model on organisation-controlled infrastructure; this is the validated foundational capability.']},
      {title:'Natural Language Assistance',items:['Ask questions and request explanations or drafts through an enterprise assistant interface; validate application availability.']},
      {title:'Enterprise Document Ingestion',items:['Index approved PDFs, DOCX, office files and text repositories; planned and integration-dependent.']},
      {title:'Contextual Knowledge Retrieval',items:['Search approved material and supply source-grounded answers using a retrieval layer; planned and integration-dependent.']},
      {title:'Content Drafting & Summaries',items:['Draft emails, memos, summaries and structured notes with staff review; validate UI and quality controls.']},
      {title:'Departmental Knowledge Spaces',items:['Provide tailored collections and access policies for teams; requires configured tenancy and permissions.']},
      {title:'Usage & Audit Controls',items:['Track administrative actions and user activity where implemented; validate logging and governance.']},
      {title:'Enterprise Integrations',items:['Connect file shares, document systems and approved applications via validated adapters.']}
    ],
    differentiatorEyebrow: 'WHY PRIVATE AI',
    differentiatorTitle: 'Move Beyond Disconnected Information Workflows.',
    differentiatorSummary: 'AI Office Assistant is not positioned as a general public chatbot. Its distinguishing direction is organisation-controlled AI inference, approved internal knowledge retrieval, departmental relevance and gradual integration into office workflows. It should not claim unlimited accuracy, autonomous approvals or unrestricted access to every enterprise document.',
    differentiators: [
      ['Files spread across folders','One guided knowledge-access experience'],
      ['Keyword-only searching','Natural-language assistance, with retrieval when integrated'],
      ['Repeated manual first drafts','Assisted drafting and summarisation'],
      ['Public tools with uncertain data boundaries','Organisation-controlled inference and deployment boundaries'],
      ['Limited departmental context','Scoped knowledge collections when configured']
    ],
    benefitsEyebrow: 'BUSINESS OUTCOMES',
    benefitsTitle: 'Spend Less Time Searching. More Time Delivering.',
    benefits: [
      ['Faster Information Access','Help employees locate relevant material and understand complex documents.'],
      ['Consistent Internal Knowledge','Make approved procedures and policies easier to discover and reuse.'],
      ['Reduced Repetitive Work','Accelerate initial drafts, summaries and structured office communication.'],
      ['Better-Informed Decisions','Bring relevant records and policy context closer to the point of work.'],
      ['Greater Data Control','Keep core AI processing within a private deployment boundary, subject to system configuration.']
    ],
    departmentsEyebrow: 'DEPARTMENT APPLICATIONS',
    departmentsTitle: 'Designed Around Everyday Enterprise Functions.',
    departments: [
      ['Administration','Circulars, office orders, meeting notes, internal correspondence and document retrieval.'],
      ['HR & People Operations','HR policies, onboarding references, staff guidance and routine communication.'],
      ['IT & Service Operations','Knowledge base assistance, runbooks, FAQs, technical SOPs and helpdesk drafting.'],
      ['Leadership & Management','Briefing notes, report summarisation, policy comparisons and decision-support preparation.']
    ],
    flowEyebrow: 'HOW IT WORKS',
    flowTitle: 'From Internal Information to Useful Answers.',
    flow: [
      ['Prepare','Select approved documents and relevant business knowledge.'],
      ['Organise','Extract, process and index content with appropriate access controls.'],
      ['Ask','Employees submit natural-language questions or drafting requests.'],
      ['Review & Act','The assistant produces a response; users verify sources and approve the result before use.']
    ],
    flowNote: 'The document preparation, indexing and retrieval stages depend on the integrations and governance controls enabled for the deployment.',
    securityEyebrow: 'SECURITY AND GOVERNANCE',
    securityTitle: 'Private by Design. Controlled by Your Organisation.',
    securityIntro: 'AI Office Assistant is built around the principle of private deployment: local model hosting provides a foundation for maintaining organisational control over inference infrastructure. To support sensitive enterprise information, document permission enforcement, audit trails, encryption, administrator controls, retention policies and human oversight must be implemented and verified across the full product stack.',
    securityLabels: ['On-Premises Inference','Role-Aware Knowledge Access (when configured)','Auditable Operations (when implemented)'],
    deploymentEyebrow: 'DEPLOYMENT AND INTEGRATION',
    deploymentTitle: 'Fit Private AI to Your Existing Environment.',
    deploymentIntro: 'Deploy the inference layer on your organisation-controlled Linux infrastructure, then phase in the enterprise assistant application, document processing, retrieval indexes and approved business-system integrations.',
    deploymentOptions: [
      ['Environment Assessment','Review compute, storage, networking, operating system and model-sizing requirements.'],
      ['Knowledge Source Planning','Identify approved documents, data ownership and indexing scope.'],
      ['Identity & Governance','Define user access, sensitive information handling, logging and retention.'],
      ['Pilot & Knowledge Transfer','Validate response quality, citations, security controls and staff onboarding.']
    ],
    faqs: [
      {q:'What is AI Office Assistant?',a:'A private enterprise AI platform combining locally hosted language-model inference with an intended suite of knowledge and productivity tools.'},
      {q:'Is it an on-premises solution?',a:'Yes. The current foundation uses an on-premises AI inference server. Broader product packaging and deployment steps should be checked for the release.'},
      {q:'Can it answer questions from internal documents?',a:'That is a principal planned capability through approved document ingestion, indexing and retrieval. Verify the connected source coverage before advertising it as live.'},
      {q:'Can it work without internet access?',a:'Local inference may run without internet; actual offline operation depends on installed models, authentication, integrations and all other runtime dependencies.'},
      {q:'Which languages are supported?',a:'Capabilities depend on the deployed model and evaluation. Avoid promising any language or quality level until tested.'},
      {q:'Will confidential information leave our infrastructure?',a:'The design aims to keep processing in the private environment. Confirm all telemetry, update mechanisms, connectors and network egress policies.'},
      {q:'Is access controlled by department?',a:'Departmental scoping and access enforcement should be confirmed in the application and retrieval layers.'},
      {q:'How can we start?',a:'Begin with a scoped pilot: identify users, document collections, security requirements, measurable use cases and success criteria.'}
    ],
    seoTitle: 'AI Office Assistant | Private Enterprise AI & Knowledge Platform',
    seoDescription: 'Explore AI Office Assistant by Gyanshu Technologies: a private, on-premises AI platform for enterprise knowledge access, document assistance and office productivity.',
    seoKeywords: 'private enterprise AI assistant, on-premises AI assistant, enterprise knowledge assistant, internal document AI search, private LLM for business, AI office productivity, secure enterprise AI'
  },
}
// Small gradient icon tile for capability cards.
function FlipIcon({ title }) {
  return <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0C6B63] text-white shadow-[0_10px_20px_-8px_rgba(14,131,120,.6)]">{createElement(iconFor(title), { size: 18, strokeWidth: 1.8 })}</span>
}

profiles.ipdr = flowbitsProfile

// Original interface illustrations (public/images/products, marked "Illustrative interface"); they lead the hero slideshow and the catalog card.
const productShots = {
  ipdr: ['/images/products/nexora-investigation.svg', '/images/products/nexora-overview.svg'],
  'argos-enms': ['/images/products/netsight-topology.svg', '/images/products/netsight-devices.svg'],
  panoptix: ['/images/products/panoptix-overview.svg', '/images/products/panoptix-assets.svg'],
  vapt: ['/images/products/nestedva-findings.svg', '/images/products/nestedva-report.svg'],
  smms: ['/images/products/smms-overview.svg', '/images/products/smms-incident.svg'],
}
// "On this page" links, in the same order as the sections and named after their headings.
const subNav = {
  panoptix: [['#overview','Overview'],['#workflow','How it works'],['#exposure-domains','Exposure areas'],['#use-cases','Use cases'],['#capabilities','Capabilities'],['#risk-intelligence','Prioritisation'],['#different','Why PANOPTIX'],['#industries','Industries'],['#deployment','Deployment']],
  smms: [['#overview','Overview'],['#people','Use cases'],['#capabilities','Capabilities'],['#different','Why SMMS'],['#business-benefits','Benefits'],['#workflow','How it works'],['#integrations-data','Integrations'],['#deployment','Deployment'],['#faq','FAQ']],
  vapt: [['#overview','Overview'],['#workflow','How it works'],['#exposure-domains','Testing scope'],['#use-cases','Use cases'],['#capabilities','Capabilities'],['#risk-intelligence','Findings'],['#different','Why Nested VA'],['#industries','Industries'],['#deployment','Deployment']],
}
// Hero slideshow: the two interface screens, then two real-world photos of the job each product does. One caption per slide.
const heroScenes = {
  ipdr: { photos: ['px-15483318', 'px-4339335'], captions: ['IPDR & subscriber investigation', 'Network intelligence overview', 'Built for ISP & telecom networks', 'Fibre-core traffic, correlated'] },
  'argos-enms': { photos: ['px-3992926', 'px-6466141'], captions: ['Live network topology', 'Device health at a glance', 'For network operations teams', 'Every switch, router and link'] },
  panoptix: { photos: ['px-3862132', 'px-6804084'], captions: ['Cyber exposure overview', 'Discovered asset inventory', 'Continuous security monitoring', 'Prioritise fixes as a team'] },
  vapt: { photos: ['px-3861959', 'px-1181675'], captions: ['Findings with evidence', 'Reports & remediation tracking', 'Hands-on security assessment', 'Re-test and verify every fix'] },
  smms: { photos: ['px-17489153', 'px-36706460'], captions: ['Service health across locations', 'Incidents & escalation', 'Infrastructure under watch', 'IT teams resolving faster'] },
}
for (const [id, shots] of Object.entries(productShots)) profiles[id] = { ...profiles[id], productShots: shots, heroImages: [...shots, ...heroScenes[id].photos], heroCaptions: heroScenes[id].captions }

// Shared helper understands local, Pexels and Unsplash ids.
const photo = (id, w=1000) => sharedPhoto(id, w)
const idFor = productIdFor
// The product's own interface screen where there is one, otherwise its product artwork.
const catalogImage = (id) => (profiles[id].productShots || profiles[id].images)[0]
// Section images separate from the hero set, so a product page does not repeat its hero photos.
const galleryOf = (p) => p.gallery || p.images.slice(1)
const flowImageOf = (p) => p.flowImage || p.images[3]
const ctaImagesOf = (p) => p.ctaImages || p.images.concat(p.images)

const visualLabels = {
  ipdr: ['Data centre infrastructure','IP network connectivity','Network equipment in service'],
  'argos-enms': ['Network infrastructure monitoring','Network operations','Data centre systems'],
  panoptix: ['Cybersecurity analyst at work','Security assessment','Network security monitoring'],
  vapt: ['Security testing workstation','Code and vulnerability review','Security assessment'],
  smms: ['Infrastructure monitoring','Network operations','Service performance'],
  'gyanshu-ai-office-assistance': ['Enterprise knowledge search','Document understanding','Office productivity'],
}

function ProductImageSequence({ id, images, accent, label, captions }) {
  const caption = (i) => captions?.[i] || visualLabels[id]?.[i % 3] || ''
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (reduceMotion || images.length < 2) return undefined
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % images.length), 5200)
    return () => window.clearTimeout(timer)
  }, [active, images, reduceMotion])
  return <div className="grain relative h-full w-full overflow-hidden bg-[#070d0f]" role="img" aria-label={`${label} image sequence`}>
    <motion.img key={images[active]} src={photo(images[active],2000)} alt={caption(active)} loading="eager" fetchPriority="high" className="absolute inset-0 z-0 h-full w-full object-cover" initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} transition={{opacity:{duration:.6},scale:{duration:1.2}}}/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#070d0f]/90 via-[#070d0f]/20 to-[#070d0f]/30"/>
    <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:p-9"><div><span className="eyebrow-dark">{label}</span><AnimatePresence mode="wait"><motion.p key={active} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.5}} className="mt-4 font-display text-2xl font-medium tracking-[-.025em] text-white md:text-4xl">{caption(active) || 'People and systems in context'}</motion.p></AnimatePresence></div><div className="flex items-center gap-2">{images.map((image,index)=><button key={image} aria-label={`Show image ${index+1}`} aria-current={active===index?'true':undefined} onClick={()=>setActive(index)} className="group relative h-6 w-10"><span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">{index===active&&<motion.span key={`p-${active}`} className="absolute inset-0 origin-left" style={{background:accent==='#00a99d'?'#14B8A6':'#7EE3D9'}} initial={{scaleX:0}} animate={{scaleX:reduceMotion?1:1}} transition={{duration:reduceMotion?0:5.2,ease:'linear'}}/>}</span></button>)}</div></div>
  </div>
}

function IpdrLeafletSections({profile,part}) {
  const cardClass = 'rounded-2xl border border-[#dce9ef] bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg'
  return <>
    {part==='use-cases'&&<section id="use-cases" className="flex items-center bg-white"><div className="mx-auto w-full max-w-[1360px] px-5 py-10 sm:py-12 sm:px-8 md:py-14 lg:px-12"><p className="eyebrow w-fit">Real-world applications</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl md:text-5xl">{profile.useCasesTitle || 'Trusted by Teams Across Critical Use Cases'}</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{profile.useCases.map(([title,description],i)=><article key={title} className="overflow-hidden rounded-2xl border border-[#dce9ef] bg-white shadow-card"><img src={photo(galleryOf(profile)[i%galleryOf(profile).length],700)} alt="" loading="lazy" className="h-36 w-full object-cover"/><div className="p-5"><h3 className="font-display text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></div></article>)}</div></div></section>}
    {part==='business'&&<section id="business-benefits" className="flex items-center bg-[#f3f2ee]"><div className="mx-auto w-full max-w-[1360px] px-5 py-10 sm:py-12 sm:px-8 md:py-14 lg:px-12"><p className="eyebrow w-fit">Business benefits</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl md:text-5xl">{profile.benefitsTitle || 'Greater visibility. Stronger security. Smarter operations.'}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{profile.benefits.map(([title,description])=><article key={title} className={cardClass}><span className="font-mono text-xs text-[#0E8378]">◆</span><h3 className="mt-4 font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div><div className="mt-12 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow w-fit">{profile.industriesEyebrow || 'Industry & Deployment Use Cases'}</p><h3 className="mt-3 font-display text-2xl font-medium">{profile.industriesTitle || 'Designed for Your Network Reality'}</h3></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.industries.map(([title,description])=><article key={title} className={cardClass}><h4 className="font-display font-medium">{title}</h4><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div></div></div></section>}
    {part==='security'&&<section id="security-integrations" className="flex items-center bg-white"><div className="mx-auto grid w-full max-w-[1360px] gap-8 px-5 py-10 sm:py-12 sm:px-8 md:py-14 lg:grid-cols-2 lg:px-12"><div><p className="eyebrow w-fit">{profile.securityEyebrow || 'On-premises control & security'}</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl">{profile.securityTitle || 'Your Data. Your Infrastructure. Your Rules.'}</h2><div className="mt-6 space-y-3">{profile.controls.map(([title,description])=><article key={title} className="flex gap-4 rounded-2xl border border-[#dce9ef] bg-white p-4"><span className="font-mono text-sm text-[#0E8378]">◆</span><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm text-[#5d696c]">{description}</p></div></article>)}</div></div><div><p className="eyebrow w-fit">{profile.integrationsEyebrow || 'Integrations & ecosystem'}</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl">{profile.integrationsTitle || 'Built to Fit Your Environment'}</h2>{profile.deploymentOptions?<div className="mt-8 grid gap-3 sm:grid-cols-2">{profile.deploymentOptions.map(([title,description])=><article key={title} className={cardClass}><div className="font-mono text-xs uppercase tracking-[.1em] text-[#0E8378]">{title}</div><p className="mt-3 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div>:<><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{profile.integrations.map((name)=><div key={name} className={`flex min-h-20 items-center justify-center rounded-xl border px-3 text-center font-mono text-xs uppercase tracking-[.1em] ${name==='Custom APIs'?'border-[#0E8378] bg-[#f0fbfb] text-[#0B4D49]':'border-[#dce9ef] bg-white text-[#253b48]'}`}>{name}</div>)}</div><div className="mt-4 rounded-2xl bg-[#071d2a] p-5 text-center font-display text-xl font-medium text-white">{profile.brandLabel || 'FLOWBITS NEXORA'}</div></>}</div></div></section>}
  </>
}
function ExtendedProductSections({profile,part}) {
  const card = 'rounded-2xl border border-[#dce9ef] bg-white p-5 shadow-card'
  if (part === 'domains') return <section id="exposure-domains" className="bg-[#f3f2ee] px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.domainEyebrow || 'Exposure domains'}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.domainTitle || 'Understand Cyber Exposure Across Your Digital Environment.'}</h2>{profile.domainIntro&&<p className="mt-3 max-w-3xl text-[#5d696c]">{profile.domainIntro}</p>}<div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{profile.exposureDomains.map(([title,description])=><article key={title} className={card}><h3 className="font-display text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div>{profile.domainNote&&<p className="mt-5 text-xs leading-relaxed text-[#5d696c]">{profile.domainNote}</p>}</div></section>
  if (part === 'use-cases') return <section id="use-cases" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.useCasesEyebrow || 'Real-world applications'}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.useCasesTitle}</h2>{profile.useCaseLead&&<p className="mt-3 max-w-3xl text-[#5d696c]">{profile.useCaseLead}</p>}<div className="mt-8 grid gap-4 md:grid-cols-3">{profile.useCases.map(([title,description],i)=><article key={title} className="overflow-hidden rounded-2xl border border-[#dce9ef] bg-white shadow-card"><img src={photo(galleryOf(profile)[i],700)} alt="" loading="lazy" className="h-48 w-full object-cover"/><div className="p-5"><h3 className="font-display text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></div></article>)}</div></div></section>
  if (part === 'risk') return <section id="risk-intelligence" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.riskEyebrow || 'Risk intelligence'}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.riskTitle}</h2><p className="mt-4 max-w-4xl leading-relaxed text-[#5d696c]">{profile.riskIntro}</p><div className="mt-7 overflow-hidden rounded-2xl border border-[#dce9ef] bg-white">{profile.riskSignals.map(([title,description],i)=><div key={title} className={`grid gap-2 px-5 py-4 sm:grid-cols-[.7fr_1.3fr] ${i%2?'bg-white':'bg-[#f3f2ee]'}`}><strong className="text-sm">{title}</strong><p className="text-sm leading-relaxed text-[#5d696c]">{description}</p></div>)}</div><p className="mt-5 rounded-2xl bg-[#e9f7f5] p-5 font-medium text-[#0B4D49]">{profile.riskOutcome}</p></div></section>
  if (part === 'integrations') return <section id="integrations-data" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">DATA SOURCES & INTEGRATIONS</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.integrationTitle}</h2><p className="mt-4 max-w-4xl leading-relaxed text-[#5d696c]">{profile.integrationIntro}</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{profile.integrations.map((item)=><article key={item} className={card}><h3 className="font-display font-medium">{item}</h3></article>)}</div><p className="mt-5 text-sm leading-relaxed text-[#5d696c]">{profile.integrationNote}</p></div></section>
  if (part === 'business') return <section id="business-benefits" className="bg-[#f3f2ee] px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.businessEyebrow || 'Outcomes'}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.benefitsTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{profile.benefits.map(([title,description])=><article key={title} className={card}><span className="font-mono text-xs text-[#0E8378]">◆</span><h3 className="mt-4 font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div></div></section>
  if (part === 'industries') return <section id="industries" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.industriesEyebrow}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.industriesTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.industries.map(([title,description])=><article key={title} className={card}><h3 className="font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div></div></section>
  if (part === 'security') return <section id={profile.securitySectionId || 'security-governance'} className="bg-[#f3f2ee] px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow w-fit">{profile.securityEyebrow || 'Security & governance'}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.securityTitle}</h2><p className="mt-4 leading-relaxed text-[#5d696c]">{profile.securityIntro}</p></div><div><p className="text-sm font-medium text-[#0B4D49]">Security parameters</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{profile.controls.map(([title,description])=><article key={title} className={card}><h3 className="font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div><p className="mt-5 text-sm leading-relaxed text-[#5d696c]">{profile.trustNote}</p></div></div></div></section>
  if (part === 'deployment') return <section id="deployment" className="grain relative mx-3 my-6 overflow-hidden rounded-[2.5rem] bg-[#070d0f] px-5 py-14 sm:py-16 text-white sm:mx-5 md:py-20"><div className="dot-grid pointer-events-none absolute inset-0 opacity-25"/><div className="relative mx-auto max-w-[1360px]"><p className="eyebrow-dark w-fit">{profile.deploymentEyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-.035em] md:text-5xl">{profile.deploymentTitle}</h2><p className="mt-4 max-w-4xl leading-relaxed text-white/70">{profile.deploymentIntro}</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.deploymentOptions.map(([title,description])=><article key={title} className="rounded-2xl border border-white/15 bg-white/[.04] p-5"><span className="font-mono text-xs text-[#65d9cb]">◆</span><h3 className="mt-3 font-display font-medium">{title}</h3>{description&&<p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>}</article>)}</div><Link to="/contact" className="btn btn-brand mt-7 !pr-1.5">Discuss Deployment <span className="btn-chip"><ArrowRight size={15}/></span></Link></div></section>
  return null
}

function SmmsSections({profile,part}) {
  const card = 'rounded-2xl border border-[#dce9ef] bg-white p-5 shadow-card'
  if (part === 'use-cases') return <section id="people" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.useCasesEyebrow}</p><div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.useCasesTitle}</h2><p className="mt-3 leading-relaxed text-[#5d696c]">{profile.useCaseLead}</p></div><div className="grid gap-4 sm:grid-cols-3">{profile.useCases.map(([title,description],i)=><article key={title} className="group relative min-h-[420px] overflow-hidden rounded-[22px] bg-[#0c1517]"><img src={photo(galleryOf(profile)[i],900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#070d0f]/95 via-[#070d0f]/15 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-5 text-white"><h3 className="font-display text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/75">{description}</p></div></article>)}</div></div></div></section>
  if (part === 'benefits') return <section id="business-benefits" className="bg-[#f3f2ee] px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.benefitsEyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-.035em]">{profile.benefitsTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{profile.benefits.map(([title,description])=><article key={title} className={card}><span className="font-mono text-xs text-[#0E8378]">◆</span><h3 className="mt-4 font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div></div></section>
  if (part === 'integrations') return <section id="integrations-data" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.integrationsEyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl font-medium tracking-[-.035em]">{profile.integrationsTitle}</h2><p className="mt-4 max-w-4xl leading-relaxed text-[#5d696c]">{profile.integrationsIntro}</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.integrations.map((item)=><article key={item} className={card}><h3 className="font-display font-medium">{item}</h3></article>)}</div></div></section>
  if (part === 'deployment') return <section id="deployment" className="grain relative mx-3 my-6 overflow-hidden rounded-[2.5rem] bg-[#070d0f] px-5 py-14 sm:py-16 text-white sm:mx-5 md:py-20"><div className="dot-grid pointer-events-none absolute inset-0 opacity-25"/><div className="relative mx-auto max-w-[1360px]"><p className="eyebrow-dark w-fit">{profile.deploymentEyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-.035em] md:text-5xl">{profile.deploymentTitle}</h2><p className="mt-4 max-w-4xl leading-relaxed text-white/70">{profile.deploymentIntro}</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.deploymentOptions.map(([title,description])=><article key={title} className="rounded-2xl border border-white/15 bg-white/[.04] p-5"><span className="font-mono text-xs text-[#65d9cb]">◆</span><h3 className="mt-3 font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p></article>)}</div><Link to="/contact" className="btn btn-brand mt-7 !pr-1.5">Discuss Deployment <span className="btn-chip"><ArrowRight size={15}/></span></Link></div></section>
  return null
}

function AiOfficeSections({profile,part}) {
  const card = 'rounded-2xl border border-[#dce9ef] bg-white p-5 shadow-card'
  if (part === 'use-cases') return <section id="people" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.useCasesEyebrow}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.useCasesTitle}</h2><p className="mt-3 max-w-3xl text-[#5d696c]">{profile.useCaseLead}</p><div className="mt-8 grid gap-4 md:grid-cols-3">{profile.useCases.map(([title,description],i)=><article key={title} className="overflow-hidden rounded-2xl border border-[#dce9ef] bg-white shadow-card"><img src={photo(galleryOf(profile)[i],900)} alt={['Enterprise knowledge search','Document assistance','Office productivity'][i]} loading="lazy" className="h-56 w-full object-cover"/><div className="p-5"><h3 className="font-display text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></div></article>)}</div></div></section>
  if (part === 'benefits') return <section id="business-benefits" className="bg-[#f3f2ee] px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.benefitsEyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-.035em]">{profile.benefitsTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{profile.benefits.map(([title,description])=><article key={title} className={card}><span className="font-mono text-xs text-[#0E8378]">◆</span><h3 className="mt-4 font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div></div></section>
  if (part === 'departments') return <section id="departments" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto max-w-[1360px] lg:px-7"><p className="eyebrow w-fit">{profile.departmentsEyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-.035em]">{profile.departmentsTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.departments.map(([title,description])=><article key={title} className={card}><h3 className="font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5d696c]">{description}</p></article>)}</div></div></section>
  if (part === 'security') return <section id="security-trust" className="bg-white px-5 py-10 sm:py-12 md:py-14"><div className="mx-auto grid max-w-[1360px] items-center gap-8 lg:grid-cols-[1fr_.9fr] lg:px-7"><div><p className="eyebrow w-fit">{profile.securityEyebrow}</p><h2 className="mt-3 font-display text-4xl font-medium tracking-[-.035em]">{profile.securityTitle}</h2><p className="mt-5 leading-relaxed text-[#5d696c]">{profile.securityIntro}</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{profile.securityLabels.map((label)=><div key={label} className={card}><Check size={18} className="mb-3 text-[#07898a]"/><p className="text-sm font-medium">{label}</p></div>)}</div></div><img src={photo(profile.images[5],1200)} alt={profile.faqImageAlt} loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover"/></div></section>
  if (part === 'deployment') return <section id="deployment" className="grain relative mx-3 my-6 overflow-hidden rounded-[2.5rem] bg-[#070d0f] px-5 py-14 sm:py-16 text-white sm:mx-5 md:py-20"><div className="dot-grid pointer-events-none absolute inset-0 opacity-25"/><div className="relative mx-auto max-w-[1360px]"><p className="eyebrow-dark w-fit">{profile.deploymentEyebrow}</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-.035em] md:text-5xl">{profile.deploymentTitle}</h2><p className="mt-4 max-w-4xl leading-relaxed text-white/70">{profile.deploymentIntro}</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.deploymentOptions.map(([title,description])=><article key={title} className="rounded-2xl border border-white/15 bg-white/[.04] p-5"><span className="font-mono text-xs text-[#65d9cb]">◆</span><h3 className="mt-3 font-display font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p></article>)}</div><Link to="/contact" className="btn btn-brand mt-7 !pr-1.5">Discuss Private AI Deployment <span className="btn-chip"><ArrowRight size={15}/></span></Link></div></section>
  return null
}
function IpdrContactSection({heading}) {
  return <section id="get-in-touch" className="flex items-center bg-[#f3f2ee]"><div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:py-12 sm:px-8 md:py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-12"><div><p className="eyebrow w-fit">Get in touch</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl md:text-5xl">{heading}</h2><div className="mt-7 rounded-2xl bg-[#071d2a] p-6 text-white"><p className="font-display text-2xl font-semibold tracking-[.08em]">GYANSHU TECHNOLOGIES</p><p className="mt-1 text-xs text-white/70">Pvt. Ltd.</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#65d9cb]">Secure. Intelligent. Connected</p></div></div><div className="rounded-2xl border border-[#dce9ef] bg-white p-6 shadow-card md:p-8"><h3 className="font-display text-2xl font-medium">Kirti Raj Choudhury</h3><p className="mt-1 text-sm text-[#5d696c]">Head – Business Operations</p><div className="mt-6 space-y-3 text-sm"><a className="block text-[#0B4D49] hover:underline" href="tel:+919090009301">+91 90900 09301</a><a className="block text-[#0B4D49] hover:underline" href="mailto:operations@gyanshu.tech">operations@gyanshu.tech</a><a className="block text-[#0B4D49] hover:underline" href="https://www.gyanshu.tech" target="_blank" rel="noreferrer">www.gyanshu.tech</a></div></div></div></section>
}

function ProductCard({item}) {
  const id=idFor(item.to), profile=profiles[id], page=getPage(item.to)
  return <Link to={item.to} className="product-card group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e1dfd8] bg-white p-2 shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-lift">
    <div className="relative h-56 overflow-hidden rounded-[18px] bg-[#0c1517]"><img src={photo((profile.productShots || profile.images)[0],900)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-[1.2s] ease-expo group-hover:scale-[1.06]"/><div className="absolute inset-0 bg-gradient-to-t from-[#070d0f]/60 via-transparent to-transparent"/><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#0c1517] backdrop-blur">{profile.category}</span><span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0c1517] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#14B8A6]"><ArrowUpRight size={16}/></span></div>
    <div className="flex flex-1 flex-col p-5 md:p-6"><p className="font-mono text-[10.5px] uppercase tracking-[.16em]" style={{color:profile.accent}}>◆ {profile.descriptor}</p><h3 className="mt-3 font-display text-2xl font-medium tracking-[-.025em] text-[#0c1517]">{page.title.trim()}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5d696c]">{profile.summary}</p><span className="link-arrow mt-auto pt-6">Explore product <ArrowRight size={15}/></span></div>
  </Link>
}

export function ProductCatalog({page}) {
  const [category,setCategory]=useState('All platforms')
  const [query,setQuery]=useState('')
  const filtered=useMemo(()=>productLinks.filter((p)=>{
    const id=idFor(p.to), profile=profiles[id], title=getPage(p.to).title.toLowerCase()
    return (category==='All platforms'||profile.category===category) && (!query||title.includes(query.toLowerCase())||profile.summary.toLowerCase().includes(query.toLowerCase()))
  }),[category,query])
  return <main className="product-experience min-h-screen bg-white text-[#0c1517]">
    <HeroCentered eyebrow="Gyanshu / Products" title="Platforms built around the signal." muted={2} pill={productLinks.map((item)=>catalogImage(idFor(item.to)))} subtitle="Purpose-built tools for network operations, cybersecurity, infrastructure monitoring, and private enterprise AI." intro={page.intro} actions={<><a href="#catalog" className="btn btn-dark"><span>Browse platforms</span><span className="btn-chip"><ArrowRight size={15}/></span></a><Link to="/contact" className="btn btn-outline">Talk to our team</Link></>} images={productLinks.map((item)=>catalogImage(idFor(item.to)))} captions={productLinks.map((item)=>item.label.trim())} mediaLabel="Gyanshu product platforms" chips={categories.slice(1)}/>
    <section className="mx-auto mt-8 max-w-[1360px] px-5 sm:px-8 lg:px-12"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{categories.slice(1).map((c)=><button key={c} onClick={()=>{setCategory(c);document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})}} className="group flex items-center justify-between gap-4 rounded-[20px] border border-[#e1dfd8] bg-white px-6 py-5 text-left shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-lift"><span className="flex items-center gap-4"><span className="font-mono text-[11px] text-[#8a9497]">◆</span><span className="font-display text-lg font-medium tracking-[-.02em]">{c}</span></span><ChevronRight size={16} className="text-[#0E8378] transition-transform group-hover:translate-x-1"/></button>)}</div></section>
    <section id="catalog" className="mx-auto max-w-7xl px-5 py-12 md:px-12 md:py-14 lg:py-16"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow">Product portfolio</span><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl md:text-5xl">Find the right platform.</h2></div><label className="flex w-full items-center gap-3 rounded-full border border-[#e1dfd8] bg-white px-5 py-3.5 shadow-card transition focus-within:border-[#0c1517] md:max-w-sm"><Search size={17} className="text-[#5d696c]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-[#8a9497]"/></label></div>
      <div className="mt-8 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full border px-4 py-2 text-[13px] transition ${category===c?'border-[#0c1517] bg-[#0c1517] text-white':'border-[#e1dfd8] bg-white text-[#5d696c] hover:border-[#0c1517] hover:text-[#0c1517]'}`}>{c}</button>)}</div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((item,i)=><ProductCard key={item.to} item={item} index={i}/>)}</div>
      {filtered.length===0&&<p className="py-14 sm:py-16 text-center text-[#5d696c]">No products match that search. Try another name or category.</p>}
    </section>
    <CtaPhotos eyebrow="Need help choosing?" title="Let’s map your operational needs." muted={2} text="Talk with Gyanshu about your environment, integrations, and deployment requirements." cta="Talk to our team" images={productLinks.flatMap((item)=>ctaImagesOf(profiles[idFor(item.to)]).slice(0,1))}/>
  </main>
}

export function ProductDetail({page}) {
  const id=idFor(page.path), profile=profiles[id]
  useEffect(()=>{
    if (!profile.seoTitle) return undefined
    const description=document.querySelector('meta[name="description"]')
    const keywords=document.querySelector('meta[name="keywords"]')
    const previousKeywords=keywords?.content
    const createdKeywords=!keywords
    const keywordMeta=keywords || document.head.appendChild(Object.assign(document.createElement('meta'),{name:'keywords'}))
    document.title=profile.seoTitle
    if (description) description.content=profile.seoDescription
    keywordMeta.content=profile.seoKeywords
    // Title and description are reset by the route-level SEO in App, which runs before this on the next page.
    return ()=>{
      if (createdKeywords) keywordMeta.remove()
      else if (previousKeywords!==undefined) keywordMeta.content=previousKeywords
    }
  },[profile])
  // Hide sub-nav links whose section this product does not render, so no link scrolls nowhere.
  const sectionNav=useRef(null)
  useLayoutEffect(()=>{
    sectionNav.current?.querySelectorAll('a[href^="#"]').forEach((a)=>{ a.hidden=!document.getElementById(a.getAttribute('href').slice(1)) })
  },[id])
  return <main className="product-experience product-detail min-h-screen overflow-x-clip bg-white text-[#0c1517]">
     <HeroCentered eyebrow={id==='ipdr'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.heroEyebrow:id==='argos-enms'?'NETWORK OPERATIONS / ENTERPRISE VISIBILITY':id==='panoptix'||id==='vapt'?profile.heroEyebrow:`Gyanshu platform / ${profile.category}`} title={id==='argos-enms'?'NetSight360':id==='smms'?profile.heroTitle:page.title} pill={profile.images} subtitle={id==='panoptix'?'Know Your Exposure. Control Your Cyber Risk.':id==='vapt'?'Discover Weaknesses. Validate Security. Strengthen with Confidence.':id==='smms'||id==='gyanshu-ai-office-assistance'?profile.heroHeadline:page.subtitle} intro={profile.summary} chips={profile.heroFeatures?page.features:page.features.slice(0,3)} actions={<><Link to="/contact" className="btn btn-dark"><span>{id==='ipdr'||id==='argos-enms'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?'Request Demo':'Discuss this platform'}</span><span className="btn-chip"><ArrowRight size={15}/></span></Link><a href="#capabilities" className="btn btn-outline">Explore Capabilities</a></>} media={<ProductImageSequence id={id} images={profile.heroImages || profile.images} captions={profile.heroCaptions} accent={profile.accent} label={profile.descriptor}/>}/>
     <nav aria-label="On this page" className="sticky top-3 z-30 mt-8 flex justify-center px-3"><div ref={sectionNav} className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#e1dfd8] bg-white/85 p-1.5 font-mono text-[10.5px] uppercase tracking-[.14em] text-[#5d696c] shadow-card backdrop-blur-xl">{subNav[id] ? subNav[id].map(([href,label])=><a key={href} href={href} className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">{label}</a>) : <><a href="#overview" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Overview</a>{id==='ipdr'&&<a href="#highlights" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Key highlights</a>}{id!=='ipdr'&&id!=='argos-enms'&&id!=='panoptix'&&<a href="#people" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">People and systems</a>}<a href="#capabilities" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Capabilities</a><a href="#workflow" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Workflow</a>{id==='panoptix'&&<><a href="#exposure-domains" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Domains</a><a href="#risk-intelligence" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Risk</a><a href="#industries" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Industries</a><a href="#security-governance" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Security</a></>}{id!=='ipdr'&&<a href="#deployment" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Deployment</a>}{id==='smms'&&<><a href="#business-benefits" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Benefits</a><a href="#integrations-data" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Data & integrations</a></>}{id==='vapt'&&<><a href="#use-cases" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Use cases</a><a href="#risk-intelligence" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Findings</a><a href="#industries" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Industries</a><a href="#security-trust" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Security</a></>}{id==='gyanshu-ai-office-assistance'&&<><a href="#business-benefits" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Benefits</a><a href="#departments" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Departments</a><a href="#security-trust" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Security</a></>}{(id==='smms'||id==='gyanshu-ai-office-assistance')&&<a href="#faq" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">FAQ</a>}{profile.differentiators&&id!=='ipdr'&&id!=='argos-enms'&&<a href="#different" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#f3f2ee] hover:text-[#0c1517]">Why {id==='argos-enms'?'ARGOS':id==='vapt'?'VAPT SCANNER':id==='smms'?'SMMS':id==='gyanshu-ai-office-assistance'?'AI OFFICE ASSISTANT':'PANOPTIX'}</a>}</>}</div></nav>
    <section id="overview" className={`mx-auto flex w-full items-center `}><div className={`mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-12 py-10 sm:py-12 md:py-14 lg:grid-cols-[.75fr_1.25fr]`}><div><p className="eyebrow w-fit">{id==='panoptix'?'PRODUCT OVERVIEW':id==='vapt'?'ABOUT VAPT SCANNER':id==='smms'||id==='gyanshu-ai-office-assistance'?profile.overviewEyebrow:id==='ipdr'?profile.overviewEyebrow:id==='argos-enms'?'ABOUT NetSight360 ENTERPRISE':'About the platform'}</p><h2 className="mt-4 font-display font-medium tracking-[-.035em] text-4xl leading-tight md:text-5xl">{id==='ipdr'?profile.overviewTitle:id==='argos-enms'?'Centralised Network Operations for a Smarter, More Resilient Enterprise':id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.overviewTitle:'Designed for clearer operational decisions.'}</h2></div><div><div className="text-lg leading-relaxed text-[#5d696c]">{(id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance')?profile.overview.map((paragraph)=><p key={paragraph} className="mb-4 last:mb-0">{paragraph}</p>):<p>{page.intro}</p>}</div>{id==='argos-enms'&&<><p className="mt-5 leading-relaxed text-[#5d696c]">From core to edge, NetSight360 brings your entire network under a single pane of glass, enabling proactive operations and faster problem resolution.</p></>}<div className="mt-6 grid gap-3 sm:grid-cols-2">{profile.use.map((x)=><div key={x} className="flex items-center gap-3 border-b border-[#e1dfd8] py-3"><span className="font-mono text-xs" style={{color:profile.accent}}>◆</span><span className="text-sm font-medium">{x}</span></div>)}</div></div></div></section>
    {(id==='panoptix'||id==='vapt')&&<><StepsBanner id="workflow" eyebrow={profile.flowEyebrow} title={profile.flowTitle} steps={profile.flow} image={flowImageOf(profile)} note={profile.flowNote}/><ExtendedProductSections profile={profile} part="domains"/></>}{id==='ipdr'&&<ExtendedProductSections profile={profile} part="domains"/>}
    {profile.why&&id!=='vapt'&&<section id={id==='ipdr'?'highlights':undefined} className={`flex items-center bg-[#f3f2ee] `}><div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 py-10 sm:py-12 md:py-14`}><p className="eyebrow w-fit">{id==='ipdr'?'Key highlights':id==='argos-enms'?'KEY HIGHLIGHTS':id==='vapt'?'Adopt Nested VA?':'Why PANOPTIX?'}</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl md:text-5xl">{profile.whySubtitle || 'IP intelligence for demanding environments.'}</h2><div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">{profile.why.map(([title,description])=><article key={title} tabIndex={0} aria-label={`${title}. Focus or hover to see details.`} className="capability-flip-card group relative h-[216px] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8378] focus-visible:ring-offset-2"><div className="capability-flip-inner relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]"><div className="capability-flip-face capability-flip-front absolute inset-0 flex flex-col justify-end overflow-hidden rounded-2xl border border-[#e1dfd8] bg-white p-5 shadow-card [backface-visibility:hidden]"><div><FlipIcon title={title}/><h3 className="mt-4 font-display font-medium tracking-[-.02em] text-xl leading-snug text-[#0c1517]">{title}</h3></div><span className="font-mono text-[10px] uppercase tracking-widest text-[#8a9497]">Hover or focus to explore</span></div><div className="capability-flip-face capability-flip-back absolute inset-0 overflow-y-auto rounded-2xl border border-[#e1dfd8] bg-white p-5 shadow-card [transform:rotateY(180deg)] [backface-visibility:hidden]"><h3 className="font-display font-medium tracking-[-.015em] text-lg leading-snug text-[#0c1517]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#5d696c]">{description}</p></div></div></article>)}</div></div></section>}
    {id!=='ipdr'&&id!=='argos-enms'&&id!=='panoptix'&&id!=='vapt'&&id!=='smms'&&id!=='gyanshu-ai-office-assistance'&&(    <section id="people" className={`flex items-center bg-white `}><div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 py-10 sm:py-12 md:py-14`}><div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow w-fit">People and systems</p><h2 className="mt-3 font-display font-medium tracking-[-.03em] text-3xl md:text-4xl">{profile.category} in the real world.</h2></div><p className="max-w-lg text-sm leading-relaxed text-[#5d696c]">A closer look at the environments and teams connected to {profile.descriptor.toLowerCase()}.</p></div><div className="grid items-start gap-4 sm:grid-cols-3">{galleryOf(profile).slice(0,3).map((image,i)=><figure key={image} className={`group relative overflow-hidden rounded-[20px] bg-[#ebe9e3] ${i===1?"aspect-[4/5] sm:mt-12":i===2?"aspect-[4/3.6]":"aspect-[4/4.4]"}`}><img src={photo(image,800)} alt={visualLabels[id]?.[i] || profile.category} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#070d0f]/75 via-transparent to-transparent"/><figcaption className="absolute bottom-0 p-5 font-display font-medium tracking-[-.015em] text-lg text-white">{visualLabels[id]?.[i] || profile.category}</figcaption></figure>)}</div></div></section>)}
    {profile.leafletPage&&<IpdrLeafletSections profile={profile} part="use-cases"/>}{id==='ipdr'&&<ExtendedProductSections profile={profile} part="use-cases"/>}{id==='smms'&&<SmmsSections profile={profile} part="use-cases"/>}{id==='gyanshu-ai-office-assistance'&&<AiOfficeSections profile={profile} part="use-cases"/>}{(id==='panoptix'||id==='vapt')&&<ExtendedProductSections profile={profile} part="use-cases"/>}
     <section id="capabilities" className={`flex items-center bg-[#f3f2ee] `}><div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 py-10 sm:py-12 md:py-14`}><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow w-fit">Core capabilities</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl md:text-5xl">{id==='ipdr'?profile.capabilityTitle:id==='argos-enms'?'A Complete Network Operations Platform':id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.capabilityTitle:`${page.title} capabilities`}</h2></div>{(id!=='smms'&&id!=='gyanshu-ai-office-assistance'||profile.capabilityLead)&&<p className="max-w-md text-[#5d696c]">{id==='ipdr'?profile.capabilityLead:id==='argos-enms'?'Unified visibility across your entire network.':id==='panoptix'?profile.capabilityLead:id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.capabilityLead:'A set of connected capabilities designed to work as one practical platform.'}</p>}</div><div className={`grid sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-3`}>{profile.capabilityGroups?profile.capabilityGroups.map((group,i)=><motion.article key={group.title} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05,duration:.4}} className={`capability-flip-card group relative h-[216px] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8378] focus-visible:ring-offset-2`} tabIndex={0} aria-label={`${group.title}. Focus or hover to see capabilities.`}><div className="capability-flip-inner relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]"><div className="capability-flip-face capability-flip-front absolute inset-0 flex flex-col justify-end overflow-hidden rounded-2xl border border-[#e1dfd8] bg-white p-5 shadow-card [backface-visibility:hidden]"><div><FlipIcon title={group.title}/><h3 className="mt-4 font-display font-medium tracking-[-.02em] text-xl leading-snug text-[#0c1517]">{group.title}</h3></div><span className="font-mono text-[10px] uppercase tracking-widest text-[#8a9497]">Hover or focus to explore</span></div><div className="capability-flip-face capability-flip-back absolute inset-0 overflow-y-auto rounded-2xl border border-[#e1dfd8] bg-white p-5 shadow-card [transform:rotateY(180deg)] [backface-visibility:hidden]"><h3 className="font-display font-medium tracking-[-.015em] text-lg leading-snug text-[#0c1517]">{group.title}</h3><ul className="mt-3 space-y-2">{group.items.map(item=><li key={item} className="flex gap-2 text-xs leading-snug text-[#5d696c] md:text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:profile.accent}}/>{item}</li>)}</ul></div></div></motion.article>):page.features.map((f,i)=><motion.article key={f} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05,duration:.4}} className="group min-h-52 rounded-2xl border border-[#e1dfd8] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><span className="font-mono text-xs" style={{color:profile.accent}}>◆</span></div><h3 className="mt-10 font-display font-medium tracking-[-.02em] text-xl">{f}</h3><div className="mt-4 h-px w-10 transition-all group-hover:w-full" style={{background:profile.accent}}/></motion.article>)}</div></div></section>
    {id==='ipdr'&&<><ExtendedProductSections profile={profile} part="integrations"/><StepsBanner id="workflow" eyebrow={profile.flowEyebrow} title={profile.flowTitle} accent="" steps={profile.flow} image={flowImageOf(profile)} note={profile.flowNote}/></>}{(id==='panoptix'||id==='vapt')&&<ExtendedProductSections profile={profile} part="risk"/>}{profile.differentiators&&id!=='argos-enms'&&<section id="different" className={`flex items-center bg-white `}><div className={`mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-12 py-10 sm:py-12 md:py-14 lg:grid-cols-[.75fr_1.25fr]`}><div><p className="eyebrow w-fit">{id==='panoptix'?'08 / DIFFERENTIATION':id==='vapt'?'Why Nested VA':id==='smms'||id==='gyanshu-ai-office-assistance'?profile.differentiatorEyebrow:`How ${id==='ipdr'?'FLOWBITS NEXORA':id==='argos-enms'?'NetSight360':id==='vapt'?' Nested VA':'PANOPTIX'} is different`}</p><h2 className="mt-3 font-display font-medium tracking-[-.035em] text-4xl leading-tight md:text-5xl">{id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.differentiatorTitle:id==='argos-enms'?'Traditional ENMS tools vs NetSight360':id==='vapt'?'Traditional VAPT tools vs Nested VA':'Traditional tools vs. PANOPTIX'}</h2>{(id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance')?(profile.differentiatorSummary&&<p className="mt-5 leading-relaxed text-[#5d696c]">{profile.differentiatorSummary}</p>):<p className="mt-5 leading-relaxed text-[#5d696c]">FLOWBITS NEXORA is built as a data intelligence platform, not just a compliance or logging system.</p>}{profile.comparisonNote&&<p className="mt-4 text-xs leading-relaxed text-[#5d696c]">{profile.comparisonNote}</p>}</div><div className="overflow-hidden rounded-[24px] border border-[#e1dfd8] bg-white shadow-card"><div className="grid grid-cols-2 bg-[#070d0f] px-5 py-4 font-mono text-[10px] uppercase tracking-wider text-white sm:px-6"><span>{id==='ipdr'?'Fragmented approach':id==='argos-enms'?'Traditional ENMS tools':id==='vapt'?'Fragmented testing workflow':id==='panoptix'?'Fragmented / point-in-time approach':id==='smms'?'Fragmented approach':id==='gyanshu-ai-office-assistance'?'Disconnected office workflows':'Traditional tools'}</span><span>{id==='ipdr'?'FLOWBITS NEXORA':id==='argos-enms'?'NetSight360':id==='vapt'?'Nested VA platform':id==='smms'?'SMMS approach':id==='gyanshu-ai-office-assistance'?'AI Office Assistant':'PANOPTIX exposure management approach'}</span></div>{profile.differentiators.map(([oldValue,newValue],i)=><div key={oldValue} className={`grid grid-cols-2 gap-4 px-5 py-4 text-sm sm:px-6 ${i%2===0?'bg-[#f3f2ee]':'bg-white'}`}><span className="text-[#5d696c]">{oldValue}</span><span className="flex items-start gap-2 font-medium text-[#0c1517]"><Check size={16} className="mt-0.5 shrink-0 text-[#0E8378]"/>{newValue}</span></div>)}</div></div></section>}
    {id==='smms'&&<SmmsSections profile={profile} part="benefits"/>}{id==='gyanshu-ai-office-assistance'&&<><AiOfficeSections profile={profile} part="benefits"/><AiOfficeSections profile={profile} part="departments"/></>}{id==='ipdr'&&<><ExtendedProductSections profile={profile} part="business"/><ExtendedProductSections profile={profile} part="industries"/><ExtendedProductSections profile={profile} part="security"/><ExtendedProductSections profile={profile} part="deployment"/></>}{id==='panoptix'&&<><ExtendedProductSections profile={profile} part="business"/><ExtendedProductSections profile={profile} part="industries"/><ExtendedProductSections profile={profile} part="security"/><ExtendedProductSections profile={profile} part="deployment"/></>}{id==='vapt'&&<><ExtendedProductSections profile={profile} part="business"/><ExtendedProductSections profile={profile} part="industries"/><ExtendedProductSections profile={profile} part="deployment"/><ExtendedProductSections profile={profile} part="security"/></>}
    {id!=='ipdr'&&id!=='panoptix'&&id!=='vapt'&&<StepsBanner id="workflow" eyebrow={id==='ipdr'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.flowEyebrow:'How it works'} title={id==='ipdr'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.flowTitle:id==='argos-enms'?'From Discovery to Resolution':'A workflow teams'} accent={id==='smms'||id==='gyanshu-ai-office-assistance'?'':id==='ipdr'?'':id==='argos-enms'?'— In Simple Steps':'can follow.'} steps={profile.flow.map((step)=>Array.isArray(step)?step:[step])} image={id==='smms'||id==='gyanshu-ai-office-assistance'?profile.images[4]:flowImageOf(profile)} note={id==='smms'||id==='gyanshu-ai-office-assistance'?profile.flowNote:id==='ipdr'?profile.flowNote:id==='argos-enms'?'':'The platform connects a sequence of practical steps, giving teams context for what happens next and why it matters.'}/>}
    {id==='smms'&&<SmmsSections profile={profile} part="integrations"/>}{id==='gyanshu-ai-office-assistance'&&<><AiOfficeSections profile={profile} part="security"/><AiOfficeSections profile={profile} part="deployment"/></>}{id==='smms'&&<SmmsSections profile={profile} part="deployment"/>}{profile.leafletPage&&<IpdrLeafletSections profile={profile} part="business"/>}{profile.leafletPage&&<IpdrLeafletSections profile={profile} part="security"/>}
    {id!=='ipdr'&&id!=='argos-enms'&&id!=='panoptix'&&id!=='vapt'&&id!=='smms'&&id!=='gyanshu-ai-office-assistance'&&(    <section id="deployment" className="grain relative mx-3 my-6 flex items-center overflow-hidden rounded-[2.5rem] bg-[#070d0f] text-white sm:mx-5"><div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]"/><div className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#0E8378]/25 blur-[120px]"/><div className="relative mx-auto grid w-full max-w-[1360px] gap-8 px-5 py-10 sm:py-12 sm:px-8 md:py-14 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-12"><div><p className="eyebrow-dark w-fit">{id==='vapt'?'Deployment & usage':id==='ipdr'?'On-premises control & security':id==='argos-enms'?'Industry & deployment':'Deployment and integration'}</p><h2 className="mt-4 font-display font-medium tracking-[-.035em] text-4xl leading-tight text-white md:text-5xl">{id==='vapt'?'Periodic assessments that fit your environment.':id==='ipdr'?'Your Data. Your Infrastructure. Your Rules.':id==='argos-enms'?'Designed for Diverse Environments':'Fit the platform to your environment.'}</h2><p className="mt-5 max-w-xl leading-relaxed text-white/70">{id==='vapt'?'Deploy Nested VA on-premises or in a controlled environment. Agentless scanning lets teams run periodic assessments alongside their monitoring and intelligence platforms.':id==='ipdr'?'Deploy within your data centre or private cloud. Keep sensitive subscriber and network data in your environment, with role-based access and audit logging.':id==='argos-enms'?'Designed for enterprises, ISPs and telecom providers, data centres, and critical infrastructure.':'Deployment approach, data sources, integrations, and operational responsibilities are planned with your team to match security and service requirements.'}</p><Link to="/contact" className="btn btn-brand mt-7 !pr-1.5">Discuss deployment <span className="btn-chip"><ArrowRight size={15}/></span></Link></div><div className="grid gap-3 sm:grid-cols-2">{(profile.deployment || ['Environment and access planning','Data-source and integration mapping','Rollout and knowledge transfer','Ongoing operational support']).map((item)=><div key={item} className="flex gap-3 rounded-2xl border border-white/15 bg-white/[.04] p-5"><Check size={17} style={{color:profile.accent}} className="shrink-0"/><p className="text-sm leading-relaxed text-white/80">{item}</p></div>)}</div></div></section>)}
    {profile.ecosystem&&id!=='panoptix'&&id!=='vapt'&&<section id="ecosystem" className="flex items-center bg-[#f3f2ee]"><div className="mx-auto w-full max-w-7xl px-5 py-10 sm:py-12 sm:px-8 md:py-14 lg:px-12"><p className="eyebrow w-fit">{id==='vapt'?' Security Product Portfolio':'PANOPTIX in the product ecosystem'}</p><h2 className="mt-3 font-display font-medium tracking-[-.03em] text-3xl md:text-4xl">{id==='vapt'?'Layered security visibility and assurance.':'Unified network and exposure intelligence.'}</h2><p className="mt-3 max-w-2xl text-[#5d696c]">{id==='vapt'?'The portfolio brings together:':'PANOPTIX integrates seamlessly with:'}</p><div className="mt-7 grid gap-4 md:grid-cols-2">{profile.ecosystem.map(([name,description,to])=><Link key={name} to={to} className="rounded-2xl border border-[#e1dfd8] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><span className="font-mono text-[10.5px] uppercase tracking-[.16em] text-[#0C6B63]">{id==='vapt'?'Portfolio platform':'Connected platform'}</span><h3 className="mt-3 font-display font-medium tracking-[-.025em] text-2xl">{name}</h3><p className="mt-2 text-sm text-[#5d696c]">{description}</p></Link>)}</div><p className="mt-6 font-medium text-[#0c1517]">{id==='vapt'?'Together, they provide layered visibility, exposure awareness, and security assurance.':'Together, they form a unified network and exposure intelligence platform.'}</p><blockquote className="mt-8 border-l-2 border-[#0C6B63] pl-5 font-display font-medium tracking-[-.025em] text-2xl text-[#0B4D49]">{id==='vapt'?'Measure your security posture. Validate compliance. Improve with every scan.':'If you can see your attack surface, you can control your risk.'}</blockquote></div></section>}<FaqDark eyebrow={id==='ipdr'||id==='panoptix'||id==='vapt'?'Frequently Asked Questions':id==='smms'?'Questions, answered':'FAQ'} title={id==='ipdr'||id==='panoptix'||id==='vapt'?'Questions, Answered.':id==='smms'?'FAQ: Questions, Answered.':'Questions, answered.'} lede={id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'?undefined:'What teams ask before deploying a Gyanshu platform.'} id={id==='smms'||id==='gyanshu-ai-office-assistance'?'faq':undefined} image={id==='smms'||id==='gyanshu-ai-office-assistance'?profile.faqImage:undefined} imageAlt={profile.faqImageAlt} items={id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.faqs:faqPicks.products.map((i)=>faqs[i])}/>
    {id==='gyanshu-ai-office-assistance'?<CtaPhotos eyebrow="Next step" title="Bring Private AI Into Your Organisation." muted={3} text="Begin with a scoped pilot covering users, approved document collections, security requirements, use cases and success criteria." cta="Discuss Private AI Deployment" images={ctaImagesOf(profile)}/>:id==='smms'?<CtaPhotos eyebrow="Next step" title="See SMMS in Your Operating Environment." muted={3} text="Request a technical demonstration covering supported monitoring methods, scale, notification rules, service reporting and deployment prerequisites." cta="Request Demo" images={ctaImagesOf(profile)}/>:id==='panoptix'||id==='vapt'?<CtaPhotos eyebrow="Next step" title={id==='vapt'?'Strengthen Your Security Assessment Process.':'Discuss PANOPTIX deployment.'} muted={3} text={id==='vapt'?'Share your intended target classes, scope, assessment permissions and reporting requirements.':'Talk with our team about asset scope, network access, assessment methods, integrations and security governance.'} cta={id==='vapt'?'Request a Demo':'Discuss Deployment'} images={ctaImagesOf(profile)}/>:profile.leafletPage?<IpdrContactSection heading={id==='argos-enms'?'Let’s Build a More Connected Enterprise':undefined}/>:<CtaPhotos eyebrow="Next step" title="See how this can fit your environment." muted={3} text="Plan integrations, access, rollout, and knowledge transfer with the people who will operate the platform." cta="Talk to Gyanshu" images={ctaImagesOf(profile)}/>}
  </main>
}


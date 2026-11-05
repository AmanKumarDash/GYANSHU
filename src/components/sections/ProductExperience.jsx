import { createElement, useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, ChartNoAxesColumnIncreasing, Check, Globe, Mail, MapPin, Phone, Server, ShieldCheck, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getPage, productIdFor, productLinks } from '../../data/sitePages'
import { COMPANY_ADDRESS } from '../../data/siteConfig'
import { CardFx, CtaPhotos, DarkBand, FaqDark, HeroCentered, Media, PosterHeadline, StepsBanner } from '../interior/Blocks'
import { faqs } from '../../data/content'
import { faqPicks, iconFor } from '../../data/pageMedia'
import { art } from '../../data/artManifest'
import { spot } from '../interior/cardFx'
import { MaskLines, Reveal } from '../ui/Motion'
import flowbitsProfile from '../../data/flowbitsProfile'

// Generated artwork for a product topic: the hero/section sets (flow, hub and card paintings).
const artSet = (k) => [art(k, 'flow'), art(k, 'hub'), art(k, 'card'), art(k, 'flow')]
const artGallery = (k) => [art(k, 'card'), art(k, 'hub'), art(k, 'flow')]
const categories = ['All platforms','Network intelligence','Cybersecurity','AI & productivity']
const profiles = {
  ipdr: {category:'Network intelligence',descriptor:'Network Intelligence Platform',heroEyebrow:'Netwno i want the exact conent of the leaflet to be add for the proeduct according to each setion as mention in the leafletork intelligence / forensic analytics',summary:'Turn your network data into actionable intelligence, Flowbits Nexora unifies IPDR, subscriber intelligence, flow analytics, threat intelligence, behaviour analytics, forensics, alerts and reporting — empowering enterprises, ISPs and SOC teams to see more, know faster and stay ahead.',images:flowbitsProfile.images,flow:[['Ingest','Collect IPDR and flow data from your network.'],['Correlate','Link subscribers, sessions, devices and events.'],['Detect','Identify threats, fraud and anomalies.'],['Investigate','Deep-dive with forensic search and timelines.'],['Report','Generate insights, alerts and compliance reports.']],use:[],accent:'#0E8378',capabilityGroups:[
    {title:'IPDR Intelligence',items:['Ingest, process and analyse IPDR data at massive scale.']},
    {title:'Subscriber Correlation',items:['Correlate subscribers across IPDR, flows, devices and sessions.']},
    {title:'Flow Analytics',items:['Deep insights into network traffic, application usage and protocols.']},
    {title:'Threat Intelligence Enrichment',items:['Enrich with indicators, reputation data and threat feeds.']},
    {title:'Behavior Analytics',items:['Identify abnormal behaviour and insider threats.']},
    {title:'Alerts & Reporting',items:['Real-time alerts, custom rules and detailed reports.']},
    {title:'Forensic Search',items:['Fast, flexible search across IPDR, flows, subscribers and events.']},
    {title:'Extensible & Integrations',items:['Integrate with existing SOC, SIEM and OSS/BSS systems.']},
  ],why:[['Unified Network Intelligence','IPDR, flows, subscribers, threats and forensics — in one platform.'],['On-Premises Deployment','Complete data control, deployable in your environment.'],['Real-Time Threat Detection','Detect anomalies, fraud and security threats early.'],['Scalable & Customisable','Adapt to your network size, use cases and operational needs.']],whySubtitle:'Built for Networks, Security and Smarter Operations',useCases:[['Subscriber & Session Intelligence','Get a complete view of subscriber activity, sessions, devices and usage patterns.'],['Threat & Fraud Intelligence','Detect malicious activity, policy violations, fraud and network abuse in real time.'],['Forensic Investigation','Perform deep-dive investigations with powerful search, correlation and timelines.'],['Flow Analytics','Analyse network flows, application usage, traffic patterns and capacity insights.']],benefits:[['Faster Investigation','Find answers quickly and reduce mean time to resolution.'],['Better Traceability','Link network activity to subscribers, sessions and devices.'],['Operational Confidence','Proactive detection and improved network governance.'],['Stronger Threat Visibility','Detect and respond to threats and fraud earlier.'],['Evidence-Driven Reporting','Generate audit-ready reports for compliance and legal requirements.']],industries:[['Enterprises','Network visibility, security monitoring, policy compliance and internal investigations.'],['ISPs & Telecom Operators','Subscriber intelligence, fraud detection, regulatory compliance and network optimization.'],['SOC & Security Teams','Threat hunting, incident response, forensic analysis and security operations.']],controls:[['On-Premises Deployment','Deploy within your datacenter or private cloud.'],['Data Privacy by Design','Keep sensitive subscriber and network data within your environment.'],['Role-Based Access Control','Granular access for teams and departments.'],['Audit Logging','Track all activities for security and compliance.']],deployment:['Deploy within your datacenter or private cloud.','Keep sensitive subscriber and network data within your environment.','Granular access for teams and departments.','Track all activities for security and compliance.'],integrations:['SIEM','SOC','OSS/BSS','Firewall','NMS','Threat Feeds','Ticketing','Custom APIs']},  'argos-enms': {category:'Network intelligence',descriptor:'Enterprise Network Operations & Intelligence Platform',heroEyebrow:'Network operations / enterprise visibility',summary:'Gain unified visibility across your entire network. Monitor performance, detect issues early, understand dependencies and resolve problems faster — ensuring a resilient, high-performing and always-on enterprise.',images:artSet('netsight'),gallery:artGallery('netsight'),flowImage:art('netsight','flow'),flow:[['Discover','Auto-discover your network devices and infrastructure.'],['Monitor','Track real-time performance, health and events.'],['Correlate','Correlate alerts, dependencies and impact analysis.'],['Investigate','Drill down into root cause with rich context and insights.'],['Resolve','Take action, resolve issues faster and prevent recurrence.']],use:[],accent:'#0B4D49',leafletPage:true,heroFeatures:true,brandLabel:'NetSight360',capabilityGroups:[
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
    summary: 'Panoptix brings digital asset discovery, vulnerability intelligence, security misconfiguration assessment, risk-based prioritisation and remediation tracking into a unified cyber exposure management environment. Designed for organisations managing complex digital infrastructure, it helps security teams identify weaknesses, focus on critical exposures and strengthen security posture through continuous assessment.',
    images: artSet('panoptix'),
    gallery: artGallery('panoptix'), flowImage: art('panoptix','flow'),
    accent: '#0C6B63',
    overviewTitle: 'Overview: See the Exposure Before It Becomes an Incident.',
    overview: [
      'Enterprise digital environments are constantly evolving. New assets, cloud services, configuration changes, vulnerabilities and external-facing systems introduce security exposures that are difficult to manage through periodic assessments and fragmented tools alone.',
      'Panoptix is designed to provide a consolidated view of organisational cyber exposure. By bringing together asset intelligence, vulnerability findings, configuration weaknesses and risk context, the platform helps security teams understand where weaknesses exist and which exposures require attention.',
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
    useCaseLead: 'Panoptix helps security teams discover risks, investigate affected assets and coordinate remediation across increasingly complex environments.',
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
    riskIntro: 'Not every vulnerability creates the same level of risk. Panoptix is designed to bring security findings into context so teams can distinguish critical exposures from lower-priority weaknesses. By considering vulnerability severity, potential exploitability, asset importance and exposure conditions, teams can establish meaningful remediation priorities.',
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
    differentiatorTitle: 'Why Panoptix: Snapshots vs. Continuous Coverage.',
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
    securityIntro: 'Panoptix should provide controlled access to assessment information, vulnerability evidence, asset context and remediation records. Its deployment architecture should support security controls aligned with sensitive environments and internal governance expectations. Confirm each control against the released edition.',
    controls: [
      ['Role-based permissions','Control access to assessment information and remediation records.'],
      ['Authentication safeguards','Support secure access to the platform.'],
      ['Encrypted communications','Protect communications in transit.'],
      ['Audit trails','Maintain accountability for user activity and changes.'],
      ['Scanner authorisation and scope controls','Limit assessments to approved targets and scopes.'],
      ['Assessment-data protection','Protect vulnerability evidence and asset context.'],
      ['Configurable evidence retention','Set evidence retention to align with internal governance.']
    ],
    trustNote: 'Designed to support accountability and security governance; Panoptix does not guarantee compliance or certification.',
    deploymentEyebrow: 'Deployment & integration',
    deploymentTitle: 'Deployment: Fit Cyber Exposure Management to Your Environment.',
    deploymentIntro: 'Panoptix can be positioned for organisations seeking controlled exposure assessment across existing infrastructure. Deployment planning should address asset scope, network access, supported assessment methods, integration requirements and security governance.',
    deploymentOptions: [
      ['Environment & Asset Scope','Identify targets, ownership, network boundaries and access rules.'],
      ['Scanner & Source Integration','Connect approved tools and vulnerability/configuration evidence sources.'],
      ['Access & Policy Setup','Configure roles, controls, priorities and reporting policies.'],
      ['Rollout & Operational Handover','Validate results and transfer workflow ownership to security teams.']
    ],
    faqs: [
      {q:'What is Panoptix?',a:'Panoptix is a Cyber Exposure Management System intended to unite asset visibility, vulnerability and configuration findings, risk context and remediation tracking.'},
      {q:'How is it different from a VAPT tool?',a:'VAPT identifies and validates technical weaknesses. Exposure management also connects asset context, priorities, ownership, follow-up and continuous reassessment.'},
      {q:'What can Panoptix assess?',a:'The target scope includes network assets, servers, externally accessible services and supported application/cloud findings. Actual coverage depends on available scanning engines and integrations.'},
      {q:'Does Panoptix support risk-based prioritisation?',a:'This is a central design capability. The live scoring methodology and data feeds must be verified for each released edition.'},
      {q:'Can remediation progress be tracked?',a:'The intended workflow covers owner assignment, status, corrective action and validation. Confirm production availability before advertising.'},
      {q:'Can Panoptix be deployed on-premises?',a:'On-premises deployment is a recommended direction for security-sensitive customers. Supported packaging and prerequisites should be confirmed.'},
      {q:'Can it help with cybersecurity compliance?',a:'It can provide technical assessment evidence for governance workflows, but does not independently guarantee compliance or certification.'}
    ]
  },
  vapt: {
    category: 'Cybersecurity',
    descriptor: 'Vulnerability Assessment & Penetration Testing Platform',
    heroEyebrow: 'SECURITY ASSESSMENT / VULNERABILITY INTELLIGENCE',
    heroFeatures: true,
    summary: 'Nested VA helps security teams identify vulnerabilities, assess configuration weaknesses, organise technical evidence and guide remediation through a unified assessment workflow. Combining automated checks with expert-led validation, it supports clearer findings, actionable reports and more confident security decisions.',
    images: artSet('nestedva'),
    gallery: artGallery('nestedva'), flowImage: art('nestedva','flow'),
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
// The Flowbits profile data file still names stock photos, so its image sets are swapped for generated art here.
profiles.ipdr = { ...flowbitsProfile, images: artSet('nexora'), gallery: artGallery('nexora'), flowImage: art('nexora', 'flow'), ctaImages: undefined }

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
  panoptix: [['#overview','Overview'],['#workflow','How it works'],['#exposure-domains','Exposure areas'],['#use-cases','Use cases'],['#capabilities','Capabilities'],['#risk-intelligence','Prioritisation'],['#different','Why Panoptix'],['#industries','Industries'],['#deployment','Deployment']],
  smms: [['#overview','Overview'],['#people','Use cases'],['#capabilities','Capabilities'],['#different','Why SMMS'],['#business-benefits','Benefits'],['#workflow','How it works'],['#integrations-data','Integrations'],['#deployment','Deployment'],['#faq','FAQ']],
  vapt: [['#overview','Overview'],['#workflow','How it works'],['#exposure-domains','Testing scope'],['#use-cases','Use cases'],['#capabilities','Capabilities'],['#risk-intelligence','Findings'],['#different','Why Nested VA'],['#industries','Industries'],['#deployment','Deployment']],
}
// Hero slideshow: the two interface screens first, then the product's generated art. One caption per slide.
const heroScenes = {
  ipdr: { art: 'nexora', captions: ['IPDR & subscriber investigation', 'Network intelligence overview', 'Built for ISP & telecom networks', 'Fibre-core traffic, correlated'] },
  'argos-enms': { art: 'netsight', captions: ['Live network topology', 'Device health at a glance', 'For network operations teams', 'Every switch, router and link'] },
  panoptix: { art: 'panoptix', captions: ['Cyber exposure overview', 'Discovered asset inventory', 'Continuous security monitoring', 'Prioritise fixes as a team'] },
  vapt: { art: 'nestedva', captions: ['Findings with evidence', 'Reports & remediation tracking', 'Hands-on security assessment', 'Re-test and verify every fix'] },
  smms: { art: 'smms', captions: ['Service health across locations', 'Incidents & escalation', 'Infrastructure under watch', 'IT teams resolving faster'] },
}
for (const [id, shots] of Object.entries(productShots)) profiles[id] = { ...profiles[id], productShots: shots, heroImages: [...shots, art(heroScenes[id].art, 'flow'), art(heroScenes[id].art, 'hub')], heroCaptions: heroScenes[id].captions }

// Artwork topic for each product page's hero globe.
const artKeyOf = { ipdr: 'nexora', 'argos-enms': 'netsight', panoptix: 'panoptix', vapt: 'nestedva', smms: 'smms', 'gyanshu-ai-office-assistance': 'aiassistant' }
const idFor = productIdFor
// The product's own interface screen where there is one, otherwise its product artwork.
const catalogImage = (id) => (profiles[id].productShots || profiles[id].images)[0]
// Section images separate from the hero set.
const galleryOf = (p) => p.gallery || p.images.slice(1)
const flowImageOf = (p) => p.flowImage || p.images[3]

/* ------------------------------------------------------------------ */
/* Shared building blocks for the product sections                     */
/* ------------------------------------------------------------------ */

// Cards as on the home page: white, soft shadow, pointer spotlight, a bar that sweeps in, an icon chip that turns on hover.
const cardBase = 'group relative overflow-hidden rounded-[1.375rem] border border-line bg-white shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift'
const chipCls = 'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink'
const plainCard = 'rounded-[1.375rem] border border-line bg-white shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift'
const lastLeft = '[hyphens:manual] [text-align:left!important]'

// A section on the page: light (plain band) or dark (the home page's rounded dark container).
function Band({ id, dark = false, seed = 3, children }) {
  if (dark) return <DarkBand id={id} seed={seed}><div className="shell relative">{children}</div></DarkBand>
  return <section id={id} className="py-8 md:py-10 lg:py-12"><div className="shell">{children}</div></section>
}

// Section heading: key words in the accent colour; centred unless `left`. The eyebrow text stays in the page (hidden by the site CSS).
function Head({ eyebrow, title, muted = 2, lede, dark = false, left = false, small = false, as = 'h2', className = '' }) {
  return <div className={`${left ? 'max-w-3xl' : 'mx-auto max-w-4xl text-center'} ${className}`}>
    {eyebrow && <p className={dark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</p>}
    <PosterHeadline as={as} text={title ?? ''} muted={muted} align={left ? 'left' : 'center'} dark={dark} className={`h-section ${small ? '!text-[1.75rem] sm:!text-4xl lg:!text-[2.5rem]' : ''} ${dark ? 'text-white' : 'text-ink'}`} />
    {lede && <Reveal delay={0.1}><p className={`mt-4 max-w-3xl text-[0.9375rem] leading-relaxed md:text-base ${left ? lastLeft : 'mx-auto'} ${dark ? 'text-white/65' : 'text-muted'}`}>{lede}</p></Reveal>}
  </div>
}

// Card with a spotlight, icon chip and optional body. `stack` puts the chip above the title (narrow columns).
function SpotCard({ title, children, stack = false, icon, delay = 0, className = '' }) {
  return <Reveal delay={delay} className="h-full"><article onMouseMove={spot} className={`${cardBase} flex h-full p-5 sm:p-6 ${className}`}>
    <CardFx />
    <div className={`relative flex w-full gap-4 ${stack ? 'flex-col' : 'items-start'}`}>
      <span className={chipCls}>{createElement(icon || iconFor(title), { size: 19, strokeWidth: 1.7 })}</span>
      <div><h3 className="card-heading text-ink transition-colors duration-500 group-hover:text-brand-600">{title}</h3>{children}</div>
    </div>
  </article></Reveal>
}
const cardText = `mt-2 text-[0.9063rem] leading-relaxed text-muted ${lastLeft}`

// Plain white card (as the "Why Gyanshu" cards).
function PlainCard({ title, children, delay = 0, className = '' }) {
  return <Reveal delay={delay} className="h-full"><article className={`${plainCard} h-full p-5 sm:p-6 ${className}`}>
    <h3 className="card-heading text-ink">{title}</h3>{children}
  </article></Reveal>
}

// Capability card that flips on hover or focus. Front: icon chip and title. Back: the detail.
function FlipCard({ title, label, delay = 0, children }) {
  return <Reveal delay={delay}><article onMouseMove={spot} tabIndex={0} aria-label={label} className="capability-flip-card group relative h-[13.5rem] rounded-[1.375rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950">
    <div className="capability-flip-inner relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
      <div className="capability-flip-face capability-flip-front absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.375rem] border border-white bg-white p-5 shadow-card [backface-visibility:hidden]">
        <span className={chipCls}>{createElement(iconFor(title), { size: 19, strokeWidth: 1.7 })}</span>
        <div><h3 className="card-heading text-ink">{title}</h3><span className="mt-2 block label-text text-muted">Hover or focus to explore</span></div>
      </div>
      <div className="capability-flip-face capability-flip-back absolute inset-0 overflow-y-auto rounded-[1.375rem] border border-brand-400 bg-brand-50 p-5 shadow-card [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <h3 className="card-heading text-ink">{title}</h3>{children}
      </div>
    </div>
  </article></Reveal>
}

// Use-case card with generated art (or the product's own art) on top.
function MediaCard({ title, text, src, alt = '', i = 0, tall = false }) {
  return <Reveal delay={(i % 3) * 0.08} className="h-full"><article onMouseMove={spot} className={`${cardBase} flex h-full flex-col`}>
    <CardFx />
    <div className={`relative w-full overflow-hidden bg-ink-950 ${tall ? 'h-56' : 'h-44'}`}><div className="absolute inset-0 transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]"><Media src={src} alt={alt} width={900} /></div></div>
    <div className="relative p-5 sm:p-6"><h3 className="card-heading text-ink transition-colors duration-500 group-hover:text-brand-600">{title}</h3><p className={cardText}>{text}</p></div>
  </article></Reveal>
}

function UseCases({ profile, id = 'use-cases', alts, cols = 'md:grid-cols-3', leadAbove = true, title }) {
  const gal = galleryOf(profile)
  return <Band id={id}>
    <Head eyebrow={profile.useCasesEyebrow || 'Real-world applications'} title={title ?? profile.useCasesTitle} lede={leadAbove ? profile.useCaseLead : undefined} />
    <div className={`mt-8 grid gap-3 ${cols}`}>{profile.useCases.map(([t, d], i) => <MediaCard key={t} i={i} title={t} text={d} src={gal[i % gal.length]} alt={alts?.[i] || ''} tall={!!alts} />)}</div>
  </Band>
}

function Benefits({ profile, dark = false, id = 'business-benefits', eyebrow, title }) {
  return <Band id={id} dark={dark} seed={5}>
    <Head dark={dark} eyebrow={eyebrow} title={title ?? profile.benefitsTitle} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{profile.benefits.map(([t, d], i) => <SpotCard key={t} stack delay={(i % 5) * 0.06} title={t}><p className={cardText}>{d}</p></SpotCard>)}</div>
  </Band>
}

function Deployment({ profile, cta, id = 'deployment' }) {
  return <Band id={id} dark seed={9}>
    <Head dark eyebrow={profile.deploymentEyebrow} title={profile.deploymentTitle} lede={profile.deploymentIntro} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.deploymentOptions.map(([t, d], i) => <PlainCard key={t} delay={(i % 4) * 0.06} title={t}>{d && <p className={cardText}>{d}</p>}</PlainCard>)}</div>
    <Reveal delay={0.15} className="mt-8 flex justify-center"><Link to="/contact" className="btn btn-brand">{cta} <span className="btn-chip"><ArrowRight size={15} /></span></Link></Reveal>
  </Band>
}

function IpdrLeafletSections({profile,part}) {
  if (part === 'use-cases') return <UseCases profile={profile} cols="sm:grid-cols-2 lg:grid-cols-4" title={profile.useCasesTitle || 'Trusted by Teams Across Critical Use Cases'} leadAbove={false} />
  if (part === 'business') return <Band id="business-benefits">
    <Head eyebrow="Business benefits" title={profile.benefitsTitle || 'Greater visibility. Stronger security. Smarter operations.'} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{profile.benefits.map(([t, d], i) => <SpotCard key={t} stack delay={(i % 5) * 0.06} title={t}><p className={cardText}>{d}</p></SpotCard>)}</div>
    <div className="mt-12 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><Head left small as="h3" eyebrow={profile.industriesEyebrow ||'Industry & Deployment Use Cases'} title={profile.industriesTitle || 'Designed for Your Network Reality'} />
      <div className={`grid gap-3 sm:grid-cols-2 ${profile.industries.length===3?'lg:grid-cols-3':'lg:grid-cols-4'}`}>{profile.industries.map(([t, d], i) => <PlainCard key={t} delay={(i % 4) * 0.06} title={t}><p className={cardText}>{d}</p></PlainCard>)}</div></div>
  </Band>
  if (part === 'security') return <Band id="security-integrations" dark seed={4}>
    <div className="grid gap-10 lg:grid-cols-2">
      <div><Head left dark eyebrow={profile.securityEyebrow || 'On-premises control & security'} title={profile.securityTitle || 'Your Data. Your Infrastructure. Your Rules.'} />
        <div className="mt-6 space-y-3">{profile.controls.map(([t, d], i) => <SpotCard key={t} delay={i * 0.06} title={t}><p className={cardText}>{d}</p></SpotCard>)}</div></div>
      <div><Head left dark eyebrow={profile.integrationsEyebrow ||'Integrations & ecosystem'} title={profile.integrationsTitle || 'Built to Fit Your Environment'} />
        {profile.deploymentOptions ? <div className="mt-8 grid gap-3 sm:grid-cols-2">{profile.deploymentOptions.map(([t, d], i) => <PlainCard key={t} delay={(i % 4) * 0.06} title={t}><p className={cardText}>{d}</p></PlainCard>)}</div>
        : <><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{profile.integrations.map((name) => <div key={name} className={`flex min-h-20 items-center justify-center rounded-[1.125rem] border px-3 text-center label-text ${name==='Custom APIs'?'border-brand-400 bg-brand-500/20 text-white':'border-white/15 bg-white/[.06] text-white/85'}`}>{name}</div>)}</div>
          <div className="mt-4 rounded-[1.375rem] border border-white/15 bg-white/[.06] p-5 text-center font-display text-xl font-medium text-white">{profile.brandLabel || 'Flowbits Nexora'}</div></>}
      </div>
    </div>
  </Band>
  return null
}

function ExtendedProductSections({profile,part}) {
  if (part === 'domains') return <Band id="exposure-domains">
    <Head eyebrow={profile.domainEyebrow || 'Exposure domains'} title={profile.domainTitle || 'Understand Cyber Exposure Across Your Digital Environment.'} lede={profile.domainIntro} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{profile.exposureDomains.map(([t, d], i) => <SpotCard key={t} delay={(i % 3) * 0.06} title={t}><p className={cardText}>{d}</p></SpotCard>)}</div>
    {profile.domainNote && <p className={`mt-5 text-xs leading-relaxed text-muted ${lastLeft}`}>{profile.domainNote}</p>}
  </Band>
  if (part === 'use-cases') return <UseCases profile={profile} />
  if (part === 'risk') return <Band id="risk-intelligence">
    <Head left eyebrow={profile.riskEyebrow || 'Risk intelligence'} title={profile.riskTitle} lede={profile.riskIntro} />
    <Reveal className="mt-7"><div className="overflow-hidden rounded-[1.375rem] border border-line bg-white shadow-card">{profile.riskSignals.map(([t, d], i) => <div key={t} className={`grid gap-2 px-5 py-4 sm:grid-cols-[.7fr_1.3fr] sm:px-6 ${i%2?'bg-white':'bg-paper'}`}><strong className="text-sm text-ink">{t}</strong><p className={`text-sm leading-relaxed text-muted ${lastLeft}`}>{d}</p></div>)}</div></Reveal>
    <Reveal delay={0.1}><p className={`mt-5 rounded-[1.375rem] bg-brand-50 p-5 font-medium text-ink ${lastLeft}`}>{profile.riskOutcome}</p></Reveal>
  </Band>
  if (part === 'integrations') return <Band id="integrations-data">
    <Head eyebrow="DATA SOURCES & INTEGRATIONS" title={profile.integrationTitle} lede={profile.integrationIntro} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{profile.integrations.map((item, i) => <SpotCard key={item} delay={(i % 3) * 0.06} title={item} />)}</div>
    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-muted">{profile.integrationNote}</p>
  </Band>
  if (part === 'business') return <Benefits profile={profile} dark eyebrow={profile.businessEyebrow || 'Outcomes'} />
  if (part === 'industries') return <Band id="industries">
    <Head eyebrow={profile.industriesEyebrow} title={profile.industriesTitle} />
    <div className={`mt-8 grid gap-3 sm:grid-cols-2 ${profile.industries.length===3?'lg:grid-cols-3':'lg:grid-cols-4'}`}>{profile.industries.map(([t, d], i) => <PlainCard key={t} delay={(i % 4) * 0.06} title={t}><p className={cardText}>{d}</p></PlainCard>)}</div>
  </Band>
  if (part === 'security') return <Band id={profile.securitySectionId || 'security-governance'}>
    <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
      <div><Head left eyebrow={profile.securityEyebrow || 'Security & governance'} title={profile.securityTitle} lede={profile.securityIntro} /></div>
      <div><p className="text-sm font-medium text-ink">Security parameters</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{profile.controls.map(([t, d], i) => <SpotCard key={t} delay={(i % 2) * 0.06} title={t}><p className={cardText}>{d}</p></SpotCard>)}</div>
        <p className={`mt-5 text-sm leading-relaxed text-muted ${lastLeft}`}>{profile.trustNote}</p></div>
    </div>
  </Band>
  if (part === 'deployment') return <Deployment profile={profile} cta="Discuss Deployment" />
  return null
}

function SmmsSections({profile,part}) {
  if (part === 'use-cases') {
    const gal = galleryOf(profile)
    return <Band id="people">
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <Head left eyebrow={profile.useCasesEyebrow} title={profile.useCasesTitle} lede={profile.useCaseLead} />
        <div className="grid gap-3 sm:grid-cols-3">{profile.useCases.map(([t, d], i) => <Reveal key={t} delay={i * 0.08} className="h-full"><article onMouseMove={spot} className={`${cardBase} relative min-h-[26.25rem] bg-ink-950`}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]"><Media src={gal[i % gal.length]} width={900} /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white"><h3 className="card-heading">{t}</h3><p className="mt-2 text-sm leading-relaxed text-white/75 [hyphens:manual] [text-align:left!important]">{d}</p></div>
        </article></Reveal>)}</div>
      </div>
    </Band>
  }
  if (part === 'benefits') return <Benefits profile={profile} eyebrow={profile.benefitsEyebrow} />
  if (part === 'integrations') return <Band id="integrations-data">
    <Head eyebrow={profile.integrationsEyebrow} title={profile.integrationsTitle} lede={profile.integrationsIntro} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.integrations.map((item, i) => <SpotCard key={item} delay={(i % 4) * 0.06} title={item} />)}</div>
  </Band>
  if (part === 'deployment') return <Deployment profile={profile} cta="Discuss Deployment" />
  return null
}

function AiOfficeSections({profile,part}) {
  if (part === 'use-cases') return <UseCases profile={profile} id="people" alts={['Enterprise knowledge search','Document assistance','Office productivity']} />
  if (part === 'benefits') return <Benefits profile={profile} eyebrow={profile.benefitsEyebrow} />
  if (part === 'departments') return <Band id="departments" dark seed={7}>
    <Head dark eyebrow={profile.departmentsEyebrow} title={profile.departmentsTitle} />
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{profile.departments.map(([t, d], i) => <SpotCard key={t} delay={(i % 4) * 0.06} title={t}><p className={cardText}>{d}</p></SpotCard>)}</div>
  </Band>
  if (part === 'security') return <Band id="security-trust">
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_.9fr]">
      <div><Head left eyebrow={profile.securityEyebrow} title={profile.securityTitle} lede={profile.securityIntro} />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">{profile.securityLabels.map((label, i) => <Reveal key={label} delay={i * 0.06} className="h-full"><div className={`${plainCard} h-full p-5`}><Check size={18} className="mb-3 text-brand-500" /><p className="text-sm font-medium text-ink">{label}</p></div></Reveal>)}</div></div>
      <Reveal delay={0.1}><div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-line bg-ink-950 shadow-card"><Media src={profile.images[5]} alt={profile.faqImageAlt} width={1200} /></div></Reveal>
    </div>
  </Band>
  if (part === 'deployment') return <Deployment profile={profile} cta="Discuss Private AI Deployment" />
  return null
}

function IpdrContactSection({heading}) {
  return <Band id="get-in-touch">
    <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div><Head left eyebrow="Get in touch" title={heading} />
        <Reveal delay={0.1}><div className="relative mt-7 overflow-hidden rounded-[1.375rem] bg-ink-950 p-6 text-white shadow-card"><p className="font-display text-2xl font-semibold tracking-[.08em]">GYANSHU TECHNOLOGIES</p><p className="mt-1 text-xs text-white/70">Pvt. Ltd.</p><p className="mt-2 label-text text-brand-300">Secure. Intelligent. Connected</p></div></Reveal></div>
      <Reveal delay={0.1}><div onMouseMove={spot} className={`${cardBase} p-6 md:p-8`}><CardFx /><div className="relative"><h3 className="card-heading text-ink">Kirti Raj Choudhury</h3><p className="mt-1 text-sm text-muted">Head – Business Operations</p><div className="mt-6 space-y-3 text-sm"><a className="flex items-center gap-2.5 text-ink transition-colors hover:text-brand-600" href="tel:+919090009301"><Phone size={16} className="shrink-0 text-brand-500" aria-hidden="true" />+91 90900 09301</a><a className="flex items-center gap-2.5 text-ink transition-colors hover:text-brand-600" href="mailto:operations@gyanshu.tech"><Mail size={16} className="shrink-0 text-brand-500" aria-hidden="true" />operations@gyanshu.tech</a><a className="flex items-center gap-2.5 text-ink transition-colors hover:text-brand-600" href="https://www.gyanshu.tech" target="_blank" rel="noreferrer"><Globe size={16} className="shrink-0 text-brand-500" aria-hidden="true" />www.gyanshu.tech</a><p className="flex items-start gap-2.5 text-ink [hyphens:manual] [text-align:left!important]"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true" />{COMPANY_ADDRESS}</p></div></div></div></Reveal>
    </div>
  </Band>
}

// Products page content: one showcase card per product (category, tagline and four key features).
const showcase = {
  ipdr: ['Network Intelligence', 'Convert network flows and subscriber activity into operational, security, and forensic intelligence.', ['Flow telemetry & IPDR', 'Subscriber intelligence', 'Threat & behavior analytics', 'Investigation & forensics']],
  'argos-enms': ['Network Operations', 'Monitor device health, interfaces, traffic and dependencies across your entire network from one platform.', ['Device & interface monitoring', 'Live topology & dependencies', 'Intelligent alerting', 'Dashboards & capacity insights']],
  panoptix: ['Cyber Exposure Management', 'Discover assets, prioritise exposures and track remediation in one continuous exposure management environment.', ['Asset discovery', 'Vulnerability intelligence', 'Risk-based prioritisation', 'Remediation tracking']],
  vapt: ['VAPT Platform', 'Run repeatable security assessments with structured evidence, consistent severity and clear remediation guidance.', ['Multi-technology assessment', 'Evidence-backed findings', 'Severity classification', 'Re-testing & closure']],
  smms: ['Smart Monitoring', 'Bring infrastructure status, alerts, incidents and service levels into one operational view.', ['Unified monitoring', 'Alert & incident management', 'Escalation workflows', 'SLA reporting']],
  'gyanshu-ai-office-assistance': ['Private Enterprise AI', 'Find organisational knowledge, understand documents and draft content with AI hosted inside your own infrastructure.', ['Private on-premises AI', 'Enterprise knowledge search', 'Document assistance', 'Drafting & summarisation']],
}
const enterpriseReality = [
  [ShieldCheck, 'Security & Governance', 'Access controls, auditability, and governance-aligned workflows.'],
  [Server, 'Deployment Control', 'Deployment choices suited to enterprise infrastructure requirements.'],
  [Workflow, 'Operational Integration', 'Connect platform intelligence with existing infrastructure and operational workflows.'],
  [ChartNoAxesColumnIncreasing, 'Actionable Intelligence', 'Translate operational data into meaningful insights and decisions.'],
]

function ShowcaseCard({item}) {
  const id=idFor(item.to), name=getPage(item.to).title.trim()
  const [category, tagline, features]=showcase[id]
  return <article onMouseMove={spot} className={`${cardBase} flex h-full flex-col p-5 sm:p-6`}>
    <CardFx />
    <div className="relative grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-start">
      <div>
        <p className="label-text text-brand-600 [text-align:left!important]">{category}</p>
        <h3 className="card-heading mt-2 text-ink transition-colors duration-500 group-hover:text-brand-600">{name}</h3>
        <p className={`mt-3 text-[0.9063rem] leading-relaxed text-muted ${lastLeft}`}>{tagline}</p>
      </div>
      <Link to={item.to} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden rounded-[1rem] border border-line bg-ink-950 shadow-card transition-shadow duration-500 group-hover:shadow-lift"><div className="absolute inset-0 transition duration-[1.2s] ease-expo group-hover:scale-[1.06]"><Media src={catalogImage(id)} width={900} position="left top" /></div></Link>
    </div>
    <ul className="relative mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">{features.map((f,i)=><li key={f} className="flex items-center gap-2.5 text-[0.875rem] text-ink/85 transition-transform duration-500 group-hover:translate-x-1" style={{transitionDelay:`${i*40}ms`}}><Check size={15} className="shrink-0 text-brand-500"/>{f}</li>)}</ul>
    <Link to={item.to} className="relative mt-6 inline-flex w-fit items-center gap-2 border-t border-line pt-5 text-[0.9375rem] font-medium text-ink transition-colors hover:text-brand-600">Explore {name} <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></Link>
  </article>
}

export function ProductCatalog({page}) {
  const images=productLinks.map((item)=>catalogImage(idFor(item.to)))
  return <main className="product-experience min-h-screen bg-paper text-[#0B3D3B]">
    <HeroCentered eyebrow="Gyanshu / Products" title="Platforms built around the signal." muted={2} art="products"
      subtitle="Purpose-built tools for network operations, cybersecurity, infrastructure monitoring, and private enterprise AI."
      intro={page.intro}
      actions={<><a href="#catalog" className="btn btn-dark"><span>Browse platforms</span><span className="btn-chip"><ArrowRight size={15}/></span></a><Link to="/contact" className="btn btn-outline">Talk to our team</Link></>}
      images={images} captions={productLinks.map((item)=>item.label.trim())} mediaLabel="Gyanshu product platforms" chips={categories.slice(1)}/>

    <section className="py-8 md:py-10 lg:py-12">
      <div className="shell text-center">
        <h2 className="h-section mx-auto max-w-4xl text-ink"><MaskLines lines={[<>Technology Built for <span className="text-brand-500">Mission-Critical Operations.</span></>]}/></h2>
        <Reveal delay={0.12}><p className="mx-auto mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-muted md:text-base">Explore purpose-engineered platforms for network intelligence, cyber resilience, infrastructure visibility, and private enterprise AI—designed to help organizations operate with greater confidence and control.</p></Reveal>
        <Reveal delay={0.2} className="mt-6 flex flex-wrap justify-center gap-3"><a href="#catalog" className="btn btn-dark"><span>Explore Platforms</span><span className="btn-chip"><ArrowUpRight size={15}/></span></a><Link to="/contact" className="btn btn-outline">Talk to Our Experts</Link></Reveal>
      </div>
    </section>

    <DarkBand seed={5}>
      <div className="shell relative">
        <h2 className="h-section text-center text-white"><MaskLines lines={[<>Built for <span className="text-brand-300">Enterprise Reality.</span></>]}/></h2>
        <Reveal delay={0.12}><p className="mx-auto mt-4 max-w-3xl text-center text-[0.9375rem] leading-relaxed text-white/70 md:text-base">Technology platforms designed around the security, visibility, deployment control, and integration needs of complex enterprise environments.</p></Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">{enterpriseReality.map(([Icon,title,text],i)=><Reveal key={title} delay={(i%2)*0.08+Math.floor(i/2)*0.06} className="h-full"><div onMouseMove={spot} className={`${cardBase} flex h-full items-start gap-4 border-white p-5`}>
          <CardFx />
          <span className={chipCls}><Icon size={19} strokeWidth={1.7}/></span>
          <div className="relative">
            <h3 className="card-heading text-ink transition-colors duration-500 group-hover:text-brand-600">{title}</h3>
            <p className="mt-1.5 text-[0.9063rem] leading-relaxed text-muted [text-align:left!important]">{text}</p>
          </div>
        </div></Reveal>)}</div>
      </div>
    </DarkBand>

    <section id="catalog" className="py-8 md:py-10 lg:py-12">
      <div className="shell">
        <p className="label-text text-center text-brand-600">Product portfolio</p>
        <h2 className="h-section mt-4 text-center text-ink"><MaskLines lines={[<>Our <span className="text-brand-500">Platforms</span></>]}/></h2>
        <div className="mt-8 grid gap-3 lg:grid-cols-2">{productLinks.map((item,i)=><Reveal key={item.to} delay={(i%2)*0.1} className="h-full"><ShowcaseCard item={item}/></Reveal>)}</div>
      </div>
    </section>

    <DarkBand seed={8} innerClassName="text-center">
      <div className="shell relative">
        <Reveal><p className="label-text text-brand-300">Let’s solve what matters</p></Reveal>
        <h2 className="h-section mt-4 text-white"><MaskLines lines={[<>Your Challenges. <span className="text-brand-300">Our Intelligence.</span></>]}/></h2>
        <Reveal delay={0.12}><p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/75 md:text-base">Engage with our solutions team to identify the right platform for your security, network operations, infrastructure, and AI transformation requirements.</p></Reveal>
        <Reveal delay={0.2} className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/contact" className="btn btn-brand"><span>Talk to Our Experts</span><span className="btn-chip"><ArrowUpRight size={15}/></span></Link><Link to="/contact" className="btn btn-outline-dark">Request a Demo</Link></Reveal>
      </div>
    </DarkBand>
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
  return <main className="product-experience product-detail min-h-screen overflow-x-clip bg-paper text-[#0B3D3B]">
     <HeroCentered eyebrow={id==='ipdr'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.heroEyebrow:id==='argos-enms'?'NETWORK OPERATIONS / ENTERPRISE VISIBILITY':id==='panoptix'||id==='vapt'?profile.heroEyebrow:`Gyanshu platform / ${profile.category}`} title={id==='argos-enms'?'NetSight360':id==='smms'?profile.heroTitle:page.title} subtitle={id==='panoptix'?'Know Your Exposure. Control Your Cyber Risk.':id==='vapt'?'Discover Weaknesses. Validate Security. Strengthen with Confidence.':id==='smms'||id==='gyanshu-ai-office-assistance'?profile.heroHeadline:page.subtitle} intro={profile.summary} chips={profile.heroFeatures?page.features:page.features.slice(0,3)} actions={<><Link to="/contact" className="btn btn-dark"><span>{id==='ipdr'||id==='argos-enms'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?'Request Demo':'Discuss this platform'}</span><span className="btn-chip"><ArrowRight size={15}/></span></Link><a href="#capabilities" className="btn btn-outline">Explore Capabilities</a></>} art={artKeyOf[id]} images={profile.heroImages || profile.images} captions={profile.heroCaptions} mediaLabel={profile.descriptor}/>
          <nav aria-label="On this page" className="sticky top-3 z-30 mt-8 flex justify-center px-3"><div ref={sectionNav} className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#DCE9E7] bg-white/85 p-1.5 label-text text-[#4A6866] shadow-card backdrop-blur-xl">{subNav[id] ? subNav[id].map(([href,label])=><a key={href} href={href} className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">{label}</a>) : <><a href="#overview" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Overview</a>{id==='ipdr'&&<a href="#highlights" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Key highlights</a>}{id!=='ipdr'&&id!=='argos-enms'&&id!=='panoptix'&&<a href="#people" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">People and systems</a>}<a href="#capabilities" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Capabilities</a><a href="#workflow" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Workflow</a>{id==='panoptix'&&<><a href="#exposure-domains" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Domains</a><a href="#risk-intelligence" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Risk</a><a href="#industries" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Industries</a><a href="#security-governance" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Security</a></>}{id!=='ipdr'&&<a href="#deployment" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Deployment</a>}{id==='smms'&&<><a href="#business-benefits" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Benefits</a><a href="#integrations-data" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Data & integrations</a></>}{id==='vapt'&&<><a href="#use-cases" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Use cases</a><a href="#risk-intelligence" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Findings</a><a href="#industries" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Industries</a><a href="#security-trust" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Security</a></>}{id==='gyanshu-ai-office-assistance'&&<><a href="#business-benefits" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Benefits</a><a href="#departments" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Departments</a><a href="#security-trust" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Security</a></>}{(id==='smms'||id==='gyanshu-ai-office-assistance')&&<a href="#faq" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">FAQ</a>}{profile.differentiators&&id!=='ipdr'&&id!=='argos-enms'&&<a href="#different" className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-[#F8FCFC] hover:text-[#0B3D3B]">Why {id==='argos-enms'?'ARGOS':id==='vapt'?'VAPT SCANNER':id==='smms'?'SMMS':id==='gyanshu-ai-office-assistance'?'AI OFFICE ASSISTANT':'Panoptix'}</a>}</>}</div></nav>
    <section id="overview" className="py-8 md:py-10 lg:py-12"><div className="shell grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><Head left muted={2} eyebrow={id==='panoptix'?'PRODUCT OVERVIEW':id==='vapt'?'ABOUT VAPT SCANNER':id==='smms'||id==='gyanshu-ai-office-assistance'?profile.overviewEyebrow:id==='ipdr'?profile.overviewEyebrow:id==='argos-enms'?'ABOUT NetSight360 ENTERPRISE':'About the platform'} title={id==='ipdr'?profile.overviewTitle:id==='argos-enms'?'Centralised Network Operations for a Smarter, More Resilient Enterprise':id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.overviewTitle:'Designed for clearer operational decisions.'}/><Reveal delay={0.1}><div><div className="text-lg leading-relaxed text-muted">{(id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance')?profile.overview.map((paragraph)=><p key={paragraph} className={`mb-4 last:mb-0 ${lastLeft}`}>{paragraph}</p>):<p className={lastLeft}>{page.intro}</p>}</div>{id==='argos-enms'&&<><p className={`mt-5 leading-relaxed text-muted ${lastLeft}`}>From core to edge, NetSight360 brings your entire network under a single pane of glass, enabling proactive operations and faster problem resolution.</p></>}<div className="mt-6 grid gap-3 sm:grid-cols-2">{profile.use.map((x)=><div key={x} className="flex items-center gap-3 border-b border-line py-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Check size={14} strokeWidth={2}/></span><span className="text-sm font-medium text-ink">{x}</span></div>)}</div></div></Reveal></div></section>
        {(id==='panoptix'||id==='vapt')&&<><StepsBanner id="workflow" eyebrow={profile.flowEyebrow} title={profile.flowTitle} steps={profile.flow} image={flowImageOf(profile)} note={profile.flowNote}/><ExtendedProductSections profile={profile} part="domains"/></>}{id==='ipdr'&&<ExtendedProductSections profile={profile} part="domains"/>}
    {profile.why&&id!=='vapt'&&<Band id={id==='ipdr'?'highlights':undefined} dark seed={4}><Head dark eyebrow={id==='ipdr'?'Key highlights':id==='argos-enms'?'KEY HIGHLIGHTS':id==='vapt'?'Adopt Nested VA?':'Why Panoptix?'} title={profile.whySubtitle || 'IP intelligence for demanding environments.'}/><div className={`mt-8 grid grid-cols-2 gap-3 ${profile.why.length===4?'lg:grid-cols-4':'lg:grid-cols-3'}`}>{profile.why.map(([title,description],i)=><FlipCard key={title} title={title} delay={(i%3)*0.06} label={`${title}. Focus or hover to see details.`}><p className={`mt-3 text-sm leading-relaxed text-muted ${lastLeft}`}>{description}</p></FlipCard>)}</div></Band>}
        {profile.leafletPage&&<IpdrLeafletSections profile={profile} part="use-cases"/>}{id==='ipdr'&&<ExtendedProductSections profile={profile} part="use-cases"/>}{id==='smms'&&<SmmsSections profile={profile} part="use-cases"/>}{id==='gyanshu-ai-office-assistance'&&<AiOfficeSections profile={profile} part="use-cases"/>}{(id==='panoptix'||id==='vapt')&&<ExtendedProductSections profile={profile} part="use-cases"/>}
    <Band id="capabilities" dark seed={6}><Head dark eyebrow="Core capabilities" title={id==='ipdr'?profile.capabilityTitle:id==='argos-enms'?'A Complete Network Operations Platform':id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.capabilityTitle:`${page.title} capabilities`} lede={(id!=='smms'&&id!=='gyanshu-ai-office-assistance'||profile.capabilityLead)?(id==='ipdr'?profile.capabilityLead:id==='argos-enms'?'Unified visibility across your entire network.':id==='panoptix'?profile.capabilityLead:id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.capabilityLead:'A set of connected capabilities designed to work as one practical platform.'):undefined}/><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{profile.capabilityGroups?profile.capabilityGroups.map((group,i)=><FlipCard key={group.title} title={group.title} delay={(i%3)*0.06} label={`${group.title}. Focus or hover to see capabilities.`}><ul className="mt-3 space-y-2">{group.items.map(item=><li key={item} className="flex gap-2 text-xs leading-snug text-ink/80 md:text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"/>{item}</li>)}</ul></FlipCard>):page.features.map((f,i)=><SpotCard key={f} title={f} delay={(i%3)*0.06}/>)}</div></Band>
    {id==='ipdr'&&<><ExtendedProductSections profile={profile} part="integrations"/><StepsBanner id="workflow" eyebrow={profile.flowEyebrow} title={profile.flowTitle} accent="" steps={profile.flow} image={flowImageOf(profile)} note={profile.flowNote}/></>}{(id==='panoptix'||id==='vapt')&&<ExtendedProductSections profile={profile} part="risk"/>}{profile.differentiators&&id!=='argos-enms'&&<Band id="different"><div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><Head left eyebrow={id==='panoptix'?'08 / DIFFERENTIATION':id==='vapt'?'Why Nested VA':id==='smms'||id==='gyanshu-ai-office-assistance'?profile.differentiatorEyebrow:`How ${id==='ipdr'?'Flowbits Nexora':id==='argos-enms'?'NetSight360':id==='vapt'?' Nested VA':'Panoptix'} is different`} title={id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.differentiatorTitle:id==='argos-enms'?'Traditional ENMS tools vs NetSight360':id==='vapt'?'Traditional VAPT tools vs Nested VA':'Traditional tools vs. Panoptix'}/>{(id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance')?(profile.differentiatorSummary&&<p className={`mt-5 leading-relaxed text-muted ${lastLeft}`}>{profile.differentiatorSummary}</p>):<p className={`mt-5 leading-relaxed text-muted ${lastLeft}`}>Flowbits Nexora is built as a data intelligence platform, not just a compliance or logging system.</p>}{profile.comparisonNote&&<p className={`mt-4 leading-relaxed text-muted ${lastLeft}`}>{profile.comparisonNote}</p>}</div><Reveal delay={0.1}><div className="overflow-hidden rounded-[1.375rem] border border-line bg-white shadow-card"><div className="grid grid-cols-2 bg-ink-950 px-5 py-4 label-text text-white sm:px-6"><span>{id==='ipdr'?'Fragmented approach':id==='argos-enms'?'Traditional ENMS tools':id==='vapt'?'Fragmented testing workflow':id==='panoptix'?'Fragmented / point-in-time approach':id==='smms'?'Fragmented approach':id==='gyanshu-ai-office-assistance'?'Disconnected office workflows':'Traditional tools'}</span><span className="text-brand-300">{id==='ipdr'?'Flowbits Nexora':id==='argos-enms'?'NetSight360':id==='vapt'?'Nested VA platform':id==='smms'?'SMMS approach':id==='gyanshu-ai-office-assistance'?'AI Office Assistant':'Panoptix exposure management approach'}</span></div>{profile.differentiators.map(([oldValue,newValue],i)=><div key={oldValue} className={`grid grid-cols-2 gap-4 px-5 py-4 text-sm sm:px-6 ${i%2===0?'bg-paper':'bg-white'}`}><span className="text-muted">{oldValue}</span><span className="flex items-start gap-2 font-medium text-ink"><Check size={16} className="mt-0.5 shrink-0 text-brand-500"/>{newValue}</span></div>)}</div></Reveal></div></Band>}
        {id==='smms'&&<SmmsSections profile={profile} part="benefits"/>}{id==='gyanshu-ai-office-assistance'&&<><AiOfficeSections profile={profile} part="benefits"/><AiOfficeSections profile={profile} part="departments"/></>}{id==='ipdr'&&<><ExtendedProductSections profile={profile} part="business"/><ExtendedProductSections profile={profile} part="industries"/><ExtendedProductSections profile={profile} part="security"/><ExtendedProductSections profile={profile} part="deployment"/></>}{id==='panoptix'&&<><ExtendedProductSections profile={profile} part="business"/><ExtendedProductSections profile={profile} part="industries"/><ExtendedProductSections profile={profile} part="security"/><ExtendedProductSections profile={profile} part="deployment"/></>}{id==='vapt'&&<><ExtendedProductSections profile={profile} part="business"/><ExtendedProductSections profile={profile} part="industries"/><ExtendedProductSections profile={profile} part="deployment"/><ExtendedProductSections profile={profile} part="security"/></>}
        {id!=='ipdr'&&id!=='panoptix'&&id!=='vapt'&&<StepsBanner id="workflow" eyebrow={id==='ipdr'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.flowEyebrow:'How it works'} title={id==='ipdr'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.flowTitle:id==='argos-enms'?'From Discovery to Resolution':'A workflow teams'} accent={id==='smms'||id==='gyanshu-ai-office-assistance'?'':id==='ipdr'?'':id==='argos-enms'?'— In Simple Steps':'can follow.'} steps={profile.flow.map((step)=>Array.isArray(step)?step:[step])} image={id==='smms'||id==='gyanshu-ai-office-assistance'?profile.images[4]:flowImageOf(profile)} note={id==='smms'||id==='gyanshu-ai-office-assistance'?profile.flowNote:id==='ipdr'?profile.flowNote:id==='argos-enms'?'':'The platform connects a sequence of practical steps, giving teams context for what happens next and why it matters.'}/>}
        {id==='smms'&&<SmmsSections profile={profile} part="integrations"/>}{id==='gyanshu-ai-office-assistance'&&<><AiOfficeSections profile={profile} part="security"/><AiOfficeSections profile={profile} part="deployment"/></>}{id==='smms'&&<SmmsSections profile={profile} part="deployment"/>}{profile.leafletPage&&<IpdrLeafletSections profile={profile} part="business"/>}{profile.leafletPage&&<IpdrLeafletSections profile={profile} part="security"/>}
    {profile.ecosystem&&id!=='panoptix'&&id!=='vapt'&&<Band id="ecosystem"><Head eyebrow={id==='vapt'?' Security Product Portfolio':'Panoptix in the product ecosystem'} title={id==='vapt'?'Layered security visibility and assurance.':'Unified network and exposure intelligence.'} lede={id==='vapt'?'The portfolio brings together:':'Panoptix integrates seamlessly with:'}/><div className="mt-7 grid gap-3 md:grid-cols-2">{profile.ecosystem.map(([name,description,to])=><Link key={name} to={to} className="block"><PlainCard title={name}><span className="label-text text-brand-600">{id==='vapt'?'Portfolio platform':'Connected platform'}</span><p className={cardText}>{description}</p></PlainCard></Link>)}</div><p className="mt-6 text-center font-medium text-ink">{id==='vapt'?'Together, they provide layered visibility, exposure awareness, and security assurance.':'Together, they form a unified network and exposure intelligence platform.'}</p><blockquote className="mx-auto mt-6 max-w-3xl border-l-2 border-brand-500 pl-5 font-display text-2xl font-medium tracking-[-.025em] text-ink">{id==='vapt'?'Measure your security posture. Validate compliance. Improve with every scan.':'If you can see your attack surface, you can control your risk.'}</blockquote></Band>}<FaqDark  eyebrow={id==='ipdr'||id==='panoptix'||id==='vapt'?'Frequently Asked Questions':id==='smms'?'Questions, answered':'FAQ'} title={id==='ipdr'||id==='panoptix'||id==='vapt'?'Questions, Answered.':id==='smms'?'FAQ: Questions, Answered.':'Questions, answered.'} lede={id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'?undefined:'What teams ask before deploying a Gyanshu platform.'} id={id==='smms'||id==='gyanshu-ai-office-assistance'?'faq':undefined} image={id==='smms'||id==='gyanshu-ai-office-assistance'?profile.faqImage:undefined} imageAlt={profile.faqImageAlt} items={id==='ipdr'||id==='panoptix'||id==='vapt'||id==='smms'||id==='gyanshu-ai-office-assistance'?profile.faqs:faqPicks.products.map((i)=>faqs[i])}/>
        {id==='gyanshu-ai-office-assistance'?<CtaPhotos eyebrow="Next step" title="Bring Private AI Into Your Organisation." muted={3} text="Begin with a scoped pilot covering users, approved document collections, security requirements, use cases and success criteria." cta="Discuss Private AI Deployment"/>:id==='smms'?<CtaPhotos eyebrow="Next step" title="See SMMS in Your Operating Environment." muted={3} text="Request a technical demonstration covering supported monitoring methods, scale, notification rules, service reporting and deployment prerequisites." cta="Request Demo"/>:id==='panoptix'||id==='vapt'?<CtaPhotos eyebrow="Next step" title={id==='vapt'?'Strengthen Your Security Assessment Process.':'Discuss Panoptix deployment.'} muted={3} text={id==='vapt'?'Share your intended target classes, scope, assessment permissions and reporting requirements.':'Talk with our team about asset scope, network access, assessment methods, integrations and security governance.'} cta={id==='vapt'?'Request a Demo':'Discuss Deployment'}/>:profile.leafletPage?<IpdrContactSection heading={id==='argos-enms'?'Let’s Build a More Connected Enterprise':undefined}/>:<CtaPhotos eyebrow="Next step" title="See how this can fit your environment." muted={3} text="Plan integrations, access, rollout, and knowledge transfer with the people who will operate the platform." cta="Talk to Gyanshu"/>}
  </main>
}


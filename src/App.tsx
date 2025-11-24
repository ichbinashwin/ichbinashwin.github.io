import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, Award, Code, Shield, Cloud, Lock, Download, Share2, Facebook, Twitter, Globe, Lightbulb, Rocket, Menu, X } from 'lucide-react';

// Type definitions
interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

interface Skill {
  category: string;
  items: string[];
}

interface Certificate {
  name: string;
  year?: string;
}

interface Theme {
  name: string;
  classes: {
    gradient: string;
    headerBg: string;
    cardBg: string;
    border: string;
    primary: string;
    accent: string;
    text: string;
    textSecondary: string;
  };
}

// Theme configurations
const themes: Record<string, Theme> = {
  cybersecurity: {
    name: 'Cybersecurity Dark',
    classes: {
      gradient: 'from-slate-900 via-blue-900 to-slate-900',
      headerBg: 'bg-slate-900/80',
      cardBg: 'bg-slate-800/50',
      border: 'border-slate-700',
      primary: 'blue',
      accent: 'purple',
      text: 'text-white',
      textSecondary: 'text-slate-300'
    }
  },
  sunset: {
    name: 'Sunset Orange',
    classes: {
      gradient: 'from-orange-900 via-red-800 to-pink-900',
      headerBg: 'bg-orange-900/80',
      cardBg: 'bg-orange-800/50',
      border: 'border-orange-700',
      primary: 'orange',
      accent: 'red',
      text: 'text-white',
      textSecondary: 'text-orange-100'
    }
  },

  ocean: {
    name: 'Ocean Blue',
    classes: {
      gradient: 'from-cyan-900 via-blue-800 to-indigo-900',
      headerBg: 'bg-blue-900/80',
      cardBg: 'bg-blue-800/50',
      border: 'border-cyan-700',
      primary: 'cyan',
      accent: 'teal',
      text: 'text-white',
      textSecondary: 'text-cyan-100'
    }
  },

  forest: {
    name: 'Forest Green',
    classes: {
      gradient: 'from-green-900 via-emerald-800 to-green-900',
      headerBg: 'bg-green-900/80',
      cardBg: 'bg-emerald-800/50',
      border: 'border-emerald-700',
      primary: 'emerald',
      accent: 'lime',
      text: 'text-white',
      textSecondary: 'text-emerald-100'
    }
  },

  royal: {
    name: 'Royal Blue & Gray',
    classes: {
      gradient: 'from-blue-900 via-gray-800 to-blue-900',
      headerBg: 'bg-blue-900/90',
      cardBg: 'bg-gray-800/50',
      border: 'border-blue-700',
      primary: 'blue',
      accent: 'amber',
      text: 'text-white',
      textSecondary: 'text-blue-100'
    }
  },

  classic: {
    name: 'Black & White Minimal',
    classes: {
      gradient: 'from-neutral-900 via-black to-neutral-900',
      headerBg: 'bg-black/90',
      cardBg: 'bg-neutral-800/60',
      border: 'border-neutral-700',
      primary: 'neutral',
      accent: 'red',
      text: 'text-white',
      textSecondary: 'text-neutral-300'
    }
  },

  charcoal: {
    name: 'Charcoal & Electric Blue',
    classes: {
      gradient: 'from-gray-900 via-slate-800 to-gray-900',
      headerBg: 'bg-gray-900/80',
      cardBg: 'bg-slate-800/60',
      border: 'border-slate-700',
      primary: 'blue',
      accent: 'cyan',
      text: 'text-white',
      textSecondary: 'text-blue-100'
    }
  },

  elegant: {
    name: 'Warm Beige & Brown',
    classes: {
      gradient: 'from-amber-100 via-stone-200 to-amber-100',
      headerBg: 'bg-stone-100/90',
      cardBg: 'bg-amber-50/80',
      border: 'border-amber-300',
      primary: 'amber',
      accent: 'orange',
      text: 'text-stone-900',
      textSecondary: 'text-stone-600'
    }
  },

  creative: {
    name: 'Purple & Soft Pink',
    classes: {
      gradient: 'from-purple-900 via-fuchsia-800 to-purple-900',
      headerBg: 'bg-purple-900/80',
      cardBg: 'bg-fuchsia-800/50',
      border: 'border-fuchsia-700',
      primary: 'purple',
      accent: 'pink',
      text: 'text-white',
      textSecondary: 'text-fuchsia-100'
    }
  },

  arctic: {
    name: 'Arctic White & Cobalt',
    classes: {
      gradient: 'from-white via-blue-100 to-cyan-200',
      headerBg: 'bg-blue-50/90',
      cardBg: 'bg-white/80',
      border: 'border-blue-200',
      primary: 'blue',
      accent: 'gray',
      text: 'text-blue-900',
      textSecondary: 'text-gray-600'
    }
  },

  midnight: {
    name: 'Midnight Blue & Cyan',
    classes: {
      gradient: 'from-slate-950 via-sky-900 to-slate-950',
      headerBg: 'bg-slate-900/80',
      cardBg: 'bg-sky-900/40',
      border: 'border-sky-700',
      primary: 'sky',
      accent: 'cyan',
      text: 'text-white',
      textSecondary: 'text-sky-200'
    }
  }
}

// Single constant to calculate experience in years
const experienceYears = (() => {
  const startDate = new Date(2011, 11); // December 2011 (0-indexed)
  const currentDate = new Date();

  const totalMonths =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  return Math.floor(totalMonths / 12); // rounded down to full years
})();

// Resume data
const resumeData = {
  personal: {
    name: "Ashwin Parmar",
    title: "IT & DevSecOps Solutions Architect | Web & AI Innovator | Cloud Security & Compliance Auditor | Technology Entrepreneur",
    email: "info@shragavi.com",
    phone: "xxx xxxx xxx xxx",
    location: "Düsseldorf, Germany",
    website: "www.shragavi.com",
    languages: "🇮🇳 Gujarati (Native) 🇬🇧 English (Fluent) 🇩🇪 German (A1)",
    summary: `Visionary IT/Cloud Security, DevSecOps Solutions Architect and Technology Entrepreneur with ${experienceYears}+ years of experience designing, developing, and securing Web, AI, and Cloud ecosystems for enterprise and startup environments. Specialized in Cloud DevSecOps Architecture, AI-Powered Application Development, and IT Security Compliance (ISMS / ISO 27001 / GDPR). Recognized for turning complex business problems into secure, automated, and scalable digital solutions.`,
    tagline: "A creative thinker with strong entrepreneurial drive — focused on building future-ready, AI-augmented cloud platforms that combine innovation, security, and sustainability.",
    yearsExperience: `${experienceYears}+`
  },
  coreStrengths: [
    "🚀 Web / AI / Cloud App Development",
    "⚙️ Cloud DevSecOps & Automation",
    "🛡️ IT Security, Compliance & Audit",
    "💡 Digital Innovation & Entrepreneurship",
    "📈 Strategic Architecture & Business Growth",
    "🤝 Leadership & Team Empowerment"
  ],
  experience: [
    {
      title: "Digital Solutions Architect | Cloud DevSecOps & ISMS Compliance Lead",
      company: "Nestlé AG – Deutschland",
      period: "2022 – Present",
      description: [
        "Architected secure, automated CI/CD pipelines with integrated SAST/DAST testing and compliance validation",
        "Built multi-cloud infrastructure using AWS Lambda, Azure Functions, and Terraform, improving release speed by 65%",
        "Defined and governed ISMS controls for audit readiness under ISO 27001 and GDPR",
        "Introduced AI-assisted DevSecOps monitoring to predict build risks and optimize deployment reliability",
        "Partnered with senior business leaders to modernize web ecosystems into containerized, microservice-driven platforms aligned with sustainability goals"
      ],
      technologies: ["AWS Lambda", "Azure Functions", "Terraform", "SAST/DAST", "ISO 27001", "GDPR", "Kubernetes", "AI/ML", "CI/CD"]
    },
    {
      title: "Technical Architect | Cloud DevOps & Platform Governance",
      company: "Tata Consultancy Services for Bayer AG / Elanco",
      period: "2019 – 2022",
      description: [
        "Architected AI-enabled multi-tenant SaaS platforms leveraging Acquia, AWS EKS, and Azure Kubernetes Service",
        "Created DevSecOps automation pipelines integrating SonarQube and OWASP ZAP, reducing vulnerabilities by 40%",
        "Implemented IaC using Terraform, standardizing deployment across 12+ global brands",
        "Delivered cost-efficient cloud scaling, saving ~25% in infrastructure spending",
        "Mentored and trained global teams on secure cloud development and DevSecOps best practices"
      ],
      technologies: ["Acquia", "AWS EKS", "Azure Kubernetes", "SonarQube", "OWASP ZAP", "Terraform", "IaC", "Multi-tenant SaaS"]
    },
    {
      title: "IT Analyst | Cloud Migration & Microservices",
      company: "BPost (Belgium) / TCS",
      period: "2018 – 2019",
      description: [
        "Migrated postal applications to AWS Lambda microservices architecture, enhancing scalability and reducing latency by 30%",
        "Developed RESTful APIs for payments and logistics systems integrations"
      ],
      technologies: ["AWS Lambda", "Microservices", "RESTful APIs", "Node.js"]
    },
    {
      title: "IT Analyst | E-Commerce & Cloud Integration",
      company: "Honeywell (USA) / TCS",
      period: "2018 – 2019",
      description: [
        "Built secure e-commerce and B2B marketplaces using NodeJS and SAP integration",
        "Implemented OAuth2 and multi-factor authentication to strengthen user data security"
      ],
      technologies: ["Node.js", "SAP", "OAuth2", "MFA", "B2B/B2C"]
    },
    {
      title: "IT Analyst | Digital Transformation & Compliance",
      company: "Roche Diagnostics (UK/CH/FR) / TCS",
      period: "2018 – 2019",
      description: [
        "Drove digital integration for multi-region healthcare platforms with SAP backend and GDPR data flow compliance"
      ],
      technologies: ["SAP", "GDPR", "Healthcare IT", "Multi-region"]
    },
    {
      title: "Senior Analyst | Web & Marketing Platform Delivery",
      company: "Accenture for Nestlé Italy",
      period: "2016 – 2018",
      description: [
        "Delivered and managed digital ecosystems for 100+ brands including KITKAT and Perrier",
        "Introduced CI/CD automation reducing content release time by 50%",
        "Implemented governance for multi-site Drupal infrastructure across Europe"
      ],
      technologies: ["Drupal", "CI/CD", "Multi-site", "Digital Marketing"]
    },
    {
      title: "Senior Software Engineer → Technical Lead → Entrepreneurial Innovator",
      company: "Gateway Technolabs Pvt. Ltd.",
      period: "2011 – 2016",
      description: [
        "Architected enterprise-grade SaaS solutions for Abbott Pharmacy and Avaya using Drupal and VoIP systems",
        "Led a small internal innovation lab developing AI-based chat assistants and automated code generators",
        "Mentored teams in Agile and DevOps practices that cut delivery cycles by 35%"
      ],
      technologies: ["Drupal", "PHP", "VoIP", "ASTERIX", "SaaS", "AI Assistants"]
    }
  ] as Experience[],
  entrepreneurialProjects: [
    {
      title: "Shragavi Digital Tech Labs",
      role: "Founder / CTO",
      description: "Independent R&D and consulting initiative focused on AI, DevSecOps, and Secure Cloud Solutions",
      achievements: [
        "Designed AI-powered DevSecOps Agents for automated testing and security compliance",
        "Developed MVPs for AI-driven portfolio management and cloud security monitoring tools",
        "Mentored startups on secure architecture, automation strategy, and product roadmaps"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "S.V. Institute of Computer Studies",
      period: "2008 – 2011",
      details: "Specialized in Computer Science & Applications"
    },
    {
      degree: "Bachelor of Commerce (B.Com)",
      institution: "Saurashtra University",
      period: "2005 – 2008",
      details: "Commerce & Business Fundamentals"
    }
  ] as Education[],
  skills: [
    {
      category: "Architecture & Cloud Platforms",
      items: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Serverless", "Microservices", "Terraform", "Ansible", "CloudFormation"]
    },
    {
      category: "DevSecOps & Automation",
      items: ["Jenkins", "GitLab", "GitHub Actions", "SonarQube", "OWASP ZAP", "Burp Suite", "Nessus", "Qualys", "ArgoCD", "Policy-as-Code"]
    },
    {
      category: "Web & AI Development",
      items: ["Drupal", "PHP", "Python", "Node.js", "React", "Java", ".NET", "Flask", "GraphQL", "REST APIs", "AI/ML", "OpenAI API", "LangChain"]
    },
    {
      category: "Security & Compliance",
      items: ["ISMS", "ISO 27001", "GDPR", "NIST CSF", "Risk Assessment", "Vulnerability Management", "IAM/RBAC", "Incident Response", "Compliance Auditing"]
    },
    {
      category: "Entrepreneurial & Innovation Skills",
      items: ["Startup Ideation", "MVP Development", "Product Lifecycle", "Business Model Innovation", "AI Process Automation", "Digital Transformation", "ROI Analysis"]
    },
    {
      category: "Monitoring & Governance",
      items: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Splunk", "ServiceNow", "Jira", "Confluence"]
    }
  ] as Skill[],
  certificates: [
    { name: "AWS Certified Cloud Practitioner", year: "2022" },
    { name: "Acquia Certified Developer – Drupal 8", year: "2017" },
    { name: "Acquia Certified Site Studio 6 Builder", year: "2021" },
    { name: "Google / Coursera – Foundations of Cybersecurity", year: "2023" },
    { name: "Microsoft / Coursera – Computers, OS & Security Fundamentals", year: "2024" }
  ] as Certificate[],
  leadershipQualities: [
    "Strategic Vision",
    "Innovation Management",
    "Business Model Design",
    "AI Adoption Strategy",
    "Team Mentorship",
    "Cross-Domain Leadership",
    "Change Enablement"
  ],
  professionalInterests: [
    "AI-Enhanced DevSecOps",
    "Autonomous Cloud Systems",
    "Cyber Risk Analytics",
    "AI Compliance & Ethics",
    "Startup Innovation",
    "Digital Transformation Leadership"
  ]
};

const Resume: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [currentTheme, setCurrentTheme] = useState('cybersecurity');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const theme = themes[currentTheme];
  const shareUrl = 'https://www.shragavi.com';
  const shareText = `Check out ${resumeData.personal.name}'s professional profile - ${resumeData.personal.title}`;

  const generatePDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${resumeData.personal.name} - CV</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.5; color: #333; padding: 30px; }
          h1 { font-size: 28px; color: #1e40af; margin-bottom: 5px; }
          .title { font-size: 14px; color: #64748b; margin-bottom: 15px; line-height: 1.6; }
          h2 { font-size: 20px; color: #1e40af; margin-top: 25px; margin-bottom: 12px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
          h3 { font-size: 16px; color: #1e40af; margin-top: 15px; margin-bottom: 8px; }
          .contact { margin-bottom: 20px; font-size: 13px; }
          .contact p { margin: 3px 0; }
          .summary { background: #f1f5f9; padding: 15px; border-left: 4px solid #3b82f6; margin-bottom: 20px; font-size: 14px; }
          .experience-item { margin-bottom: 20px; page-break-inside: avoid; }
          .company { color: #2563eb; font-weight: bold; font-size: 14px; }
          .period { color: #64748b; font-size: 13px; margin-bottom: 8px; }
          ul { margin-left: 18px; margin-top: 8px; }
          li { margin-bottom: 4px; font-size: 13px; }
          .tech-tag { background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 8px; font-size: 11px; margin-right: 4px; display: inline-block; margin-top: 4px; }
          .strength { background: #ecfccb; color: #4d7c0f; padding: 6px 12px; border-radius: 6px; font-size: 12px; margin-right: 6px; display: inline-block; margin-top: 6px; }
          @page { margin: 15mm; }
        </style>
      </head>
      <body>
        <h1>${resumeData.personal.name}</h1>
        <div class="title">${resumeData.personal.title}</div>
        
        <div class="contact">
          <p><strong>Email:</strong> ${resumeData.personal.email} | <strong>Phone:</strong> ${resumeData.personal.phone}</p>
          <p><strong>Location:</strong> ${resumeData.personal.location} | <strong>Website:</strong> ${resumeData.personal.website}</p>
          <p><strong>Languages:</strong> ${resumeData.personal.languages}</p>
        </div>

        <h2>Professional Summary</h2>
        <div class="summary">
          <p>${resumeData.personal.summary}</p>
          <p style="margin-top: 10px;"><em>${resumeData.personal.tagline}</em></p>
        </div>

        <h2>Core Strengths</h2>
        <div>${resumeData.coreStrengths.map(s => `<span class="strength">${s}</span>`).join('')}</div>

        <h2>Professional Experience</h2>
        ${resumeData.experience.map(exp => `
          <div class="experience-item">
            <h3>${exp.title}</h3>
            <div class="company">${exp.company}</div>
            <div class="period">${exp.period}</div>
            <ul>${exp.description.map(desc => `<li>${desc}</li>`).join('')}</ul>
            ${exp.technologies ? `<div style="margin-top: 8px;">${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>` : ''}
          </div>
        `).join('')}

        <h2>Education</h2>
        ${resumeData.education.map(edu => `
          <div style="margin-bottom: 12px;">
            <h3>${edu.degree}</h3>
            <div class="company">${edu.institution}</div>
            <div class="period">${edu.period}</div>
            ${edu.details ? `<p style="font-size: 13px;">${edu.details}</p>` : ''}
          </div>
        `).join('')}

        <h2>Certifications</h2>
        <ul>${resumeData.certificates.map(cert => `<li>${cert.name} (${cert.year})</li>`).join('')}</ul>

        <h2>Technical Expertise</h2>
        ${resumeData.skills.slice(0, 4).map(skill => `
          <div style="margin-bottom: 10px;">
            <h3>${skill.category}</h3>
            <div>${skill.items.map(item => `<span class="tech-tag">${item}</span>`).join('')}</div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const sections = [
    { id: 'about', label: 'About', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'entrepreneurial', label: 'Projects', icon: Rocket },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: Award }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.classes.gradient}`}>
      <header className={`${theme.classes.headerBg} backdrop-blur-sm shadow-xl sticky top-0 z-50 border-b ${theme.classes.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${theme.classes.text}`}>{resumeData.personal.name}</h1>
                <p className="text-xs text-blue-400 hidden sm:block">{resumeData.personal.yearsExperience} Years Experience</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="bg-slate-800/80 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hidden sm:block"
              >
                {Object.entries(themes).map(([key, t]) => (
                  <option key={key} value={key}>{t.name}</option>
                ))}
              </select>

              <button
                onClick={generatePDF}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg font-medium"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">CV</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                {showShareMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)}></div>
                    <div className="absolute right-0 mt-2 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 p-4 w-48 z-50">
                      <div className="space-y-2">
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-blue-600/20 rounded-lg transition-all">
                          <Linkedin className="w-5 h-5" />
                          <span>LinkedIn</span>
                        </a>
                        <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer"
                           className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-green-600/20 rounded-lg transition-all">
                          <Phone className="w-5 h-5" />
                          <span>WhatsApp</span>
                        </a>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                           className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-blue-600/20 rounded-lg transition-all">
                          <Facebook className="w-5 h-5" />
                          <span>Facebook</span>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                           className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-blue-400/20 rounded-lg transition-all">
                          <Twitter className="w-5 h-5" />
                          <span>Twitter</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-white hover:bg-slate-700 rounded-lg transition-all"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {showMobileMenu && (
            <nav className="pb-4 space-y-2">
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="w-full bg-slate-800/80 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer sm:hidden mb-2"
              >
                {Object.entries(themes).map(([key, t]) => (
                  <option key={key} value={key}>{t.name}</option>
                ))}
              </select>
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all font-medium ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <div className={`${theme.classes.cardBg} backdrop-blur-sm rounded-2xl shadow-2xl p-6 sticky top-24 border ${theme.classes.border}`}>
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {resumeData.personal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className={`text-2xl font-bold ${theme.classes.text} mb-2`}>{resumeData.personal.name}</h2>
                <p className="text-blue-400 font-medium text-sm mb-3 leading-relaxed px-2">{resumeData.personal.title}</p>
                <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full">
                  <p className="text-blue-300 font-bold">{resumeData.personal.yearsExperience} Years Experience</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs break-all">{resumeData.personal.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs">{resumeData.personal.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs">{resumeData.personal.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href={`https://${resumeData.personal.website}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-blue-400">{resumeData.personal.website}</a>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs">{resumeData.personal.languages}</span>
                </div>
              </div>

              <div className={`mt-6 pt-6 border-t ${theme.classes.border}`}>
                <h3 className={`text-lg font-bold ${theme.classes.text} mb-4 flex items-center`}>
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Specializations
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300 font-medium">DevSecOps</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2">
                    <Cloud className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300 font-medium">Cloud Security</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2">
                    <Lock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300 font-medium">ISO 27001</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2">
                    <Rocket className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300 font-medium">AI Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <div className={`${theme.classes.cardBg} backdrop-blur-sm rounded-2xl shadow-2xl p-8 border ${theme.classes.border}`}>
              {activeSection === 'about' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                    <h2 className={`text-2xl font-bold ${theme.classes.text}`}>About Me</h2>
                  </div>
                  <div className="space-y-4">
                    <p className={`${theme.classes.textSecondary} leading-relaxed`}>
                      {resumeData.personal.summary}
                    </p>
                    <p className={`${theme.classes.textSecondary} leading-relaxed italic`}>
                      {resumeData.personal.tagline}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className={`text-xl font-bold ${theme.classes.text} mb-4`}>Core Strengths</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {resumeData.coreStrengths.map((strength, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-blue-600/10 border border-blue-500/30 rounded-lg px-4 py-2">
                          <span className={`${theme.classes.textSecondary} text-sm`}>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                    <h2 className={`text-2xl font-bold ${theme.classes.text}`}>Professional Experience</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-4 bg-slate-700/30 rounded-r-lg p-4">
                        <h3 className={`text-xl font-bold ${theme.classes.text}`}>{exp.title}</h3>
                        <p className="text-blue-400 font-medium">{exp.company}</p>
                        <p className="text-slate-400 text-sm mb-3">{exp.period}</p>
                        <ul className="space-y-2 mb-3">
                          {exp.description.map((item, i) => (
                            <li key={i} className={`${theme.classes.textSecondary} flex items-start text-sm`}>
                              <span className="text-blue-400 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs rounded-full font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'entrepreneurial' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Rocket className="w-6 h-6 text-blue-400" />
                    <h2 className={`text-2xl font-bold ${theme.classes.text}`}>Entrepreneurial Projects</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.entrepreneurialProjects.map((project, idx) => (
                      <div key={idx} className="border-l-4 border-purple-500 pl-4 bg-purple-900/20 rounded-r-lg p-4">
                        <h3 className={`text-xl font-bold ${theme.classes.text}`}>{project.title}</h3>
                        <p className="text-purple-400 font-medium mb-2">{project.role}</p>
                        <p className={`${theme.classes.textSecondary} italic mb-3 text-sm`}>{project.description}</p>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, i) => (
                            <li key={i} className={`${theme.classes.textSecondary} flex items-start text-sm`}>
                              <span className="text-purple-400 mr-2">✦</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className={`text-xl font-bold ${theme.classes.text} mb-4`}>Leadership Qualities</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.leadershipQualities.map((quality, idx) => (
                        <span key={idx} className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-lg font-medium text-sm">
                          {quality}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className={`text-xl font-bold ${theme.classes.text} mb-4`}>Professional Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.professionalInterests.map((interest, idx) => (
                        <span key={idx} className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-lg font-medium text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'education' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                    <h2 className={`text-2xl font-bold ${theme.classes.text}`}>Education</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="border-l-4 border-green-500 pl-4 bg-green-900/20 rounded-r-lg p-4">
                        <h3 className={`text-xl font-bold ${theme.classes.text}`}>{edu.degree}</h3>
                        <p className="text-green-400 font-medium">{edu.institution}</p>
                        <p className="text-slate-400 text-sm">{edu.period}</p>
                        {edu.details && <p className={`${theme.classes.textSecondary} mt-2 text-sm`}>{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'skills' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Code className="w-6 h-6 text-blue-400" />
                    <h2 className={`text-2xl font-bold ${theme.classes.text}`}>Technical Expertise</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.skills.map((skill, idx) => (
                      <div key={idx}>
                        <h3 className={`text-lg font-bold ${theme.classes.text} mb-3`}>{skill.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {skill.items.map((item, i) => (
                            <span key={i} className="px-3 py-2 bg-slate-700/50 text-slate-200 rounded-lg font-medium hover:bg-blue-600/30 transition-all border border-slate-600 text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'certificates' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Award className="w-6 h-6 text-blue-400" />
                    <h2 className={`text-2xl font-bold ${theme.classes.text}`}>Certifications</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.certificates.map((cert, idx) => (
                      <div key={idx} className="border border-slate-600 rounded-xl p-4 hover:shadow-lg transition-all bg-slate-700/30 hover:border-blue-500/50">
                        <div className="flex items-start space-x-3">
                          <Award className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className={`font-bold ${theme.classes.text} text-sm`}>{cert.name}</h3>
                            <p className="text-slate-400 text-xs mt-1">{cert.year}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900/80 border-t border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-400">
          <p>© 2025 {resumeData.personal.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Resume;

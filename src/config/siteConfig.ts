// ============================================================================
// SITE CONFIGURATION — Single Source of Truth
// ============================================================================
// Edit values in this file to update the site. No component changes needed.
// Replace anything in [BRACKETS] with your real business information.
// ============================================================================

export const siteConfig = {
  // ---- Brand ----
  companyName: 'ALPHA-24',
  tagline: 'Smarter Financial Decisions. Built Around Your Goals.',
  description:
    'We provide professional financial and market-related services designed around your goals, preferences and long-term plans.',
  location: 'Vadodara, Gujarat',

  // ---- Contact ----
  contactPerson: 'Team',
  phoneDisplay: '9619011555',
  phoneTel: '+919619011555',
  // WhatsApp number in international format WITHOUT plus or spaces
  whatsappNumber: '919619011555',
  whatsappMessage:
    'Hello Team, I would like to know more about ALPHA-24\'s financial services.',
  email: 'supportalpha24@gmail.com',
  address: 'Amarnath Society , Canal RD , Near Randal Mata Temple, New Sama , Vadodara , Gujarat , 390024',

  // ---- Social Links (leave as null to hide) ----
  socialLinks: {
    linkedin: null as string | null,
    twitter: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
  },

  // ---- Legal placeholders (do not invent real text) ----
  legal: {
    privacyPolicy: '[Insert Privacy Policy text here]',
    terms: '[Insert Terms & Conditions text here]',
    riskDisclosure:
      'Investments in securities markets are subject to market risks. Read all related documents carefully before investing. Past performance is not indicative of future results. ALPHA-24 does not guarantee any specific returns or outcomes. Please consult a qualified and registered financial advisor before making investment decisions. This website is for informational purposes only and does not constitute investment advice or an offer to buy or sell securities.',
    // Regulatory placeholders — shown only when populated
    sebiRegistration: null as string | null,
  },

  // ---- SEO ----
  seo: {
    title: 'ALPHA-24 — Professional Financial Services',
    description:
      'ALPHA-24 offers professional financial and market-related services including stock broking, investment planning, mutual funds, algo trading and portfolio services in Vadodara, Gujarat.',
    siteUrl: 'https://aalpha24.netlify.app',
    ogImage: '/og-image.png',
    themeColor: '#1d4ed8', // Updated to match primary-700
  },

  // ---- Navigation ----
  navItems: [
    { label: 'Home',     href: '#home'         },
    { label: 'About',    href: '#about'        },
    { label: 'Services', href: '#services'     },
    { label: 'Why Us',   href: '#why-us'       },
    { label: 'Process',  href: '#how-it-works' },
    { label: 'FAQ',      href: '#faq'          },
    { label: 'Contact',  href: '#contact'      },
  ],

  // ---- Hero ----
  hero: {
    heading: 'Smarter Financial Decisions. Built Around Your Goals.',
    subheading:
      'Explore professional financial and market-related services designed around your goals, preferences and long-term plans.',
    primaryCta: { label: 'Enquire Now',  target: '#contact' },
    secondaryCta: { label: 'Talk to Us', target: '#contact' },
    imageAlt: 'Professional Indian financial advisor discussing investment plans with a client',
  },

  // ---- Trust Strip ----
  trustItems: [
    {
      icon: 'UserCheck',
      title: 'Personalized Approach',
      description: 'Services tailored to your individual goals.',
    },
    {
      icon: 'MessageSquareText',
      title: 'Transparent Communication',
      description: 'Clear, honest guidance at every step.',
    },
    {
      icon: 'Cpu',
      title: 'Technology Enabled',
      description: 'Modern tools for informed decision-making.',
    },
    {
      icon: 'Handshake',
      title: 'Long-Term Client Focus',
      description: 'Relationships built on trust and continuity.',
    },
  ],

  // ---- About ----
  about: {
    heading: 'About Us',
    subheading: 'Helping You Navigate Financial Markets With Clarity',
    paragraphs: [
      'At ALPHA-24, we focus on understanding each client\'s unique financial goals and preferences. Our approach centers on personalized assistance rather than one-size-fits-all solutions.',
      'We combine a client-focused service philosophy with modern technology and clear communication to help you navigate financial markets with greater confidence.',
      'Our commitment is to building long-term relationships — staying engaged with your journey as markets evolve and your needs grow over time.',
    ],
    imageAlt: 'Modern Indian corporate office with financial planning workspace',
  },

  // ---- Services ----
  services: [
    {
      icon: 'TrendingUp',
      title: 'Stock Broking',
      description:
        'Access market-related services and trading support through our brokerage ecosystem.',
    },
    {
      icon: 'Target',
      title: 'Investment Planning',
      description:
        'Structured guidance designed around individual financial goals and preferences.',
    },
    {
      icon: 'PieChart',
      title: 'Mutual Funds',
      description:
        'Explore mutual fund opportunities aligned with your objectives and risk considerations.',
    },
    {
      icon: 'Bot',
      title: 'Algo Trading',
      description:
        'Technology-driven trading solutions designed around systematic strategies and market analysis.',
    },
    {
      icon: 'Briefcase',
      title: 'Portfolio / Wealth Services',
      description:
        'Personalized approaches for clients seeking structured portfolio and wealth-related services.',
    },
    {
      icon: 'Headset',
      title: 'Market & Trading Support',
      description:
        'Practical assistance and market-related support for clients navigating financial markets.',
    },
  ],

  // ---- Why Choose Us ----
  whyChooseUs: {
    heading: 'Why Work With Us',
    subheading: 'What sets our approach apart',
    points: [
      {
        icon: 'UserRound',
        title: 'Personalized Service',
        description: 'Every client receives attention tailored to their specific situation.',
      },
      {
        icon: 'Eye',
        title: 'Transparent Communication',
        description: 'We keep you informed with clear, straightforward explanations.',
      },
      {
        icon: 'Smartphone',
        title: 'Technology Driven',
        description: 'Modern platforms and tools that keep you connected and informed.',
      },
      {
        icon: 'HeartHandshake',
        title: 'Client-Centric Approach',
        description: 'Your goals and comfort guide every recommendation we make.',
      },
      {
        icon: 'LineChart',
        title: 'Market Awareness',
        description: 'We stay attuned to market developments to serve you better.',
      },
      {
        icon: 'Users',
        title: 'Long-Term Relationship',
        description: 'We invest in relationships that grow with your financial journey.',
      },
    ],
  },

  // ---- How It Works ----
  howItWorks: {
    heading: 'How It Works',
    subheading: 'A simple, transparent process to get started',
    steps: [
      {
        number: '01',
        title: 'Share Your Requirement',
        description: 'Tell us about your financial goals and what you\'re looking for.',
      },
      {
        number: '02',
        title: 'Connect With Our Team',
        description: 'We\'ll reach out to understand your needs in more detail.',
      },
      {
        number: '03',
        title: 'Understand Your Options',
        description: 'We walk you through relevant services and how they may align.',
      },
      {
        number: '04',
        title: 'Get Started',
        description: 'Begin your journey with structured, ongoing support.',
      },
    ],
  },

  // ---- Enquiry Form ----
  enquiryForm: {
    heading: "Let's Start a Conversation",
    subheading: 'Get In Touch',
    interestedInOptions: [
      'Stock Broking',
      'Investment Planning',
      'Mutual Funds',
      'Algo Trading',
      'Portfolio / Wealth Services',
      'Market & Trading Support',
      'Other',
    ],
    maxMessageLength: 500,
    privacyNotice:
      'Your information is used only to respond to your enquiry and provide relevant assistance.',
  },

  // ---- Footer ----
  footer: {
    description:
      'Professional financial and market-related services designed around your goals, preferences and long-term plans.',
    quickLinks: [
      { label: 'Home',     href: '#home'         },
      { label: 'About',    href: '#about'        },
      { label: 'Services', href: '#services'     },
      { label: 'Why Us',   href: '#why-us'       },
      { label: 'Process',  href: '#how-it-works' },
      { label: 'FAQ',      href: '#faq'          },
      { label: 'Contact',  href: '#contact'      },
    ],
    legalLinks: [
      { label: 'Privacy Policy',    key: 'privacyPolicy'  },
      { label: 'Terms & Conditions', key: 'terms'          },
      { label: 'Risk Disclosure',   key: 'riskDisclosure' },
    ],
  },
} as const;

// ---- Derived helpers ----

export function getWhatsAppUrl(): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappMessage,
  )}`;
}

export function getTelUrl(): string {
  return `tel:${siteConfig.phoneTel}`;
}

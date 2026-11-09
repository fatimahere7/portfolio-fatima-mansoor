export interface FooterNavItem {
  label: string;
  target: string;
  index: string;
}

export interface FooterSocialItem {
  label: string;
  href: string;
  handle?: string;
}

export interface FooterConfig {
  marker: string;
  statement: {
    line1: string;
    line2: string;
    line3: string;
    accent: string;
    annotation: string;
  };
  navigation: FooterNavItem[];
  socials: FooterSocialItem[];
  status: {
    label: string;
    state: string;
    code: string;
  };
  metadata: {
    copyright: string;
    specification: string;
    timezone: string;
    coordinates: string;
  };
}

export const FOOTER_DATA: FooterConfig = {
  marker: '06 — END',
  statement: {
    line1: 'BUILD.',
    line2: 'DIGITAL',
    line3: 'SYSTEMS.',
    accent: 'SYSTEMS.',
    annotation: 'ENGINEERED FOR HIGH ASSURANCE & LOW LATENCY',
  },
  navigation: [
    { label: 'ABOUT', target: '#about', index: '01' },
    { label: 'WORK', target: '#work', index: '02' },
    { label: 'EXPERIENCE', target: '#experience', index: '03' },
    { label: 'STACK', target: '#stack', index: '04' },
    { label: 'CONTACT', target: '#contact', index: '05' },
  ],
  socials: [
    { label: 'GITHUB ↗', href: 'https://github.com/fatimahere7', handle: 'REPOSITORY ARCHIVE' },
    { label: 'LINKEDIN ↗', href: 'https://www.linkedin.com/in/fatima-mansoor-129104285/', handle: 'PROFESSIONAL NETWORK' },
    { label: 'EMAIL ↗', href: 'mailto:fatimamansoor529@gmail.com', handle: 'DIRECT TRANSMISSION' },
  ],
  status: {
    label: 'SYSTEM STATUS',
    state: 'ONLINE',
    code: '200 OK',
  },
  metadata: {
    copyright: '© 2026 // PORTFOLIO SYSTEM',
    specification: 'BUILT WITH CODE + CURIOSITY',
    timezone: 'LOCAL TIME // UTC+05:00',
    coordinates: '31.5204° N · 74.3587° E',
  },
};

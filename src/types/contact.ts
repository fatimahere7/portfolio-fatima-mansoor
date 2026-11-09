export interface SocialLinkItem {
  id: string;
  name: string;
  label: string;
  href: string;
  handle?: string;
  index: string;
}

export interface ContactData {
  email: string;
  availability: string;
  location: string;
  coordinates: string;
  timezone: string;
  status: string;
  socials: SocialLinkItem[];
}

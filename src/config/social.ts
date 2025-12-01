import { Facebook, Instagram, Youtube, Twitter, Linkedin, Mail } from 'lucide-react';

/**
 * Social Media Configuration
 * 
 * Update the URLs below with your actual social media accounts:
 * - personal: Your personal/main social accounts (shown in footer)
 * - photography: Your photography business accounts (shown on Photography page)
 * - workshop: Your workshop/3D printing accounts (shown on Workshop page)
 * 
 * To add more platforms:
 * 1. Import the icon from 'lucide-react'
 * 2. Add the platform to SocialPlatform type
 * 3. Add links to the relevant account type below
 */

export type SocialPlatform = 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'email';
export type AccountType = 'personal' | 'photography' | 'workshop';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
  icon: typeof Facebook;
}

export interface SocialAccount {
  type: AccountType;
  links: SocialLink[];
}

export const socialAccounts: SocialAccount[] = [
  {
    type: 'personal',
    links: [
      {
        platform: 'facebook',
        url: 'https://facebook.com/your-personal-profile',
        label: 'Facebook',
        icon: Facebook
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/your-personal',
        label: 'Instagram',
        icon: Instagram
      },
      {
        platform: 'email',
        url: 'mailto:kontakt@charvy.cz',
        label: 'Email',
        icon: Mail
      }
    ]
  },
  {
    type: 'photography',
    links: [
      {
        platform: 'facebook',
        url: 'https://facebook.com/your-photography',
        label: 'Photography Facebook',
        icon: Facebook
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/your-photography',
        label: 'Photography Instagram',
        icon: Instagram
      }
    ]
  },
  {
    type: 'workshop',
    links: [
      {
        platform: 'facebook',
        url: 'https://facebook.com/your-workshop',
        label: 'Workshop Facebook',
        icon: Facebook
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/your-workshop',
        label: 'Workshop Instagram',
        icon: Instagram
      }
    ]
  }
];

export const getSocialLinks = (type: AccountType): SocialLink[] => {
  const account = socialAccounts.find(acc => acc.type === type);
  return account?.links || [];
};

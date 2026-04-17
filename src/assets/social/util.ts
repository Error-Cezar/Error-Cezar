import Github from '@/assets/social/github.svg';
import Website from '@/assets/social/website.svg';
import Discord from '@/assets/social/discord.svg';

import type { ImageMetadata } from 'astro';
import type { SvgComponent } from 'astro/types';

export const socialMediaIcons = {
  github: Github,
  website: Website,
  discord: Discord,
} satisfies Record<string, SvgComponent & ImageMetadata>;

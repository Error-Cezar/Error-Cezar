import type { SvgComponent } from 'astro/types';
import type { ImageMetadata } from 'astro';

import Roblox from '@/assets/icons/roblox.svg';
import Typescript from '@/assets/icons/typescript.svg';
import Python from '@/assets/icons/python.svg';
import Javascript from '@/assets/icons/javascript.svg';
import Luau from '@/assets/icons/luau.svg';
type Skill = {
  name: string;
  icon: SvgComponent & ImageMetadata;
};

export const skills = [
  {
    name: 'Typescript',
    icon: Typescript,
  },
  {
    name: 'Roblox',
    icon: Roblox,
  },
  {
    name: 'Python',
    icon: Python,
  },
  {
    name: 'JavaScript',
    icon: Javascript,
  },
  {
    name: 'Luau',
    icon: Luau,
  },
] as Skill[];

import {
  siDiscord,
  siGithub,
  siKofi,
  siLastdotfm,
  siSteam,
} from "simple-icons";

type SimpleIcon = {
  svg: string;
  title: string;
};

type Social = {
  name: string;
  icon: SimpleIcon;
  link: string;
};

export const socials: Social[] = [
  {
    name: "Discord",
    icon: siDiscord,
    link: "https://discord.com/users/362991657236561923",
  },
  {
    name: "Github",
    icon: siGithub,
    link: "https://github.com/Error-Cezar",
  },
  {
    name: "Steam",
    icon: siSteam,
    link: "https://steamcommunity.com/profiles/76561199191273742/",
  },
  {
    name: "KoFi",
    icon: siKofi,
    link: "https://ko-fi.com/errorcezar",
  },
  {
    name: "lastFM",
    icon: siLastdotfm,
    link: "https://www.last.fm/user/ErrorCezar",
  },
];

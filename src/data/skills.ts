import {
  siTypescript,
  siPython,
  siJavascript,
  siLuau,
  siLinux,
} from "simple-icons";

type SimpleIcon = {
  svg: string;
  title: string;
};

type Skill = {
  name: string;
  icon: SimpleIcon | any;
};

export const skills: Skill[] = [
  {
    name: "TypeScript",
    icon: siTypescript,
  },
  {
    name: "Python",
    icon: siPython,
  },
  {
    name: "JavaScript",
    icon: siJavascript,
  },
  {
    name: "Luau",
    icon: siLuau,
  },
  {
    name: "Linux",
    icon: siLinux,
  },
];

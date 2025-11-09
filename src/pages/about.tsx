import { body_el } from "./components/about/body/body";
import { AboutLayout } from "./components/about/layout";

export const About = () => {
  return <AboutLayout title={"meow"}>{body_el()}</AboutLayout>;
};

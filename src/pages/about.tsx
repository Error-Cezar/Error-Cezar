import { body_el } from "../components/about/body/body";
import { AboutLayout } from "../components/about_layout";

export const About = () => {
  return <AboutLayout title={"meow"}>{body_el()}</AboutLayout>;
};

import { body_el } from "./components/projects/body/body";
import { ProjectsLayout } from "./components/projects/layout";

export const Projects = () => {
  return <ProjectsLayout title={"meow"}>{body_el()}</ProjectsLayout>;
};

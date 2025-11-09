import { background } from "./content/elements/background";
import { box } from "./content/elements/box";
import { navbar } from "../../../shared/navbar";
import { terminal } from "./content/elements/terminal";

export const body_el = (visitCount: number) => {
  return (
    <>
      {terminal()}
      {background()}
      {navbar()}
      {box(visitCount)}
    </>
  );
};

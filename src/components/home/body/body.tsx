import { background } from "./body_elements/background";
import { box } from "./body_elements/box";
import { navbar } from "./body_elements/navbar";
import { terminal } from "./body_elements/terminal";

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

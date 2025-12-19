import { header } from "./elements/header";
import { navbar } from "../../../shared/navbar";

export const body_el = () => {
  return (
    <>
      {navbar()}
      {header()}
    </>
  );
};

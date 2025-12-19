import { navbar } from "../../../shared/navbar";

export const body_el = (Content: {
  Name: string;
  Description: string;
  Content: string;
  Author: string;
  published: string;
  edited?: string;
}) => {
  return (
    <>
      {navbar()}
    </>
  );
};

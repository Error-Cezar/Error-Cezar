import { content } from "./content";

export const header = () => {
  return (
    <>
      <div class="parent container h-100 d-flex flex-column justify-content-center">
        <h1 class="cover-heading" id="name">
          Cool Stuff I Made
        </h1>
        <div id="description">
          <p class="lead font-italic">
            A list of stuff that I made overtime, enjoy your stay !
          </p>
        </div>
        {content()}
      </div>
    </>
  );
};

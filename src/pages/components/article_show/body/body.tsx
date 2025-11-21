import { navbar } from "../../../shared/navbar";

export const body_el = (Content: {
  Title: string;
  Description: string;
  Content: string;
  Author: string;
  DatePublished: string;
  DateEdited?: string;
}) => {
  return (
    <>
      {navbar()}
      <div className="container py-4">
        {/* Top Section: Title and Description */}
        <div className="text-center mb-4">
          <h1 className="display-4">{Content.Title}</h1>
          <p className="text-muted">{Content.Description}</p>
        </div>

        {/* Middle Section: Content */}
        <div className="my-5">
          <md-block className="lead">{Content.Content}</md-block>
        </div>

        {/* Bottom Section: Metadata */}
        <div className="text-center text-muted">
          <p>
            <strong>Author:</strong> {Content.Author}
          </p>
          <p>
            <strong>Date Published:</strong> {Content.DatePublished}
          </p>
          {Content.DateEdited && (
            <p>
              <strong>Date Edited:</strong> {Content.DateEdited}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

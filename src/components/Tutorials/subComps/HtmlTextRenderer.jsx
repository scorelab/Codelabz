import React from "react";

const HtmlTextRenderer = ({ html = "<p>Html Text Renderer</p>" }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlTextRenderer;

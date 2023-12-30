import React from "react";
import DOMPurify from "dompurify";

const HtmlTextRenderer = ({ html = "<p>Html Text Renderer</p>" }) => {
  // used to remove any sensitive tags like <script> which might me malicious
  const sanitizedHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default HtmlTextRenderer;

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import React from 'react'


const RichTextRenderer = ({ delta }) => {
    // Renders rich text from quill
    var config = {};
    var converter = new QuillDeltaToHtmlConverter(delta, config);
  
    var html = converter.convert();
  
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

export default RichTextRenderer
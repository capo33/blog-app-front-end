import React from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "../../utils/index";

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme='snow'
      style={{ border: "1px solid #e2e8f0" }}
      modules={modules}
      formats={formats}
      placeholder='Write something amazing...'
    />
  );
};

export default Editor;

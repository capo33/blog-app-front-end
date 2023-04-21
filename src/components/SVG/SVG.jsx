import React from "react";

const SVG = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={props.className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d={props.d}
    />
  </svg>
);

export default SVG;

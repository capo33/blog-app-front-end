import React from "react";
import SVG from "../SVG/SVG";

const Input = (props) => {
  return (
    <div className='flex items-center border-2 py-2 px-3 rounded w-80 mb-4'>
      <SVG className='h-5 w-5 text-gray-500' d={props.d} />
      <input
        className='pl-2 outline-none border-none'
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;

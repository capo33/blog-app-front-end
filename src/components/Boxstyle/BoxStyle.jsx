import React from "react";

const BoxStyle = () => {
  return (
    <div className='relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-slate-800 to-stone-300 i justify-around items-center hidden'>
      <div>
        <h1 className='text-white font-bold text-4xl font-sans'>Enjoy</h1>
      </div>
      <div className='absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8'></div>
      <div className='absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8'></div>
      <div className='absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8'></div>
      <div className='absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8'></div>
    </div>
  );
};

export default BoxStyle;

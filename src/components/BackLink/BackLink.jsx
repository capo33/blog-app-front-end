import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const BackLink = ({ link, name }) => {
  return (
    <Link
      to={link}
      className='flex items-center text-blue-500 hover:underline m-2'
    >
      <HiArrowNarrowLeft className='inline-block m-1' />
      Back to {name}
    </Link>
  );
};

export default BackLink;

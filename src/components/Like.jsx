import React from 'react'
import { MdOutlineThumbUpOffAlt, MdThumbUpAlt } from 'react-icons/md';

const Like = ({likes, auth}) => {
  if (likes?.length > 0) {
    return likes?.find((like) => like === auth?.user?._id) ? (
      <>
        <MdThumbUpAlt className='text-blue-500' />
        &nbsp;
        {likes?.length > 2 ? (
          <span>&nbsp;{likes?.length} Likes</span>
        ) : (
          `${likes?.length} Like${likes?.length > 1 ? "s" : ""}`
        )}
      </>
    ) : (
      <>
        <MdOutlineThumbUpOffAlt className='text-blue-500' />
        &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
      </>
    );
  }
  return (
    <>
      <MdOutlineThumbUpOffAlt className='text-blue-500' />
      <span> &nbsp;Like</span>
    </>
  );
};

export default Like;
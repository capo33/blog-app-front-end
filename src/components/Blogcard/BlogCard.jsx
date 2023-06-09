import React from "react";
import { Link } from "react-router-dom";

import { uperCaseFirstLetter, formatDate, subStringFunc } from "../../utils";

const BlogCard = ({
  _id,
  createdAt,
  description,
  likes,
  photo,
  title,
  author,
  views,
}) => {
  return (
    <>
      <div key={_id}>
        <div className='flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100'>
          <Link to={`/blog-details/${_id}`}>
            <div className='flex space-x-4'>
              <img
                alt='avatar'
                src={
                  author?.avatar
                    // ? `http://localhost:5000/uploads/${author?.avatar}`
                    ? `https://corner-blog-api.onrender.com/uploads/${author?.avatar}`
                    : "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                }
                className='object-cover w-12 h-12 mb-2 rounded-full shadow dark:bg-gray-500'
              />

              <div className='flex flex-col space-y-1'>
                <span className='text-sm font-semibold'>
                  {author?.name
                    ? uperCaseFirstLetter(author?.name)
                    : "Anonymous"}
                </span>
                <span className='text-xs dark:text-gray-400'>
                  <time>{formatDate(createdAt)}</time>
                </span>
              </div>
            </div>
            <div>
              <img
                src={
                  photo
                    // ? `http://localhost:5000/uploads/${photo} `
                    ? `https://corner-blog-api.onrender.com/uploads/${photo} `
                    : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                }
                alt='cards'
                className='object-cover w-full mb-4 h-60 sm:h-72 dark:bg-gray-500'
              />

              <h2 className='mb-1 text-xl font-semibold'>{title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: subStringFunc(description, 40),
                }}
                className='text-sm dark:text-gray-400'
              />
            </div>
          </Link>
          <div className='flex flex-wrap justify-between'>
            <div className='space-x-2'>
              <button type='button' className='p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='w-4 h-4 fill-current dark:text-violet-400'
                >
                  <path d='M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z' />
                </svg>
              </button>
            </div>
            <div className='flex space-x-2 text-sm dark:text-gray-400'>
              {/* Comments - comming soon */}
              {/* <button
                type='button'
                className='flex items-center p-1 space-x-1.5'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  aria-label='Number of comments'
                  className='w-4 h-4 fill-current dark:text-violet-400'
                >
                  <path d='M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z' />
                  <path d='M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z' />
                </svg>
                <span>0</span>
                </button> */}

              {/* Views */}
              <button
                type='button'
                className='flex items-center p-1 space-x-1.5'
              >
                <span>
                  {views ? views : 0} {views === 1 ? "view" : "views"}
                </span>
              </button>
              {/* Likes */}
              <span className='flex items-center p-1 space-x-1.5'>
                {likes?.length} {likes?.length === 1 ? "like" : "likes"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;

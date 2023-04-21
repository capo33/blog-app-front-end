import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section className='dark:bg-gray-800 dark:text-gray-100 mt-10'>
      <div className='container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12'>
        <Link
          to='/'
          className='block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900'
        >
          <img
            src='https://source.unsplash.com/random/480x360'
            alt=''
            className='object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500'
          />
          <div className='p-6 space-y-2 lg:col-span-5'>
            <h3 className='text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline'>
              Sample Blog Post
            </h3>
            <span className='text-xs dark:text-gray-400'>
              February 19, 2021
            </span>
            <p>
              This is a sample blog post. It will be displayed differently if
              the post has a featured
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Main;

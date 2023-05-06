import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBlogs } from "../../features/blogs/blogSlice";
import BlogCard from "../../components/Blogcard/BlogCard";
import Spinner from "../../components/Spinner/Spinner";

const Section = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const { isLoading } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  if (blogs?.length === 0)
    return <h1 className='text-center text-2xl'>No blogs found</h1>;

  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className=''>
          <div className='grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3'>
            {blogs?.length > 0 &&
              blogs?.map((blog) => <BlogCard key={blog?._id} {...blog}  />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Section;

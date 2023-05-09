import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import {
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
} from "../../features/blogs/blogSlice";
import Like from "../../components/Like";
import Modal from "../../components/Modal/Modal";
import { formatDate } from "../../utils";
import { getAllCategories } from "../../features/category/categorySlice";
import BackLink from "../../components/BackLink/BackLink";

const BlogDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const auth = useSelector((state) => state?.auth?.user);
  const blog = useSelector((state) => state?.blogs?.blog);
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const categories = useSelector(
    (state) => state?.categories?.categories?.data
  );
  const { id } = useParams();

  const category = categories?.find((cat) => cat._id === blog?.category);
  const likes = blogs?.find((blog) => blog._id === id)?.likes;

  const data = {
    token: auth?.token,
    userId: auth?.user?._id,
    blogUserId: blog?.author?._id,
    blogId: blog?._id,
    title: blog?.title,
    avatar: blog?.author?.avatar,
    description: blog?.description,
    username: blog?.author?.name,
    createdAt: blog?.createdAt,
    likes: blog?.likes,
    tags: blog?.tags,
  };

  console.log(blog?.photo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleBlog(id));
    dispatch(getAllCategories());
    dispatch(getAllBlogs());
  }, [dispatch, id]);

  const handleDeleteBlog = async () => {
    dispatch(deleteBlog({ id, token: data?.token, toast, navigate }));
  };
  const handleConfirmDelete = () => {
    setShowModal((prev) => !prev);
  };

  const handleLikePost = async () => {
    dispatch(likeBlog({ _id: data?.blogId, token: data?.token }));
  };

  return (
    <>
      <main className='mt-10'>
        {showModal ? (
          <>
            <Modal
              setShowModal={setShowModal}
              handleDelete={handleDeleteBlog}
              value='blog'
            />
          </>
        ) : null}

        <BackLink link='/' name='Home' />
        <div
          className='mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative'
          style={{ height: "24em" }}
        >
          <div
            className='absolute left-0 bottom-0 w-full h-full z-10'
            style={{
              backgroundImage:
                "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
            }}
          />
          <img
            src={
              blog?.photo?.includes("undefined")
                ? "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                // : `http://localhost:5000/uploads/${blog?.photo}`
                : `https://corner-blog-api.onrender.com/uploads/${blog?.photo}`
            }
            className='absolute left-0 top-0 w-full h-full z-0 object-cover'
            alt={blog?.title}
          />

          <div className='p-4 absolute bottom-0 left-0 z-20'>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              {category?.name ? category?.name : "No Category"}
            </span>
            <h2 className='text-4xl font-semibold text-gray-100 leading-tight'>
              {data?.title ? data?.title : "No Title"}
            </h2>
            <div className='flex mt-3'>
              <img
                src={
                  data?.avatar
                    // ? `http://localhost:5000/uploads/${data?.avatar}`
                    ? `https://corner-blog-api.onrender.com/uploads/${data?.avatar}`
                    : "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                }
                className='h-10 w-10 rounded-full mr-2 object-cover'
                alt={data?.userId?.name}
              />
              <div>
                <p className='font-semibold text-gray-200 text-sm'>
                  {data?.username ? data?.username : "Anonymous"}
                </p>
                <p className='font-semibold text-gray-400 text-xs'>
                  {formatDate(data?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Add tags */}
        <div className='px-4 lg:px-0 mt-5 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed flex flex-wrap'>
          {data?.tags?.map((tag, index) => (
            <span
              key={index}
              className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
            >
              #{tag.toLowerCase().replace(/\s/g, " #")}
            </span>
          ))}
        </div>

        <div className='px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
          <p
            className='pb-6'
            dangerouslySetInnerHTML={{
              __html: data?.description ? data?.description : "No Description",
            }}
          />
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <button
                onClick={handleLikePost}
                className='flex items-center text-gray-700 hover:text-gray-900 focus:outline-none'
              >
                <Like likes={likes} auth={auth} />
              </button>
            </div>
            <div className='flex items-center'>
              {data?.userId === data?.blogUserId && data?.blogUserId && (
                <>
                  <Link
                    to={`/update-blog/${blog?._id}`}
                    className='flex items-center text-gray-700 hover:text-gray-900 focus:outline-none'
                  >
                    <AiFillEdit className='h-5 w-5 mr-1' />
                    <span className='text-sm'>Edit</span>
                  </Link>
                  <button
                    onClick={handleConfirmDelete}
                    className='flex items-center text-gray-700 hover:text-gray-900 ml-6 focus:outline-none'
                  >
                    <AiFillDelete className='h-5 w-5 mr-1' />
                    <span className='text-sm'>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogDetails;

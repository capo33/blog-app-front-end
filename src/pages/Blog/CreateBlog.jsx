import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import SVG from "../../components/SVG/SVG";
import { getAllCategories } from "../../features/category/categorySlice";
import { createNewBlog } from "../../features/blogs/blogSlice";
import Editor from "../../components/Editor/Editor";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  const auth = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = auth?.user?.token;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setTags([]);
    setPhoto("");
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      let filename = null;
      if (photo) {
        filename = crypto.randomUUID() + photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);

        await fetch(`http://localhost:5000/upload`, {
          method: "POST",
          body: formData,
        });
      } else {
        return;
      }

      const blogData = {
        title,
        description,
        category: category,
        tags,
        photo: filename,
      };

      if (!title || !description || !category) {
        // setMessage("Please fill all the fields");
        return;
      }

      dispatch(createNewBlog({ blogData, token, toast, navigate }));
      handleReset();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className='p-5 mt-10'>
      <div className='p-8 rounded border border-gray-200'>
        <h1 className='font-medium text-3xl'>New Blog</h1>
        <p className='text-gray-600 mt-6'>
          Add a new blog and share it with the world!
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mt-8 grid  gap-4'>
            <div>
              <label
                htmlFor='title'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Title
              </label>
              <input
                type='text'
                name='title'
                value={title}
                id='name'
                required
                onChange={(e) => setTitle(e.target.value)}
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='Add a title'
              />
            </div>
            {/* {message && <p className='text-red-500'>{message}</p>} */}
            <div>
              <label
                htmlFor='description'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Description
              </label>
                 <Editor
                  value={description}
                  onChange={(newValue) => setDescription(newValue)}
                />
 
              {/* <textarea
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id='description'
                required
                cols={30}
                rows={10}
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='Add a description'
              /> */}
            </div>

            <div>
              <label
                htmlFor='category'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Category
              </label>
              <select
                name='category'
                value={category}
                id='category'
                required
                onChange={(e) => setCategory(e.target.value)}
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='Select a category'
              >
                <option value=''>Select a category</option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category._id}>
                    <>{category?.name}</>
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor='tags'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Tags
              </label>
              <input
                type='text'
                name='tags'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                id='tags'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='Add tags'
              />
            </div>
            {/* Upload image */}
            <div>
              <label
                htmlFor='photo'
                className='flex gap-1 justify-center border bg-transparent rounded-2xl p-2  cursor-pointer text-gray-800'
              >
                <input
                  type='file'
                  name='photo'
                  accept='image/*'
                  className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50'
                  onChange={(e) => setPhoto(e.target.files[0])}
                  id='photo'
                  hidden
                />
                <SVG
                  className='w-6 h-6'
                  d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                />
                {photo ? photo.name : "Upload Image"}
              </label>
            </div>
            {/* {photo && (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(photo)} // we use URL.createObjectURL to create a temporary URL for the image
                      alt={photo.name}
                      height='200px'
                      className='img img-responsive img-thumbnail'
                    />
                  </div>
                )} */}
          </div>

          <div className='space-x-4 mt-8'>
            <button
              type='submit'
              className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50'
            >
              Add Blog
            </button>

            <button
              onClick={handleReset}
              className='py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

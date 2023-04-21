import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  deleteCategory,
  getSingleCategory,
} from "../../features/category/categorySlice";
import { updateCategory } from "../../features/category/categorySlice";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const data = useSelector((state) => state.categories?.category?.category);
  const auth = useSelector((state) => state.auth.user);
  const { slug } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = auth?.token;
  const id = data?._id;

  useEffect(() => {
    if (data) setName(data?.name);
  }, [data]);

  useEffect(() => {
    dispatch(getSingleCategory(slug));
  }, [dispatch, slug]);

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    dispatch(deleteCategory({ id, token, toast, navigate }));
  };
  
  const categoryData = {
    name,
    slug,
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ id, categoryData, token, toast, navigate }));
  };

  return (
    <div className='p-5 mt-10 max-w-md'>
      <div className='p-8 rounded border border-gray-200'>
        <h1 className='font-medium text-3xl'>Update Category</h1>
        <form>
          <div className='mt-8 grid gap-4'>
            <div>
              <label
                htmlFor='name'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Name
              </label>
              <input
                type='text'
                name='name'
                value={name}
                id='name'
                onChange={(e) => setName(e.target.value)}
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. Sports'
              />
            </div>
          </div>

          <div className='space-x-4 mt-8'>
            <button
              type='submit'
              onClick={handleUpdateCategory}
              className='py-2 px-4 bg-green-800 text-white rounded hover:bg-green-700 active:bg-green-700 disabled:opacity-50'
            >
              Update
            </button>
            <button
              type='submit'
              onClick={handleDeleteCategory}
              className='py-2 px-4 bg-red-800 text-white rounded hover:bg-red-700 active:bg-red-700 disabled:opacity-50'
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>

    // <div className='container px-5 py-10 mx-auto'>
    //   <div className='bg-white rounded-lg shadow-lg p-4'>
    //     <div className='flex flex-col justify-between'>
    //       <div className='ms-10'>
    //         <span className='text-lg '>Categories</span>
    //       </div>
    //       <hr className='my-4' />
    //       <table className='text-center'>
    //         <thead>
    //           <tr>
    //             <th className='px-4 py-2'>Name</th>
    //             <th className='px-4 py-2'>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody className='text-center'>
    //           <tr>
    //             <td className='border px-4 py-2'>{data?.name}</td>
    //             <td className='border px-4 py-2'>
    //               <div
    //                 onClick={handleDeleteCategory}
    //                 className='text-center flex cursor-pointer justify-center text-gray-700 hover:text-gray-900 focus:outline-none'
    //               >
    //                 <AiFillDelete className='h-5 w-5 mr-1' />
    //                 <span className='text-sm'>Delete</span>
    //               </div>
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UpdateCategory;

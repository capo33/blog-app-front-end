import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

import {
  deleteCategory,
  getSingleCategory,
} from "../../features/category/categorySlice";

const Category = () => {
  const data = useSelector((state) => state.categories?.category?.category);
  const auth = useSelector((state) => state.auth.user);
  const { slug } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = auth?.token;
  const id = data?._id;

  useEffect(() => {
    dispatch(getSingleCategory(slug));
  }, [dispatch, slug]);

  const handleDeleteCategory = () => {
    dispatch(deleteCategory({ id, token, toast, navigate }));
  };

  return (
    <h1>lol</h1>
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

export default Category;

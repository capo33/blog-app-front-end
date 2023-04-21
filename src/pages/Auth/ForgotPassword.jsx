import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../../components/Input/Input";
import BoxStyle from "../../components/Boxstyle/BoxStyle";
import { forgotPassword } from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      answer: "",
      newPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword({ formData, toast, navigate }));
    resetForm();
  };

  return (
    <div className=' md:flex mt-36 sm:mt-50'>
      <BoxStyle />
      <div className='flex md:w-1/2 justify-center items-center bg-white'>
        <form className='bg-white' onSubmit={handleSubmit}>
          <h1 className='text-gray-800 font-bold text-2xl mb-1'>
            No Worries! We got you!
          </h1>
          <p className='text-sm font-normal text-gray-600 mb-7'>
            Do you remember your security answer? 😉
          </p>
          <Input
            className='h-5 w-5 text-gray-400'
            d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email Address'
          />

          <Input
            className='h-5 w-5 text-gray-400'
            d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
            type='text'
            name='answer'
            value={formData.answer}
            onChange={handleChange}
            placeholder='Add your security answer'
          />

          <Input
            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
            type='password'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
            placeholder='New Password'
          />

          <button
            type='submit'
            className='block w-full bg-slate-500 hover:bg-slate-600 mt-4 py-2 rounded outline-none  text-white font-semibold mb-2'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

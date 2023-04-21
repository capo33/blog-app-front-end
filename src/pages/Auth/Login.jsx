import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/Input/Input";
import BoxStyle from "../../components/Boxstyle/BoxStyle";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const token = auth?.user?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = { email, password };

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !email || !password
      ? toast.error("Please fill all the fields")
      : dispatch(login({ userData, toast, navigate }));
    resetForm();
  };

  return (
    <div className=' md:flex mt-36 sm:mt-50'>
      <BoxStyle />
      <div className='flex md:w-1/2 justify-center items-center bg-white'>
        <form className='bg-white' onSubmit={handleSubmit}>
          <h1 className='text-gray-800 font-bold text-2xl mb-1'>
            Hello Again!
          </h1>
          <p className='text-sm font-normal text-gray-600 mb-7'>Welcome Back</p>

          <Input
          className="h-5 w-5 text-gray-400"
            d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />
          <Input
            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />

          <div className='flex items-center justify-between'>
            <Link
              to='/forgot-password'
              className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Forgot password?
            </Link>
          </div>
          <button
            type='submit'
            className='block w-full bg-slate-500 hover:bg-slate-600 mt-4 py-2 rounded outline-none  text-white font-semibold mb-2'
          >
            Login
          </button>

          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Don't have an account?{" "}
            <Link
              to='/login'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500 outline-none  '
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

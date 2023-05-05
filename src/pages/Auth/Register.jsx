import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/Input/Input";
import BoxStyle from "../../components/Boxstyle/BoxStyle";
import { register } from "../../features/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const auth = useSelector((state) => state.auth);
  const token = auth?.user?.token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = { name, email, password, answer };

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, [token, navigate]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register({ userData, toast, navigate }));
      resetForm();
    }
  };

  return (
    <div className=' md:flex mt-36 sm:mt-50'>
      <BoxStyle />
      <div className='flex md:w-1/2 justify-center items-center bg-white'>
        <form className='bg-white' onSubmit={handleSubmit}>
          <h1 className='text-gray-800 font-bold text-2xl mb-1'>Hello!</h1>
          <p className='text-sm font-normal text-gray-600 mb-7'>Welcome</p>
          <Input
            d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />

          <Input
            d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />

          {/* Answer Input */}
          <Input
            d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
            type='text'
            name='answer'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='Add a security answer'
          />

          <Input
            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />

          <Input
            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
          />
          {message && <p className='text-red-500'>{message}</p>}

          <button
            type='submit'
            className='block w-full bg-slate-500 hover:bg-slate-600 mt-4 py-2 rounded outline-none  text-white font-semibold mb-2'
          >
            Register
          </button>

          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500 outline-none  '
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

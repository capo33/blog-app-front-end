import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import SVG from "../../components/SVG/SVG";
import {
  getUserProfile,
  updateUserProfile,
} from "../../features/auth/authSlice";
import BackLink from "../../components/BackLink/BackLink";

const UpdateProfile = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [about, setAbout] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [interests, setInterests] = useState([]);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = auth?.user?.token;

  useEffect(() => {
    if(token) {
      dispatch(getUserProfile({ token, toast }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (auth?.user) {
      setAbout(auth?.user?.user?.about);
      setAvatar(auth?.user?.user?.avatar);
      setAddress(auth?.user?.user?.address);
      setBirthday(auth?.user?.user?.birthday);
      setEmail(auth?.user?.user?.email);
      setName(auth?.user?.user?.name);
      setPhone(auth?.user?.user?.phone);
      setInterests(auth?.user?.user?.interests);
    }
  }, [dispatch, auth]);

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      let filename = null;
      // if (photo) {
      // } else {
      //   return;
      // }
      filename = crypto.randomUUID() + avatar?.name;
      formData.append("filename", filename);
      avatar && formData.append("image", avatar);
 
      // await fetch(`http://localhost:5000/upload`, {
      await fetch(`https://corner-blog-api.onrender.com/upload`, {
        method: "POST",
        body: formData,
      });

      const userData = {
        name,
        email,
        address,
        phone,
        about,
        gender,
        birthday,
        avatar: filename,
        interests,
      };

      dispatch(updateUserProfile({ userData, token, toast, navigate }));
      handleReset();
    } catch (error) {
      toast.error(error.message);
     }
  };
   const handleReset = () => {
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
    setGender("");
    setBirthday("");
    setAbout("");
    setAvatar("");
    setInterests([]);
  };

  return (
    <div className='p-5 mt-10'>
    {/* back to profile */}
    <BackLink link='/profile' name='Profile' />

      <div className='p-8 rounded border border-gray-200'>
        <h1 className='font-medium text-3xl'>Update your profile</h1>
        <form onSubmit={handleSubmit}>
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
                value={name || ""}
                id='name'
                onChange={(e) => setName(e.target.value)}
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. John Doe'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='example@example.com'
              />
            </div>

            <div>
              <label
                htmlFor='address'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Address
              </label>
              <input
                type='text'
                name='address'
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
                id='address'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. 1234 Main St'
              />
            </div>
            <div>
              <label
                htmlFor='phone'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Phone
              </label>
              <input
                type='text'
                name='phone'
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
                id='phone'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. 123-456-7890'
              />
            </div>
            <div>
              <label
                htmlFor='gender'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Gender
              </label>
              <input
                type='text'
                name='gender'
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
                id='gender'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='your gender - Optional'
              />
            </div>
            <div>
              <label
                htmlFor='about'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                About
              </label>
              <input
                type='text'
                name='about'
                value={about || ""}
                onChange={(e) => setAbout(e.target.value)}
                id='about'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. I am a teacher and I love to teach :)'
              />
            </div>
            <div>
              <label
                htmlFor='birthday'
                className='text-sm text-gray-700 block mb-1 font-medium'
              >
                Birthday
              </label>
              <input
                type='date'
                name='birthday'
                value={birthday || ""}
                onChange={(e) => setBirthday(e.target.value)}
                id='birthday'
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. 01/01/2000'
              />
            </div>
            {/* Upload image */}
            <div>
              <label
                htmlFor='avatar'
                className='flex gap-1 justify-center border bg-transparent rounded-2xl p-2  cursor-pointer text-gray-800'
              >
                <input
                  type='file'
                  name='avatar'
                  accept='image/*'
                  className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50'
                  onChange={(e) => setAvatar(e.target.files[0])}
                  id='avatar'
                  hidden
                />
                <SVG
                  className='w-6 h-6'
                  d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                />
                {avatar ? avatar?.name : "Upload Image"}
              </label>
            </div>
            {avatar ? (
              <div className='text-center'>
                {/* <img
                  // we use URL.createObjectURL to create a temporary URL for the image
                  src={URL.createObjectURL(avatar)}
                  alt={avatar?.name}
                  height='200px'
                  className='img img-responsive img-thumbnail'
                /> */}
              </div>
            ) : (
              <img
                // src={`http://localhost:5000/uploads/${auth?.user?.user?.avatar}`}
                src={`https://corner-blog-api.onrender.com/uploads/${auth?.user?.user?.avatar}`}
                alt='Upload '
                height='200px'
                className='img img-responsive img-thumbnail'
              />
            )}
          </div>

          <div className='space-x-4 mt-8'>
            <button
              type='submit'
              className='py-2 px-4 bg-green-800 text-white rounded hover:bg-green-700 active:bg-green-700 disabled:opacity-50'
            >
              Update
            </button>
            <button
              type='reset'
              onClick={handleReset}
              className='py-2 px-4 bg-red-800 text-white rounded hover:bg-red-700 active:bg-red-700 disabled:opacity-50'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

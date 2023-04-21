import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsBalloonFill } from "react-icons/bs";
import { GiAquarium } from "react-icons/gi";
import { RxCornerBottomLeft } from "react-icons/rx";
import { RiUser3Line } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { TbBorderCorners } from "react-icons/tb";
import { uperCaseFirstLetter } from "../../utils";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // const firstLetter = user?.user?.name?.charAt(0).toUpperCase();
  const avatar = user?.user?.avatar;
  const admin = user?.user?.role === "admin";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className=' bg-gray-50 shad'>
      <div className='justify-between px-4 m-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <div className='flex items-center justify-between'>
              {/* Logo */}
              <div className='flex items-center justify-between text-xl font-bold'>
                <TbBorderCorners className='w-5 h-5' />
                &nbsp;
                <Link to='/'>
                  <h1 className=''>
                    Corner Blog
                  </h1>
                </Link>
              </div>
            </div>

            <div className='md:hidden'>
              <div
                style={{ outline: "none", cursor: "pointer" }}
                className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <AiOutlineClose className='w-6 h-6' />
                ) : (
                  <AiOutlineMenu className='w-6 h-6' />
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
               {admin && (
                <li className='hover:text-slate-500 hover:transition-all '>
                  <Link to='/categories'>Categories</Link>
                </li>
              )}

              {user?.token ? (
                <>
                  <li className='hover:text-slate-500  hover:transition-all'>
                    <Link to='/create'>Create new post</Link>
                  </li>

                  <li>
                    <span className='font-bold'>
                      {uperCaseFirstLetter(user?.user?.name)}
                    </span>
                  </li>
                  <li className='hover:text-slate-500  hover:transition-all '>
                    <Link to='/profile'>
                      <img
                        src={
                          avatar
                            ? `http://localhost:5000/uploads/${avatar}`
                            : "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                        }
                        alt='avatar'
                        className='w-10 rounded-full'
                      />
                    </Link>
                  </li>
                  <div className='bg-orange-500 inline-flex     rounded  '>
                    <div className='py-1.5 px-4 text-white  hover:bg-orange-700 rounded cursor-pointer flex justify-between'>
                      <Link to='/login' onClick={handleLogout}>
                        Logout
                      </Link>
                      <CiLogout className='w-6 h-6' />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <li className='   bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li className='   bg-stone-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
                    <Link to='/register'>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

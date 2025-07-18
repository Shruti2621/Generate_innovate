import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, setShowLogin, logout, credits } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isGalleryPage = currentPath === '/gallery';
  const isResultPage = currentPath === '/result';
  

  return (
    <div className='flex items-center justify-between py-4 px-4 sm:px-8'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            {/* Conditional button */}
            <button
              onClick={() =>{logout(); navigate('/');}}
              className='text-gray-600  max-sm:hidden pl-4'
            >
              Home
            </button>
            {isGalleryPage && (
              <button
                onClick={() => navigate('/result')}
                className='text-gray-600 max-sm:hidden pl-4'
              >
                Generate Image
              </button>
            )}

            {isResultPage && (
              <button
                onClick={() => navigate('/gallery')}
                className="text-gray-600 max-sm:hidden pl-4"
              >
                Gallery
              </button>
            )}

            <button
              onClick={() => navigate('/buy')}
              className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'
            >
              <img className='w-5' src={assets.credit_star} alt="Credits" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>
                Credits left: {credits ?? "Loading..."}
              </p>
            </button>

            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user?.username || "User"}</p>

            <div className='relative group'>
              <img src={assets.profile_icon} className='w-10 drop-shadow cursor-pointer' alt="Profile" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                <li  onClick={() => {logout(); 
                     navigate('/');
                            }} 
                            className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100'
                            >
                              Logout
                            </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
            <button
              onClick={() => setShowLogin(true)}
              className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

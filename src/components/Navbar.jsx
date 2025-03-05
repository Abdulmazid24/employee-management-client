import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { LiaSignOutAltSolid } from 'react-icons/lia';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 px-6 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center font-semibold">
        {/* Company Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-yellow-300">Company</span>Logo
        </Link>

        {/* Navbar Items */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className="hover:text-yellow-300">
            Home
          </NavLink>
          <NavLink to="/contact" className="hover:text-yellow-300">
            Contact Us
          </NavLink>

          {/* Private Route - Dashboard */}

          <NavLink to={'/dashboard'} className="hover:text-yellow-300">
            Dashboard
          </NavLink>

          {/* Authentication Section */}
          {user ? (
            <div className="flex items-center ">
              {/* User Photo */}
              <img
                src={user.photoURL || 'https://i.ibb.co/4pDNDk1/user.png'}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              />

              {/* Logout Dropdown */}
              <div className="bg-gray-50 w-10 h-10 rounded-full shadow-md ">
                <button onClick={logOut} className="p-2 cursor-pointer">
                  <LiaSignOutAltSolid
                    className="text-3xl
                   font-bold text-red-800"
                    size={30}
                  />
                </button>
              </div>
            </div>
          ) : (
            // If user is not logged in, show Register/Login
            <>
              <NavLink to="/register" className="hover:text-yellow-300">
                Register
              </NavLink>
              <NavLink to="/login" className="hover:text-yellow-300">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

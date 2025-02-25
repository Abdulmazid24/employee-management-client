import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Logout Function
  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 px-6 flex justify-between items-center  p-4  ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Company Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-yellow-300">Company</span>Logo
        </Link>

        {/* Navbar Items */}
        <div className="flex items-center gap-6">
          <NavLink to="/contact" className="hover:text-yellow-300">
            Contact Us
          </NavLink>

          {/* Private Route - Dashboard */}
          {user && (
            <NavLink className="hover:text-yellow-300">Dashboard</NavLink>
          )}

          {/* Authentication Section */}
          {user ? (
            <div className="relative">
              {/* User Photo */}
              <img
                src={user.photoURL || 'https://i.ibb.co/4pDNDk1/user.png'}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              />

              {/* Logout Dropdown */}
              <div
                id="logout-menu"
                className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-md hidden"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
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

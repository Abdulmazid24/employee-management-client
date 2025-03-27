import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            {/* Company Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png" // Replace with your logo path
                alt="Company Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                WorkFlow
              </span>
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2  font-medium ${
                    isActive
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
              >
                <MdDashboard className="mr-1" /> Dashboard
              </NavLink>
              <NavLink
                to="/contactUs"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2  font-medium ${
                    isActive
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
              >
                Contact Us
              </NavLink>
            </div>
          </div>

          {/* Right Side - Auth Section */}
          <div className="flex items-center">
            {/* Desktop Auth Buttons */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={() => setShowLogout(!showLogout)}
                      className="flex text-sm rounded-full focus:outline-none"
                      id="user-menu"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.photoURL || '/default-user.png'}
                        alt="User profile"
                      />
                    </button>
                  </div>

                  {/* Logout Dropdown */}
                  {showLogout && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={() => {
                          logOut();
                          setShowLogout(false);
                        }}
                        className="block px-4 py-2 text-sm text-blue-950 hover:bg-gray-100 w-full text-left flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <NavLink
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-950 hover:bg-purple-950"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-950 hover:bg-purple-950"
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <NavLink
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`
            }
          >
            <MdDashboard className="inline mr-2" /> Dashboard
          </NavLink>
          <NavLink
            to="/contactUs"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`
            }
          >
            Contact Us
          </NavLink>

          {user ? (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.photoURL || '/default-user.png'}
                  alt="User profile"
                />
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.displayName || 'User'}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    logOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="inline mr-2" /> Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <NavLink
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center mt-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

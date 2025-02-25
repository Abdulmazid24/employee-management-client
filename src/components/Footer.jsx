import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 ">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left ">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Company Name</h2>
          <p className="text-gray-400 mt-2">
            Building the Future, One Employee at a Time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-yellow-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-300 text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-yellow-300 text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300 text-xl">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-yellow-300 text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-700 text-center pt-4 text-gray-500">
        &copy; {new Date().getFullYear()} Company Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

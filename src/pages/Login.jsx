import { FaGoogle, FaGithub } from 'react-icons/fa';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then(result => {
      const user = result.user;
      console.log(user);
    });
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithPopup(auth, provider);
  //     toast.success('Login with Google successful!');
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-purple-300  ">
      <div className="bg-white p-8 border border-b-8 border-b-black md:w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Or login with</p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300">
              <FaGoogle size={20} />
            </button>
            <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition duration-300">
              <FaGithub size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account? <Link to={'/register'}></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import {
  FaUserPlus,
  FaBuilding,
  FaMoneyBillWave,
  FaUserTie,
  FaIdCard,
} from 'react-icons/fa';
import { MdEmail, MdLock, MdPhotoCamera } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SocialLogin from '../components/SocialLogin';
import { motion } from 'framer-motion';

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleRegistration = async event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const bankAccountNo = parseFloat(form.bankAccountNo.value);
    const designation = form.designation.value;
    const salary = parseFloat(form.salary.value);
    const image = form.image.value;

    const userInfo = {
      name,
      email,
      password,
      image,
      role,
      bankAccountNo,
      designation,
      salary,
      isVerified: false,
    };

    try {
      const result = await createUser(email, password);
      console.log(result);
      setUser(result.user);
      await updateUserProfile(name, image);

      axiosPublic.post('/users', userInfo).then(res => {
        if (res.data.insertedId) {
          console.log('user added in the database');
          toast.success('Signup Successful');
        }
      });

      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="md:flex">
          {/* Left Side - Visual */}
          <div className="hidden md:block md:w-1/3 bg-gradient-to-b from-blue-600 to-purple-600 p-8 text-white">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
              <p className="mb-8">
                Create your account to access the employee management system
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <FaUserPlus className="text-xl" />
                  </div>
                  <span>Simple registration</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <FaIdCard className="text-xl" />
                  </div>
                  <span>Secure employee profiles</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <FaMoneyBillWave className="text-xl" />
                  </div>
                  <span>Easy payroll management</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-2/3 p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Fill in your details to register</p>
            </div>

            <form onSubmit={handleRegistration} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUserPlus />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MdEmail />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MdLock />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaUserTie />
                  </div>
                  <select
                    id="role"
                    name="role"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaMoneyBillWave />
                  </div>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Salary"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaIdCard />
                </div>
                <input
                  type="text"
                  id="bankAccountNo"
                  name="bankAccountNo"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Bank Account Number"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaBuilding />
                </div>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Designation"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MdPhotoCamera />
                </div>
                <input
                  type="text"
                  name="image"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Photo URL"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Register Now
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <SocialLogin />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-purple-600 hover:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;

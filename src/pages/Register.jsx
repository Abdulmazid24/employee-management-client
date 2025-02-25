import { FaGoogle, FaGithub } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { addDoc, collection } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Providers/AuthProvider';

const Register = () => {
  const { auth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleRegistration = async e => {
    e.preventDefault();
    // Password validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one capital letter.');
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      toast.error('Password must contain at least one special character.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user details to Firestore
      await addDoc(collection(db, 'users'), {
        email: user.email,
        role,
        bank_account_no: bankAccountNo,
        salary,
        designation,
        photo: photo ? URL.createObjectURL(photo) : null,
        isVerified: false,
      });

      toast.success('Registration successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Save user details with default values
      await addDoc(collection(db, 'users'), {
        email: user.email,
        role: 'Employee',
        bank_account_no: '123456789',
        salary: 50000,
        designation: 'Employee',
        photo: user.photoURL,
        isVerified: false,
      });

      toast.success('Registration with Google successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form onSubmit={handleRegistration}>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bankAccountNo"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              id="bankAccountNo"
              value={bankAccountNo}
              onChange={e => setBankAccountNo(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your bank account number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your salary"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your designation"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              onChange={e => setPhoto(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Or register with</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleGoogleLogin}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
            >
              <FaGoogle size={20} />
            </button>
            <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition duration-300">
              <FaGithub size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account? <Link to={'/login'}>Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

import { FaGoogle, FaGithub } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SocialLogin from '../components/SocialLogin';

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // const handleRegistration = async e => {
  //   e.preventDefault();
  //   // Password validation
  //   if (password.length < 6) {
  //     toast.error('Password must be at least 6 characters.');
  //     return;
  //   }
  //   if (!/[A-Z]/.test(password)) {
  //     toast.error('Password must contain at least one capital letter.');
  //     return;
  //   }
  //   if (!/[!@#$%^&*]/.test(password)) {
  //     toast.error('Password must contain at least one special character.');
  //     return;
  //   }

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     // Save user details to Firestore
  //     await addDoc(collection(db, 'users'), {
  //       email: user.email,
  //       role,
  //       bank_account_no: bankAccountNo,
  //       salary,
  //       designation,
  //       photo: photo ? URL.createObjectURL(photo) : null,
  //       isVerified: false,
  //     });

  //     toast.success('Registration successful!');
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const userCredential = await signInWithPopup(auth, provider);
  //     const user = userCredential.user;

  //     // Save user details with default values
  //     await addDoc(collection(db, 'users'), {
  //       email: user.email,
  //       role: 'Employee',
  //       bank_account_no: '123456789',
  //       salary: 50000,
  //       designation: 'Employee',
  //       photo: user.photoURL,
  //       isVerified: false,
  //     });

  //     toast.success('Registration with Google successful!');
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

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
    // const image = form.image.files[0];
    // const photoURL = await imageUpload(image);
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
      //2. User Registration
      const result = await createUser(email, password);
      console.log(result);
      setUser(result.user);
      //3. Save username & profile photo
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
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              required
            />
          </div>
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
              name="password"
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
              name="role"
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
              name="bankAccountNo"
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
              name="salary"
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
              name="designation"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your designation"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="designation"
            >
              Photo
            </label>
            <input
              type="text"
              name="image"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your PhotoURL"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="image"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>
        {/* Social Login Options */}
        <SocialLogin></SocialLogin>
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

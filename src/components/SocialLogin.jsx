import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // Generate Random Values
  const randomBankAccount = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
  const randomSalary = Math.floor(20000 + Math.random() * 80000); // Random salary between 20k-100k
  const handleGoogleSignIn = () => {
    signInWithGoogle().then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: 'Employee', // Default role for social login
        bank_account_no: randomBankAccount,
        salary: randomSalary,
        designation: 'N/A',
        photo: result.user.photoURL,
      };
      axiosPublic.post('/users', userInfo).then(res => {
        console.log(res.data);
        navigate('/');
      });
    });
  };
  return (
    <div className="mt-6 text-center">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-lg font-semibold text-gray-600">
            OR
          </span>
        </div>
      </div>

      <p className="text-gray-600"> Continue with</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleGoogleSignIn}
          title="Continue with Google"
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-200 transition duration-300 cursor-pointer border-2 border-white"
        >
          <FcGoogle size={25} />
        </button>
        <button
          title="Continue with Github"
          className="px-3 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition duration-300 cursor-pointer"
        >
          <FaGithub size={23} />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

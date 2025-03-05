import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle().then(result => {
      console.log(result.user);
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

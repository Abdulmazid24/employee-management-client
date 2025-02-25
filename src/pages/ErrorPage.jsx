import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mt-2">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

import { useState } from 'react';
import {
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaTasks,
  FaCalendarAlt,
  FaFileAlt,
  FaBell,
  FaLock,
  FaMobileAlt,
  FaCloud,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'Employee Dashboard',
      description:
        'Comprehensive overview of tasks, schedules, and performance metrics for each employee.',
      icon: <FaUsers className="text-4xl mb-4 text-blue-600" />,
      category: 'employee',
      comingSoon: false,
    },
    {
      id: 2,
      title: 'HR Management Console',
      description:
        'Centralized control panel for HR professionals to manage all employee data and processes.',
      icon: <FaChartLine className="text-4xl mb-4 text-purple-600" />,
      category: 'hr',
      comingSoon: false,
    },
    {
      id: 3,
      title: 'Payroll System',
      description:
        'Automated salary processing with tax calculations and payment history tracking.',
      icon: <FaMoneyBillWave className="text-4xl mb-4 text-green-600" />,
      category: 'hr',
      comingSoon: false,
    },
    {
      id: 4,
      title: 'Task Management',
      description:
        'Assign, track, and analyze employee tasks with real-time progress updates.',
      icon: <FaTasks className="text-4xl mb-4 text-orange-600" />,
      category: 'employee',
      comingSoon: false,
    },
    {
      id: 5,
      title: 'Attendance Tracking',
      description:
        'Smart time tracking with geofencing and biometric integration options.',
      icon: <FaCalendarAlt className="text-4xl mb-4 text-red-600" />,
      category: 'all',
      comingSoon: false,
    },
    {
      id: 6,
      title: 'Document Management',
      description:
        'Secure storage and easy access to all employee documents and contracts.',
      icon: <FaFileAlt className="text-4xl mb-4 text-indigo-600" />,
      category: 'all',
      comingSoon: false,
    },
    {
      id: 7,
      title: 'Notification Center',
      description:
        'Customizable alerts for important updates, approvals, and deadlines.',
      icon: <FaBell className="text-4xl mb-4 text-yellow-600" />,
      category: 'all',
      comingSoon: false,
    },
    {
      id: 8,
      title: 'Admin Security Suite',
      description:
        'Advanced permission controls and audit logs for sensitive operations.',
      icon: <FaLock className="text-4xl mb-4 text-gray-600" />,
      category: 'admin',
      comingSoon: true,
    },
    {
      id: 9,
      title: 'Mobile App',
      description:
        'Full functionality on iOS and Android devices for on-the-go access.',
      icon: <FaMobileAlt className="text-4xl mb-4 text-pink-600" />,
      category: 'all',
      comingSoon: true,
    },
    {
      id: 10,
      title: 'Cloud Integration',
      description:
        'Seamless connectivity with popular cloud storage and productivity tools.',
      icon: <FaCloud className="text-4xl mb-4 text-teal-600" />,
      category: 'all',
      comingSoon: true,
    },
  ];

  const filteredFeatures =
    activeTab === 'all'
      ? features
      : features.filter(
          feature =>
            feature.category === activeTab || feature.category === 'all'
        );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Powerful Features for Modern Workforce
          </motion.h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover how our comprehensive tools can transform your employee
            management experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
            >
              Get Started Free
            </button>
            <Link to={'/demo'}>
              <button
                onClick={() => navigate('/contact')}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Request Demo
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Features
          </button>
          <button
            onClick={() => setActiveTab('employee')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'employee'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Employee Tools
          </button>
          <button
            onClick={() => setActiveTab('hr')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'hr'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            HR Solutions
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Admin Features
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map(feature => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                feature.comingSoon
                  ? 'border-2 border-dashed border-gray-300'
                  : 'border border-gray-200'
              }`}
            >
              <div className="p-8 text-center">
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                {feature.comingSoon && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to revolutionize your HR operations?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of companies who trust our employee management system
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-bold transition duration-300"
            >
              Start Your Free Trial
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-bold transition duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;

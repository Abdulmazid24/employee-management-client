import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DemoRequestPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    employees: '',
    date: '',
    time: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Demo requested:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      navigate('/thank-you'); // Redirect to thank you page
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-950 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            See Our Platform in Action
          </motion.h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Schedule a personalized demo to discover how our employee management
            system can transform your HR operations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Demo Request Received!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your interest. Our team will contact you shortly to
              confirm your demo schedule.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition duration-300"
            >
              Return to Home
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-12"
          >
            {/* Demo Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold mb-6">
                    Schedule Your Demo
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll contact you to arrange a
                    personalized demonstration at your convenience.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Company Name*
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Work Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="employees"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Number of Employees*
                        </label>
                        <select
                          id="employees"
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="1-50">1-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="501-1000">501-1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Preferred Date*
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="time"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Preferred Time*
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="9:00 AM - 10:00 AM">
                            9:00 AM - 10:00 AM
                          </option>
                          <option value="10:00 AM - 11:00 AM">
                            10:00 AM - 11:00 AM
                          </option>
                          <option value="11:00 AM - 12:00 PM">
                            11:00 AM - 12:00 PM
                          </option>
                          <option value="1:00 PM - 2:00 PM">
                            1:00 PM - 2:00 PM
                          </option>
                          <option value="2:00 PM - 3:00 PM">
                            2:00 PM - 3:00 PM
                          </option>
                          <option value="3:00 PM - 4:00 PM">
                            3:00 PM - 4:00 PM
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Specific Areas of Interest
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="E.g. Payroll, Attendance Tracking, Performance Management..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-950 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300"
                    >
                      Request Demo
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
                <h3 className="text-xl font-bold mb-6">What to Expect</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <FaCalendarAlt className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">30-Minute Session</h4>
                      <p className="text-gray-600">
                        A concise yet comprehensive overview tailored to your
                        needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaPhone className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Live Walkthrough</h4>
                      <p className="text-gray-600">
                        See the platform in action with real-world scenarios
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaEnvelope className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Follow-Up Materials</h4>
                      <p className="text-gray-600">
                        Receive recorded demo and additional resources
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Flexible Format</h4>
                      <p className="text-gray-600">
                        Online or in-person options available
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
                  <p className="text-gray-600 mb-4">
                    Contact our sales team directly for immediate assistance:
                  </p>
                  <p className="font-medium">
                    <a
                      href="mailto:demos@yourcompany.com"
                      className="text-blue-600 hover:underline"
                    >
                      demos@yourcompany.com
                    </a>
                  </p>
                  <p className="font-medium">
                    <a
                      href="tel:+18005551234"
                      className="text-blue-600 hover:underline"
                    >
                      +1 (800) 555-1234
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DemoRequestPage;

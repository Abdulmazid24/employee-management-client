import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaUsers, FaChartLine, FaHandshake, FaClock } from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'HR Director',
      quote:
        'This system revolutionized our workflow. Employee management has never been easier!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Team Lead',
      quote:
        'The intuitive interface saves us hours every week. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'David Wilson',
      position: 'CEO',
      quote:
        'Our productivity increased by 40% after implementing this solution.',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ];

  // Stats data
  const stats = [
    {
      value: '500+',
      label: 'Happy Employees',
      icon: <FaUsers className="text-3xl" />,
    },
    {
      value: '95%',
      label: 'Satisfaction Rate',
      icon: <FaChartLine className="text-3xl" />,
    },
    {
      value: '24/7',
      label: 'Support Available',
      icon: <RiCustomerService2Fill className="text-3xl" />,
    },
    {
      value: '10+',
      label: 'Years Experience',
      icon: <BsFillCalendarCheckFill className="text-3xl" />,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Banner */}
      <section className="relative">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
        >
          <div className="h-screen flex items-center justify-center bg-gradient-to-r from-amber-950 to-purple-600">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Empowering Your Workforce
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Streamline your HR processes with our comprehensive employee
                management solution
              </p>
              <Link to={'/register'}>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Productivity Redefined
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Track, manage, and optimize your team's performance effortlessly
              </p>
              <Link to={'/features'}>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 cursor-pointer">
                  Explore Features
                </button>
              </Link>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions designed to simplify your HR operations and
            boost employee engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-blue-600 mb-4">
              <FaHandshake className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Employee Management</h3>
            <p className="text-gray-600">
              Centralized platform for all employee data, documents, and records
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-purple-600 mb-4">
              <FaClock className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Time Tracking</h3>
            <p className="text-gray-600">
              Accurate work hour tracking with automated reporting
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-green-600 mb-4">
              <IoMdRocket className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Performance Analytics</h3>
            <p className="text-gray-600">
              Data-driven insights to help your team reach its full potential
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-orange-600 mb-4">
              <FiAward className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Recognition System</h3>
            <p className="text-gray-600">
              Motivate your team with peer recognition and rewards
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={6000}
          className="max-w-4xl mx-auto"
        >
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="px-8 py-12 bg-white rounded-xl shadow-lg"
            >
              <div className="flex flex-col items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-6 object-cover"
                />
                <p className="text-gray-600 text-lg italic mb-6 text-center max-w-2xl">
                  "{testimonial.quote}"
                </p>
                <div className="text-center">
                  <h4 className="font-bold text-xl">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies who have revolutionized their employee
            management
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-bold transition duration-300">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-bold transition duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error('Please fill in all fields!');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({ email: '', message: '' }); // Reset form
    } catch (error) {
      toast.error('Failed to send message!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Company Address Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center mb-8">
        <h2 className="text-2xl font-bold">📍 Our Office</h2>
        <p className="text-gray-600 mt-2">
          1234 Smart Tech Street, Innovation City, BD
        </p>
        <p className="text-gray-600">Email: support@company.com</p>
        <p className="text-gray-600">Phone: +880 123 456 789</p>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">✉ Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

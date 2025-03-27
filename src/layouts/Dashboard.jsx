import { BiSolidContact, BiSolidSpreadsheet } from 'react-icons/bi';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import { FaChartPie, FaCreditCard, FaHome, FaUsers } from 'react-icons/fa';
import { FaBarsProgress } from 'react-icons/fa6';
import { MdPayment, MdAdminPanelSettings } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const isHR = true;
  // const location = useLocation();
  // const isHR = location.pathname.includes('/dashboard/hr-') || false; // Adjust based on your HR detection logic

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full md:w-64 bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-xl"
      >
        <div className="p-4 flex flex-col h-full">
          {/* Dashboard Header */}
          <div className="mb-8 p-4 bg-white bg-opacity-10 rounded-lg">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {isAdmin ? (
                <>
                  <MdAdminPanelSettings className="text-yellow-300" />
                  Admin Dashboard
                </>
              ) : isHR ? (
                <>
                  <HiUserGroup className="text-yellow-300" />
                  HR Dashboard
                </>
              ) : (
                <>
                  <FaHome className="text-yellow-300" />
                  Employee Portal
                </>
              )}
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            {isAdmin ? (
              <>
                {/* Admin Links */}
                <ul className="space-y-2">
                  <NavItem
                    to="/dashboard/all-employee-list"
                    icon={<FaUsers />}
                    text="All Employees"
                  />
                  <NavItem
                    to="/dashboard/payroll"
                    icon={<FaChartPie />}
                    text="Payroll"
                  />
                  <NavItem
                    to="/dashboard/payment"
                    icon={<FaCreditCard />}
                    text="Payments"
                  />
                </ul>
              </>
            ) : isHR ? (
              <>
                {/* HR Links */}
                <ul className="space-y-2">
                  <NavItem
                    to="/dashboard/employee-list"
                    icon={<BsReverseListColumnsReverse />}
                    text="Employee List"
                  />
                  <NavItem
                    to="/dashboard/progress"
                    icon={<FaBarsProgress />}
                    text="Team Progress"
                  />
                </ul>
              </>
            ) : (
              <>
                {/* Employee Links */}
                <ul className="space-y-2">
                  <NavItem
                    to="/dashboard/work-sheet"
                    icon={<BiSolidSpreadsheet />}
                    text="Work Sheet"
                  />
                  <NavItem
                    to="/dashboard/payment-history"
                    icon={<MdPayment />}
                    text="Payment History"
                  />
                </ul>
              </>
            )}

            {/* Common Links */}
            <div className="mt-8 pt-4 border-t border-white border-opacity-20">
              <ul className="space-y-2">
                <NavItem to="/" icon={<FaHome />} text="Home Page" />
                <NavItem
                  to="/contactUs"
                  icon={<BiSolidContact />}
                  text="Contact Us"
                />
              </ul>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="mt-auto p-4 bg-white bg-opacity-10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800">
                {isAdmin ? 'A' : isHR ? 'H' : 'E'}
              </div>
              <div>
                <p className="font-medium">
                  {isAdmin ? 'Admin' : isHR ? 'HR Manager' : 'Employee'}
                </p>
                <p className="text-xs opacity-75">Active</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Custom NavItem component for consistent styling
const NavItem = ({ to, icon, text }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-white bg-opacity-20 text-yellow-300 shadow-md'
            : 'hover:bg-white hover:bg-opacity-10'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </NavLink>
  </li>
);

export default Dashboard;

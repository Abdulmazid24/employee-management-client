import { BiSolidContact, BiSolidSpreadsheet } from 'react-icons/bi';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import { FaChartPie, FaCreditCard, FaHome, FaUsers } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { TbDetails } from 'react-icons/tb';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  // TODO : get isAdmin value from the database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex justify-center">
      <div className="w-max min-h-screen bg-amber-950 text-white font-semibold p-4">
        {isAdmin ? (
          <>
            <ul className="w-max space-y-2 font-bold">
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/all-employee-list'}
                >
                  <FaUsers size={20} />
                  All Employee List
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/payroll'}
                >
                  <FaChartPie size={20} />
                  PayRoll
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/payment'}
                >
                  <FaCreditCard size={20} />
                  Payment
                </NavLink>
              </li>
              <hr className="my-3"></hr>
              <li>
                <NavLink className="flex items-center gap-2" to={'/'}>
                  <FaHome size={20} />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center gap-2" to={'/contact'}>
                  <BiSolidContact size={20} />
                  Contact us
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="w-max space-y-2 font-bold">
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/work-sheet'}
                >
                  <BiSolidSpreadsheet size={20} />
                  Work-Sheet
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/payment-history'}
                >
                  <MdPayment size={20} />
                  Payment-History
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/employee-list'}
                >
                  <BsReverseListColumnsReverse size={20} />
                  Employee-List
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2"
                  to={'/dashboard/details/slug'}
                >
                  <TbDetails size={20} />
                  Details
                </NavLink>
              </li>
              <hr className="my-3"></hr>
              <li>
                <NavLink className="flex items-center gap-2" to={'/'}>
                  <FaHome size={20} />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center gap-2" to={'/contact'}>
                  <BiSolidContact size={20} />
                  Contact us
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>
      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

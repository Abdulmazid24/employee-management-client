import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const { data: employees = [], refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employee-list');
      return res.data;
    },
  });

  const handleVerifyEmployee = id => {
    axiosSecure.patch(`/hr/verify-employee/${id}`).then(res => {
      if (res.data?.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Employee successfully verified!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Handle Pay button click (open modal)
  const handlePayClick = employee => {
    setSelectedEmployee(employee);
  };

  // Handle Confirm Pay (send payment request)
  const handleConfirmPay = () => {
    if (!selectedEmployee || !month || !year) {
      Swal.fire('Error', 'Please fill all fields.', 'error');
      return;
    }

    const paymentData = {
      employeeId: selectedEmployee._id,
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      month,
      year,
      status: 'Pending',
    };

    axiosSecure.post('/payroll', paymentData).then(res => {
      if (res.data.insertedId) {
        setSelectedEmployee(null);
        setMonth('');
        setYear('');
        Swal.fire('Success', 'Payment request sent for approval.', 'success');
        refetch();
      }
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Verified</th>
              <th className="p-3 border">Bank Account</th>
              <th className="p-3 border">Salary</th>
              <th className="p-3 border">Pay</th>
              <th className="p-3 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id} className="border">
                <td className="p-3">{employee.name}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3 flex justify-center">
                  <button
                    className={`text-xl ${
                      employee.isVerified ? 'text-green-500' : 'text-red-500'
                    }`}
                    onClick={() => handleVerifyEmployee(employee._id)}
                  >
                    {employee.isVerified ? '✅' : '❌'}
                  </button>
                </td>
                <td className="p-3">{employee.bankAccount || 'N/A'}</td>
                <td className="p-3">${employee.salary}</td>
                <td className="p-3">
                  <button
                    className={`px-4 py-2 text-white rounded ${
                      employee.isVerified
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!employee.isVerified}
                    onClick={() => handlePayClick(employee)}
                  >
                    Pay
                  </button>
                </td>
                <td className="p-3">
                  <Link
                    to={`/dashboard/employee-details/${employee._id}`}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Pay Employee</h3>
            <p className="mb-2">
              <strong>Name:</strong> {selectedEmployee.name}
            </p>
            <p className="mb-2">
              <strong>Salary:</strong> ${selectedEmployee.salary}
            </p>

            <div className="mb-4">
              <label className="block">Month</label>
              <input
                type="text"
                placeholder="Enter Month (e.g., January)"
                className="border p-2 w-full"
                value={month}
                onChange={e => setMonth(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block">Year</label>
              <input
                type="text"
                placeholder="Enter Year (e.g., 2024)"
                className="border p-2 w-full"
                value={year}
                onChange={e => setYear(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleConfirmPay}
              >
                Confirm Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

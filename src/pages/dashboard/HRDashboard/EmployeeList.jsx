import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employee-list');
      console.log(res.data);
      refetch();
      // Corrected logging
      return res.data;
    },
  });

  const handleVerifyEmployee = id => {
    axiosSecure.patch(`/hr/verify-employee/${id}`).then(res => {
      console.log(res.data);
      if (res.data?.modifiedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The employee has been successfully verified by HR',
          showConfirmButton: false,
          timer: 1500,
        });
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
    </div>
  );
};

export default EmployeeList;

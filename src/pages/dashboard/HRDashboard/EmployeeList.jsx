import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/hr/employee-list')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Error fetching employees:', err));
  }, []);

  // Toggle Verification Status
  const handleVerify = (id, isVerified) => {
    fetch(`http://localhost:5000/hr/verify-employee/${id}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(() => {
        setEmployees(prev =>
          prev.map(emp =>
            emp._id === id ? { ...emp, isVerified: !isVerified } : emp
          )
        );
        toast.success('Verification status updated!');
      })
      .catch(err => console.error('Error updating verification:', err));
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
                    onClick={() =>
                      handleVerify(employee._id, employee.isVerified)
                    }
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
                    to={`/details/${employee.email}`}
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

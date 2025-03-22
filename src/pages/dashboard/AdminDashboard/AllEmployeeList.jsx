import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AllEmployeeList = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: employees = [], refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-employee-list');
      console.log(employees);
      return res.data;
    },
  });

  const makeHR = employee => {
    axiosSecure.patch(`/employee/HR/${employee._id}`).then(res => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${employee.name} The employee has been successfully transformed into HR`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const fireEmployee = async id => {
    if (!window.confirm('Are you sure you want to fire this employee?')) return;
    try {
      await useAxiosPublic.patch(
        `/api/employees/${id}/fire`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      toast.success('Employee fired');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to fire employee');
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Panel - Manage Employees
      </h1>
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Designation</th>
                <th className="py-2 px-4 border-r">Role</th>
                <th className="py-2 px-4 border-r">Make HR</th>
                <th className="py-2 px-4">Fire</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id} className="border-b text-center">
                  <td className="py-2 px-4 border-r">{employee.name}</td>
                  <td className="py-2 px-4 border-r">{employee.designation}</td>
                  <td className="py-2 px-4 border-r">{employee.role}</td>
                  <td className="py-2 px-4 border-r">
                    {employee.role === 'Employee' && (
                      <button
                        onClick={() => makeHR(employee)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Promote to HR
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {employee.fired ? (
                      <span className="text-red-500">Fired</span>
                    ) : (
                      <button
                        onClick={() => fireEmployee(employee._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Fire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;

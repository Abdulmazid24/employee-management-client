import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const Payroll = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: employees = [], refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payroll');
      console.log(employees);
      return res.data;
    },
  });

  // const handlePayment = async (id, salary) => {
  //   if (!window.confirm('Confirm payment?')) return;
  //   try {
  //     const { data } = await axios.patch(
  //       `/api/payroll/${id}/pay`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //       }
  //     );
  //     setEmployees(prev =>
  //       prev.map(emp =>
  //         emp._id === id
  //           ? { ...emp, paid: true, paymentDate: data.paymentDate }
  //           : emp
  //       )
  //     );
  //     toast.success('Payment successful');
  //   } catch (error) {
  //     toast.error('Payment failed');
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
      {loading ? (
        <p>Loading payroll data...</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Month & Year</th>
              <th className="border p-2">Payment Date</th>
              <th className="border p-2">Pay</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id} className="text-center">
                <td className="border p-2">{employee.name}</td>
                <td className="border p-2">${employee.salary}</td>
                <td className="border p-2">
                  {employee.month} {employee.year}
                </td>
                <td className="border p-2">
                  {employee.paymentDate || 'Pending'}
                </td>
                <td className="border p-2">
                  {employee.paid ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <button
                      onClick={() =>
                        handlePayment(employee._id, employee.salary)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payroll;

import { useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const EmployeeDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams(); // Get employee email or UID from URL

  // Fetch employee details
  const { data: employee, isLoading: loadingEmployee } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-details/${id}`);
      return res.data;
    },
  });

  // Fetch salary history
  const { data: salaryData, isLoading: loadingSalary } = useQuery({
    queryKey: ['salaryData', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-salary/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (loadingEmployee || loadingSalary) {
    return (
      <div className="text-center text-xl font-bold mt-10">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Employee Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={employee?.image || 'https://via.placeholder.com/100'}
          alt="Employee"
          className="w-24 h-24 rounded-full shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee?.name}</h2>
          <p className="text-gray-600">
            {employee.designation || 'No designation'}
          </p>
          <p className="text-gray-600">Email: {employee.email}</p>
          <p className="text-gray-600">
            Bank: {employee.bankAccountNo || 'Not provided'}
          </p>
        </div>
      </div>

      {/* Salary Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Salary History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryData}>
            <XAxis
              dataKey="month"
              label={{ value: 'Month', position: 'insideBottom', dy: 10 }}
            />
            <YAxis
              label={{ value: 'Salary', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Bar dataKey="amount" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeDetails;

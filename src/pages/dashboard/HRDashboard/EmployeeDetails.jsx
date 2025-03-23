// import { useEffect, useState } from 'react';
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
  const { id } = useParams(); // Get employee email from URL
  // const [employee, setEmployee] = useState(null);

  const { data: employee } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-details/${id}`);
      console.log(res.data);

      return res.data;
    },
  });

  if (!employee) {
    return (
      <div className="text-center text-xl font-bold mt-10">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Employee Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={employee.photo || 'https://via.placeholder.com/100'}
          alt="Employee"
          className="w-24 h-24 rounded-full shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">
            {employee.designation || 'No designation'}
          </p>
          <p className="text-gray-600">Email: {employee.email}</p>
          <p className="text-gray-600">
            Bank: {employee.bankAccount || 'Not provided'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

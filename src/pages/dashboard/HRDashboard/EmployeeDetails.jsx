import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const EmployeeDetails = () => {
  const { email } = useParams(); // Get employee email from URL
  const [employee, setEmployee] = useState(null);
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    fetch(`https://your-api.com/hr/employee-details/${email}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data.employee);
        setSalaryData(
          data.payments.map(pay => ({
            month: `${pay.month}/${pay.year}`,
            salary: pay.salary,
          }))
        );
      })
      .catch(err => console.error(err));
  }, [email]);

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
          src={employee.photoURL || 'https://via.placeholder.com/100'}
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

      {/* Salary History Chart */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Salary History</h3>
        {salaryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="salary" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No salary records found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;

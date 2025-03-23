import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ProgressPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch progress data
  const { data: employees = [], refetch } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const res = await axiosSecure.get('/progress');
      return res.data;
    },
  });

  // ✅ Apply filtering
  const filteredRecords = employees.filter(record => {
    return (
      (!selectedEmployee || record.name === selectedEmployee) &&
      (!selectedMonth ||
        new Date(record.selectedDate).getMonth() + 1 ===
          parseInt(selectedMonth))
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Work Progress</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {/* Employee Dropdown */}
        <select
          className="border p-2 rounded"
          onChange={e => setSelectedEmployee(e.target.value)}
          value={selectedEmployee}
        >
          <option value="">All Employees</option>
          {Array.from(new Set(employees.map(emp => emp.name))).map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        <select
          className="border p-2 rounded"
          onChange={e => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {new Date(0, index).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {/* Work Records Table */}
      {filteredRecords.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Task</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 p-2">{record.name}</td>
                <td className="border border-gray-300 p-2">{record.email}</td>
                <td className="border border-gray-300 p-2">{record.task}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(record.selectedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProgressPage;

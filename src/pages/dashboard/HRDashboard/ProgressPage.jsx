import { useEffect, useState } from 'react';

const ProgressPage = () => {
  const [employees, setEmployees] = useState([]); // All employee records
  const [filteredRecords, setFilteredRecords] = useState([]); // Filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Employee filter
  const [selectedMonth, setSelectedMonth] = useState(''); // Month filter

  useEffect(() => {
    const fetchWorkRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/progress', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setEmployees(data);
          setFilteredRecords(data); // Initially show all records
        } else {
          setEmployees([]);
          setFilteredRecords([]);
          console.error('Unexpected API response:', data);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkRecords();
  }, []);

  // Handle filtering based on employee and month
  useEffect(() => {
    let filtered = employees;

    if (selectedEmployee) {
      filtered = filtered.filter(record => record.name === selectedEmployee);
    }

    if (selectedMonth) {
      filtered = filtered.filter(
        record =>
          new Date(record.date).getMonth() + 1 === parseInt(selectedMonth)
      );
    }

    setFilteredRecords(filtered);
  }, [selectedEmployee, selectedMonth, employees]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
                  {new Date(record.date).toLocaleDateString()}
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

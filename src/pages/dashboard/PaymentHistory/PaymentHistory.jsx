import { useEffect, useState } from 'react';

import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const recordsPerPage = 5;

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axiosSecure.get('/payment-history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(data);
      setFilteredPayments(data); // Initially, show all records
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setLoading(false);
    }
  };

  // Filter function
  useEffect(() => {
    let filteredData = payments;
    if (yearFilter) {
      filteredData = filteredData.filter(
        payment => payment.year === yearFilter
      );
    }
    if (searchTerm) {
      filteredData = filteredData.filter(payment =>
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPayments(filteredData);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, yearFilter, payments]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredPayments.slice(firstIndex, lastIndex);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Transaction ID..."
          className="border p-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={yearFilter}
          onChange={e => setYearFilter(e.target.value)}
        >
          <option value="">Filter by Year</option>
          {[...new Set(payments.map(p => p.year))].map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading payments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Month</th>
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map(payment => (
                  <tr key={payment._id} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {payment.month}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {payment.year}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${payment.amount}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {payment.transactionId}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(filteredPayments.length / recordsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;

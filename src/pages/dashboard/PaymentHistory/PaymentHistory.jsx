import React, { useState, useEffect } from 'react';

const PAGE_SIZE = 5;

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch the logged-in employee's payment history data
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual API call or Firestore query
      const data = await fetchPaymentHistory();
      // Sort the data so that the earliest month is the first row
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setPaymentData(data);
    };
    fetchData();
  }, []);

  // Dummy function to simulate fetching data from the database
  const fetchPaymentHistory = async () => {
    // Sample data; in real application, fetch from DB
    return [
      {
        id: 1,
        month: 'January',
        year: 2025,
        amount: 2000,
        transactionId: 'TX123',
        date: '2025-01-15',
      },
      {
        id: 2,
        month: 'February',
        year: 2025,
        amount: 2100,
        transactionId: 'TX124',
        date: '2025-02-15',
      },
      {
        id: 3,
        month: 'March',
        year: 2025,
        amount: 2200,
        transactionId: 'TX125',
        date: '2025-03-15',
      },
      {
        id: 4,
        month: 'April',
        year: 2025,
        amount: 2300,
        transactionId: 'TX126',
        date: '2025-04-15',
      },
      {
        id: 5,
        month: 'May',
        year: 2025,
        amount: 2400,
        transactionId: 'TX127',
        date: '2025-05-15',
      },
      {
        id: 6,
        month: 'June',
        year: 2025,
        amount: 2500,
        transactionId: 'TX128',
        date: '2025-06-15',
      },
    ];
  };

  // Pagination logic
  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = paymentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(paymentData.length / PAGE_SIZE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Month</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Transaction Id</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(payment => (
            <tr key={payment.id}>
              <td className="border p-2">{payment.month}</td>
              <td className="border p-2">{payment.year}</td>
              <td className="border p-2">{payment.amount}</td>
              <td className="border p-2">{payment.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {paymentData.length > PAGE_SIZE && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

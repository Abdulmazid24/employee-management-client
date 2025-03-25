import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Your custom hook for Axios with security
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Payroll = () => {
  const axiosSecure = useAxiosSecure(); // Secure Axios instance

  // Use useQuery to fetch pending payroll data
  const {
    data: payrolls = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payroll'); // Backend API route to fetch payrolls
      return res.data;
    },
    onSuccess: data => {
      console.log('Payroll data fetched successfully:', data);
    },
    onError: error => {
      console.error('Error fetching payroll data:', error);
    },
  });

  // Function to handle the payment processing
  const handlePayment = async id => {
    try {
      // Send PATCH request to process the payment
      const response = await axiosSecure.patch(`/payroll/${id}`);

      // On successful payment, refetch data to update the UI
      if (response.data.message === 'Payment processed successfully') {
        toast.success('Payment processed successfully');
        refetch(); // Re-fetch the payroll data to update the UI without reloading the page
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to process payment',
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error processing payment',
        text:
          error.response?.data?.message ||
          'An error occurred while processing the payment.',
      });
    }
  };

  return (
    <div className="container mx-auto py-5 px-4">
      <h2 className="text-2xl font-semibold mb-6">Pending Payroll</h2>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Employee Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Salary
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Month & Year
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Payment Date
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {payrolls.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No pending payrolls.
                  </td>
                </tr>
              ) : (
                payrolls.map(payroll => (
                  <tr key={payroll._id} className="border-t border-gray-200">
                    <td className="py-3 px-6 text-sm font-medium text-gray-800">
                      {payroll.name}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {payroll.salary}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">{`${payroll.month} ${payroll.year}`}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {payroll.paymentDate ? payroll.paymentDate : 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {payroll.status === 'Pending' ? (
                        <button
                          onClick={() => handlePayment(payroll._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                        >
                          Pay
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
                        >
                          Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payroll;

import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { Table, Select, Input, Pagination, Spin } from 'antd';
import {
  DollarOutlined,
  CalendarOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  const pageSize = 5;

  useEffect(() => {
    fetchPaymentHistory();
  }, [currentPage, yearFilter, searchTerm]);

  // Fetch Payment History
  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get(
        `/payment-history?page=${currentPage}&limit=${pageSize}&year=${yearFilter}&search=${searchTerm}`
      );

      setPayments(data.data);
      setTotalPayments(data.totalPayments || 0);

      // Extract unique years for filter dropdown
      if (data.data && data.data.length > 0) {
        const years = [...new Set(data.data.map(p => p.year))].sort(
          (a, b) => b - a
        );
        setAvailableYears(years);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      toast.error('Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      render: month => (
        <span className="font-medium">
          {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
        </span>
      ),
      sorter: (a, b) => a.month - b.month,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Amount',
      dataIndex: 'salary',
      key: 'salary',
      render: amount => (
        <span className="text-green-600 font-semibold">
          <DollarOutlined /> {amount.toFixed(2)}
        </span>
      ),
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: id => <span className="font-mono text-blue-600">{id}</span>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Payment History
          </h1>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input
              placeholder="Search by Transaction ID..."
              prefix={<SearchOutlined />}
              className="w-full md:w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              allowClear
            />

            <Select
              placeholder="Filter by Year"
              className="w-full md:w-40"
              value={yearFilter || undefined}
              onChange={value => setYearFilter(value)}
              allowClear
            >
              <Option value="">All Years</Option>
              {availableYears.map(year => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={payments}
                rowKey="_id"
                pagination={false}
                className="border rounded-lg"
                locale={{
                  emptyText: (
                    <div className="text-center py-8">
                      <CalendarOutlined className="text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-500">No payment records found</p>
                    </div>
                  ),
                }}
              />
            </div>

            {totalPayments > pageSize && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={totalPayments}
                  pageSize={pageSize}
                  onChange={page => setCurrentPage(page)}
                  showSizeChanger={false}
                  className="ant-pagination-item-active:bg-blue-500 ant-pagination-item-active:border-blue-500"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

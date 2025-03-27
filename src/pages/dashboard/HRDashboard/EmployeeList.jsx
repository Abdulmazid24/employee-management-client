import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import {
  Table,
  Button,
  Modal,
  Input,
  Tag,
  Card,
  Avatar,
  Badge,
  Select,
  Space,
  Typography,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  UserOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { Option } = Select;

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  const { data: employees = [], refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employee-list');
      return res.data;
    },
  });

  const handleVerifyEmployee = id => {
    axiosSecure.patch(`/hr/verify-employee/${id}`).then(res => {
      if (res.data?.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Employee successfully verified!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handlePayClick = employee => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleConfirmPay = () => {
    if (!selectedEmployee || !month || !year) {
      Swal.fire('Error', 'Please fill all fields.', 'error');
      return;
    }

    const paymentData = {
      employeeId: selectedEmployee._id,
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      month,
      year,
      status: 'Pending',
    };

    axiosSecure.post('/payroll', paymentData).then(res => {
      if (res.data.insertedId) {
        setIsModalVisible(false);
        setMonth('');
        setYear('');
        Swal.fire('Success', 'Payment request sent for approval.', 'success');
        refetch();
      }
    });
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.photoURL} icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'isVerified',
      key: 'status',
      render: (verified, record) => (
        <Button
          type="text"
          icon={
            verified ? (
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#f5222d' }} />
            )
          }
          onClick={() => handleVerifyEmployee(record._id)}
        />
      ),
    },
    {
      title: 'Bank Account',
      dataIndex: 'bankAccount',
      key: 'bankAccount',
      render: account => account || 'N/A',
      responsive: ['lg'],
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: salary => (
        <Tag color="green" icon={<DollarOutlined />}>
          {salary}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<DollarOutlined />}
            disabled={!record.isVerified}
            onClick={() => handlePayClick(record)}
          >
            Pay
          </Button>
          <Link to={`/dashboard/employee-details/${record._id}`}>
            <Button icon={<InfoCircleOutlined />}>Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card
        title={
          <Title level={4} className="!mb-0">
            Employee Management
          </Title>
        }
        extra={
          <Button
            onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
            icon={viewMode === 'table' ? <ArrowLeftOutlined /> : null}
          >
            {viewMode === 'table' ? 'Card View' : 'Table View'}
          </Button>
        }
        bordered={false}
        className="shadow-sm"
      >
        {viewMode === 'table' ? (
          <Table
            columns={columns}
            dataSource={employees}
            rowKey="_id"
            pagination={{ pageSize: 8 }}
            scroll={{ x: true }}
            className="border rounded-lg"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map(employee => (
              <Card
                key={employee._id}
                hoverable
                className="border rounded-lg"
                actions={[
                  <Button
                    type="primary"
                    icon={<DollarOutlined />}
                    disabled={!employee.isVerified}
                    onClick={() => handlePayClick(employee)}
                    block
                  >
                    Pay Salary
                  </Button>,
                  <Link
                    to={`/dashboard/employee-details/${employee._id}`}
                    className="w-full"
                  >
                    <Button icon={<InfoCircleOutlined />} block>
                      View Details
                    </Button>
                  </Link>,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      src={employee.photoURL}
                      size={64}
                      icon={<UserOutlined />}
                    />
                  }
                  title={<Text strong>{employee.name}</Text>}
                  description={
                    <>
                      <Text type="secondary" className="block">
                        {employee.email}
                      </Text>
                      <div className="mt-2">
                        <Badge
                          status={employee.isVerified ? 'success' : 'error'}
                          text={
                            employee.isVerified ? 'Verified' : 'Not Verified'
                          }
                        />
                      </div>
                      <div className="mt-2">
                        <Tag color="green" icon={<DollarOutlined />}>
                          Salary: ${employee.salary}
                        </Tag>
                      </div>
                      {employee.bankAccount && (
                        <div className="mt-2">
                          <Text type="secondary">
                            Bank: {employee.bankAccount}
                          </Text>
                        </div>
                      )}
                    </>
                  }
                />
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Payment Modal */}
      <Modal
        title={
          <Title level={4} className="!mb-0">
            Process Payment
          </Title>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleConfirmPay}
            disabled={!month || !year}
          >
            Confirm Payment
          </Button>,
        ]}
      >
        {selectedEmployee && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar
                  size={48}
                  src={selectedEmployee.photoURL}
                  icon={<UserOutlined />}
                />
                <div>
                  <Text strong className="block">
                    {selectedEmployee.name}
                  </Text>
                  <Text type="secondary">{selectedEmployee.email}</Text>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Text strong className="block">
                  Salary Amount
                </Text>
                <Title level={3} className="!mt-1 !mb-0">
                  ${selectedEmployee.salary}
                </Title>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Text strong className="block mb-2">
                  Month
                </Text>
                <Select
                  placeholder="Select month"
                  style={{ width: '100%' }}
                  value={month}
                  onChange={setMonth}
                >
                  {months.map(m => (
                    <Option key={m} value={m}>
                      {m}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <Text strong className="block mb-2">
                  Year
                </Text>
                <Select
                  placeholder="Select year"
                  style={{ width: '100%' }}
                  value={year}
                  onChange={setYear}
                >
                  {years.map(y => (
                    <Option key={y} value={y}>
                      {y}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeList;

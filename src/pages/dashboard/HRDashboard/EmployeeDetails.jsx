import { useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Avatar,
  Typography,
  Space,
  Divider,
  Tag,
  Spin,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  BankOutlined,
  DollarOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const EmployeeDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  // Fetch employee details
  const { data: employee, isLoading: loadingEmployee } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-details/${id}`);
      return res.data;
    },
  });

  // Fetch salary history
  const { data: salaryData = [], isLoading: loadingSalary } = useQuery({
    queryKey: ['salaryData', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-salary/${id}`);
      return res.data.map(item => ({
        ...item,
        monthYear: `${new Date(2000, item.month - 1).toLocaleString('default', {
          month: 'short',
        })} ${item.year}`,
        amount: Number(item.salary),
      }));
    },
  });

  if (loadingEmployee || loadingSalary) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const colors = [
    '#4CAF50',
    '#2196F3',
    '#FFC107',
    '#9C27B0',
    '#607D8B',
    '#795548',
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card
        title={
          <Title level={3} className="!mb-0">
            Employee Details
          </Title>
        }
        bordered={false}
        className="shadow-sm"
      >
        {/* Employee Info Section */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <div className="flex flex-col items-center">
              <Avatar
                src={employee?.photoURL}
                size={120}
                icon={<UserOutlined />}
                className="mb-4 shadow-md"
              />
              <Title level={4}>{employee?.name}</Title>
              <Tag color="blue" icon={<IdcardOutlined />}>
                {employee?.designation || 'No designation'}
              </Tag>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Space direction="vertical" size="middle" className="w-full">
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Statistic
                      title="Email"
                      value={employee?.email}
                      prefix={<MailOutlined />}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Statistic
                      title="Bank Account"
                      value={employee?.bankAccountNo || 'Not provided'}
                      prefix={<BankOutlined />}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Statistic
                      title="Current Salary"
                      value={employee?.salary}
                      prefix={<DollarOutlined />}
                      suffix="USD"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Statistic
                      title="Status"
                      value={employee?.isVerified ? 'Verified' : 'Not Verified'}
                      valueStyle={{
                        color: employee?.isVerified ? '#52c41a' : '#f5222d',
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </Space>
          </Col>
        </Row>

        <Divider orientation="left" style={{ marginTop: 40 }}>
          <Title level={4} className="!mb-0">
            <CalendarOutlined /> Salary History
          </Title>
        </Divider>

        {/* Salary Chart Section */}
        <div style={{ height: 400, marginTop: 20 }}>
          {salaryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="monthYear"
                  label={{
                    value: 'Month/Year',
                    position: 'insideBottom',
                    offset: -30,
                  }}
                />
                <YAxis
                  label={{
                    value: 'Salary (USD)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  formatter={value => [`$${value}`, 'Salary']}
                  labelFormatter={label => `Period: ${label}`}
                />
                <Legend />
                <Bar dataKey="amount" name="Salary Paid" fill="#4CAF50">
                  {salaryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Text type="secondary" className="text-lg">
                No salary data available for this employee
              </Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmployeeDetails;

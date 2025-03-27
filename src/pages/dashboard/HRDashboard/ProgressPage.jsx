import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Table,
  Select,
  Typography,
  Space,
  Tag,
  Avatar,
  Spin,
  Empty,
  Statistic,
  Row,
  Col,
  Button,
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HourglassOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const ProgressPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const axiosSecure = useAxiosSecure();

  // Fetch progress data
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const res = await axiosSecure.get('/progress');
      return res.data.map(record => ({
        ...record,
        date: dayjs(record.selectedDate).format('YYYY-MM-DD'),
        month: dayjs(record.selectedDate).month() + 1,
        year: dayjs(record.selectedDate).year(),
      }));
    },
  });

  // Get unique employee names for filter
  const employeeNames = [...new Set(employees.map(emp => emp.name))];

  // Apply filtering
  const filteredRecords = employees.filter(record => {
    const matchesEmployee =
      !selectedEmployee || record.name === selectedEmployee;
    const matchesMonth =
      !selectedMonth || record.month === parseInt(selectedMonth);

    return matchesEmployee && matchesMonth;
  });

  // Calculate total work hours (for optional requirement)
  const totalWorkHours = filteredRecords.reduce(
    (sum, record) => sum + (record.hoursWorked || 0),
    0
  );

  // Table columns
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
      fixed: 'left',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Task Type',
      dataIndex: 'taskType',
      key: 'taskType',
      render: type => (
        <Tag
          color={
            type === 'Sales'
              ? 'green'
              : type === 'Support'
              ? 'blue'
              : type === 'Content'
              ? 'orange'
              : 'purple'
          }
        >
          {type}
        </Tag>
      ),
      width: 150,
      filters: [
        { text: 'Sales', value: 'Sales' },
        { text: 'Support', value: 'Support' },
        { text: 'Content', value: 'Content' },
        { text: 'Paper-work', value: 'Paper-work' },
      ],
      onFilter: (value, record) => record.taskType === value,
    },
    {
      title: 'Task Details',
      dataIndex: 'task',
      key: 'task',
      render: text => <Text ellipsis>{text}</Text>,
      width: 250,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: date => dayjs(date).format('MMM D, YYYY'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      width: 150,
    },
    {
      title: 'Hours Worked',
      dataIndex: 'hoursWorked',
      key: 'hours',
      render: hours => (
        <Tag color="blue" icon={<HourglassOutlined />}>
          {hours} hrs
        </Tag>
      ),
      width: 120,
      sorter: (a, b) => a.hoursWorked - b.hoursWorked,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag
          icon={
            record.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />
          }
          color={record.completed ? 'success' : 'warning'}
        >
          {record.completed ? 'Completed' : 'In Progress'}
        </Tag>
      ),
      width: 150,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card
        title={
          <Space>
            <TeamOutlined />
            <Title level={4} className="!mb-0">
              Employee Work Progress
            </Title>
          </Space>
        }
        bordered={false}
        className="shadow-sm"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setSelectedEmployee('');
              setSelectedMonth('');
            }}
          >
            Clear Filters
          </Button>
        }
      >
        {/* Filters Section */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} md={12} lg={8}>
            <Text strong>Employee</Text>
            <Select
              placeholder="All Employees"
              style={{ width: '100%' }}
              allowClear
              onChange={setSelectedEmployee}
              value={selectedEmployee || undefined}
              suffixIcon={<UserOutlined />}
            >
              {employeeNames.map(name => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Text strong>Month</Text>
            <Select
              placeholder="All Months"
              style={{ width: '100%' }}
              allowClear
              onChange={setSelectedMonth}
              value={selectedMonth || undefined}
              suffixIcon={<CalendarOutlined />}
            >
              {[...Array(12)].map((_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {dayjs().month(i).format('MMMM')}
                </Option>
              ))}
            </Select>
          </Col>

          {/* Optional: Total Work Hours Summary */}
          <Col xs={24} md={24} lg={8}>
            <Card size="small" hoverable>
              <Statistic
                title="Total Work Hours"
                value={totalWorkHours}
                prefix={<HourglassOutlined />}
                suffix="hours"
                valueStyle={{ color: totalWorkHours > 0 ? '#1890ff' : '#999' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Work Records Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : isError ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<Text type="danger">Failed to load work records</Text>}
          />
        ) : filteredRecords.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Text type="secondary">
                No work records found for selected filters
              </Text>
            }
          />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredRecords}
            rowKey="_id"
            scroll={{ x: true }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: total => `Showing ${total} records`,
            }}
            className="border rounded-lg"
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={4}>
                    <Text strong>Total Hours</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <Text strong>{totalWorkHours} hrs</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default ProgressPage;

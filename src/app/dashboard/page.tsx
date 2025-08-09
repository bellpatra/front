// app/dashboard/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Avatar, 
  Progress, 
  Table, 
  Tag, 
  Space,
  Spin,
  Layout,
  Menu,
  Dropdown,
  Button,
  Badge,
  Input,
  List,
  Empty,
  Modal,
  Form,
  Select,
  DatePicker,
  Checkbox,
  Drawer
} from "antd";
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined, 
  RiseOutlined,
  FallOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  ShopOutlined,
  BarChartOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  InboxOutlined,
  FileTextOutlined,
  SendOutlined,
  DeleteOutlined,
  StarOutlined,
  FolderOutlined,
  MoreOutlined,
  PlusOutlined,
  FilterOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  CommentOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  CloseOutlined,
  DownOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardFooter from "../components/DashboardFooter";
import authService, { User } from "../lib/authService";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;
const { Search } = Input;

// Mock data for dashboard (Outlook-inspired)
const mockData = {
  totalSales: 126560,
  totalOrders: 8846,
  totalUsers: 1234,
  conversionRate: 60,
  salesGrowth: 12.5,
  ordersGrowth: -3.2,
  usersGrowth: 8.7,
  conversionGrowth: 2.1,
  recentItems: [
    {
      id: '1',
      title: 'New Order from John Doe',
      subtitle: 'Order #ORD-001 - $1,200.00',
      time: '2 hours ago',
      type: 'order',
      priority: 'high',
      unread: true
    },
    {
      id: '2',
      title: 'Payment Received',
      subtitle: 'Jane Smith - Invoice #INV-234',
      time: '4 hours ago',
      type: 'payment',
      priority: 'normal',
      unread: true
    },
    {
      id: '3',
      title: 'Inventory Alert',
      subtitle: 'Low stock: Product XYZ (5 items left)',
      time: '6 hours ago',
      type: 'alert',
      priority: 'high',
      unread: false
    },
    {
      id: '4',
      title: 'Customer Review',
      subtitle: '5-star review from Alice Brown',
      time: '1 day ago',
      type: 'review',
      priority: 'normal',
      unread: false
    },
    {
      id: '5',
      title: 'System Update',
      subtitle: 'Scheduled maintenance completed',
      time: '2 days ago',
      type: 'system',
      priority: 'low',
      unread: false
    }
  ],
  folders: [
    { name: 'Dashboard', icon: DashboardOutlined, count: null, active: true },
    { name: 'Orders', icon: ShoppingCartOutlined, count: 15, active: false },
    { name: 'Customers', icon: TeamOutlined, count: 8, active: false },
    { name: 'Products', icon: ShopOutlined, count: null, active: false },
    { name: 'Reports', icon: BarChartOutlined, count: 3, active: false },
    { name: 'Analytics', icon: FileTextOutlined, count: null, active: false },
    { name: 'Settings', icon: SettingOutlined, count: null, active: false }
  ]
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchDrawerVisible, setSearchDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeFolder, setActiveFolder] = useState('Dashboard');
  const [searchForm] = Form.useForm();
  const router = useRouter();
  
  // Theme and Language hooks
  const { actualTheme } = useTheme();
  const { t } = useLanguage();

  // Check authentication and load user data
  const loadUserData = useCallback(() => {
    if (!authService.isAuthenticated()) {
      router.push("/");
      return;
    }

    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('myProfile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('signOut'),
      danger: true,
    },
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCartOutlined style={{ color: '#0078d4' }} />;
      case 'payment': return <DollarOutlined style={{ color: '#107c10' }} />;
      case 'alert': return <BellOutlined style={{ color: '#d83b01' }} />;
      case 'review': return <StarOutlined style={{ color: '#ff8c00' }} />;
      case 'system': return <SettingOutlined style={{ color: '#5c2d91' }} />;
      default: return <FileTextOutlined />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#d83b01';
      case 'normal': return '#0078d4';
      case 'low': return '#107c10';
      default: return '#666';
    }
  };

  const handleSearch = (values: any) => {
    console.log('Search values:', values);
    // Implement search logic here
    setSearchDrawerVisible(false);
  };

  const clearFilters = () => {
    searchForm.resetFields();
  };

  // Search suggestions
  const searchSuggestions = [
    { title: t('recentSearches'), items: ['Order #12345', 'John Doe customer', 'Sales report'] },
    { title: t('quickActions'), items: ['Create new order', 'Add customer', 'View analytics'] },
    { title: t('popularSearches'), items: ['Monthly sales', 'Product inventory', 'Customer list'] }
  ];

  const handleSearchFocus = () => {
    setSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      if (!searchValue) {
        setSearchExpanded(false);
      }
    }, 200);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setSearchExpanded(false);
    console.log('Search for:', suggestion);
  };

  const handleLogout = async () => {
    await authService.logout();
    router.push("/");
  };

  const rightSideIcons = [
    { 
      icon: <CalendarOutlined />, 
      tooltip: 'Calendar',
      onClick: () => console.log('Calendar clicked')
    },
    { 
      icon: <TeamOutlined />, 
      tooltip: 'People',
      onClick: () => console.log('People clicked')
    },
    { 
      icon: <AppstoreOutlined />, 
      tooltip: 'Apps',
      onClick: () => console.log('Apps clicked')
    },
    { 
      icon: <QuestionCircleOutlined />, 
      tooltip: 'Help',
      onClick: () => console.log('Help clicked')
    },
    { 
      icon: <GlobalOutlined />, 
      tooltip: 'Web',
      onClick: () => console.log('Web clicked')
    },
    { 
      icon: <CommentOutlined />, 
      tooltip: 'Chat',
      onClick: () => console.log('Chat clicked')
    },
    { 
      icon: <PhoneOutlined />, 
      tooltip: 'Calls',
      onClick: () => console.log('Calls clicked')
    },
    { 
      icon: <VideoCameraOutlined />, 
      tooltip: 'Video',
      onClick: () => console.log('Video clicked')
    }
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f3f2f1',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Spin size="large" />
        <div style={{ color: '#666', fontSize: '14px' }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f3f2f1'
      }}>
        <Text type="danger">Access Denied</Text>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f3f2f1', paddingTop: '48px' }}>
      {/* Dashboard Header */}
      <DashboardHeader
        user={user}
        searchExpanded={searchExpanded}
        searchValue={searchValue}
        searchSuggestions={searchSuggestions}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        onSearchChange={handleSearchChange}
        onSuggestionClick={handleSuggestionClick}
        onAdvancedSearchClick={() => setSearchDrawerVisible(true)}
        onLogout={handleLogout}
      />

      {/* Dashboard Sidebar - Fixed Position */}
      <DashboardSidebar
        collapsed={collapsed}
        activeFolder={activeFolder}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onFolderChange={setActiveFolder}
      />

      {/* Main Content Area with proper margin for fixed sidebar */}
      <div style={{
        marginLeft: collapsed ? 50 : 280, // Dynamic margin based on sidebar state
        transition: 'margin-left 0.2s ease' // Smooth transition
      }}>
        <Layout style={{ backgroundColor: '#f3f2f1', minHeight: 'calc(100vh - 48px)' }}>
          <Content style={{
            margin: '24px',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            minHeight: 'calc(100vh - 160px)' // Adjusted for header and footer
          }}>
            {/* Dashboard Content */}
            <div style={{ padding: '20px' }}>
              <Title level={2} style={{ marginBottom: '24px', color: '#323130' }}>
                Welcome back, {user.fullName}!
              </Title>
              {/* Sample Dashboard Content */}
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title={t('totalSales')}
                      value={mockData.totalSales}
                      prefix="$"
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title={t('totalOrders')}
                      value={mockData.totalOrders}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title={t('totalUsers')}
                      value={mockData.totalUsers}
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title={t('conversionRate')}
                      value={mockData.conversionRate}
                      suffix="%"
                      valueStyle={{ color: '#cf1322' }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* Recent Activity */}
              <Card 
                title={t('recentActivity')} 
                style={{ marginTop: '24px' }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={mockData.recentItems.slice(0, 5)}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={getItemIcon(item.type)}
                        title={<Text strong={item.unread}>{item.title}</Text>}
                        description={item.subtitle}
                      />
                      <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Content>

          {/* Dashboard Footer */}
          <DashboardFooter />
        </Layout>
      </div>

      {/* Advanced Search Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text strong>{t('advancedSearch')}</Text>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setSearchDrawerVisible(false)}
            />
          </div>
        }
        placement="right"
        width={400}
        open={searchDrawerVisible}
        onClose={() => setSearchDrawerVisible(false)}
        closable={false}
        style={{ backgroundColor: '#faf9f8' }}
      >
        <Form
          form={searchForm}
          layout="vertical"
          onFinish={handleSearch}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {/* Search in dropdown */}
          <Form.Item label={t('searchIn')} name="searchIn">
            <Select
              placeholder="Dashboard"
              style={{ width: '100%' }}
              options={[
                { value: 'dashboard', label: 'Dashboard' },
                { value: 'orders', label: 'Orders' },
                { value: 'customers', label: 'Customers' },
                { value: 'products', label: 'Products' },
              ]}
            />
          </Form.Item>

          {/* From field */}
          <Form.Item label={t('searchFrom')} name="from">
            <Input placeholder="Enter sender" />
          </Form.Item>

          {/* To field */}
          <Form.Item label={t('searchTo')} name="to">
            <Input placeholder="Enter recipient" />
          </Form.Item>

          {/* CC field */}
          <Form.Item label="CC" name="cc">
            <Input placeholder="Enter CC recipients" />
          </Form.Item>

          {/* Subject field */}
          <Form.Item label={t('searchSubject')} name="subject">
            <Input placeholder="Enter subject" />
          </Form.Item>

          {/* Keywords field */}
          <Form.Item label={t('searchKeywords')} name="keywords">
            <Input placeholder="Enter keywords" />
          </Form.Item>

          {/* Date range */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t('searchDateRange')} name="dateFrom">
                <DatePicker 
                  placeholder="Select a date" 
                  style={{ width: '100%' }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="to" name="dateTo" style={{ marginTop: 30 }}>
                <DatePicker 
                  placeholder="Select a date" 
                  style={{ width: '100%' }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Read status */}
          <Form.Item label={t('searchReadStatus')} name="readStatus">
            <Select
              placeholder="All"
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'All' },
                { value: 'read', label: 'Read' },
                { value: 'unread', label: 'Unread' }
              ]}
            />
          </Form.Item>

          {/* Has attachments */}
          <Form.Item name="hasAttachments" valuePropName="checked">
            <Checkbox>{t('searchHasAttachments')}</Checkbox>
          </Form.Item>

          {/* Action buttons */}
          <div style={{ 
            marginTop: 'auto', 
            paddingTop: '24px',
            display: 'flex',
            gap: '8px'
          }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ 
                backgroundColor: '#0078d4',
                borderColor: '#0078d4',
                flex: 1
              }}
            >
              {t('searchButton')}
            </Button>
            <Button
              onClick={clearFilters}
              style={{ flex: 1 }}
            >
              {t('clearFilters')}
            </Button>
    </div>
        </Form>
      </Drawer>
    </Layout>
  );
}


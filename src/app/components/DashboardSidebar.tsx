"use client";

import React, { useState } from 'react';
import { Layout, Typography, Button, Space, Badge, Menu, Drawer, Alert } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ProductOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SafetyOutlined,
  KeyOutlined,
  BellOutlined,
  ToolOutlined,
  ContactsOutlined,
  SolutionOutlined,
  ProjectOutlined,
  CalendarOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  RocketOutlined,
  CloudOutlined,
  ApiOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  GiftOutlined,
  CrownOutlined,
  CodeOutlined,
  GlobalOutlined,
  MailOutlined,
  TruckOutlined,
  DollarOutlined,
  BankOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
  CommentOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  TagsOutlined,
  StockOutlined,
  TransactionOutlined,
  ProfileOutlined,
  PushpinOutlined,
  EditOutlined,
  HistoryOutlined,
  FolderOutlined,
  PieChartOutlined,
  TrophyOutlined,
  DownloadOutlined,
  RobotOutlined,
  BranchesOutlined,
  BulbOutlined,
  AreaChartOutlined,
  MessageOutlined,
  AppstoreOutlined,
  LinkOutlined,
  SyncOutlined,
  LockOutlined,
  CloudUploadOutlined,
  MonitorOutlined,
  CloudDownloadOutlined,
  CreditCardOutlined,
  InsuranceOutlined,
  TagOutlined,
  CalculatorOutlined,
  QrcodeOutlined,
  BookOutlined,
  BugOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  AuditOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import { useLanguage } from "../contexts/LanguageContext";

const { Sider } = Layout;
const { Title, Text } = Typography;

interface DashboardSidebarProps {
  collapsed: boolean;
  activeFolder: string;
  onToggleCollapse: () => void;
  onFolderChange: (folder: string) => void;
}

export default function DashboardSidebar({
  collapsed,
  activeFolder,
  onToggleCollapse,
  onFolderChange
}: DashboardSidebarProps) {
  const { t } = useLanguage();
  const [quickActionsDrawer, setQuickActionsDrawer] = useState(false);
  const [notificationsDrawer, setNotificationsDrawer] = useState(false);
  const [helpDrawer, setHelpDrawer] = useState(false);

  // Comprehensive menu items with sub-menus
  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: t('dashboard') },
    {
      key: 'CRM',
      icon: <ContactsOutlined />,
      label: 'CRM & Sales',
      children: [
        { key: 'leads', icon: <UserOutlined />, label: 'Leads Management' },
        { key: 'contacts', icon: <SolutionOutlined />, label: 'Contacts' },
        { key: 'opportunities', icon: <DollarOutlined />, label: 'Opportunities' },
        { key: 'pipeline', icon: <LineChartOutlined />, label: 'Sales Pipeline' },
        { key: 'campaigns', icon: <GiftOutlined />, label: 'Marketing Campaigns' },
        { key: 'forecasting', icon: <BarChartOutlined />, label: 'Sales Forecasting' },
      ]
    },
    {
      key: 'ProjectManagement',
      icon: <ProjectOutlined />,
      label: 'Project Management',
      children: [
        { key: 'projects', icon: <ProjectOutlined />, label: 'Projects' },
        { key: 'tasks', icon: <ScheduleOutlined />, label: 'Tasks' },
        { key: 'gantt', icon: <BarChartOutlined />, label: 'Gantt Chart' },
        { key: 'kanban', icon: <AppstoreOutlined />, label: 'Kanban Board' },
        { key: 'timeTracking', icon: <ClockCircleOutlined />, label: 'Time Tracking' },
        { key: 'resources', icon: <TeamOutlined />, label: 'Resource Management' },
        { key: 'milestones', icon: <PushpinOutlined />, label: 'Milestones' },
      ]
    },
    {
      key: 'Inventory',
      icon: <ProductOutlined />,
      label: 'Inventory & Products',
      children: [
        { key: 'products', icon: <ProductOutlined />, label: 'Products' },
        { key: 'categories', icon: <TagsOutlined />, label: 'Categories' },
        { key: 'stock', icon: <StockOutlined />, label: 'Stock Levels' },
        { key: 'warehouses', icon: <BankOutlined />, label: 'Warehouses' },
        { key: 'suppliers', icon: <TruckOutlined />, label: 'Suppliers' },
        { key: 'inventoryOrders', icon: <ShoppingCartOutlined />, label: 'Inventory Orders' },
        { key: 'inventoryReports', icon: <FileTextOutlined />, label: 'Inventory Reports' },
      ]
    },
    {
      key: 'Finance',
      icon: <WalletOutlined />,
      label: 'Finance & Accounting',
      children: [
        { key: 'invoices', icon: <ReconciliationOutlined />, label: 'Invoices' },
        { key: 'payments', icon: <CreditCardOutlined />, label: 'Payments' },
        { key: 'expenses', icon: <DollarOutlined />, label: 'Expenses' },
        { key: 'budgets', icon: <CrownOutlined />, label: 'Budgets' },
        { key: 'accounts', icon: <BankOutlined />, label: 'Accounts' },
        { key: 'banking', icon: <TransactionOutlined />, label: 'Banking' },
        { key: 'tax', icon: <SafetyOutlined />, label: 'Tax Management' },
        { key: 'financialReports', icon: <FileTextOutlined />, label: 'Financial Reports' },
      ]
    },
    {
      key: 'HR',
      icon: <TeamOutlined />,
      label: 'Human Resources',
      children: [
        { key: 'employees', icon: <UserOutlined />, label: 'Employees' },
        { key: 'recruitment', icon: <UsergroupAddOutlined />, label: 'Recruitment' },
        { key: 'payroll', icon: <DollarOutlined />, label: 'Payroll' },
        { key: 'attendance', icon: <ScheduleOutlined />, label: 'Attendance' },
        { key: 'performance', icon: <RocketOutlined />, label: 'Performance' },
        { key: 'training', icon: <SolutionOutlined />, label: 'Training' },
        { key: 'benefits', icon: <GiftOutlined />, label: 'Benefits' },
      ]
    },
    {
      key: 'Communication',
      icon: <MailOutlined />,
      label: 'Communication',
      children: [
        { key: 'messages', icon: <CommentOutlined />, label: 'Messages' },
        { key: 'email', icon: <MailOutlined />, label: 'Email' },
        { key: 'videoCalls', icon: <VideoCameraOutlined />, label: 'Video Calls' },
        { key: 'phone', icon: <PhoneOutlined />, label: 'Phone Calls' },
        { key: 'announcements', icon: <BellOutlined />, label: 'Announcements' },
        { key: 'forums', icon: <GlobalOutlined />, label: 'Forums' },
      ]
    },
    {
      key: 'DocumentManagement',
      icon: <FileTextOutlined />,
      label: 'Document Management',
      children: [
        { key: 'files', icon: <FileTextOutlined />, label: 'Files' },
        { key: 'templates', icon: <TagsOutlined />, label: 'Templates' },
        { key: 'contracts', icon: <ProfileOutlined />, label: 'Contracts' },
        { key: 'signatures', icon: <EditOutlined />, label: 'E-Signatures' },
        { key: 'versionControl', icon: <HistoryOutlined />, label: 'Version Control' },
        { key: 'archive', icon: <FolderOutlined />, label: 'Archive' },
      ]
    },
    {
      key: 'AnalyticsReports',
      icon: <BarChartOutlined />,
      label: 'Analytics & Reports',
      children: [
        { key: 'dashboards', icon: <DashboardOutlined />, label: 'Custom Dashboards' },
        { key: 'salesReports', icon: <LineChartOutlined />, label: 'Sales Reports' },
        { key: 'financialAnalytics', icon: <PieChartOutlined />, label: 'Financial Analytics' },
        { key: 'performance', icon: <RocketOutlined />, label: 'Performance Metrics' },
        { key: 'kpi', icon: <TrophyOutlined />, label: 'KPI Tracking' },
        { key: 'export', icon: <DownloadOutlined />, label: 'Data Export' },
      ]
    },
    {
      key: 'AutomationAI',
      icon: <RobotOutlined />,
      label: 'Automation & AI',
      children: [
        { key: 'workflows', icon: <BranchesOutlined />, label: 'Workflows' },
        { key: 'aiAssistant', icon: <RobotOutlined />, label: 'AI Assistant' },
        { key: 'smartSuggestions', icon: <BulbOutlined />, label: 'Smart Suggestions' },
        { key: 'predictiveAnalytics', icon: <AreaChartOutlined />, label: 'Predictive Analytics' },
        { key: 'chatbots', icon: <MessageOutlined />, label: 'Chatbots' },
      ]
    },
    {
      key: 'Integrations',
      icon: <ApiOutlined />,
      label: 'Integrations',
      children: [
        { key: 'apiManagement', icon: <CodeOutlined />, label: 'API Management' },
        { key: 'thirdPartyApps', icon: <AppstoreOutlined />, label: 'Third-party Apps' },
        { key: 'webhooks', icon: <LinkOutlined />, label: 'Webhooks' },
        { key: 'dataSync', icon: <SyncOutlined />, label: 'Data Sync' },
        { key: 'cloudServices', icon: <CloudOutlined />, label: 'Cloud Services' },
      ]
    },
    {
      key: 'SecurityCompliance',
      icon: <SecurityScanOutlined />,
      label: 'Security & Compliance',
      children: [
        { key: 'accessControl', icon: <KeyOutlined />, label: 'Access Control' },
        { key: 'auditLogs', icon: <HistoryOutlined />, label: 'Audit Logs' },
        { key: 'dataPrivacy', icon: <LockOutlined />, label: 'Data Privacy' },
        { key: 'compliance', icon: <SafetyOutlined />, label: 'Compliance' },
        { key: 'backup', icon: <CloudUploadOutlined />, label: 'Backup & Restore' },
      ]
    },
    {
      key: 'SystemAdministration',
      icon: <SettingOutlined />,
      label: 'System Administration',
      children: [
        { key: 'settings', icon: <SettingOutlined />, label: 'General Settings' },
        { key: 'database', icon: <DatabaseOutlined />, label: 'Database Management' },
        { key: 'serverMonitoring', icon: <MonitorOutlined />, label: 'Server Monitoring' },
        { key: 'maintenance', icon: <ToolOutlined />, label: 'Maintenance' },
        { key: 'updates', icon: <CloudDownloadOutlined />, label: 'Updates' },
      ]
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    onFolderChange(key);
    console.log(`Navigate to ${key}`);
    
    // Add navigation logic here based on key
    switch (key) {
      case 'Dashboard':
        // router.push('/dashboard');
        break;
      case 'Orders':
        // router.push('/orders');
        break;
      case 'Customers':
        // router.push('/customers');
        break;
      case 'Products':
        // router.push('/products');
        break;
      case 'users':
        // router.push('/users');
        break;
      case 'roles':
        // router.push('/roles');
        break;
      case 'permissions':
        // router.push('/permissions');
        break;
      case 'Reports':
        // router.push('/reports');
        break;
      case 'Analytics':
        // router.push('/analytics');
        break;
      case 'Settings':
        // router.push('/settings');
        break;
    }
  };

  return (
    <>
      <Sider
        width={280}
        collapsed={collapsed}
        collapsedWidth={50}
        theme="light"
        style={{
          backgroundColor: '#faf9f8',
          borderRight: '1px solid #edebe9',
          boxShadow: 'none',
          position: 'fixed', // Fixed sidebar
          left: 0,
          top: 48, // Below fixed header
          height: 'calc(100vh - 48px)', // Full height minus header
          zIndex: 100,
          overflow: 'hidden' // Prevent entire sidebar from scrolling
        }}
      >
        {/* Fixed Header with menu toggle */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          padding: '12px 16px',
          borderBottom: '1px solid #edebe9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          backgroundColor: '#faf9f8',
          zIndex: 10
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleCollapse}
            style={{ marginRight: collapsed ? 0 : 8 }}
          />
          {!collapsed && (
            <Title level={5} style={{ margin: 0, color: '#323130' }}>
              {t('navigation')}
            </Title>
          )}
        </div>

        {/* Scrollable Menu Area */}
        <div
          className="sidebar-scroll" // Custom scrollbar class
          style={{
            position: 'absolute',
            top: 48, // Below header
            left: 0,
            right: 0,
            bottom: 80, // Above footer
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: 8
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[activeFolder]}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '14px',
              height: '100%'
            }}
            items={menuItems}
            onClick={handleMenuClick}
            inlineCollapsed={collapsed}
            theme="light"
          />
        </div>

        {/* Fixed Footer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          borderTop: '1px solid #edebe9',
          backgroundColor: '#faf9f8',
          padding: collapsed ? '8px 4px' : '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {collapsed ? (
            // Collapsed footer - vertical icons
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12
            }}>
              <Button type="text" icon={<PlusOutlined />} size="small" title="Quick Actions" onClick={() => setQuickActionsDrawer(true)} />
              <Badge count={3} size="small">
                <Button type="text" icon={<BellOutlined />} size="small" title="Notifications" onClick={() => setNotificationsDrawer(true)} />
              </Badge>
              <Button type="text" icon={<QuestionCircleOutlined />} size="small" title="Help & Support" onClick={() => setHelpDrawer(true)} />
            </div>
          ) : (
            // Expanded footer - horizontal layout with labels
            <>
              <Text strong style={{ color: '#323130', marginBottom: 8, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Quick Access
              </Text>
              <Space size="small" wrap>
                <Button type="text" icon={<PlusOutlined />} onClick={() => setQuickActionsDrawer(true)}></Button>
                <Badge count={3} size="small">
                  <Button type="text" icon={<BellOutlined />} onClick={() => setNotificationsDrawer(true)}></Button>
                </Badge>
                <Button type="text" icon={<QuestionCircleOutlined />} onClick={() => setHelpDrawer(true)}></Button>
              </Space>
            </>
          )}
        </div>
      </Sider>

      {/* Quick Actions Drawer */}
      <Drawer
        title={<Text strong>Quick Actions</Text>}
        placement="right"
        onClose={() => setQuickActionsDrawer(false)}
        open={quickActionsDrawer}
        width={350}
      >
        <Title level={5}>Create New</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block icon={<UserOutlined />}>New Contact</Button>
          <Button block icon={<ProjectOutlined />}>New Project</Button>
          <Button block icon={<ReconciliationOutlined />}>New Invoice</Button>
          <Button block icon={<ScheduleOutlined />}>New Task</Button>
        </Space>
        <Title level={5} style={{ marginTop: 24 }}>Quick Tools</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block icon={<CalculatorOutlined />}>Calculator</Button>
          <Button block icon={<QrcodeOutlined />}>QR Generator</Button>
          <Button block icon={<DownloadOutlined />}>Data Export/Import</Button>
        </Space>
      </Drawer>

      {/* Notifications Drawer */}
      <Drawer
        title={<Text strong>Notifications</Text>}
        placement="right"
        onClose={() => setNotificationsDrawer(false)}
        open={notificationsDrawer}
        width={350}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Alert message="System Update Available" description="A new version of the system is ready for installation." type="success" showIcon />
          <Alert message="Payment Reminder" description="Invoice #2023001 is due in 3 days." type="warning" showIcon />
          <Alert message="New Message" description="You have a new message from John Doe." type="info" showIcon />
        </Space>
      </Drawer>

      {/* Help & Support Drawer */}
      <Drawer
        title={<Text strong>Help & Support</Text>}
        placement="right"
        onClose={() => setHelpDrawer(false)}
        open={helpDrawer}
        width={350}
      >
        <Title level={5}>Getting Started</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block icon={<BookOutlined />}>User Guide</Button>
          <Button block icon={<VideoCameraOutlined />}>Video Tutorials</Button>
          <Button block icon={<QuestionCircleOutlined />}>FAQ</Button>
        </Space>
        <Title level={5} style={{ marginTop: 24 }}>Support</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block icon={<PhoneOutlined />}>Contact Support</Button>
          <Button block icon={<BugOutlined />}>Report a Bug</Button>
          <Button block icon={<BulbOutlined />}>Feature Request</Button>
        </Space>
      </Drawer>
    </>
  );
}

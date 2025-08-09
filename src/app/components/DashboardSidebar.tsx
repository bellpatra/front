"use client";

import React, { useState } from 'react';
import { Layout, Typography, Button, Space, Badge, Menu } from 'antd';
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
  KeyOutlined
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

  // Define menu items with sub-menus
  const menuItems = [
    {
      key: 'Dashboard',
      icon: <DashboardOutlined />,
      label: t('dashboard'),
    },
    {
      key: 'Orders',
      icon: <ShoppingCartOutlined />,
      label: t('orders'),
      children: [
        { key: 'all-orders', label: 'All Orders' },
        { key: 'pending-orders', label: 'Pending' },
        { key: 'completed-orders', label: 'Completed' },
      ]
    },
    {
      key: 'Customers',
      icon: <TeamOutlined />,
      label: t('customers'),
    },
    {
      key: 'Products',
      icon: <ProductOutlined />,
      label: t('products'),
    },
    {
      key: 'UserManagement',
      icon: <UserOutlined />,
      label: t('userManagement'),
      children: [
        {
          key: 'users',
          icon: <TeamOutlined />,
          label: t('users'),
        },
        {
          key: 'roles',
          icon: <SafetyOutlined />,
          label: t('roles'),
        },
        {
          key: 'permissions',
          icon: <KeyOutlined />,
          label: t('permissions'),
        }
      ]
    },
    {
      key: 'Reports',
      icon: <FileTextOutlined />,
      label: t('reports'),
    },
    {
      key: 'Analytics',
      icon: <BarChartOutlined />,
      label: t('analytics'),
    },
    {
      key: 'Settings',
      icon: <SettingOutlined />,
      label: t('settings'),
    }
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
    <Sider
      width={280}
      collapsed={collapsed}
      collapsedWidth={50}
      theme="light"
      style={{
        backgroundColor: '#faf9f8',
        borderRight: '1px solid #edebe9',
        boxShadow: 'none',
        position: 'relative'
      }}
    >
      {/* Header with menu toggle */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #edebe9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        backgroundColor: '#faf9f8'
      }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{ marginRight: collapsed ? 0 : 8 }}
        />
        {!collapsed && (
          <Title level={5} style={{ margin: 0, color: '#323130' }}>
            BellPatra ERP
          </Title>
        )}
      </div>

      {/* Navigation Menu */}
      <div style={{ padding: '16px 0' }}>
        {!collapsed && (
          <div style={{ padding: '0 16px', marginBottom: 8 }}>
            <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>
              {t('favorites')}
            </Text>
          </div>
        )}

        <Menu
          mode="inline"
          selectedKeys={[activeFolder]}
          defaultOpenKeys={['UserManagement']}
          onClick={handleMenuClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '14px'
          }}
          items={menuItems}
          inlineIndent={collapsed ? 0 : 16}
        />
      </div>

      {/* Quick Access Icons (when collapsed) */}
      {collapsed && (
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}>
          <Button 
            type="text" 
            icon={<PlusOutlined />} 
            size="large" 
            style={{ 
              color: '#323130', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 32, 
              height: 32 
            }} 
            title="New Item" 
            onClick={() => console.log('New item clicked')} 
          />
          <Button 
            type="text" 
            icon={<SettingOutlined />} 
            size="large" 
            style={{ 
              color: '#323130', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 32, 
              height: 32 
            }} 
            title="Settings" 
            onClick={() => console.log('Settings clicked')} 
          />
          <Button 
            type="text" 
            icon={<QuestionCircleOutlined />} 
            size="large" 
            style={{ 
              color: '#323130', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 32, 
              height: 32 
            }} 
            title="Help" 
            onClick={() => console.log('Help clicked')} 
          />
        </div>
      )}
    </Sider>
  );
}

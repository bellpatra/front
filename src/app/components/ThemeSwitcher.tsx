"use client";

import React from 'react';
import { Button, Dropdown, Space, Typography } from 'antd';
import { 
  SunOutlined, 
  MoonOutlined, 
  DesktopOutlined, 
  CheckOutlined 
} from '@ant-design/icons';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';

const { Text } = Typography;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      key: 'light',
      label: (
        <Space>
          <SunOutlined />
          <Text>Light</Text>
          {theme === 'light' && <CheckOutlined style={{ color: '#0078d4' }} />}
        </Space>
      ),
      onClick: () => setTheme('light')
    },
    {
      key: 'dark',
      label: (
        <Space>
          <MoonOutlined />
          <Text>Dark</Text>
          {theme === 'dark' && <CheckOutlined style={{ color: '#0078d4' }} />}
        </Space>
      ),
      onClick: () => setTheme('dark')
    },
    {
      key: 'system',
      label: (
        <Space>
          <DesktopOutlined />
          <Text>System</Text>
          {theme === 'system' && <CheckOutlined style={{ color: '#0078d4' }} />}
        </Space>
      ),
      onClick: () => setTheme('system')
    }
  ];

  const getThemeIcon = (currentTheme: ThemeMode) => {
    switch (currentTheme) {
      case 'light':
        return <SunOutlined />;
      case 'dark':
        return <MoonOutlined />;
      case 'system':
        return <DesktopOutlined />;
      default:
        return <SunOutlined />;
    }
  };

  return (
    <Dropdown
      menu={{ items: themeOptions }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        type="text"
        icon={getThemeIcon(theme)}
        size="small"
        style={{ 
          color: 'white',
          padding: '4px 8px'
        }}
        title="Change theme"
      />
    </Dropdown>
  );
}
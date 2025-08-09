"use client";

import React, { useState } from 'react';
import { Layout, Typography, Input, Space, Button, Badge, Dropdown, Avatar, Form } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  BellOutlined,
  DownOutlined,
  CalendarOutlined,
  TeamOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  CommentOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { User } from "../lib/authService";

const { Header } = Layout;
const { Title, Text } = Typography;

interface DashboardHeaderProps {
  user: User;
  searchExpanded: boolean;
  searchValue: string;
  searchSuggestions: any[];
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  onAdvancedSearchClick: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  user,
  searchExpanded,
  searchValue,
  searchSuggestions,
  onSearchFocus,
  onSearchBlur,
  onSearchChange,
  onSuggestionClick,
  onAdvancedSearchClick,
  onLogout
}: DashboardHeaderProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const rightSideIcons = [
    { icon: <CalendarOutlined />, tooltip: 'Calendar', onClick: () => console.log('Calendar clicked') },
    { icon: <TeamOutlined />, tooltip: 'People', onClick: () => console.log('People clicked') },
    { icon: <AppstoreOutlined />, tooltip: 'Apps', onClick: () => console.log('Apps clicked') },
    { icon: <QuestionCircleOutlined />, tooltip: 'Help', onClick: () => console.log('Help clicked') },
    { icon: <GlobalOutlined />, tooltip: 'Web', onClick: () => console.log('Web clicked') },
    { icon: <CommentOutlined />, tooltip: 'Chat', onClick: () => console.log('Chat clicked') },
    { icon: <PhoneOutlined />, tooltip: 'Calls', onClick: () => console.log('Calls clicked') },
    { icon: <VideoCameraOutlined />, tooltip: 'Video', onClick: () => console.log('Video clicked') }
  ];

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

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        console.log('Profile clicked');
        break;
      case 'settings':
        console.log('Settings clicked');
        break;
      case 'logout':
        onLogout();
        break;
    }
  };

  return (
    <>
      <Header style={{
        height: 48,
        padding: '0 20px',
        backgroundColor: '#0078d4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1001
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Title level={4} style={{ 
            margin: 0, 
            color: 'white',
            marginRight: 24
          }}>
            {t('dashboard')}
          </Title>
          
          {/* Expandable Search Container */}
          <div style={{
            position: 'relative',
            flex: 1,
            maxWidth: searchExpanded ? 600 : 400,
            transition: 'max-width 0.3s ease'
          }}>
            <Input
              value={searchValue}
              onChange={onSearchChange}
              placeholder={t('searchPlaceholder')}
              prefix={<SearchOutlined />}
              suffix={
                <Space size={4}>
                  {searchValue && (
                    <Button
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      style={{ 
                        color: '#666',
                        padding: '0 4px'
                      }}
                      onClick={() => {
                        onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
                      }}
                    />
                  )}
                  <Button
                    type="text"
                    size="small"
                    icon={<FilterOutlined />}
                    style={{ 
                      color: '#666',
                      padding: '0 4px'
                    }}
                    onClick={onAdvancedSearchClick}
                    title={t('advancedSearch')}
                  />
                </Space>
              }
              style={{ 
                width: '100%',
                height: searchExpanded ? '36px' : '28px',
                backgroundColor: searchExpanded ? 'white' : 'rgba(255,255,255,0.9)',
                border: searchExpanded ? '2px solid #106ebe' : '1px solid transparent',
                boxShadow: searchExpanded ? '0 8px 25px rgba(0,0,0,0.15)' : 'none',
                borderRadius: searchExpanded ? '8px' : '4px',
                fontSize: searchExpanded ? '14px' : '13px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: searchExpanded ? 'translateY(-2px)' : 'translateY(0)'
              }}
              size="small"
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
            />
            
            {/* Search Suggestions Dropdown */}
            {searchExpanded && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #e1e1e1',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
                zIndex: 1001,
                marginTop: '6px',
                maxHeight: '450px',
                overflowY: 'auto',
                animation: 'slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {/* Search tips header */}
                <div style={{
                  padding: '12px 16px 8px',
                  borderBottom: '1px solid #f5f5f5',
                  backgroundColor: '#fafafa'
                }}>
                  <Text style={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
                    {t('advancedSearch')} • Press Ctrl+K for shortcuts
                  </Text>
                </div>
                
                {searchSuggestions.map((section, sectionIndex) => (
                  <div key={sectionIndex} style={{ padding: '8px 0' }}>
                    <div style={{
                      padding: '8px 16px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#106ebe',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {section.title}
                    </div>
                    {section.items.map((item: string, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        style={{
                          padding: '10px 16px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#323130',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f2f1';
                          e.currentTarget.style.borderLeft = '3px solid #106ebe';
                          e.currentTarget.style.paddingLeft = '13px';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderLeft = 'none';
                          e.currentTarget.style.paddingLeft = '16px';
                        }}
                        onClick={() => onSuggestionClick(item)}
                      >
                        <SearchOutlined style={{ color: '#605e5c', fontSize: '14px' }} />
                        <span style={{ flex: 1 }}>{item}</span>
                        <Text style={{ fontSize: '11px', color: '#8a8886' }}>
                          ↵
                        </Text>
                      </div>
                    ))}
                    {sectionIndex < searchSuggestions.length - 1 && (
                      <div style={{ height: '1px', backgroundColor: '#edebe9', margin: '8px 16px' }} />
                    )}
                  </div>
                ))}
                
                {/* Footer with keyboard shortcut info */}
                <div style={{
                  padding: '8px 16px',
                  borderTop: '1px solid #f5f5f5',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: '11px', color: '#8a8886' }}>
                    ↑↓ to navigate • ↵ to select • Esc to close
                  </Text>
                  <Button 
                    type="link" 
                    size="small" 
                    style={{ fontSize: '11px', padding: '0 4px' }}
                    onClick={onAdvancedSearchClick}
                  >
                    {t('advancedSearch')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Space size="small" style={{ marginLeft: 16 }}>
          {/* Right-side navigation icons */}
          {rightSideIcons.map((item, index) => (
            <Button
              key={index}
              type="text"
              icon={item.icon}
              size="small"
              style={{ 
                color: 'white',
                padding: '4px 8px'
              }}
              onClick={item.onClick}
              title={item.tooltip}
            />
          ))}
          
          <div style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.3)', margin: '0 8px' }} />
          
          {/* Theme and Language Switchers */}
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          <div style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.3)', margin: '0 8px' }} />
          
          <Badge count={5} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              size="small"
              style={{ color: 'white' }}
            />
          </Badge>
          
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer', color: 'white' }}>
              <Avatar size="small" style={{ backgroundColor: '#106ebe' }}>
                {user.fullName.charAt(0).toUpperCase()}
              </Avatar>
              <Text style={{ color: 'white' }}>{user.fullName}</Text>
              <DownOutlined style={{ fontSize: 10 }} />
            </Space>
          </Dropdown>
        </Space>
      </Header>

      {/* Overlay when search is expanded */}
      {searchExpanded && (
        <div
          style={{
            position: 'fixed',
            top: 48,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 999
          }}
          onClick={() => {
            onSearchBlur();
          }}
        />
      )}
    </>
  );
}

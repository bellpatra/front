"use client";

import React from 'react';
import { Button, Dropdown, Space, Typography } from 'antd';
import { CheckOutlined, GlobalOutlined } from '@ant-design/icons';
import { useLanguage, languages, Language } from '../contexts/LanguageContext';

const { Text } = Typography;

export default function LanguageSwitcher() {
  const { language, setLanguage, currentLanguage } = useLanguage();

  const languageOptions = Object.values(languages).map((lang) => ({
    key: lang.code,
    label: (
      <Space>
        <span style={{ fontSize: '16px' }}>{lang.flag}</span>
        <Text>{lang.name}</Text>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {lang.nativeName}
        </Text>
        {language === lang.code && <CheckOutlined style={{ color: '#0078d4' }} />}
      </Space>
    ),
    onClick: () => setLanguage(lang.code)
  }));

  return (
    <Dropdown
      menu={{ items: languageOptions }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        type="text"
        size="small"
        style={{ 
          color: 'white',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        title={`Current language: ${currentLanguage.name}`}
      >
        <span style={{ fontSize: '14px' }}>{currentLanguage.flag}</span>
        <GlobalOutlined style={{ fontSize: '12px' }} />
      </Button>
    </Dropdown>
  );
}
"use client";

import React from 'react';
import { Layout, Typography, Space, Divider } from 'antd';
import { useLanguage } from "../contexts/LanguageContext";

const { Footer } = Layout;
const { Text, Link } = Typography;

export default function DashboardFooter() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <Footer style={{
      backgroundColor: '#faf9f8',
      borderTop: '1px solid #edebe9',
      padding: '16px 24px',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Left side - Copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text style={{ fontSize: '13px', color: '#605e5c' }}>
            © {currentYear} BellPatra ERP. All rights reserved.
          </Text>
        </div>

        {/* Center - Links */}
        <Space split={<Divider type="vertical" />} size="middle">
          <Link 
            href="#" 
            style={{ 
              fontSize: '13px', 
              color: '#605e5c',
              textDecoration: 'none'
            }}
          >
            {t('privacyPolicy')}
          </Link>
          <Link 
            href="#" 
            style={{ 
              fontSize: '13px', 
              color: '#605e5c',
              textDecoration: 'none'
            }}
          >
            {t('termsOfService')}
          </Link>
          <Link 
            href="#" 
            style={{ 
              fontSize: '13px', 
              color: '#605e5c',
              textDecoration: 'none'
            }}
          >
            {t('support')}
          </Link>
          <Link 
            href="#" 
            style={{ 
              fontSize: '13px', 
              color: '#605e5c',
              textDecoration: 'none'
            }}
          >
            {t('documentation')}
          </Link>
        </Space>

        {/* Right side - Version and Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Text style={{ fontSize: '12px', color: '#8a8886' }}>
            {t('version')}
          </Text>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#107c10'
          }} title="System Status: Online" />
          <Text style={{ fontSize: '12px', color: '#8a8886' }}>
            Online
          </Text>
        </div>
      </div>

      {/* Additional info row */}
      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #f3f2f1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <Text style={{ fontSize: '12px', color: '#8a8886' }}>
          {t('poweredBy')} <strong style={{ color: '#0078d4' }}>BellPatra Technologies</strong>
        </Text>
        <Text style={{ fontSize: '12px', color: '#8a8886' }}>
          Server: Mumbai, India
        </Text>
        <Text style={{ fontSize: '12px', color: '#8a8886' }}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </div>
    </Footer>
  );
}

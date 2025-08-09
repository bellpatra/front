"use client";

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './globals.css';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'system';
              if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
        }}
      />
    </head>
    <body>
      <ThemeProvider>
        <LanguageProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </LanguageProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
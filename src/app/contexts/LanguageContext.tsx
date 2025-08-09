"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ru';

interface LanguageInfo {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

export const languages: Record<Language, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    flag: '🇮🇳',
    nativeName: 'हिंदी'
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    flag: '🇷🇺',
    nativeName: 'Русский'
  }
};

// Translations
export const translations = {
  en: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    customers: 'Customers',
    products: 'Products',
    reports: 'Reports',
    analytics: 'Analytics',
    settings: 'Settings',
    userManagement: 'User Management',
    users: 'Users',
    roles: 'Roles',
    permissions: 'Permissions',
    search: 'Search everything',
    searchPlaceholder: 'Search mail and people',
    searchIn: 'Search in',
    searchFrom: 'From',
    searchTo: 'To',
    searchSubject: 'Subject',
    searchKeywords: 'Has keywords',
    searchDateRange: 'Sent',
    searchReadStatus: 'Read status',
    searchHasAttachments: 'Has attachments',
    searchButton: 'Search',
    clearFilters: 'Clear filters',
    recentSearches: 'Recent searches',
    quickActions: 'Quick actions',
    popularSearches: 'Popular searches',
    advancedSearch: 'Advanced search',
    welcome: 'Welcome Back',
    goodMorning: 'Good morning',
    recentActivity: 'Recent Activity',
    totalSales: 'Total Sales',
    totalOrders: 'Total Orders',
    totalUsers: 'Total Users',
    conversionRate: 'Conversion Rate',
    profile: 'Profile',
    logout: 'Logout',
    signOut: 'Sign out',
    myProfile: 'My Profile',
    help: 'Help',
    newItem: 'New Item',
    viewAll: 'View all',
    favorites: 'FAVORITES',
    // Login page
    signin: 'Sign in to BellPatra ERP',
    username: 'Username or Email',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember me',
    login: 'Sign In',
    welcomeBack: 'Welcome Back',
    signInToContinue: 'Sign in to continue to your account',
    quickLogin: 'Quick Login',
    scanQRCode: 'Scan QR code with your mobile app',
    stepsToScanQR: 'Steps to scan QR Code',
    openBellpatraApp: 'Open Bellpatra App',
    tapScanOption: 'Tap Scan option available at the bottom',
    pointBellpatraScan: 'Point bellpatra Scan at QR Code to login',
    downloadMobileApp: 'Download Mobile App',
    orContinueWith: 'Or continue with',
    signInWithGoogle: 'Sign in with Google',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign up',
    // Theme
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    // Language
    language: 'Language',
    english: 'English',
    hindi: 'हिन्दी',
    russian: 'Русский',
    // Footer
    poweredBy: 'Powered by',
    copyright: '© 2024 BellPatra ERP. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    support: 'Support',
    documentation: 'Documentation',
    version: 'Version 1.0.0'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    orders: 'ऑर्डर',
    customers: 'ग्राहक',
    products: 'उत्पाद',
    reports: 'रिपोर्ट',
    analytics: 'विश्लेषण',
    settings: 'सेटिंग्स',
    userManagement: 'उपयोगकर्ता प्रबंधन',
    users: 'उपयोगकर्ता',
    roles: 'भूमिकाएं',
    permissions: 'अनुमतियां',
    search: 'सब कुछ खोजें',
    searchPlaceholder: 'मेल और लोग खोजें',
    searchIn: 'में खोजें',
    searchFrom: 'से',
    searchTo: 'को',
    searchSubject: 'विषय',
    searchKeywords: 'कीवर्ड है',
    searchDateRange: 'भेजा गया',
    searchReadStatus: 'पढ़ने की स्थिति',
    searchHasAttachments: 'अनुलग्नक है',
    searchButton: 'खोजें',
    clearFilters: 'फिल्टर साफ़ करें',
    recentSearches: 'हाल की खोजें',
    quickActions: 'त्वरित क्रियाएं',
    popularSearches: 'लोकप्रिय खोजें',
    advancedSearch: 'उन्नत खोज',
    welcome: 'वापसी पर स्वागत है',
    goodMorning: 'सुप्रभात',
    recentActivity: 'हाल की गतिविधि',
    totalSales: 'कुल बिक्री',
    totalOrders: 'कुल ऑर्डर',
    totalUsers: 'कुल उपयोगकर्ता',
    conversionRate: 'रूपांतरण दर',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
    signOut: 'साइन आउट',
    myProfile: 'मेरी प्रोफ़ाइल',
    help: 'सहायता',
    newItem: 'नया आइटम',
    viewAll: 'सभी देखें',
    favorites: 'पसंदीदा',
    // Login page
    signin: 'BellPatra ERP में साइन इन करें',
    username: 'उपयोगकर्ता नाम या ईमेल',
    email: 'ईमेल',
    password: 'पासवर्ड',
    rememberMe: 'मुझे याद रखें',
    login: 'साइन इन',
    welcomeBack: 'वापसी पर स्वागत है',
    signInToContinue: 'अपने खाते में जारी रखने के लिए साइन इन करें',
    quickLogin: 'त्वरित लॉगिन',
    scanQRCode: 'अपने मोबाइल ऐप से QR कोड स्कैन करें',
    stepsToScanQR: 'QR कोड स्कैन करने के चरण',
    openBellpatraApp: 'बेलपत्रा ऐप खोलें',
    tapScanOption: 'नीचे उपलब्ध स्कैन विकल्प पर टैप करें',
    pointBellpatraScan: 'लॉगिन के लिए QR कोड पर बेलपत्रा स्कैन का निशाना लगाएं',
    downloadMobileApp: 'मोबाइल ऐप डाउनलोड करें',
    orContinueWith: 'या इसके साथ जारी रखें',
    signInWithGoogle: 'Google के साथ साइन इन करें',
    dontHaveAccount: 'खाता नहीं है?',
    signUp: 'साइन अप करें',
    // Theme
    theme: 'थीम',
    light: 'लाइट',
    dark: 'डार्क',
    system: 'सिस्टम',
    // Language
    language: 'भाषा',
    english: 'English',
    hindi: 'हिन्दी',
    russian: 'Русский',
    // Footer
    poweredBy: 'द्वारा संचालित',
    copyright: '© 2024 BellPatra ERP। सभी अधिकार सुरक्षित।',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    support: 'सहायता',
    documentation: 'दस्तावेज़ीकरण',
    version: 'संस्करण 1.0.0'
  },
  ru: {
    dashboard: 'Панель управления',
    orders: 'Заказы',
    customers: 'Клиенты',
    products: 'Продукты',
    reports: 'Отчеты',
    analytics: 'Аналитика',
    settings: 'Настройки',
    userManagement: 'Управление пользователями',
    users: 'Пользователи',
    roles: 'Роли',
    permissions: 'Разрешения',
    search: 'Поиск по всему',
    searchPlaceholder: 'Поиск почты и людей',
    searchIn: 'Искать в',
    searchFrom: 'От',
    searchTo: 'Кому',
    searchSubject: 'Тема',
    searchKeywords: 'Содержит ключевые слова',
    searchDateRange: 'Отправлено',
    searchReadStatus: 'Статус прочтения',
    searchHasAttachments: 'Есть вложения',
    searchButton: 'Поиск',
    clearFilters: 'Очистить фильтры',
    recentSearches: 'Недавние поиски',
    quickActions: 'Быстрые действия',
    popularSearches: 'Популярные поиски',
    advancedSearch: 'Расширенный поиск',
    welcome: 'Добро пожаловать обратно',
    goodMorning: 'Доброе утро',
    recentActivity: 'Последняя активность',
    totalSales: 'Общие продажи',
    totalOrders: 'Всего заказов',
    totalUsers: 'Всего пользователей',
    conversionRate: 'Коэффициент конверсии',
    profile: 'Профиль',
    logout: 'Выход',
    signOut: 'Выйти',
    myProfile: 'Мой профиль',
    help: 'Помощь',
    newItem: 'Новый элемент',
    viewAll: 'Посмотреть все',
    favorites: 'ИЗБРАННОЕ',
    // Login page
    signin: 'Войти в BellPatra ERP',
    username: 'Имя пользователя или Email',
    email: 'Электронная почта',
    password: 'Пароль',
    rememberMe: 'Запомнить меня',
    login: 'Войти',
    welcomeBack: 'Добро пожаловать обратно',
    signInToContinue: 'Войдите, чтобы продолжить работу с вашей учетной записью',
    quickLogin: 'Быстрый вход',
    scanQRCode: 'Отсканируйте QR-код с помощью мобильного приложения',
    stepsToScanQR: 'Шаги для сканирования QR-кода',
    openBellpatraApp: 'Откройте приложение Bellpatra',
    tapScanOption: 'Нажмите на опцию сканирования внизу',
    pointBellpatraScan: 'Наведите сканер Bellpatra на QR-код для входа',
    downloadMobileApp: 'Скачать мобильное приложение',
    orContinueWith: 'Или продолжить с',
    signInWithGoogle: 'Войти через Google',
    dontHaveAccount: 'Нет учетной записи?',
    signUp: 'Зарегистрироваться',
    // Theme
    theme: 'Тема',
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    // Language
    language: 'Язык',
    english: 'English',
    hindi: 'हिन्दी',
    russian: 'Русский',
    // Footer
    poweredBy: 'Работает на',
    copyright: '© 2024 BellPatra ERP. Все права защищены.',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    support: 'Поддержка',
    documentation: 'Документация',
    version: 'Версия 1.0.0'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  currentLanguage: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['en', 'hi', 'ru'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  const currentLanguage = languages[language];

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      currentLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

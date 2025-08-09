"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import { 
  Card, 
  Typography, 
  Button, 
  Input, 
  Checkbox, 
  Alert, 
  Spin,
  Row,
  Col,
  Divider,
  Space
} from "antd";
import { 
  UserOutlined, 
  LockOutlined, 
  EyeTwoTone, 
  EyeInvisibleOutlined,
  GoogleOutlined,
  QrcodeOutlined,
  MobileOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLanguage } from "./contexts/LanguageContext";
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTheme } from './contexts/ThemeContext';
import authService from "./lib/authService";
import QRCode from 'qrcode';

const { Title, Text, Link } = Typography;

// Form validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function HomePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const router = useRouter();
  const { t } = useLanguage();
  const { actualTheme } = useTheme();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "ajay@admin.com",
      password: "Ajay@9711",
      rememberMe: true,
    },
  });

  // Check if user is already authenticated
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  // Generate QR code for mobile login
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = {
          type: 'login',
          timestamp: Date.now(),
          sessionId: Math.random().toString(36).substring(7)
        };
        const qrString = await QRCode.toDataURL(JSON.stringify(qrData), {
          width: 200,
          margin: 2,
          color: {
            dark: '#1677ff',
            light: '#ffffff'
          }
        });
        setQrCodeUrl(qrString);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, []);

  // Handle form submission
  const onSubmit = useCallback(async (data: LoginFormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        username: data.email,
        password: data.password,
      });

      if (response.status === 'success') {
        // Using startTransition for React 18 concurrent features
        startTransition(() => {
          router.push("/dashboard");
        });
      }
    } catch (error: any) {
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const isFormLoading = loading || isSubmitting || isPending;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: actualTheme === 'dark' ? '#1a1a1a' : '#ffffff',
      display: 'flex',
      position: 'relative'
    }}>
      {/* Theme and Language Switchers */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        display: 'flex',
        gap: 8,
        zIndex: 10
      }}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      {/* Left Side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        minHeight: '100vh'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 400,
          padding: '0 20px'
        }}>
          {/* Logo and Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: '#1677ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <CheckCircleOutlined style={{ fontSize: 28, color: 'white' }} />
            </div>
            <Title level={3} style={{ 
              marginBottom: 8, 
              color: actualTheme === 'dark' ? '#ffffff' : '#1f1f1f',
              fontWeight: 600 
            }}>
              Auth Belli
            </Title>
          </div>

          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ 
              marginBottom: 8, 
              color: actualTheme === 'dark' ? '#ffffff' : '#1f1f1f',
              fontSize: 28,
              fontWeight: 600
            }}>
              {t('welcomeBack')}
            </Title>
            <Text style={{ 
              fontSize: 16, 
              color: actualTheme === 'dark' ? '#a0a0a0' : '#666666' 
            }}>
              {t('signInToContinue')}
            </Text>
          </div>

          {/* Language Selector */}
          <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🇺🇸</span>
            <Text style={{ color: actualTheme === 'dark' ? '#a0a0a0' : '#666666' }}>
              English
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
              closable
              onClose={() => setError("")}
            />
          )}

          <Spin spinning={isFormLoading} tip="Signing in...">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                {/* Email Field */}
                <div>
                  <Text strong style={{ 
                    display: 'block', 
                    marginBottom: 8,
                    color: actualTheme === 'dark' ? '#ffffff' : '#1f1f1f'
                  }}>
                    {t('email')}
                  </Text>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        placeholder="test@example.com"
                        status={errors.email ? 'error' : ''}
                        style={{
                          height: 48,
                          borderRadius: 8,
                          backgroundColor: actualTheme === 'dark' ? '#2a2a2a' : '#ffffff',
                          borderColor: actualTheme === 'dark' ? '#404040' : '#d9d9d9',
                          color: actualTheme === 'dark' ? '#ffffff' : '#1f1f1f'
                        }}
                      />
                    )}
                  />
                  {errors.email && (
                    <Text type="danger" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
                      {errors.email.message}
                    </Text>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <Text strong style={{ 
                    display: 'block', 
                    marginBottom: 8,
                    color: actualTheme === 'dark' ? '#ffffff' : '#1f1f1f'
                  }}>
                    {t('password')}
                  </Text>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        size="large"
                        placeholder="••••••••••"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        status={errors.password ? 'error' : ''}
                        style={{
                          height: 48,
                          borderRadius: 8,
                          backgroundColor: actualTheme === 'dark' ? '#2a2a2a' : '#ffffff',
                          borderColor: actualTheme === 'dark' ? '#404040' : '#d9d9d9'
                        }}
                      />
                    )}
                  />
                  {errors.password && (
                    <Text type="danger" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
                      {errors.password.message}
                    </Text>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isFormLoading}
                  disabled={isFormLoading}
                  style={{
                    height: 48,
                    background: '#1677ff',
                    borderColor: '#1677ff',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 500,
                    marginTop: 8
                  }}
                >
                  {t('login')}
                </Button>

                {/* Divider */}
                <div style={{ 
                  textAlign: 'center', 
                  margin: '20px 0',
                  position: 'relative'
                }}>
                  <div style={{
                    height: 1,
                    backgroundColor: actualTheme === 'dark' ? '#404040' : '#e8e8e8',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: actualTheme === 'dark' ? '#1a1a1a' : '#ffffff',
                      padding: '0 16px',
                      color: actualTheme === 'dark' ? '#a0a0a0' : '#666666',
                      fontSize: 14
                    }}>
                      {t('orContinueWith')}
                    </span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  size="large"
                  block
                  icon={<GoogleOutlined />}
                  style={{
                    height: 48,
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 500,
                    backgroundColor: actualTheme === 'dark' ? '#2a2a2a' : '#ffffff',
                    borderColor: actualTheme === 'dark' ? '#404040' : '#d9d9d9',
                    color: actualTheme === 'dark' ? '#ffffff' : '#1f1f1f'
                  }}
                >
                  {t('signInWithGoogle')}
                </Button>

                {/* Sign Up Link */}
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Text style={{ color: actualTheme === 'dark' ? '#a0a0a0' : '#666666' }}>
                    {t('dontHaveAccount')}{' '}
                    <Link href="#" style={{ color: '#1677ff', fontWeight: 500 }}>
                      {t('signUp')}
                    </Link>
                  </Text>
                </div>
              </Space>
            </form>
          </Spin>
        </div>
      </div>

      {/* Right Side - QR Code Login */}
      <div style={{
        width: 480,
        backgroundColor: '#f8fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        borderLeft: '1px solid #e8e8e8'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 320 }}>
          <Title level={3} style={{ 
            marginBottom: 16, 
            color: '#1f1f1f',
            fontWeight: 600 
          }}>
            {t('quickLogin')}
          </Title>
          
          <Text style={{ 
            fontSize: 16, 
            color: '#666666',
            display: 'block',
            marginBottom: 32 
          }}>
            {t('scanQRCode')}
          </Text>

          {/* QR Code */}
          <div style={{
            width: 200,
            height: 200,
            backgroundColor: '#ffffff',
            border: '1px solid #e8e8e8',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
          }}>
            {qrCodeUrl ? (
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                style={{ width: 180, height: 180 }}
              />
            ) : (
              <QrcodeOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />
            )}
          </div>

          {/* Steps */}
          <div style={{ textAlign: 'left', marginBottom: 32 }}>
            <Title level={5} style={{ 
              marginBottom: 16, 
              color: '#1f1f1f',
              fontWeight: 600,
              textAlign: 'center'
            }}>
              {t('stepsToScanQR')}
            </Title>
            
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#1677ff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  1
                </div>
                <Text style={{ color: '#1f1f1f', fontSize: 14 }}>
                  {t('openBellpatraApp')}
                </Text>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#1677ff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  2
                </div>
                <Text style={{ color: '#1f1f1f', fontSize: 14 }}>
                  {t('tapScanOption')}
                </Text>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#1677ff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  3
                </div>
                <Text style={{ color: '#1f1f1f', fontSize: 14 }}>
                  {t('pointBellpatraScan')}
                </Text>
              </div>
            </Space>
          </div>

          {/* Download App Button */}
          <Button
            type="primary"
            size="large"
            icon={<MobileOutlined />}
            block
            style={{
              height: 48,
              backgroundColor: '#1677ff',
              borderColor: '#1677ff',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 500
            }}
          >
            {t('downloadMobileApp')}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap'
      }}>
        <Link href="#" style={{ color: '#1677ff', fontSize: 14 }}>
          Help
        </Link>
        <Link href="#" style={{ color: '#1677ff', fontSize: 14 }}>
          Contact
        </Link>
        <Link href="#" style={{ color: '#1677ff', fontSize: 14 }}>
          Privacy
        </Link>
        <Link href="#" style={{ color: '#1677ff', fontSize: 14 }}>
          Terms
        </Link>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <span style={{ fontSize: 16 }}>🇺🇸</span>
        <Text style={{ color: '#666666', fontSize: 14 }}>
          English
        </Text>
        <Text style={{ color: '#999999', fontSize: 14, marginLeft: 16 }}>
          © 2025 Auth Bellpatra. All rights reserved.
        </Text>
      </div>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page which is now the login page
    router.replace("/");
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Spin size="large" />
      <div style={{ color: '#666', fontSize: '14px' }}>Redirecting to login...</div>
    </div>
  );
}

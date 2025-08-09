// components/LogoutButton.tsx
"use client";

import { useState, useTransition, useCallback } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import authService from "../lib/authService";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    setLoading(true);
    
    try {
      await authService.logout();
      message.success("Logged out successfully");
      
      // Using startTransition for React 18 concurrent features
      startTransition(() => {
        router.push("/login");
      });
    } catch (error: any) {
      message.error("Logout failed");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <Button 
      onClick={handleLogout}
      loading={loading || isPending}
      disabled={loading || isPending}
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { authApi } from '@/lib/api/clientApi';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.getSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearIsAuthenticated]);

  useEffect(() => {
    if (!isLoading) {
      if (isPrivateRoute && !isAuthenticated) {
        router.push('/sign-in');
        return;
      }
      
      if (isAuthRoute && isAuthenticated) {
        router.push('/profile');
        return;
      }
    }
  }, [isLoading, isAuthenticated, isPrivateRoute, isAuthRoute, router]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}


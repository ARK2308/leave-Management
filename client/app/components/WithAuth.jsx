"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedRoute(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.replace('/unauthorized'); // or /dashboard as fallback
      }
    }, [user]);

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return null; // Don’t show component while redirecting
    }

    return <Component {...props} />;
  };
}

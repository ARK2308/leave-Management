// router.push(user.role === 'employee' ? '/dashboard' : '/admin-dashboard');
"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const router = useRouter();

  // On mount: auto-login any stored user
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem('LMS_user');
    if (!raw) return;

    let stored;
    try {
      stored = JSON.parse(raw);
    } catch {
      // corrupted JSON → clear it
      localStorage.removeItem('LMS_user');
      return;
    }

    if (stored.username && stored.role) {
      setUser(stored);
      // Redirect to their default page, but don't do it if we're already there
      const dest =
        stored.role === 'employee'
          ? '/dashboard'
          : '/admin-dashboard';
      if (router.pathname !== dest) {
        router.replace(dest);
      }
    }
  }, [router]);

  const login = (username, role) => {
    const u = { username, role };
    setUser(u);
    localStorage.setItem('LMS_user', JSON.stringify(u));
    router.push(role === 'employee' ? '/dashboard' : '/admin-dashboard');
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('LMS_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

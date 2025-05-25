// /components/Sidebar.jsx
"use client"

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Pages where sidebar should be hidden
  const hiddenRoutes = ['/login'];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  if (!user) return null;

  const links = [];

  if (user.role === 'employee') {
    links.push({ href: '/dashboard', label: 'Dashboard' });
    links.push({ href: '/calendar', label: 'Calendar' });
    links.push({ href: '/leave', label: 'Request Leave' });
  }

  if (user.role === 'manager' || user.role === 'admin') {
    links.push({ href: '/dashboard', label: 'Approve Leaves' });
  }

  // Managers/admins still might want to manage employees:
  if (user.role === 'admin') {
    links.push({ href: '/dashboard', label: 'Employee Management' });
  }

  return (
    <aside className=" w-60 bg-[#121212] text-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">LMS</h2>
      <nav className="space-y-2">
        {links.map(l => (
          <Link key={l.href} href={l.href}>
            <p className="block px-3 py-2 rounded hover:bg-gray-700">
              {l.label}
            </p>
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="mt-8 px-3 py-2 bg-red-600 rounded hover:bg-red-500 w-full text-center"
      >
        Logout
      </button>
    </aside>
  );
}

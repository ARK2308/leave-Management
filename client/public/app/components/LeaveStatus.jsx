"use client"

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLeave } from '../context/LeaveContext';
import { useRouter } from 'next/navigation';

export default function LeaveStatus() {
  const { user } = useAuth();
  const { leaveRequests } = useLeave();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'employee') router.push('/login');
  }, [user]);

  const myRequests = leaveRequests.filter(r => r.username === user.username);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Leave Requests</h2>
      <ul className="space-y-3">
        {myRequests.map(r => (
          <li key={r.id} className="border p-4 rounded">
            <p><strong>Reason:</strong> {r.reason}</p>
            <p><strong>Status:</strong> {r.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

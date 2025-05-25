"use client"

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useLeave } from '../../../context/LeaveContext';
import LeaveRequest from '@/app/components/LeaveRequest';
import LeaveStatus from '@/app/components/LeaveStatus';
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import LeaveTable from '@/app/components/LeaveTable';
import LeaveCalendar from '@/app/components/Calender';
import LeavePage from '../manage-leave/page';
import AdminLeaveTable from '@/app/components/(admin)/AdminLeaveTable';
import LeaveManagement from '@/app/components/(admin)/LeaveManagement';

const leavesData = Array.from({ length: 256 }).map((_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? "Sick Leave" : "Annual Leave",
  from: "15/08/2017",
  to: "16/08/2017",
  days: 4,
  reason: i % 2 === 0 ? "Compensation Leave" : "Jury Service Leave",
  approvedBy: i % 2 === 0 ? "Eleanor Pena" : "Dianne Russell",
  status: i % 5 === 0 ? "Rejected" : i % 4 === 0 ? "Pending" : "Approved",
}));

const statusColor = {
  Approved: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Rejected: "bg-red-100 text-red-600",
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { leaveRequests } = useLeave();
  const router = useRouter();

  // pagination and filter
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(leavesData.length / rowsPerPage);

  const paginatedData = leavesData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Redirect non-employees or unauthenticated users
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/login');
    }
  }, [user, router]);

  // Filter this employee's requests only
  const myRequests = useMemo(
    () => leaveRequests.filter(r => r.username === user?.username),
    [leaveRequests, user]
  );

  const pendingCount = myRequests.filter(r => r.status === 'Pending').length;
  const approvedCount = myRequests.filter(r => r.status === 'Approved').length;
  const rejectedCount = myRequests.filter(r => r.status === 'Rejected').length;
  const PaidCount = myRequests.filter(r => r.status === 'Paid').length;


  if (!user || user.role !== 'admin') {
    // While redirecting, don’t flash the UI
    return null;
  }

  return (
    <div className="min-h-[90dvh] text-black space-y-3">
      <div className="flex justify-between items-center bg-white p-6 shadow rounded-xl ">
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-4 text-black bg-white p-6 gap-4 shadow rounded-xl text-center">
        <div className="flex gap-3 items-center bg-yellow-100 p-4 rounded">
          <p className="text-4xl font-semibold">{pendingCount}</p>
          <p className="text-sm">Pending leave</p>

        </div>
        <div className="flex gap-3 items-center bg-green-100 p-4 rounded">
          <p className="text-4xl font-semibold">{approvedCount}</p>
          <p className="text-sm">Approved leave</p>

        </div>
        <div className="flex gap-3 items-center bg-blue-100 p-4 rounded">
          <p className="text-4xl font-semibold">{PaidCount}</p>
          <p className="text-sm">Paid leave</p>

        </div>
        <div className="flex gap-3 items-center bg-red-100 p-4 rounded">
          <p className="text-4xl font-semibold">{rejectedCount}</p>
          <p className="text-sm">Rejected leave</p>

        </div>
      </div>


      <div className="flex flex-col justify-between text-black bg-white p-6 shadow rounded-xl ">
        <Link href={'/manage-leave'}>
          <h2 className="text-2xl hover:underline font-bold mb-6">Leave Management</h2>
        </Link>
        <div className=" h-[50dvh] overflow-y-scroll">
          <LeaveManagement />
        </div>
      </div>
      <AdminLeaveTable />
    </div>
  );
}

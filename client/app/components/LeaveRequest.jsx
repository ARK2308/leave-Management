"use client";

import { useState, useEffect } from 'react';
import { useLeave } from '../context/LeaveContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LeaveRequest() {
  const { user } = useAuth();
  const { requestLeave } = useLeave();
  const router = useRouter();

  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    type: '',
    reason: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'employee') router.push('/login');
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { startDate, endDate, type, reason } = form;

    if (!startDate || !endDate || !type || !reason) {
      alert('Please fill out all fields.');
      return;
    }

    requestLeave(user.username, {
      startDate,
      endDate,
      type,
      reason,
      status: 'Pending',
    });

    router.push('/leave-status');
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex items-center gap-12'>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Paid">Paid</option>
              <option value="Annual">Annual</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Explain the reason for your leave"
            required
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
}

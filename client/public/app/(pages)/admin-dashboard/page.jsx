"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLeave } from '../../context/LeaveContext';
import { useRouter } from 'next/navigation';

// Mock initial employee list
const initialEmployees = [
  { id: 1, username: 'alice', role: 'employee' },
  { id: 2, username: 'bob', role: 'manager' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { leaveRequests, updateLeaveStatus } = useLeave();
  const router = useRouter();

  const [employees, setEmployees] = useState(initialEmployees);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ username: '', role: 'employee' });

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
      router.push('/login');
    }
  }, [user]);

  const saveEmployee = () => {
    if (editingId) {
      setEmployees(emp =>
        emp.map(e => e.id === editingId ? { ...e, ...form } : e)
      );
    } else {
      setEmployees(emp => [...emp, { id: Date.now(), ...form }]);
    }
    setEditingId(null);
    setForm({ username: '', role: 'employee' });
  };

  const startEdit = e => {
    setEditingId(e.id);
    setForm({ username: e.username, role: e.role });
  };

  const deleteEmp = id => {
    setEmployees(emp => emp.filter(e => e.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Leave Approval</h2>
      {leaveRequests.map(r => (
        <div key={r.id} className="border p-4 rounded mb-3">
          <p><strong>{r.username}</strong>: {r.reason}</p>
          <p>Status: {r.status}</p>
          {r.status === 'Pending' && (
            <div className="mt-2 space-x-2">
              <button onClick={() => updateLeaveStatus(r.id, 'Approved')} className="px-3 py-1 bg-green-500 text-white rounded">
                Approve
              </button>
              <button onClick={() => updateLeaveStatus(r.id, 'Rejected')} className="px-3 py-1 bg-red-500 text-white rounded">
                Reject
              </button>
            </div>
          )}
        </div>
      ))}

      <hr />

      <h2 className="text-2xl font-bold">Employee Management</h2>
      <div className="space-y-3">
        {employees.map(e => (
          <div key={e.id} className="flex justify-between items-center border p-3 rounded">
            <span>{e.username} ({e.role})</span>
            <div className="space-x-2">
              <button onClick={() => startEdit(e)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => deleteEmp(e.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border rounded">
        <h3 className="font-bold mb-2">{editingId ? 'Edit' : 'Add'} Employee</h3>
        <input
          value={form.username}
          onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
        />
        <select
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={saveEmployee} className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Save Changes' : 'Add Employee'}
        </button>
      </div>
    </div>
  );
}

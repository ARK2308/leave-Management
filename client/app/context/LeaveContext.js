"use client"

import { createContext, useContext, useState } from 'react';

const LeaveContext = createContext();

export function LeaveProvider({ children }) {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const requestLeave = (username, reason) => {
    setLeaveRequests(prev => [
      ...prev,
      { id: Date.now(), username, reason, status: 'Pending' }
    ]);
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <LeaveContext.Provider value={{ leaveRequests, requestLeave, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
}

export function useLeave() {
  return useContext(LeaveContext);
}

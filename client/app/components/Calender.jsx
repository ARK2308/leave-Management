"use client";

import { useState } from 'react';
import dayjs from 'dayjs';

const LeaveCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Dummy leave data for Jan–May 2025
  const leaves = [
    { from: '2025-01-10', to: '2025-01-12', status: 'Approved' },
    { from: '2025-01-15', to: '2025-01-18', status: 'Rejected' },
    { from: '2025-02-05', to: '2025-02-09', status: 'Approved' },
    { from: '2025-02-20', to: '2025-02-23', status: 'Pending' },
    { from: '2025-03-01', to: '2025-03-03', status: 'Approved' },
    { from: '2025-03-12', to: '2025-03-15', status: 'Approved' },
    { from: '2025-04-07', to: '2025-04-10', status: 'Rejected' },
    { from: '2025-04-18', to: '2025-04-20', status: 'Approved' },
    { from: '2025-05-05', to: '2025-05-08', status: 'Pending' },
    { from: '2025-05-22', to: '2025-05-25', status: 'Approved' },
  ];

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDay = startOfMonth.startOf('week');
  const endDay = endOfMonth.endOf('week');

  const days = [];
  let day = startDay;
  while (day.isBefore(endDay) || day.isSame(endDay)) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const getLeaveStatusForDay = (date) => {
    for (const leave of leaves) {
      const from = dayjs(leave.from);
      const to = dayjs(leave.to);
      if (date.isSame(from, 'day') || (date.isAfter(from) && date.isBefore(to)) || date.isSame(to, 'day')) {
        return leave.status;
      }
    }
    return null;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-300 text-green-700 border-green-500';
      // case 'Rejected':
      //   return 'bg-red-300 text-red-700 border-red-500';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-500';
      default:
        return '';
    }
  };

  return (
    <div className="w-full min-h-screen p-6 rounded-xl bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-lg">
          ◀
        </button>
        <h2 className="text-3xl font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-lg">
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((date, idx) => {
          const isCurrentMonth = date.month() === currentMonth.month();
          const status = getLeaveStatusForDay(date);
          const statusClass = status ? getStatusClass(status) : '';

          return (
            <div
              key={idx}
              className={`flex items-center justify-center h-20 text-xl font-semibold border rounded-lg transition-all duration-200
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'}
                ${statusClass}
              `}
            >
              {date.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveCalendar;

"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

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

export default function LeaveTable() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(leavesData.length / rowsPerPage);

  const paginatedData = leavesData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-xl overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Leaves Requests</h2>
        <Link href={'/leave-request'}>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            + Apply Leave
          </button>
        </Link>
      </div>
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {/* {["Leave Type", "From", "To", "Days", "Reason", "Approved By", "Status", "Action"].map((header) => ( */}
            {["Leave Type", "From", "To", "Days", "Reason", "Approved By", "Status"].map((header) => (
              <th key={header} className="px-4 py-2 whitespace-nowrap">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((leave) => (
            <tr key={leave.id} className="border-t">
              <td className="px-4 py-2">{leave.type}</td>
              <td className="px-4 py-2">{leave.from}</td>
              <td className="px-4 py-2">{leave.to}</td>
              <td className="px-4 py-2">{leave.days}</td>
              <td className="px-4 py-2">{leave.reason}</td>
              <td className="px-4 py-2">{leave.approvedBy}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[leave.status]}`}>
                  {leave.status}
                </span>
              </td>
              {/* <td className="px-4 py-2 flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, leavesData.length)} of {leavesData.length} entries
        </span>
        <div className="flex items-center gap-1">
          <button
            className="px-3 py-1 border rounded disabled:opacity-30"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-black text-white" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          )).slice(Math.max(0, page - 2), page + 3)}
          <button
            className="px-3 py-1 border rounded disabled:opacity-30"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react";
import Link from "next/link";

const dummyLeaveRequests = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        type: "Sick",
        reason: "Fever and cold",
        startDate: "2025-05-20",
        endDate: "2025-05-22",
        status: "pending",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        type: "Annual",
        reason: "Vacation trip",
        startDate: "2025-06-01",
        endDate: "2025-06-10",
        status: "approved",
    },
    {
        id: 3,
        name: "Mark Lee",
        email: "mark@example.com",
        type: "Casual",
        reason: "Family event",
        startDate: "2025-05-25",
        endDate: "2025-05-27",
        status: "rejected",
    },
    {
        id: 4,
        name: "Mark Lee",
        email: "mark@example.com",
        type: "Casual",
        reason: "Family event",
        startDate: "2025-05-25",
        endDate: "2025-05-27",
        status: "rejected",
    },
    {
        id: 5,
        name: "Mark Lee",
        email: "mark@example.com",
        type: "Casual",
        reason: "Family event",
        startDate: "2025-05-25",
        endDate: "2025-05-27",
        status: "rejected",
    },
    {
        id: 6,
        name: "Mark Lee",
        email: "mark@example.com",
        type: "Casual",
        reason: "Family event",
        startDate: "2025-05-25",
        endDate: "2025-05-27",
        status: "rejected",
    },
    {
        id: 7,
        name: "Mark Lee",
        email: "mark@example.com",
        type: "Casual",
        reason: "Family event",
        startDate: "2025-05-25",
        endDate: "2025-05-27",
        status: "rejected",
    },
];

export default function LeaveManagement() {
    const [requests, setRequests] = useState(dummyLeaveRequests);
    const [expandedId, setExpandedId] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        setRequests(prev =>
            prev.map(req =>
                req.id === id ? { ...req, status: newStatus } : req
            )
        );
    };

    return (
        // <div className="flex flex-col justify-between text-black bg-white p-6 shadow rounded-xl ">
        <div className=" space-y-4 overflow-y-scroll">
            {requests.map(req => (
                <div key={req.id} className="bg-white py-4 rounded shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{req.name}</p>
                            <p className="text-sm text-gray-600">
                                {req.type} Leave • {req.startDate} to {req.endDate}
                            </p>
                            <p className={`text-sm font-medium capitalize ${req.status === "approved"
                                ? "text-green-600"
                                : req.status === "rejected"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                                }`}>
                                Status: {req.status}
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                setExpandedId(expandedId === req.id ? null : req.id)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                            {expandedId === req.id ? "Collapse" : "Details"}
                        </button>
                    </div>

                    {expandedId === req.id && (
                        <div className="mt-4 border-t pt-4 space-y-2">
                            <p><strong>Email:</strong> {req.email}</p>
                            <p><strong>Reason:</strong> {req.reason}</p>
                            <p><strong>From:</strong> {req.startDate}</p>
                            <p><strong>To:</strong> {req.endDate}</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleStatusChange(req.id, "approved")}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(req.id, "rejected")}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
       // </div>
    );
}

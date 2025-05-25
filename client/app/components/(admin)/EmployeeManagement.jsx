"use client"

import { useState } from 'react';

const dummyEmployees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'employee' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'manager' },
    { id: 3, name: 'Mark Lee', email: 'mark@example.com', role: 'employee' },
    { id: 4, name: 'Mark Lee', email: 'mark@example.com', role: 'employee' },
    { id: 5, name: 'Mark Lee', email: 'mark@example.com', role: 'employee' },
    { id: 6, name: 'Mark Lee', email: 'mark@example.com', role: 'employee' },
    { id: 7, name: 'Mark Lee', email: 'mark@example.com', role: 'employee' },
    { id: 8, name: 'Mark Lee', email: 'mark@example.com', role: 'employee' },

];

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState(dummyEmployees);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'employee' });
    const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: 'employee' });
    const [showAddForm, setShowAddForm] = useState(false);

    const handleDelete = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const startEditing = (employee) => {
        setEditingId(employee.id);
        setFormData({ name: employee.name, email: employee.email, role: employee.role });
    };

    const saveEdit = () => {
        setEmployees(employees.map(emp =>
            emp.id === editingId ? { ...emp, ...formData } : emp
        ));
        setEditingId(null);
    };

    const addEmployee = (e) => {
        e.preventDefault();
        const newEmp = {
            id: Date.now(),
            ...newEmployee
        };
        setEmployees([newEmp, ...employees]);
        setNewEmployee({ name: '', email: '', role: 'employee' });
        setShowAddForm(false);
    };

    return (
        <div className=''>

            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded"
            >
                {showAddForm ? 'Cancel' : 'Add Employee'}
            </button>
            {/* Toggle Add Employee */}
            <div className="mb-4">

                {showAddForm && (
                    <form
                        onSubmit={addEmployee}
                        className="mt-4 bg-white p-4 rounded shadow space-y-3"
                    >
                        <h3 className="text-lg font-semibold">New Employee</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newEmployee.name}
                            onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newEmployee.email}
                            onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <select
                            value={newEmployee.role}
                            onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </form>
                )}
            </div>

            <div className="space-y-4 flex flex-col overflow-y-scroll">
                {employees.map(emp => (
                    <div key={emp.id} className="bg-white py-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{emp.name}</p>
                                <p className="text-sm text-gray-600">{emp.email} • {emp.role}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => startEditing(emp)}
                                    className=" bg-cyan-700 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(emp.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        {/* Edit Form */}
                        {editingId === emp.id && (
                            <div className="mt-4 border-t pt-4 space-y-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                <select
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={saveEdit}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
}

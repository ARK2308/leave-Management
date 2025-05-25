// "use client"

import EmployeeManagement from '@/app/components/(admin)/EmployeeManagement';

export default function ManageEmployees() {
  return (
    <div className="flex flex-col justify-between max-h-full text-black bg-white p-6 shadow rounded-xl ">
      <h2 className="text-2xl font-bold mb-6">Manage Employees</h2>
      <div className=" overflow-y-scroll">
        <EmployeeManagement />
      </div>
    </div>
  );
}

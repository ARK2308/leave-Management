"use client"

import { useState } from "react";
import Link from "next/link";
import LeaveManagement from "@/app/components/(admin)/LeaveManagement";



export default function LeavePage() {


  return (
    <>
      <div className="flex flex-col justify-between max-h-full text-black bg-white p-6 shadow rounded-xl ">
        <h2 className="text-2xl hover:underline font-bold mb-6">Leave Management</h2>
        <div className=" overflow-y-scroll">
          <LeaveManagement />
        </div>
      </div>
    </>
  );
}

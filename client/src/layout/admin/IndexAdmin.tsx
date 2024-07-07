// src/layout/admin/IndexAdmin.tsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function IndexAdmin() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

// src/layout/admin/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-36 flex flex-col bg-gray-800 text-white">
      <Link
        to="/admin/user"
        className="p-2 hover:bg-blue-500 transition duration-200"
      >
        User Management
      </Link>
      <Link
        to="/admin/category"
        className="p-2 hover:bg-blue-500 transition duration-200"
      >
        Category Management
      </Link>
      <Link to="/login"> log out</Link>
    </div>
  );
}

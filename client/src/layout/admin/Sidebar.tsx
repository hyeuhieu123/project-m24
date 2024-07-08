// src/layout/admin/Sidebar.tsx

import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div>
      <div className="w-64 flex flex-col items-center py-14 justify-between h-full bg-gray-800 text-white">
        <div className="flex flex-col ">
          <div className="my-10 ">ADMIN</div>
          <hr className="text-white" />
          <div className="flex flex-col  justify-between">
            <Link
              to="/admin/dashboard"
              className="p-2 hover:bg-blue-500 transition duration-200"
            >
              Dashboard
            </Link>

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
          </div>
        </div>
        <Link to="/login"> log out</Link>
      </div>
    </div>
  );
}

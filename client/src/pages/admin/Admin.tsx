import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import Dashboard from "../../components/Dashboard"; // Cần import Dashboard nếu nó được sử dụng ở đây
import Order from "../../components/admin/Order";
import Home from "../../components/admin/Home";

const Admin = () => {
  return (
    <>
      <Sidebar />
      <Dashboard />
      <div className="flex">
        <div className="flex-1 p-10">
          <Routes>
            <Route path="/home1" element={<Home></Home>} />
            <Route path="/home2" element={<Order></Order>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;

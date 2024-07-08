import { Route, Routes } from "react-router-dom";
import "./index.css";
import IndexAdmin from "./layout/admin/IndexAdmin";
import Dashboard from "./pages/admin/Dashboard";
import UserManage from "./pages/admin/UserManage";
import CategoryManage from "./pages/admin/CategoryManage";
import Login from "./pages/admin/login-register/Login";
import Register from "./pages/admin/login-register/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<IndexAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="user" element={<UserManage />} />
        <Route path="category" element={<CategoryManage />} />
      </Route>
    </Routes>
  );
}

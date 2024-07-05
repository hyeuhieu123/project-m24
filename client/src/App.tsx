import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import "./index.css";
import Login from "./pages/login/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin></Admin>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}

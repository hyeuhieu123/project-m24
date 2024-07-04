import React from "react";
import "./admin.css";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Body from "../../components/admin/body/Body";

export default function Admin() {
  return (
    <div className="container">
      <Sidebar></Sidebar>
      <Body></Body>
    </div>
  );
}

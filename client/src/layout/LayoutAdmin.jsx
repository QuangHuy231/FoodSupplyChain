import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";

const LayoutAdmin = () => {
  let userType = JSON.parse(localStorage.getItem("userType")) || false;

  return userType === "admin" ? (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutAdmin;

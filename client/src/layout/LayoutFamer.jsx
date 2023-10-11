import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";

const LayoutFamer = () => {
  let userType = JSON.parse(localStorage.getItem("userType")) || false;

  return userType === "Famer" ? (
    <div>
      <Sidebar userType={userType} />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutFamer;

import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";

const LayoutProducer = () => {
  let userType = JSON.parse(localStorage.getItem("userType")) || false;

  return userType === "Producer" ? (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutProducer;

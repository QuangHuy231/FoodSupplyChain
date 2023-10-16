import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Header from "../components/Header/Header";

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  let userType = JSON.parse(localStorage.getItem("userType")) || false;

  return userType === "admin" ? (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sidebar userType={userType} collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutAdmin;

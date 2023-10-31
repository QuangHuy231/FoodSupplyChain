import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../components/Header/Header";

const LayoutSystem = () => {
  const [collapsed, setCollapsed] = useState(false);
  let userType = JSON.parse(localStorage.getItem("userType")) || false;

  return (
    <Layout
      style={{
        minHeight: "100vh",
        margin: "20px",
        background: "inherit",
      }}
    >
      <Sidebar userType={userType} collapsed={collapsed} />
      <Layout style={{ background: "inherit" }}>
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
  );
};

export default LayoutSystem;

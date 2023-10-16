import React from "react";
import { Dropdown, Layout, Typography } from "antd";

import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BiSolidUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Header = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <Typography.Title style={{ margin: "auto" }}>
        Manage Food
      </Typography.Title>

      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              icon: <UserOutlined />,
              label: <span onClick={() => navigate("/account")}>Account</span>,
            },
            {
              key: "2",
              icon: <LogoutOutlined />,
              label: (
                <span
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("userType");
                    navigate("/login");
                  }}
                >
                  Logout
                </span>
              ),
            },
          ],
        }}
      >
        <span
          style={{ marginRight: "16px", display: "flex", alignItems: "center" }}
        >
          <BiSolidUserCircle size={40} />
        </span>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;

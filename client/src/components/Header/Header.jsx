import React, { useContext } from "react";
import { Dropdown, Layout, Typography } from "antd";
import "./Header.scss";

import { LogoutOutlined } from "@ant-design/icons";
import { BiSolidUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";

const Header = () => {
  const navigate = useNavigate();
  const { heading } = useContext(Context);
  return (
    <Layout.Header className="header-container">
      <Typography.Title className="title-header">{heading}</Typography.Title>

      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              icon: <LogoutOutlined style={{ fontSize: "30px" }} />,
              label: (
                <span
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("userType");
                    navigate("/login");
                  }}
                  style={{ fontSize: "24px", padding: "20px" }}
                >
                  Logout
                </span>
              ),
            },
          ],
        }}
      >
        <span className="icon-user">
          <BiSolidUserCircle size={100} />
        </span>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;

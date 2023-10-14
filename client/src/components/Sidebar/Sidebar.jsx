import { Menu } from "antd";
import { useEffect, useState } from "react";
import {
  SidebarAdmin,
  SidebarFamer,
  SidebarProducer,
  SidebarRetailer,
  SidebarTransportation,
} from "./SidebarData";

import { Layout } from "antd";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userType, collapsed }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    switch (userType) {
      case "Famer":
        setData(SidebarFamer);
        break;
      case "Producer":
        setData(SidebarProducer);
        break;
      case "Transportation":
        setData(SidebarTransportation);
        break;
      case "Retailer":
        setData(SidebarRetailer);
        break;
      default:
        setData(SidebarAdmin);
    }
  }, [userType]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      theme="light"
      collapsed={collapsed}
    >
      <div className="logo">
        <img src={logo} alt="logo image" />
      </div>
      <Menu
        theme="light"
        mode="vertical"
        items={data}
        onClick={(item) => {
          navigate(item.key);
        }}
      />
    </Layout.Sider>
  );
};
export default Sidebar;

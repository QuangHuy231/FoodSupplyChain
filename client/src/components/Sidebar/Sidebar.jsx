import { useContext, useEffect, useState } from "react";
import "./Sidebar.scss";
import {
  SidebarAdmin,
  SidebarFamer,
  SidebarProducer,
  SidebarRetailer,
  SidebarTransportation,
} from "../../utils/SidebarData";

import { Layout } from "antd";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";

const Sidebar = ({ userType, collapsed }) => {
  const { setHeading } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);
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
      className="sider-container"
    >
      <div
        className="logo"
        onClick={() => {
          setHeading("Home");
          navigate("/");
        }}
      >
        <img src={logo} alt="logo image" />
      </div>
      <div className="menu-content">
        {data.map((item) => (
          <div
            className={`item-menu ${selectedKeys === item.key && "selected"}`}
            onClick={() => {
              navigate(item.key);
              setHeading(item.label);
            }}
          >
            <span>{item.icon}</span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </Layout.Sider>
  );
};
export default Sidebar;

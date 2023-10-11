import React, { useEffect, useState } from "react";
import {
  SidebarAdmin,
  SidebarFamer,
  SidebarProducer,
  SidebarRetailer,
  SidebarTransportation,
} from "./SidebarData";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Sidebar.scss";

const Sidebar = ({ userType }) => {
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
        break;
    }
  }, [userType]);

  return <div>Sidebar</div>;
};

export default Sidebar;

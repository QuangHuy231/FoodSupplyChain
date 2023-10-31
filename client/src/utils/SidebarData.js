import {
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgMenuGridO } from "react-icons/cg";
import { BiSolidFactory } from "react-icons/bi";
import { FcInTransit } from "react-icons/fc";

export const SidebarAdmin = [
  {
    label: "Home",
    icon: <AiFillHome />,
    key: "/",
  },
  {
    label: "List User",
    icon: <AiOutlineUsergroupDelete />,
    key: "/list-user",
  },
  {
    label: "List Products",
    icon: <CgMenuGridO />,
    key: "/list-products",
  },
];

export const SidebarFamer = [
  {
    label: "Home",
    icon: <AiFillHome />,
    key: "/",
  },
  {
    label: "List Products",
    icon: <CgMenuGridO />,
    key: "/famer",
  },
  {
    label: "Create Product",
    icon: <AiFillPlusCircle />,
    key: "/famer/create-product",
  },
  {
    label: "Product Of Famer",
    icon: <GiHamburgerMenu />,
    key: "/famer/product-of-famer",
  },
];

export const SidebarProducer = [
  {
    label: "Home",
    icon: <AiFillHome />,
    key: "/",
  },
  {
    label: "Products Recieved",
    icon: <CgMenuGridO />,
    key: "/producer",
  },
  {
    label: "Product In Stock",
    icon: <BiSolidFactory />,
    key: "/producer/product-in-producer",
  },
  {
    label: "Product Of Producer",
    icon: <GiHamburgerMenu />,
    key: "/producer/product-of-producer",
  },
];

export const SidebarTransportation = [
  {
    label: "Home",
    icon: <AiFillHome />,
    key: "/",
  },
  {
    label: "List Products",
    icon: <GiHamburgerMenu />,
    key: "/transportation",
  },
  {
    label: "Product Of Transportation",
    icon: <FcInTransit />,
    key: "/transportation/product-of-transportation",
  },
];

export const SidebarRetailer = [
  {
    label: "Home",
    icon: <AiFillHome />,
    key: "/",
  },
  {
    label: "List Products",
    icon: <CgMenuGridO />,
    key: "/retailer",
  },
];

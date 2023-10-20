import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";

export const SidebarAdmin = [
  {
    label: "List User",
    icon: <AiFillPlusCircle />,
    key: "/",
  },
  {
    label: "List Products",
    icon: <AiFillHome />,
    key: "/list-products",
  },
];

export const SidebarFamer = [
  {
    label: "List Products",
    icon: <AiFillHome />,
    key: "/famer",
  },
  {
    label: "Create Product",
    icon: <AiFillPlusCircle />,
    key: "/famer/create-product",
  },
];

export const SidebarProducer = [
  {
    label: "List Products",
    icon: <AiFillHome />,
    key: "/producer",
  },
  {
    label: "Produce Product",
    icon: <AiFillPlusCircle />,
    key: "/producer/update-product",
  },
];

export const SidebarTransportation = [
  {
    label: "List Products",
    icon: <AiFillHome />,
    key: "/transportation",
  },
  {
    label: "Translate Product",
    icon: <AiFillPlusCircle />,
    key: "/transportation/translate-product",
  },
];

export const SidebarRetailer = [
  {
    label: "List Products",
    icon: <AiFillHome />,
    key: "/Retailer",
  },
];
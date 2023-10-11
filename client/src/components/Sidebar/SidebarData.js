import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";

export const SidebarAdmin = [
  {
    title: "List Products",
    icon: <AiFillHome />,
    link: "/products",
  },
  {
    title: "Create User",
    icon: <AiFillPlusCircle />,
    link: "/create-user",
  },

  {
    title: "List User",
    icon: <AiFillPlusCircle />,
    link: "/list-user",
  },
];

export const SidebarFamer = [
  {
    title: "List Products",
    icon: <AiFillHome />,
    link: "/famer",
  },
  {
    title: "Create Product",
    icon: <AiFillPlusCircle />,
    link: "/famer/create-product",
  },
];

export const SidebarProducer = [
  {
    title: "List Products",
    icon: <AiFillHome />,
    link: "/producer",
  },
  {
    title: "Produce Product",
    icon: <AiFillPlusCircle />,
    link: "/producer/update-product",
  },
];

export const SidebarTransportation = [
  {
    title: "List Products",
    icon: <AiFillHome />,
    link: "/transportation",
  },
  {
    title: "Translate Product",
    icon: <AiFillPlusCircle />,
    link: "/transportation/translate-product",
  },
];

export const SidebarRetailer = [
  {
    title: "List Products",
    icon: <AiFillHome />,
    link: "/Retailer",
  },
];

import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PublicRoutes from "./layout/PublicRoutes";
import PrivateRoutes from "./layout/PrivateRoutes";
import LayoutFamer from "./layout/LayoutFamer";
import axios from "axios";
import LayoutProducer from "./layout/LayoutProducer";
import LayoutTransportation from "./layout/LayoutTransportation";
import LayoutRetailer from "./layout/LayoutRetailer";
import LayoutAdmin from "./layout/LayoutAdmin";
import ListUser from "./components/Admin/ListUser";
import Products from "./components/Admin/Products";
import DetailProduct from "./components/Admin/DetailProduct";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<LayoutAdmin />}>
            <Route path="/" element={<ListUser />} />
            <Route path="/list-products" element={<Products />} />
            <Route path="/product/:productCode" element={<DetailProduct />} />
          </Route>
          <Route element={<LayoutFamer />}></Route>
          <Route element={<LayoutProducer />}></Route>
          <Route element={<LayoutTransportation />}></Route>
          <Route element={<LayoutRetailer />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

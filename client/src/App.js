import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PublicRoutes from "./layout/PublicRoutes";
import PrivateRoutes from "./layout/PrivateRoutes";
import LayoutSystem from "./layout/LayoutSystem";
import axios from "axios";
import ListUser from "./components/Admin/ListUser";
import Products from "./components/Admin/Products";
import DetailProduct from "./components/Admin/DetailProduct";
import ListProductCreateByFamer from "./components/Famer/ListProductCreateByFamer";
import CreateProduct from "./components/Famer/CreateProduct";

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
          <Route element={<LayoutSystem />}>
            <Route path="/" element={<ListUser />} />
            <Route path="/list-products" element={<Products />} />
            <Route path="/product/:productCode" element={<DetailProduct />} />
            <Route path="/famer">
              <Route path="/famer" element={<ListProductCreateByFamer />} />
              <Route path="/famer/create-product" element={<CreateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

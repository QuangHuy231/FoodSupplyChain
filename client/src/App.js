import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PublicRoutes from "./layout/PublicRoutes";
import PrivateRoutes from "./layout/PrivateRoutes";
import LayoutSystem from "./layout/LayoutSystem";
import axios from "axios";
import ListUser from "./components/Admin/ListUser";
import Products from "./components/Admin/Products";
import ListProductCreateByFamer from "./components/Famer/ListProductCreateByFamer";
import CreateProduct from "./components/Famer/CreateProduct";
import ListProductRecieved from "./components/Producer/ListProductReceived";
import ListProductInStock from "./components/Producer/ListProductInStock";
import ProduceProduct from "./components/Producer/ProduceProduct/ProduceProduct";
import Home from "./components/Home";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import ListProductOfFamer from "./components/Famer/ListProductOfFamer";
import ListProductOfProducer from "./components/Producer/ListProductOfProducer";
import ListProductRecievedByTransportation from "./components/Transportation/ListProductReceivedByTransportation";
import ListProductOfTransportation from "./components/Transportation/ListProductOfTransportation";
import ListProductRecievedByRetailer from "./components/Retailer/ListProductReceivedByRetailer";

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
            <Route path="/" element={<Home />} />
            <Route path="/list-user" element={<ListUser />} />
            <Route path="/list-products" element={<Products />} />
            <Route path="/product/:productCode" element={<DetailProduct />} />
            <Route path="/famer">
              <Route path="/famer" element={<ListProductCreateByFamer />} />
              <Route path="/famer/create-product" element={<CreateProduct />} />
              <Route
                path="/famer/product-of-famer"
                element={<ListProductOfFamer />}
              />
            </Route>
            <Route path="/producer">
              <Route path="/producer" element={<ListProductRecieved />} />
              <Route
                path="/producer/product-in-producer"
                element={<ListProductInStock />}
              />
              <Route
                path="/producer/produce-product/:productCode"
                element={<ProduceProduct />}
              />
              <Route
                path="/producer/product-of-producer"
                element={<ListProductOfProducer />}
              />
            </Route>
            <Route path="/transportation">
              <Route
                path="/transportation"
                element={<ListProductRecievedByTransportation />}
              />
              <Route
                path="/transportation/product-of-transportation"
                element={<ListProductOfTransportation />}
              />
            </Route>
            <Route
              path="/retailer"
              element={<ListProductRecievedByRetailer />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

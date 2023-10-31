import React, { useEffect, useState } from "react";
import { Col, Empty, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Products.scss";

const Products = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/product", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [access_token]);

  const handleDeleteProduct = (productCode) => {
    try {
      axios
        .delete(`/product/${productCode}`, {
          headers: { authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {products.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={[16, 24]}>
          {products.map((product) => (
            <Col key={product.productCode} className="gutter-row" span={6}>
              <div className="product-card">
                <div
                  className="image-product"
                  onClick={() => navigate(`/product/${product.productCode}`)}
                >
                  <img
                    src={`http://localhost:8080/ipfs/${
                      product.imagesProduct
                        ? product?.imagesProduct
                        : product?.imageProductInFamers
                    }`}
                    alt="image-product"
                  />
                </div>
                <div
                  className="product-content"
                  onClick={() => navigate(`/product/${product.productCode}`)}
                >
                  <p>{product.productName}</p>
                  <div className="product-status">{product.status}</div>
                </div>

                <div
                  className="button-action-delete"
                  onClick={() => handleDeleteProduct(product.productCode)}
                >
                  <DeleteOutlined className="icon-button" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Products;

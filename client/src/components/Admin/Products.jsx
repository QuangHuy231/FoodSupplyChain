import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

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
    axios
      .delete(`/product/${productCode}`, {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        alert("Delete product successfully");
        window.location.reload();
      });
  };
  return (
    <Row gutter={[16, 24]}>
      {products.map((product) => (
        <Col key={product.productCode} className="gutter-row" span={6}>
          <Card
            style={{
              width: 300,
            }}
            cover={
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                alt="image product"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/product/${product.productCode}`)}
                src={`http://localhost:8080/ipfs/${
                  product.imagesProduct
                    ? product?.imagesProduct
                    : product?.imageProductInFamers
                }`}
              />
            }
            actions={[
              <DeleteOutlined
                key="delete"
                onClick={() => handleDeleteProduct(product.productCode)}
              />,
            ]}
          >
            <Meta
              title={product.productName}
              description={
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  {product.status}
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Products;
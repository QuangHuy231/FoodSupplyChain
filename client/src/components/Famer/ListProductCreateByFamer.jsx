import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import TranslateToProducer from "./TranslateToProducer";

const ListProductCreateByFamer = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    axios
      .get("/famer/product-created", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [access_token]);

  const handleTranslate = (productCode) => {
    setOpen(true);
    setProductCode(productCode);
  };
  return (
    <>
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
                  src={`http://localhost:8080/ipfs/${product.imageProductInFamers}`}
                />
              }
              actions={[
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleTranslate(product.productCode)}
                >
                  <BiTransfer />
                  Translate to Producer
                </div>,
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
      <TranslateToProducer
        productCode={productCode}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ListProductCreateByFamer;

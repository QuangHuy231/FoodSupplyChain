import { Col, Empty, Row } from "antd";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import TranslateToTransportation from "./TranslateToTransportation";
import { Context } from "../../utils/context";
import "./ListProductInStock.scss";

const ListProductInStock = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [open, setOpen] = useState(false);
  const { setHeading } = useContext(Context);
  useEffect(() => {
    axios
      .get("/producer/product-in-producer", {
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
      {products.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Row gutter={[16, 24]}>
            {products.map((product) => (
              <Col key={product.productCode} className="gutter-row" span={6}>
                {/* <Card
                  style={{
                    width: 300,
                  }}
                  cover={
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      alt="image product"
                      style={{
                        cursor: "pointer",
                        height: "250px",
                      }}
                      onClick={() => {
                        setHeading("Product Details");
                        navigate(`/product/${product.productCode}`);
                      }}
                      src={`http://localhost:8080/ipfs/${product.imagesProduct}`}
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
                </Card> */}

                <div className="product-card">
                  <div
                    className="image-product"
                    onClick={() => {
                      setHeading("Product Details");
                      navigate(`/product/${product.productCode}`);
                    }}
                  >
                    <img
                      src={`http://localhost:8080/ipfs/${product.imagesProduct}`}
                      alt="image-product"
                    />
                  </div>
                  <div
                    className="product-content"
                    onClick={() => {
                      setHeading("Product Details");
                      navigate(`/product/${product.productCode}`);
                    }}
                  >
                    <p>{product.productName}</p>
                    <div className="product-status">{product.status}</div>
                  </div>

                  <div
                    className="button-action"
                    onClick={() => handleTranslate(product.productCode)}
                  >
                    <BiTransfer className="icon-button" />
                    <span>Translate to Transport</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <TranslateToTransportation
            productCode={productCode}
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
    </>
  );
};

export default ListProductInStock;

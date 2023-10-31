import { Col, Empty, Row } from "antd";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";
import "./ListProductReceived.scss";

const ListProductRecieved = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { setHeading } = useContext(Context);
  useEffect(() => {
    axios
      .get("/producer/producer-recieved", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [access_token]);

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
                      onClick={() =>
                        navigate(`/product/${product.productCode}`)
                      }
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
                      onClick={() => {
                        setHeading("Produce Product");
                        navigate(
                          `/producer/produce-product/${product.productCode}`
                        );
                      }}
                    >
                      <AiFillSetting />
                      Produce Product
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
                      src={`http://localhost:8080/ipfs/${product.imageProductInFamers}`}
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
                    onClick={() => {
                      setHeading("Produce Product");
                      navigate(
                        `/producer/produce-product/${product.productCode}`
                      );
                    }}
                  >
                    <AiFillSetting className="icon-button" />
                    <span>Produce Product</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ListProductRecieved;

import { Card, Col, Empty, Row } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";

const ListProductOfTransportation = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { setHeading } = useContext(Context);
  useEffect(() => {
    axios
      .get("/transportation/product-of-transportation", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, [access_token]);

  return (
    <>
      {products.length === 0 ? (
        <Empty
          style={{
            fontSize: "24px",
          }}
        />
      ) : (
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
                        height: "250px",
                      }}
                      onClick={() => {
                        setHeading("Product Details");
                        navigate(`/product/${product.productCode}`);
                      }}
                      src={`http://localhost:8080/ipfs/${product.imagesProduct}`}
                    />
                  }
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
        </>
      )}
    </>
  );
};

export default ListProductOfTransportation;

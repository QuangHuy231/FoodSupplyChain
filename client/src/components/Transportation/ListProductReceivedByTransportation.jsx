import { Card, Col, Empty, Row } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import TranslateToRetailer from "./TranslateToRetailer";

const ListProductRecievedByTransportation = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const [productCode, setProductCode] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/transportation/transportation-recieved", {
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
                      onClick={() =>
                        navigate(`/product/${product.productCode}`)
                      }
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
                      Translate To Retailer
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
          <TranslateToRetailer
            productCode={productCode}
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
    </>
  );
};

export default ListProductRecievedByTransportation;

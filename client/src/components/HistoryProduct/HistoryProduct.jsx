import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HistoryProduct.scss";

const HistoryProduct = ({ productCode }) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [productsHistory, setProductsHistory] = useState([]);
  useEffect(() => {
    axios
      .get(`/consumer/get-history-products/${productCode}`, {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setProductsHistory(response.data);
      });
  }, [access_token, productCode]);

  return (
    <div className="history-container">
      <div className="title-history">History</div>
      <Row gutter={[16, 16]}>
        {productsHistory
          .slice()
          .reverse()
          .map((productHistory, index) => (
            <Col span={12}>
              <div className="card-product">
                <div className="title-card">Step {index + 1}</div>
                <div>
                  <label>ProductId: </label> {productHistory.productCode}
                </div>
                <div>
                  <label> ProductName: </label> {productHistory.productName}
                </div>
                <div>
                  <label> FamerId: </label> {productHistory.famerId}
                </div>
                <div>
                  <label> PlantDate: </label> {productHistory.plantDate}
                </div>
                <div>
                  <label> HarvestDate: </label> {productHistory.harvestDate}
                </div>

                <div>
                  <label>ProducerId: </label> {productHistory.producerId}
                </div>
                <div>
                  <label>ProductionDate: </label>{" "}
                  {productHistory.productionDate}
                </div>
                <div>
                  <label>ExpirationDate: </label>{" "}
                  {productHistory.expirationDate}
                </div>
                <div>
                  <label>ProductionSteps: </label>{" "}
                  {productHistory.productionSteps}
                </div>
                <div>
                  <label>TransportationId: </label>{" "}
                  {productHistory.transportationId}
                </div>
                <div>
                  <label>Vehicle: </label> {productHistory.vehicle}
                </div>
                <div>
                  <label>RetailerId: </label> {productHistory.retailerId}
                </div>
                <div className="status-field">
                  <label>Status: </label>
                  <div className="status">{productHistory.status}</div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default HistoryProduct;

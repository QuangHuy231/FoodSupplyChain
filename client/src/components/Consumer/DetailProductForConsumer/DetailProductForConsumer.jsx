/* eslint-disable jsx-a11y/img-redundant-alt */
import { Card, Drawer, Form } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailProductForConsumer.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HistoryProductForConsumer from "../HistoryProductForConsumer/HistoryProductForConsumer";

const DetailProductForConsumer = () => {
  const { productCode } = useParams();
  const [openDetailUser, setOpenDetailUser] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [detailProduct, setDetailProduct] = useState({});
  useEffect(() => {
    axios.get(`/consumer/get-info-products/${productCode}`).then((res) => {
      setDetailProduct(res.data);
    });
  }, [access_token, productCode]);
  const handleGetUserDetail = (UserId) => {
    axios
      .get(`/consumer/get-user-info/${UserId}`)
      .then((res) => {
        setUserInfo(res.data);
        setOpenDetailUser(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="detail-layout">
      <div className="product-image">
        <img
          src={`http://localhost:8080/ipfs/${
            detailProduct.imagesProduct
              ? detailProduct.imagesProduct
              : detailProduct.imageProductInFamers
          }`}
          alt="image product"
          className="image"
        />
      </div>
      <div className="product-info">
        <Card title="Product Info" bordered={false} style={{ width: 300 }}>
          <p>
            <label>Product Name: </label>
            {detailProduct.productName}
          </p>
          <p className="status-field">
            <label>Status: </label>
            <div className="status">{detailProduct.status}</div>
          </p>
        </Card>

        <Card
          title="Famer Info"
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <p>
            <label>FamerId: </label>
            <span
              onClick={() => {
                handleGetUserDetail(detailProduct.famerId);
              }}
            >
              {detailProduct.famerId}
            </span>
          </p>
          <p>
            <label>PlantDate: </label>
            {detailProduct.plantDate}
          </p>
          <p>
            <label>HarvestDate: </label>
            {detailProduct.harvestDate}
          </p>
        </Card>

        <Card title="Producer Info" bordered={false} style={{ width: 300 }}>
          <p>
            <label>ProducerId: </label>
            <span
              onClick={() => {
                handleGetUserDetail(detailProduct.producerId);
              }}
            >
              {detailProduct.producerId}
            </span>
          </p>
          <p>
            <label>ProductionDate: </label>
            {detailProduct.productionDate}
          </p>
          <p>
            <label>ExpirationDate: </label>
            {detailProduct.expirationDate}
          </p>
          <p>
            <label>ProductionSteps: </label>
            {detailProduct.productionSteps}
          </p>
        </Card>

        <Card
          title="Transportation info"
          bordered={false}
          style={{ width: 300 }}
        >
          <p>
            <label>Transportation: </label>
            <span
              onClick={() => {
                handleGetUserDetail(detailProduct.transportationId);
              }}
            >
              {detailProduct.transportationId}
            </span>
          </p>
          <p>
            <label>Vehicle: </label>
            {detailProduct.vehicle}
          </p>
        </Card>

        <Card title="Retailer" bordered={false} style={{ width: 300 }}>
          <p>
            <label>RetailerId: </label>
            <span
              onClick={() => {
                handleGetUserDetail(detailProduct.retailerId);
              }}
            >
              {detailProduct.retailerId}
            </span>
          </p>
        </Card>
      </div>
      <HistoryProductForConsumer productCode={productCode} />

      <Drawer
        size="large"
        title="User Profile"
        open={openDetailUser}
        onClose={() => {
          setOpenDetailUser(false);
        }}
        maskClosable
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          initialValues={{ remember: true }}
        >
          <Form.Item label="UserName" name="UserName">
            {userInfo.UserName}
          </Form.Item>

          <Form.Item label="Email" name="Email">
            {userInfo.Email}
          </Form.Item>

          <Form.Item label="UserType" name="UserType">
            {userInfo.UserType}
          </Form.Item>

          <Form.Item label="Address" name="Address">
            {userInfo.Address}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default DetailProductForConsumer;

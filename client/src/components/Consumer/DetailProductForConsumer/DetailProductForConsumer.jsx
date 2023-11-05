/* eslint-disable jsx-a11y/img-redundant-alt */
import { Drawer } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./DetailProductForConsumer.scss";
import "react-toastify/dist/ReactToastify.css";
import HistoryProductForConsumer from "../HistoryProductForConsumer/HistoryProductForConsumer";
import { AiOutlineRight } from "react-icons/ai";

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
    <div className="layout-product-detail-consumer">
      <div className="product-detail">
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
          <HistoryProductForConsumer productCode={productCode} />
        </div>
        <div className="info-content">
          <div className="product-info">
            <div className="title-card">Product Info</div>
            <div className="card-content">
              <div className="card-item">
                <p>Product Name</p>
                <span>{detailProduct.productName}</span>
              </div>
              <div className="card-item">
                <p>Status</p>
                <span>{detailProduct.status}</span>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="title-card">Famer Info</div>
            <div className="card-content">
              <div className="card-item">
                <p>Famer Id</p>
                <span
                  className="user"
                  onClick={() => handleGetUserDetail(detailProduct.famerId)}
                >
                  {detailProduct.famerId} <AiOutlineRight />
                </span>
              </div>
              <div className="card-item">
                <p>PlantDate</p>
                <span>{detailProduct.plantDate}</span>
              </div>
              <div className="card-item">
                <p>HarvestDate</p>
                <span>{detailProduct.harvestDate}</span>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="title-card">Producer Info</div>
            <div className="card-content">
              <div className="card-item">
                <p>Producer Id</p>
                <span
                  className="user"
                  onClick={() => handleGetUserDetail(detailProduct.producerId)}
                >
                  {detailProduct.producerId} <AiOutlineRight />
                </span>
              </div>
              <div className="card-item">
                <p>ProductionDate</p>
                <span>{detailProduct.productionDate}</span>
              </div>
              <div className="card-item">
                <p>ExpirationDate</p>
                <span>{detailProduct.expirationDate}</span>
              </div>
              <div className="card-item">
                <p>ProductionSteps</p>
                <span>{detailProduct.productionSteps}</span>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="title-card">Transport Info</div>
            <div className="card-content">
              <div className="card-item">
                <p>Transport Id</p>
                <span
                  className="user"
                  onClick={() =>
                    handleGetUserDetail(detailProduct.transportationId)
                  }
                >
                  {detailProduct.transportationId} <AiOutlineRight />
                </span>
              </div>
              <div className="card-item">
                <p>Vehicle</p>
                <span>{detailProduct.vehicle}</span>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="title-card">Retailer Info</div>
            <div className="card-content">
              <div className="card-item">
                <p>Retailer Id</p>
                <span
                  className="user"
                  onClick={() => handleGetUserDetail(detailProduct.retailerId)}
                >
                  {detailProduct.retailerId} <AiOutlineRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        size="large"
        title="User Profile"
        open={openDetailUser}
        onClose={() => {
          setOpenDetailUser(false);
        }}
        maskClosable
      >
        <div className="create-user-layout">
          <div className="form-item">
            <label>UserName:</label>
            <div className="input">{userInfo?.UserName}</div>
          </div>

          <div className="form-item">
            <label>Email:</label>
            <div className="input">{userInfo?.Email}</div>
          </div>

          <div className="form-item">
            <label>UserType:</label>
            <div className="input">{userInfo?.UserType}</div>
          </div>

          <div className="form-item">
            <label>Address:</label>
            <div className="input">{userInfo?.Address}</div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DetailProductForConsumer;

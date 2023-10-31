import { Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { VehicleType } from "../../utils/VehicleType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TranslateToRetailer.scss";

const TranslateToRetailer = ({ productCode, open, setOpen }) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [listRetailer, setListRetailer] = useState([]);
  const [retailer, setRetailer] = useState("");
  const [vehicle, setVehicle] = useState("");
  useEffect(() => {
    axios
      .get("/user/query-users-types/Retailer", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setListRetailer(response.data);
      });
  }, [access_token]);

  const handleTranlateToRetailer = () => {
    try {
      axios
        .put(
          `/transportation/transfer-product-to-retailer/${productCode}`,
          {
            retailerId: retailer,
            vehicle: vehicle,
          },
          {
            headers: { authorization: `Bearer ${access_token}` },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          setOpen(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      title="Translate To Retailer"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleTranlateToRetailer}
    >
      <div className="translate-container">
        <div>
          <label>Producer Name: </label>
          <Select className="select" onChange={(e) => setRetailer(e)}>
            {listRetailer.map((user) => (
              <Select.Option key={user.UserId} value={user.UserId}>
                {user.UserName}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Vehicle: </label>
          <Select className="select" onChange={(e) => setVehicle(e)}>
            {VehicleType.map((vehicle) => (
              <Select.Option key={vehicle.id} value={vehicle.value}>
                {vehicle.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default TranslateToRetailer;

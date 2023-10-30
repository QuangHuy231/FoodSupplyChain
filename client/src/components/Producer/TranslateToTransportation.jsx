import { Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TranslateToTransportation = ({ productCode, open, setOpen }) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [listTransportation, setListTransportation] = useState([]);
  const [transportation, setTransportation] = useState("");
  useEffect(() => {
    axios
      .get("/user/query-users-types/Transportation", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setListTransportation(response.data);
      });
  }, [access_token]);

  const handleTranlateToTransportation = () => {
    try {
      axios
        .put(
          `/producer/transfer-product-to-transportation/${productCode}/${transportation}`,
          {},
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
      title="Translate"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleTranlateToTransportation}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <label>Transportation Name: </label>
        <Select
          style={{ width: "200px" }}
          onChange={(e) => setTransportation(e)}
        >
          {listTransportation.map((user) => (
            <Select.Option key={user.UserId} value={user.UserId}>
              {user.UserName}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default TranslateToTransportation;

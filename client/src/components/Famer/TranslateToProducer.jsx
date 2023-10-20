import { Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TranslateToProducer = ({ productCode, open, setOpen }) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [listProducer, setListProducer] = useState([]);
  const [producer, setProducer] = useState("");
  useEffect(() => {
    axios
      .get("/user/query-users-types/Producer", {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setListProducer(response.data);
      });
  }, [access_token]);

  const handleTranlateToProducer = () => {
    axios
      .put(
        `/famer/transfer-producer/${productCode}/${producer}`,
        {},
        {
          headers: { authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        setOpen(false);
        window.location.reload();
      });
  };

  return (
    <Modal
      title="Translate"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleTranlateToProducer}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <label>ProducerId: </label>
        <Select style={{ width: "200px" }} onChange={(e) => setProducer(e)}>
          {listProducer.map((user) => (
            <Select.Option key={user.UserId} value={user.UserId}>
              {user.UserName}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default TranslateToProducer;

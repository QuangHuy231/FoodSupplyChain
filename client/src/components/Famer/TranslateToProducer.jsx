import { Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TranslateToProducer.scss";

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
    try {
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
          toast.success(response.data.message);
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
      onOk={handleTranlateToProducer}
    >
      <div className="translate-container-famer">
        <label>Producer Name: </label>
        <Select className="select" onChange={(e) => setProducer(e)}>
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

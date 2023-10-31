import { Modal, QRCode } from "antd";
import React from "react";

const GetQr = ({ productCode, open, setOpen }) => {
  const value = `http://localhost:3001/consumer/${productCode}`;
  return (
    <Modal
      title="QR Code"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QRCode size={300} type="canvas" value={value} />
    </Modal>
  );
};

export default GetQr;

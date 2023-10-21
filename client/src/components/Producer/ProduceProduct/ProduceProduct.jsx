import React, { useState } from "react";
import "./ProduceProduct.scss";

import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const ProduceProduct = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [imageAsset, setImageAsset] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [productionSteps, setProductionSteps] = useState("");
  const navigate = useNavigate();
  const { productCode } = useParams();
  const handleUploadImage = (e) => {
    const files = e.target.files;
    const data = new FormData();
    // Append only the first file to the FormData object
    data.append("image", files[0]);
    axios
      .post("/product/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const filename = res.data.cid;
        setImageAsset(filename);
      });
  };

  const handleCreate = () => {
    axios
      .put(
        `/producer/update-product-by-producer/${productCode}`,
        {
          productionDate,
          expirationDate,
          productionSteps,
          images: imageAsset,
        },
        {
          headers: { authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/producer/product-in-producer");
      });
  };
  return (
    <div className="create-layout">
      <div className="title">Produce Product</div>
      <div className="form-layout">
        <div className="form">
          <div className="date-form">
            <div className="plantDate">
              <label>ProductionDate: </label>
              <input
                type="date"
                name="plantDate"
                onChange={(e) => setProductionDate(e.target.value)}
              />
            </div>
            <div className="harvestDate">
              <label>ExpirationDate: </label>
              <input
                type="date"
                name="harvestDate"
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div className="product-name">
              <label>Production Step: </label>
              <input
                type="text"
                onChange={(e) => setProductionSteps(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="upload-layout">
          <div className="title-upload">Upload image after produce</div>

          {imageAsset ? (
            <div className="image-container">
              <img
                src={`http://localhost:8080/ipfs/${imageAsset}`}
                alt="image product"
              />
              <button
                type="button"
                className="button-delete"
                onClick={() => setImageAsset(null)}
              >
                <MdDelete />
              </button>
            </div>
          ) : (
            <label className="upload-container">
              <div className="upload">
                <p className="icon-upload">
                  <AiOutlineCloudUpload />
                </p>
                <p className="text-upload">Click to upload</p>
              </div>

              <input
                type="file"
                name="upload-image"
                onChange={handleUploadImage}
                className="input-image"
              />
            </label>
          )}
        </div>
      </div>
      <button className="button-create" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default ProduceProduct;

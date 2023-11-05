/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState } from "react";
import "./CreateProduct.scss";

import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../utils/context";

const CreateProduct = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [imageAsset, setImageAsset] = useState("");
  const [productName, setProductName] = useState("");
  const [plantDate, setPlantDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const navigate = useNavigate();
  const { setHeading } = useContext(Context);
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
      })
      .catch((err) => {
        toast.error(err.respone.data.message);
      });
  };

  const handleCreate = () => {
    axios
      .post(
        "/famer/create-product",
        {
          productName,
          plantDate,
          harvestDate,
          images: imageAsset,
        },
        {
          headers: { authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setHeading("List Products");
        navigate("/famer");
      })
      .catch((err) => {
        toast.error(err.respone.data.message[0]);
      });
  };
  return (
    <div className="create-layout">
      <div className="title">Create Product</div>
      <div className="form-layout">
        <div className="form-create">
          <div className="product-name">
            <label>Product Name: </label>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="date-form-create">
            <div className="plantDate">
              <label>PlantDate: </label>
              <input
                type="date"
                name="plantDate"
                onChange={(e) => setPlantDate(e.target.value)}
              />
            </div>
            <div className="harvestDate">
              <label>HarvestDate: </label>
              <input
                type="date"
                name="harvestDate"
                onChange={(e) => setHarvestDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="upload-layout">
          <div className="title-upload">Upload image product</div>

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

export default CreateProduct;

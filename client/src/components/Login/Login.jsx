import React, { useState } from "react";
import "./Login.scss";
import video from "../../assets/video.mp4";
import logo from "../../assets/logo.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { BiSolidUserDetail } from "react-icons/bi";
import { AiOutlineSwapRight } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!userId || !password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const { data } = await axios.post("/auth/login", {
        userId,
        password,
        userType,
      });

      localStorage.setItem("access_token", JSON.stringify(data.access_token));
      localStorage.setItem("userType", JSON.stringify(data.userType));
      const user = data.userType;
      switch (user) {
        case "Famer":
          navigate("/famer");
          break;
        case "Producer":
          navigate("/producer");
          break;
        case "Transportation":
          navigate("/transportation");
          break;
        case "Retailer":
          navigate("/retailer");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      setError("Login failed");
    }
  };
  return (
    <div className="layout">
      <div className="container">
        <div className="video">
          <video src={video} autoPlay muted loop></video>
          <div className="text">
            <h2 className="title">Create and Manage Clean Food </h2>
            <p>Seek an Origin</p>
          </div>
        </div>

        <div className="formContainer">
          <div className="header">
            <img src={logo} alt="logo image" />
            <h3>Wellcome Back!</h3>
          </div>

          <div className="form">
            <div className="inputContaier">
              <label htmlFor="userId">UserId</label>
              <div className="input">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="userId"
                  placeholder="Enter UserId"
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>
            <div className="inputContaier">
              <label htmlFor="password">Password</label>
              <div className="input">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="inputContaier">
              <label htmlFor="userType">User Type</label>
              <div className="input">
                <BiSolidUserDetail className="icon" />
                <select
                  name="userType"
                  id="userType"
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="admin">Admindator</option>
                  <option value="Famer">Famer</option>
                  <option value="Producer">Producer</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Retailer">Retailer</option>
                </select>
              </div>
            </div>

            {error && <span className="error-message">{error}</span>}

            <button onClick={handleLogin} className="btn">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className=""></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

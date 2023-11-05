import React, { useEffect, useState } from "react";
import { Button, Drawer, Select, Space, Table, Typography } from "antd";
import axios from "axios";
import { UserTypes } from "../../utils/UserType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ListUser.scss";

const ListUser = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hasData, setHasData] = useState(true);
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [UserType, setUserType] = useState("");
  const [Address, setAddress] = useState("");
  const [UpdateUserName, setUpdateUserName] = useState("");
  const [UpdateEmail, setUpdateEmail] = useState("");
  const [UpdateUserType, setUpdateUserType] = useState("");
  const [UpdateAddress, setUpdateAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get("/user", {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        if (res.data.lenght === 0) {
          setHasData(false);
        }
        setDataSource(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [access_token]);

  const handleDeleteUser = (UserId) => {
    axios
      .delete(`/user/${UserId}`, {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleOpenUpdate = (UserId) => {
    axios
      .get(`/user/${UserId}`, {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setUserInfo(res.data);
        setUpdateOpen(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleUpdateUser = (UserId) => {
    axios
      .put(
        `/user/${UserId}`,
        {
          UpdateUserName,
          UpdateEmail,
          UpdateUserType,
          UpdateAddress,
        },
        {
          headers: { authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  };

  const handleSubmit = () => {
    axios
      .post(
        "/auth/register",
        {
          UserName,
          Email,
          UserType,
          Address,
          Password,
        },
        {
          headers: { authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        toast.success("Create success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message[0]);
      });
  };
  return (
    <Space size={20} direction="vertical">
      <div className="title-list-user">
        <Typography.Title>List Users</Typography.Title>
        <Button
          className="button-create-user"
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          Create New User
        </Button>
      </div>

      <Table
        loading={loading}
        bordered
        columns={[
          { title: "User Id", dataIndex: "UserId" },
          {
            title: "User Name",
            dataIndex: "UserName",
          },
          {
            title: "User Type",
            dataIndex: "UserType",
          },
          {
            title: "Email",
            dataIndex: "Email",
          },
          {
            title: "Address",
            dataIndex: "Address",
          },
          {
            title: "Action",
            dataIndex: "UserId",
            key: "x",
            render: (UserId) => (
              <div className="action-layout">
                <button
                  className="button-update"
                  onClick={() => {
                    handleOpenUpdate(UserId);
                  }}
                >
                  Update
                </button>
                <button
                  className="button-delete"
                  onClick={() => handleDeleteUser(UserId)}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        dataSource={hasData ? dataSource : []}
        tableLayout="fixed"
        pagination={{
          position: ["bottomCenter"],
          pageSize: 10,
        }}
      ></Table>
      <Drawer
        size="large"
        title="Create User"
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
        maskClosable
      >
        <div className="create-user-layout">
          <div className="form-item">
            <label>UserName:</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>Email:</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>UserType:</label>
            <Select className="select" onChange={(e) => setUserType(e)}>
              {UserTypes.map((userType) => (
                <Select.Option key={userType.id} value={userType.value}>
                  {userType.value}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="form-item">
            <label>Address:</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>Password:</label>
            <input
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="button-create" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </Drawer>

      <Drawer
        size="large"
        title="Update User Profile"
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false);
        }}
        maskClosable
      >
        <div className="create-user-layout">
          <div className="form-item">
            <label>UserName:</label>
            <input
              type="text"
              className="input"
              value={userInfo?.UserName}
              onChange={(e) => setUpdateUserName(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>Email:</label>
            <input
              type="text"
              className="input"
              value={userInfo?.Email}
              onChange={(e) => setUpdateEmail(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>UserType:</label>
            <Select
              className="select"
              onChange={(e) => setUpdateUserType(e)}
              value={userInfo?.UserType}
            >
              {UserTypes.map((userType) => (
                <Select.Option key={userType.id} value={userType.value}>
                  {userType.value}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="form-item">
            <label>Address:</label>
            <input
              type="text"
              className="input"
              value={userInfo?.Address}
              onChange={(e) => setUpdateAddress(e.target.value)}
            />
          </div>

          <button
            className="button-update-form"
            onClick={() => handleUpdateUser(userInfo.UserId)}
          >
            Update
          </button>
        </div>
      </Drawer>
    </Space>
  );
};

export default ListUser;

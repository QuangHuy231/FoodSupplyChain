import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../../utils/UserType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("/user", {
          headers: { authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          if (res.data.lenght === 0) {
            setHasData(false);
          }
          setDataSource(res.data);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [access_token]);

  const handleDeleteUser = (UserId) => {
    try {
      axios
        .delete(`/user/${UserId}`, {
          headers: { authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOpenUpdate = (UserId) => {
    try {
      axios
        .get(`/user/${UserId}`, {
          headers: { authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          setUserInfo(res.data);
          setUpdateOpen(true);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateUser = (UserId) => {
    try {
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
        });
    } catch (error) {
      toast.error(error.massage);
    }
  };

  const handleSubmit = () => {
    try {
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
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Space size={20} direction="vertical">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title>List Users</Typography.Title>
        <Button
          style={{ float: "right" }}
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
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    background: "white",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleOpenUpdate(UserId);
                  }}
                >
                  Update
                </button>
                <button
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    background: "white",
                    color: "black",
                    cursor: "pointer",
                  }}
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
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          initialValues={{ remember: true }}
        >
          <Form.Item label="UserName" name="UserName">
            <Input onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Email" name="Email">
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="UserType" name="UserType">
            <Select onChange={(e) => setUserType(e)}>
              {UserTypes.map((userType) => (
                <Select.Option key={userType.id} value={userType.value}>
                  {userType.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Address" name="Address">
            <Input onChange={(e) => setAddress(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
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
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          initialValues={{ remember: true }}
        >
          <Form.Item label="UserName" name="UserName">
            <Input
              placeholder={userInfo?.UserName}
              onChange={(e) => setUpdateUserName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Email" name="Email">
            <Input
              placeholder={userInfo?.Email}
              onChange={(e) => setUpdateEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="UserType" name="UserType">
            <Select
              placeholder={userInfo?.UserType}
              onChange={(e) => setUpdateUserType(e)}
            >
              {UserTypes.map((userType) => (
                <Select.Option key={userType.id} value={userType.value}>
                  {userType.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Address" name="Address">
            <Input
              placeholder={userInfo?.Address}
              onChange={(e) => setUpdateAddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleUpdateUser(userInfo.UserId)}
            >
              update
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
};

export default ListUser;

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

const ListUser = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hasData, setHasData] = useState(true);
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [UserType, setUserType] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
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
  }, [access_token]);

  const handleDeleteUser = (UserId) => {
    axios
      .delete(`/user/${UserId}`, {
        headers: { authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        alert("User deleted successfully");
        window.location.reload();
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
        alert("Create success");
        window.location.reload();
      });
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
                <button>Update</button>
                <button onClick={() => handleDeleteUser(UserId)}>Delete</button>
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
        title="Create Product"
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
    </Space>
  );
};

export default ListUser;

import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { GetAllUsers, RegisterUser } from "../../../apicalls/users";
import UserCard from "./UserCard";
import "../../../StyleSheets/UsersCard.css";

const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [showSupplierForm, setShowSupplierForm] = useState(false);

  // fetch all user from backend
  const fetchAllUser = async () => {
    const response = await GetAllUsers();
    try {
      if (response.status === "success") {
        const users = response.data;
        setAllUser(users);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, [allUser]);

  // giving all data to register user api from add user form
  const onFinish = async (values) => {
    const response = await RegisterUser(values);
    try {
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("Error in api call");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish2 = async (values) => {
    console.log(values);
    const response = await RegisterUser(values);
    try {
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("Error in api call");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="Add-User-functionality">
        <div className="Add-user-buttons">
          <button
            onClick={() => {
              setShowForm(true);
              setShowSupplierForm(false);
            }}
          >
            Add User
          </button>
          <button
            onClick={() => {
              setShowSupplierForm(true);
              setShowForm(false);
            }}
          >
            Add Supplier
          </button>
        </div>
        {showForm && (
          <div className="add-user-form">
            <div
              onClick={() => {
                setShowForm(false);
              }}
              className="add-user-form-wrapper"
            ></div>
            <div className="add-user-form-container">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username",
                    },
                  ]}
                >
                  <input type="text" placeholder="username" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input email",
                    },
                  ]}
                >
                  <input type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password!",
                    },
                  ]}
                >
                  <input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                  label="Designation"
                  name="designation"
                  rules={[
                    {
                      required: true,
                      message: "Please input designation",
                    },
                  ]}
                >
                  <input type="text" placeholder="designation" />
                </Form.Item>

                <Form.Item
                  label="Department"
                  name="department"
                  rules={[
                    {
                      required: true,
                      message: "Please input department of user",
                    },
                  ]}
                >
                  <input type="text" placeholder="Department" />
                </Form.Item>

                <Form.Item
                  label="Phone No."
                  name="mobileNo"
                  rules={[
                    {
                      required: true,
                      message: "Please input department of user",
                    },
                  ]}
                >
                  <input type="tel" placeholder="Phone No." />
                </Form.Item>

                <Form.Item
                  label="Office Location"
                  name="officeLocation"
                  rules={[
                    {
                      required: true,
                      message: "Please input office Location of user",
                    },
                  ]}
                >
                  <input type="text" placeholder="Room No. , Building name" />
                </Form.Item>

                <Form.Item label="Role" name="role">
                  <p>Default : User , to make admin select Admin </p>
                  <select>
                    <option>User</option>
                    <option>Admin</option>
                    <option>Supplier</option>
                  </select>
                </Form.Item>

                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            </div>
          </div>
        )}
        {showSupplierForm && (
          <div className="add-supplier-form">
            <div
              onClick={() => {
                setShowSupplierForm(false);
              }}
              className="add-user-form-wrapper"
            ></div>
            <div className="add-user-form-container">
              <Form layout="vertical" onFinish={onFinish2}>
                <Form.Item
                  label="Add Supplier Firm"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username",
                    },
                  ]}
                >
                  <input type="text" placeholder="username" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input email",
                    },
                  ]}
                >
                  <input type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password!",
                    },
                  ]}
                >
                  <input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                  label="Designation"
                  name="designation"
                  rules={[
                    {
                      required: true,
                      message: "Please input designation",
                    },
                  ]}
                >
                  <input type="text" placeholder="designation" />
                </Form.Item>

                <Form.Item
                  label="Department"
                  name="department"
                  rules={[
                    {
                      required: true,
                      message: "Please input department of user",
                    },
                  ]}
                >
                  <input type="text" placeholder="Department" />
                </Form.Item>

                <Form.Item label="Role" name="role">
                  <p>default : user , to create admin write : admin</p>
                  <input type="text" placeholder="role" />
                </Form.Item>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>

      <div className="user-card-conatiner-header">
        <div>
          <h5>Username</h5>
        </div>
        <div>
          <h5>Email</h5>
        </div>
        <div>
          <h5>Designation</h5>
        </div>
        <div>
          <h5>Department</h5>
        </div>
        <div>
          <h5>Role</h5>
        </div>
        <div>
          <h5>Action</h5>
        </div>
      </div>

      <div className="user-card-container">
        {allUser.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;

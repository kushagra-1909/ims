import React, { useState } from "react";
import { deleteUser, updateUser } from "../../../apicalls/users";
import { Form, message } from "antd";
import { deleteRequest } from "../../../apicalls/requests";

const UserCard = ({ user }) => {
  const { _id, username, email, designation, department, role } = user;
  const [showEditForm, setShowEditForm] = useState(false);

  // delete api call in backend
  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(_id);
      if (response.status === "success") {
        message.success("user deleted successfully");
      } else {
        message.error("User not deleted");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // edit api call in backend
  const onFinish = async (values) => {
    console.log(values);
    const response = await updateUser(_id, values);
    try {
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("Edit api failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="user-card">
        <div>
          <h5>{username}</h5>
        </div>
        <div>
          <h5>{email}</h5>
        </div>
        <div>
          <h5>{designation}</h5>
        </div>
        <div>
          <h5>{department}</h5>
        </div>
        <div>
          <h5>{role}</h5>
        </div>
        <div className="user-card-action-buttons">
          <button
            onClick={() => {
              setShowEditForm(true);
            }}
          >
            Edit
          </button>
          <button onClick={handleDeleteUser}>Delete</button>
        </div>
      </div>
      {showEditForm && (
        <div>
          <div
            onClick={() => {
              setShowEditForm(false);
            }}
            className="user-edit-form-wrapper"
          ></div>
          <div className="user-edit-form-container">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Username" name="username">
                <input type="text" placeholder="username" />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <input type="password" placeholder="password" />
              </Form.Item>

              <Form.Item label="Designation" name="designation">
                <input type="text" placeholder="designation" />
              </Form.Item>

              <Form.Item label="Department" name="department">
                <input type="text" placeholder="Department" />
              </Form.Item>

              <Form.Item label="Role" name="role">
                <p>default : user , to create admin write : admin</p>
                <input type="text" placeholder="role" />
              </Form.Item>
              <div>
                <button type="submit">Update User</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;

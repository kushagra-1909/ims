import React, { useState } from "react";
import { deleteUser, updateUser } from "../../../apicalls/users";
import { Form, message } from "antd";

const UserCard = ({ user }) => {
  const { _id, username, email, designation, department, role } = user;
  const [showEditForm, setShowEditForm] = useState(false);

  // delete api call in backend
  const handleDeleteUser = async () => {
    const response = await deleteUser(_id);
    try {
      if (response.status === "success") {
        message.success(response.message);
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
        {showEditForm && (
          <div className="user-edit-form">
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
                <button
                  onClick={() => {
                    setShowEditForm(false);
                  }}
                >
                  close
                </button>
              </div>
            </Form>
          </div>
        )}
        <button onClick={handleDeleteUser}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;

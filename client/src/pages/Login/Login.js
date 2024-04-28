import React, { useState } from "react";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import ReCAPTCHA from "react-google-recaptcha";
import "../../StyleSheets/Login.css";
import logo1 from "../../StyleSheets/images/logo1.png";

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.status === "success") {
        message.success(response.message);
        localStorage.setItem("token", response.token);
        // Redirect based on user role
        if (response.role === "User") {
          navigate(`/user-dashboard/${response.id}`);
        } else if (response.role === "Admin") {
          navigate(`/admin-dashboard/${response.id}`);
        }
      }
    } catch (error) {
      message.error("Invalid Credentials");
    }
  };

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setIsChecked(true);
  };

  return (
    <div className="logo">
      <div className="background-login">
        <div className="img">
          <div className="components">
            <img src={logo1} />
            <h1 className="">LOGIN</h1>
            <Form layout="vertical" onFinish={onFinish}>
              <h2 className="username">Username</h2>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  required
                />
              </Form.Item>
              <h2 className="password">Password</h2>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <input type="password" placeholder="**********" required />
              </Form.Item>

              <ReCAPTCHA
                sitekey="6LenpLgpAAAAAMkoSqYMAjZiNuRDhqWnx3S3ksZh"
                onChange={onChange}
              />
              <div className="text-center mt-2 flex flex-col gap-1">
                <button type="submit" disabled={!isChecked}>
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

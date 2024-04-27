import { axiosInstance } from "./axiosInstance";
import axios from "axios";
// register a user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/admin-dashboard",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login a user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get user details

export const GetLoggedInUserDetails = async () => {
  try {
    const response = await axios.get("/api/users/profile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-all-users/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user by id

export const GetUserById = async (_id) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/get-single-user/${_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete a user

export const deleteUser = async (_id) => {
  try {
    const response = await axiosInstance.delete(`/api/users/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update a user
export const updateUser = async (_id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/users/${_id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import { axiosInstance } from "./axiosInstance";

// add item
export const AddItem = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/items/add-item", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all items
export const GetAllItems = async () => {
  try {
    const response = await axiosInstance.get("/api/items/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update item
export const UpdateItem = async (_id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/items/${_id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete item
export const DeleteItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/items/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get item by id
export const GetItemById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/items/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

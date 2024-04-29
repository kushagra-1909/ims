import { axiosInstance } from "./axiosInstance";
import axios from "axios";

export const addToCart = async (payload) => {
  try {
    const response = await axiosInstance.post(`/api/orders/add-item`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/orders/get-orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PlaceOrder = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/orders/place-order/${id}`,payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
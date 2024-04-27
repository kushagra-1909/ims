import { axiosInstance } from "./axiosInstance";
import axios from "axios";
// create a request
export const requestItem = async (payload) => {
  try {
    const response = await axios.post("/api/requests", payload, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all requests
export const getRequest = async () => {
  try {
    const response = await axiosInstance.get("/api/requests/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// edit an requests
export const editRequest = async (_id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/requests/${_id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete a requests
export const deleteRequest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/requests/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const partialDeclineRequest = async (id, itemIndex) => {
  try {
    const response = await axiosInstance.post("/api/requests/partial-decline", {
      requestId: id,
      itemIndex: itemIndex,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const partialApproveRequest = async (
  id,
  itemIndex,
  approvedQty,
  quantityRequested
) => {
  try {
    const response = await axiosInstance.post("/api/requests/partial-approve", {
      requestId: id,
      itemIndex,
      approvedQty,
      quantityRequested,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

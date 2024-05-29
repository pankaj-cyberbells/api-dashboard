import apiClient from './api';
import { API_ROUTES } from './constants';

export const fetchData = async (salelocation,startDate, endDate) => {
  try {
    const response = await apiClient.get(API_ROUTES.FETCH_DATA, {
      params: {
        salelocation,
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const AllStoreData = async (startDate, endDate) => {
  try {
    const response = await apiClient.get(API_ROUTES.GET_ALL, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getTarget = async () => {
  try {
    const response = await apiClient.get(`${API_ROUTES.GET_TARGET}`);
    console.log(response.data.target,"kk")
    return response.data.target;
  } catch (error) {
    throw error;
  }
};

// Update Target Service
export const updateTarget = async (targetId, targetData) => {
  try {
    const response = await apiClient.patch(`${API_ROUTES.UPDATE_TARGET}/${targetId}`, targetData);
    console.log(response)
    // return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Target Service
export const deleteTarget = async (targetId) => {
  try {
    const response = await apiClient.delete(`${API_ROUTES.DELETE_TARGET}/${targetId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
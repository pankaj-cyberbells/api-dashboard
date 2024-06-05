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


export const getTarget = async (salelocation) => {
  console.log(salelocation,"kk")
  try {
    const response = await apiClient.get(`${API_ROUTES.GET_TARGET}/${salelocation}`);
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

// Create Admin Service
export const createAdmin = async (adminData) => {
  try {
    const response = await apiClient.post(API_ROUTES.CREATE_ADMIN, adminData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllAdmins = async () => {
  try {
    const response = await apiClient.get(API_ROUTES.ALL_ADMIN);
    return response.data;
  } catch (error) {
    console.error('Failed to get all admins:', error);
    throw error;
  }
};
// In your services file
export const deleteAdmin = async (adminId) => {
  try {
    const response = await apiClient.delete(`${API_ROUTES.CREATE_ADMIN}/${adminId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const login = async (email, password) => {
  try {
    const response = await apiClient.post(API_ROUTES.LOGIN, { email, password });
    if (response) {
      console.log(response)
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  // Implement token validation logic if needed
  return token ? true : false;
};


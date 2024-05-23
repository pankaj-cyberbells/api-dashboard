import apiClient from './api';
import { API_ROUTES } from './constants';

export const fetchData = async (startDate, endDate) => {
  try {
    const response = await apiClient.get(API_ROUTES.FETCH_DATA, {
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
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
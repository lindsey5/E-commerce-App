import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://192.168.1.3:3000';

export const fetchData = async (endpoint) => {
  const token = await getToken()
  try {
    const response = await axios.get(`${API_URL}${endpoint}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data
  }
};

export const postData = async (endpoint, data) => {
  const token = await getToken()
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteData = async (endpoint) => {
  const token = await getToken()
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data
  }
};

export const updateData = async (endpoint, data) => {
  const token = await getToken()
  try {
    const response = await axios.put(`${API_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data
  }
};
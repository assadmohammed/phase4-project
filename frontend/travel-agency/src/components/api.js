// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Replace with your backend URL

export const loginUser = async (email, password) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const registerUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/users`, userData);
};

export const submitContactForm = async (contactData) => {
  return axios.post(`${API_BASE_URL}/contact`, contactData);
};

export const submitReview = async (reviewData) => {
  return axios.post(`${API_BASE_URL}/reviews`, reviewData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token for protected routes
    },
  });
};
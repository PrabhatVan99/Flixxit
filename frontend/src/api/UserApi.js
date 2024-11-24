import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5001/api/users';

// Register User
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data; // Return user data and token
  } catch (error) {
    // Check if error.response exists before accessing its properties
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error registering user');
    }
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data; // Return user data and token
  } catch (error) {
    // Check if error.response exists before accessing its properties
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error logging in');
    }
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_BASE_URL}/profile`, config);
    return response.data; // Return user profile data
  } catch (error) {
    // Check if error.response exists before accessing its properties
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to fetch user profile');
    }
  }
};

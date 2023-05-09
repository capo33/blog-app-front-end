import axios from "axios";

// const API_URL = "http://localhost:5000";
const API_URL = "https://corner-blog-api.onrender.com";

// Register a new user
const register = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/auth/register`,
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login a user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/v1/auth/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/api/v1/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateUserProfile = async (userData, token) => {
  const response = await axios.put(
    `${API_URL}/api/v1/auth/update-profile`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/api/v1/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteUser = async ( token) => {
  const response = await axios.delete(`${API_URL}/api/v1/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteUserByAdmin = async (token, userId) => {
  const response = await axios.delete(
    `${API_URL}/api/v1/auth/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const forgotPassword = async (formData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/auth/forgot-password`,
    formData
  );
  return response.data;
};


const authServices = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  deleteUserByAdmin,
  forgotPassword,
};

export default authServices;

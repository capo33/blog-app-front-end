import axios from "axios";

const API_URL = "http://localhost:5000";

// Get all Categories
const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}/api/v1/categories`);
  return response.data;
};

// Get a Category by slug
const getSingleCategory = async (slug) => {
  const response = await axios.get(`${API_URL}/api/v1/categories/${slug}`);
  return response.data;
};

// Create a new Category
const createNewCategory = async (name, token) => {
  const response = await axios.post(
    `${API_URL}/api/v1/categories`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update a Category
const updateCategory = async (id, categoryData, token) => {
  const response = await axios.put(
    `${API_URL}/api/v1/categories/${id}`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete a Category
const deleteCategory = async (id, token) => {
  const response = await axios.delete(`${API_URL}/api/v1/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const categoryService = {
  getAllCategories,
  getSingleCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;

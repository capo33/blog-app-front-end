import axios from "axios";

// const API_URL = "http://localhost:5000";
const API_URL = "https://corner-blog-api.onrender.com";

// Get all blogs
const getAllBlogs = async () => {
  const response = await axios.get(`${API_URL}/api/v1/blogs`);
  return response.data;
};

// Get single blog
const getSingleBlog = async (id) => {
  const response = await axios.get(`${API_URL}/api/v1/blogs/${id}`);
  return response.data;
};

// Get featured blogs
const getFeaturedBlogs = async () => {
  const response = await axios.get(`${API_URL}/api/v1/blogs/featured`);
  return response.data;
};

// Get blogs by tag
const getBlogsByTag = async (tag) => {
  const response = await axios.get(`${API_URL}/api/v1/blogs/tag/${tag}`);
  return response.data;
};

// Get related blogs
const getRelatedBlogs = async (id) => {
  const response = await axios.get(`${API_URL}/api/v1/blogs/related/${id}`);
  return response.data;
};

// Search blogs
const searchBlogs = async (keyword) => {
  const response = await axios.get(`${API_URL}/api/v1/blogs/search/${keyword}`);
  return response.data;
};

// Create a new blog
const createNewBlog = async (blogData, token) => {
  const response = await axios.post(`${API_URL}/api/v1/blogs`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // toast.success("Blog created successfully");
  return response.data;
};

// Update a blog
const updateBlog = async (id, blogData, token) => {
  const response = await axios.put(`${API_URL}/api/v1/blogs/${id}`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a blog
const deleteBlog = async (id, token) => {
  const response = await axios.delete(`${API_URL}/api/v1/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Like a blog
const likeBlog = async (id, token) => {
  const response = await axios.patch(
    `${API_URL}/api/v1/blogs/like/${id}`,
    {},
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const blogService = {
  getAllBlogs,
  getSingleBlog,
  getFeaturedBlogs,
  getBlogsByTag,
  getRelatedBlogs,
  searchBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
};

export default blogService;

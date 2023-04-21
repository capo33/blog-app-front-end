import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogService from "./blogService";

const initialState = {
  blogs: [],
  blog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all blogs
export const getAllBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogService.getAllBlogs();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Get a blog by id
export const getSingleBlog = createAsyncThunk(
  "blog/getSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await blogService.getSingleBlog(id);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Create a new blog
export const createNewBlog = createAsyncThunk(
  "blog/createNewBlog",
  async ({ blogData, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await blogService.createNewBlog(blogData, token);
      toast.success("Blog created successfully");
      navigate("/");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update a blog
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, blogData, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await blogService.updateBlog(id, blogData, token);
      toast.success("Blog updated successfully");
      navigate(`/blog-details/${id}`);
      // !blogData && toast.error("Please select a photo");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete a blog
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ id, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await blogService.deleteBlog(id, token);
      console.log("response.data", response.data);
      toast.success("Blog deleted successfully");
      navigate("/");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(error.message);
      return rejectWithValue(message);
    }
  }
);

// Like a blog
export const likeBlog = createAsyncThunk(
  "blog/likeBlog",
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await blogService.likeBlog(_id, token);
       return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlogState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get all blogs
    builder.addCase(getAllBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = action.payload.blogs;
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get a single blog
    builder.addCase(getSingleBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blog = action.payload.blog;
    });
    builder.addCase(getSingleBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Create a new blog
    builder.addCase(createNewBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNewBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = [action.payload.blog, ...state.blogs];
    });
    builder.addCase(createNewBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Update a blog
    builder.addCase(updateBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = state.blogs.map((blog) =>
        blog._id === action.payload.blog._id ? action.payload.blog : blog
      );
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Delete a blog
    builder.addCase(deleteBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload.blog._id
      );
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Like a blog
    builder.addCase(likeBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.map((blog) =>
          blog._id === _id ? action.payload : blog
        );
      } else {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      }
    });
    builder.addCase(likeBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetBlogState } = blogSlice.actions;

export default blogSlice.reducer;

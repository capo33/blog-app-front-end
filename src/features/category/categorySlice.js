import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "./categoryService";

const initialState = {
  categories: [],
  category: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getAllCategories();
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

// Get a category by slug
export const getSingleCategory = createAsyncThunk(
  "category/getSingleCategory",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await categoryService.getSingleCategory(slug);
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

// Create a new category
export const createNewCategory = createAsyncThunk(
  "category/createNewCategory",
  async ({ name, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await categoryService.createNewCategory(name, token);
      toast.success("Category created successfully");
      navigate("/categories");
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

// Update a category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await categoryService.updateCategory(
        id,
        categoryData,
        token
      );
      toast.success("Category updated successfully");
      navigate("/categories");
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

// Delete a category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await categoryService.deleteCategory(id, token);
      toast.success("Category deleted successfully");
      navigate("/categories");
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get all categories
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = actions.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Get a category by slug
    builder.addCase(getSingleCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(getSingleCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Create a new category
    builder.addCase(createNewCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNewCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(createNewCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Update a category
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(updateCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Delete a category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
  },
});

export const { resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;

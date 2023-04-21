import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage if it exists
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register a user
export const register = createAsyncThunk(
  "auth/register",
  async ({ userData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      toast.success("Registration successful");
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

// Login a user
export const login = createAsyncThunk(
  "auth/login",
  async ({ userData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await authService.login(userData);
      const username = response?.user?.name;
      toast.success(`Welcome back ${username}`);
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

// Logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

// Get user profile
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async ({ token, toast }, { rejectWithValue }) => {
    try {
      const response = await authService.getUserProfile(token);
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

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userData, token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await authService.updateUserProfile(userData, token);
      toast.success(`${response.message}`);
      navigate("/profile");
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

// Delete user profile
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await authService.deleteUser(token);
      toast.success(`${response.message}`);
      navigate("/login");
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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(formData);
      toast.success(`${response.message}`);
      navigate("/login");
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Register a user
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });

    // Login a user
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });

    // Logout a user
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    // Get user profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });

    // Update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });

    // Delete user profile
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });

    // Forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;

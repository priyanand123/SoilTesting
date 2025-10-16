import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReq } from "../../../api/authApi"; // ✅ your existing API call

// 🔹 Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // API request (you already have loginReq)
      const response = await loginReq({ username, password });

      const data = response.data; // e.g. token, name, roleId, etc.

      // ✅ Store important details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresAt", data.expiresAt || "");
      localStorage.setItem("roleId", data.roleId);
      localStorage.setItem("roleName", data.roleName || "");
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name || "");

      // ✅ Return all data to the reducer
      return data;
    } catch (error) {
      // Handle API or network error
      return rejectWithValue(error.errorMsg || "Login failed");
    }
  }
);

// 🔹 Initial state
const initialState = {
  name: null,
  username: null,
  roleId: null,
  roleName: null,
  userId: null,
  token: null,
  loading: false,
  error: null,
};

// 🔹 Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.name = null;
      state.username = null;
      state.roleId = null;
      state.roleName = null;
      state.userId = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { name, username, roleId, roleName, userId, token } = action.payload;

        // ✅ Update Redux state
        state.name = name || "";
        state.username = username || "";
        state.roleId = roleId;
        state.roleName = roleName;
        state.userId = userId;
        state.token = token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

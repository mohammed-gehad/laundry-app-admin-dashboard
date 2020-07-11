import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/server";
// import storage from "redux-persist/lib/storage";
const storage = window.localStorage;

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const result = await api.post("/customer/login", { email, password });
    if (result.data.message === "invalid email")
      throw new Error("invalid email");
    return { user: result.data, token: result.headers.token };
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
    loading: false,
    erorrMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = "";
      storage.clear();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
    [login.pending]: (state, { payload }) => {
      console.log(payload);
    },
    [login.rejected]: (state, { payload }) => {
      console.log("rejected");
    },
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

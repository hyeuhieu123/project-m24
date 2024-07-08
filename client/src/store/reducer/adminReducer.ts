import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initial: any = [];

export const getAllUser: any = createAsyncThunk("get/getUser", async () => {
  const res = await axios.get("http://localhost:3000/users");
  return res.data;
});

const adminReducer = createSlice({
  name: "admin",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUser.pending, (state, action: any) => {
        // state.users = action.payload;
      })
      .addCase(getAllUser.fulfilled, (state, action: any) => {
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state: any, action: any) => {
        // state.users = action.payload;
      });
  },
});
export default adminReducer.reducer;

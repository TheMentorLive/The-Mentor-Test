import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERENDPOINTS } from "../constants/ApiConstants";


// Thunk to fetch cart data
export const fetchCart = createAsyncThunk("cart/fetchCart", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(USERENDPOINTS.GET_CART, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("response",response.data);
    
    return response.data.testIds; // Return cart data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

const cartSlice = createSlice({
  name: "usercart",

  initialState: {
    items: [], // Array to hold cart items
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

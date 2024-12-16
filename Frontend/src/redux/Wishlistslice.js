import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERENDPOINTS } from "../constants/ApiConstants";


// Thunk to fetch cart data
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(USERENDPOINTS.GET_WISHLIST, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("response",response.data);
    
    return response.data.testIds; // Return cart data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch wishlist");
  }
});

const wishlistSlice = createSlice({
  name: "userwishlist",

  initialState: {
    items: [], // Array to hold cart items
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;

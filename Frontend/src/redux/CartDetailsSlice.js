import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERENDPOINTS } from '../constants/ApiConstants';


// Async thunk to fetch cart details
export const fetchCartDetails = createAsyncThunk(
    'cart/fetchCartDetails',
    async (token, { rejectWithValue }) => {
        try {
            if (token) {
                const response = await axios.get(USERENDPOINTS.GET_CART_DETAILS, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                return response.data.cartDetails || [];
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                return localCart;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error fetching cart details');
        }
    }
);

// Async thunk to remove item from cart
export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async ({ userId, courseId, token }, { dispatch, rejectWithValue }) => {
        try {
            if (userId) {
                await axios.delete(`/api/cart/${userId}/${courseId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                const updatedCart = localCart.filter((item) => item._id !== courseId);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                window.dispatchEvent(new Event('storage')); // Trigger local storage event
            }
            // Refetch cart after removal
            dispatch(fetchCartDetails(token));
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error removing item from cart');
        }
    }
);

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartDetails.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCartDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

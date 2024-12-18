import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";
import wishlistReducer from "./Wishlistslice"
import cartDetailsReducer from "./CartDetailsSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishlistReducer,
    cartDetails:cartDetailsReducer
    
  },
});

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import shopifyReducer from './ShopifySlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        shopify: shopifyReducer,
    },
});

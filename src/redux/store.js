import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import shopifyReducer from './ShopifySlice';
import { ordersReducer, customersReducer, inventoryReducer } from './StoreSlice';
import teamReducer from './TeamSlice';
import notificaitonSlice from './NotificationSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        shopify: shopifyReducer,
        orders: ordersReducer,
        customers: customersReducer,
        inventory: inventoryReducer,
        team: teamReducer,
        notification: notificaitonSlice,
    },
});

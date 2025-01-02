import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = 'http://localhost:5000';

const initialOrdersState = {
    orders: [],
    loading: false,
    error: null,
};

const initialCustomersState = {
    customers: [],
    loading: false,
    error: null,
};

const initialInventoryState = {
    inventory: [],
    loading: false,
    error: null,
};

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (shopId, thunkAPI) => {
    try {
        const response = await axios.get(`${api_url}/shopify/fetch-orders/${shopId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('retailprox_accesstoken')}`,
            },
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Async thunk to fetch customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (shopId, thunkAPI) => {
    try {
        const response = await axios.get(`${api_url}/shopify/fetch-customers/${shopId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('retailprox_accesstoken')}`,
            },
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Async thunk to fetch inventory
export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async (shopId, thunkAPI) => {
    try {
        const response = await axios.get(`${api_url}/shopify/fetch-products/${shopId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('retailprox_accesstoken')}`,
            },
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Orders slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialOrdersState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Customers slice
const customersSlice = createSlice({
    name: 'customers',
    initialState: initialCustomersState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Inventory slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialInventoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const ordersReducer = ordersSlice.reducer;
export const customersReducer = customersSlice.reducer;
export const inventoryReducer = inventorySlice.reducer;

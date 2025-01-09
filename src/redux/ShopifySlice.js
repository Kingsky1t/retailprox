import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = 'http://localhost:5000';

const initialState = {
    store: {},
    error: null,
    loading: false,
};

export const addShopifyStore = createAsyncThunk('shopify/add-store', async (store, thunkAPI) => {
    try {
        const response = await axios.post(api_url + '/shopify/add-store', store, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('retailprox_accesstoken')}`,
            },
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const addUserToShopifyStore = createAsyncThunk('shopify/add-user-to-store', async (data, thunkAPI) => {
    try {
        const response = await axios.post(api_url + '/shopify/add-user-to-store', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('retailprox_accesstoken')}`,
            },
        });
        thunkAPI.dispatch(fetchShopifyStoreDetails(data.storeId));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const fetchShopifyStoreDetails = createAsyncThunk('shopify/fetch-store-details', async (storeId, thunkAPI) => {
    try {
        const token = localStorage.getItem('retailprox_accesstoken');
        const response = await axios.get(api_url + `/shopify/fetch-store-details/${storeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const shopifySlice = createSlice({
    name: 'shopify',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addShopifyStore.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addShopifyStore.fulfilled, state => {
            state.loading = false;
        });
        builder.addCase(addShopifyStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addUserToShopifyStore.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addUserToShopifyStore.fulfilled, state => {
            state.loading = false;
        });
        builder.addCase(addUserToShopifyStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchShopifyStoreDetails.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchShopifyStoreDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload.store;
        });
        builder.addCase(fetchShopifyStoreDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const {} = shopifySlice.actions;
export default shopifySlice.reducer;

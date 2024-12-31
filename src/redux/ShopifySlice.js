import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = 'http://localhost:5000';
const initialState = {
    storeIds: [],
};

const ShopifySlice = createSlice({
    name: 'shopify',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchStoreIds.fulfilled, (state, action) => {
            state.storeIds = action.payload;
        });
        builder.addCase(fetchStoreIds.rejected, state => {
            state.storeIds = [];
        });
    },
});

export const fetchStoreIds = createAsyncThunk('/shopify/fetchStoreIds', async (userId, thunkAPI) => {
    try {
        const response = await axios.post(api_url + '/shopify/fetch', {
            userId,
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

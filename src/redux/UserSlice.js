import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api_url = 'http://localhost:5000';

const initialState = {
    user: null,
    // token: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk('user/register', async (user, thunkAPI) => {
    try {
        const response = await axios.post(api_url + '/user/register', user);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const loginUser = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
        const response = await axios.post(api_url + '/user/login', user);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const verifyUserToken = createAsyncThunk('user/verify-user', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('retailprox_accesstoken');
        if (!token) {
            console.warn('No token found. Redirecting to login...');
            return thunkAPI.rejectWithValue('No token found');
        }

        const response = await axios.post(api_url + '/user/verify-token', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("response", response)

        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            // state.token = null;
            localStorage.clear('retailxpro_accesstoken');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                // state.token = action.payload.accessToken;
                localStorage.setItem('retailprox_accesstoken', action.payload.accessToken);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(loginUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                // state.token = action.payload.token;
                localStorage.setItem('retailprox_accesstoken', action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(verifyUserToken.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyUserToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(verifyUserToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

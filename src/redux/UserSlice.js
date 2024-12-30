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
        console.warn(err);
        return thunkAPI.rejectWithValue(err);
    }
});

export const loginUser = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
        const response = await axios.post(api_url + '/user/login', user);
        return response.data;
    } catch (error) {
        return thunkAPIrejectWithValue(error.response.data);
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
                console.log('user registered', action.payload.user);
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
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

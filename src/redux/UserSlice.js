import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const api_url = 'http://localhost:5000';

const initialState = {
    user: null,
    // token: null,
    loading: false,
    error: null,
    activeStore: null,
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

        const response = await axios.post(
            api_url + '/user/verify-user',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const verifyGoogleToken = createAsyncThunk(
    'user/verifyGoogleToken',
    async (token, { rejectWithValue }) => {
        try {

            const decodedToken = jwtDecode(token);

            // console.log("from UserSlice",decodedToken);
            return decodedToken;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            // state.token = null;
            localStorage.clear('retailxpro_accesstoken');
        },
        changeActiveStore: (state, action) => {
            state.activeStore = JSON.parse(action.payload);
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
                state.activeStore = action.payload.user.stores[0];
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
                state.activeStore = action.payload.user.stores[0];
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
                state.activeStore = action.payload.user.stores[0];
            })
            .addCase(verifyUserToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
             // Verify Google Token
             .addCase(verifyGoogleToken.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyGoogleToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // localStorage.setItem('retailprox_accesstoken', action.payload.accessToken);
            })
            .addCase(verifyGoogleToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, changeActiveStore } = userSlice.actions;
export default userSlice.reducer;

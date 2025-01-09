import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const api_url = 'http://localhost:5000';

const initialState = {
    usersInTeam: [],
    successMessage: null,
    error: null,
    loading: false,
};

export const fetchUsers = createAsyncThunk('team/fetch-users', async (_, thunkAPI) => {
    try {
        const accessToken = localStorage.getItem('retailprox_accesstoken');
        const response = await axios.get(api_url + '/user/fetch-users', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const createUser = createAsyncThunk('team/create-user', async (user, thunkAPI) => {
    try {
        const accessToken = localStorage.getItem('retailprox_accesstoken');
        const response = await axios.post(api_url + '/user/create-user', user, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        thunkAPI.dispatch(fetchUsers());
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const TeamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersInTeam = action.payload.users;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createUser.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const {} = TeamSlice.actions;
export default TeamSlice.reducer;

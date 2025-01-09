import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    showNotification: false,
};
const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload;
            state.showNotification = true;
        },
        hideNotification: state => {
            state.message = '';
            state.showNotification = false;
        },
    },
});

export const { setNotification, hideNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;

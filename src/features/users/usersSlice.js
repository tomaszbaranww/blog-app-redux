import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/axios';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await api.get('/users');
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;

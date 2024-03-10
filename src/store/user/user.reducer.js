import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  currentUser: null,
};

export const userSilce = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    }
  },
});

export const { setCurrentUser } = userSilce.actions;

export const userReducer = userSilce.reducer;

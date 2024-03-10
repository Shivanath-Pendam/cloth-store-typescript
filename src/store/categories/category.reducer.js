import { createSlice } from '@reduxjs/toolkit';

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const categorieSilce = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    }
  }
});

export const { setCategories } = categorieSilce.actions;

export const categoriesReducer = categorieSilce.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  selectedFilter: string;
}

const initialState: FilterState = {
  selectedFilter: 'All',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Explicitly typing the action payload
    setFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

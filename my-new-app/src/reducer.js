import { createSlice } from "@reduxjs/toolkit";

const restaurants = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: [],
    filteredRestaurants: [],
  },
  reducers: {
    setRestaurants(state, action) {
      state.restaurants = action.payload;
    },
    resetRestaurants(state) {
      state.restaurants = [];
    },
    setFilteredRestaurants(state, action) {
      state.filteredRestaurants = action.payload;
    },
  },
});

export const { setRestaurants, resetRestaurants, setFilteredRestaurants } =
  restaurants.actions;

export default restaurants.reducer;

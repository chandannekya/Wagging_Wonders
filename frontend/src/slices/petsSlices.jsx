import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: null,
};

const petSlice = createSlice({
  name: "pets",
  initialState,

  reducers: {
    addPets: (state, action) => {
      state.pets = action.payload.data;
    },
  },
});

export const createSlice = petSlice.action;

export default createSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

const initialState = {
  activeHotel: null,
};

export const fetchHotelDetailsAPI = createAsyncThunk(
  "activeHotel/fetchHotelDetailsAPI",
  async (hotelId) => {
    const res = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/hotels/${hotelId}`
    );
    return res.data;
  }
);

const activeHotelSlice = createSlice({
  name: "activeHotel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchHotelDetailsAPI.fulfilled, (state, action) => {
      const currentHotel = action.payload;
      state.activeHotel = currentHotel;
    });
  },
});

export const selectActiveHotel = (state) => {
  return state.activeHotel.activeHotel;
};

export const activeHotelReducer = activeHotelSlice.reducer;

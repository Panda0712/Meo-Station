import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

const initialState = {
  activeBooking: null,
};

export const fetchBookingDetailsAPI = createAsyncThunk(
  "activeBooking/fetchBookingDetailsAPI",
  async (bookingId) => {
    const res = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/bookings/${bookingId}`
    );
    return res.data;
  }
);

const activeBookingSlice = createSlice({
  name: "activeBooking",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBookingDetailsAPI.fulfilled, (state, action) => {
      const currentBooking = action.payload;
      state.activeBooking = currentBooking;
    });
  },
});

export const selectActiveBooking = (state) => {
  return state.activeBooking.activeBooking;
};

export const activeBookingReducer = activeBookingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const bookingIdSlice = createSlice({
  name: "bookingIdSlice",
  initialState: {
  bookingId: ""
  },
  reducers: {
    getbookingId: (state, action) => {
      return {
        bookingId: action.payload,
      };
    },
    
  },
});

export const { getbookingId } = bookingIdSlice.actions;
export default bookingIdSlice.reducer;

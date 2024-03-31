import { createSlice } from "@reduxjs/toolkit";

const userdetailSlice = createSlice({
  name: "userdetailSlice",
  initialState: {
    name: "",
    phoneNum: "",
  },
  reducers: {
    username: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    userphone: (state, action) => {
      return {
        ...state,
        phoneNum: action.payload,
      };
    },
  },
});

export const { username, userphone } = userdetailSlice.actions;
export default userdetailSlice.reducer;

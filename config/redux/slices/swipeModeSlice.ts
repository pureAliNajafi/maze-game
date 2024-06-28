import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: boolean = true;
const swipeModeSlice = createSlice({
  name: "swipeMode",
  initialState,
  reducers: {
    toggleSwipeMode: (state) => !state,
  },
});

export const { toggleSwipeMode } = swipeModeSlice.actions;
export default swipeModeSlice.reducer;

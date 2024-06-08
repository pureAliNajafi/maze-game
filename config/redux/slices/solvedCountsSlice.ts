import { Difficulty, SolvedCounts } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SolvedCounts = {
  exp: 0,
  mid: 0,
  nov: 0,
};

const solvedCountsSlice = createSlice({
  name: "solvedCounts",
  initialState,
  reducers: {
    incrementSolvedCount: (state, action: PayloadAction<Difficulty>) => {
      state[action.payload]++;
    },
  },
});

export const { incrementSolvedCount } = solvedCountsSlice.actions;
export default solvedCountsSlice.reducer;

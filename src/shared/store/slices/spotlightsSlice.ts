import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SpotlightsState {
  applied: string[];
  snoozed: string[];
}

const initialState: SpotlightsState = {
  applied: [],
  snoozed: [],
};

export const spotlightsSlice = createSlice({
  name: "spotlights",
  initialState,
  reducers: {
    applyTrigger: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.applied.includes(id)) {
        state.applied.push(id);
      }
    },
    snoozeTrigger: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.snoozed.includes(id)) {
        state.snoozed.push(id);
      }
    },
    resetSpotlights: (state) => {
      state.applied = [];
      state.snoozed = [];
    },
  },
});

export const { applyTrigger, snoozeTrigger, resetSpotlights } = spotlightsSlice.actions;
export default spotlightsSlice.reducer;

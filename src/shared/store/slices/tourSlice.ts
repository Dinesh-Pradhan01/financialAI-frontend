import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TourState {
  seenIntro: boolean;
  tourStep: number;
}

const initialState: TourState = {
  seenIntro: false,
  tourStep: -1,
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    dismissIntro: (state) => {
      state.seenIntro = true;
    },
    startTour: (state) => {
      state.seenIntro = true;
      state.tourStep = 0;
    },
    setTourStep: (state, action: PayloadAction<number>) => {
      state.tourStep = action.payload;
    },
    endTour: (state) => {
      state.tourStep = -1;
    },
    resetTour: (state) => {
      state.seenIntro = false;
      state.tourStep = -1;
    },
  },
});

export const { dismissIntro, startTour, setTourStep, endTour, resetTour } = tourSlice.actions;

export default tourSlice.reducer;

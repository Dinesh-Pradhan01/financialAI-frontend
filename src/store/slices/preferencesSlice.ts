import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PreferencesState {
  language: string;
  channel: string;
  notificationsOn: boolean;
  timeframe: string;
}

const initialState: PreferencesState = {
  language: "en",
  channel: "WhatsApp",
  notificationsOn: true,
  timeframe: "12M",
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setChannel: (state, action: PayloadAction<string>) => {
      state.channel = action.payload;
    },
    setNotificationsOn: (state, action: PayloadAction<boolean>) => {
      state.notificationsOn = action.payload;
    },
    setTimeframe: (state, action: PayloadAction<string>) => {
      state.timeframe = action.payload;
    },
    resetPreferences: (state) => {
      state.language = "en";
      state.channel = "WhatsApp";
      state.notificationsOn = true;
      state.timeframe = "12M";
    },
  },
});

export const {
  setLanguage,
  setChannel,
  setNotificationsOn,
  setTimeframe,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ConsentPreferences {
  read: boolean;
  detect: boolean;
  offers: boolean;
  updatedAt?: string | null;
}

export interface PreferencesState {
  language: string;
  channel: string;
  notificationsOn: boolean;
  timeframe: string;
  consent: ConsentPreferences;
}

const initialState: PreferencesState = {
  language: "en",
  channel: "WhatsApp",
  notificationsOn: true,
  timeframe: "12M",
  consent: {
    read: true,
    detect: true,
    offers: false,
    updatedAt: null,
  },
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
    setConsent: (state, action: PayloadAction<Partial<ConsentPreferences>>) => {
      state.consent = {
        ...state.consent,
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };
    },
    resetPreferences: (state) => {
      state.language = "en";
      state.channel = "WhatsApp";
      state.notificationsOn = true;
      state.timeframe = "12M";
      state.consent = {
        read: true,
        detect: true,
        offers: false,
        updatedAt: null,
      };
    },
  },
});

export const {
  setLanguage,
  setChannel,
  setNotificationsOn,
  setTimeframe,
  setConsent,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;

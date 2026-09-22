import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CoachMsg {
  who: "user" | "bot";
  text?: string;
  answer?: unknown;
}

export interface CoachState {
  conversation: CoachMsg[];
}

const initialState: CoachState = {
  conversation: [],
};

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<CoachMsg>) => {
      state.conversation.push(action.payload);
    },
    setConversation: (state, action: PayloadAction<CoachMsg[]>) => {
      state.conversation = action.payload;
    },
    clearConversation: (state) => {
      state.conversation = [];
    },
  },
});

export const { addMessage, setConversation, clearConversation } = coachSlice.actions;

export default coachSlice.reducer;

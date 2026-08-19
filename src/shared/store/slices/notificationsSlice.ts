import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { seedNotifications, type NotificationItem } from "@/shared/data/agentic";

export interface NotificationsState {
  notifications: NotificationItem[];
  notificationsRead: boolean;
}

const initialState: NotificationsState = {
  notifications: seedNotifications,
  notificationsRead: false,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markNotificationsRead: (state) => {
      state.notificationsRead = true;
    },
    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      state.notifications.unshift(action.payload);
      state.notificationsRead = false;
    },
    resetNotifications: (state) => {
      state.notifications = seedNotifications;
      state.notificationsRead = false;
    },
  },
});

export const {
  markNotificationsRead,
  addNotification,
  resetNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

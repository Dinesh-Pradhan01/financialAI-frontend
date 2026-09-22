import { createSelector } from "@reduxjs/toolkit";
import { rohan } from "@/shared/data/rohan";
import type { RootState } from "./index";

const FOUND_IDS = ["fd", "travel-card", "home-loan"];
const BASE_WELLNESS = 81;

// Base Slice Selectors
export const selectSpotlightsState = (state: RootState) => state.spotlights;
export const selectPreferencesState = (state: RootState) => state.preferences;
export const selectNotificationsState = (state: RootState) => state.notifications;
export const selectCoachState = (state: RootState) => state.coach;
export const selectTourState = (state: RootState) => state.tour;

// Spotlight Selectors
export const selectApplied = createSelector(
  [selectSpotlightsState],
  (spotlights) => spotlights.applied,
);

export const selectSnoozed = createSelector(
  [selectSpotlightsState],
  (spotlights) => spotlights.snoozed,
);

export const selectIsApplied = (id: string) =>
  createSelector([selectApplied], (applied) => applied.includes(id));

export const selectMoneyFound = createSelector([selectApplied], (applied) =>
  rohan.spotlights
    .filter((t) => FOUND_IDS.includes(t.id) && !applied.includes(t.id))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0),
);

export const selectWellness = createSelector([selectApplied], (applied) =>
  Math.min(92, BASE_WELLNESS + applied.length * 2),
);

export const selectHighPriorityCount = createSelector(
  [selectApplied, selectSnoozed],
  (applied, snoozed) =>
    rohan.spotlights.filter(
      (t) => t.severity === "high" && !applied.includes(t.id) && !snoozed.includes(t.id),
    ).length,
);

// Preference Selectors
export const selectLanguage = createSelector([selectPreferencesState], (p) => p.language);

export const selectChannel = createSelector([selectPreferencesState], (p) => p.channel);

export const selectNotificationsOn = createSelector(
  [selectPreferencesState],
  (p) => p.notificationsOn,
);

export const selectTimeframe = createSelector([selectPreferencesState], (p) => p.timeframe);

// Notification Selectors
export const selectNotifications = createSelector(
  [selectNotificationsState],
  (n) => n.notifications,
);

export const selectNotificationsRead = createSelector(
  [selectNotificationsState],
  (n) => n.notificationsRead,
);

// Coach Selectors
export const selectConversation = createSelector([selectCoachState], (c) => c.conversation);

// Tour Selectors
export const selectSeenIntro = createSelector([selectTourState], (t) => t.seenIntro);

export const selectTourStep = createSelector([selectTourState], (t) => t.tourStep);

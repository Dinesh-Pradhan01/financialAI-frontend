import { r as createSelector } from "../_libs/@reduxjs/toolkit+[...].mjs";
import { i as rohan } from "./rohan-BsoI7WdA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/selectors-CqEsKQIY.js
var FOUND_IDS = [
	"fd",
	"travel-card",
	"home-loan"
];
var BASE_WELLNESS = 81;
var selectSpotlightsState = (state) => state.spotlights;
var selectPreferencesState = (state) => state.preferences;
var selectNotificationsState = (state) => state.notifications;
var selectCoachState = (state) => state.coach;
var selectTourState = (state) => state.tour;
var selectApplied = createSelector([selectSpotlightsState], (spotlights) => spotlights.applied);
var selectSnoozed = createSelector([selectSpotlightsState], (spotlights) => spotlights.snoozed);
var selectIsApplied = (id) => createSelector([selectApplied], (applied) => applied.includes(id));
createSelector([selectApplied], (applied) => rohan.spotlights.filter((t) => FOUND_IDS.includes(t.id) && !applied.includes(t.id)).reduce((sum, t) => sum + Math.abs(t.amount), 0));
createSelector([selectApplied], (applied) => Math.min(92, BASE_WELLNESS + applied.length * 2));
createSelector([selectApplied, selectSnoozed], () => 0);
var selectLanguage = createSelector([selectPreferencesState], (p) => p.language);
var selectChannel = createSelector([selectPreferencesState], (p) => p.channel);
var selectNotificationsOn = createSelector([selectPreferencesState], (p) => p.notificationsOn);
var selectTimeframe = createSelector([selectPreferencesState], (p) => p.timeframe);
createSelector([selectNotificationsState], (n) => n.notifications);
createSelector([selectNotificationsState], (n) => n.notificationsRead);
var selectConversation = createSelector([selectCoachState], (c) => c.conversation);
var selectSeenIntro = createSelector([selectTourState], (t) => t.seenIntro);
var selectTourStep = createSelector([selectTourState], (t) => t.tourStep);
//#endregion
export { selectNotificationsOn as a, selectTourStep as c, selectLanguage as i, selectConversation as n, selectSeenIntro as o, selectIsApplied as r, selectTimeframe as s, selectChannel as t };

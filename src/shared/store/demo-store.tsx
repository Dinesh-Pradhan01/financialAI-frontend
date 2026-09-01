import { useCallback, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import {
  selectApplied,
  selectSnoozed,
  selectLanguage,
  selectChannel,
  selectNotificationsOn,
  selectTimeframe,
  selectNotifications,
  selectNotificationsRead,
  selectConversation,
  selectSeenIntro,
  selectTourStep,
  selectMoneyFound,
  selectWellness,
  selectHighPriorityCount,
} from "./selectors";
import {
  applyTrigger as applyTriggerAction,
  snoozeTrigger as snoozeTriggerAction,
  resetSpotlights,
} from "./slices/spotlightsSlice";
import {
  setLanguage as setLanguageAction,
  setChannel as setChannelAction,
  setNotificationsOn as setNotificationsOnAction,
  setTimeframe as setTimeframeAction,
  resetPreferences,
} from "./slices/preferencesSlice";
import {
  markNotificationsRead as markNotificationsReadAction,
  resetNotifications,
} from "./slices/notificationsSlice";
import {
  setConversation as setConversationAction,
  clearConversation,
  type CoachMsg,
} from "./slices/coachSlice";
import {
  dismissIntro as dismissIntroAction,
  startTour as startTourAction,
  setTourStep as setTourStepAction,
  endTour as endTourAction,
  resetTour,
} from "./slices/tourSlice";
import type { NotificationItem } from "@/shared/data/agentic";

export type { CoachMsg, NotificationItem };

export interface DemoContextValue {
  applied: string[];
  snoozed: string[];
  language: string;
  channel: string;
  notificationsOn: boolean;
  timeframe: string;
  notifications: NotificationItem[];
  notificationsRead: boolean;
  conversation: CoachMsg[];
  seenIntro: boolean;
  tourStep: number;
  moneyFound: number;
  wellness: number;
  highPriorityCount: number;
  isApplied: (id: string) => boolean;
  applyTrigger: (id: string) => void;
  snoozeTrigger: (id: string) => void;
  setLanguage: (code: string) => void;
  setChannel: (c: string) => void;
  setNotificationsOn: (v: boolean) => void;
  setTimeframe: (t: string) => void;
  markNotificationsRead: () => void;
  setConversation: (updater: (prev: CoachMsg[]) => CoachMsg[]) => void;
  dismissIntro: () => void;
  startTour: () => void;
  setTourStep: (n: number) => void;
  endTour: () => void;
  resetAll: () => void;
}

/**
 * Hook backed directly by the Redux Toolkit store.
 */
export function useDemo(): DemoContextValue {
  const dispatch = useAppDispatch();

  const applied = useAppSelector(selectApplied);
  const snoozed = useAppSelector(selectSnoozed);
  const language = useAppSelector(selectLanguage);
  const channel = useAppSelector(selectChannel);
  const notificationsOn = useAppSelector(selectNotificationsOn);
  const timeframe = useAppSelector(selectTimeframe);
  const notifications = useAppSelector(selectNotifications);
  const notificationsRead = useAppSelector(selectNotificationsRead);
  const conversation = useAppSelector(selectConversation);
  const seenIntro = useAppSelector(selectSeenIntro);
  const tourStep = useAppSelector(selectTourStep);
  const moneyFound = useAppSelector(selectMoneyFound);
  const wellness = useAppSelector(selectWellness);
  const highPriorityCount = useAppSelector(selectHighPriorityCount);

  const isApplied = useCallback((id: string) => applied.includes(id), [applied]);
  const applyTrigger = useCallback((id: string) => dispatch(applyTriggerAction(id)), [dispatch]);
  const snoozeTrigger = useCallback((id: string) => dispatch(snoozeTriggerAction(id)), [dispatch]);
  const setLanguage = useCallback((code: string) => dispatch(setLanguageAction(code)), [dispatch]);
  const setChannel = useCallback((c: string) => dispatch(setChannelAction(c)), [dispatch]);
  const setNotificationsOn = useCallback(
    (v: boolean) => dispatch(setNotificationsOnAction(v)),
    [dispatch],
  );
  const setTimeframe = useCallback((t: string) => dispatch(setTimeframeAction(t)), [dispatch]);
  const markNotificationsRead = useCallback(
    () => dispatch(markNotificationsReadAction()),
    [dispatch],
  );

  const setConversation = useCallback(
    (updater: (prev: CoachMsg[]) => CoachMsg[]) => {
      dispatch(setConversationAction(updater(conversation)));
    },
    [dispatch, conversation],
  );

  const dismissIntro = useCallback(() => dispatch(dismissIntroAction()), [dispatch]);
  const startTour = useCallback(() => dispatch(startTourAction()), [dispatch]);
  const setTourStep = useCallback((n: number) => dispatch(setTourStepAction(n)), [dispatch]);
  const endTour = useCallback(() => dispatch(endTourAction()), [dispatch]);

  const resetAll = useCallback(() => {
    dispatch(resetSpotlights());
    dispatch(resetPreferences());
    dispatch(resetNotifications());
    dispatch(clearConversation());
    dispatch(resetTour());
    dispatch(dismissIntroAction());
  }, [dispatch]);

  return {
    applied,
    snoozed,
    language,
    channel,
    notificationsOn,
    timeframe,
    notifications,
    notificationsRead,
    conversation,
    seenIntro,
    tourStep,
    moneyFound,
    wellness,
    highPriorityCount,
    isApplied,
    applyTrigger,
    snoozeTrigger,
    setLanguage,
    setChannel,
    setNotificationsOn,
    setTimeframe,
    markNotificationsRead,
    setConversation,
    dismissIntro,
    startTour,
    setTourStep,
    endTour,
    resetAll,
  };
}

/**
 * Pass-through wrapper for legacy provider references.
 */
export function DemoStateProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

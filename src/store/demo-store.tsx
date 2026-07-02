import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { rohan } from "@/data/rohan";
import { seedNotifications, type NotificationItem } from "@/data/agentic";

// Spotlights whose rupee value rolls up into the headline "money found" number.
// Keeps the hero figure at ₹1,17,000 to match the blueprint.
const FOUND_IDS = ["fd", "travel-card", "home-loan"];
const BASE_WELLNESS = 81;

export interface CoachMsg {
  who: "user" | "bot";
  text?: string;
  // CoachAnswer is structurally typed where consumed; keep loose here.
  answer?: unknown;
}

interface DemoState {
  applied: string[];
  snoozed: string[];
  language: string; // code
  channel: string;
  notificationsOn: boolean;
  timeframe: string; // "3M" | "6M" | "12M"
  notifications: NotificationItem[];
  notificationsRead: boolean;
  conversation: CoachMsg[];
  seenIntro: boolean;
  tourStep: number; // -1 = inactive
}

interface DemoContextValue extends DemoState {
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

const defaultState: DemoState = {
  applied: [],
  snoozed: [],
  language: "en",
  channel: "WhatsApp",
  notificationsOn: true,
  timeframe: "12M",
  notifications: seedNotifications,
  notificationsRead: false,
  conversation: [],
  seenIntro: false,
  tourStep: -1,
};

const STORAGE_KEY = "spotlite-demo";

const DemoContext = createContext<DemoContextValue | null>(null);

function loadInitial(): DemoState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  // Render defaults on the server and the first client paint to avoid hydration
  // mismatch, then hydrate from sessionStorage on mount.
  const [state, setState] = useState<DemoState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / privacy errors */
    }
  }, [state, hydrated]);

  const patch = useCallback((p: Partial<DemoState>) => setState((s) => ({ ...s, ...p })), []);

  const value = useMemo<DemoContextValue>(() => {
    const moneyFound = rohan.spotlights
      .filter((t) => FOUND_IDS.includes(t.id) && !state.applied.includes(t.id))
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const wellness = Math.min(92, BASE_WELLNESS + state.applied.length * 2);

    const highPriorityCount = rohan.spotlights.filter(
      (t) =>
        t.severity === "high" && !state.applied.includes(t.id) && !state.snoozed.includes(t.id),
    ).length;

    return {
      ...state,
      moneyFound,
      wellness,
      highPriorityCount,
      isApplied: (id) => state.applied.includes(id),
      applyTrigger: (id) =>
        setState((s) => (s.applied.includes(id) ? s : { ...s, applied: [...s.applied, id] })),
      snoozeTrigger: (id) =>
        setState((s) => (s.snoozed.includes(id) ? s : { ...s, snoozed: [...s.snoozed, id] })),
      setLanguage: (code) => patch({ language: code }),
      setChannel: (c) => patch({ channel: c }),
      setNotificationsOn: (v) => patch({ notificationsOn: v }),
      setTimeframe: (t) => patch({ timeframe: t }),
      markNotificationsRead: () => patch({ notificationsRead: true }),
      setConversation: (updater) =>
        setState((s) => ({ ...s, conversation: updater(s.conversation) })),
      dismissIntro: () => patch({ seenIntro: true }),
      startTour: () => patch({ tourStep: 0, seenIntro: true }),
      setTourStep: (n) => patch({ tourStep: n }),
      endTour: () => patch({ tourStep: -1 }),
      resetAll: () => setState({ ...defaultState, seenIntro: true }),
    };
  }, [state, patch]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoStateProvider");
  return ctx;
}

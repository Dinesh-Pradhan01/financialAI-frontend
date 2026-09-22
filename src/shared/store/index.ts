import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import spotlightsReducer from "./slices/spotlightsSlice";
import preferencesReducer from "./slices/preferencesSlice";
import notificationsReducer from "./slices/notificationsSlice";
import coachReducer from "./slices/coachSlice";
import tourReducer from "./slices/tourSlice";
import hrReducer from "./slices/hrSlice";
import cfoReducer from "./slices/cfoSlice";

const createSessionStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem(_key: string) {
        return Promise.resolve(null);
      },
      setItem(_key: string, _value: string) {
        return Promise.resolve();
      },
      removeItem(_key: string) {
        return Promise.resolve();
      },
    };
  }

  return {
    getItem(key: string) {
      try {
        return Promise.resolve(window.sessionStorage.getItem(key));
      } catch {
        return Promise.resolve(null);
      }
    },
    setItem(key: string, value: string) {
      try {
        window.sessionStorage.setItem(key, value);
        return Promise.resolve();
      } catch {
        return Promise.resolve();
      }
    },
    removeItem(key: string) {
      try {
        window.sessionStorage.removeItem(key);
        return Promise.resolve();
      } catch {
        return Promise.resolve();
      }
    },
  };
};

const storage = createSessionStorage();

import localforage from "localforage";

// SSR-safe localforage wrapper: localforage requires browser globals (IndexedDB/localStorage).
// During SSR window is undefined, so we return a no-op storage in that case.
const hrStorage =
  typeof window !== "undefined"
    ? localforage
    : {
        getItem: (_key: string) => Promise.resolve(null),
        setItem: (_key: string, _value: any) => Promise.resolve(),
        removeItem: (_key: string) => Promise.resolve(),
      };

const hrPersistConfig = {
  key: "hr",
  version: 3, // bump version to migrate from old sessionStorage entries
  storage: hrStorage,
};

const cfoStorage =
  typeof window !== "undefined"
    ? {
        async getItem(key: string) {
          const value = await localforage.getItem<string>(key);
          if (value) return value;
          // Migration fallback: do not drop persisted vendor drafts users may have in progress under hr
          try {
            const hrRaw = await localforage.getItem<any>("hr");
            if (hrRaw) {
              const parsed = typeof hrRaw === "string" ? JSON.parse(hrRaw) : hrRaw;
              const vendorPart = parsed?.vendor
                ? typeof parsed.vendor === "string"
                  ? JSON.parse(parsed.vendor)
                  : parsed.vendor
                : null;
              if (vendorPart && (vendorPart.backendPreview || vendorPart.step === "preview")) {
                return JSON.stringify({
                  vendor: vendorPart,
                  _persist: { version: 1, rehydrated: true },
                });
              }
            }
          } catch {
            // Ignore error
          }
          return null;
        },
        setItem: (key: string, value: any) => localforage.setItem(key, value),
        removeItem: (key: string) => localforage.removeItem(key),
      }
    : {
        getItem: (_key: string) => Promise.resolve(null),
        setItem: (_key: string, _value: any) => Promise.resolve(),
        removeItem: (_key: string) => Promise.resolve(),
      };

const cfoPersistConfig = {
  key: "cfo",
  version: 2,
  storage: cfoStorage,
  migrate: (state: any) => {
    if (state) {
      if (state.vendor && !state.vendor.agreements) {
        state.vendor.agreements = {};
      }
      if (state.client && !state.client.agreements) {
        state.client.agreements = {};
      }
    }
    return Promise.resolve(state);
  },
};

const rootReducer = combineReducers({
  spotlights: spotlightsReducer,
  preferences: preferencesReducer,
  notifications: notificationsReducer,
  coach: coachReducer,
  tour: tourReducer,
  hr: persistReducer(hrPersistConfig, hrReducer),
  cfo: persistReducer(cfoPersistConfig, cfoReducer),
});

const persistConfig = {
  key: "spotlite-rtk",
  version: 1,
  storage,
  whitelist: ["spotlights", "preferences", "notifications", "coach", "tour"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

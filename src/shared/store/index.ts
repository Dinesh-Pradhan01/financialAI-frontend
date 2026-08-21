import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
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

const rootReducer = combineReducers({
  spotlights: spotlightsReducer,
  preferences: preferencesReducer,
  notifications: notificationsReducer,
  coach: coachReducer,
  tour: tourReducer,
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

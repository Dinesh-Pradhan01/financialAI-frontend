import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/shared/firebase/firebase";
import {
  loginWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  logoutUser,
  resetUserPassword,
  resendVerification,
  getIdToken,
  waitForAuth,
} from "@/shared/firebase/auth";
import { api } from "@/shared/lib/api";

import type { UserResponse } from "@/shared/types/api";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BackendUser = UserResponse;

export interface AuthSnapshot {
  user: UserResponse | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
}

let currentAuthSnapshot: AuthSnapshot = {
  user: null,
  firebaseUser: null,
  loading: true,
};

export function getAuthSnapshot(): AuthSnapshot {
  return currentAuthSnapshot;
}

interface AuthContextValue {
  /** The Firebase User object, or null when signed out. */
  firebaseUser: FirebaseUser | null;
  /** The synchronized Backend User object, or null when signed out. */
  user: UserResponse | null;
  /** True while the initial auth state is being resolved. */
  loading: boolean;
  /** Sign in with email + password. */
  login: (email: string, password: string) => Promise<void>;
  /** Sign in with Google Popup. */
  loginWithGoogle: () => Promise<UserResponse>;
  /** Create account + send verification email. */
  signup: (email: string, password: string) => Promise<void>;
  /** Sign out and clear in-memory state. */
  logout: () => Promise<void>;
  /** Send a password-reset email. */
  resetPassword: (email: string) => Promise<void>;
  /** Re-send the verification email to the current user. */
  resendVerificationEmail: () => Promise<void>;
  /** Get a fresh Firebase ID token (auto-refreshes). Returns null when signed out. */
  getToken: () => Promise<string | null>;
  /** Fetch fresh backend user profile details. */
  refreshUser: () => Promise<void>;
  /** Force sync of the Firebase user with the backend, returning the backend user. */
  sync: () => Promise<UserResponse | null>;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Synchronize snapshot for sync getters
  useEffect(() => {
    currentAuthSnapshot = { user, firebaseUser, loading };
  }, [user, firebaseUser, loading]);

  // A ref to track the active sync promise to avoid concurrent redundant requests
  const syncPromiseRef = useRef<Promise<UserResponse> | null>(null);

  const syncUserWithBackend = useCallback(async (fbUser: FirebaseUser): Promise<UserResponse> => {
    if (syncPromiseRef.current) {
      return syncPromiseRef.current;
    }

    const promise = (async () => {
      // Get fresh token directly from the resolved Firebase user object
      const token = await fbUser.getIdToken();
      const backendUser = await api.post<UserResponse>("/api/auth/sync", undefined, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        useFirebaseToken: false,
      });
      setUser(backendUser);
      setFirebaseUser(fbUser);
      currentAuthSnapshot = { user: backendUser, firebaseUser: fbUser, loading: false };
      return backendUser;
    })();

    syncPromiseRef.current = promise;

    try {
      return await promise;
    } finally {
      syncPromiseRef.current = null;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Two-Phase Auth Initialization:
  // Phase 1: Wait for Firebase IndexedDB restoration via authStateReady().
  // Phase 2: If user exists, sync backend user BEFORE releasing loading state.
  // Phase 3: Subscribe onAuthStateChanged for subsequent runtime events only.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        if (typeof auth.authStateReady === "function") {
          await auth.authStateReady();
        }

        const fbUser = auth.currentUser;
        if (!isMounted) return;

        if (fbUser) {
          setFirebaseUser(fbUser);
          try {
            await syncUserWithBackend(fbUser);
          } catch (syncErr) {
            console.error("Backend auth sync failed during init:", syncErr);
            if (isMounted) {
              setUser(null);
            }
          }
        } else {
          setFirebaseUser(null);
          setUser(null);
          currentAuthSnapshot = { user: null, firebaseUser: null, loading: false };
        }
      } catch (err) {
        console.error("Error during authStateReady initialization:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // Runtime listener for explicit user actions (login, logout, token changes)
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!isMounted) return;

      // If user logs out at runtime
      if (!fbUser) {
        setFirebaseUser(null);
        setUser(null);
        currentAuthSnapshot = { user: null, firebaseUser: null, loading: false };
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [syncUserWithBackend]);

  // ---- Stable callbacks ----

  const login = useCallback(
    async (email: string, password: string) => {
      const fbUser = await loginWithEmail(email, password);
      setFirebaseUser(fbUser);
      await syncUserWithBackend(fbUser);
    },
    [syncUserWithBackend],
  );

  const loginWithGoogle = useCallback(async (): Promise<UserResponse> => {
    const fbUser = await signInWithGoogle();
    setFirebaseUser(fbUser);
    const token = await fbUser.getIdToken();

    // 1. Call POST /api/auth/google with { token } in the body
    await api.post<{ status: string; uid: string; email: string }>("/api/auth/google", {
      token,
    });

    // 2. Immediately follow with GET /api/auth/me to get the actual UserResponse
    const backendUser = await api.get<UserResponse>("/api/auth/me");
    setUser(backendUser);
    currentAuthSnapshot = { user: backendUser, firebaseUser: fbUser, loading: false };
    return backendUser;
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    const fbUser = await signUpWithEmail(email, password);
    setFirebaseUser(fbUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout", undefined, { useFirebaseToken: false });
    } catch (e) {
      console.warn("Backend logout failed:", e);
    } finally {
      await logoutUser();
      setUser(null);
      setFirebaseUser(null);
      currentAuthSnapshot = { user: null, firebaseUser: null, loading: false };
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await resetUserPassword(email);
  }, []);

  const resendVerificationEmail = useCallback(async () => {
    await resendVerification();
  }, []);

  const getToken = useCallback(async () => {
    return getIdToken(/* forceRefresh */ false);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const backendUser = await api.get<UserResponse>("/api/auth/me");
      setUser(backendUser);
      currentAuthSnapshot = { user: backendUser, firebaseUser: auth.currentUser, loading: false };
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, []);

  const sync = useCallback(async () => {
    const fbUser = auth.currentUser ?? (await waitForAuth());
    if (fbUser) {
      return await syncUserWithBackend(fbUser);
    }
    return null;
  }, [syncUserWithBackend]);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        user,
        loading,
        login,
        loginWithGoogle,
        signup,
        logout,
        resetPassword,
        resendVerificationEmail,
        getToken,
        refreshUser,
        sync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the auth context. Must be used inside <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

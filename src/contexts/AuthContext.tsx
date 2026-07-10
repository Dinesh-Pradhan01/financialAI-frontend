import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  loginWithEmail,
  signUpWithEmail,
  logoutUser,
  resetUserPassword,
  resendVerification,
  getIdToken,
} from "../firebase/auth";
import { api } from "../lib/api";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BackendUser {
  id: number;
  email: string;
  role: string;
  email_verified: boolean;
  person_id?: string;
  profile_completed?: boolean;
}

interface AuthContextValue {
  /** The Firebase User object, or null when signed out. */
  firebaseUser: FirebaseUser | null;
  /** The synchronized Backend User object, or null when signed out. */
  user: BackendUser | null;
  /** True while the initial auth state is being resolved. */
  loading: boolean;
  /** Sign in with email + password. */
  login: (email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync Firebase auth state with the backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      
      if (fbUser) {
        try {
          // Call sync to ensure user exists in DB and get the secure session cookie
          const backendUser = await api.post<BackendUser>(
            "/api/auth/sync",
            undefined,
            { useFirebaseToken: true }
          );
          setUser(backendUser);
        } catch (error) {
          console.error("Failed to sync auth with backend:", error);
          setUser(null);
          // Optionally, sign out from Firebase if backend sync fails securely
          // await logoutUser();
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  // ---- Stable callbacks (memoised so downstream consumers don't re-render) ----

  const login = useCallback(async (email: string, password: string) => {
    await loginWithEmail(email, password);
    // onAuthStateChanged will handle the backend sync automatically
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    await signUpWithEmail(email, password);
  }, []);

  const logout = useCallback(async () => {
    try {
      // First, revoke backend session
      await api.post("/api/auth/logout", undefined, { useFirebaseToken: false });
    } catch (e) {
      console.warn("Backend logout failed:", e);
    }
    // Then clear Firebase auth state
    await logoutUser();
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
      const backendUser = await api.get<BackendUser>("/api/auth/me");
      setUser(backendUser);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        resendVerificationEmail,
        getToken,
        refreshUser,
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

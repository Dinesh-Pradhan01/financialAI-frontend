import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  loginWithEmail,
  signUpWithEmail,
  logoutUser,
  resetUserPassword,
  resendVerification,
  getIdToken,
} from "../firebase/auth";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthContextValue {
  /** The Firebase User object, or null when signed out. */
  user: User | null;
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
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes (login / logout / token refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ---- Stable callbacks (memoised so downstream consumers don't re-render) ----

  const login = useCallback(async (email: string, password: string) => {
    await loginWithEmail(email, password);
    // onAuthStateChanged will update `user` automatically
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    await signUpWithEmail(email, password);
  }, []);

  const logout = useCallback(async () => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        resendVerificationEmail,
        getToken,
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

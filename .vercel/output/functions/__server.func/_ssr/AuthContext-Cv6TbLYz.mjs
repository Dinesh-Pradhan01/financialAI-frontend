import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { n as auth } from "./firebase-pUuzlwRE.mjs";
import { a as loginWithEmail, c as resetUserPassword, d as waitForAuth, i as getIdToken, l as signInWithGoogle, n as api, o as logoutUser, s as resendVerification, u as signUpWithEmail } from "./api-XLUwYDya.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-Cv6TbLYz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var currentAuthSnapshot = {
	user: null,
	firebaseUser: null,
	loading: true
};
function getAuthSnapshot() {
	return currentAuthSnapshot;
}
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [firebaseUser, setFirebaseUser] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		currentAuthSnapshot = {
			user,
			firebaseUser,
			loading
		};
	}, [
		user,
		firebaseUser,
		loading
	]);
	const syncPromiseRef = (0, import_react.useRef)(null);
	const syncUserWithBackend = (0, import_react.useCallback)(async (fbUser) => {
		if (syncPromiseRef.current) return syncPromiseRef.current;
		const promise = (async () => {
			await fbUser.getIdToken(true);
			const backendUser = await api.post("/api/auth/sync");
			setUser(backendUser);
			setFirebaseUser(fbUser);
			currentAuthSnapshot = {
				user: backendUser,
				firebaseUser: fbUser,
				loading: false
			};
			return backendUser;
		})();
		syncPromiseRef.current = promise;
		try {
			return await promise;
		} finally {
			syncPromiseRef.current = null;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		async function initializeAuth() {
			try {
				if (typeof auth.authStateReady === "function") await auth.authStateReady();
				const fbUser = auth.currentUser;
				if (!isMounted) return;
				if (fbUser) {
					setFirebaseUser(fbUser);
					try {
						await syncUserWithBackend(fbUser);
					} catch (syncErr) {
						console.error("Backend auth sync failed during init:", syncErr);
						if (isMounted) setUser(null);
					}
				} else {
					setFirebaseUser(null);
					setUser(null);
					currentAuthSnapshot = {
						user: null,
						firebaseUser: null,
						loading: false
					};
				}
			} catch (err) {
				console.error("Error during authStateReady initialization:", err);
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		initializeAuth();
		const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
			if (!isMounted) return;
			if (!fbUser) {
				setFirebaseUser(null);
				setUser(null);
				currentAuthSnapshot = {
					user: null,
					firebaseUser: null,
					loading: false
				};
			}
		});
		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, [syncUserWithBackend]);
	const login = (0, import_react.useCallback)(async (email, password) => {
		const fbUser = await loginWithEmail(email, password);
		setFirebaseUser(fbUser);
		await syncUserWithBackend(fbUser);
	}, [syncUserWithBackend]);
	const loginWithGoogle = (0, import_react.useCallback)(async () => {
		const fbUser = await signInWithGoogle();
		setFirebaseUser(fbUser);
		const token = await fbUser.getIdToken();
		await api.post("/api/auth/google", { token });
		const backendUser = await api.get("/api/auth/me");
		setUser(backendUser);
		currentAuthSnapshot = {
			user: backendUser,
			firebaseUser: fbUser,
			loading: false
		};
		return backendUser;
	}, []);
	const signup = (0, import_react.useCallback)(async (email, password) => {
		setFirebaseUser(await signUpWithEmail(email, password));
	}, []);
	const logout = (0, import_react.useCallback)(async () => {
		try {
			await api.post("/api/auth/logout", void 0, { useFirebaseToken: false });
		} catch (e) {
			console.warn("Backend logout failed:", e);
		} finally {
			await logoutUser();
			setUser(null);
			setFirebaseUser(null);
			currentAuthSnapshot = {
				user: null,
				firebaseUser: null,
				loading: false
			};
		}
	}, []);
	const resetPassword = (0, import_react.useCallback)(async (email) => {
		await resetUserPassword(email);
	}, []);
	const resendVerificationEmail = (0, import_react.useCallback)(async () => {
		await resendVerification();
	}, []);
	const getToken = (0, import_react.useCallback)(async () => {
		return getIdToken(false);
	}, []);
	const refreshUser = (0, import_react.useCallback)(async () => {
		try {
			const backendUser = await api.get("/api/auth/me");
			setUser(backendUser);
			currentAuthSnapshot = {
				user: backendUser,
				firebaseUser: auth.currentUser,
				loading: false
			};
		} catch (error) {
			console.error("Failed to refresh user:", error);
		}
	}, []);
	const sync = (0, import_react.useCallback)(async () => {
		const fbUser = auth.currentUser ?? await waitForAuth();
		if (fbUser) return await syncUserWithBackend(fbUser);
		return null;
	}, [syncUserWithBackend]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
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
			sync
		},
		children
	});
}
/**
* Access the auth context. Must be used inside <AuthProvider>.
*/
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (ctx === void 0) throw new Error("useAuth must be used within an <AuthProvider>");
	return ctx;
}
//#endregion
export { getAuthSnapshot as n, useAuth as r, AuthProvider as t };

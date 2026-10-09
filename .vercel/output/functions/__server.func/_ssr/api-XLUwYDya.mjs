import { r as __exportAll } from "../_runtime.mjs";
import { a as sendEmailVerification, c as signInWithPopup, l as signOut, n as createUserWithEmailAndPassword, o as sendPasswordResetEmail, s as signInWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { i as googleProvider, n as auth, t as __exportAll$1 } from "./firebase-pUuzlwRE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-XLUwYDya.js
var api_XLUwYDya_exports = /* @__PURE__ */ __exportAll({
	a: () => loginWithEmail,
	c: () => resetUserPassword,
	d: () => waitForAuth,
	i: () => getIdToken,
	l: () => signInWithGoogle,
	n: () => api,
	o: () => logoutUser,
	r: () => api_exports,
	s: () => resendVerification,
	t: () => API_BASE_URL,
	u: () => signUpWithEmail
});
/**
* Wait for Firebase Auth persistence to restore credentials from IndexedDB.
* Uses the official auth.authStateReady() API when available.
*/
async function waitForAuth() {
	if (typeof auth.authStateReady === "function") {
		await auth.authStateReady();
		return auth.currentUser;
	}
	if (auth.currentUser) return auth.currentUser;
	return new Promise((resolve) => {
		let timer;
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (timer) clearTimeout(timer);
			unsubscribe();
			resolve(user);
		});
		timer = setTimeout(() => {
			unsubscribe();
			resolve(auth.currentUser);
		}, 4e3);
	});
}
/**
* Sign in with Google Popup.
* Returns the Firebase User object.
*/
async function signInWithGoogle() {
	return (await signInWithPopup(auth, googleProvider)).user;
}
/**
* Create a new user with email/password and immediately send a verification email.
* Returns the Firebase User object.
*/
async function signUpWithEmail(email, password) {
	const credential = await createUserWithEmailAndPassword(auth, email, password);
	await sendEmailVerification(credential.user);
	return credential.user;
}
/**
* Sign in an existing user with email/password.
* Returns the Firebase User object.
*/
async function loginWithEmail(email, password) {
	return (await signInWithEmailAndPassword(auth, email, password)).user;
}
/**
* Sign out the current user. Clears all in-memory auth state.
*/
async function logoutUser() {
	await signOut(auth);
}
/**
* Send a password reset email to the given address.
* Does not reveal whether the email exists (Firebase default behavior).
*/
async function resetUserPassword(email) {
	await sendPasswordResetEmail(auth, email);
}
/**
* Re-send the verification email to the currently signed-in user.
* Throws if no user is signed in.
*/
async function resendVerification() {
	const user = auth.currentUser ?? await waitForAuth();
	if (!user) throw new Error("No authenticated user to send verification email to.");
	await sendEmailVerification(user);
}
/**
* Get a fresh Firebase ID token for the current user.
* Automatically refreshes if the token is expired.
* Returns null if no user is signed in.
*/
async function getIdToken(forceRefresh = false) {
	if (typeof auth.authStateReady === "function") await auth.authStateReady();
	const user = auth.currentUser;
	if (!user) return null;
	return user.getIdToken(forceRefresh);
}
var api_exports = /* @__PURE__ */ __exportAll$1({
	API_BASE_URL: () => API_BASE_URL,
	api: () => api,
	fetchAPI: () => fetchAPI
});
var API_BASE_URL = "https://financialai-backend-production.up.railway.app".replace(/\/+$/, "");
/**
* Authenticated fetch wrapper.
*
* - Automatically sends cookies with `credentials: "include"`
* - Parses JSON responses
* - Throws on non-2xx responses with the server error detail
*/
async function fetchAPI(path, options = {}) {
	const { headers: extraHeaders = {}, useFirebaseToken, ...init } = options;
	const headers = {
		"Content-Type": "application/json",
		...extraHeaders
	};
	if (useFirebaseToken !== false && !headers["Authorization"]) {
		const token = await getIdToken(false);
		if (token) headers["Authorization"] = `Bearer ${token}`;
	}
	const url = `${API_BASE_URL}${path}`;
	const response = await fetch(url, {
		credentials: "include",
		...init,
		headers
	});
	if (response.status === 204) return;
	const body = await response.json().catch(() => null);
	if (!response.ok) {
		const detail = body?.detail ?? body?.message;
		const message = typeof detail === "string" ? detail : detail ? JSON.stringify(detail) : `API error ${response.status}`;
		const error = new Error(message);
		error.status = response.status;
		error.detail = detail;
		error.data = body;
		throw error;
	}
	return body;
}
var api = {
	get: (path, opts) => fetchAPI(path, {
		...opts,
		method: "GET"
	}),
	post: (path, data, opts) => fetchAPI(path, {
		...opts,
		method: "POST",
		body: data != null ? JSON.stringify(data) : void 0
	}),
	put: (path, data, opts) => fetchAPI(path, {
		...opts,
		method: "PUT",
		body: data != null ? JSON.stringify(data) : void 0
	}),
	patch: (path, data, opts) => fetchAPI(path, {
		...opts,
		method: "PATCH",
		body: data != null ? JSON.stringify(data) : void 0
	}),
	delete: (path, opts) => fetchAPI(path, {
		...opts,
		method: "DELETE"
	}),
	/**
	* Upload a file as multipart/form-data.
	* Does NOT set Content-Type (browser sets it with boundary automatically).
	*/
	upload: async (path, formData, method = "POST", opts) => {
		const url = `${API_BASE_URL}${path}`;
		let timeoutSignal;
		if (opts?.timeoutMs && typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) timeoutSignal = AbortSignal.timeout(opts.timeoutMs);
		const signal = opts?.signal ?? timeoutSignal;
		const uploadHeaders = {};
		const token = await getIdToken(false);
		if (token) uploadHeaders["Authorization"] = `Bearer ${token}`;
		const response = await fetch(url, {
			method,
			credentials: "include",
			headers: uploadHeaders,
			body: formData,
			signal
		});
		if (response.status === 204) return void 0;
		const body = await response.json().catch(() => null);
		if (!response.ok) {
			const detail = body?.detail ?? body?.message;
			const message = typeof detail === "string" ? detail : detail ? JSON.stringify(detail) : `API error ${response.status}`;
			const error = new Error(message);
			error.status = response.status;
			error.detail = detail;
			error.data = body;
			throw error;
		}
		return body;
	},
	/**
	* Download a binary/blob file from the server.
	*/
	download: async (path) => {
		const url = `${API_BASE_URL}${path}`;
		const dlHeaders = {};
		const token = await getIdToken(false);
		if (token) dlHeaders["Authorization"] = `Bearer ${token}`;
		const response = await fetch(url, {
			method: "GET",
			credentials: "include",
			headers: dlHeaders
		});
		if (!response.ok) {
			const body = await response.json().catch(() => null);
			const detail = body?.detail ?? body?.message;
			const message = typeof detail === "string" ? detail : detail ? JSON.stringify(detail) : `API error ${response.status}`;
			const error = new Error(message);
			error.status = response.status;
			error.detail = detail;
			error.data = body;
			throw error;
		}
		return response.blob();
	}
};
//#endregion
export { loginWithEmail as a, resetUserPassword as c, waitForAuth as d, getIdToken as i, signInWithGoogle as l, api as n, logoutUser as o, api_XLUwYDya_exports as r, resendVerification as s, API_BASE_URL as t, signUpWithEmail as u };

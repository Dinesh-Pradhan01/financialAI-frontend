import { r as __exportAll$1 } from "../_runtime.mjs";
import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { r as getAuth, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-pUuzlwRE.js
var firebase_pUuzlwRE_exports = /* @__PURE__ */ __exportAll$1({
	i: () => __exportAll,
	n: () => firebase_exports,
	r: () => googleProvider,
	t: () => auth
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var firebase_exports = /* @__PURE__ */ __exportAll({
	app: () => app,
	auth: () => auth,
	googleProvider: () => googleProvider
});
var app = initializeApp({
	apiKey: "AIzaSyBvjhl-FIzRV-5prBcbO-UGMUGT4QXjEsI",
	authDomain: "fincai-8df54.firebaseapp.com",
	projectId: "fincai-8df54",
	appId: "1:17037110398:web:8569bc95162be269b2bc2f"
});
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
//#endregion
export { googleProvider as i, auth as n, firebase_pUuzlwRE_exports as r, __exportAll as t };

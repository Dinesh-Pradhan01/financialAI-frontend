import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Kn as ArrowLeft, R as ShieldCheck } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as setConsent, Q as useAppSelector, Z as useAppDispatch } from "./store-i6pKH_iX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consent-CWZeHuIV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Consent() {
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const savedConsent = useAppSelector((state) => state.preferences.consent);
	const [read, setRead] = (0, import_react.useState)(savedConsent?.read ?? true);
	const [detect, setDetect] = (0, import_react.useState)(savedConsent?.detect ?? true);
	const [offers, setOffers] = (0, import_react.useState)(savedConsent?.offers ?? false);
	(0, import_react.useEffect)(() => {
		if (savedConsent) {
			setRead(savedConsent.read);
			setDetect(savedConsent.detect);
			setOffers(savedConsent.offers);
		}
	}, [savedConsent]);
	const ready = read && detect;
	const handleAgree = () => {
		dispatch(setConsent({
			read,
			detect,
			offers
		}));
		nav({ to: "/upload" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen max-w-xl flex-col px-6 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/login",
				className: "flex items-center gap-2 text-sm text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl font-bold",
				children: "Your data, your rules"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-text-secondary",
				children: "To find money you're missing, Spotlite needs to read your bank statements. Here's the deal:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentRow, {
						checked: read,
						setChecked: (val) => {
							setRead(val);
							dispatch(setConsent({ read: val }));
						},
						title: "Read transactions to build my insights",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentRow, {
						checked: detect,
						setChecked: (val) => {
							setDetect(val);
							dispatch(setConsent({ detect: val }));
						},
						title: "Detect opportunities & life events",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentRow, {
						checked: offers,
						setChecked: (val) => {
							setOffers(val);
							dispatch(setConsent({ offers: val }));
						},
						title: "Allow SBI to send me matched offers"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl bg-surface-alt p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-success" }), " Our promise"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 space-y-1 text-text-secondary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We never sell your data" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You can delete everything anytime" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Powered by RBI Account Aggregator (Phase 2)" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-text-secondary",
				children: ["Read the full ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "underline",
					children: "privacy policy ▸"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: !ready,
					onClick: handleAgree,
					className: "w-full rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-40 cursor-pointer",
					children: "I Agree & Continue"
				})
			})
		]
	});
}
function ConsentRow({ checked, setChecked, title, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => setChecked(e.target.checked),
			className: "mt-0.5 h-5 w-5 accent-[oklch(0.31_0.16_273)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-text-secondary",
			children: required ? "Required" : "Optional, off by default"
		})] })]
	});
}
//#endregion
export { Consent as component };

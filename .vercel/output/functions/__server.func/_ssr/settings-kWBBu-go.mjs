import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Ct as Lock, Pt as Globe, R as ShieldCheck, Rn as Bell, b as Trash2, gt as MessageCircle, o as Users, tn as Download, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { r as channels, s as languages } from "./agentic-C_EsON0v.mjs";
import { N as setLanguage, P as setNotificationsOn, Q as useAppSelector, S as setChannel, Z as useAppDispatch, _ as resetNotifications, b as resetTour, c as clearConversation, f as dismissIntro, v as resetPreferences, y as resetSpotlights } from "./store-i6pKH_iX.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { a as selectNotificationsOn, i as selectLanguage, t as selectChannel } from "./selectors-CqEsKQIY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useLogout } from "./useLogout-DedIdgpM.mjs";
import { i as isCeoOrAdmin } from "./roles-Cu-hhfHW.mjs";
import { n as Thumb, t as Root } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-kWBBu-go.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Root.displayName;
function Settings() {
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAuth();
	const { handleLogout, loggingOut } = useLogout();
	const language = useAppSelector(selectLanguage);
	const channel = useAppSelector(selectChannel);
	const notificationsOn = useAppSelector(selectNotificationsOn);
	const consent = useAppSelector((state) => state.preferences.consent);
	const permissionsEnabled = [
		consent?.read,
		consent?.detect,
		consent?.offers
	].filter(Boolean).length;
	const resetAll = () => {
		dispatch(resetSpotlights());
		dispatch(resetPreferences());
		dispatch(resetNotifications());
		dispatch(clearConversation());
		dispatch(resetTour());
		dispatch(dismissIntro());
	};
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const canManageTeam = isCeoOrAdmin(user?.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-5 py-6 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 font-display text-base font-semibold",
				children: "Preferences"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-spot mt-3 divide-y divide-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSelect, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }),
						label: "Language",
						value: language,
						options: languages.map((l) => ({
							value: l.code,
							label: l.label
						})),
						onChange: (v) => {
							dispatch(setLanguage(v));
							toast.success("Language updated", { description: languages.find((l) => l.code === v)?.label });
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), " Notifications"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: notificationsOn,
							onCheckedChange: (v) => {
								dispatch(setNotificationsOn(v));
								toast(v ? "Notifications on" : "Notifications off");
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSelect, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
						label: "Engagement channel",
						value: channel,
						options: channels.map((c) => ({
							value: c,
							label: c
						})),
						onChange: (v) => {
							dispatch(setChannel(v));
							toast.success("Channel updated", { description: `We'll reach you on ${v}` });
						}
					})
				]
			}),
			canManageTeam && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-8 flex items-center gap-2 font-display text-base font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-brand" }), " Executive Team & Roles"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-spot mt-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary mb-3",
					children: "As CEO/Admin, manage your executive leadership team, dispatch invitations, and oversee role-based permissions."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/team",
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Manage Team"]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-8 flex items-center gap-2 font-display text-base font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-success" }), " Trust Center"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-spot mt-3 divide-y divide-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
						label: "Connected banks",
						value: "3 ▸"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/consent",
						className: "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition hover:bg-surface-alt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-text-secondary" }), " Permissions & Consent"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-brand",
							children: [permissionsEnabled, " of 3 enabled ▸"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => toast.success("Export started", { description: "Your data pack (PDF + CSV) will download shortly." }),
						className: "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition hover:bg-surface-alt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download my data"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-text-secondary",
							children: "▸"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setConfirmDelete(true),
						className: "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-danger transition hover:bg-surface-alt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete my data"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "▸" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-text-secondary",
				children: "Spotlite is DPDP Act 2023 compliant. You can revoke consent or erase your data at any time."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleLogout,
					disabled: loggingOut,
					className: "inline-flex items-center justify-center gap-2 text-sm font-semibold text-destructive hover:underline cursor-pointer disabled:opacity-60",
					children: [loggingOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), loggingOut ? "Signing out of SpotLite…" : "Sign out of SpotLite"]
				})
			}),
			confirmDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-55 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/45",
					onClick: () => setConfirmDelete(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-e2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/12 text-danger",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-bold",
							children: "Delete all your data?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-text-secondary",
							children: "This erases your financial graph, scores and applied products from this demo session. This can't be undone."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmDelete(false),
								className: "flex-1 rounded-pill border border-border py-2.5 text-sm font-semibold hover:bg-surface-alt",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									resetAll();
									setConfirmDelete(false);
									toast.success("Data deleted", { description: "Your demo session has been reset." });
									nav({ to: "/" });
								},
								className: "flex-1 rounded-pill bg-danger py-2.5 text-sm font-semibold text-white",
								children: "Delete"
							})]
						})
					]
				})]
			})
		]
	});
}
function Row({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 px-4 py-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-3",
			children: [
				icon,
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-text-secondary",
			children: value
		})]
	});
}
function RowSelect({ icon, label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 px-4 py-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-3",
			children: [
				icon,
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "rounded-pill border border-border bg-surface px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.value,
				children: o.label
			}, o.value))
		})]
	});
}
//#endregion
export { Settings as component };

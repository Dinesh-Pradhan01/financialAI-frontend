import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Gn as ArrowRight, H as Send, Jn as Activity, Kn as ArrowLeft, mn as CirclePlay, n as X } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as auth } from "./firebase-pUuzlwRE.mjs";
import { l as tourSteps, t as agentByKey } from "./agentic-C_EsON0v.mjs";
import { t as Provider_default } from "../_libs/react-redux+[...].mjs";
import { t as PersistGate } from "../_libs/redux-persist.mjs";
import { I as setTourStep, Q as useAppSelector, U as startTour, W as store, Z as useAppDispatch, f as dismissIntro, m as persistor, p as endTour, r as addMessage } from "./store-i6pKH_iX.mjs";
import { n as getAuthSnapshot, r as useAuth, t as AuthProvider } from "./AuthContext-Cv6TbLYz.mjs";
import { t as answerForQuestion } from "./rohan-BsoI7WdA.mjs";
import { c as selectTourStep, o as selectSeenIntro } from "./selectors-CqEsKQIY.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { a as numberType, c as unionType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { i as competitorsQueryOptions } from "./useCompanyFinancials-Df2wMmnb.mjs";
import { t as Route$35 } from "../_app.industry._companyId-BU1hDvJ2.mjs";
import { t as Route$36 } from "./accept-invite._token-BU1vWUlT.mjs";
import { t as Route$37 } from "./accept-invite.index-D7ScqbYu.mjs";
import { s as normalizeCategory } from "./categoryNormalizer-CSNT55UY.mjs";
import { t as Route$38 } from "./login-CNLQVDO6.mjs";
import { t as Route$39 } from "./verify-email-hx1aRK8L.mjs";
import { t as Route$40 } from "./spotlights._id-BGwZEte6.mjs";
import { t as Route$41 } from "./spending._category-_vx1l2jU.mjs";
import { t as Route$42 } from "./spotlights._id_.apply-CkFcC7dy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C5DXQ7Zp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Cpw_chP5.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var HIDDEN_ROUTES = [
	"/",
	"/login",
	"/consent",
	"/upload",
	"/processing"
];
var statuses = [
	"Watching your accounts for new signals…",
	"Re-scoring opportunities by confidence…",
	"Picking the best time to reach you…",
	"Learning from what you opened today…"
];
function SpotliteAgentDock() {
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const tourStep = useAppSelector(selectTourStep);
	const path = useRouterState({ select: (r) => r.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [statusIdx, setStatusIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const t = setInterval(() => setStatusIdx((i) => (i + 1) % statuses.length), 2600);
		return () => clearInterval(t);
	}, [open]);
	if (HIDDEN_ROUTES.includes(path) || tourStep >= 0) return null;
	function ask(question) {
		if (!question.trim()) return;
		dispatch(addMessage({
			who: "user",
			text: question
		}));
		dispatch(addMessage({
			who: "bot",
			answer: answerForQuestion(question)
		}));
		setQ("");
		setOpen(false);
		nav({ to: "/coach" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 12,
				scale: .96
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 12,
				scale: .96
			},
			transition: { duration: .2 },
			className: "w-[20rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border bg-surface shadow-e2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-brand px-4 py-3 text-on-brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Spotlite Agent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1 text-[11px] opacity-80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-300 pulse-dot" }), " always on"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						"aria-label": "Close",
						className: "rounded-full p-1 hover:bg-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface-alt p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-text-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3" }), " Doing now"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-sm",
							children: [statuses[statusIdx], /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-0.5 inline-flex gap-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "thinking-dot h-1 w-1 rounded-full bg-brand-secondary",
										style: { animationDelay: "0ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "thinking-dot h-1 w-1 rounded-full bg-brand-secondary",
										style: { animationDelay: "150ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "thinking-dot h-1 w-1 rounded-full bg-brand-secondary",
										style: { animationDelay: "300ms" }
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setOpen(false);
							dispatch(startTour());
						},
						className: "flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-2.5 text-sm font-semibold text-on-brand shadow-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }), " Start the 60-sec guided demo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && ask(q),
							placeholder: "Ask me about your money…",
							className: "flex-1 bg-transparent text-sm outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => ask(q),
							"aria-label": "Send",
							className: "rounded-full bg-brand-gradient p-1.5 text-on-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })
						})]
					})
				]
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			"aria-label": "Spotlite Agent",
			className: "agent-float relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-on-brand shadow-brand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-0 rounded-full pulse-dot",
				style: { boxShadow: "0 0 0 0 oklch(0.5 0.2 320 / 0.5)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6" })]
		})]
	});
}
var PHASES = [
	"Understand",
	"Reason",
	"Act",
	"Learn"
];
var ONBOARDING = [
	"/",
	"/login",
	"/signup",
	"/verify-email",
	"/consent",
	"/upload",
	"/processing"
];
function DemoTour() {
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const tourStep = useAppSelector(selectTourStep);
	const step = tourStep >= 0 && tourStep < tourSteps.length ? tourSteps[tourStep] : null;
	(0, import_react.useEffect)(() => {
		if (tourStep < 0 || tourStep >= tourSteps.length) return;
		const s = tourSteps[tourStep];
		nav({
			to: s.to,
			params: s.params
		});
	}, [tourStep]);
	if (!step) return null;
	const isFirst = tourStep === 0;
	const isLast = tourStep === tourSteps.length - 1;
	const agent = step.agent ? agentByKey(step.agent) : null;
	const AgentIcon = agent?.icon ?? Sparkles;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-60 flex items-end justify-center p-4 md:items-end md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[2px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .25 },
			className: "relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface shadow-e2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-brand px-5 py-4 text-on-brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentIcon, { className: "h-4.5 w-4.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: agent ? agent.label : "Spotlite"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] opacity-80",
								children: "Guided demo"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(endTour()),
						"aria-label": "Close tour",
						className: "rounded-full p-1 hover:bg-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex items-center gap-1.5",
					children: PHASES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 rounded-full ${p === step.phase ? "bg-white" : "bg-white/30"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-1 text-[9px] uppercase tracking-wide ${p === step.phase ? "opacity-100" : "opacity-60"}`,
							children: p
						})]
					}, p))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold text-balance",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-text-secondary",
						children: step.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-text-secondary",
							children: [
								"Step",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-num font-semibold text-text-primary",
									children: tourStep + 1
								}),
								" of",
								" ",
								tourSteps.length
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => dispatch(endTour()),
									className: "rounded-pill px-3 py-2 text-xs font-medium text-text-secondary hover:bg-surface-alt",
									children: "Skip"
								}),
								!isFirst && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => dispatch(setTourStep(tourStep - 1)),
									className: "inline-flex items-center gap-1 rounded-pill border border-border px-3 py-2 text-xs font-medium hover:bg-surface-alt",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => isLast ? dispatch(endTour()) : dispatch(setTourStep(tourStep + 1)),
									className: "inline-flex items-center gap-1 rounded-pill bg-brand-gradient px-4 py-2 text-xs font-semibold text-on-brand shadow-brand",
									children: [
										isLast ? "Finish" : "Next",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })
									]
								})
							]
						})]
					})
				]
			})]
		}, step.id)]
	}, "tour") });
}
function IntroModal() {
	const dispatch = useAppDispatch();
	const seenIntro = useAppSelector(selectSeenIntro);
	const tourStep = useAppSelector(selectTourStep);
	const { firebaseUser } = useAuth();
	const path = useRouterState({ select: (r) => r.location.pathname });
	const onAppRoute = !ONBOARDING.includes(path);
	let isNewUser = false;
	if (firebaseUser && firebaseUser.metadata.creationTime && firebaseUser.metadata.lastSignInTime) {
		const creationTime = new Date(firebaseUser.metadata.creationTime).getTime();
		const lastSignInTime = new Date(firebaseUser.metadata.lastSignInTime).getTime();
		isNewUser = Math.abs(lastSignInTime - creationTime) < 12e4;
	}
	if (!(!seenIntro && onAppRoute && tourStep < 0 && isNewUser)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-55 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/45 backdrop-blur-sm",
			onClick: () => dispatch(dismissIntro())
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 12
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			className: "relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-e2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-brand px-6 py-7 text-on-brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-2xl font-bold leading-tight text-balance",
					children: "Your bank sees its slice. Spotlite sees your whole financial life."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-text-secondary",
					children: [
						"Spotlite reads a year of statements across every bank. Its AI agents",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-text-primary",
							children: "understand, reason, act and learn"
						}),
						", then surface the money you're leaving on the table."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => dispatch(startTour()),
						className: "inline-flex items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }), " Take the 60-sec guided tour"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(dismissIntro()),
						className: "rounded-pill border border-border py-3 text-sm font-semibold hover:bg-surface-alt",
						children: "Explore on my own"
					})]
				})]
			})]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$34 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "Spotlite: Your money, finally understood" },
			{
				name: "description",
				content: "Spotlite is an agentic financial intelligence layer for SBI. Find the money you're leaving on the table."
			},
			{
				name: "author",
				content: "Spotlite"
			},
			{
				property: "og:title",
				content: "Spotlite: Your money, finally understood"
			},
			{
				property: "og:description",
				content: "Cross-bank insights, blind-spot detection, and an AI coach that speaks first."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "theme-color",
				content: "#1F2A7A"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Sora:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$34.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {
			loading: null,
			persistor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
				client: queryClient,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteAgentDock, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroModal, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTour, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
						richColors: true,
						position: "top-center"
					})
				] })
			})
		})
	});
}
var BASE_URL = "";
var Route$33 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{ path: "/login" },
			{ path: "/consent" },
			{ path: "/upload" },
			{ path: "/home" },
			{ path: "/profile" },
			{ path: "/spending" },
			{ path: "/spotlights" },
			{ path: "/coach" },
			{ path: "/wrapped" },
			{ path: "/settings" }
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$32 = () => import("../_app-Pfn1vaI-.mjs");
var Route$32 = createFileRoute("/_app")({
	beforeLoad: async ({ location }) => {
		if (typeof window === "undefined") return;
		const currentPath = location.href || location.pathname;
		const snapshot = getAuthSnapshot();
		if (!snapshot.loading) {
			if (!snapshot.user) throw redirect({
				to: "/login",
				search: { redirect: currentPath }
			});
			if (!(auth.currentUser ? auth.currentUser.emailVerified : snapshot.user.email_verified)) throw redirect({
				to: "/verify-email",
				search: { redirect: currentPath }
			});
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./(landing)-V4Lzoy37.mjs");
var Route$31 = createFileRoute("/(landing)/")({
	head: () => ({ meta: [{ title: "SpotLite: Workforce & Financial Intelligence" }, {
		name: "description",
		content: "Your business leaves signals. SpotLite connects them. SpotLite brings together your company’s financial, workforce, and market data turning scattered signals into clear insights, benchmarks, and alerts that help leadership understand what’s happening and make better decisions, faster."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("../_app.industry-4Mhhs8U2.mjs");
var industrySearchSchema$1 = objectType({
	demo: stringType().optional(),
	sector_name: stringType().optional()
});
var Route$30 = createFileRoute("/_app/industry")({
	validateSearch: (search) => industrySearchSchema$1.parse(search),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("../_app.developments-BQrnj4Z0.mjs");
var Route$29 = createFileRoute("/_app/developments")({
	head: () => ({ meta: [{ title: "Developments | SpotLite" }, {
		name: "description",
		content: "Company developments, news intelligence, and market opportunities."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./upload-BsXPiD-H.mjs");
var Route$28 = createFileRoute("/(onboarding)/upload")({
	head: () => ({ meta: [{ title: "Upload Transactions · Spotlite" }, {
		name: "description",
		content: "Upload and extract transaction data."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./processing-COlm0asZ.mjs");
var Route$27 = createFileRoute("/(onboarding)/processing")({
	head: () => ({ meta: [{ title: "Building your financial graph · Spotlite" }, {
		name: "description",
		content: "Reading transactions, classifying merchants, detecting opportunities."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./onboarding-nlGEUST_.mjs");
var Route$26 = createFileRoute("/(onboarding)/onboarding")({
	head: () => ({ meta: [{ title: "Business Onboarding · Spotlite" }, {
		name: "description",
		content: "Configure your enterprise financial profile and verify business credentials on SpotLite."
	}] }),
	beforeLoad: async ({ location }) => {
		if (typeof window === "undefined") return;
		const currentPath = location.href || location.pathname || "/onboarding";
		const snapshot = getAuthSnapshot();
		if (!snapshot.loading) {
			if (!snapshot.user) throw redirect({
				to: "/login",
				search: { redirect: currentPath }
			});
			if (!(auth.currentUser ? auth.currentUser.emailVerified : snapshot.user.email_verified)) throw redirect({
				to: "/verify-email",
				search: { redirect: currentPath }
			});
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./consent-CWZeHuIV.mjs");
var Route$25 = createFileRoute("/(onboarding)/consent")({
	head: () => ({ meta: [{ title: "Your data, your rules · Spotlite" }, {
		name: "description",
		content: "DPDP-aligned consent. Revocable, purpose-bound, plain language."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./signup-Dw4tppuJ.mjs");
var Route$24 = createFileRoute("/(auth)/signup")({
	head: () => ({ meta: [{ title: "Sign up · SpotLite Intelligence" }, {
		name: "description",
		content: "Create your SpotLite account for unified workforce risk and financial intelligence."
	}] }),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const snapshot = getAuthSnapshot();
		if (!snapshot.loading && snapshot.user) if (snapshot.user.email_verified) throw redirect({ to: "/home" });
		else throw redirect({ to: "/verify-email" });
	},
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("../_app.industry.index-O9Evi-rE.mjs");
var industrySearchSchema = objectType({
	demo: stringType().optional(),
	sector_name: stringType().optional()
});
var Route$23 = createFileRoute("/_app/industry/")({
	validateSearch: (search) => industrySearchSchema.parse(search),
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(competitorsQueryOptions());
	},
	head: () => ({ meta: [{ title: "Industry View · Spotlite" }, {
		name: "description",
		content: "Competitors and peer financial intelligence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./team-BUSuqUBN.mjs");
var Route$22 = createFileRoute("/_app/(team)/team")({
	head: () => ({ meta: [{ title: "Team & Access Management · Spotlite" }, {
		name: "description",
		content: "Manage executive leadership team, dispatch invitations, and oversee workspace governance."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./spotlights-CCnX5BCK.mjs");
var Route$21 = createFileRoute("/_app/(spotlights)/spotlights")({
	head: () => ({ meta: [{ title: "Spotlite Executive Intelligence · Spotlite" }, {
		name: "description",
		content: "Spotlite deterministic metrics engine, Vendor/Client Analytics, and LLM-augmented AI executive intelligence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./spending-BPcrJld2.mjs");
/**
* Accessible transaction count badge.
* Provides hover tooltip on desktop and tap-to-toggle on touch devices,
* stopping propagation so parent category links are not inadvertently triggered.
*/
var Route$20 = createFileRoute("/_app/(spending)/spending")({
	head: () => ({ meta: [{ title: "Spending · Spotlite" }, {
		name: "description",
		content: "Spend by category, top merchants and your monthly balance trend."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./settings-kWBBu-go.mjs");
var Route$19 = createFileRoute("/_app/(settings)/settings")({
	head: () => ({ meta: [{ title: "Settings · Spotlite" }, {
		name: "description",
		content: "Trust Center, consent management and engagement preferences."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./wrapped-C-6Q7anl.mjs");
var Route$18 = createFileRoute("/_app/(profile)/wrapped")({
	head: () => ({ meta: [{ title: "Money Wrapped · Spotlite" }, {
		name: "description",
		content: "Your year in money, Spotify-Wrapped style."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./profile-DLG5nNc6.mjs");
var Route$17 = createFileRoute("/_app/(profile)/profile")({
	head: () => ({ meta: [{ title: "Customer 360 · Spotlite" }, {
		name: "description",
		content: "Customer 360: identity, net worth, personas, relationships, cash flow and wellness."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
/** Donut of asset allocation; centre shows total assets. */
/** Circular percentage ring, used for persona match strength. */
var $$splitComponentImporter$16 = () => import("./hr-BAVF2lKK.mjs");
var Route$16 = createFileRoute("/_app/(hr)/hr")({
	head: () => ({ meta: [{ title: "HR Operations Center · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./documents-DhbbBgbn.mjs");
var Route$15 = createFileRoute("/_app/(documents)/documents")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./home-WY_ZGNdv.mjs");
var Route$14 = createFileRoute("/_app/(dashboard)/home")({
	head: () => ({ meta: [{ title: "Business 360 · Spotlite" }, {
		name: "description",
		content: "Your business financial intelligence hub."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./coach-CVIlpykJ.mjs");
var Route$13 = createFileRoute("/_app/(coach)/coach")({
	head: () => ({ meta: [{ title: "AI Coach · Spotlite" }, {
		name: "description",
		content: "Ask Spotlite anything about your money. Answers come back as cards with numbers and mini-charts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./cfo-BpzAJSTD.mjs");
var Route$12 = createFileRoute("/_app/(cfo)/cfo")({
	head: () => ({ meta: [{ title: "CFO Operations Center · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./agents-DfQtnOYP.mjs");
var Route$11 = createFileRoute("/_app/(agents)/agents")({
	head: () => ({ meta: [{ title: "Agents · Spotlite" }, {
		name: "description",
		content: "The Spotlite agents that observe, think, act and learn on your money."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./documents.index-BC5_Un78.mjs");
var documentsSearchSchema = objectType({
	category: stringType().optional(),
	sub: stringType().optional(),
	view: enumType([
		"grouped",
		"table",
		"packages"
	]).optional(),
	q: stringType().optional()
});
var Route$10 = createFileRoute("/_app/(documents)/documents/")({
	validateSearch: (search) => documentsSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Documents · Spotlite" }, {
		name: "description",
		content: "Authoritative corporate documentary evidence vault."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./hr_.vendors-C67L0MRE.mjs");
var searchSchema$3 = objectType({
	status: stringType().optional().catch(void 0),
	industry: stringType().optional().catch(void 0),
	recurring: unionType([booleanType(), stringType()]).optional().catch(void 0),
	search: stringType().optional().catch(void 0),
	page: unionType([numberType(), stringType()]).optional().catch(void 0),
	size: unionType([numberType(), stringType()]).optional().catch(void 0)
}).passthrough();
var Route$9 = createFileRoute("/_app/(hr)/hr_/vendors")({
	validateSearch: searchSchema$3,
	beforeLoad: ({ search }) => {
		throw redirect({
			to: "/cfo/vendors",
			search
		});
	},
	head: () => ({ meta: [{ title: "Vendor Directory · HR · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./hr_.employees-CLl2DFRr.mjs");
var searchSchema$2 = objectType({
	status: stringType().optional().catch(void 0),
	department: stringType().optional().catch(void 0),
	search: stringType().optional().catch(void 0),
	employment_type: stringType().optional().catch(void 0),
	page: unionType([numberType(), stringType()]).optional().catch(void 0),
	size: unionType([numberType(), stringType()]).optional().catch(void 0)
}).passthrough();
var Route$8 = createFileRoute("/_app/(hr)/hr_/employees")({
	validateSearch: searchSchema$2,
	head: () => ({ meta: [{ title: "Employee Directory · HR · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./documents.other-BV8vqdhF.mjs");
var Route$7 = createFileRoute("/_app/(documents)/documents/other")({
	beforeLoad: () => {
		throw redirect({
			to: "/documents",
			search: {
				category: "others_unclassified",
				view: "grouped"
			}
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./documents._sectionId-teTQr2c7.mjs");
var sectionSearchSchema = objectType({ sub: stringType().optional() });
var Route$6 = createFileRoute("/_app/(documents)/documents/$sectionId")({
	validateSearch: (search) => sectionSearchSchema.parse(search),
	beforeLoad: ({ params, search }) => {
		let targetCategory;
		if (search.sub) targetCategory = normalizeCategory(search.sub);
		else if (params.sectionId === "regulatory") targetCategory = "all";
		else targetCategory = normalizeCategory(params.sectionId);
		throw redirect({
			to: "/documents",
			search: {
				category: targetCategory === "all" ? void 0 : targetCategory,
				view: "grouped"
			}
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./cfo_.vendors-B9UDhCps.mjs");
var searchSchema$1 = objectType({
	status: stringType().optional().catch(void 0),
	industry: stringType().optional().catch(void 0),
	recurring: unionType([booleanType(), stringType()]).optional().catch(void 0),
	search: stringType().optional().catch(void 0),
	page: unionType([numberType(), stringType()]).optional().catch(void 0),
	size: unionType([numberType(), stringType()]).optional().catch(void 0)
}).passthrough();
var Route$5 = createFileRoute("/_app/(cfo)/cfo_/vendors")({
	validateSearch: searchSchema$1,
	head: () => ({ meta: [{ title: "Vendor Directory · CFO · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./cfo_.clients-ByryilMI.mjs");
var searchSchema = objectType({
	status: stringType().optional().catch(void 0),
	category: stringType().optional().catch(void 0),
	industry: stringType().optional().catch(void 0),
	recurring: unionType([booleanType(), stringType()]).optional().catch(void 0),
	search: stringType().optional().catch(void 0),
	page: unionType([numberType(), stringType()]).optional().catch(void 0),
	size: unionType([numberType(), stringType()]).optional().catch(void 0)
}).passthrough();
var Route$4 = createFileRoute("/_app/(cfo)/cfo_/clients")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Client Directory · CFO · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./hr_.vendor.upload-C1GclapE.mjs");
var Route$3 = createFileRoute("/_app/(hr)/hr_/vendor/upload")({
	beforeLoad: () => {
		throw redirect({ to: "/cfo/vendor/upload" });
	},
	head: () => ({ meta: [{ title: "Upload Vendors · HR · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./hr_.employee.upload-Dm4Z-99G.mjs");
var Route$2 = createFileRoute("/_app/(hr)/hr_/employee/upload")({
	head: () => ({ meta: [{ title: "Upload Employees · HR · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./cfo_.vendor.upload-CoOR_INF.mjs");
var Route$1 = createFileRoute("/_app/(cfo)/cfo_/vendor/upload")({
	head: () => ({ meta: [{ title: "Upload Vendors · CFO · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./upload-DLllV5Zz.mjs");
var Route = createFileRoute("/_app/(cfo)/cfo_/client/upload")({
	head: () => ({ meta: [{ title: "Upload Clients · CFO · Spotlite" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SitemapDotxmlRoute = Route$33.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$34
});
var AppRoute = Route$32.update({
	id: "/_app",
	getParentRoute: () => Route$34
});
var landingIndexRoute = Route$31.update({
	id: "/(landing)/",
	path: "/",
	getParentRoute: () => Route$34
});
var AppIndustryRoute = Route$30.update({
	id: "/industry",
	path: "/industry",
	getParentRoute: () => AppRoute
});
var AppDevelopmentsRoute = Route$29.update({
	id: "/developments",
	path: "/developments",
	getParentRoute: () => AppRoute
});
var onboardingUploadRoute = Route$28.update({
	id: "/(onboarding)/upload",
	path: "/upload",
	getParentRoute: () => Route$34
});
var onboardingProcessingRoute = Route$27.update({
	id: "/(onboarding)/processing",
	path: "/processing",
	getParentRoute: () => Route$34
});
var onboardingOnboardingRoute = Route$26.update({
	id: "/(onboarding)/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$34
});
var onboardingConsentRoute = Route$25.update({
	id: "/(onboarding)/consent",
	path: "/consent",
	getParentRoute: () => Route$34
});
var authVerifyEmailRoute = Route$39.update({
	id: "/(auth)/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$34
});
var authSignupRoute = Route$24.update({
	id: "/(auth)/signup",
	path: "/signup",
	getParentRoute: () => Route$34
});
var authLoginRoute = Route$38.update({
	id: "/(auth)/login",
	path: "/login",
	getParentRoute: () => Route$34
});
var AppIndustryIndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppIndustryRoute
});
var authAcceptInviteIndexRoute = Route$37.update({
	id: "/(auth)/accept-invite/",
	path: "/accept-invite/",
	getParentRoute: () => Route$34
});
var AppIndustryCompanyIdRoute = Route$35.update({
	id: "/$companyId",
	path: "/$companyId",
	getParentRoute: () => AppIndustryRoute
});
var AppteamTeamRoute = Route$22.update({
	id: "/(team)/team",
	path: "/team",
	getParentRoute: () => AppRoute
});
var AppspotlightsSpotlightsRoute = Route$21.update({
	id: "/(spotlights)/spotlights",
	path: "/spotlights",
	getParentRoute: () => AppRoute
});
var AppspendingSpendingRoute = Route$20.update({
	id: "/(spending)/spending",
	path: "/spending",
	getParentRoute: () => AppRoute
});
var AppsettingsSettingsRoute = Route$19.update({
	id: "/(settings)/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppprofileWrappedRoute = Route$18.update({
	id: "/(profile)/wrapped",
	path: "/wrapped",
	getParentRoute: () => AppRoute
});
var AppprofileProfileRoute = Route$17.update({
	id: "/(profile)/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var ApphrHrRoute = Route$16.update({
	id: "/(hr)/hr",
	path: "/hr",
	getParentRoute: () => AppRoute
});
var AppdocumentsDocumentsRoute = Route$15.update({
	id: "/(documents)/documents",
	path: "/documents",
	getParentRoute: () => AppRoute
});
var AppdashboardHomeRoute = Route$14.update({
	id: "/(dashboard)/home",
	path: "/home",
	getParentRoute: () => AppRoute
});
var AppcoachCoachRoute = Route$13.update({
	id: "/(coach)/coach",
	path: "/coach",
	getParentRoute: () => AppRoute
});
var AppcfoCfoRoute = Route$12.update({
	id: "/(cfo)/cfo",
	path: "/cfo",
	getParentRoute: () => AppRoute
});
var AppagentsAgentsRoute = Route$11.update({
	id: "/(agents)/agents",
	path: "/agents",
	getParentRoute: () => AppRoute
});
var authAcceptInviteTokenRoute = Route$36.update({
	id: "/(auth)/accept-invite/$token",
	path: "/accept-invite/$token",
	getParentRoute: () => Route$34
});
var AppdocumentsDocumentsIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppdocumentsDocumentsRoute
});
var AppspotlightsSpotlightsIdRoute = Route$40.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppspotlightsSpotlightsRoute
});
var AppspendingSpendingCategoryRoute = Route$41.update({
	id: "/$category",
	path: "/$category",
	getParentRoute: () => AppspendingSpendingRoute
});
var ApphrHrVendorsRoute = Route$9.update({
	id: "/(hr)/hr_/vendors",
	path: "/hr/vendors",
	getParentRoute: () => AppRoute
});
var ApphrHrEmployeesRoute = Route$8.update({
	id: "/(hr)/hr_/employees",
	path: "/hr/employees",
	getParentRoute: () => AppRoute
});
var AppdocumentsDocumentsOtherRoute = Route$7.update({
	id: "/other",
	path: "/other",
	getParentRoute: () => AppdocumentsDocumentsRoute
});
var AppdocumentsDocumentsSectionIdRoute = Route$6.update({
	id: "/$sectionId",
	path: "/$sectionId",
	getParentRoute: () => AppdocumentsDocumentsRoute
});
var AppcfoCfoVendorsRoute = Route$5.update({
	id: "/(cfo)/cfo_/vendors",
	path: "/cfo/vendors",
	getParentRoute: () => AppRoute
});
var AppcfoCfoClientsRoute = Route$4.update({
	id: "/(cfo)/cfo_/clients",
	path: "/cfo/clients",
	getParentRoute: () => AppRoute
});
var AppspotlightsSpotlightsIdApplyRoute = Route$42.update({
	id: "/$id_/apply",
	path: "/$id/apply",
	getParentRoute: () => AppspotlightsSpotlightsRoute
});
var ApphrHrVendorUploadRoute = Route$3.update({
	id: "/(hr)/hr_/vendor/upload",
	path: "/hr/vendor/upload",
	getParentRoute: () => AppRoute
});
var ApphrHrEmployeeUploadRoute = Route$2.update({
	id: "/(hr)/hr_/employee/upload",
	path: "/hr/employee/upload",
	getParentRoute: () => AppRoute
});
var AppcfoCfoVendorUploadRoute = Route$1.update({
	id: "/(cfo)/cfo_/vendor/upload",
	path: "/cfo/vendor/upload",
	getParentRoute: () => AppRoute
});
var AppcfoCfoClientUploadRoute = Route.update({
	id: "/(cfo)/cfo_/client/upload",
	path: "/cfo/client/upload",
	getParentRoute: () => AppRoute
});
var AppIndustryRouteChildren = {
	AppIndustryCompanyIdRoute,
	AppIndustryIndexRoute
};
var AppIndustryRouteWithChildren = AppIndustryRoute._addFileChildren(AppIndustryRouteChildren);
var AppdocumentsDocumentsRouteChildren = {
	AppdocumentsDocumentsSectionIdRoute,
	AppdocumentsDocumentsOtherRoute,
	AppdocumentsDocumentsIndexRoute
};
var AppdocumentsDocumentsRouteWithChildren = AppdocumentsDocumentsRoute._addFileChildren(AppdocumentsDocumentsRouteChildren);
var AppspendingSpendingRouteChildren = { AppspendingSpendingCategoryRoute };
var AppspendingSpendingRouteWithChildren = AppspendingSpendingRoute._addFileChildren(AppspendingSpendingRouteChildren);
var AppspotlightsSpotlightsRouteChildren = {
	AppspotlightsSpotlightsIdRoute,
	AppspotlightsSpotlightsIdApplyRoute
};
var AppRouteChildren = {
	AppDevelopmentsRoute,
	AppIndustryRoute: AppIndustryRouteWithChildren,
	AppagentsAgentsRoute,
	AppcfoCfoRoute,
	AppcoachCoachRoute,
	AppdashboardHomeRoute,
	AppdocumentsDocumentsRoute: AppdocumentsDocumentsRouteWithChildren,
	ApphrHrRoute,
	AppprofileProfileRoute,
	AppprofileWrappedRoute,
	AppsettingsSettingsRoute,
	AppspendingSpendingRoute: AppspendingSpendingRouteWithChildren,
	AppspotlightsSpotlightsRoute: AppspotlightsSpotlightsRoute._addFileChildren(AppspotlightsSpotlightsRouteChildren),
	AppteamTeamRoute,
	AppcfoCfoClientsRoute,
	AppcfoCfoVendorsRoute,
	ApphrHrEmployeesRoute,
	ApphrHrVendorsRoute,
	AppcfoCfoClientUploadRoute,
	AppcfoCfoVendorUploadRoute,
	ApphrHrEmployeeUploadRoute,
	ApphrHrVendorUploadRoute
};
var rootRouteChildren = {
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	SitemapDotxmlRoute,
	authLoginRoute,
	authSignupRoute,
	authVerifyEmailRoute,
	onboardingConsentRoute,
	onboardingOnboardingRoute,
	onboardingProcessingRoute,
	onboardingUploadRoute,
	landingIndexRoute,
	authAcceptInviteTokenRoute,
	authAcceptInviteIndexRoute
};
var routeTree = Route$34._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: {
			queryClient: new QueryClient({ defaultOptions: { queries: {
				staleTime: 300 * 1e3,
				refetchOnWindowFocus: false
			} } }),
			auth: getAuthSnapshot()
		},
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

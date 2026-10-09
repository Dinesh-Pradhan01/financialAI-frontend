import { o as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-BkRapwZn.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { At as Landmark, Dn as ChartColumn, Lt as FolderLock, Mt as House, Pn as BriefcaseBusiness, St as LogOut, V as Settings, Z as Radar, c as User, ct as PanelLeftClose, o as Users, st as PanelLeftOpen, t as Zap, v as TrendingUp, wt as LoaderCircle } from "./_libs/lucide-react.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as auth } from "./_ssr/firebase-pUuzlwRE.mjs";
import { s as languages } from "./_ssr/agentic-C_EsON0v.mjs";
import { Q as useAppSelector } from "./_ssr/store-i6pKH_iX.mjs";
import { r as useAuth } from "./_ssr/AuthContext-Cv6TbLYz.mjs";
import { i as selectLanguage } from "./_ssr/selectors-CqEsKQIY.mjs";
import { t as SpotliteLoader } from "./_ssr/SpotliteLoader-BkYU6zxS.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./_ssr/tooltip-CHW56Nnu.mjs";
import { t as useLogout } from "./_ssr/useLogout-DedIdgpM.mjs";
import { i as isCeoOrAdmin, n as canAccessHR, o as isStrictCFO, s as isStrictHR, t as canAccessCFO } from "./_ssr/roles-Cu-hhfHW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-Pfn1vaI-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/home",
		label: "Business 360",
		icon: House
	},
	{
		to: "/spending",
		label: "Spending",
		icon: ChartColumn
	},
	{
		to: "/industry",
		label: "Industry View",
		icon: TrendingUp
	},
	{
		to: "/developments",
		label: "Developments",
		icon: Radar
	},
	{
		to: "/spotlights",
		label: "Spotlights",
		icon: Zap
	},
	{
		to: "/documents",
		label: "Documents",
		icon: FolderLock
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	}
];
function useActive() {
	const path = useRouterState({ select: (r) => r.location.pathname });
	return (to) => path === to || path.startsWith(to + "/");
}
function BottomTabBar() {
	const isActive = useActive();
	const { user } = useAuth();
	const canManageTeam = isCeoOrAdmin(user?.role);
	const isHrStrict = isStrictHR(user?.role);
	const isCfoStrict = isStrictCFO(user?.role);
	const canAccessHr = canAccessHR(user?.role);
	const canAccessCfo = canAccessCFO(user?.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "flex items-center overflow-x-auto no-scrollbar scroll-smooth px-1",
			children: [
				(isHrStrict ? items.filter((it) => it.to !== "/profile" && it.to !== "/spending") : isCfoStrict ? items.filter((it) => it.to !== "/profile") : items).map((it) => {
					const Icon = it.icon;
					const active = isActive(it.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0 min-w-14 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: it.to,
							className: cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium whitespace-nowrap", active ? "text-brand" : "text-text-secondary"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-5 w-5", active && "stroke-[2.4]") }), false]
							}), it.label]
						})
					}, it.to);
				}),
				canManageTeam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "shrink-0 min-w-14 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/team",
						className: cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium whitespace-nowrap", isActive("/team") ? "text-brand" : "text-text-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: cn("h-5 w-5", isActive("/team") && "stroke-[2.4]") })
						}), "Team"]
					})
				}),
				canAccessHr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "shrink-0 min-w-14 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/hr",
						className: cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium whitespace-nowrap", isActive("/hr") ? "text-brand" : "text-text-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: cn("h-5 w-5", isActive("/hr") && "stroke-[2.4]") })
						}), "HR Ops"]
					})
				}),
				canAccessCfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "shrink-0 min-w-14 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cfo",
						className: cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium whitespace-nowrap", isActive("/cfo") ? "text-brand" : "text-text-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: cn("h-5 w-5", isActive("/cfo") && "stroke-[2.4]") })
						}), "CFO Ops"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[env(safe-area-inset-bottom)]" })]
	});
}
function DesktopSidebar() {
	const [isCollapsed, setIsCollapsed] = (0, import_react.useState)(false);
	const isActive = useActive();
	const language = useAppSelector(selectLanguage);
	const { user } = useAuth();
	const { handleLogout, loggingOut } = useLogout();
	const canManageTeam = isCeoOrAdmin(user?.role);
	const isHrStrict = isStrictHR(user?.role);
	const isCfoStrict = isStrictCFO(user?.role);
	const canAccessHr = canAccessHR(user?.role);
	const canAccessCfo = canAccessCFO(user?.role);
	const visibleItems = isHrStrict ? items.filter((it) => it.to !== "/profile" && it.to !== "/spending") : isCfoStrict ? items.filter((it) => it.to !== "/profile") : items;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: cn("sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-surface py-6 md:flex transition-all duration-300", isCollapsed ? "w-20 px-2" : "w-60 px-4"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/home",
						className: cn("flex items-center gap-2.5", isCollapsed && "justify-center w-full"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								size: 18,
								className: "fill-current text-white"
							})
						}), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-lg font-bold tracking-tight text-foreground",
								children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Lite"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold uppercase tracking-widest text-text-tertiary -mt-1",
								children: "Intelligence"
							})]
						})]
					}), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsCollapsed(true),
								className: "flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-surface-alt hover:text-text-secondary transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { size: 18 })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
							side: "right",
							children: "Close sidebar"
						})] })
					})]
				}),
				isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-center mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsCollapsed(false),
							className: "flex h-10 w-10 items-center justify-center rounded-lg text-text-tertiary hover:bg-surface-alt hover:text-text-secondary transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { size: 20 })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
						side: "right",
						children: "Open sidebar"
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1 flex-1 overflow-y-auto no-scrollbar",
					children: [
						visibleItems.map((it) => {
							const Icon = it.icon;
							const active = isActive(it.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: it.to,
								title: isCollapsed ? it.label : void 0,
								className: cn("flex items-center rounded-lg py-2 text-sm font-medium transition-all duration-200", isCollapsed ? "justify-center px-0" : "px-3 gap-3", active ? "bg-brand text-on-brand shadow-e1" : "text-text-secondary hover:bg-surface-alt"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }),
									!isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.label }),
									false,
									false
								]
							}) }, it.to);
						}),
						canManageTeam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/team",
							title: isCollapsed ? "Team" : void 0,
							className: cn("flex items-center rounded-lg py-2 text-sm font-medium transition-all duration-200", isCollapsed ? "justify-center px-0" : "px-3 gap-3", isActive("/team") ? "bg-brand text-on-brand shadow-e1" : "text-text-secondary hover:bg-surface-alt"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 shrink-0" }), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Team" })]
						}) }),
						canAccessHr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/hr",
							title: isCollapsed ? "HR Ops" : void 0,
							className: cn("flex items-center rounded-lg py-2 text-sm font-medium transition-all duration-200", isCollapsed ? "justify-center px-0" : "px-3 gap-3", isActive("/hr") ? "bg-brand text-on-brand shadow-e1" : "text-text-secondary hover:bg-surface-alt"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: "h-4 w-4 shrink-0" }), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "HR Ops" })]
						}) }),
						canAccessCfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cfo",
							title: isCollapsed ? "CFO Ops" : void 0,
							className: cn("flex items-center rounded-lg py-2 text-sm font-medium transition-all duration-200", isCollapsed ? "justify-center px-0" : "px-3 gap-3", isActive("/cfo") ? "bg-brand text-on-brand shadow-e1" : "text-text-secondary hover:bg-surface-alt"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 shrink-0" }), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CFO Ops" })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/settings",
							title: isCollapsed ? "Settings" : void 0,
							className: cn("flex items-center rounded-lg py-2 text-sm font-medium transition-all duration-200", isCollapsed ? "justify-center px-0" : "px-3 gap-3", isActive("/settings") ? "bg-surface-alt text-text-primary" : "text-text-secondary hover:bg-surface-alt"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 shrink-0" }), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })]
						}) })
					]
				}),
				user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-4 border-t border-border space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-center rounded-xl bg-surface-alt border border-border/50", isCollapsed ? "p-1 justify-center flex-col gap-2" : "justify-between gap-2 p-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex items-center min-w-0", isCollapsed ? "justify-center" : "gap-2"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white font-bold text-xs uppercase shadow-xs",
								children: user.full_name ? user.full_name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()
							}), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-semibold text-text-primary",
									children: user.full_name || user.email.split("@")[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rounded-full bg-brand/10 px-1.5 py-0.2 text-[9px] font-bold text-brand uppercase tracking-wider",
									children: user.role
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleLogout,
							disabled: loggingOut,
							title: loggingOut ? "Signing out…" : "Log out",
							className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-destructive/10 hover:text-destructive transition cursor-pointer disabled:opacity-50",
							children: loggingOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5 shrink-0" })
						})]
					}), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-1 text-[11px] text-text-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: languages.find((l) => l.code === language)?.label ?? "English" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[10px] text-text-secondary/70",
							children: "Trust Center · DPDP-ready"
						})]
					})]
				})
			]
		})
	});
}
function AppLayout() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading) {
			const currentPath = window.location.pathname + window.location.search;
			if (!user) navigate({
				to: "/login",
				search: { redirect: currentPath },
				replace: true
			});
			else if (auth.currentUser && !auth.currentUser.emailVerified) navigate({
				to: "/verify-email",
				search: { redirect: currentPath },
				replace: true
			});
		}
	}, [
		user,
		loading,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Restoring secure session…",
		subMessage: "SpotLite Executive Intelligence"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopSidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 flex-1 pb-24 md:pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomTabBar, {})
		]
	});
}
//#endregion
export { AppLayout as component };

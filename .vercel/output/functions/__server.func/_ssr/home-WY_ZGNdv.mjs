import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, At as Landmark, Ct as Lock, Et as Linkedin, Gn as ArrowRight, Ln as BookOpen, Mn as Building2, Nn as Briefcase, Ot as Layers, Pt as Globe, Q as Plus, Qt as ExternalLink, R as ShieldCheck, S as Target, U as Search, Xt as Eye, Y as RefreshCw, Zt as EyeOff, _n as CircleAlert, an as Copy, cn as Clock, dt as PackageOpen, ft as Newspaper, gn as CircleCheck, in as CreditCard, jn as Building, o as Users, pn as CirclePlus, s as UsersRound, tt as Phone, v as TrendingUp, vt as MapPin, wn as Check, xn as ChevronRight, yt as Mail, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { a as useQueryClient, n as queryOptions, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as developmentsQueryOptions } from "./useDevelopments-DWlwTKEO.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { t as cfoApi } from "./cfoAxios-sGO5vNpk.mjs";
import { t as useCFODashboard } from "./useCFODashboard-DG5RjGSt.mjs";
import { t as formatINR } from "./format-B9luOE0k.mjs";
import { t as useSpendingReport } from "./useSpendingReport-yTKb3a2k.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-WY_ZGNdv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Utility function to distinguish expected "setup required" (404) states
* from genuine backend / network failures (500, 502, network offline, etc.).
*/
function isSetupRequiredError(error) {
	if (!error) return false;
	if (error?.status === 404) return true;
	const msg = error?.message?.toLowerCase() || "";
	return msg.includes("404") || msg.includes("not found") || msg.includes("profile not found");
}
var useCompanyProfile = (options) => {
	return useQuery({
		queryKey: queryKeys.company.profile(),
		queryFn: () => api.get("/api/company/profile"),
		staleTime: 300 * 1e3,
		enabled: options?.enabled ?? true,
		retry: (failureCount, error) => {
			if (isSetupRequiredError(error)) return false;
			return failureCount < 2;
		}
	});
};
var useCompanyRating = (options) => {
	return useQuery({
		queryKey: queryKeys.company.rating(),
		queryFn: async () => {
			const res = await api.get("/api/company/public-rating");
			if (res.status !== "Success" || !res.content) throw new Error(res.Error || "Failed to fetch public rating");
			return res.content;
		},
		staleTime: 300 * 1e3,
		enabled: options?.enabled ?? true,
		retry: (failureCount, error) => {
			if (isSetupRequiredError(error)) return false;
			return failureCount < 2;
		}
	});
};
var useCompanyNews = (options) => {
	return useQuery({
		queryKey: queryKeys.company.news(),
		queryFn: () => api.get("/api/company/news"),
		staleTime: 300 * 1e3,
		enabled: options?.enabled ?? true,
		retry: (failureCount, error) => {
			if (isSetupRequiredError(error)) return false;
			return failureCount < 2;
		}
	});
};
var useOnboardingStatus = (options) => {
	return useQuery({
		queryKey: [
			"business",
			"onboarding",
			"me"
		],
		queryFn: () => api.get("/api/business/onboarding/me"),
		staleTime: 30 * 1e3,
		enabled: options?.enabled ?? true,
		retry: false
	});
};
/**
* Hook to retrieve the company's top clients sorted by revenue.
*/
var useTopClients = (options) => {
	return useQuery({
		queryKey: ["dashboard", "top-clients"],
		queryFn: async () => {
			try {
				const res = await cfoApi.get("/clients", { params: { size: 100 } });
				const rawList = res.data?.data?.items ?? res.data?.items ?? (Array.isArray(res.data) ? res.data : []);
				if (!Array.isArray(rawList)) return [];
				return rawList.map((item, idx) => ({
					id: String(item.client_id || item.id || `client-${idx}`),
					name: String(item.client_name || item.name || item.clientName || "Unnamed Client"),
					revenue: Number(item.revenue) || 0,
					category: item.category ? String(item.category) : void 0
				}));
			} catch {
				return [];
			}
		},
		staleTime: 300 * 1e3,
		enabled: options?.enabled ?? true
	});
};
/**
* Shared query options for competitors.
* Exported for queryClient.prefetchQuery so Business 360 can prefetch
* into the identical cache slot before the user opens the tab.
*/
var competitorsQueryOptions = queryOptions({
	queryKey: queryKeys.company.competitors(),
	queryFn: async () => {
		const res = await api.get("/api/company/get-competitors");
		if (!res || res.status === "Failed - Error occured") throw new Error(res?.detail || res?.message || "Failed to retrieve market competitors");
		const type = res.type || (Array.isArray(res) ? "structured" : "unstructured");
		const rawContent = res.content !== void 0 ? res.content : res;
		const isFallback = Boolean(res.is_fallback);
		const items = [];
		let rawText = void 0;
		let parsedPayload = rawContent;
		if (typeof rawContent === "string") {
			rawText = rawContent;
			const cleanedStr = rawContent.trim();
			let extractedJson = null;
			const codeBlockMatch = cleanedStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
			if (codeBlockMatch) try {
				extractedJson = JSON.parse(codeBlockMatch[1].trim());
			} catch {}
			if (!extractedJson) try {
				extractedJson = JSON.parse(cleanedStr);
			} catch {}
			if (!extractedJson) {
				const firstBracket = cleanedStr.indexOf("[");
				const lastBracket = cleanedStr.lastIndexOf("]");
				if (firstBracket !== -1 && lastBracket > firstBracket) try {
					extractedJson = JSON.parse(cleanedStr.substring(firstBracket, lastBracket + 1));
				} catch {}
			}
			if (!extractedJson) {
				const firstBrace = cleanedStr.indexOf("{");
				const lastBrace = cleanedStr.lastIndexOf("}");
				if (firstBrace !== -1 && lastBrace > firstBrace) try {
					extractedJson = JSON.parse(cleanedStr.substring(firstBrace, lastBrace + 1));
				} catch {}
			}
			if (extractedJson) parsedPayload = extractedJson;
		}
		const normalizeItem = (entry, idx) => {
			const name = entry["company name"] || entry.company_name || entry.name || entry.companyName || `Competitor ${idx + 1}`;
			const location = entry.location || entry.city || entry.headquarters || entry.hq || null;
			const services = entry.services || entry.service || entry.offerings || entry.products || null;
			const overlap = entry["overlap summary"] || entry.overlap_summary || entry.overlapSummary || entry.description || entry.summary || null;
			const marketCap = entry["market cap"] || entry.market_cap || entry.marketCap || null;
			const website = entry.website || entry.url || entry.official_website || entry.website_url || null;
			return {
				id: String(entry.id || `comp-${idx + 1}`),
				name: String(name),
				location: location ? String(location) : null,
				services: services ? String(services) : null,
				overlap_summary: overlap ? String(overlap) : null,
				description: overlap ? String(overlap) : services ? String(services) : "",
				market_cap: marketCap ? String(marketCap) : null,
				website: website ? String(website) : null
			};
		};
		if (Array.isArray(parsedPayload)) parsedPayload.forEach((entry, idx) => {
			if (entry && typeof entry === "object") items.push(normalizeItem(entry, idx));
		});
		else if (parsedPayload && typeof parsedPayload === "object") if (Array.isArray(parsedPayload.competitors)) parsedPayload.competitors.forEach((entry, idx) => {
			if (entry && typeof entry === "object") items.push(normalizeItem(entry, idx));
		});
		else if (parsedPayload["company name"] || parsedPayload.company_name || parsedPayload.name) items.push(normalizeItem(parsedPayload, 0));
		else {
			const values = Object.values(parsedPayload);
			if (values.length > 0 && typeof values[0] === "object" && values[0] !== null) values.forEach((entry, idx) => {
				if (entry && typeof entry === "object") items.push(normalizeItem(entry, idx));
			});
		}
		return {
			competitors: items,
			type,
			rawText,
			isFallback
		};
	},
	staleTime: 300 * 1e3,
	retry: (failureCount, error) => {
		if (isSetupRequiredError(error)) return false;
		return failureCount < 2;
	}
});
/**
* Hook to retrieve AI-generated market competitors from backend /company/get-competitors route.
*/
var useCompetitors = (options) => {
	return useQuery({
		...competitorsQueryOptions,
		enabled: options?.enabled ?? true
	});
};
function OnboardingProgressBanner({ onOpenOnboarding }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { data: onboardingData } = useOnboardingStatus();
	if (user?.profile_completed || onboardingData?.onboarding_completed) return null;
	const completionPct = onboardingData?.completion_percentage ?? 0;
	const currentStep = onboardingData?.current_step ?? 1;
	const handleOpen = () => {
		if (onOpenOnboarding) onOpenOnboarding();
		else navigate({ to: "/onboarding" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative overflow-hidden rounded-2xl border border-brand/30 bg-linear-to-r from-brand/10 via-surface to-brand/5 p-5 shadow-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row lg:items-center justify-between gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand border border-brand/25 font-bold font-mono text-sm",
					children: [completionPct, "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-brand" }), " Setup in Progress"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-text-secondary",
								children: currentStep <= 4 ? `Step ${currentStep} of 4` : "Review & Complete"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base sm:text-lg font-bold tracking-tight text-foreground",
							children: "Finish your Business Profile for Full AI Intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary max-w-2xl leading-relaxed",
							children: "Complete your leadership structure, banking context, and verification documents to unlock real-time financial health scoring and peer benchmarking."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 self-stretch lg:self-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full sm:w-36 space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[11px] font-semibold text-text-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Readiness" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-brand font-bold",
							children: [completionPct, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full bg-border rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-brand transition-all duration-500 ease-out rounded-full",
							style: { width: `${Math.max(completionPct, 8)}%` }
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpen,
					className: "w-full sm:w-auto bg-brand hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-brand px-5 py-2.5 rounded-xl text-xs shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume Onboarding" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
				})]
			})]
		})
	});
}
var ProfileCard = () => {
	const navigate = useNavigate();
	const { data: profile, isLoading: isProfileLoading, isError: isProfileError, error: profileError, refetch: refetchProfile, isFetching: isProfileFetching } = useCompanyProfile();
	const { data: onboardingData } = useOnboardingStatus();
	const { clientMetrics, isLoading: isCfoLoading } = useCFODashboard();
	if (isProfileLoading || isCfoLoading && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/70 shadow-sm bg-surface p-6 sm:p-8 flex flex-col justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-12 rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-64" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-24 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-20 rounded-full" })]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full rounded-lg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full rounded-lg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full rounded-lg" })
			]
		})]
	});
	if (isProfileError && !isSetupRequiredError(profileError)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "h-full border border-destructive/30 bg-destructive/5 shadow-sm p-6 sm:p-8 flex flex-col justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 bg-destructive/10 rounded-xl shrink-0 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-foreground text-base",
					children: "Could not load company profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-0.5",
					children: "We encountered an unexpected server error while retrieving company details."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => refetchProfile(),
				disabled: isProfileFetching,
				className: "shrink-0 flex items-center gap-2 cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3.5 h-3.5 ${isProfileFetching ? "animate-spin" : ""}` }), "Try again"]
			})]
		})
	});
	if (!profile || isProfileError && isSetupRequiredError(profileError)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border-dashed border-2 border-primary/30 bg-linear-to-br from-primary/5 via-surface to-surface-alt/40 p-6 sm:p-8 relative overflow-hidden shadow-sm flex flex-col justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), "Action Required"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold tracking-tight text-foreground font-display",
						children: "Complete Company Profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-lg leading-relaxed",
						children: "Enter your statutory registration credentials, sector category, and leadership details to initialize your Business 360 intelligence hub."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-6 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => navigate({ to: "/onboarding" }),
					className: "bg-brand-gradient hover:opacity-95 text-white font-semibold flex items-center gap-2 cursor-pointer shadow-brand px-6 py-2.5 rounded-full text-sm",
					children: ["Complete Setup ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
				})
			})
		]
	});
	const generalInfo = onboardingData?.general_info;
	const leadershipInfo = onboardingData?.leadership_info;
	const companyName = profile.company_name || generalInfo?.company_name || "—";
	const sector = profile.business_category || generalInfo?.business_category || profile.industry || "—";
	const businessType = profile.business_type || generalInfo?.business_type || null;
	const registeredAddress = profile.registered_address || generalInfo?.registered_address || "—";
	const employeeCountBracket = leadershipInfo?.number_of_employees || generalInfo?.number_of_employees || "—";
	const totalClients = clientMetrics?.totalClients !== void 0 && clientMetrics?.totalClients !== null ? clientMetrics.totalClients : "—";
	const website = profile.website || generalInfo?.website || null;
	const email = profile.email || generalInfo?.official_email || null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/80 shadow-xs bg-surface relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 group hover:border-border transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-13 h-13 rounded-2xl bg-brand/10 text-brand border border-brand/20 flex items-center justify-center shrink-0 shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-7 h-7" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display leading-tight",
							children: companyName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 pt-0.5",
							children: [sector !== "—" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "bg-primary/10 text-primary hover:bg-primary/15 font-medium px-2.5 py-0.5 text-xs",
								children: sector
							}), businessType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "border-border/80 text-text-secondary text-xs px-2.5 py-0.5",
								children: businessType
							})]
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-primary/70 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered Address" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/90 font-medium leading-relaxed pl-5 line-clamp-2",
					title: registeredAddress !== "—" ? registeredAddress : void 0,
					children: registeredAddress
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-border/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl bg-primary/[0.04] border border-primary/15 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workforce" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base font-bold text-foreground font-display",
							children: employeeCountBracket
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-text-tertiary font-medium",
							children: "Employees declared"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl bg-indigo-500/[0.04] border border-indigo-500/15 hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clients" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base font-bold text-foreground font-num tabular-nums",
							children: totalClients
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-text-tertiary font-medium",
							children: "Active relationships"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15 hover:border-emerald-500/30 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Presence" })]
						}),
						website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: website.startsWith("http") ? website : `https://${website}`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline truncate block",
							title: website,
							children: website.replace(/^https?:\/\/(www\.)?/, "")
						}) : email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${email}`,
							className: "text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline truncate block",
							title: email,
							children: email
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-text-tertiary block",
							children: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-text-tertiary font-medium",
							children: "Official contact"
						})
					]
				})
			]
		})]
	});
};
var OfferingsCard = () => {
	const { data: onboardingData, isLoading } = useOnboardingStatus();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/80 shadow-xs bg-surface p-6 sm:p-8 flex flex-col justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-32" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-44" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full rounded-xl mt-4" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-28 rounded-md mt-6" })]
	});
	const leadershipInfo = onboardingData?.leadership_info;
	const primaryProductService = leadershipInfo?.primary_product_service?.trim() || null;
	const businessModel = leadershipInfo?.business_model?.trim() || null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/80 shadow-xs bg-surface flex flex-col justify-between p-6 sm:p-8 group hover:border-border transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-xl font-bold tracking-tight text-foreground font-display",
						children: "Offerings"
					})]
				}), businessModel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "bg-primary/10 text-primary font-medium text-xs px-2.5 py-0.5 border border-primary/20",
					children: businessModel
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-tertiary mt-1 font-medium pl-11",
				children: "As declared by the company"
			})] }), Boolean(primaryProductService || businessModel) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-xl bg-linear-to-br from-primary/[0.04] via-surface to-surface-alt/40 border border-primary/15 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Primary Products & Services" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground leading-relaxed",
						children: primaryProductService || "General commercial offerings"
					})]
				}), businessModel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-text-secondary pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "w-3.5 h-3.5 text-primary/70 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Operating Model:" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: businessModel
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-8 px-4 rounded-xl bg-surface-alt/30 border border-border/40 flex flex-col items-center justify-center text-center space-y-2.5 my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: "w-7 h-7 text-text-tertiary/50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground/80",
							children: "No offerings added yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-text-tertiary max-w-xs leading-relaxed",
							children: "Product lines and commercial services can be recorded during onboarding or profile review."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/onboarding",
						className: "text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ Record Offerings" })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pt-4 border-t border-border/50 text-[11px] text-text-tertiary",
			children: "Curated commercial profile"
		})]
	});
};
var PersonCard = ({ roleLabel, name, designation, email, phone }) => {
	const cleanName = name?.trim() || null;
	const cleanDesignation = designation?.trim() || roleLabel;
	const cleanEmail = email?.trim() || null;
	const cleanPhone = phone?.trim() || null;
	const initials = cleanName ? cleanName.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() : roleLabel.slice(0, 2).toUpperCase();
	const getRoleTheme = (label) => {
		const l = label.toLowerCase();
		if (l.includes("executive") || l.includes("ceo")) return {
			avatar: "bg-primary/10 text-primary border-primary/25",
			badge: "bg-primary/10 text-primary border-primary/20"
		};
		if (l.includes("financial") || l.includes("cfo")) return {
			avatar: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25",
			badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
		};
		return {
			avatar: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
			badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
		};
	};
	const roleTheme = getRoleTheme(roleLabel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface rounded-xl border border-border/80 p-4 sm:p-5 flex flex-col justify-between hover:border-primary/25 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `w-11 h-11 rounded-full border ${roleTheme.avatar} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200 ease-out`,
				"aria-hidden": "true",
				children: initials
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between gap-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: `text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 ${roleTheme.badge}`,
							children: roleLabel
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground truncate",
						title: cleanName || void 0,
						children: cleanName ? cleanName : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-text-tertiary",
							children: "Not designated"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary truncate font-medium",
						title: cleanDesignation,
						children: cleanDesignation
					})
				]
			})]
		}), (cleanEmail || cleanPhone) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary",
			children: [cleanEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `mailto:${cleanEmail}`,
				className: "inline-flex items-center gap-1.5 hover:text-primary transition-colors truncate max-w-full",
				title: cleanEmail,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-3.5 h-3.5 text-primary/70 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: cleanEmail
				})]
			}), cleanPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `tel:${cleanPhone}`,
				className: "inline-flex items-center gap-1.5 hover:text-primary transition-colors shrink-0",
				title: cleanPhone,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5 text-primary/70 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cleanPhone })]
			})]
		})]
	});
};
var KeyPersonnelSection = () => {
	const { data: onboardingData, isLoading } = useOnboardingStatus();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/70 bg-surface-alt/30 p-5 sm:p-6 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-36" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" })
			]
		})]
	});
	const leadership = onboardingData?.leadership_info;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "key-personnel-heading",
		className: "rounded-2xl border border-border/70 bg-linear-to-br from-surface-alt/40 via-surface to-surface-alt/20 p-5 sm:p-6 space-y-4 shadow-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "key-personnel-heading",
						className: "text-lg font-bold tracking-tight text-foreground font-display",
						children: "Key Personnel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-text-tertiary font-normal hidden sm:inline",
						children: "· Executive governance & authorized representatives"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-text-tertiary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Synced with onboarding records" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
					roleLabel: "Chief Executive Officer",
					name: leadership?.founder_ceo_name,
					designation: leadership?.founder_ceo_designation || "Founder & CEO",
					email: leadership?.founder_ceo_email,
					phone: leadership?.founder_ceo_phone
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
					roleLabel: "Chief Financial Officer",
					name: leadership?.cfo_name,
					designation: leadership?.cfo_designation || "Chief Financial Officer",
					email: leadership?.cfo_email,
					phone: leadership?.cfo_phone
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
					roleLabel: "Human Resources",
					name: leadership?.hr_name,
					designation: leadership?.hr_designation || "Head of People & HR",
					email: leadership?.hr_email,
					phone: leadership?.hr_phone
				})
			]
		})]
	});
};
var TopClientsCard = () => {
	const { data: clients = [], isLoading, isError } = useTopClients();
	const sortedClients = [...clients].sort((a, b) => (Number(b.revenue) || 0) - (Number(a.revenue) || 0)).slice(0, 5);
	const totalRevenue = sortedClients.reduce((sum, client) => sum + (Number(client.revenue) || 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/80 shadow-xs bg-surface flex flex-col justify-between p-6 sm:p-7 group hover:border-border transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-xl font-bold tracking-tight text-foreground font-display",
						children: "Top Clients"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-tertiary mt-0.5 font-medium",
						children: "Based on client records provided by the company"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cfo/clients",
					className: "h-8 px-2.5 text-xs font-medium text-primary hover:text-primary/80 border border-primary/20 hover:border-primary/40 bg-primary/5 rounded-lg flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shrink-0",
					title: "Manage and upload client records",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Manage Clients"
					})]
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-lg" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-lg" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-lg" })
				]
			}) : sortedClients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto pt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 pl-1 font-medium",
								children: "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Revenue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right pr-1 font-medium",
								children: "% of Top 5"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border/40 text-xs",
						children: sortedClients.map((client, idx) => {
							const revenueVal = Number(client.revenue) || 0;
							const sharePct = totalRevenue > 0 ? revenueVal / totalRevenue * 100 : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-alt/40 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 pl-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground truncate max-w-[160px] sm:max-w-[200px]",
											title: client.name,
											children: client.name
										}), client.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-text-tertiary truncate",
											children: client.category
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 text-right font-num tabular-nums font-semibold text-foreground",
										children: formatINR(revenueVal, { compact: true })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 text-right pr-1 font-num tabular-nums text-text-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [sharePct.toFixed(1), "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-1.5 rounded-full bg-surface-alt overflow-hidden hidden sm:block",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full bg-primary rounded-full transition-all duration-500 ease-out",
													style: { width: `${Math.min(sharePct, 100)}%` }
												})
											})]
										})
									})
								]
							}, client.id || idx);
						})
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-9 px-4 rounded-xl bg-surface-alt/30 border border-border/40 flex flex-col items-center justify-center text-center space-y-2.5 my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "w-7 h-7 text-text-tertiary/50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground/80",
							children: "No client revenue recorded yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-text-tertiary max-w-xs leading-relaxed",
							children: "Client accounts and revenue contributions will populate here when recorded."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cfo/clients",
						className: "text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ Record First Client" })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Relative share among top accounts" }), sortedClients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[10px] text-text-secondary",
				children: [formatINR(totalRevenue, { compact: true }), " combined"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px]",
				children: "Awaiting records"
			})]
		})]
	});
};
/**
* Copies a single field in the required format: "Label: value"
*/
async function copySingleField(label, value) {
	if (value === null || value === void 0 || value === "") {
		toast.error(`No ${label.toLowerCase()} available to copy`);
		return false;
	}
	const text = `${label}: ${String(value).trim()}`;
	try {
		await navigator.clipboard.writeText(text);
		toast.success(`Copied ${label}`);
		return true;
	} catch (err) {
		toast.error("Failed to copy to clipboard");
		return false;
	}
}
/**
* Copies an entire block with a header line plus every visible field, one per line:
* [Company Name] — [Block Title]
* Label: value
* Label: value
*/
async function copyBlock(companyName, blockTitle, fields) {
	const visibleFields = fields.filter((f) => f.value !== null && f.value !== void 0 && String(f.value).trim() !== "" && String(f.value).trim() !== "—");
	if (visibleFields.length === 0) {
		toast.error(`No details available to copy for ${blockTitle}`);
		return false;
	}
	const fullText = [`${(companyName || "Company").trim()} — ${blockTitle.trim()}`, ...visibleFields.map((f) => `${f.label}: ${String(f.value).trim()}`)].join("\n");
	try {
		await navigator.clipboard.writeText(fullText);
		toast.success(`Copied ${blockTitle}`);
		return true;
	} catch (err) {
		toast.error("Failed to copy to clipboard");
		return false;
	}
}
var BankDetailsCard = () => {
	const { data: onboardingData, isLoading: isOnboardingLoading } = useOnboardingStatus();
	const { data: profile } = useCompanyProfile();
	const { data: reportData, isLoading: isReportLoading } = useSpendingReport();
	const [copiedKey, setCopiedKey] = (0, import_react.useState)(null);
	const [showFullAccount, setShowFullAccount] = (0, import_react.useState)(false);
	const companyName = profile?.company_name || onboardingData?.general_info?.company_name || "Company";
	const financial = onboardingData?.financial_info;
	const metadata = reportData?.section_1_header_metadata;
	const extractedBank = metadata?.bank_name?.trim() || null;
	const rawAccountNumber = metadata?.account_number?.trim() || null;
	const maskedAccountNumber = rawAccountNumber ? `•••• ${rawAccountNumber.slice(-4)}` : null;
	const ifscCode = metadata?.ifsc_code_branch?.trim() || null;
	const accountHolder = metadata?.account_holder_name?.trim() || null;
	const accountType = metadata?.account_type || "Current Account";
	const primaryBank = extractedBank || financial?.primary_bank?.trim() || null;
	const numberOfAccounts = financial?.number_of_accounts ?? null;
	const hasTierB = Boolean(maskedAccountNumber || ifscCode || accountHolder);
	const hasTierA = Boolean(primaryBank || numberOfAccounts !== null && numberOfAccounts > 0);
	const hasAnyBankData = hasTierA || hasTierB;
	const handleCopyField = async (label, value, key) => {
		if (await copySingleField(label, value)) {
			setCopiedKey(key);
			setTimeout(() => setCopiedKey(null), 1600);
		}
	};
	const handleCopyBlock = async () => {
		if (await copyBlock(companyName, "Bank Details", [
			{
				label: "Primary Bank",
				value: primaryBank
			},
			{
				label: "Account Type",
				value: accountType
			},
			{
				label: "Account Number",
				value: rawAccountNumber || maskedAccountNumber
			},
			{
				label: "IFSC Code",
				value: ifscCode
			},
			{
				label: "Account Holder",
				value: accountHolder
			},
			...numberOfAccounts ? [{
				label: "Total Accounts",
				value: numberOfAccounts
			}] : []
		])) {
			setCopiedKey("block");
			setTimeout(() => setCopiedKey(null), 1600);
		}
	};
	if (isOnboardingLoading && isReportLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/80 shadow-xs bg-surface rounded-xl p-6 sm:p-7 flex flex-col justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-36" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 w-full rounded-lg" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-24 rounded mt-6" })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full border border-border/80 shadow-xs bg-surface rounded-xl flex flex-col justify-between p-6 sm:p-7 group hover:border-border transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-xl font-bold tracking-tight text-foreground font-display",
						children: "Bank Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-text-tertiary mt-0.5 font-medium flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-success shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Institutional accounts & settlement infrastructure" })]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [hasAnyBankData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleCopyBlock,
						className: "h-8 px-2.5 text-xs text-text-secondary hover:text-foreground border-border/70 cursor-pointer flex items-center gap-1.5",
						title: "Copy all bank details",
						children: copiedKey === "block" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copied" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Copy All"
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/spending",
						className: "h-8 px-2.5 text-xs font-medium text-primary hover:text-primary/80 border border-primary/20 hover:border-primary/40 bg-primary/5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer",
						title: "Connect bank statement or account",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Link Bank"
						})]
					})]
				})]
			}), hasAnyBankData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-xl bg-surface-alt/60 border border-border/60 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-foreground",
									children: primaryBank || "Primary Operating Account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-text-tertiary font-medium",
									children: accountType
								})] })]
							}), hasTierB ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Live Synced"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), " Statement Pending"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/40 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-2 rounded-lg bg-surface/70 border border-border/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5 min-w-0 pr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block",
											children: "Account No."
										}), showFullAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-in fade-in duration-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-2.5 h-2.5" }), " Full View"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-foreground truncate block select-all",
										children: showFullAccount ? rawAccountNumber || "In Onboarding" : maskedAccountNumber || "•••• In Onboarding"
									})]
								}), (rawAccountNumber || maskedAccountNumber) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-0.5 shrink-0",
									children: [rawAccountNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowFullAccount((prev) => !prev),
										className: "p-1 rounded text-text-tertiary hover:text-foreground hover:bg-surface-alt active:scale-90 transition-all cursor-pointer",
										title: showFullAccount ? "Mask account number" : "Show full account number",
										"aria-label": showFullAccount ? "Mask account number" : "Show full account number",
										children: showFullAccount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleCopyField("Account Number", rawAccountNumber || maskedAccountNumber, "acc"),
										className: "p-1 rounded text-text-tertiary hover:text-foreground hover:bg-surface-alt active:scale-90 transition-all cursor-pointer",
										title: "Copy full account number",
										"aria-label": "Copy full account number",
										children: copiedKey === "acc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-2 rounded-lg bg-surface/70 border border-border/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5 min-w-0 pr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block",
										children: "IFSC Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-foreground truncate block",
										children: ifscCode || "Declared in Onboarding"
									})]
								}), ifscCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleCopyField("IFSC Code", ifscCode, "ifsc"),
									className: "p-1 rounded text-text-tertiary hover:text-foreground hover:bg-surface-alt active:scale-90 transition-all cursor-pointer shrink-0",
									"aria-label": "Copy IFSC code",
									children: copiedKey === "ifsc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
								})]
							})]
						}),
						accountHolder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-xs pt-0.5 text-text-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Beneficiary / Holder:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground truncate max-w-50",
								title: accountHolder,
								children: accountHolder
							})]
						})
					]
				}), numberOfAccounts !== null && numberOfAccounts > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-xl bg-surface-alt/40 border border-border/50 flex items-center justify-between gap-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-3.5 h-3.5 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [
									numberOfAccounts - 1,
									" Additional Operating ",
									numberOfAccounts - 1 === 1 ? "Account" : "Accounts"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-text-tertiary",
							children: "Connected in company onboarding · Awaiting statement upload"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/spending",
						className: "text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sync Statement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3" })]
					})]
				}) : null]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-10 px-4 rounded-xl bg-surface-alt/40 border border-dashed border-border/70 flex flex-col items-center justify-center text-center space-y-2 my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-8 h-8 text-text-tertiary/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground/80",
						children: "No bank details added yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-tertiary max-w-xs leading-relaxed",
						children: "Bank accounts and settlement details will appear here once connected."
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showFullAccount ? "Executive Unmasked View" : "Masked for privacy" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px]",
				children: hasTierB ? "Bank-Grade Encryption · Verified Statement" : hasTierA ? "Bank-Grade Encryption · Declared Setup" : "Unverified"
			})]
		})]
	});
};
var KeyInformationCard = () => {
	const { data: profile, isLoading: isProfileLoading } = useCompanyProfile();
	const { data: onboardingData, isLoading: isOnboardingLoading } = useOnboardingStatus();
	const [copiedKey, setCopiedKey] = (0, import_react.useState)(null);
	const general = onboardingData?.general_info;
	const companyName = profile?.company_name || general?.company_name || "Company";
	const gstin = profile?.gst || general?.gstin?.trim() || null;
	const cin = general?.cin?.trim() || null;
	const pan = profile?.pan || general?.business_pan?.trim() || null;
	const udyam = general?.udyam_number?.trim() || null;
	const bType = (general?.business_type || general?.business_category || "").toLowerCase();
	const isExplicitNonCorporate = Boolean(bType && !bType.includes("limited") && !bType.includes("ltd") && (bType.includes("proprietorship") || bType.includes("partnership") || bType.includes("llp") || bType.includes("individual")));
	const displayCin = cin || (isExplicitNonCorporate ? "N/A (Non-corporate)" : "—");
	const handleCopyField = async (label, value, key) => {
		if (await copySingleField(label, value)) {
			setCopiedKey(key);
			setTimeout(() => setCopiedKey(null), 1600);
		}
	};
	const handleCopyBlock = async () => {
		if (await copyBlock(companyName, "Statutory Identifiers", [
			{
				label: "GSTIN",
				value: gstin
			},
			{
				label: "CIN",
				value: cin || (isExplicitNonCorporate ? "N/A (Non-corporate)" : null)
			},
			{
				label: "PAN",
				value: pan
			},
			...udyam ? [{
				label: "UDYAM",
				value: udyam
			}] : []
		])) {
			setCopiedKey("block");
			setTimeout(() => setCopiedKey(null), 1600);
		}
	};
	const activeCount = [
		gstin,
		cin,
		pan,
		udyam
	].filter(Boolean).length;
	const hasAnyKeyInfo = Boolean(gstin || cin || pan || udyam);
	if (isProfileLoading && isOnboardingLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border border-border/80 shadow-xs bg-surface rounded-xl p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between pb-4 border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-9 h-9 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-44" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-64" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-lg" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-xl" })
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"aria-labelledby": "key-information-heading",
		className: "border border-border/80 shadow-xs bg-surface rounded-xl p-5 sm:p-6 transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						id: "key-information-heading",
						className: "text-base sm:text-lg font-bold tracking-tight text-foreground font-display",
						children: "Key Information"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20 px-2 py-0.5",
						children: activeCount > 0 ? `${activeCount} Verified Identifiers` : "Statutory Records"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-tertiary mt-0.5 font-medium",
					children: "Official corporate registration, tax identification numbers, and compliance filings"
				})] })]
			}), hasAnyKeyInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: handleCopyBlock,
				className: `h-8 px-3 text-xs border-border/70 cursor-pointer self-start sm:self-auto flex items-center gap-1.5 shrink-0 active:scale-95 transition-all duration-200 ${copiedKey === "block" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" : "text-text-secondary hover:text-foreground hover:bg-surface-alt"}`,
				title: "Copy all statutory credentials to clipboard",
				children: copiedKey === "block" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-emerald-600 dark:text-emerald-400",
					children: [activeCount, " Records Copied"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy All" })] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground tracking-wide block",
							children: "GSTIN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-text-tertiary font-medium block",
							children: "Goods & Services Tax"
						})] }), gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleCopyField("GSTIN", gstin, "gstin"),
							className: "p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0",
							title: "Copy GSTIN",
							"aria-label": "Copy GSTIN",
							children: copiedKey === "gstin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 pt-2.5 border-t border-border/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-xs sm:text-sm tracking-tight block truncate ${gstin ? "font-bold text-foreground select-all" : "text-text-tertiary font-normal"}`,
							children: gstin || "Not configured"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground tracking-wide block",
							children: "CIN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-text-tertiary font-medium block",
							children: "Corporate Identity"
						})] }), cin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleCopyField("CIN", cin, "cin"),
							className: "p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0",
							title: "Copy CIN",
							"aria-label": "Copy CIN",
							children: copiedKey === "cin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 pt-2.5 border-t border-border/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-xs sm:text-sm tracking-tight block truncate ${cin ? "font-bold text-foreground select-all" : isExplicitNonCorporate ? "text-text-tertiary font-medium text-xs" : "text-text-tertiary font-normal"}`,
							children: displayCin
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground tracking-wide block",
							children: "PAN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-text-tertiary font-medium block",
							children: "Income Tax ID"
						})] }), pan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleCopyField("PAN", pan, "pan"),
							className: "p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0",
							title: "Copy PAN",
							"aria-label": "Copy PAN",
							children: copiedKey === "pan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 pt-2.5 border-t border-border/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-xs sm:text-sm tracking-tight block truncate ${pan ? "font-bold text-foreground select-all" : "text-text-tertiary font-normal"}`,
							children: pan || "Not configured"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground tracking-wide block",
							children: "UDYAM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-text-tertiary font-medium block",
							children: "MSME Registration"
						})] }), udyam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleCopyField("UDYAM", udyam, "udyam"),
							className: "p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0",
							title: "Copy UDYAM number",
							"aria-label": "Copy UDYAM number",
							children: copiedKey === "udyam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 pt-2.5 border-t border-border/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-xs sm:text-sm tracking-tight block truncate ${udyam ? "font-bold text-foreground select-all" : "text-text-tertiary font-normal"}`,
							children: udyam || "Optional / Not registered"
						})
					})]
				})
			]
		})]
	});
};
var CompanyRatingCard = ({ hasProfile = true }) => {
	const navigate = useNavigate();
	const { data, isLoading, isError, error, refetch, isFetching } = useCompanyRating({ enabled: hasProfile });
	const formatSourceName = (src) => {
		return {
			glassdoor: "Glassdoor",
			ambitionbox: "AmbitionBox",
			crisil: "CRISIL",
			justdial: "Justdial",
			finology: "Finology"
		}[src.toLowerCase()] || src.charAt(0).toUpperCase() + src.slice(1);
	};
	const overallScore = typeof data?.overall_score === "number" ? data.overall_score : typeof data?.overall === "number" ? data.overall / 20 : Number(data?.overall_score) || 0;
	const overallGrade = data?.overall_grade?.trim() || "—";
	const sources = Array.isArray(data?.sources) ? data.sources : [];
	const getGradeBadgeStyle = () => {
		return "bg-card text-foreground border-border/80";
	};
	const dimensions = data ? [
		{
			key: "employee_experience",
			label: "Employee Experience",
			score: typeof data.employee_experience === "number" ? data.employee_experience : 0
		},
		{
			key: "creditworthiness",
			label: "Creditworthiness",
			score: typeof data.creditworthiness === "number" ? data.creditworthiness : 0
		},
		{
			key: "client_satisfaction",
			label: "Client Satisfaction",
			score: typeof data.client_satisfaction === "number" ? data.client_satisfaction : 0
		},
		{
			key: "stock_quality",
			label: "Stock Quality",
			score: typeof data.stock_quality === "number" ? data.stock_quality : 0
		}
	] : [];
	const maxScore = dimensions.length > 0 ? Math.max(...dimensions.map((d) => d.score)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-112.5 flex flex-col border border-border/80 shadow-2xs bg-card rounded-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-3 pt-5 px-5 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base font-bold tracking-tight font-display text-foreground",
					children: "Reputation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-tertiary mt-0.5 font-medium",
					children: "Public reputation & external market synthesis"
				})] }), hasProfile && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => refetch(),
					disabled: isFetching,
					className: "text-text-tertiary hover:text-foreground hover:bg-surface-alt p-1.5 rounded-md transition-all active:scale-90 cursor-pointer disabled:opacity-40",
					title: "Refresh public rating synthesis",
					"aria-label": "Refresh public rating synthesis",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("w-3.5 h-3.5 transition-transform", isFetching && "animate-spin text-primary") })
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "flex-1 flex flex-col justify-between px-5 sm:px-6 pb-5 pt-0",
			children: isLoading || hasProfile && isFetching && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col justify-between space-y-4 pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-lg bg-surface-alt/40 border border-border/50 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-28" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-16 ml-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-12 ml-auto rounded" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-16" })]
						}), [
							1,
							2,
							3,
							4
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-1.5 w-24 rounded-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-12" })]
							})]
						}, i))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border/40 space-y-2 mt-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16 rounded-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-20 rounded-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-14 rounded-md" })
							]
						})]
					})
				]
			}) : !hasProfile || isError && isSetupRequiredError(error) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-xl bg-surface-alt border border-border/70 text-text-secondary flex items-center justify-center shadow-2xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-6 h-6 text-text-secondary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-sm text-foreground",
							children: "Score Unlocks with Profile"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Complete company setup and statutory registration to generate your external rating scorecard."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => navigate({ to: "/onboarding" }),
						className: "rounded-lg text-xs font-semibold gap-1.5 cursor-pointer mt-1 hover:border-primary/40 hover:bg-primary/5",
						children: ["Complete Setup ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
					})
				]
			}) : isError || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-3.5 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-11 h-11 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "Unable to Load Scorecard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Server error while retrieving external market synthesis."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => refetch(),
						className: "cursor-pointer text-xs",
						children: "Retry Calculation"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col justify-between space-y-4 pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-lg bg-surface-alt/40 border border-border/60 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-text-tertiary font-mono block",
								children: "Overall Score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-bold font-mono tracking-tight tabular-nums text-foreground",
									children: overallScore.toFixed(2)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-mono text-text-tertiary font-medium",
									children: "/ 5.0"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-text-tertiary font-mono block",
								children: "Rating Grade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("inline-flex items-center justify-center px-3 py-1 rounded shadow-2xs border font-mono font-bold tracking-wider text-sm", getGradeBadgeStyle()),
								children: overallGrade
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-text-tertiary px-1 pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rating Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline-block font-mono text-[9px] text-text-tertiary",
									children: "Scale (0 — 5)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-14 text-right font-mono",
									children: "Score"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border/40 border-y border-border/60",
							children: dimensions.map((dim) => {
								const scoreVal = typeof dim.score === "number" ? dim.score : 0;
								const isTop = scoreVal === maxScore && maxScore > 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group/row py-2.5 px-1.5 -mx-1 rounded-md flex items-center justify-between gap-3 hover:bg-primary/[0.03] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-foreground block truncate group-hover/row:text-primary transition-colors",
											children: dim.label
										}), isTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-mono px-1.5 py-0.2 rounded bg-primary/10 text-primary font-medium tracking-tight uppercase shrink-0",
											children: "Leading"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-20 sm:w-28 flex items-center gap-1",
											"aria-label": `${dim.label} score ${scoreVal.toFixed(1)} out of 5`,
											role: "meter",
											"aria-valuenow": scoreVal,
											"aria-valuemin": 0,
											"aria-valuemax": 5,
											children: [
												1,
												2,
												3,
												4,
												5
											].map((step) => {
												const stepFill = Math.min(Math.max((scoreVal - (step - 1)) * 100, 0), 100);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex-1 h-1 bg-border/60 rounded-xs overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: cn("h-full transition-all duration-300", isTop ? "bg-primary group-hover/row:bg-primary-hi" : "bg-primary/80 group-hover/row:bg-primary"),
														style: { width: `${stepFill}%` }
													})
												}, step);
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-14 text-right font-mono tabular-nums text-xs font-semibold text-foreground group-hover/row:text-primary transition-colors",
											children: [scoreVal.toFixed(1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-normal text-text-tertiary ml-0.5",
												children: "/5.0"
											})]
										})]
									})]
								}, dim.key);
							})
						})]
					}),
					sources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border/50 space-y-1.5 mt-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-text-tertiary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "External Evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[9px] font-normal lowercase tracking-normal",
								children: [sources.length, " sources synthesized"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-text-secondary font-medium leading-relaxed",
							children: sources.map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/90 font-medium",
								children: formatSourceName(src)
							}), idx < sources.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-text-tertiary mx-1.5 select-none font-normal",
								children: "·"
							})] }, src))
						})]
					})
				]
			})
		})]
	});
};
var CompanyNewsCard = ({ hasProfile = true }) => {
	const navigate = useNavigate();
	const { data, isLoading, isError, error, refetch, isFetching } = useCompanyNews({ enabled: hasProfile });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-112.5 flex flex-col border border-border/70 shadow-sm bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center justify-between text-lg font-bold tracking-tight font-display text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Company News" })]
				}), hasProfile && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => refetch(),
					disabled: isFetching,
					className: "p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer",
					title: "Refresh News",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 ${isFetching ? "animate-spin" : ""}` })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-tertiary mt-1 font-medium",
				children: "Curated market and industry intelligence feeds"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "flex-1 overflow-hidden p-0 px-6 pb-6 flex flex-col justify-between",
			children: isLoading || hasProfile && isFetching && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full rounded-xl" })]
			}) : !hasProfile || isError && isSetupRequiredError(error) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "Curated Industry News"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Market trends and relevant company news will be aggregated automatically once your industry is configured."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => navigate({ to: "/onboarding" }),
						className: "rounded-pill text-xs font-semibold gap-1.5 cursor-pointer mt-1",
						children: ["Complete Setup ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
					})
				]
			}) : isError || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-3.5 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "Could not load news"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Server error while fetching news feeds."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => refetch(),
						className: "cursor-pointer",
						children: "Try again"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 h-full overflow-y-auto pr-1 pt-2 custom-scrollbar",
				children: data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center p-6 text-muted-foreground text-xs my-auto",
					children: "No recent news found for this company or industry."
				}) : data.map((news) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group p-3.5 rounded-xl border border-border/50 bg-card hover:bg-muted/30 hover:border-indigo-500/25 hover:-translate-y-0.5 transition-all duration-200 space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "text-[10px] font-semibold px-2 py-0 border-indigo-500/25 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400",
								children: news.source
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-medium font-mono text-text-tertiary",
								children: news.date
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold text-xs leading-snug group-hover:text-primary transition-colors line-clamp-2 text-foreground",
							children: news.headline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-text-secondary line-clamp-2 leading-relaxed",
							children: news.summary
						})
					]
				}, news.id))
			})
		})]
	});
};
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
/**
* Defensive URL normalizer: ensures valid http/https scheme and strips dangerous protocols.
*/
function sanitizeUrl(rawUrl) {
	try {
		const trimmed = rawUrl.trim();
		if (!trimmed) return null;
		const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
		const parsed = new URL(withProtocol);
		if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
		return null;
	} catch {
		return null;
	}
}
/**
* Generates reliable external intelligence and due-diligence research destinations.
*/
function buildResearchLinks(name, rawWebsite) {
	const q = encodeURIComponent(name.trim());
	const validWebsite = rawWebsite ? sanitizeUrl(rawWebsite) : null;
	const links = [];
	if (validWebsite) links.push({
		id: "official-website",
		label: "Official Website",
		category: "Corporate",
		href: validWebsite,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
		external: true
	});
	links.push({
		id: "google-search",
		label: "Company Overview",
		category: "Search",
		href: `https://www.google.com/search?q=${q}`,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }),
		external: true
	}, {
		id: "linkedin",
		label: "Team & Leadership",
		category: "Professional Network",
		href: `https://www.linkedin.com/search/results/companies/?keywords=${q}`,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }),
		external: true
	}, {
		id: "google-news",
		label: "Recent News",
		category: "Media Coverage",
		href: `https://www.google.com/search?q=${q}&tbm=nws`,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }),
		external: true
	}, {
		id: "crunchbase",
		label: "Financials & Filings",
		category: "Market Data",
		href: `https://www.crunchbase.com/textsearch?q=${q}`,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }),
		external: true
	}, {
		id: "wikipedia",
		label: "Background",
		category: "Reference",
		href: `https://en.wikipedia.org/wiki/Special:Search?search=${q}`,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }),
		external: true
	});
	return links;
}
/**
* Returns clean, safe monogram initials (up to 2 characters).
*/
function getMonogram(name) {
	const cleaned = name.trim().replace(/[^\w\s]/gi, "");
	if (!cleaned) return "CO";
	const words = cleaned.split(/\s+/).filter(Boolean);
	if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
	return (words[0][0] + words[1][0]).toUpperCase();
}
var CompetitorDetailDialog = ({ competitor, open, onClose }) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const shouldReduceMotion = useReducedMotion();
	if (!competitor) return null;
	const links = buildResearchLinks(competitor.name, competitor.website);
	const monogram = getMonogram(competitor.name);
	const handleCopySummary = async () => {
		const textToCopy = [
			`Competitor: ${competitor.name}`,
			competitor.location ? `Location: ${competitor.location}` : null,
			competitor.market_cap ? `Valuation/Scale: ${competitor.market_cap}` : null,
			competitor.services ? `Services: ${competitor.services}` : null,
			competitor.overlap_summary ? `Market Overlap: ${competitor.overlap_summary}` : null,
			competitor.website ? `Website: ${competitor.website}` : null
		].filter(Boolean).join("\n");
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			setCopied(false);
		}
	};
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : .04,
				delayChildren: shouldReduceMotion ? 0 : .02
			}
		}
	};
	const itemVariants = {
		hidden: {
			opacity: 0,
			y: shouldReduceMotion ? 0 : 6
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl w-[94vw] sm:w-full p-0 gap-0 overflow-hidden rounded-2xl border border-border/80 shadow-e2 bg-card max-h-[90vh] flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "px-6 py-5 border-b border-border/50 shrink-0 bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4 pr-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": "true",
								className: "w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm border border-primary/20 select-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-bold font-display tracking-tight",
									children: monogram
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
										className: "text-lg font-bold font-display text-foreground tracking-tight truncate max-w-sm sm:max-w-md",
										children: competitor.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "bg-primary/5 text-primary border-primary/20 text-[10px] font-semibold tracking-wide py-0 h-4.5",
										children: "Direct Competitor"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5 mt-1 text-xs text-text-tertiary flex-wrap",
										children: [competitor.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate max-w-64",
												children: competitor.location
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-3.5 h-3.5 text-text-tertiary shrink-0" }), "Enterprise Peer"]
										}), competitor.market_cap && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-num text-[11px] text-text-secondary bg-surface-alt px-1.5 py-0.5 rounded border border-border/60",
											children: competitor.market_cap
										})] })]
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1.5 shrink-0 pt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleCopySummary,
								className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-foreground bg-surface-alt/70 hover:bg-surface-alt border border-border/60 transition-colors cursor-pointer",
								title: "Copy competitor brief to clipboard",
								"aria-label": "Copy competitor summary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									initial: false,
									children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
										initial: {
											scale: .8,
											opacity: 0
										},
										animate: {
											scale: 1,
											opacity: 1
										},
										exit: {
											scale: .8,
											opacity: 0
										},
										className: "inline-flex items-center gap-1 text-success",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline text-[11px]",
											children: "Copied"
										})]
									}, "checked") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
										initial: {
											scale: .8,
											opacity: 0
										},
										animate: {
											scale: 1,
											opacity: 1
										},
										exit: {
											scale: .8,
											opacity: 0
										},
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline text-[11px]",
											children: "Copy Brief"
										})]
									}, "copy")
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: containerVariants,
					initial: "hidden",
					animate: "visible",
					className: "px-6 py-5 space-y-5 overflow-y-auto custom-scrollbar flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: itemVariants,
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-3.5 h-3.5 text-primary" }), "Strategic Market Overlap"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-text-tertiary",
									children: "Peer Analysis"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 rounded-xl bg-primary/3 dark:bg-primary/6 border border-primary/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-foreground/90 leading-relaxed font-sans wrap-break-word",
									children: competitor.overlap_summary || competitor.description || "Direct commercial competitor targeting equivalent enterprise client demographics with overlapping capability sets."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: itemVariants,
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-3.5 h-3.5 text-text-tertiary" }), "Products & Service Coverage"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 rounded-xl bg-surface-alt/40 border border-border/70",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-text-secondary leading-relaxed wrap-break-word",
									children: competitor.services || "Broad-spectrum commercial service operations in active domestic segments."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: itemVariants,
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "w-3.5 h-3.5 text-text-tertiary" }), "Due Diligence & External Records"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-text-tertiary",
									children: "Opens in new tab"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5",
								children: links.map((link) => {
									const isOfficial = link.id === "official-website";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: link.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `group flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isOfficial ? "bg-primary/5 hover:bg-primary/10 border-primary/25 hover:border-primary/40 shadow-xs" : "bg-surface hover:bg-surface-alt/70 border-border/70 hover:border-primary/30"} hover:-translate-y-0.5`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 min-w-0 pr-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isOfficial ? "bg-primary/10 text-primary" : "bg-muted text-text-tertiary"}`,
												children: link.icon
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `text-xs font-semibold truncate ${isOfficial ? "text-primary" : "text-foreground"}`,
													children: link.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-text-tertiary truncate",
													children: link.category
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3 text-text-tertiary/70 group-hover:text-primary transition-colors shrink-0" })]
									}, link.id);
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-3 border-t border-border/50 shrink-0 flex items-center justify-between text-[11px] text-text-tertiary bg-surface-alt/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spotlite Intelligence Feed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-border",
								children: "•"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Synthesized cross-source benchmarking" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-mono text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "px-1.5 py-0.5 rounded bg-muted border border-border/80 text-text-tertiary",
							children: "ESC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-text-tertiary",
							children: "to close"
						})]
					})]
				})
			]
		})
	});
};
var CompetitorsCard = ({ hasProfile = true }) => {
	const navigate = useNavigate();
	const { data, isLoading, isError, error, refetch, isFetching } = useCompetitors({ enabled: hasProfile });
	const [selected, setSelected] = (0, import_react.useState)(null);
	const competitors = data?.competitors ?? [];
	const rawText = data?.rawText;
	const isFallback = Boolean(data?.isFallback);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-112.5 flex flex-col border border-border/70 shadow-sm bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-3 border-b border-border/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-lg font-bold tracking-tight font-display text-foreground",
						children: "Competitors"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-tertiary mt-0.5 font-medium",
						children: "Click any competitor for details and research links"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [hasProfile && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => refetch(),
						disabled: isFetching,
						className: "p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer",
						title: "Refresh Competitors",
						"aria-label": "Refresh Competitors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 ${isFetching ? "animate-spin" : ""}` })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: isFallback ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-semibold" : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-[10px] font-semibold flex items-center gap-1",
						children: isFallback ? "Sector Benchmark" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), " AI Synthesis"] })
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex-1 flex flex-col justify-between p-5 overflow-hidden",
			children: [isLoading || hasProfile && isFetching && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-xl" })
				]
			}) : !hasProfile || isError && isSetupRequiredError(error) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "Competitor Benchmarking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Complete your business profile to activate automated competitor discovery and market overlap insights."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => navigate({ to: "/onboarding" }),
						className: "rounded-pill text-xs font-semibold gap-1.5 cursor-pointer mt-1",
						children: ["Complete Profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
					})
				]
			}) : isError || !data && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-3.5 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "Could not load competitors"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: error?.message || "Server error while fetching competitive intelligence."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => refetch(),
						className: "cursor-pointer text-xs",
						children: "Try again"
					})
				]
			}) : competitors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5 overflow-y-auto custom-scrollbar pr-1",
				children: competitors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSelected(item),
					className: "w-full text-left p-3.5 rounded-xl bg-surface-alt/40 border border-border/60 hover:border-purple-500/30 hover:bg-surface-alt/70 hover:-translate-y-0.5 transition-all duration-200 space-y-2 cursor-pointer group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-bold text-foreground font-display truncate",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 shrink-0",
								children: [
									item.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-[11px] text-text-tertiary px-2 py-0.5 rounded-md bg-muted/50 border border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate max-w-28",
											children: item.location
										})]
									}),
									item.market_cap && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-num tabular-nums px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 font-medium",
										children: item.market_cap
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })
								]
							})]
						}),
						item.services && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-1.5 text-xs text-text-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-1 font-medium",
								children: item.services
							})]
						}),
						(item.overlap_summary || item.description) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary leading-relaxed line-clamp-2",
							children: item.overlap_summary || item.description
						})
					]
				}, item.id))
			}) : rawText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto custom-scrollbar p-3.5 rounded-xl bg-surface-alt/40 border border-border/60 text-xs text-text-secondary leading-relaxed space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-foreground font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-purple-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Competitor Intelligence Analysis" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose prose-xs dark:prose-invert max-w-none text-xs text-text-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: rawText })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center space-y-3 h-full my-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-13 h-13 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "No Competitors Identified"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Automated peer tracking did not find direct competitors. Click below to refresh the search."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => refetch(),
						className: "cursor-pointer text-xs",
						children: "Scan Competitors"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isFallback ? "Sector benchmark models" : "AI web competitive intelligence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click a card to explore" })]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetitorDetailDialog, {
		competitor: selected,
		open: selected !== null,
		onClose: () => setSelected(null)
	})] });
};
var Business360Page = () => {
	const { data: profile, isError } = useCompanyProfile();
	const [activeTab, setActiveTab] = (0, import_react.useState)("news");
	const shouldReduceMotion = useReducedMotion();
	const queryClient = useQueryClient();
	const { user } = useAuth();
	(0, import_react.useEffect)(() => {
		if (user?.business_id) queryClient.prefetchQuery(developmentsQueryOptions(user.business_id));
	}, [queryClient, user?.business_id]);
	const hasProfile = Boolean(profile && !isError);
	(0, import_react.useEffect)(() => {
		if (!hasProfile) return;
		queryClient.prefetchQuery(competitorsQueryOptions);
	}, [hasProfile, queryClient]);
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : .06,
				delayChildren: .02
			}
		}
	};
	const itemVariants = {
		hidden: {
			opacity: 0,
			y: shouldReduceMotion ? 0 : 10
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? .15 : .35,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: containerVariants,
		initial: "hidden",
		animate: "show",
		className: "w-full max-w-7xl mx-auto space-y-7 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
				variants: itemVariants,
				className: "space-y-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-extrabold tracking-tight text-foreground font-display",
							children: "Business 360"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-text-secondary max-w-2xl leading-relaxed",
							children: "Unified executive intelligence hub for workforce governance, financial infrastructure, and company compliance."
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: itemVariants,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingProgressBanner, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
				variants: itemVariants,
				"aria-labelledby": "zone-identity-heading",
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "zone-identity-heading",
					className: "sr-only",
					children: "Company Identity and Offerings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7 xl:col-span-8 flex flex-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5 xl:col-span-4 flex flex-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferingsCard, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: itemVariants,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyPersonnelSection, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
				variants: itemVariants,
				"aria-labelledby": "zone-infrastructure-heading",
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "zone-infrastructure-heading",
					className: "sr-only",
					children: "Relationships and Infrastructure"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopClientsCard, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankDetailsCard, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: itemVariants,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyInformationCard, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
				variants: itemVariants,
				"aria-labelledby": "zone-context-heading",
				className: "space-y-4 pt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "zone-context-heading",
							className: "text-base sm:text-lg font-bold tracking-tight text-foreground font-display",
							children: "Market Context & Intelligence Feeds"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-tertiary mt-0.5 font-medium",
							children: "Curated feeds and automated peer benchmarking (external synthesis)"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "tablist",
							"aria-label": "Market context feeds",
							className: "relative flex items-center bg-surface-alt/70 border border-border/50 p-1 h-9 shrink-0 rounded-lg",
							onKeyDown: (e) => {
								if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
									e.preventDefault();
									setActiveTab((prev) => prev === "news" ? "competitors" : "news");
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "tab",
								id: "tab-news",
								"aria-controls": "panel-news",
								"aria-selected": activeTab === "news",
								onClick: () => setActiveTab("news"),
								className: cn("relative z-10 text-xs px-3.5 py-1 font-medium transition-colors cursor-pointer rounded-md select-none outline-none focus-visible:ring-2 focus-visible:ring-ring", activeTab === "news" ? "text-primary font-semibold" : "text-text-secondary hover:text-foreground"),
								children: [activeTab === "news" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "activeMarketTabPill",
									className: "absolute inset-0 rounded-md bg-card shadow-xs",
									style: { zIndex: -1 },
									transition: shouldReduceMotion ? { duration: 0 } : {
										type: "spring",
										stiffness: 450,
										damping: 32
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Market News" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "tab",
								id: "tab-competitors",
								"aria-controls": "panel-competitors",
								"aria-selected": activeTab === "competitors",
								onClick: () => setActiveTab("competitors"),
								className: cn("relative z-10 text-xs px-3.5 py-1 font-medium transition-colors cursor-pointer rounded-md select-none outline-none focus-visible:ring-2 focus-visible:ring-ring", activeTab === "competitors" ? "text-purple-600 dark:text-purple-400 font-semibold" : "text-text-secondary hover:text-foreground"),
								children: [activeTab === "competitors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "activeMarketTabPill",
									className: "absolute inset-0 rounded-md bg-card shadow-xs",
									style: { zIndex: -1 },
									transition: shouldReduceMotion ? { duration: 0 } : {
										type: "spring",
										stiffness: 450,
										damping: 32
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Peer Benchmarks" })]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:flex-row gap-6 items-stretch mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full lg:w-[35%] lg:shrink-0 flex flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyRatingCard, { hasProfile })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full lg:flex-1 min-w-0 flex flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: activeTab === "news" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									role: "tabpanel",
									id: "panel-news",
									"aria-labelledby": "tab-news",
									initial: {
										opacity: 0,
										x: shouldReduceMotion ? 0 : -8
									},
									animate: {
										opacity: 1,
										x: 0
									},
									exit: {
										opacity: 0,
										x: shouldReduceMotion ? 0 : 8
									},
									transition: {
										duration: .18,
										ease: [
											.16,
											1,
											.3,
											1
										]
									},
									className: "h-full flex flex-col",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyNewsCard, { hasProfile })
								}, "news") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									role: "tabpanel",
									id: "panel-competitors",
									"aria-labelledby": "tab-competitors",
									initial: {
										opacity: 0,
										x: shouldReduceMotion ? 0 : 8
									},
									animate: {
										opacity: 1,
										x: 0
									},
									exit: {
										opacity: 0,
										x: shouldReduceMotion ? 0 : -8
									},
									transition: {
										duration: .18,
										ease: [
											.16,
											1,
											.3,
											1
										]
									},
									className: "h-full flex flex-col",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetitorsCard, { hasProfile })
								}, "competitors")
							})
						})]
					})]
				})
			})
		]
	});
};
var SplitComponent = Business360Page;
//#endregion
export { SplitComponent as component };

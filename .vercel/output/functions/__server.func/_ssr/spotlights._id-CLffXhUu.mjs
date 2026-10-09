import { t as cn } from "./utils-BkRapwZn.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Gn as ArrowRight, Kn as ArrowLeft, Mn as Building2, Ut as FileText, an as Copy, cn as Clock, gn as CircleCheck, t as Zap, wn as Check } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { H as snoozeTrigger, Q as useAppSelector, Z as useAppDispatch } from "./store-i6pKH_iX.mjs";
import { r as selectIsApplied } from "./selectors-CqEsKQIY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AgentNarration, r as ConfidenceMeter, t as AgentBadge } from "./agent-narration-DQiNkCuI.mjs";
import { t as Route } from "./spotlights._id-BGwZEte6.mjs";
import { n as getB2BSpotlightById, t as b2bSpotlights } from "./b2bSpotlights-Csy5YT6s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spotlights._id-CLffXhUu.js
var import_jsx_runtime = require_jsx_runtime();
function SeverityBadge({ severity }) {
	const s = {
		high: {
			dot: "bg-rose-500",
			text: "text-rose-700 dark:text-rose-300",
			bg: "bg-rose-500/10 border-rose-500/30",
			label: "High Severity Risk"
		},
		moderate: {
			dot: "bg-amber-500",
			text: "text-amber-700 dark:text-amber-300",
			bg: "bg-amber-500/10 border-amber-500/30",
			label: "Moderate Risk"
		},
		low: {
			dot: "bg-emerald-500",
			text: "text-emerald-700 dark:text-emerald-300",
			bg: "bg-emerald-500/10 border-emerald-500/30",
			label: "Optimized Baseline"
		}
	}[severity];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold", s.bg, s.text),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", s.dot) }), s.label]
	});
}
function SpotlightDetail() {
	const { id } = Route.useParams();
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const applied = useAppSelector(selectIsApplied(id));
	const shouldReduceMotion = useReducedMotion();
	const spotlight = getB2BSpotlightById(id);
	if (!spotlight) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-6 py-16 text-center space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold text-foreground",
				children: "B2B Spotlight Opportunity Not Found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-text-secondary max-w-md mx-auto",
				children: [
					"The requested spotlight ID “",
					id,
					"” is not registered. Choose an active B2B operational spotlight below:"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 text-left max-w-xl mx-auto",
				children: b2bSpotlights.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/spotlights/$id",
					params: { id: s.id },
					className: "p-3.5 rounded-xl border border-border/80 bg-surface hover:border-brand/40 transition group block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-text-tertiary uppercase",
							children: s.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-foreground group-hover:text-brand mt-0.5",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-num tabular-nums text-xs font-bold text-brand mt-1",
							children: s.bigValue
						})
					]
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-4 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/spotlights",
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:opacity-95 transition cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Return to Spotlights Overview"]
				})
			})
		]
	});
	function snooze() {
		dispatch(snoozeTrigger(spotlight.id));
		toast("Spotlight Snoozed", { description: `Logged in audit ledger. We'll resurface ${spotlight.entityName} in the next quarterly review.` });
		nav({ to: "/spotlights" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-5 py-6 md:px-10 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/spotlights",
					className: "inline-flex items-center gap-1.5 hover:text-foreground transition font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to Spotlights"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-brand bg-brand/10 px-2.5 py-0.5 rounded-full border border-brand/20",
					children: spotlight.category
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
				initial: shouldReduceMotion ? false : {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .25,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: cn("rounded-2xl border p-6 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6 transition", spotlight.severity === "high" ? "border-rose-500/35 bg-linear-to-br from-rose-500/10 via-surface to-surface dark:from-rose-950/25 dark:via-surface dark:to-surface" : spotlight.severity === "moderate" ? "border-amber-500/35 bg-linear-to-br from-amber-500/10 via-surface to-surface dark:from-amber-950/25 dark:via-surface dark:to-surface" : "border-emerald-500/35 bg-linear-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
								size: 14,
								className: "text-brand"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Target Entity: ", spotlight.entityName] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight",
							children: spotlight.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-text-secondary leading-relaxed max-w-2xl",
							children: spotlight.oneLiner
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start md:items-end gap-2 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: spotlight.severity }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("font-num tabular-nums text-3xl font-black tracking-tight", spotlight.severity === "high" ? "text-rose-600 dark:text-rose-400" : spotlight.severity === "moderate" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"),
							children: spotlight.bigValue
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wider text-left md:text-right",
							children: spotlight.bigCaption
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AgentNarration, {
				agent: "reasoning",
				children: [
					"I cross-referenced ",
					spotlight.evidenceBase.transactions.toLocaleString("en-IN"),
					" ",
					"transactions across ",
					spotlight.evidenceBase.banks,
					" bank accounts (",
					spotlight.evidenceBase.period,
					") to isolate this operational risk. Confidence rating:",
					" ",
					spotlight.confidence,
					"%."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/60 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-base font-bold text-foreground",
								children: "What Spotlite Noticed (Bank & Contract Signals)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentBadge, { agent: "reasoning" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2.5 text-xs text-text-secondary",
						children: spotlight.signals.map((sig, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "leading-relaxed",
								children: sig
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-t border-border/60 pt-3 text-[11px] text-text-tertiary font-medium",
						children: "Source of Truth: Authoritative bank statement disbursements matched against Document Vault master agreements."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/60 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-base font-bold text-foreground",
								children: "Mathematical & Algorithmic Provenance"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-text-tertiary",
							children: "Deterministic Model"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2.5 text-xs text-text-secondary",
						children: spotlight.reasoning.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-brand shrink-0",
								children: "→"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "leading-relaxed",
								children: r
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border-t border-border/60 pt-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Algorithmic Confidence Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-num tabular-nums font-bold text-brand",
									children: [spotlight.confidence, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMeter, { value: spotlight.confidence }),
							spotlight.confidenceReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-text-tertiary mt-1",
								children: spotlight.confidenceReason
							})
						]
					})
				]
			}),
			spotlight.ledgerDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-base font-bold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						size: 16,
						className: "text-brand"
					}), " Reconciliation Evidence Ledger"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						"aria-label": "Reconciliation ledger details",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-4 py-2.5",
								children: "Audit Item / Ledger Metric"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-4 py-2.5 text-right",
								children: "Recorded Value"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: spotlight.ledgerDetails.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-alt/40 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-medium text-foreground",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-num tabular-nums font-bold text-right text-text-primary",
									children: item.value
								})]
							}, idx))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border-2 border-brand/30 bg-brand/5 p-6 shadow-xs space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-brand uppercase tracking-wider",
							children: "Recommended Remediation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold text-foreground mt-0.5",
							children: spotlight.remediation.title
						})] }), applied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), " Action Dispatched"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary leading-relaxed",
						children: spotlight.remediation.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								whileTap: shouldReduceMotion ? void 0 : { scale: .97 },
								type: "button",
								onClick: () => {
									const memo = `Spotlite Executive Resolution Memo:\n- Spotlight: ${spotlight.title}\n- Target Entity: ${spotlight.entityName}\n- Quantified Exposure: ${spotlight.bigValue}\n- Remediation Action: ${spotlight.remediation.title}\n- Confidence: ${spotlight.confidence}%\nStatus: Queued for CFO & Operations resolution.`;
									navigator.clipboard.writeText(memo);
									toast.success("Executive resolution memo copied to clipboard", { description: "Ready to share with internal finance team or external CA." });
								},
								className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-surface border border-border text-foreground hover:bg-surface-alt transition cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 13 }), " Copy Audit Memo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								whileTap: shouldReduceMotion ? void 0 : { scale: .97 },
								type: "button",
								onClick: snooze,
								className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-foreground transition cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }), " Defer to Q2"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							whileTap: shouldReduceMotion ? void 0 : { scale: .97 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/spotlights/$id/apply",
								params: { id: spotlight.id },
								className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs shadow-brand hover:opacity-95 transition cursor-pointer w-full sm:w-auto justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: spotlight.remediation.actionLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { SpotlightDetail as component };

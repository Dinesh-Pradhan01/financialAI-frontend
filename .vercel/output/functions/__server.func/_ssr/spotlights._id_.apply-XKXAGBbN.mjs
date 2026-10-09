import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Gn as ArrowRight, Kn as ArrowLeft, Mn as Building2, Ut as FileText, Yt as FileCheckCorner, an as Copy, cn as Clock, gn as CircleCheck, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { Q as useAppSelector, Z as useAppDispatch, o as applyTrigger } from "./store-i6pKH_iX.mjs";
import { r as selectIsApplied } from "./selectors-CqEsKQIY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatINR } from "./format-B9luOE0k.mjs";
import { t as Route } from "./spotlights._id_.apply-CkFcC7dy.mjs";
import { n as getB2BSpotlightById } from "./b2bSpotlights-Csy5YT6s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spotlights._id_.apply-XKXAGBbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function B2BRemediationConsole() {
	const { id } = Route.useParams();
	useNavigate();
	const dispatch = useAppDispatch();
	const alreadyApplied = useAppSelector(selectIsApplied(id));
	const spotlight = getB2BSpotlightById(id);
	const shouldReduceMotion = useReducedMotion();
	const [monthsClaimed, setMonthsClaimed] = (0, import_react.useState)(6);
	const [resolutionType, setResolutionType] = (0, import_react.useState)("credit-note");
	const [renewalTerm, setRenewalTerm] = (0, import_react.useState)(24);
	const [discountTarget, setDiscountTarget] = (0, import_react.useState)(7.5);
	const [sweepAmount, setSweepAmount] = (0, import_react.useState)(25e5);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(alreadyApplied);
	const [becChecklist, setBecChecklist] = (0, import_react.useState)({
		cancelledCheque: true,
		verbalConfirm: true,
		gstinMatch: true
	});
	if (!spotlight) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-6 py-16 text-center space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-bold text-foreground",
				children: "Remediation Target Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-text-secondary",
				children: [
					"No active B2B remediation configuration exists for ID “",
					id,
					"”."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/spotlights",
				className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold shadow-xs hover:opacity-95",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }), " Back to Spotlights"]
			})
		]
	});
	const calculatedOverbillClaim = (0, import_react.useMemo)(() => {
		return 85e3 * monthsClaimed;
	}, [monthsClaimed]);
	const calculatedRenewalSavings = (0, import_react.useMemo)(() => {
		return Math.round(145e4 * discountTarget / 100);
	}, [discountTarget]);
	const calculatedSweepYield = (0, import_react.useMemo)(() => {
		return Math.round(sweepAmount * .065);
	}, [sweepAmount]);
	function handleExecuteRemediation(e) {
		e.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSuccess(true);
			dispatch(applyTrigger(spotlight.id));
			if (spotlight.id === "vendor-overbilling") toast.success("Vendor Dispute Claim Registered", { description: `Dispute of ${formatINR(calculatedOverbillClaim)} logged against ${spotlight.entityName}.` });
			else if (spotlight.id === "bec-fraud-risk") toast.error("Remittance Hold Activated", { description: `Outbound payments to ${spotlight.entityName} frozen pending bank authentication.` });
			else toast.success("Executive Action Dispatched", { description: `${spotlight.remediation.title} successfully logged in audit trail.` });
		}, 600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-6 md:px-10 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/spotlights/$id",
					params: { id: spotlight.id },
					className: "inline-flex items-center gap-1.5 hover:text-foreground transition font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }), " Back to Detail Analysis"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-text-tertiary",
					children: ["Entity: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: spotlight.entityName
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("rounded-2xl border p-6 shadow-xs space-y-2 transition", spotlight.severity === "high" ? "border-rose-500/35 bg-linear-to-br from-rose-500/10 via-surface to-surface dark:from-rose-950/25 dark:via-surface dark:to-surface" : spotlight.severity === "moderate" ? "border-amber-500/35 bg-linear-to-br from-amber-500/10 via-surface to-surface dark:from-amber-950/25 dark:via-surface dark:to-surface" : "border-emerald-500/35 bg-linear-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Executive Remediation Console" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold text-foreground",
						children: spotlight.remediation.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary leading-relaxed",
						children: spotlight.remediation.description
					})
				]
			}),
			isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: shouldReduceMotion ? false : {
					opacity: 0,
					scale: .96
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .35,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-8 text-center space-y-5 shadow-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: shouldReduceMotion ? false : { scale: 0 },
						animate: { scale: 1 },
						transition: shouldReduceMotion ? void 0 : {
							type: "spring",
							stiffness: 450,
							damping: 20,
							delay: .08
						},
						className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 28 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-bold text-foreground",
							children: "Remediation Action Formally Dispatched"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary max-w-md mx-auto",
							children: "This action has been sealed in the immutable audit ledger. A formal notification has been queued for your Chartered Accountant and treasury review."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-4 border border-border/60 max-w-md mx-auto text-left text-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-tertiary",
									children: "Resolution Reference:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono font-bold text-foreground",
									children: [
										"SPL-REM-",
										spotlight.id.toUpperCase().slice(0, 6),
										"-2026"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-tertiary",
									children: "Target Entity:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: spotlight.entityName
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-tertiary",
									children: "Quantified Impact:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-num tabular-nums font-bold text-emerald-600 dark:text-emerald-400",
									children: spotlight.id === "vendor-overbilling" ? formatINR(calculatedOverbillClaim) : spotlight.id === "contract-lapse" ? `${formatINR(calculatedRenewalSavings)} / yr` : spotlight.id === "idle-cash-optimization" ? `${formatINR(calculatedSweepYield)} / yr` : spotlight.bigValue
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileTap: shouldReduceMotion ? void 0 : { scale: .97 },
							type: "button",
							onClick: () => {
								const memo = `Spotlite Formal Resolution Certificate:\n- Reference: SPL-REM-${spotlight.id.toUpperCase().slice(0, 6)}-2026\n- Entity: ${spotlight.entityName}\n- Action: ${spotlight.remediation.title}\n- Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")}\nStatus: Verified and Dispatched.`;
								navigator.clipboard.writeText(memo);
								toast.success("Resolution certificate copied to clipboard");
							},
							className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-border hover:bg-surface-alt transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 13 }), " Copy Resolution Certificate"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							whileTap: shouldReduceMotion ? void 0 : { scale: .97 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/spotlights",
								className: "inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold shadow-brand hover:opacity-95 transition cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Spotlights Dashboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
							})
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleExecuteRemediation,
				className: "space-y-6",
				children: [
					spotlight.id === "vendor-overbilling" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 18,
									className: "text-brand"
								}), " Configure Overbilling Claim Parameters"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "contractBaseRate",
											className: "text-xs font-semibold text-text-secondary",
											children: "Master Agreement Rate (Monthly Baseline)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "contractBaseRate",
											type: "text",
											readOnly: true,
											value: "₹1,00,000 / mo",
											className: "w-full rounded-xl bg-surface-alt border border-border/70 px-3.5 py-2 text-xs font-num font-bold text-foreground cursor-not-allowed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-text-tertiary",
											children: "Verified from Document Vault contract."
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "actualBilledRate",
											className: "text-xs font-semibold text-text-secondary",
											children: "Actual Average Monthly Billed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "actualBilledRate",
											type: "text",
											readOnly: true,
											value: "₹1,85,000 / mo",
											className: "w-full rounded-xl bg-surface-alt border border-border/70 px-3.5 py-2 text-xs font-num font-bold text-rose-600 dark:text-rose-400 cursor-not-allowed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-text-tertiary",
											children: "Average from 6 cleared NEFT disbursements."
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "monthsClaimedSlider",
											className: "font-semibold text-foreground",
											children: "Consecutive Months to Claim in Dispute"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num font-bold text-brand",
											children: [monthsClaimed, " Months"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "monthsClaimedSlider",
										type: "range",
										min: 1,
										max: 12,
										step: 1,
										value: monthsClaimed,
										onChange: (e) => setMonthsClaimed(Number.parseInt(e.target.value, 10)),
										className: "w-full accent-rose-600 cursor-pointer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] text-text-tertiary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 Month (₹85k)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "6 Months (₹5.10L)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12 Months (₹10.20L)" })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "resolutionSelect",
									className: "text-xs font-semibold text-foreground",
									children: "Target Settlement Structure"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "resolutionSelect",
									value: resolutionType,
									onChange: (e) => setResolutionType(e.target.value),
									className: "w-full rounded-xl bg-surface border border-border px-3.5 py-2 text-xs font-medium text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "credit-note",
											children: "Credit Note offset against upcoming monthly billings (Recommended)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "refund-wire",
											children: "Direct RTGS/NEFT cash restitution to company operating account"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "rate-freeze",
											children: "Immediate rate rollback to ₹1,00,000 with 12-month extension"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-emerald-500/35 bg-linear-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface p-4 flex items-center justify-between shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-emerald-800/90 dark:text-emerald-300/90 uppercase tracking-wider",
									children: "Calculated Rupee Claim Amount"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: shouldReduceMotion ? false : {
										opacity: .7,
										scale: .98
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									transition: { duration: .15 },
									className: "font-num tabular-nums text-2xl font-black text-emerald-600 dark:text-emerald-400",
									children: ["+", formatINR(calculatedOverbillClaim)]
								}, calculatedOverbillClaim)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										const disputeNotice = `FORMAL CONTRACT BILLING RECONCILIATION NOTICE\n\nTo: Accounts Department, Office Depot Supplies\nFrom: Nimbus Logistics Pvt Ltd (Finance & Operations)\nDate: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")}\nSubject: Dispute of Uncontracted Rate Inflation — Demand for ${formatINR(calculatedOverbillClaim)} Credit Note\n\nDear Accounts Team,\nAn authoritative audit of our master agreement dated 15 Jan 2024 and bank disbursements reveals an uncontracted billing disparity over the last ${monthsClaimed} months:\n- Master Contract Rate: ₹1,00,000 / month\n- Average Billed: ₹1,85,000 / month\n- Monthly Variance: ₹85,000 / month excess\n- Cumulative Claim: ${formatINR(calculatedOverbillClaim)}\n\nPlease issue an immediate credit note or contact our finance team within 7 business days.\n\nSincerely,\nDirector of Finance, Nimbus Logistics`;
										navigator.clipboard.writeText(disputeNotice);
										toast.success("Formal dispute notice copied to clipboard", { description: "Ready to email to accounts@officedepot.com" });
									},
									className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border hover:bg-surface-alt transition cursor-pointer shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 13 }), " Copy Formal Letter"]
								})]
							})
						]
					}),
					spotlight.id === "bec-fraud-risk" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 p-6 shadow-xs space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-rose-500/20 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									size: 18,
									className: "text-rose-600"
								}), " Outbound Remittance Verification & Security Hold"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-surface p-4 border border-rose-500/20 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-secondary",
										children: "Beneficiary Identity:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: spotlight.entityName
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-surface-alt",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-text-tertiary block",
											children: "Historical Verified IFSC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-emerald-600 dark:text-emerald-400",
											children: "HDFC0001234"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-rose-500/10 border border-rose-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-rose-700 dark:text-rose-300 block font-bold",
											children: "Unverified Drift IFSC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-rose-600 dark:text-rose-400",
											children: "SBIN0009876"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-foreground uppercase tracking-wider",
									children: "Mandatory Pre-Remittance Authentication Checklist"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-surface border border-border cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: becChecklist.cancelledCheque,
												onChange: (e) => setBecChecklist({
													...becChecklist,
													cancelledCheque: e.target.checked
												}),
												className: "rounded accent-rose-600 h-4 w-4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Obtain signed & stamped cancelled cheque for branch SBIN0009876" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-surface border border-border cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: becChecklist.verbalConfirm,
												onChange: (e) => setBecChecklist({
													...becChecklist,
													verbalConfirm: e.target.checked
												}),
												className: "rounded accent-rose-600 h-4 w-4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dual-control phone verification with counterparty CFO on verified phone record" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-surface border border-border cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: becChecklist.gstinMatch,
												onChange: (e) => setBecChecklist({
													...becChecklist,
													gstinMatch: e.target.checked
												}),
												className: "rounded accent-rose-600 h-4 w-4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verify new bank branch matches GST portal registered banking records" })]
										})
									]
								})]
							})
						]
					}),
					spotlight.id === "contract-lapse" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, {
									size: 18,
									className: "text-brand"
								}), " Procurement Contract Renewal Term Sheet"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "renewalTenure",
										className: "text-xs font-semibold text-foreground",
										children: "Renewal Contract Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "renewalTenure",
										value: renewalTerm,
										onChange: (e) => setRenewalTerm(Number.parseInt(e.target.value, 10)),
										className: "w-full rounded-xl bg-surface border border-border px-3.5 py-2 text-xs font-medium text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 12,
												children: "12 Months (1 Year Term)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 24,
												children: "24 Months (2 Year Term — Volume Lock)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 36,
												children: "36 Months (3 Year Multi-Year SLA)"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "discountTargetSelect",
										className: "text-xs font-semibold text-foreground",
										children: "Target Volume Renewal Discount"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "discountTargetSelect",
										value: discountTarget,
										onChange: (e) => setDiscountTarget(Number.parseFloat(e.target.value)),
										className: "w-full rounded-xl bg-surface border border-border px-3.5 py-2 text-xs font-medium text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 5,
												children: "5.0% Standard Renewal Discount"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 7.5,
												children: "7.5% Two-Year Commitment Discount (Target)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 10,
												children: "10.0% Multi-Year Cloud Enterprise Discount"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-emerald-500/35 bg-linear-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface p-4 flex items-center justify-between shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-emerald-800/90 dark:text-emerald-300/90 uppercase tracking-wider",
									children: "Projected Annual Savings from Renewal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: shouldReduceMotion ? false : {
										opacity: .7,
										scale: .98
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									transition: { duration: .15 },
									className: "font-num tabular-nums text-2xl font-black text-emerald-600 dark:text-emerald-400",
									children: [
										"+",
										formatINR(calculatedRenewalSavings),
										" / yr"
									]
								}, calculatedRenewalSavings)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-xs text-text-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Effective Annual Spend: " }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-num tabular-nums font-bold",
										children: formatINR(145e4 - calculatedRenewalSavings)
									})]
								})]
							})
						]
					}),
					spotlight.id === "idle-cash-optimization" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-teal-500/30 bg-surface p-6 shadow-xs space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									size: 18,
									className: "text-teal-600 dark:text-teal-400"
								}), " Treasury Sweep Instruction Setup"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "sweepAmountSlider",
											className: "font-semibold text-foreground",
											children: "Surplus Cash to Sweep into Overnight/Liquid Yield"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-num tabular-nums font-bold text-teal-600 dark:text-teal-400",
											children: formatINR(sweepAmount)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "sweepAmountSlider",
										type: "range",
										min: 5e5,
										max: 303e4,
										step: 5e4,
										value: sweepAmount,
										onChange: (e) => setSweepAmount(Number.parseInt(e.target.value, 10)),
										className: "w-full accent-teal-600 cursor-pointer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] text-text-tertiary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₹5.00L Minimum" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₹25.00L Suggested" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₹30.30L Max Surplus" })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-teal-500/35 bg-linear-to-br from-teal-500/10 via-surface to-surface dark:from-teal-950/25 dark:via-surface dark:to-surface p-4 flex items-center justify-between shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-teal-800/90 dark:text-teal-300/90 uppercase tracking-wider",
									children: "Projected Annual Treasury Earnings @ 6.50%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: shouldReduceMotion ? false : {
										opacity: .7,
										scale: .98
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									transition: { duration: .15 },
									className: "font-num tabular-nums text-2xl font-black text-teal-600 dark:text-teal-400",
									children: [
										"+",
										formatINR(calculatedSweepYield),
										" / yr"
									]
								}, calculatedSweepYield)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-xs text-text-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Liquid Reserve Maintained: " }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-num tabular-nums font-bold",
										children: "₹13,50,000"
									})]
								})]
							})
						]
					}),
					spotlight.id !== "vendor-overbilling" && spotlight.id !== "bec-fraud-risk" && spotlight.id !== "contract-lapse" && spotlight.id !== "idle-cash-optimization" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-base font-bold text-foreground",
							children: ["Action Dispatch: ", spotlight.remediation.title]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-text-secondary leading-relaxed",
							children: [
								"Confirm dispatch of ",
								spotlight.remediation.actionLabel,
								" to your corporate finance operations queue."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/spotlights/$id",
							params: { id: spotlight.id },
							className: "px-5 py-2.5 rounded-xl border border-border bg-surface text-text-secondary hover:text-foreground text-xs font-semibold transition cursor-pointer w-full sm:w-auto text-center",
							children: "Cancel & Return"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							whileTap: shouldReduceMotion ? void 0 : { scale: .97 },
							type: "submit",
							disabled: isSubmitting,
							className: cn("inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-brand transition cursor-pointer w-full sm:w-auto", spotlight.id === "bec-fraud-risk" ? "bg-rose-600 hover:bg-rose-700" : "bg-brand hover:opacity-95"),
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								size: 14,
								className: "animate-spin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dispatching to Audit Ledger…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Confirm & ", spotlight.remediation.actionLabel] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })] })
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { B2BRemediationConsole as component };

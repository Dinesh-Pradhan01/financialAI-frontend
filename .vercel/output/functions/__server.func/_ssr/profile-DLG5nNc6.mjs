import { t as cn } from "./utils-BkRapwZn.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, D as Star, Kn as ArrowLeft, R as ShieldCheck, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { a as explainers, o as financialDNA } from "./agentic-C_EsON0v.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { a as walletShare, i as rohan, r as relationshipHealth } from "./rohan-BsoI7WdA.mjs";
import { s as isStrictHR } from "./roles-Cu-hhfHW.mjs";
import { n as AgentNarration } from "./agent-narration-DQiNkCuI.mjs";
import { t as formatINR } from "./format-B9luOE0k.mjs";
import { t as ExplainTip } from "./explain-tip-C0LetMLg.mjs";
import { t as IconChip } from "./icons-2Ya6Jeu5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DLG5nNc6.js
var import_jsx_runtime = require_jsx_runtime();
function scoreColor(v) {
	if (v <= 40) return "var(--severity-high)";
	if (v <= 70) return "var(--severity-moderate)";
	return "var(--success)";
}
function WellnessSubScoreCard({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-spot p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-num text-sm",
						children: [
							s.value,
							s.trend === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-success",
								children: "▲"
							}),
							s.trend === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-severity-high",
								children: "▼"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-1.5 overflow-hidden rounded-full bg-surface-alt",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full",
						style: {
							width: `${s.value}%`,
							background: scoreColor(s.value)
						}
					})
				}),
				s.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-text-secondary",
					children: s.note
				})
			]
		}, s.key))
	});
}
/**
* Visual trait fingerprint that replaces flat persona badges.
* `variant="bars"` is the compact home version; `variant="radar"` is the
* richer profile "fingerprint" with per-trait drivers.
*/
function FinancialDNA({ className, showDrivers = false, variant = "bars" }) {
	const sorted = [...financialDNA].sort((a, b) => b.value - a.value);
	const top = sorted[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("card-spot flex flex-col p-4", className),
		children: [
			variant === "radar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DnaRadar, { traits: financialDNA }), showDrivers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2",
				children: sorted.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-text-primary",
							children: t.trait
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 font-num font-semibold text-brand",
							children: t.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] leading-snug text-text-secondary",
							children: t.driver
						})
					]
				}, t.trait))
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-x-5 gap-y-3.5",
				children: sorted.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13px] font-medium",
							children: t.trait
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-num text-xs font-semibold text-text-secondary",
							children: t.value
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-2 overflow-hidden rounded-full bg-surface-alt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: `${t.value}%` },
							transition: {
								duration: .6,
								delay: i * .05,
								ease: "easeOut"
							},
							className: "h-full rounded-full bg-brand"
						})
					}),
					showDrivers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-[11px] leading-snug text-text-secondary",
						children: t.driver
					})
				] }, t.trait))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 border-t border-border pt-3 text-xs text-text-secondary",
				children: [
					"Your strongest trait is ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-text-primary",
						children: top.trait
					}),
					" ",
					"at ",
					top.value,
					" / 100."
				]
			})
		]
	});
}
/** Hexagonal radar/spider chart — the literal "fingerprint" of the traits. */
function DnaRadar({ traits }) {
	const W = 240;
	const H = 216;
	const cx = W / 2;
	const cy = H / 2;
	const R = 72;
	const n = traits.length;
	const angle = (i) => (-90 + 360 / n * i) * Math.PI / 180;
	const at = (i, frac) => [cx + R * frac * Math.cos(angle(i)), cy + R * frac * Math.sin(angle(i))];
	const polyFor = (frac) => traits.map((_, i) => at(i, frac).join(",")).join(" ");
	const dataPoly = traits.map((t, i) => at(i, t.value / 100).join(",")).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${W} ${H}`,
		className: "mx-auto h-auto w-full max-w-[260px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				style: { stroke: "var(--surface-alt)" },
				strokeWidth: 1,
				fill: "none",
				children: [[
					.25,
					.5,
					.75,
					1
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: polyFor(f) }, f)), traits.map((_, i) => {
					const [x, y] = at(i, 1);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: cx,
						y1: cy,
						x2: x,
						y2: y
					}, i);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.polygon, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: .5,
					ease: "easeOut"
				},
				points: dataPoly,
				style: {
					fill: "color-mix(in oklch, var(--brand-primary) 18%, transparent)",
					stroke: "var(--brand-primary)"
				},
				strokeWidth: 2,
				strokeLinejoin: "round"
			}),
			traits.map((t, i) => {
				const [x, y] = at(i, t.value / 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: y,
					r: 3,
					style: { fill: "var(--brand-primary)" }
				}, t.trait);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "fill-current text-text-secondary",
				fontSize: 10,
				fontWeight: 600,
				children: traits.map((t, i) => {
					const [x, y] = at(i, 1.26);
					const c = Math.cos(angle(i));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x,
						y,
						textAnchor: c > .3 ? "start" : c < -.3 ? "end" : "middle",
						dominantBaseline: "middle",
						children: t.trait.split(" ")[0]
					}, t.trait);
				})
			})
		]
	});
}
function Stars({ count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex gap-0.5",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-3.5 w-3.5", i < count ? "fill-severity-moderate text-severity-moderate" : "text-border") }, i))
	});
}
/** Relationship map + wallet share, the SBI-facing story. */
function RelationshipHealth({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card-spot divide-y divide-border",
			children: relationshipHealth.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-3 w-3 shrink-0 rounded-full", b.color) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: b.bank
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { count: b.stars })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-text-secondary",
							children: [
								b.role,
								" · ",
								b.tags.join(", ")
							]
						})]
					}),
					b.external && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-pill bg-surface-alt px-2 py-0.5 text-[10px] font-medium text-text-secondary",
						children: "External"
					})
				]
			}, b.bank))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-spot p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-brand",
						children: [
							"SBI ",
							walletShare.sbi,
							"%"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-text-secondary",
						children: [
							"External ",
							walletShare.external,
							"%"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex h-2.5 overflow-hidden rounded-full bg-surface-alt",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-brand",
						style: { width: `${walletShare.sbi}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-text-secondary",
					children: [
						"Potential migration to SBI:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-num font-semibold text-text-primary",
							children: formatINR(walletShare.potentialMigration, { compact: true })
						})
					]
				})
			]
		})]
	});
}
function DonutChart({ segments, size = 200, strokeWidth = 26, radius, centerLabel, className, trackColor = "var(--surface-alt)" }) {
	const half = size / 2;
	const r = radius ?? Math.round((size - strokeWidth) / 2 - (size >= 180 ? 17 : 7));
	const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
	const circumference = 2 * Math.PI * r;
	let acc = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative shrink-0", className),
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			className: "-rotate-90",
			role: "img",
			"aria-label": "Spending distribution by category",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Spending distribution by category" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: half,
					cy: half,
					r,
					stroke: trackColor,
					strokeWidth,
					fill: "none",
					"aria-hidden": "true"
				}),
				segments.map((seg, i) => {
					const portion = total > 0 ? Math.max(0, seg.value) / total : 0;
					const dash = circumference * portion;
					const offset = -circumference * acc;
					acc += portion;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: half,
						cy: half,
						r,
						stroke: seg.color,
						strokeWidth,
						fill: "none",
						strokeDasharray: `${dash} ${circumference - dash}`,
						strokeDashoffset: offset,
						strokeLinecap: "butt",
						"aria-label": `${seg.label}: ${seg.value}`
					}, seg.label || i);
				})
			]
		}), centerLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none",
			"aria-hidden": "true",
			children: centerLabel
		})]
	});
}
function Tip({ k }) {
	const e = explainers[k];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplainTip, {
		agent: e.agent,
		title: e.title,
		evidence: e.evidence,
		children: e.text
	});
}
function SectionHead({ title, k }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, { k })]
	});
}
function Insight({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-3 flex items-start gap-2 rounded-xl tint-brand px-3 py-2 text-xs text-text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function Profile() {
	const { user } = useAuth();
	if (isStrictHR(user?.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-16 text-center space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold font-display text-text-primary tracking-tight",
						children: "Access Restricted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-text-secondary leading-relaxed",
						children: "Personal & Customer 360 profile is restricted for HR role accounts."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-mono text-text-tertiary",
						children: [
							"Current signed-in role:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-text-secondary uppercase",
								children: user?.role || "HR"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/hr",
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Go to HR Operations"]
				})
			})
		]
	});
	const id = rohan.identity;
	const nw = rohan.netWorth;
	const assetTotal = nw.assets.reduce((s, a) => s + a.amount, 0);
	const displayName = user?.full_name || (user?.email ? user.email.split("@")[0] : rohan.name);
	const displayEmail = user?.email || id.email;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-6 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "card-spot flex flex-col gap-4 p-5 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-on-brand",
					children: (user?.full_name ? user.full_name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2) : displayName.slice(0, 2)).toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-x-2 gap-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl font-bold",
									children: displayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-pill bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }),
										" KYC ",
										id.kyc
									]
								}),
								user?.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rounded-pill bg-brand/10 px-2 py-0.5 text-[11px] font-bold text-brand uppercase tracking-wider",
									children: user.role
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-text-secondary",
							children: [
								rohan.city,
								" · ",
								rohan.age,
								" · ",
								rohan.gender,
								" · ",
								rohan.occupation
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [
								id.segment,
								`Customer since ${id.memberSince}`,
								`${id.relationshipYears} yrs with SBI`,
								id.riskProfile
							].map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-pill border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-text-secondary",
								children: chip
							}, chip))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AgentNarration, {
					agent: "intelligence",
					children: [
						"This is your Customer 360. I unified ",
						rohan.banks.length,
						" relationships across",
						" ",
						new Set(rohan.banks.map((b) => b.bank)).size,
						" banks into one view, identity, money, behaviour and risk, then explained how I know each part."
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyStat, {
						label: "Wellness score",
						value: `${rohan.wellness}`,
						caption: `/ 100 · ${rohan.wellnessTrend} this month`,
						k: "wellness"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyStat, {
						label: "Credit score",
						value: `${id.creditScore}`,
						caption: id.creditBand,
						k: "creditScore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyStat, {
						label: "Net worth",
						value: formatINR(nw.total, { compact: true }),
						caption: `▲ ${nw.changePct}% this year`,
						k: "netWorth"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyStat, {
						label: "Financial age",
						value: `${id.financialAge}`,
						caption: `${rohan.age - id.financialAge} yrs younger than you`,
						k: "personas"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg font-semibold",
					children: "Identity & relationship"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-spot grid grid-cols-2 gap-x-8 gap-y-4 p-5 sm:grid-cols-3 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Relationship manager",
							value: id.relationshipManager
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Home branch",
							value: id.branch
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Employer",
							value: id.employer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Marital status",
							value: id.maritalStatus
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Dependents",
							value: `${id.dependents}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Risk profile",
							value: id.riskProfile
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "PAN",
							value: id.pan
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Mobile",
							value: id.mobile
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Email",
							value: displayEmail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Customer since",
							value: id.memberSince
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid items-start gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Net worth",
							k: "netWorth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-spot p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary",
									children: "Estimated net worth"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-bold font-num",
									children: formatINR(nw.total, { compact: true })
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-success",
									children: [
										"▲ ",
										nw.changePct,
										"% this year"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-col items-center gap-6 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetWorthDonut, {
									assets: nw.assets,
									total: assetTotal
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary",
											children: "Assets"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2.5",
											children: nw.assets.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendRow, {
												color: NW_COLORS[i % NW_COLORS.length],
												label: a.label,
												note: a.note,
												amount: a.amount
											}, a.label))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 space-y-2.5 border-t border-border pt-3",
											children: nw.liabilities.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendRow, {
												color: "var(--danger)",
												label: l.label,
												note: l.note,
												amount: l.amount,
												negative: true
											}, l.label))
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, { children: rohan.insights.netWorth })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Who you are, to the data",
						k: "personas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: rohan.personas.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-spot flex items-center gap-3 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, { value: p.match }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChip, {
										keyName: p.id,
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-semibold",
										children: p.label
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-text-secondary",
									children: p.blurb
								})]
							})]
						}, p.id))
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Your Financial DNA",
							k: "financialDNA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialDNA, {
							variant: "radar",
							showDrivers: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, { children: rohan.insights.personas })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Your goals",
						k: "goals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: rohan.goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-spot p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: g.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-pill px-2 py-0.5 text-[10px] font-semibold", goalTone(g.status)),
										children: g.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-2 overflow-hidden rounded-full bg-surface-alt",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-brand",
										style: { width: `${g.progress}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between gap-2 text-xs text-text-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.note }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "shrink-0 font-num",
										children: ["Target ", g.target]
									})]
								})
							]
						}, g.id))
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Banking relationship health",
						k: "relationship"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelationshipHealth, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, { children: rohan.insights.relationship })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Cash flow (monthly avg)",
						k: "cashflow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-spot space-y-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Income",
								value: rohan.cashflow.income,
								highlight: "up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubRows, { items: rohan.cashflow.incomeBreakdown }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Expenses",
								value: rohan.cashflow.expenses
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubRows, { items: rohan.cashflow.expenseBreakdown }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 border-t border-border pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Disposable",
									value: rohan.cashflow.disposable,
									highlight: "up"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex gap-4 text-xs text-text-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Savings rate",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num font-semibold text-text-primary",
											children: [rohan.cashflow.savingsRate, "%"]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Debt ratio",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num font-semibold text-text-primary",
											children: [rohan.cashflow.debtRatio, "%"]
										})
									] })]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, { children: rohan.insights.cashflow })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Wellness breakdown",
						k: "wellness"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WellnessSubScoreCard, { items: rohan.subscores }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, { children: rohan.insights.wellness })
				]
			})
		]
	});
}
function KeyStat({ label, value, caption, k }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-spot p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, { k })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-2xl font-bold font-num",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-text-secondary",
				children: caption
			})
		]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] uppercase tracking-wide text-text-secondary",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-0.5 text-sm font-medium leading-snug text-text-primary",
		children: value
	})] });
}
var NW_COLORS = [
	"var(--brand-primary)",
	"var(--brand-secondary)",
	"var(--success)"
];
/** Donut of asset allocation; centre shows total assets. */
function NetWorthDonut({ assets, total }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, {
		segments: assets.map((a, i) => ({
			label: a.label,
			value: a.amount,
			color: NW_COLORS[i % NW_COLORS.length]
		})),
		size: 140,
		strokeWidth: 18,
		radius: 54,
		centerLabel: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-wider text-text-secondary",
			children: "Assets"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-num text-lg font-bold",
			children: formatINR(total, { compact: true })
		})] })
	});
}
function LegendRow({ color, label, note, amount, negative }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-2.5 w-2.5 shrink-0 rounded-full",
				style: { background: color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1 truncate",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: label
				}), note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1.5 text-xs text-text-secondary",
					children: note
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("shrink-0 font-num font-semibold", negative && "text-danger"),
				children: [negative ? "−" : "", formatINR(amount)]
			})
		]
	});
}
/** Circular percentage ring, used for persona match strength. */
function Ring({ value }) {
	const size = 48;
	const sw = 5;
	const r = (size - sw) / 2;
	const c = 2 * Math.PI * r;
	const offset = c * (1 - value / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative shrink-0",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--surface-alt)",
				strokeWidth: sw
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--brand-primary)",
				strokeWidth: sw,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: offset
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-0 flex items-center justify-center font-num text-[11px] font-semibold",
			children: value
		})]
	});
}
function goalTone(status) {
	if (status === "Done") return "bg-success/12 text-success";
	if (status === "On track") return "bg-brand/10 text-brand";
	return "bg-severity-moderate/15 text-severity-moderate";
}
function Row({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-num font-semibold",
			children: [
				formatINR(value),
				" ",
				highlight === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-success",
					children: "▲"
				})
			]
		})]
	});
}
function SubRows({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ml-4 space-y-1 text-sm text-text-secondary",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["└ ", i.label] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-num",
				children: formatINR(i.amount)
			})]
		}, i.label))
	});
}
//#endregion
export { Profile as component };

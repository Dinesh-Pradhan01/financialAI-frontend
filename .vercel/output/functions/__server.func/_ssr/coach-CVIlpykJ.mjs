import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, H as Send, b as Trash2 } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as useAppSelector, Z as useAppDispatch, c as clearConversation, r as addMessage } from "./store-i6pKH_iX.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { n as coachSuggestions, t as answerForQuestion } from "./rohan-BsoI7WdA.mjs";
import { n as selectConversation } from "./selectors-CqEsKQIY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-CVIlpykJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoachAnswerCard({ answer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-spot max-w-sm space-y-2 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-text-secondary",
				children: answer.title
			}),
			answer.primary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-bold font-num text-text-primary",
				children: answer.primary
			}),
			answer.bars && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, { values: answer.bars }),
			answer.bullets && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 pt-1 text-sm",
				children: answer.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brand",
						children: "•"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
				}, b))
			}),
			answer.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-secondary",
				children: answer.caption
			}),
			answer.link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: answer.link.to,
				params: answer.link.params,
				className: "mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline",
				children: [answer.link.label, " ▸"]
			})
		]
	});
}
function Sparkline({ values }) {
	const max = Math.max(...values, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-12 items-end gap-1",
		children: values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 rounded-sm bg-brand",
			style: {
				height: `${v / max * 100}%`,
				minHeight: 4
			}
		}, i))
	});
}
var thinkingSteps = [
	"Scanning your transactions",
	"Computing the numbers",
	"Drafting your answer"
];
function Coach() {
	const { user } = useAuth();
	const dispatch = useAppDispatch();
	const conversation = useAppSelector(selectConversation);
	const [input, setInput] = (0, import_react.useState)("");
	const [thinking, setThinking] = (0, import_react.useState)(false);
	const [stepIdx, setStepIdx] = (0, import_react.useState)(0);
	const scrollRef = (0, import_react.useRef)(null);
	const firstName = user?.full_name ? user.full_name.split(" ")[0] : user?.email ? user.email.split("@")[0] : "there";
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [conversation, thinking]);
	(0, import_react.useEffect)(() => {
		if (!thinking) return;
		setStepIdx(0);
		const t = setInterval(() => setStepIdx((i) => Math.min(thinkingSteps.length - 1, i + 1)), 380);
		return () => clearInterval(t);
	}, [thinking]);
	function send(q) {
		if (!q.trim() || thinking) return;
		const answer = answerForQuestion(q);
		dispatch(addMessage({
			who: "user",
			text: q
		}));
		setInput("");
		setThinking(true);
		window.setTimeout(() => {
			dispatch(addMessage({
				who: "bot",
				answer
			}));
			setThinking(false);
		}, 1200);
	}
	const empty = conversation.length === 0 && !thinking;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100vh-5rem)] flex-col px-5 py-4 md:h-screen md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-on-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl font-bold",
							children: "Ask Spotlite"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6875rem] text-text-secondary",
							children: "Reasoning over your real numbers"
						})]
					})]
				}), conversation.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => dispatch(clearConversation()),
					className: "inline-flex items-center gap-1 rounded-pill border border-border px-3 py-1.5 text-xs text-text-secondary hover:bg-surface-alt",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Clear"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "mt-4 flex-1 overflow-y-auto",
				children: empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-md py-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-text-secondary",
							children: [
								"Hi ",
								firstName,
								", ask me anything about your money."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs font-medium uppercase tracking-wider text-text-secondary",
							children: "Try"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap justify-center gap-2",
							children: coachSuggestions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => send(q),
								className: "rounded-pill border border-border bg-surface px-3 py-1.5 text-sm transition hover:bg-surface-alt",
								children: q
							}, q))
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pb-4",
					children: [conversation.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.who === "user" ? "flex justify-end" : "flex justify-start",
						children: m.who === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2 text-sm text-on-brand",
							children: m.text
						}) : m.answer != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachAnswerCard, { answer: m.answer })
					}, i)), thinking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-2.5 shadow-e1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "thinking-dot h-1.5 w-1.5 rounded-full bg-brand-secondary",
										style: { animationDelay: "0ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "thinking-dot h-1.5 w-1.5 rounded-full bg-brand-secondary",
										style: { animationDelay: "150ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "thinking-dot h-1.5 w-1.5 rounded-full bg-brand-secondary",
										style: { animationDelay: "300ms" }
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-text-secondary",
								children: [thinkingSteps[stepIdx], "…"]
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 shadow-e1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && send(input),
					placeholder: "Type a message…",
					className: "flex-1 bg-transparent text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => send(input),
					"aria-label": "Send",
					className: "rounded-full bg-brand p-2 text-on-brand disabled:opacity-50",
					disabled: thinking,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
//#endregion
export { Coach as component };

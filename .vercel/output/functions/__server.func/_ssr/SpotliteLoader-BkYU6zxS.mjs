import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { R as ShieldCheck, t as Zap } from "../_libs/lucide-react.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SpotliteLoader-BkYU6zxS.js
var import_jsx_runtime = require_jsx_runtime();
function SpotliteLoader({ message = "Restoring secure session…", subMessage = "SpotLite Business Intelligence", fullScreen = true }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-6 text-center select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-6 flex items-center justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: {
							scale: [
								1,
								1.25,
								1
							],
							opacity: [
								.35,
								.65,
								.35
							]
						},
						transition: {
							duration: 2.2,
							repeat: Infinity,
							ease: "easeInOut"
						},
						className: "absolute h-20 w-20 rounded-2xl bg-brand/30 blur-xl pointer-events-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: 360 },
						transition: {
							duration: 6,
							repeat: Infinity,
							ease: "linear"
						},
						className: "absolute h-16 w-16 rounded-2xl border border-brand/30 border-t-brand border-r-brand/10 pointer-events-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { scale: [
								1,
								1.08,
								1
							] },
							transition: {
								duration: 1.8,
								repeat: Infinity,
								ease: "easeInOut"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-6 w-6 fill-current text-white" })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col items-center mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-2xl font-black tracking-tight text-foreground",
						children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "Lite"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-widest text-brand",
						children: "Intelligence"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-1 w-48 overflow-hidden rounded-full bg-border/60 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { x: ["-100%", "100%"] },
					transition: {
						duration: 1.4,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "h-full w-24 rounded-full bg-linear-to-r from-transparent via-brand to-transparent"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				className: "text-xs font-semibold text-text-primary tracking-wide",
				children: message
			}),
			subMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.6875rem] text-text-secondary mt-1 font-medium flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3 text-brand" }), subMessage]
			})
		]
	});
	if (!fullScreen) return content;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-background/95 backdrop-blur-xs",
		children: content
	});
}
//#endregion
export { SpotliteLoader as t };

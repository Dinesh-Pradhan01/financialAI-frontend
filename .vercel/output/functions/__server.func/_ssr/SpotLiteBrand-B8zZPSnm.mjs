import { t as cn } from "./utils-BkRapwZn.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Zap } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SpotLiteBrand-B8zZPSnm.js
var import_jsx_runtime = require_jsx_runtime();
function SpotLiteBrand({ size = "sm", className, to = "/" }) {
	const isMd = size === "md";
	const brandMark = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/25 shrink-0", isMd ? "h-9 w-9" : "h-8 w-8"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
				size: isMd ? 20 : 18,
				className: "fill-current text-white"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("font-extrabold tracking-tight text-foreground leading-tight", isMd ? "text-xl" : "text-lg"),
				children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "Lite"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-semibold uppercase tracking-widest text-muted-foreground -mt-1", isMd ? "text-[9px]" : "text-[0.5625rem]"),
				children: "Intelligence"
			})]
		})]
	});
	if (to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "w-fit inline-block",
		children: brandMark
	});
	return brandMark;
}
//#endregion
export { SpotLiteBrand as t };

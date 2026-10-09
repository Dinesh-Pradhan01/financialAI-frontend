import { t as cn } from "./utils-BkRapwZn.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { $ as Plane, A as Sparkles, At as Landmark, F as ShoppingBag, Ft as Fuel, J as Repeat, L as ShieldPlus, Mn as Building2, Mt as House, Nn as Briefcase, P as ShoppingCart, Rn as Bell, X as Receipt, a as UtensilsCrossed, at as PartyPopper, g as Truck, gt as MessageCircle, ht as MessageSquare, i as Wifi, in as CreditCard, kt as Laptop, ln as Clapperboard, mt as MonitorSmartphone, on as Cloud, ot as Paperclip, r as Wrench, t as Zap, tt as Phone, v as TrendingUp, x as TrainFront, xt as Luggage, yt as Mail, zn as Banknote } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/icons-2Ya6Jeu5.js
var import_jsx_runtime = require_jsx_runtime();
var REG = {
	airlines: {
		icon: Plane,
		color: "var(--severity-low)"
	},
	fuel: {
		icon: Fuel,
		color: "var(--severity-moderate)"
	},
	restaurant: {
		icon: UtensilsCrossed,
		color: "var(--severity-high)"
	},
	grocery: {
		icon: ShoppingCart,
		color: "var(--success)"
	},
	lifestyle: {
		icon: ShoppingBag,
		color: "var(--brand-secondary)"
	},
	movies: {
		icon: Clapperboard,
		color: "var(--brand-primary)"
	},
	rail: {
		icon: TrainFront,
		color: "var(--brand-primary-hi)"
	},
	payroll: {
		icon: Banknote,
		color: "var(--brand-primary)"
	},
	salary: {
		icon: Banknote,
		color: "var(--brand-primary)"
	},
	rent: {
		icon: Building2,
		color: "var(--severity-low)"
	},
	"office-rent": {
		icon: Building2,
		color: "var(--severity-low)"
	},
	software: {
		icon: Laptop,
		color: "var(--brand-secondary)"
	},
	"software-subscription": {
		icon: Laptop,
		color: "var(--brand-secondary)"
	},
	subscription: {
		icon: Repeat,
		color: "var(--brand-secondary)"
	},
	"cloud-services": {
		icon: Cloud,
		color: "var(--brand-primary-hi)"
	},
	"office-supplies": {
		icon: Paperclip,
		color: "var(--severity-moderate)"
	},
	equipment: {
		icon: MonitorSmartphone,
		color: "var(--severity-low)"
	},
	electronics: {
		icon: MonitorSmartphone,
		color: "var(--severity-low)"
	},
	utilities: {
		icon: Zap,
		color: "var(--severity-moderate)"
	},
	internet: {
		icon: Wifi,
		color: "var(--success)"
	},
	telecom: {
		icon: Phone,
		color: "var(--brand-secondary)"
	},
	"home-services": {
		icon: Wrench,
		color: "var(--text-secondary)"
	},
	shipping: {
		icon: Truck,
		color: "var(--severity-low)"
	},
	delivery: {
		icon: Truck,
		color: "var(--severity-low)"
	},
	"professional-services": {
		icon: Briefcase,
		color: "var(--brand-primary)"
	},
	gst: {
		icon: Receipt,
		color: "var(--severity-moderate)"
	},
	fd: {
		icon: Landmark,
		color: "var(--brand-primary)"
	},
	card: {
		icon: CreditCard,
		color: "var(--brand-secondary)"
	},
	"travel-card": {
		icon: CreditCard,
		color: "var(--brand-secondary)"
	},
	home: {
		icon: House,
		color: "var(--severity-low)"
	},
	"home-loan": {
		icon: House,
		color: "var(--severity-low)"
	},
	sip: {
		icon: TrendingUp,
		color: "var(--success)"
	},
	tax: {
		icon: Receipt,
		color: "var(--severity-moderate)"
	},
	insurance: {
		icon: ShieldPlus,
		color: "var(--severity-low)"
	},
	ploan: {
		icon: Banknote,
		color: "var(--text-secondary)"
	},
	promotion: {
		icon: PartyPopper,
		color: "var(--brand-secondary)"
	},
	travel: {
		icon: Plane,
		color: "var(--severity-low)"
	},
	whatsapp: {
		icon: MessageCircle,
		color: "var(--success)"
	},
	app: {
		icon: Bell,
		color: "var(--brand-primary)"
	},
	email: {
		icon: Mail,
		color: "var(--severity-low)"
	},
	sms: {
		icon: MessageSquare,
		color: "var(--brand-secondary)"
	},
	spender: {
		icon: ShoppingBag,
		color: "var(--brand-secondary)"
	},
	traveller: {
		icon: Luggage,
		color: "var(--severity-low)"
	},
	movie: {
		icon: Clapperboard,
		color: "var(--brand-primary)"
	},
	investor: {
		icon: TrendingUp,
		color: "var(--success)"
	}
};
var FALLBACK = {
	icon: Sparkles,
	color: "var(--brand-primary)"
};
function iconFor(key) {
	return REG[key] ?? FALLBACK;
}
var sizeMap = {
	sm: {
		box: "h-7 w-7 rounded-lg",
		icon: 15
	},
	md: {
		box: "h-9 w-9 rounded-xl",
		icon: 18
	},
	lg: {
		box: "h-12 w-12 rounded-2xl",
		icon: 22
	}
};
/** A tinted rounded square containing the registry icon for `keyName`. */
function IconChip({ keyName, size = "md", className }) {
	const { icon: Icon, color } = iconFor(keyName);
	const s = sizeMap[size];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center", s.box, className),
		style: {
			backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)`,
			color
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			width: s.icon,
			height: s.icon,
			strokeWidth: 2.1
		})
	});
}
//#endregion
export { iconFor as n, IconChip as t };

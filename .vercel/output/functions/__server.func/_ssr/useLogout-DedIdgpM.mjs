import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useLogout-DedIdgpM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLogout() {
	const [loggingOut, setLoggingOut] = (0, import_react.useState)(false);
	const { logout } = useAuth();
	const nav = useNavigate();
	const handleLogout = async () => {
		if (loggingOut) return;
		setLoggingOut(true);
		try {
			await logout();
			toast.success("Logged out successfully.");
			nav({
				to: "/login",
				replace: true
			});
		} catch {
			toast.error("Logout failed. Please try again.");
		} finally {
			setLoggingOut(false);
		}
	};
	return {
		handleLogout,
		loggingOut
	};
}
//#endregion
export { useLogout as t };

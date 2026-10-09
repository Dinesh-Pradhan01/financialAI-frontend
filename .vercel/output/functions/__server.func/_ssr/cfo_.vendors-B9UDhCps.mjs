import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { r as isCFO } from "./roles-Cu-hhfHW.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as VendorDirectoryPage } from "./VendorDirectoryPage-CTf5JMta.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cfo_.vendors-B9UDhCps.js
var import_jsx_runtime = require_jsx_runtime();
function CFOVendorsRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading vendor directory…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isCFO(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "CFO Operations is strictly restricted to Chief Financial Officers (CFO).",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorDirectoryPage, {});
}
//#endregion
export { CFOVendorsRouteComponent as component };

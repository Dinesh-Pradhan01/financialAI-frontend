import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { a as isHR } from "./roles-Cu-hhfHW.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as VendorDirectoryPage } from "./VendorDirectoryPage-CTf5JMta.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hr_.vendors-C67L0MRE.js
var import_jsx_runtime = require_jsx_runtime();
function HRVendorsRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading vendor directory…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isHR(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "Vendor Directory is strictly restricted to Human Resources (HR) personnel.",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorDirectoryPage, {});
}
//#endregion
export { HRVendorsRouteComponent as component };

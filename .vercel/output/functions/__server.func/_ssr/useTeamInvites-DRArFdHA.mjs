import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _n as CircleAlert, gn as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmxB5i3Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTeamInvites-DRArFdHA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FormField = import_react.forwardRef(({ label, error, isValid, optional, helperText, leftIcon, rightElement, id, className = "", required, ...props }, ref) => {
	const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, "-") : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 text-left w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-between items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: inputId,
					className: "text-xs font-semibold text-text-primary tracking-tight",
					children: [
						label,
						" ",
						required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive font-bold",
							children: "*"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center",
				children: [
					leftIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-3.5 flex items-center pointer-events-none text-text-secondary",
						children: leftIcon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: inputId,
						ref,
						required,
						className: `w-full rounded-xl border bg-surface py-2.5 text-sm text-foreground outline-none transition-all duration-150 shadow-xs
              ${leftIcon ? "pl-10" : "px-3.5"}
              ${rightElement || isValid || error ? "pr-10" : "pr-3.5"}
              placeholder:text-text-tertiary
              ${error ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/15" : isValid ? "border-success/60 focus:border-brand focus:ring-2 focus:ring-brand/15" : "border-border-c focus:border-brand focus:ring-2 focus:ring-brand/15 hover:border-border-c/80"} ${className}`,
						...props
					}),
					rightElement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-3 flex items-center",
						children: rightElement
					}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "absolute right-3 h-4 w-4 text-destructive pointer-events-none" }) : isValid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "absolute right-3 h-4 w-4 text-success pointer-events-none" }) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.6875rem] font-medium text-destructive flex items-center gap-1 mt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}) : helperText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] text-text-secondary mt-1",
				children: helperText
			}) : null
		]
	});
});
FormField.displayName = "FormField";
var FormTextarea = import_react.forwardRef(({ label, error, isValid, optional, helperText, id, className = "", required, ...props }, ref) => {
	const textareaId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, "-") : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 text-left w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-between items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: textareaId,
					className: "text-xs font-semibold text-text-primary tracking-tight",
					children: [
						label,
						" ",
						required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive font-bold",
							children: "*"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: textareaId,
					ref,
					required,
					className: `w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-150 resize-none shadow-xs
            placeholder:text-text-tertiary
            ${error ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/15" : isValid ? "border-success/60 focus:border-brand focus:ring-2 focus:ring-brand/15" : "border-border-c focus:border-brand focus:ring-2 focus:ring-brand/15 hover:border-border-c/80"} ${className}`,
					...props
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.6875rem] font-medium text-destructive flex items-center gap-1 mt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}) : helperText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] text-text-secondary mt-1",
				children: helperText
			}) : null
		]
	});
});
FormTextarea.displayName = "FormTextarea";
function FormSelect({ label, value, onValueChange, options, placeholder = "Select an option", optional, required, error, helperText, disabled, className = "" }) {
	const normalizedOptions = options.map((opt) => typeof opt === "string" ? {
		label: opt,
		value: opt
	} : opt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 text-left w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-between items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-semibold text-text-primary tracking-tight",
					children: [
						label,
						" ",
						required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive font-bold",
							children: "*"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value,
				onValueChange,
				disabled,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: `h-10.5 rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-150 shadow-xs
            ${error ? "border-destructive focus:ring-destructive/15" : "border-border-c focus:ring-brand/15 hover:border-border-c/80"} ${className}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					className: "rounded-xl border border-border-c bg-surface shadow-e2 max-h-64 z-50",
					children: normalizedOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: opt.value,
						className: "text-xs py-2 px-3 focus:bg-surface-alt cursor-pointer rounded-lg font-medium",
						children: opt.label
					}, opt.value))
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.6875rem] font-medium text-destructive flex items-center gap-1 mt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}) : helperText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] text-text-secondary mt-1",
				children: helperText
			}) : null
		]
	});
}
/**
* Optimistically update an invite record to "revoked".
*/
function applyRevokeOptimistic(cache, inviteId) {
	return cache.map((inv) => inv.id === inviteId ? {
		...inv,
		status: "revoked",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	} : inv);
}
/**
* Optimistically update an accepted member record to "removed".
*/
function applyRemoveOptimistic(cache, memberId) {
	return cache.map((inv) => inv.id === memberId ? {
		...inv,
		status: "removed",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	} : inv);
}
/**
* Optimistically update an invite record to "pending" upon resend.
*/
function applyResendOptimistic(cache, inviteId) {
	return cache.map((inv) => inv.id === inviteId ? {
		...inv,
		status: "pending",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	} : inv);
}
/**
* Optimistically append a newly sent invite to the cache.
*/
function applySendInviteOptimistic(cache, payload, tempId = `temp-${Date.now()}`) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return [{
		id: tempId,
		email: payload.email,
		full_name: payload.full_name || null,
		role: payload.role,
		status: "pending",
		created_at: now,
		updated_at: now,
		expires_at: null
	}, ...cache];
}
var GET_INVITES_URL = "/api/auth/invites";
var SEND_INVITE_URL = "/api/auth/invite";
var RESEND_INVITE_URL = (id) => `/api/business/onboarding/resend-invite/${id}`;
var REVOKE_INVITE_URL = (id) => `/api/auth/invite/${id}`;
var REMOVE_MEMBER_URL = (id) => `/api/auth/invite/${id}/remove`;
/**
* Fetch all team invites for the current company/business.
*/
var useTeamInvites = () => {
	return useQuery({
		queryKey: queryKeys.team.invites(),
		queryFn: () => api.get(GET_INVITES_URL),
		staleTime: 60 * 1e3
	});
};
/**
* Send a new team invite (CFO or HR) with optimistic UI update.
*/
var useSendInvite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload) => api.post(SEND_INVITE_URL, payload),
		onMutate: async (payload) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
			const previousInvites = queryClient.getQueryData(queryKeys.team.invites());
			queryClient.setQueryData(queryKeys.team.invites(), (old = []) => applySendInviteOptimistic(old, payload));
			return { previousInvites };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousInvites) queryClient.setQueryData(queryKeys.team.invites(), context.previousInvites);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
		}
	});
};
/**
* Resend an existing invitation email using the canonical onboarding endpoint.
*/
var useResendInvite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (inviteId) => api.post(RESEND_INVITE_URL(inviteId)),
		onMutate: async (inviteId) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
			const previousInvites = queryClient.getQueryData(queryKeys.team.invites());
			queryClient.setQueryData(queryKeys.team.invites(), (old = []) => applyResendOptimistic(old, inviteId));
			return { previousInvites };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousInvites) queryClient.setQueryData(queryKeys.team.invites(), context.previousInvites);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
		}
	});
};
/**
* Revoke a pending team invite with optimistic UI update.
*/
var useRevokeInvite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (inviteId) => api.delete(REVOKE_INVITE_URL(inviteId)),
		onMutate: async (inviteId) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
			const previousInvites = queryClient.getQueryData(queryKeys.team.invites());
			queryClient.setQueryData(queryKeys.team.invites(), (old = []) => applyRevokeOptimistic(old, inviteId));
			return { previousInvites };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousInvites) queryClient.setQueryData(queryKeys.team.invites(), context.previousInvites);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
		}
	});
};
/**
* Remove an accepted team member (R8-2) with optimistic UI update.
*/
var useRemoveMember = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (memberId) => api.post(REMOVE_MEMBER_URL(memberId)),
		onMutate: async (memberId) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
			const previousInvites = queryClient.getQueryData(queryKeys.team.invites());
			queryClient.setQueryData(queryKeys.team.invites(), (old = []) => applyRemoveOptimistic(old, memberId));
			return { previousInvites };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousInvites) queryClient.setQueryData(queryKeys.team.invites(), context.previousInvites);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
		}
	});
};
//#endregion
export { useResendInvite as a, useTeamInvites as c, useRemoveMember as i, FormSelect as n, useRevokeInvite as o, FormTextarea as r, useSendInvite as s, FormField as t };

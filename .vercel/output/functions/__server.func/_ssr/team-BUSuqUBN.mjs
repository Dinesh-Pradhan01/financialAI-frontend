import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { $t as Ellipsis, Bn as Ban, H as Send, I as Shield, K as RotateCw, Kn as ArrowLeft, On as Calendar, R as ShieldCheck, _ as TriangleAlert, _n as CircleAlert, cn as Clock, d as UserPlus, f as UserMinus, jt as Info, l as UserX, o as Users, p as UserCheck, wt as LoaderCircle, yt as Mail, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as isCeoOrAdmin } from "./roles-Cu-hhfHW.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { t as getApiErrorMessage } from "./apiError-ooqyfQTr.mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuSeparator, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Bug9VbBS.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D6uS5Rlr.mjs";
import { a as useResendInvite, c as useTeamInvites, i as useRemoveMember, o as useRevokeInvite, s as useSendInvite, t as FormField } from "./useTeamInvites-DRArFdHA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-BUSuqUBN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeamStatsBar({ className }) {
	const { data: invites = [], isLoading, isError, error, refetch, isFetching } = useTeamInvites();
	const acceptedCount = invites.filter((i) => i.status === "accepted").length;
	const pendingCount = invites.filter((i) => i.status === "pending").length;
	const expiredCount = invites.filter((i) => i.status === "expired").length;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4", className),
		children: [
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border/80 bg-surface p-4 sm:p-5 space-y-3 shadow-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-28 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-9 rounded-xl" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-14 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-32 rounded-md" })]
			})]
		}, i))
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-destructive/30 bg-destructive/5 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-bold text-destructive",
				children: "Unable to load team statistics"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary line-clamp-1",
				children: getApiErrorMessage(error, "Failed to retrieve executive invitations.")
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			onClick: () => refetch(),
			disabled: isFetching,
			className: "shrink-0 gap-1.5 border-destructive/30 hover:bg-destructive/10 text-destructive text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: cn("h-3.5 w-3.5", isFetching && "animate-spin") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retry" })]
		})]
	});
	const statCards = [
		{
			id: "accepted",
			label: "Accepted Members",
			count: acceptedCount,
			subtext: acceptedCount === 1 ? "1 active executive" : `${acceptedCount} active executives`,
			icon: UserCheck,
			iconColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
			ambient: "from-emerald-500/20"
		},
		{
			id: "pending",
			label: "Pending Invites",
			count: pendingCount,
			subtext: pendingCount === 1 ? "1 awaiting activation" : `${pendingCount} awaiting activation`,
			icon: Clock,
			iconColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
			ambient: "from-amber-500/20"
		},
		{
			id: "expired",
			label: "Expired Invites",
			count: expiredCount,
			subtext: expiredCount > 0 ? "Requires resend" : "All links valid",
			icon: CircleAlert,
			iconColor: expiredCount > 0 ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-surface-alt text-text-tertiary border-border/60",
			ambient: expiredCount > 0 ? "from-red-500/20" : "from-zinc-500/20"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4", className),
		children: statCards.map((card) => {
			const Icon = card.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .2 },
				className: cn("relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface via-surface to-surface-alt/20 p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-brand/30 hover:shadow-sm group text-left"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300", card.ambient) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-text-secondary",
							children: card.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 shadow-2xs", card.iconColor),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-baseline gap-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-num",
								children: card.count
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary leading-relaxed font-medium",
							children: card.subtext
						})]
					})]
				})]
			}, card.id);
		})
	});
}
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function InviteForm({ className, onSuccess }) {
	const [role, setRole] = (0, import_react.useState)("cfo");
	const [email, setEmail] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [validationError, setValidationError] = (0, import_react.useState)(null);
	const sendInviteMutation = useSendInvite();
	const isSubmitting = sendInviteMutation.isPending;
	const validate = () => {
		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setValidationError("Email address is required.");
			return false;
		}
		if (!EMAIL_REGEX.test(trimmedEmail)) {
			setValidationError("Please enter a valid work email address.");
			return false;
		}
		if (role !== "cfo" && role !== "hr") {
			setValidationError("Please select a valid role (CFO or HR).");
			return false;
		}
		setValidationError(null);
		return true;
	};
	const handleSendInvite = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		const payload = {
			email: email.trim().toLowerCase(),
			role,
			full_name: fullName.trim() || void 0
		};
		try {
			const response = await sendInviteMutation.mutateAsync(payload);
			const targetRoleLabel = role.toUpperCase();
			const successMsg = response?.message || `Invitation successfully sent to ${payload.email} (${targetRoleLabel})`;
			toast.success(successMsg);
			setEmail("");
			setFullName("");
			setValidationError(null);
			onSuccess?.(response);
		} catch (err) {
			const errMsg = getApiErrorMessage(err, "Failed to send executive invitation.");
			toast.error(errMsg);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs text-left space-y-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 border-b border-border/60 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-bold text-text-primary tracking-tight",
					children: "Invite Executive Member"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary leading-relaxed",
					children: "Send a secure invitation to your CFO or HR leadership."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSendInvite,
			className: "space-y-4",
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold text-text-primary tracking-tight",
						children: ["Designated Role ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive font-bold",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: isSubmitting,
							onClick: () => {
								setRole("cfo");
								setValidationError(null);
							},
							className: cn("relative flex flex-col p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer select-none", role === "cfo" ? "border-brand bg-brand/4 ring-2 ring-brand/20 shadow-2xs" : "border-border/80 bg-surface-alt/25 hover:border-brand/30 hover:bg-surface-alt/50", isSubmitting && "opacity-60 cursor-not-allowed"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between w-full mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: cn("h-4 w-4", role === "cfo" ? "text-brand" : "text-text-secondary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs sm:text-sm text-text-primary",
										children: "CFO"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", role === "cfo" ? "bg-brand" : "bg-border") })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-text-secondary",
								children: "Financials & Reconciliation"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: isSubmitting,
							onClick: () => {
								setRole("hr");
								setValidationError(null);
							},
							className: cn("relative flex flex-col p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer select-none", role === "hr" ? "border-brand bg-brand/4 ring-2 ring-brand/20 shadow-2xs" : "border-border/80 bg-surface-alt/25 hover:border-brand/30 hover:bg-surface-alt/50", isSubmitting && "opacity-60 cursor-not-allowed"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between w-full mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: cn("h-4 w-4", role === "hr" ? "text-brand" : "text-text-secondary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs sm:text-sm text-text-primary",
										children: "HR"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", role === "hr" ? "bg-brand" : "bg-border") })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-text-secondary",
								children: "Team & Payroll Oversight"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Work Email Address",
						type: "email",
						required: true,
						disabled: isSubmitting,
						placeholder: "e.g. executive@company.com",
						value: email,
						error: validationError || void 0,
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
						onChange: (e) => {
							setEmail(e.target.value);
							if (validationError) setValidationError(null);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Full Name",
						type: "text",
						optional: true,
						disabled: isSubmitting,
						placeholder: "e.g. Ananya Roy",
						value: fullName,
						onChange: (e) => setFullName(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sendInviteMutation.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						height: 0
					},
					animate: {
						opacity: 1,
						height: "auto"
					},
					exit: {
						opacity: 0,
						height: 0
					},
					className: "rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getApiErrorMessage(sendInviteMutation.error, "Failed to dispatch invitation.") })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-text-tertiary flex items-center gap-1.5 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 shrink-0" }), "Links sent directly to recipient."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: isSubmitting || !email.trim(),
						className: "shrink-0 h-9 px-5 text-xs font-semibold gap-1.5 bg-brand text-white hover:bg-brand/90 shadow-brand transition disabled:opacity-50 cursor-pointer",
						children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sending Invite…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send Invitation" })] })
					})]
				})
			]
		})]
	});
}
function RevokeInviteDialog({ invite, isOpen, onClose, onConfirm, isProcessing }) {
	if (!invite) return null;
	const displayName = invite.full_name?.trim() || invite.email;
	const handleConfirm = async (e) => {
		e.preventDefault();
		await onConfirm(invite.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: isOpen,
		onOpenChange: (open) => !open && !isProcessing && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "max-w-md rounded-2xl p-6 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
				className: "space-y-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
						className: "text-lg font-bold font-display text-text-primary tracking-tight",
						children: "Revoke Invitation?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
						className: "text-xs text-text-secondary leading-relaxed space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							"Are you sure you want to revoke the pending invitation for",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-text-primary",
								children: displayName
							}),
							" (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-text-primary",
								children: invite.email
							}),
							")?"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-surface-alt/70 p-2.5 rounded-xl border border-border/60 text-[11px] text-text-secondary",
							children: [
								"• This invitation will be immediately invalidated and can no longer be used to complete setup.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"• The recipient will no longer be able to set up their credentials with this link.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"• This does not delete any already accepted team members."
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
				className: "pt-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: isProcessing,
					onClick: onClose,
					className: "rounded-xl text-xs font-semibold",
					children: "Keep Invitation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					disabled: isProcessing,
					onClick: handleConfirm,
					className: "rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold gap-1.5 shadow-sm cursor-pointer",
					children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Revoking…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Revoke Invite" })
				})]
			})]
		})
	});
}
function RemoveMemberDialog({ member, isOpen, onClose, onConfirm, isProcessing }) {
	if (!member) return null;
	const displayName = member.full_name?.trim() || member.email;
	const roleLabel = member.role.toUpperCase();
	const handleConfirm = async (e) => {
		e.preventDefault();
		await onConfirm(member.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: isOpen,
		onOpenChange: (open) => !open && !isProcessing && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "max-w-md rounded-2xl p-6 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
				className: "space-y-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
						className: "text-lg font-bold font-display text-text-primary tracking-tight",
						children: "Remove Member from Workspace?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
						className: "text-xs text-text-secondary leading-relaxed space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							"Are you sure you want to remove",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-text-primary",
								children: displayName
							}),
							" (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-text-primary",
								children: roleLabel
							}),
							")?"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-destructive/5 p-2.5 rounded-xl border border-destructive/20 text-[11px] text-destructive leading-relaxed",
							children: [
								"• The member will immediately lose access to this company workspace.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"• All active application login sessions are invalidated immediately.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"• Access can only be restored by creating a brand-new invitation."
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
				className: "pt-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: isProcessing,
					onClick: onClose,
					className: "rounded-xl text-xs font-semibold",
					children: "Keep Member"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					disabled: isProcessing,
					onClick: handleConfirm,
					className: "rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold gap-1.5 shadow-sm cursor-pointer",
					children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Removing…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remove Member" })
				})]
			})]
		})
	});
}
function formatInviteDate(dateStr) {
	if (!dateStr) return "—";
	try {
		const d = new Date(dateStr);
		if (Number.isNaN(d.getTime())) return "—";
		return d.toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	} catch {
		return "—";
	}
}
function getAvatarInitials(name, email) {
	if (name && name.trim().length > 0) {
		const parts = name.trim().split(/\s+/);
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return parts[0].slice(0, 2).toUpperCase();
	}
	if (email) return email.slice(0, 2).toUpperCase();
	return "EX";
}
function getStatusBadge(status) {
	switch (status.toLowerCase()) {
		case "accepted": return {
			label: "Active",
			badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
			icon: UserCheck
		};
		case "pending": return {
			label: "Pending",
			badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
			icon: Clock
		};
		case "expired": return {
			label: "Expired",
			badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
			icon: CircleAlert
		};
		case "revoked": return {
			label: "Revoked",
			badgeColor: "bg-slate-500/10 text-slate-500 border-slate-500/20",
			icon: Ban
		};
		case "removed": return {
			label: "Removed",
			badgeColor: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
			icon: UserMinus
		};
		default: return {
			label: status,
			badgeColor: "bg-surface-alt text-text-secondary border-border/60",
			icon: Users
		};
	}
}
function TeamInviteTable({ className }) {
	const { data: invites = [], isLoading, isError, error, refetch, isFetching } = useTeamInvites();
	const { user: currentUser } = useAuth();
	const resendMutation = useResendInvite();
	const revokeMutation = useRevokeInvite();
	const removeMutation = useRemoveMember();
	const [activeResendId, setActiveResendId] = (0, import_react.useState)(null);
	const [revokeTarget, setRevokeTarget] = (0, import_react.useState)(null);
	const [removeTarget, setRemoveTarget] = (0, import_react.useState)(null);
	const handleResend = async (invite) => {
		setActiveResendId(invite.id);
		try {
			const res = await resendMutation.mutateAsync(invite.id);
			toast.success(res?.message || `Invitation resent to ${invite.email}`);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to resend invitation link."));
		} finally {
			setActiveResendId(null);
		}
	};
	const handleRevokeConfirm = async (inviteId) => {
		try {
			const res = await revokeMutation.mutateAsync(inviteId);
			toast.success(res?.message || "Invitation successfully revoked.");
			setRevokeTarget(null);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to revoke invitation."));
		}
	};
	const handleRemoveConfirm = async (memberId) => {
		try {
			const res = await removeMutation.mutateAsync(memberId);
			toast.success(res?.message || "Member successfully removed from workspace.");
			setRemoveTarget(null);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to remove member."));
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-border/80 bg-surface shadow-xs p-5 space-y-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border/60 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-40 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24 rounded-md" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: [
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-surface-alt/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-10 rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-36 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-48 rounded-md" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-20 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg" })]
				})]
			}, i))
		})]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-destructive/30 bg-destructive/5 p-6 shadow-xs text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-bold text-destructive",
				children: "Failed to Load Team Directory"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary mt-0.5",
				children: getApiErrorMessage(error, "Could not retrieve executive members from server.")
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			onClick: () => refetch(),
			disabled: isFetching,
			className: "gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-semibold cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: cn("h-3.5 w-3.5", isFetching && "animate-spin") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retry" })]
		})]
	});
	if (invites.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-dashed border-border-c bg-surface-alt/25 p-8 sm:p-12 text-center space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 max-w-sm mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-bold text-text-primary",
				children: "No Executive Members Yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary leading-relaxed",
				children: "Your executive directory is empty. Use the invite form above to dispatch invitations to your CFO or HR leadership."
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-border/80 bg-surface shadow-xs overflow-hidden text-left", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 bg-surface-alt/30 px-5 py-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-text-tertiary",
					children: [
						invites.length,
						" ",
						invites.length === 1 ? "record" : "records",
						" (members & invitations)"
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[11px] text-text-secondary font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-2 w-2 rounded-full bg-emerald-500" }), " Real-time"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border/60",
				children: invites.map((invite) => {
					const statusInfo = getStatusBadge(invite.status);
					const StatusIcon = statusInfo.icon;
					const isPending = invite.status === "pending";
					const isAccepted = invite.status === "accepted";
					const isExpired = invite.status === "expired";
					const isTerminal = invite.status === "revoked" || invite.status === "removed";
					const isSelf = Boolean(currentUser?.email && invite.email && currentUser.email.toLowerCase() === invite.email.toLowerCase());
					const roleUpper = invite.role.toUpperCase();
					const initials = getAvatarInitials(invite.full_name, invite.email);
					const displayName = invite.full_name?.trim() || invite.email.split("@")[0];
					const isResendingThis = activeResendId === invite.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 hover:bg-surface-alt/25 transition-colors duration-150",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3.5 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold shadow-2xs", isAccepted ? "bg-brand text-white" : isPending ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20" : "bg-surface-alt text-text-secondary border border-border"),
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm text-text-primary tracking-tight truncate",
											children: displayName
										}),
										isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-1.5 py-0.2 rounded-md bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-wider",
											children: "You"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border", invite.role.toLowerCase() === "cfo" ? "bg-brand/10 text-brand border-brand/20" : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"),
											children: [invite.role.toLowerCase() === "cfo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: roleUpper })]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary font-mono truncate",
									children: invite.email
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 sm:gap-6 shrink-0 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-left sm:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border", statusInfo.badgeColor),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: statusInfo.label })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-text-tertiary flex items-center sm:justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isAccepted ? `Joined ${formatInviteDate(invite.created_at)}` : isPending ? `Invited ${formatInviteDate(invite.created_at)}` : isExpired ? `Expired ${formatInviteDate(invite.expires_at || invite.created_at)}` : `Updated ${formatInviteDate(invite.updated_at || invite.created_at)}` })]
								})]
							}), !isTerminal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										disabled: isResendingThis,
										className: "h-8 w-8 p-0 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer",
										"aria-label": "Manage team member actions",
										children: isResendingThis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-brand" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "w-48 rounded-xl p-1 shadow-lg text-xs",
									children: [
										isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleResend(invite),
												disabled: isResendingThis,
												className: "gap-2 cursor-pointer text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resend Invite" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => setRevokeTarget(invite),
												className: "gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Revoke" })]
											})
										] }),
										isExpired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => handleResend(invite),
											disabled: isResendingThis,
											className: "gap-2 cursor-pointer text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resend" })]
										}),
										isAccepted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-2 py-1.5 text-[11px] text-text-tertiary italic",
											children: "Active Signed-In Account"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => setRemoveTarget(invite),
											className: "gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remove from Workspace" })]
										}) })
									]
								})] })
							})]
						})]
					}, invite.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevokeInviteDialog, {
				invite: revokeTarget,
				isOpen: Boolean(revokeTarget),
				onClose: () => setRevokeTarget(null),
				onConfirm: handleRevokeConfirm,
				isProcessing: revokeMutation.isPending
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveMemberDialog, {
				member: removeTarget,
				isOpen: Boolean(removeTarget),
				onClose: () => setRemoveTarget(null),
				onConfirm: handleRemoveConfirm,
				isProcessing: removeMutation.isPending
			})
		]
	});
}
var containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: .08 }
	}
};
var itemVariants = {
	hidden: {
		opacity: 0,
		y: 10
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .25,
			ease: "easeOut"
		}
	}
};
function TeamPage() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading team workspace…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isCeoOrAdmin(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						children: "Team & User Management is strictly restricted to company Chief Executive Officers (CEO) and Workspace Administrators."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-mono text-text-tertiary",
						children: [
							"Current signed-in role:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-text-secondary uppercase",
								children: user.role ? user.role : "No Role Assigned"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/home",
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Return to Dashboard"]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: containerVariants,
		initial: "hidden",
		animate: "visible",
		className: "mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-8 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: itemVariants,
				className: "space-y-1.5 border-b border-border/60 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold font-display text-text-primary tracking-tight",
						children: "Team & User Management"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary",
					children: "Manage executive leadership access, dispatch secure verification invitations, and oversee role-based workspace permissions."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
				variants: itemVariants,
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold uppercase tracking-wider text-text-secondary",
						children: "Workspace Summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-[11px] font-semibold text-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), " Executive Governance"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamStatsBar, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
					variants: itemVariants,
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold uppercase tracking-wider text-text-secondary",
						children: "Invite Leadership"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteForm, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
					variants: itemVariants,
					className: "space-y-3 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold uppercase tracking-wider text-text-secondary",
						children: "Executive Leadership Directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamInviteTable, {})]
				})]
			})
		]
	});
}
//#endregion
export { TeamPage as component };

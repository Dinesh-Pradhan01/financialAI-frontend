import { o as __toESM } from "../_runtime.mjs";
import { c as seedNotifications } from "./agentic-C_EsON0v.mjs";
import { n as useDispatch, r as useSelector } from "../_libs/react-redux+[...].mjs";
import { a as combineReducers, i as current, n as createSlice, t as configureStore } from "../_libs/@reduxjs/toolkit+[...].mjs";
import { a as PAUSE, c as REGISTER, i as FLUSH, l as REHYDRATE, n as persistStore, o as PERSIST, r as persistReducer, s as PURGE } from "../_libs/redux-persist.mjs";
import { t as require_localforage } from "../_libs/localforage.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-i6pKH_iX.js
var import_localforage = /* @__PURE__ */ __toESM(require_localforage());
var spotlightsSlice = createSlice({
	name: "spotlights",
	initialState: {
		applied: [],
		snoozed: []
	},
	reducers: {
		applyTrigger: (state, action) => {
			const id = action.payload;
			if (!state.applied.includes(id)) state.applied.push(id);
		},
		snoozeTrigger: (state, action) => {
			const id = action.payload;
			if (!state.snoozed.includes(id)) state.snoozed.push(id);
		},
		resetSpotlights: (state) => {
			state.applied = [];
			state.snoozed = [];
		}
	}
});
var { applyTrigger, snoozeTrigger, resetSpotlights } = spotlightsSlice.actions;
var spotlightsSlice_default = spotlightsSlice.reducer;
var preferencesSlice = createSlice({
	name: "preferences",
	initialState: {
		language: "en",
		channel: "WhatsApp",
		notificationsOn: true,
		timeframe: "12M",
		consent: {
			read: true,
			detect: true,
			offers: false,
			updatedAt: null
		}
	},
	reducers: {
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setChannel: (state, action) => {
			state.channel = action.payload;
		},
		setNotificationsOn: (state, action) => {
			state.notificationsOn = action.payload;
		},
		setTimeframe: (state, action) => {
			state.timeframe = action.payload;
		},
		setConsent: (state, action) => {
			state.consent = {
				...state.consent,
				...action.payload,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
		},
		resetPreferences: (state) => {
			state.language = "en";
			state.channel = "WhatsApp";
			state.notificationsOn = true;
			state.timeframe = "12M";
			state.consent = {
				read: true,
				detect: true,
				offers: false,
				updatedAt: null
			};
		}
	}
});
var { setLanguage, setChannel, setNotificationsOn, setTimeframe, setConsent, resetPreferences } = preferencesSlice.actions;
var preferencesSlice_default = preferencesSlice.reducer;
var notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		notifications: seedNotifications,
		notificationsRead: false
	},
	reducers: {
		markNotificationsRead: (state) => {
			state.notificationsRead = true;
		},
		addNotification: (state, action) => {
			state.notifications.unshift(action.payload);
			state.notificationsRead = false;
		},
		resetNotifications: (state) => {
			state.notifications = seedNotifications;
			state.notificationsRead = false;
		}
	}
});
var { markNotificationsRead, addNotification, resetNotifications } = notificationsSlice.actions;
var notificationsSlice_default = notificationsSlice.reducer;
var coachSlice = createSlice({
	name: "coach",
	initialState: { conversation: [] },
	reducers: {
		addMessage: (state, action) => {
			state.conversation.push(action.payload);
		},
		setConversation: (state, action) => {
			state.conversation = action.payload;
		},
		clearConversation: (state) => {
			state.conversation = [];
		}
	}
});
var { addMessage, setConversation, clearConversation } = coachSlice.actions;
var coachSlice_default = coachSlice.reducer;
var tourSlice = createSlice({
	name: "tour",
	initialState: {
		seenIntro: false,
		tourStep: -1
	},
	reducers: {
		dismissIntro: (state) => {
			state.seenIntro = true;
		},
		startTour: (state) => {
			state.seenIntro = true;
			state.tourStep = 0;
		},
		setTourStep: (state, action) => {
			state.tourStep = action.payload;
		},
		endTour: (state) => {
			state.tourStep = -1;
		},
		resetTour: (state) => {
			state.seenIntro = false;
			state.tourStep = -1;
		}
	}
});
var { dismissIntro, startTour, setTourStep, endTour, resetTour } = tourSlice.actions;
var tourSlice_default = tourSlice.reducer;
var initialState$1 = { employee: {
	step: "upload",
	backendPreview: null,
	pastPreviews: [],
	lastValidatedAt: null,
	isDirtySinceValidation: false,
	filters: {
		search: "",
		department: "",
		status: "",
		employmentType: "",
		manager: "",
		bankName: "",
		accountType: "",
		paymentMode: "",
		salaryMin: "",
		salaryMax: "",
		salaryFrequency: ""
	},
	focusedRowId: null
} };
var hrSlice = createSlice({
	name: "hr",
	initialState: initialState$1,
	reducers: {
		setEmployeeStep: (state, action) => {
			state.employee.step = action.payload;
		},
		setEmployeePreview: (state, action) => {
			state.employee.backendPreview = action.payload;
			state.employee.lastValidatedAt = action.payload ? (/* @__PURE__ */ new Date()).toISOString() : null;
			state.employee.isDirtySinceValidation = false;
			state.employee.pastPreviews = [];
		},
		updateEmployeeField: (state, action) => {
			if (!state.employee.backendPreview || !state.employee.backendPreview.records) return;
			const { rowId, field, value } = action.payload;
			const idx = state.employee.backendPreview.records.findIndex((r) => r.rowId === rowId);
			if (idx === -1) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.employee.backendPreview)));
			state.employee.pastPreviews.push(snapshot);
			if (state.employee.pastPreviews.length > 50) state.employee.pastPreviews.shift();
			state.employee.isDirtySinceValidation = true;
			const target = state.employee.backendPreview.records[idx];
			target[field] = value;
			if (field === "employee_name") target.employeeName = value;
			if (field === "employeeName") target.employee_name = value;
			if (field === "employee_id") target.employeeId = value;
			if (field === "employeeId") target.employee_id = value;
			if (field === "payment_mode") target.paymentMode = value;
			if (field === "paymentMode") target.payment_mode = value;
			if (field === "joining_date") target.joiningDate = value;
			if (field === "joiningDate") target.joining_date = value;
			if (field === "previous_salary") target.previousSalary = value;
			if (field === "previousSalary") target.previous_salary = value;
			if (field === "account_number") target.accountNumber = value;
			if (field === "accountNumber") target.account_number = value;
			if (field === "ifsc_code") target.ifscCode = value;
			if (field === "ifscCode") target.ifsc_code = value;
		},
		addEmployeeRow: (state) => {
			if (!state.employee.backendPreview || !state.employee.backendPreview.records) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.employee.backendPreview)));
			state.employee.pastPreviews.push(snapshot);
			if (state.employee.pastPreviews.length > 50) state.employee.pastPreviews.shift();
			state.employee.isDirtySinceValidation = true;
			const newRowId = `row_${Math.random().toString(36).substring(2, 9)}`;
			const newRecord = { rowId: newRowId };
			if (state.employee.backendPreview.schema_def?.fields) state.employee.backendPreview.schema_def.fields.forEach((field) => {
				newRecord[field.name] = field.name === "status" ? "Active" : "";
			});
			else Object.assign(newRecord, {
				employeeId: "",
				employeeName: "",
				department: "",
				designation: "",
				status: "Active",
				salary: "",
				paymentMode: ""
			});
			state.employee.backendPreview.records.push(newRecord);
			state.employee.focusedRowId = newRowId;
		},
		undoEmployeeEdit: (state) => {
			if (state.employee.pastPreviews.length > 0) {
				const prev = state.employee.pastPreviews.pop();
				if (prev) state.employee.backendPreview = prev;
			}
		},
		discardEmployeePreview: (state) => {
			state.employee.backendPreview = null;
			state.employee.pastPreviews = [];
			state.employee.lastValidatedAt = null;
			state.employee.isDirtySinceValidation = false;
			state.employee.step = "upload";
		},
		setEmployeeFilters: (state, action) => {
			state.employee.filters = action.payload;
		},
		setEmployeeFocusedRow: (state, action) => {
			state.employee.focusedRowId = action.payload;
		},
		resetEmployee: (state) => {
			state.employee = initialState$1.employee;
		}
	}
});
var { setEmployeeStep, setEmployeePreview, updateEmployeeField, addEmployeeRow, undoEmployeeEdit, discardEmployeePreview, setEmployeeFilters, setEmployeeFocusedRow, resetEmployee } = hrSlice.actions;
var hrSlice_default = hrSlice.reducer;
var initialState = {
	vendor: {
		step: "upload",
		backendPreview: null,
		pastPreviews: [],
		lastValidatedAt: null,
		isDirtySinceValidation: false,
		filters: {
			search: "",
			industry: "",
			status: "",
			currency: "",
			contractType: "",
			paymentType: ""
		},
		focusedRowId: null,
		agreements: {}
	},
	client: {
		step: "upload",
		backendPreview: null,
		pastPreviews: [],
		lastValidatedAt: null,
		isDirtySinceValidation: false,
		filters: {
			search: "",
			category: "",
			industry: "",
			status: "",
			recurring: "",
			contractType: "",
			paymentType: ""
		},
		focusedRowId: null,
		agreements: {}
	}
};
var cfoSlice = createSlice({
	name: "cfo",
	initialState,
	reducers: {
		setVendorStep: (state, action) => {
			state.vendor.step = action.payload;
		},
		setVendorPreview: (state, action) => {
			state.vendor.backendPreview = action.payload;
			state.vendor.lastValidatedAt = action.payload ? (/* @__PURE__ */ new Date()).toISOString() : null;
			state.vendor.isDirtySinceValidation = false;
			state.vendor.pastPreviews = [];
		},
		updateVendorField: (state, action) => {
			if (!state.vendor.backendPreview || !state.vendor.backendPreview.records) return;
			const { rowId, field, value } = action.payload;
			const idx = state.vendor.backendPreview.records.findIndex((r) => r.rowId === rowId);
			if (idx === -1) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.vendor.backendPreview)));
			state.vendor.pastPreviews.push(snapshot);
			if (state.vendor.pastPreviews.length > 50) state.vendor.pastPreviews.shift();
			state.vendor.isDirtySinceValidation = true;
			const target = state.vendor.backendPreview.records[idx];
			target[field] = value;
			if (field === "vendor_name") target.vendorName = value;
			if (field === "vendorName") target.vendor_name = value;
			if (field === "vendor_id") target.vendorId = value;
			if (field === "vendorId") target.vendor_id = value;
			if (field === "contract_id") target.contractId = value;
			if (field === "contractId") target.contract_id = value;
			if (field === "contract_type") target.contractType = value;
			if (field === "contractType") target.contract_type = value;
			if (field === "gst_number") target.gstNumber = value;
			if (field === "gstNumber") target.gst_number = value;
			if (field === "pan_number") target.panNumber = value;
			if (field === "panNumber") target.pan_number = value;
			if (field === "contract_value") target.contractValue = value;
			if (field === "contractValue") target.contract_value = value;
			if (field === "monthly_cost" || field === "monthlyCost" || field === "cost") {
				target.monthly_cost = value;
				target.monthlyCost = value;
				target.cost = value;
			}
			const contractTypeStr = String(target.contract_type || target.contractType || "").trim().toLowerCase();
			const frequencyStr = String(target.frequency || "").trim().toLowerCase();
			const recurringStr = String(target.recurring ?? "").trim().toLowerCase();
			const isSubscription = contractTypeStr.includes("sub") || frequencyStr.includes("sub") || recurringStr === "true" || recurringStr === "yes" || recurringStr === "1";
			const currentMonthly = target.monthly_cost ?? target.monthlyCost ?? target.cost;
			const contractVal = Number(target.contract_value ?? target.contractValue ?? 0);
			if (isSubscription && contractVal > 0 && (currentMonthly === "" || currentMonthly == null || Number(currentMonthly) === 0 || Number.isNaN(Number(currentMonthly)))) {
				const autoMonthlyCost = Math.round(contractVal / 12 * 100) / 100;
				target.monthly_cost = autoMonthlyCost;
				target.monthlyCost = autoMonthlyCost;
				target.cost = autoMonthlyCost;
			}
			const clearIssue = (summaryObj, fieldKey) => {
				if (!summaryObj || !Array.isArray(summaryObj.issues)) return;
				const normKey = fieldKey.toLowerCase().replace(/_/g, "");
				summaryObj.issues = summaryObj.issues.filter((issue) => {
					if (!(String(issue.rowId) === String(rowId) || target.sourceRow != null && String(issue.sourceRow) === String(target.sourceRow))) return true;
					const issueFieldNorm = String(issue.field || "").toLowerCase().replace(/_/g, "");
					return !(issueFieldNorm === normKey || (normKey.includes("monthly") || normKey.includes("cost")) && (issueFieldNorm.includes("monthly") || issueFieldNorm.includes("cost")));
				});
				if (summaryObj.issues.filter((i) => (String(i.rowId) === String(rowId) || target.sourceRow != null && String(i.sourceRow) === String(target.sourceRow)) && i.severity === "error").length === 0 && Array.isArray(summaryObj.errorRowIds)) summaryObj.errorRowIds = summaryObj.errorRowIds.filter((id) => String(id) !== String(rowId));
				summaryObj.errors = summaryObj.issues.filter((i) => i.severity === "error").length;
				if (Array.isArray(state.vendor.backendPreview?.records) && Array.isArray(summaryObj.errorRowIds)) summaryObj.validVendors = state.vendor.backendPreview.records.length - summaryObj.errorRowIds.length;
			};
			if (value !== "" && value != null) {
				clearIssue(state.vendor.backendPreview.summary, field);
				clearIssue(state.vendor.backendPreview.validation, field);
			}
			const updatedMonthly = target.monthly_cost ?? target.monthlyCost;
			if (updatedMonthly !== "" && updatedMonthly != null && !Number.isNaN(Number(updatedMonthly)) && Number(updatedMonthly) > 0) {
				clearIssue(state.vendor.backendPreview.summary, "monthly_cost");
				clearIssue(state.vendor.backendPreview.validation, "monthly_cost");
			}
		},
		addVendorRow: (state) => {
			if (!state.vendor.backendPreview || !state.vendor.backendPreview.records) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.vendor.backendPreview)));
			state.vendor.pastPreviews.push(snapshot);
			if (state.vendor.pastPreviews.length > 50) state.vendor.pastPreviews.shift();
			state.vendor.isDirtySinceValidation = true;
			const newRowId = `row_${Math.random().toString(36).substring(2, 9)}`;
			const newRecord = { rowId: newRowId };
			if (state.vendor.backendPreview.schema_def?.fields) state.vendor.backendPreview.schema_def.fields.forEach((field) => {
				newRecord[field.name] = field.name === "status" ? "Active" : "";
			});
			else Object.assign(newRecord, {
				vendorId: "",
				vendorName: "",
				contractId: "",
				industry: "",
				status: "Active",
				contractType: "",
				currency: ""
			});
			state.vendor.backendPreview.records.push(newRecord);
			state.vendor.focusedRowId = newRowId;
		},
		undoVendorEdit: (state) => {
			if (state.vendor.pastPreviews.length > 0) {
				const prev = state.vendor.pastPreviews.pop();
				if (prev) state.vendor.backendPreview = prev;
			}
		},
		discardVendorPreview: (state) => {
			state.vendor.backendPreview = null;
			state.vendor.pastPreviews = [];
			state.vendor.lastValidatedAt = null;
			state.vendor.isDirtySinceValidation = false;
			state.vendor.step = "upload";
		},
		setVendorFilters: (state, action) => {
			state.vendor.filters = action.payload;
		},
		setVendorFocusedRow: (state, action) => {
			state.vendor.focusedRowId = action.payload;
		},
		resetVendor: (state) => {
			state.vendor = initialState.vendor;
		},
		setClientStep: (state, action) => {
			state.client.step = action.payload;
		},
		setClientPreview: (state, action) => {
			state.client.backendPreview = action.payload;
			state.client.lastValidatedAt = action.payload ? (/* @__PURE__ */ new Date()).toISOString() : null;
			state.client.isDirtySinceValidation = false;
			state.client.pastPreviews = [];
		},
		updateClientField: (state, action) => {
			if (!state.client.backendPreview || !state.client.backendPreview.records) return;
			const { rowId, field, value } = action.payload;
			const idx = state.client.backendPreview.records.findIndex((r) => r.rowId === rowId);
			if (idx === -1) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.client.backendPreview)));
			state.client.pastPreviews.push(snapshot);
			if (state.client.pastPreviews.length > 50) state.client.pastPreviews.shift();
			state.client.isDirtySinceValidation = true;
			const target = state.client.backendPreview.records[idx];
			target[field] = value;
			if (field === "client_name") target.clientName = value;
			if (field === "clientName") target.client_name = value;
			if (field === "client_id") target.clientId = value;
			if (field === "clientId") target.client_id = value;
			if (field === "contract_id") target.contractId = value;
			if (field === "contractId") target.contract_id = value;
			if (field === "contract_type") target.contractType = value;
			if (field === "contractType") target.contract_type = value;
			if (field === "contract_value") target.contractValue = value;
			if (field === "contractValue") target.contract_value = value;
			if (field === "legal_name") target.legalName = value;
			if (field === "legalName") target.legal_name = value;
			if (field === "payment_type") target.paymentType = value;
			if (field === "paymentType") target.payment_type = value;
			if (field === "bank_name") target.bankName = value;
			if (field === "bankName") target.bank_name = value;
			if (field === "account_holder_name") target.accountHolderName = value;
			if (field === "accountHolderName") target.account_holder_name = value;
			if (field === "account_number") target.accountNumber = value;
			if (field === "accountNumber") target.account_number = value;
			if (field === "ifsc_code") target.ifscCode = value;
			if (field === "ifscCode") target.ifsc_code = value;
		},
		addClientRow: (state) => {
			if (!state.client.backendPreview || !state.client.backendPreview.records) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.client.backendPreview)));
			state.client.pastPreviews.push(snapshot);
			if (state.client.pastPreviews.length > 50) state.client.pastPreviews.shift();
			state.client.isDirtySinceValidation = true;
			const newRowId = `row_${Math.random().toString(36).substring(2, 9)}`;
			const newRecord = {
				rowId: newRowId,
				clientId: "",
				client_id: "",
				clientName: "",
				client_name: "",
				category: "Consulting",
				revenue: 0,
				contractValue: 0,
				contract_value: 0,
				contractId: "",
				contract_id: "",
				industry: "Other",
				status: "Active",
				contractType: "Fixed Price",
				contract_type: "Fixed Price",
				currency: "INR",
				frequency: "Monthly",
				bankName: "",
				accountHolderName: "",
				accountNumber: "",
				ifscCode: ""
			};
			if (state.client.backendPreview.schema_def?.fields) state.client.backendPreview.schema_def.fields.forEach((field) => {
				if (newRecord[field.name] === void 0) newRecord[field.name] = field.name === "status" ? "Active" : "";
			});
			state.client.backendPreview.records.push(newRecord);
			state.client.focusedRowId = newRowId;
		},
		undoClientEdit: (state) => {
			if (state.client.pastPreviews.length > 0) {
				const prev = state.client.pastPreviews.pop();
				if (prev) state.client.backendPreview = prev;
			}
		},
		discardClientPreview: (state) => {
			state.client.backendPreview = null;
			state.client.pastPreviews = [];
			state.client.lastValidatedAt = null;
			state.client.isDirtySinceValidation = false;
			state.client.step = "upload";
		},
		setClientFilters: (state, action) => {
			state.client.filters = action.payload;
		},
		setClientFocusedRow: (state, action) => {
			state.client.focusedRowId = action.payload;
		},
		resetClient: (state) => {
			state.client = initialState.client;
		},
		setVendorRowAgreement: (state, action) => {
			if (!state.vendor.agreements) state.vendor.agreements = {};
			const { rowId, agreement } = action.payload;
			const currentAgreement = state.vendor.agreements[rowId] || { status: "none" };
			state.vendor.agreements[rowId] = {
				...currentAgreement,
				...agreement
			};
		},
		setClientRowAgreement: (state, action) => {
			if (!state.client.agreements) state.client.agreements = {};
			const { rowId, agreement } = action.payload;
			const currentAgreement = state.client.agreements[rowId] || { status: "none" };
			state.client.agreements[rowId] = {
				...currentAgreement,
				...agreement
			};
		},
		applyVendorExtractedData: (state, action) => {
			if (!state.vendor.backendPreview || !state.vendor.backendPreview.records) return;
			const { rowId, extracted } = action.payload;
			const idx = state.vendor.backendPreview.records.findIndex((r) => r.rowId === rowId);
			if (idx === -1) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.vendor.backendPreview)));
			state.vendor.pastPreviews.push(snapshot);
			if (state.vendor.pastPreviews.length > 50) state.vendor.pastPreviews.shift();
			state.vendor.isDirtySinceValidation = true;
			const rec = state.vendor.backendPreview.records[idx];
			const backendPreview = state.vendor.backendPreview;
			const clearIssue = (summaryObj, fieldKey) => {
				if (!summaryObj || !Array.isArray(summaryObj.issues)) return;
				const normKey = fieldKey.toLowerCase().replace(/_/g, "");
				summaryObj.issues = summaryObj.issues.filter((issue) => {
					if (!(String(issue.rowId) === String(rowId) || rec.sourceRow != null && String(issue.sourceRow) === String(rec.sourceRow))) return true;
					const issueFieldNorm = String(issue.field || "").toLowerCase().replace(/_/g, "");
					return !(issueFieldNorm === normKey || (normKey.includes("monthly") || normKey.includes("cost")) && (issueFieldNorm.includes("monthly") || issueFieldNorm.includes("cost")));
				});
				if (summaryObj.issues.filter((i) => (String(i.rowId) === String(rowId) || rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow)) && i.severity === "error").length === 0 && Array.isArray(summaryObj.errorRowIds)) summaryObj.errorRowIds = summaryObj.errorRowIds.filter((id) => String(id) !== String(rowId));
				summaryObj.errors = summaryObj.issues.filter((i) => i.severity === "error").length;
				if (Array.isArray(backendPreview?.records) && Array.isArray(summaryObj.errorRowIds)) summaryObj.validVendors = backendPreview.records.length - summaryObj.errorRowIds.length;
			};
			const isEmpty = (val) => val === void 0 || val === null || String(val).trim() === "" || String(val).trim() === "0";
			const extStartDate = extracted.contract_start_date ?? extracted.contractStartDate;
			if (extStartDate != null && isEmpty(rec.contract_start_date) && isEmpty(rec.contractStartDate)) {
				rec.contractStartDate = extStartDate;
				rec.contract_start_date = extStartDate;
				clearIssue(backendPreview.summary, "contract_start_date");
				clearIssue(backendPreview.validation, "contract_start_date");
			}
			const extEndDate = extracted.contract_end_date ?? extracted.contractEndDate;
			if (extEndDate != null && isEmpty(rec.contract_end_date) && isEmpty(rec.contractEndDate)) {
				rec.contractEndDate = extEndDate;
				rec.contract_end_date = extEndDate;
				clearIssue(backendPreview.summary, "contract_end_date");
				clearIssue(backendPreview.validation, "contract_end_date");
			}
			const extValue = extracted.contract_value ?? extracted.contractValue;
			if (extValue != null && isEmpty(rec.contract_value) && isEmpty(rec.contractValue)) {
				rec.contractValue = extValue;
				rec.contract_value = extValue;
				clearIssue(backendPreview.summary, "contract_value");
				clearIssue(backendPreview.validation, "contract_value");
			}
			if (extracted.currency != null && isEmpty(rec.currency)) {
				rec.currency = extracted.currency;
				clearIssue(backendPreview.summary, "currency");
				clearIssue(backendPreview.validation, "currency");
			}
			const extType = extracted.contract_type ?? extracted.contractType;
			if (extType != null && isEmpty(rec.contract_type) && isEmpty(rec.contractType)) {
				rec.contractType = extType;
				rec.contract_type = extType;
				clearIssue(backendPreview.summary, "contract_type");
				clearIssue(backendPreview.validation, "contract_type");
			}
			const contractVal = Number(rec.contract_value ?? rec.contractValue ?? 0);
			if ((String(rec.contract_type || rec.contractType || "").toLowerCase().includes("sub") || [
				"true",
				"yes",
				"1"
			].includes(String(rec.recurring || "").toLowerCase())) && contractVal > 0 && isEmpty(rec.monthly_cost) && isEmpty(rec.monthlyCost)) {
				const autoMonthlyCost = Math.round(contractVal / 12 * 100) / 100;
				rec.monthly_cost = autoMonthlyCost;
				rec.monthlyCost = autoMonthlyCost;
				rec.cost = autoMonthlyCost;
				clearIssue(backendPreview.summary, "monthly_cost");
				clearIssue(backendPreview.validation, "monthly_cost");
			}
			if (Array.isArray(rec.validation_errors)) {
				rec.validation_errors = (backendPreview.summary?.issues?.filter((i) => String(i.rowId) === String(rowId) || rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow)) || []).map((i) => i.message);
				rec.validation_status = rec.validation_errors.length > 0 ? "invalid" : "valid";
			}
			if (state.vendor.agreements?.[rowId]) state.vendor.agreements[rowId].isApplied = true;
		},
		applyClientExtractedData: (state, action) => {
			if (!state.client.backendPreview || !state.client.backendPreview.records) return;
			const { rowId, extracted } = action.payload;
			const idx = state.client.backendPreview.records.findIndex((r) => r.rowId === rowId);
			if (idx === -1) return;
			const snapshot = JSON.parse(JSON.stringify(current(state.client.backendPreview)));
			state.client.pastPreviews.push(snapshot);
			if (state.client.pastPreviews.length > 50) state.client.pastPreviews.shift();
			state.client.isDirtySinceValidation = true;
			const rec = state.client.backendPreview.records[idx];
			const backendPreview = state.client.backendPreview;
			const clearIssue = (summaryObj, fieldKey) => {
				if (!summaryObj || !Array.isArray(summaryObj.issues)) return;
				const normKey = fieldKey.toLowerCase().replace(/_/g, "");
				summaryObj.issues = summaryObj.issues.filter((issue) => {
					if (!(String(issue.rowId) === String(rowId) || rec.sourceRow != null && String(issue.sourceRow) === String(rec.sourceRow))) return true;
					const issueFieldNorm = String(issue.field || "").toLowerCase().replace(/_/g, "");
					return !(issueFieldNorm === normKey || (normKey.includes("monthly") || normKey.includes("cost")) && (issueFieldNorm.includes("monthly") || issueFieldNorm.includes("cost")));
				});
				if (summaryObj.issues.filter((i) => (String(i.rowId) === String(rowId) || rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow)) && i.severity === "error").length === 0 && Array.isArray(summaryObj.errorRowIds)) summaryObj.errorRowIds = summaryObj.errorRowIds.filter((id) => String(id) !== String(rowId));
				summaryObj.errors = summaryObj.issues.filter((i) => i.severity === "error").length;
				if (Array.isArray(backendPreview?.records) && Array.isArray(summaryObj.errorRowIds)) summaryObj.validVendors = backendPreview.records.length - summaryObj.errorRowIds.length;
			};
			const isEmpty = (val) => val === void 0 || val === null || String(val).trim() === "" || String(val).trim() === "0";
			const extStartDate = extracted.contract_start_date ?? extracted.contractStartDate;
			if (extStartDate != null && isEmpty(rec.contract_start_date) && isEmpty(rec.contractStartDate)) {
				rec.contractStartDate = extStartDate;
				rec.contract_start_date = extStartDate;
				clearIssue(backendPreview.summary, "contract_start_date");
				clearIssue(backendPreview.validation, "contract_start_date");
			}
			const extEndDate = extracted.contract_end_date ?? extracted.contractEndDate;
			if (extEndDate != null && isEmpty(rec.contract_end_date) && isEmpty(rec.contractEndDate)) {
				rec.contractEndDate = extEndDate;
				rec.contract_end_date = extEndDate;
				clearIssue(backendPreview.summary, "contract_end_date");
				clearIssue(backendPreview.validation, "contract_end_date");
			}
			const extValue = extracted.contract_value ?? extracted.contractValue;
			if (extValue != null && isEmpty(rec.contract_value) && isEmpty(rec.contractValue)) {
				rec.contractValue = extValue;
				rec.contract_value = extValue;
				clearIssue(backendPreview.summary, "contract_value");
				clearIssue(backendPreview.validation, "contract_value");
			}
			if (extracted.currency != null && isEmpty(rec.currency)) {
				rec.currency = extracted.currency;
				clearIssue(backendPreview.summary, "currency");
				clearIssue(backendPreview.validation, "currency");
			}
			const extType = extracted.contract_type ?? extracted.contractType;
			if (extType != null && isEmpty(rec.contract_type) && isEmpty(rec.contractType)) {
				rec.contractType = extType;
				rec.contract_type = extType;
				clearIssue(backendPreview.summary, "contract_type");
				clearIssue(backendPreview.validation, "contract_type");
			}
			const contractVal = Number(rec.contract_value ?? rec.contractValue ?? 0);
			if ((String(rec.contract_type || rec.contractType || "").toLowerCase().includes("sub") || [
				"true",
				"yes",
				"1"
			].includes(String(rec.recurring || "").toLowerCase())) && contractVal > 0 && isEmpty(rec.monthly_cost) && isEmpty(rec.monthlyCost)) {
				const autoMonthlyCost = Math.round(contractVal / 12 * 100) / 100;
				rec.monthly_cost = autoMonthlyCost;
				rec.monthlyCost = autoMonthlyCost;
				rec.cost = autoMonthlyCost;
				clearIssue(backendPreview.summary, "monthly_cost");
				clearIssue(backendPreview.validation, "monthly_cost");
			}
			if (Array.isArray(rec.validation_errors)) {
				rec.validation_errors = (backendPreview.summary?.issues?.filter((i) => String(i.rowId) === String(rowId) || rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow)) || []).map((i) => i.message);
				rec.validation_status = rec.validation_errors.length > 0 ? "invalid" : "valid";
			}
			if (state.client.agreements?.[rowId]) state.client.agreements[rowId].isApplied = true;
		}
	}
});
var { setVendorStep, setVendorPreview, updateVendorField, addVendorRow, undoVendorEdit, discardVendorPreview, setVendorFilters, setVendorFocusedRow, resetVendor, setVendorRowAgreement, applyVendorExtractedData, setClientStep, setClientPreview, updateClientField, addClientRow, undoClientEdit, discardClientPreview, setClientFilters, setClientFocusedRow, resetClient, setClientRowAgreement, applyClientExtractedData } = cfoSlice.actions;
var cfoSlice_default = cfoSlice.reducer;
var createSessionStorage = () => {
	if (typeof window === "undefined") return {
		getItem(_key) {
			return Promise.resolve(null);
		},
		setItem(_key, _value) {
			return Promise.resolve();
		},
		removeItem(_key) {
			return Promise.resolve();
		}
	};
	return {
		getItem(key) {
			try {
				return Promise.resolve(window.sessionStorage.getItem(key));
			} catch {
				return Promise.resolve(null);
			}
		},
		setItem(key, value) {
			try {
				window.sessionStorage.setItem(key, value);
				return Promise.resolve();
			} catch {
				return Promise.resolve();
			}
		},
		removeItem(key) {
			try {
				window.sessionStorage.removeItem(key);
				return Promise.resolve();
			} catch {
				return Promise.resolve();
			}
		}
	};
};
var storage = createSessionStorage();
var hrPersistConfig = {
	key: "hr",
	version: 3,
	storage: typeof window !== "undefined" ? import_localforage.default : {
		getItem: (_key) => Promise.resolve(null),
		setItem: (_key, _value) => Promise.resolve(),
		removeItem: (_key) => Promise.resolve()
	}
};
var cfoPersistConfig = {
	key: "cfo",
	version: 2,
	storage: typeof window !== "undefined" ? {
		async getItem(key) {
			const value = await import_localforage.default.getItem(key);
			if (value) return value;
			try {
				const hrRaw = await import_localforage.default.getItem("hr");
				if (hrRaw) {
					const parsed = typeof hrRaw === "string" ? JSON.parse(hrRaw) : hrRaw;
					const vendorPart = parsed?.vendor ? typeof parsed.vendor === "string" ? JSON.parse(parsed.vendor) : parsed.vendor : null;
					if (vendorPart && (vendorPart.backendPreview || vendorPart.step === "preview")) return JSON.stringify({
						vendor: vendorPart,
						_persist: {
							version: 1,
							rehydrated: true
						}
					});
				}
			} catch {}
			return null;
		},
		setItem: (key, value) => import_localforage.default.setItem(key, value),
		removeItem: (key) => import_localforage.default.removeItem(key)
	} : {
		getItem: (_key) => Promise.resolve(null),
		setItem: (_key, _value) => Promise.resolve(),
		removeItem: (_key) => Promise.resolve()
	},
	migrate: (state) => {
		if (state) {
			if (state.vendor && !state.vendor.agreements) state.vendor.agreements = {};
			if (state.client && !state.client.agreements) state.client.agreements = {};
		}
		return Promise.resolve(state);
	}
};
var rootReducer = combineReducers({
	spotlights: spotlightsSlice_default,
	preferences: preferencesSlice_default,
	notifications: notificationsSlice_default,
	coach: coachSlice_default,
	tour: tourSlice_default,
	hr: persistReducer(hrPersistConfig, hrSlice_default),
	cfo: persistReducer(cfoPersistConfig, cfoSlice_default)
});
var store = configureStore({
	reducer: persistReducer({
		key: "spotlite-rtk",
		version: 1,
		storage,
		whitelist: [
			"spotlights",
			"preferences",
			"notifications",
			"coach",
			"tour"
		]
	}, rootReducer),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [
		FLUSH,
		REHYDRATE,
		PAUSE,
		PERSIST,
		PURGE,
		REGISTER
	] } }),
	devTools: false
});
var persistor = persistStore(store);
var useAppDispatch = useDispatch;
var useAppSelector = useSelector;
//#endregion
export { setEmployeeFocusedRow as A, setVendorRowAgreement as B, setClientFilters as C, setClientStep as D, setClientRowAgreement as E, setTimeframe as F, undoClientEdit as G, snoozeTrigger as H, setTourStep as I, updateClientField as J, undoEmployeeEdit as K, setVendorFilters as L, setEmployeeStep as M, setLanguage as N, setConsent as O, setNotificationsOn as P, useAppSelector as Q, setVendorFocusedRow as R, setChannel as S, setClientPreview as T, startTour as U, setVendorStep as V, store as W, updateVendorField as X, updateEmployeeField as Y, useAppDispatch as Z, resetNotifications as _, applyClientExtractedData as a, resetTour as b, clearConversation as c, discardVendorPreview as d, dismissIntro as f, resetEmployee as g, resetClient as h, addVendorRow as i, setEmployeePreview as j, setEmployeeFilters as k, discardClientPreview as l, persistor as m, addEmployeeRow as n, applyTrigger as o, endTour as p, undoVendorEdit as q, addMessage as r, applyVendorExtractedData as s, addClientRow as t, discardEmployeePreview as u, resetPreferences as v, setClientFocusedRow as w, resetVendor as x, resetSpotlights as y, setVendorPreview as z };

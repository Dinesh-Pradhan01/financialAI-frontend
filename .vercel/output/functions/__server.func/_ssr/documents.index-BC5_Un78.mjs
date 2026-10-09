import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, d as Content, p as Overlay, u as Close } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Bt as File$1, Cn as ChevronDown, Gn as ArrowRight, Hn as ArrowUp, Ht as FileUp, K as RotateCw, O as Square, On as Calendar, Ot as Layers, Q as Plus, R as ShieldCheck, U as Search, Ut as FileText, Wn as ArrowUpDown, Wt as FileSpreadsheet, Xt as Eye, Y as RefreshCw, Yt as FileCheckCorner, _n as CircleAlert, b as Trash2, bn as ChevronUp, cn as Clock, en as EllipsisVertical, fn as CircleQuestionMark, gn as CircleCheck, jt as Info, k as SquareCheckBig, lt as Package, m as Upload, n as X, nt as Pencil, p as UserCheck, qn as ArrowDown, qt as FileImage, sn as CloudUpload, tn as Download, ut as PackagePlus, wn as Check, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogPortal, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { _ as useNavigate, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { t as getApiErrorMessage } from "./apiError-ooqyfQTr.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-ChRg7xbO.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmxB5i3Q.mjs";
import { n as Input, t as Checkbox } from "./input-RnTFYsbl.mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuSeparator, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Bug9VbBS.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D6uS5Rlr.mjs";
import { a as getDomainForCategory, c as resolveVaultPlacement, i as getCanonicalCategory, n as ORDERED_CANONICAL_CATEGORIES, o as getTaxonomyDocument, r as ORDERED_TOP_LEVEL_DOMAINS, t as CANONICAL_CATEGORIES } from "./categoryNormalizer-CSNT55UY.mjs";
import { a as validateFile, i as buildUploadFormData, n as ACCEPTED_FILE_FORMATS_STRING, r as UPLOAD_CONSTRAINTS_LABEL, t as ACCEPTED_FILE_EXTENSIONS } from "./uploadHelpers-BBrCko7t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents.index-BC5_Un78.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Optimistically remove a document by ID from the documents cache.
*/
function applyDeleteDocumentOptimistic(cache, docId) {
	return cache.filter((doc) => doc.id !== docId);
}
/**
* Optimistically touch the updated_at timestamp on a replacing document.
*/
function applyReplaceDocumentOptimistic(cache, docId) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return cache.map((doc) => doc.id === docId ? {
		...doc,
		updated_at: now
	} : doc);
}
/**
* List all company documents. Reuses the existing queryKeys.company.documents() key.
*/
var useDocuments = () => {
	return useQuery({
		queryKey: queryKeys.company.documents(),
		queryFn: () => api.get("/api/company/documents"),
		staleTime: 300 * 1e3
	});
};
/**
* Replace an existing company document (PUT /api/company/documents/{doc_id})
* with optimistic UI timestamp touch and multi-key cancellation.
*/
var useReplaceDocument = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ docId, formData }) => api.upload(`/api/company/documents/${docId}`, formData, "PUT", { timeoutMs: 12e4 }),
		onMutate: async ({ docId }) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.company.documents() });
			await queryClient.cancelQueries({ queryKey: queryKeys.company.packages() });
			await queryClient.cancelQueries({ queryKey: queryKeys.company.rating() });
			const previousDocuments = queryClient.getQueryData(queryKeys.company.documents());
			queryClient.setQueryData(queryKeys.company.documents(), (old = []) => applyReplaceDocumentOptimistic(old, docId));
			return { previousDocuments };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousDocuments) queryClient.setQueryData(queryKeys.company.documents(), context.previousDocuments);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.documents() });
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
			queryClient.refetchQueries({ queryKey: queryKeys.company.rating() });
		}
	});
};
/**
* Delete a company document (DELETE /api/company/documents/{doc_id})
* with instant optimistic row removal and multi-key cancellation.
*/
var useDeleteDocument = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (docId) => api.delete(`/api/company/documents/${docId}`),
		onMutate: async (docId) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.company.documents() });
			await queryClient.cancelQueries({ queryKey: queryKeys.company.packages() });
			await queryClient.cancelQueries({ queryKey: queryKeys.company.rating() });
			const previousDocuments = queryClient.getQueryData(queryKeys.company.documents());
			queryClient.setQueryData(queryKeys.company.documents(), (old = []) => applyDeleteDocumentOptimistic(old, docId));
			return { previousDocuments };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousDocuments) queryClient.setQueryData(queryKeys.company.documents(), context.previousDocuments);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.documents() });
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
			queryClient.refetchQueries({ queryKey: queryKeys.company.rating() });
		}
	});
};
/**
* Download a document file as a binary blob and trigger browser download.
*/
async function downloadDocument(docId, filename) {
	const blob = await api.download(`/api/company/documents/${docId}/download`);
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
}
/**
* List all company packages.
*/
var usePackages = () => {
	return useQuery({
		queryKey: queryKeys.company.packages(),
		queryFn: () => api.get("/api/company/packages"),
		staleTime: 300 * 1e3
	});
};
/**
* Create a new document package.
*/
var useCreatePackage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload) => api.post("/api/company/packages", payload),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
		}
	});
};
/**
* Rename an existing package.
*/
var useRenamePackage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ pkgId, name }) => api.patch(`/api/company/packages/${pkgId}`, { name }),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
		}
	});
};
/**
* Disband / delete an entire package.
*/
var useDisbandPackage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (pkgId) => api.delete(`/api/company/packages/${pkgId}`),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
		}
	});
};
/**
* Add documents to a package.
*/
var useAddDocumentsToPackage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ pkgId, documentIds }) => api.post(`/api/company/packages/${pkgId}/documents`, { document_ids: documentIds }),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
		}
	});
};
/**
* Remove documents from a package.
*/
var useRemoveDocumentsFromPackage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ pkgId, documentIds }) => api.delete(`/api/company/packages/${pkgId}/documents`, { body: JSON.stringify({ document_ids: documentIds }) }),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
		}
	});
};
var STORAGE_KEY = "spotlight_upload_queue_v1";
/**
* Serializes queue metadata to localStorage.
* Does not store non-serializable File blobs.
*/
function savePersistedQueue(records) {
	if (typeof window === "undefined" || !window.localStorage) return;
	try {
		const cleanRecords = records.filter((r) => r.status !== "cancelled").slice(-25);
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanRecords));
	} catch (err) {
		console.warn("Failed to save upload queue to localStorage:", err);
	}
}
/**
* Loads persisted queue records on initialization.
* Any in-flight uploads ('queued', 'uploading', 'processing') from a previous session
* are marked as interrupted errors since their memory File buffers were discarded.
*/
function loadPersistedQueue() {
	if (typeof window === "undefined" || !window.localStorage) return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.map((item) => {
			if (item.status === "queued" || item.status === "uploading" || item.status === "processing") return {
				...item,
				status: "error",
				isInterrupted: true,
				stage: "Upload interrupted",
				errorMessage: "Upload was interrupted when the browser closed or refreshed. The original file binary is no longer in memory. Please re-upload."
			};
			return item;
		});
	} catch (err) {
		console.warn("Failed to load upload queue from localStorage:", err);
		return [];
	}
}
function syncToStorage(items) {
	savePersistedQueue(items.map((i) => ({
		id: i.id,
		fileName: i.fileName,
		fileSize: i.fileSize,
		documentType: i.documentType,
		documentCategory: i.documentCategory,
		status: i.status,
		stage: i.stage,
		errorMessage: i.errorMessage,
		verifyingMessage: i.verifyingMessage,
		uncertainClassification: i.uncertainClassification,
		uploadedDocument: i.uploadedDocument,
		createdAt: i.createdAt,
		isInterrupted: i.isInterrupted
	})));
}
function useUploadQueue(options = {}) {
	const [items, setItems] = (0, import_react.useState)(() => {
		return loadPersistedQueue().map((rec) => ({
			...rec,
			file: new File([], rec.fileName, { type: "application/pdf" })
		}));
	});
	const itemsRef = (0, import_react.useRef)(items);
	const isProcessingRef = (0, import_react.useRef)(false);
	const queryClient = useQueryClient();
	const optionsRef = (0, import_react.useRef)(options);
	optionsRef.current = options;
	const updateItem = (0, import_react.useCallback)((id, patch) => {
		itemsRef.current = itemsRef.current.map((item) => item.id === id ? {
			...item,
			...patch
		} : item);
		syncToStorage(itemsRef.current);
		setItems([...itemsRef.current]);
	}, []);
	const processNext = (0, import_react.useCallback)(async () => {
		if (isProcessingRef.current) return;
		const nextItem = itemsRef.current.find((item) => item.status === "queued");
		if (!nextItem) {
			isProcessingRef.current = false;
			return;
		}
		if (nextItem.isInterrupted || nextItem.file.size === 0) {
			updateItem(nextItem.id, {
				status: "error",
				isInterrupted: true,
				stage: "Missing file payload",
				errorMessage: "File binary was lost when the browser refreshed. Please re-upload."
			});
			isProcessingRef.current = false;
			setTimeout(() => {
				processNext();
			}, 50);
			return;
		}
		isProcessingRef.current = true;
		const currentId = nextItem.id;
		const currentFile = nextItem.file;
		const docType = nextItem.documentType;
		const docCat = nextItem.documentCategory;
		updateItem(currentId, {
			status: "uploading",
			stage: "Uploading binary payload to secure vault...",
			errorMessage: void 0,
			verifyingMessage: void 0
		});
		const processingTimer = setTimeout(() => {
			updateItem(currentId, {
				status: "processing",
				stage: "Classifying document & running statutory verification..."
			});
		}, 1200);
		const slowWarningTimer = setTimeout(() => {
			updateItem(currentId, { verifyingMessage: "Deep statutory analysis taking longer than usual... finalizing checks" });
		}, 15e3);
		try {
			const formData = buildUploadFormData(currentFile, {
				documentType: docType,
				documentCategory: docCat
			});
			const response = await api.upload("/api/company/documents", formData, "POST", { timeoutMs: 12e4 });
			clearTimeout(processingTimer);
			clearTimeout(slowWarningTimer);
			updateItem(currentId, {
				status: "done",
				stage: "Document verified & ready in vault",
				uncertainClassification: response.document_category === "Others / Unclassified" || response.document_type === "Unknown" || !response.document_type,
				uploadedDocument: response
			});
			toast.success(`Uploaded and verified "${currentFile.name}"`);
			await Promise.all([
				queryClient.refetchQueries({ queryKey: queryKeys.company.documents() }),
				queryClient.refetchQueries({ queryKey: queryKeys.company.packages() }),
				queryClient.refetchQueries({ queryKey: queryKeys.company.rating() })
			]);
			optionsRef.current.onItemSuccess?.(nextItem, response);
		} catch (err) {
			clearTimeout(processingTimer);
			clearTimeout(slowWarningTimer);
			let rawMsg = getApiErrorMessage(err, "Verification or upload failed");
			if (rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("duplicate") || rawMsg.toLowerCase().includes("hash")) rawMsg = "A document with identical content has already been uploaded.";
			updateItem(currentId, {
				status: "error",
				stage: "Upload or verification failed",
				errorMessage: rawMsg
			});
			toast.error(`Failed to upload "${currentFile.name}": ${rawMsg}`);
			optionsRef.current.onItemError?.(nextItem, err);
		} finally {
			clearTimeout(processingTimer);
			clearTimeout(slowWarningTimer);
			isProcessingRef.current = false;
			setTimeout(() => {
				processNext();
			}, 50);
		}
	}, [queryClient, updateItem]);
	(0, import_react.useEffect)(() => {
		if (items.some((item) => item.status === "queued") && !isProcessingRef.current) processNext();
	}, [items, processNext]);
	const enqueue = (0, import_react.useCallback)((files, config) => {
		const newItems = [];
		for (const file of files) {
			const validation = validateFile(file);
			if (!validation.valid) {
				toast.error(validation.error || `File ${file.name} is invalid.`);
				continue;
			}
			const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
			newItems.push({
				id,
				file,
				fileName: file.name,
				fileSize: file.size,
				documentType: config?.documentType,
				documentCategory: config?.documentCategory,
				status: "queued",
				stage: "Queued for upload",
				createdAt: Date.now()
			});
		}
		if (newItems.length > 0) {
			itemsRef.current = [...itemsRef.current, ...newItems];
			syncToStorage(itemsRef.current);
			setItems([...itemsRef.current]);
		}
	}, []);
	const cancel = (0, import_react.useCallback)((id) => {
		itemsRef.current = itemsRef.current.map((item) => {
			if (item.id === id && item.status === "queued") return {
				...item,
				status: "cancelled",
				stage: "Cancelled by user"
			};
			return item;
		});
		syncToStorage(itemsRef.current);
		setItems([...itemsRef.current]);
	}, []);
	const retry = (0, import_react.useCallback)((id, newFile) => {
		const target = itemsRef.current.find((item) => item.id === id);
		if (!target) return;
		if (target.isInterrupted && !newFile) {
			toast.error("Original file content was lost on page refresh. Please re-select the file.");
			return;
		}
		itemsRef.current = itemsRef.current.map((item) => {
			if (item.id === id) {
				const fileToUse = newFile || item.file;
				return {
					...item,
					file: fileToUse,
					fileName: fileToUse.name,
					fileSize: fileToUse.size,
					status: "queued",
					stage: "Re-queued for upload",
					errorMessage: void 0,
					isInterrupted: false
				};
			}
			return item;
		});
		syncToStorage(itemsRef.current);
		setItems([...itemsRef.current]);
	}, []);
	const dismissItem = (0, import_react.useCallback)((id) => {
		itemsRef.current = itemsRef.current.filter((item) => item.id !== id);
		syncToStorage(itemsRef.current);
		setItems([...itemsRef.current]);
	}, []);
	const clearCompleted = (0, import_react.useCallback)(() => {
		itemsRef.current = itemsRef.current.filter((item) => item.status !== "done" && item.status !== "cancelled");
		syncToStorage(itemsRef.current);
		setItems([...itemsRef.current]);
	}, []);
	const clearFailed = (0, import_react.useCallback)(() => {
		itemsRef.current = itemsRef.current.filter((item) => item.status !== "error");
		syncToStorage(itemsRef.current);
		setItems([...itemsRef.current]);
	}, []);
	const inProgressItems = items.filter((item) => item.status === "uploading" || item.status === "processing");
	const queuedItems = items.filter((item) => item.status === "queued");
	const failedItems = items.filter((item) => item.status === "error");
	const recentCompleted = items.filter((item) => item.status === "done");
	const isUploading = items.some((item) => item.status === "uploading");
	const isProcessing = items.some((item) => item.status === "processing");
	const activeCount = inProgressItems.length;
	const queuedCount = queuedItems.length;
	const failedCount = failedItems.length;
	const completedCount = recentCompleted.length;
	const totalActiveJobs = activeCount + queuedCount;
	return {
		items,
		inProgressItems,
		queuedItems,
		failedItems,
		recentCompleted,
		enqueue,
		cancel,
		retry,
		dismissItem,
		clearCompleted,
		clearFailed,
		isUploading,
		isProcessing,
		queuedCount,
		activeCount,
		failedCount,
		completedCount,
		totalActiveJobs,
		hasActiveJobs: totalActiveJobs > 0,
		hasFailedJobs: failedCount > 0,
		hasInterruptedJobs: items.some((item) => item.isInterrupted)
	};
}
/**
* Cleanly format a document type string for display.
* Falls back to "Unclassified Document" for missing, empty, or unknown values.
*/
function formatDocumentType(documentType) {
	if (!documentType) return "Unclassified Document";
	const raw = documentType.trim();
	const lower = raw.toLowerCase();
	if (lower === "unknown" || lower === "other" || lower === "unclassified" || lower === "") return "Unclassified Document";
	const taxonomyDoc = getTaxonomyDocument(raw);
	if (taxonomyDoc?.label) return taxonomyDoc.label;
	return raw.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
}
/**
* Formats a file size in bytes to a human-readable string (e.g., "1.2 MB").
*/
function formatFileSize$1(bytes) {
	if (bytes === null || bytes === void 0 || Number.isNaN(bytes) || bytes <= 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
	return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
/**
* Formats an ISO date string into standard executive date format: "12 Oct 2026" (Indian / UK standard).
*/
function formatDocumentDate$1(dateStr) {
	if (!dateStr) return "—";
	try {
		const date = new Date(dateStr);
		if (Number.isNaN(date.getTime())) return "—";
		return date.toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	} catch {
		return "—";
	}
}
/**
* Filter and sort a collection of documents in memory.
* Accepts either a top-level domain ID or a canonical category ID.
*/
function filterAndSortDocuments(documents, options = {}) {
	const { categoryFilter = "all", searchQuery = "", sortOrder = "newest" } = options;
	const q = searchQuery.trim().toLowerCase();
	return [...documents.filter((doc) => {
		if (categoryFilter !== "all") {
			const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
			const matchesSection = placement.sectionId === categoryFilter;
			const matchesSub = placement.subCategoryId === categoryFilter;
			if (!matchesSection && !matchesSub) return false;
		}
		if (q) {
			const originalName = (doc.original_name ?? "").toLowerCase();
			const docType = (doc.document_type ?? "").toLowerCase();
			const formattedType = formatDocumentType(doc.document_type).toLowerCase();
			const notes = (doc.verification_notes ?? "").toLowerCase();
			if (!(originalName.includes(q) || docType.includes(q) || formattedType.includes(q) || notes.includes(q))) return false;
		}
		return true;
	})].sort((a, b) => {
		switch (sortOrder) {
			case "newest": {
				const timeA = new Date(a.created_at || 0).getTime();
				return new Date(b.created_at || 0).getTime() - timeA;
			}
			case "oldest": return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
			case "name_asc": return (a.original_name || "").localeCompare(b.original_name || "");
			case "name_desc": return (b.original_name || "").localeCompare(a.original_name || "");
			case "size_desc": return (b.file_size_bytes || 0) - (a.file_size_bytes || 0);
			default: return 0;
		}
	});
}
/**
* Calculates attention flags using verification and quality signals.
*/
function calculateSubcategoryAttention(_subCategoryId, uploadedDocuments) {
	return {
		missingRequiredCount: 0,
		needsAttentionCount: uploadedDocuments.filter((d) => !d.is_verified || d.upload_status === "failed" || d.quality_score !== null && d.quality_score < 70).length
	};
}
/**
* Groups documents hierarchically:
* Top-Level Domain -> Subcategory (Document Family) -> CompanyDocument[]
*
* Guarantees zero dropped documents by resolving each file directly
* through vaultManifest.ts resolveVaultPlacement.
*/
function groupDocumentsByHierarchy(documents) {
	const sectionMap = /* @__PURE__ */ new Map();
	for (const doc of documents) {
		const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
		let subMap = sectionMap.get(placement.sectionId);
		if (!subMap) {
			subMap = /* @__PURE__ */ new Map();
			sectionMap.set(placement.sectionId, subMap);
		}
		const list = subMap.get(placement.subCategoryId);
		if (list) list.push(doc);
		else subMap.set(placement.subCategoryId, [doc]);
	}
	const domainGroups = [];
	for (const domain of ORDERED_TOP_LEVEL_DOMAINS) {
		const subMap = sectionMap.get(domain.id);
		if (!subMap || subMap.size === 0) continue;
		const subcategories = [];
		let domainTotal = 0;
		let domainMissingRequired = 0;
		let domainNeedsAttention = 0;
		for (const catId of domain.canonicalCategoryIds) {
			const docs = subMap.get(catId);
			if (docs && docs.length > 0) {
				const attention = calculateSubcategoryAttention(catId, docs);
				domainMissingRequired += attention.missingRequiredCount;
				domainNeedsAttention += attention.needsAttentionCount;
				subcategories.push({
					category: CANONICAL_CATEGORIES[catId] || getCanonicalCategory(docs[0].document_category, docs[0].document_type),
					documents: docs,
					missingRequiredCount: attention.missingRequiredCount,
					needsAttentionCount: attention.needsAttentionCount
				});
				domainTotal += docs.length;
			}
		}
		for (const [subId, docs] of subMap.entries()) if (!domain.canonicalCategoryIds.includes(subId) && docs.length > 0) {
			const attention = calculateSubcategoryAttention(subId, docs);
			domainMissingRequired += attention.missingRequiredCount;
			domainNeedsAttention += attention.needsAttentionCount;
			subcategories.push({
				category: CANONICAL_CATEGORIES[subId] || getCanonicalCategory(docs[0].document_category, docs[0].document_type),
				documents: docs,
				missingRequiredCount: attention.missingRequiredCount,
				needsAttentionCount: attention.needsAttentionCount
			});
			domainTotal += docs.length;
		}
		if (subcategories.length > 0) domainGroups.push({
			domain,
			subcategories,
			totalDocuments: domainTotal,
			missingRequiredCount: domainMissingRequired,
			needsAttentionCount: domainNeedsAttention
		});
	}
	return domainGroups;
}
/**
* Generates the compact repository structure overview for Section 8 ("All" view).
* Returns all top-level domains and their subcategories with document counts and
* attention indicators.
*/
function getRepositoryStructureOverview(documents) {
	const sectionMap = /* @__PURE__ */ new Map();
	for (const doc of documents) {
		const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
		let subMap = sectionMap.get(placement.sectionId);
		if (!subMap) {
			subMap = /* @__PURE__ */ new Map();
			sectionMap.set(placement.sectionId, subMap);
		}
		const list = subMap.get(placement.subCategoryId);
		if (list) list.push(doc);
		else subMap.set(placement.subCategoryId, [doc]);
	}
	const overviewRows = [];
	for (const domain of ORDERED_TOP_LEVEL_DOMAINS) {
		const subMap = sectionMap.get(domain.id);
		const domainDocsCount = subMap ? Array.from(subMap.values()).reduce((acc, docs) => acc + docs.length, 0) : 0;
		if (domain.id === "miscellaneous" && domainDocsCount === 0) continue;
		const subcategoryRows = [];
		let domainMissingRequired = 0;
		let domainNeedsAttention = 0;
		for (const catId of domain.canonicalCategoryIds) {
			const docs = subMap?.get(catId) || [];
			const attention = calculateSubcategoryAttention(catId, docs);
			domainMissingRequired += attention.missingRequiredCount;
			domainNeedsAttention += attention.needsAttentionCount;
			const catConfig = CANONICAL_CATEGORIES[catId] || getCanonicalCategory(docs[0]?.document_category, docs[0]?.document_type);
			subcategoryRows.push({
				category: catConfig,
				documentCount: docs.length,
				missingRequiredCount: attention.missingRequiredCount,
				needsAttentionCount: attention.needsAttentionCount
			});
		}
		overviewRows.push({
			domain,
			totalDocuments: domainDocsCount,
			missingRequiredCount: domainMissingRequired,
			needsAttentionCount: domainNeedsAttention,
			subcategories: subcategoryRows
		});
	}
	return overviewRows;
}
/**
* Calculates compact repository telemetry from documents array.
*/
function calculateRepositoryMetrics(documents) {
	const totalCount = documents.length;
	const verifiedCount = documents.filter((d) => Boolean(d.is_verified)).length;
	const reviewedPercentage = totalCount > 0 ? Math.round(verifiedCount / totalCount * 100) : 0;
	const totalBytes = documents.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);
	return {
		totalCount,
		verifiedCount,
		reviewedPercentage,
		totalBytes,
		formattedTotalSize: formatFileSize$1(totalBytes)
	};
}
/**
* Format bytes into clean human-readable size (e.g., "245 KB", "1.2 MB").
*/
function formatFileSize(bytes) {
	if (!bytes || bytes <= 0) return "0 KB";
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
/**
* Format ISO date string to localized date (e.g., "21 Aug 2026").
*/
function formatDocumentDate(dateStr) {
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
/**
* Interpret quality status truthfully according to backend invariants.
*
* Backend Invariants:
* - quality_score === null: Text extraction skipped (e.g. image) or AI unavailable -> "Not checked"
* - quality_score !== null && is_verified === true: Automated AI check passed score threshold (>=50) and ID check -> "Passed quality check"
* - Stored documents do not persist a false + score state (backend raises HTTP 400 pre-storage).
*/
function getQualityPresentation(doc) {
	if (doc.quality_score === null || doc.quality_score === void 0) return {
		status: "not_checked",
		label: "Not checked",
		score: null
	};
	return {
		status: "passed",
		label: "QC Passed",
		score: doc.quality_score
	};
}
function DocumentQualityBadge({ document, showTooltip = true }) {
	const quality = getQualityPresentation(document);
	const notes = document.verification_notes?.trim() || null;
	const badgeElement = quality.status === "passed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: "bg-success/12 text-success border-success/25 text-xs font-semibold gap-1 shrink-0 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }),
			quality.label,
			notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-2.5 w-2.5 opacity-70 ml-0.5" })
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: "bg-muted/50 text-muted-foreground border-border/60 text-xs font-medium gap-1 shrink-0 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3 w-3" }),
			quality.label,
			notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-2.5 w-2.5 opacity-70 ml-0.5" })
		]
	});
	if (showTooltip && notes) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		className: "cursor-pointer focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none rounded-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "inline-flex items-center gap-1 p-0 border-0 bg-transparent text-left",
			"aria-label": `${quality.label} - View verification details`,
			title: "Click or tap to view verification details",
			children: badgeElement
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
		side: "top",
		align: "center",
		className: "max-w-xs text-xs p-3 shadow-md bg-surface border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold text-xs flex items-center gap-1.5 text-text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 text-brand shrink-0" }), "Verification Details"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-text-secondary leading-relaxed text-xs wrap-break-word",
				children: notes
			})]
		})
	})] });
	return badgeElement;
}
function getFileFormatIcon(mimeType, filename) {
	const mime = (mimeType || "").toLowerCase();
	const ext = (filename || "").split(".").pop()?.toLowerCase();
	if (mime.includes("pdf") || ext === "pdf") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-brand" });
	if (mime.includes("sheet") || mime.includes("excel") || mime.includes("csv") || ext === "xlsx" || ext === "xls" || ext === "csv") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-400" });
	if (mime.includes("image") || ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "webp") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "h-4 w-4 text-amber-600 dark:text-amber-400" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File$1, { className: "h-4 w-4 text-text-secondary" });
}
function DocumentCard({ document: doc, onPreview, onDownload, onReplace, onDelete, onAddToPackage, isDownloading = false, className }) {
	const [isMenuOpen, setIsMenuOpen] = (0, import_react.useState)(false);
	const formattedType = formatDocumentType(doc.document_type);
	const categoryConfig = getCanonicalCategory(doc.document_category, doc.document_type);
	const domainConfig = getDomainForCategory(categoryConfig.id);
	const formattedSize = formatFileSize$1(doc.file_size_bytes);
	const formattedDate = formatDocumentDate$1(doc.created_at);
	const CategoryIcon = categoryConfig.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group relative flex flex-col justify-between rounded-2xl border border-border-c/90 bg-surface p-4.5 shadow-2xs transition-all duration-200 hover:border-brand/40 hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.995] motion-reduce:transform-none motion-reduce:transition-none min-h-[170px]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt border border-border-c/60 shadow-2xs",
						children: getFileFormatIcon(doc.mime_type, doc.original_name)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs font-semibold text-text-primary tracking-tight",
							title: formattedType,
							children: formattedType
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs text-text-secondary mt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { className: "h-3 w-3 shrink-0 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								title: `${domainConfig.label} › ${categoryConfig.label}`,
								children: domainConfig.id === "miscellaneous" ? categoryConfig.shortLabel : `${domainConfig.shortLabel} › ${categoryConfig.shortLabel}`
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentQualityBadge, {
						document: doc,
						showTooltip: true
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onPreview(doc),
					className: "text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-text-primary group-hover:text-brand transition-colors line-clamp-1 break-all",
						title: doc.original_name,
						children: doc.original_name
					})
				}), doc.verification_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-tertiary line-clamp-1 mt-1 leading-relaxed",
					title: doc.verification_notes,
					children: doc.verification_notes
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3.5 flex items-center justify-between border-t border-border-c/50 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs font-mono tabular-nums text-text-secondary flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formattedSize }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-text-tertiary",
						children: "•"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formattedDate })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => onPreview(doc),
						title: "Quick preview",
						className: "h-7 w-7 p-0 rounded-lg text-text-secondary hover:text-brand hover:bg-brand/10 cursor-pointer transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Quick preview"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: isDownloading,
						onClick: () => onDownload(doc),
						title: "Download document",
						className: "h-7 w-7 p-0 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer transition-colors",
						children: [isDownloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Download"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
						open: isMenuOpen,
						onOpenChange: setIsMenuOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								title: "More actions",
								className: "h-7 w-7 p-0 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-alt cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "More options"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-44 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onPreview(doc),
									className: "cursor-pointer gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick Preview" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onDownload(doc),
									className: "cursor-pointer gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download File" })]
								}),
								onAddToPackage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onAddToPackage(doc),
									className: "cursor-pointer gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "h-3.5 w-3.5 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add to Package" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onReplace(doc),
									className: "cursor-pointer gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Re-Upload" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onDelete(doc),
									className: "cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Archive Document" })]
								})
							]
						})]
					})
				]
			})]
		})]
	});
}
var DOCUMENT_EXPLANATIONS = {
	business_pan: {
		whatIsIt: "10-digit Permanent Account Number card issued by the Income Tax Department to the business entity.",
		whyNeeded: "Primary tax identity of your company used for KYB verification, bank linking, and tax reporting."
	},
	registration_proof: {
		whatIsIt: "Official government document showing your business registration number (CIN, LLPIN, or state registration).",
		whyNeeded: "Verifies the legal existence and registered identity of your business with regulatory authorities."
	},
	address_proof: {
		whatIsIt: "Utility bill, property tax receipt, or registered lease agreement in the entity's name.",
		whyNeeded: "Confirms the registered and operational physical address of your business."
	},
	cancelled_cheque: {
		whatIsIt: "A personalized cancelled cheque leaf or bank passbook showing account number, account holder name, and IFSC.",
		whyNeeded: "Verifies bank account ownership for payouts, direct debits, and financial reconciliation."
	},
	signatory_identity_proof: {
		whatIsIt: "Government photo ID (PAN, Passport, Aadhaar, Voter ID) of the authorized director or partner.",
		whyNeeded: "Validates the identity of the person legally acting and signing agreements on behalf of the entity."
	},
	signatory_address_proof: {
		whatIsIt: "Address proof (Aadhaar, Passport, Utility Bill) of the authorized signatory.",
		whyNeeded: "Fulfills RBI KYC guidelines for personal background verification of controlling persons."
	},
	authority_evidence: {
		whatIsIt: "Board resolution, partner authorization letter, or power of attorney empowering the signatory.",
		whyNeeded: "Proves that the signatory is legally authorized to execute contracts and operate accounts for the business."
	},
	udyam_certificate: {
		whatIsIt: "Government registration certificate for Micro, Small, and Medium Enterprises (MSMEs).",
		whyNeeded: "Unlocks government MSME priority lending, interest subsidies, and statutory payment protection."
	},
	certificate_of_incorporation: {
		whatIsIt: "Official certificate issued by the Registrar of Companies (ROC/MCA) upon company formation.",
		whyNeeded: "Conclusively proves the legal formation date, registration number, and corporate status."
	},
	moa_aoa: {
		whatIsIt: "Constitutional charter defining business scope (MOA) and internal governance rules/powers (AOA).",
		whyNeeded: "Establishes business objectives, capital limits, and management powers for banks and investors."
	},
	llp_agreement: {
		whatIsIt: "Formal agreement between LLP partners governing profit-sharing, capital contributions, and roles.",
		whyNeeded: "Verifies partnership terms, rights, and decision-making authority for LLPs."
	},
	partnership_deed: {
		whatIsIt: "Written contract among partners detailing capital, profit ratios, and operational responsibilities.",
		whyNeeded: "Legal proof of the partnership structure and operational terms."
	},
	trust_society_instrument: {
		whatIsIt: "Registered Trust Deed, Society Registration Certificate, or Bye-laws for non-profit entities.",
		whyNeeded: "Verifies governing trustees, objectives, and legal operational framework for trusts/societies."
	},
	sole_proprietorship_evidence: {
		whatIsIt: "Shop & Establishment license, GST certificate, or CA declaration for individual proprietorships.",
		whyNeeded: "Proves the existence and trade activity of an unincorporated individual business."
	},
	dpiit_startup_recognition: {
		whatIsIt: "Startup India certificate issued by the Department for Promotion of Industry and Internal Trade (DPIIT).",
		whyNeeded: "Unlocks startup income tax exemptions, patent fast-tracking, and government procurement benefits."
	},
	import_export_code: {
		whatIsIt: "10-digit DGFT registration required for businesses importing or exporting goods and services.",
		whyNeeded: "Mandatory for cross-border trade transactions, customs clearance, and foreign remittances."
	},
	gst_certificate: {
		whatIsIt: "Form GST REG-06 showing the 15-digit GSTIN, principal place of business, and business type.",
		whyNeeded: "Verifies indirect tax registration status and enables automated GST input credit flow."
	},
	gst_returns: {
		whatIsIt: "Periodic sales (GSTR-1) and monthly summary tax return filings (GSTR-3B).",
		whyNeeded: "Cross-checks sales authenticity, monthly turnover, and statutory tax compliance."
	},
	income_tax_return: {
		whatIsIt: "Annual ITR acknowledgement (ITR-5/ITR-6/ITR-V) and computation of income filed with the tax department.",
		whyNeeded: "Confirms declared annual profits, taxable income history, and tax compliance track record."
	},
	tds_returns_challans: {
		whatIsIt: "Quarterly TDS return receipts (Form 24Q, 26Q) and payment challans.",
		whyNeeded: "Verifies compliance with tax withholding on vendor payments, salaries, and contractor fees."
	},
	roc_annual_filings: {
		whatIsIt: "Annual MCA returns including financial statements (AOC-4) and annual return (MGT-7/7A).",
		whyNeeded: "Proves active corporate compliance standing with the Ministry of Corporate Affairs."
	},
	epf_compliance: {
		whatIsIt: "Employees' Provident Fund registration code and monthly Electronic Challan cum Return (ECR) receipts.",
		whyNeeded: "Verifies employee retirement benefit compliance and workforce headcount."
	},
	esic_compliance: {
		whatIsIt: "Employees' State Insurance Corporation registration and monthly contribution payment challans.",
		whyNeeded: "Confirms mandatory medical insurance compliance for eligible employees."
	},
	professional_tax: {
		whatIsIt: "State-level Professional Tax registration (PTRC/PTEC) and payment acknowledgements.",
		whyNeeded: "Proves municipal and state employment tax compliance where applicable."
	},
	tax_statutory_notices: {
		whatIsIt: "Official notices, assessment orders, or disputed demands from Income Tax, GST, or MCA authorities.",
		whyNeeded: "Quantifies potential statutory liabilities, disputed claims, and legal risk exposure."
	},
	bank_statements: {
		whatIsIt: "Transaction statements covering the last 6 to 12 months for active business bank accounts.",
		whyNeeded: "Powers AI cash flow intelligence, monitors real-time liquidity, and detects revenue trends."
	},
	trial_balance_gl: {
		whatIsIt: "Full ledger summary listing all closing debit and credit balances across ledger accounts.",
		whyNeeded: "Provides granular accounting visibility into operating expenses, assets, and liabilities."
	},
	profit_loss_statement: {
		whatIsIt: "Financial report showing total revenues, gross margins, operating expenses, and net profit.",
		whyNeeded: "Assesses operational profitability, unit economics, and cost management efficiency."
	},
	balance_sheet: {
		whatIsIt: "Snapshot of the company's financial health, listing total assets, liabilities, and shareholder equity.",
		whyNeeded: "Evaluates net worth, solvency, working capital adequacy, and capital leverage."
	},
	cash_flow_statement: {
		whatIsIt: "Statement tracking cash inflows and outflows from operating, investing, and financing activities.",
		whyNeeded: "Shows actual cash generation capability separate from accounting accruals."
	},
	cash_balance_burn: {
		whatIsIt: "Summary of available liquid cash balances versus monthly net operating expenditure (burn rate).",
		whyNeeded: "Calculates runway in months and highlights upcoming liquidity gaps or working capital needs."
	},
	bank_reconciliation: {
		whatIsIt: "Statement matching ledger bank accounts against actual bank statement balances.",
		whyNeeded: "Identifies uncredited cheques, timing differences, and bookkeeping discrepancies."
	},
	receivables_payables_ageing: {
		whatIsIt: "Time-bucketed breakdown of pending customer invoices and unpaid vendor dues.",
		whyNeeded: "Analyzes debtor collection efficiency and working capital lockup."
	},
	revenue_evidence: {
		whatIsIt: "Monthly sales ledger, billing register, or invoice dump with customer breakdown.",
		whyNeeded: "Validates genuine customer demand, recurring contracts, and top-line revenue growth."
	},
	inventory_register: {
		whatIsIt: "Stock summary listing raw materials, work-in-progress, finished goods, and stock turnover.",
		whyNeeded: "Assesses inventory holding costs, obsolescence risk, and working capital cycle."
	},
	payroll_summary: {
		whatIsIt: "Monthly employee salary sheet, contractor costs, and total team headcount expenditure.",
		whyNeeded: "Tracks human capital burn and compensation obligations."
	},
	fixed_asset_register: {
		whatIsIt: "Schedule of physical equipment, machinery, IT assets, and depreciation schedules.",
		whyNeeded: "Verifies book value of physical collateral and capital expenditure investments."
	},
	debt_schedules: {
		whatIsIt: "Summary of active term loans, credit lines, founder loans, interest rates, and EMI schedules.",
		whyNeeded: "Tracks debt service coverage ratio (DSCR) and upcoming repayment obligations."
	},
	related_party_schedule: {
		whatIsIt: "Schedule of all transactions with directors, promoters, key management, or sister companies.",
		whyNeeded: "Ensures arms-length pricing compliance and flags corporate governance risks."
	},
	audited_financial_statements: {
		whatIsIt: "CA-certified annual Balance Sheet, P&L, notes to accounts, and Auditor's Report.",
		whyNeeded: "The gold standard of verified financial truth for bank loans, credit ratings, and investor diligence."
	},
	monthly_mis: {
		whatIsIt: "Monthly management information system reports tracking KPIs, departmental budgets, and unit metrics.",
		whyNeeded: "Provides executive operational visibility between annual audit cycles."
	},
	budget_vs_actual: {
		whatIsIt: "Variance analysis comparing budgeted revenue/costs against realized financial performance.",
		whyNeeded: "Evaluates financial planning accuracy and operational discipline."
	},
	financial_model: {
		whatIsIt: "Forward-looking financial projections, unit economics model, and planned capital deployment schedule.",
		whyNeeded: "Demonstrates growth projections and capital efficiency to equity investors and lenders."
	},
	contingent_liabilities_schedule: {
		whatIsIt: "List of potential liabilities like bank guarantees, letters of credit, and disputed claims.",
		whyNeeded: "Reveals hidden commitments that could impact future solvency."
	},
	license_retail: {
		whatIsIt: "Municipal trade license, shop & establishment registration, and local commercial permissions.",
		whyNeeded: "Verifies the legal right to operate physical retail, wholesale, or commercial premises."
	},
	license_ecommerce: {
		whatIsIt: "E-commerce declarations, marketplace seller agreements, and digital trade permissions.",
		whyNeeded: "Confirms regulatory compliance and platform authorization for online commerce."
	},
	license_manufacturing: {
		whatIsIt: "Factory license, State/Central Pollution Control Board consent (CTE/CTO), and Fire NOC.",
		whyNeeded: "Mandatory for legal manufacturing operations, environmental clearances, and workplace safety."
	},
	license_food_hospitality: {
		whatIsIt: "FSSAI Food Safety Registration/License and municipal health trade clearances.",
		whyNeeded: "Mandatory statutory clearance to manufacture, process, package, or serve food products."
	},
	license_healthcare: {
		whatIsIt: "Drug license, clinical establishment registration, pharmacy permit, or bio-waste clearance.",
		whyNeeded: "Mandatory regulatory compliance for hospitals, clinics, pharmacies, and medical devices."
	},
	license_education: {
		whatIsIt: "School/institution registration, regulatory affiliation certificates, and board approvals.",
		whyNeeded: "Validates accredited academic recognition and operational authority."
	},
	license_construction_realestate: {
		whatIsIt: "RERA project/agent registration, contractor license, and building plan approvals.",
		whyNeeded: "Mandatory for developing, advertising, selling, and executing real estate projects."
	},
	license_logistics_transport: {
		whatIsIt: "Commercial carrier permits, national transport authorizations, and fleet transit registrations.",
		whyNeeded: "Authorizes commercial goods transport, freight logistics, and interstate transit."
	},
	license_software_saas_it: {
		whatIsIt: "IT service provider registrations, telecom/OSP registrations, or data compliance certificates.",
		whyNeeded: "Proves compliance for specialized data, telecom, or government IT contracts."
	},
	license_fintech_lending: {
		whatIsIt: "RBI NBFC Certificate of Registration, digital lending partner agreements, or FLDG arrangements.",
		whyNeeded: "Mandatory regulatory compliance for originating, underwriting, or servicing credit."
	},
	license_fintech_payments: {
		whatIsIt: "RBI Payment Aggregator/Gateway authorization or regulated banking partnership agreement.",
		whyNeeded: "Required for holding, routing, or processing digital merchant payments."
	},
	license_fintech_regulated_other: {
		whatIsIt: "SEBI intermediary registration, IRDAI insurance license, or Account Aggregator authorization.",
		whyNeeded: "Legal authorization to broker securities, distribute insurance, or aggregate financial data."
	},
	license_professional_services: {
		whatIsIt: "Professional practice license from statutory bodies (ICAI, Bar Council, Medical Council, COA).",
		whyNeeded: "Validates accredited professional credentials to offer specialized advisory services."
	},
	license_other_activity: {
		whatIsIt: "Sector-specific commercial license, municipal clearance, or regulatory consent for niche domains.",
		whyNeeded: "Proves operational legality for specialized business activities."
	},
	cert_manufacturing_quality: {
		whatIsIt: "ISO 9001 (Quality Management) or relevant sector standard certification (BIS, CE, GMP).",
		whyNeeded: "Demonstrates international product quality standards and supplier reliability."
	},
	cert_information_security: {
		whatIsIt: "ISO/IEC 27001, SOC 2 Type II audit report, or CERT-In security assessment certificate.",
		whyNeeded: "Proves data security, cloud infrastructure safety, and enterprise trust."
	},
	cert_healthcare: {
		whatIsIt: "NABH hospital accreditation, NABL diagnostic lab accreditation, or ISO 13485 medical standard.",
		whyNeeded: "Validates high clinical standards, patient safety, and testing accuracy."
	},
	cert_food: {
		whatIsIt: "HACCP, ISO 22000, Organic India, AGMARK, or Halal certification.",
		whyNeeded: "Provides verified quality assurance for food safety and export readiness."
	},
	cert_universal: {
		whatIsIt: "Independent industry accreditation, ISO environmental standard (ISO 14001), or ESG rating.",
		whyNeeded: "Strengthens credibility and qualifies the entity for institutional vendor onboarding."
	},
	cap_table: {
		whatIsIt: "Detailed cap table showing equity ownership, share classes, founder holdings, and option pools.",
		whyNeeded: "Provides definitive clarity on company ownership, voting control, and dilution."
	},
	partner_contribution_schedule: {
		whatIsIt: "Statement of partner capital accounts, profit-sharing ratios, and partner loans for LLPs/firms.",
		whyNeeded: "Verifies internal capital ownership and partner equity distribution."
	},
	trustee_beneficiary_structure: {
		whatIsIt: "Legal register of trust settlors, active trustees, and designated beneficiaries.",
		whyNeeded: "Confirms fiduciary control and beneficial asset ownership."
	},
	founder_promoter_ownership: {
		whatIsIt: "Demat holding statement, share certificates, or founder ownership records.",
		whyNeeded: "Verifies controlling equity stake and promoter skin-in-the-game."
	},
	share_certificates_allotment: {
		whatIsIt: "Form PAS-3 return of allotment, board allotment records, and share certificates.",
		whyNeeded: "Statutory proof of equity issuance and capital inflow."
	},
	register_of_members: {
		whatIsIt: "Statutory register of shareholders maintained under Section 88 of the Companies Act.",
		whyNeeded: "Conclusive legal record of equity membership, voting rights, and share transfers."
	},
	esop_scheme_register: {
		whatIsIt: "Employee Stock Option Plan document, grant register, and vesting schedules.",
		whyNeeded: "Tracks employee equity commitments, exercised options, and reserved option pools."
	},
	beneficial_ownership_sbo: {
		whatIsIt: "Form BEN-2 filings and declarations identifying Significant Beneficial Owners.",
		whyNeeded: "Mandatory corporate transparency compliance identifying ultimate individual owners."
	},
	capital_action_resolutions: {
		whatIsIt: "Shareholder & Board resolutions approving fundraises, bonus shares, rights issues, or buybacks.",
		whyNeeded: "Verifies corporate legal validity behind capital restructuring and share issuances."
	},
	investment_agreements: {
		whatIsIt: "Shareholders Agreement (SHA), Share Subscription Agreement (SSA), or Term Sheets.",
		whyNeeded: "Outlines investor rights, liquidation preferences, reserved matters, and board seats."
	},
	convertible_instruments: {
		whatIsIt: "Terms for CCPS, CCDs, iSAFE, convertible notes, or warrants with conversion valuation formulas.",
		whyNeeded: "Identifies future equity dilution triggers and investor payback rights."
	},
	valuation_reports: {
		whatIsIt: "Valuation certificate from a Registered Valuer or Merchant Banker (Rule 11UA / DCF method).",
		whyNeeded: "Complies with Income Tax and FEMA pricing regulations for issuing shares."
	},
	foreign_investment_filings: {
		whatIsIt: "RBI FIRMS reporting (FC-GPR, FC-TRS) and Annual FLA return for foreign direct investment.",
		whyNeeded: "Mandatory FEMA compliance confirming lawful receipt and transfer of foreign capital."
	},
	founder_agreements_ip_assignment: {
		whatIsIt: "Founder agreement containing explicit intellectual property assignment of code and designs to the company.",
		whyNeeded: "Guarantees that the business entity legally owns all its software, technology, and branding."
	},
	employment_consultant_agreements: {
		whatIsIt: "Standard employment & consultant contracts with confidentiality (NDA) and IP assignment terms.",
		whyNeeded: "Protects proprietary assets, trade secrets, and prevents employee intellectual property disputes."
	},
	customer_contracts: {
		whatIsIt: "Master Services Agreements (MSAs), client contracts, and high-value customer purchase orders.",
		whyNeeded: "Validates recurring commercial revenues, payment milestones, and customer contract terms."
	},
	vendor_contracts: {
		whatIsIt: "Key supplier agreements, cloud infrastructure contracts, and vendor service level agreements.",
		whyNeeded: "Evaluates operational dependencies, minimum commitments, and supplier risk."
	},
	financing_security_agreements: {
		whatIsIt: "Loan sanction letters, hypothecation deeds, mortgage agreements, and personal guarantee deeds.",
		whyNeeded: "Discloses pledged business assets, bank charges, and loan repayment terms."
	},
	lease_agreements: {
		whatIsIt: "Registered commercial lease or rent agreement for offices, factories, or storage facilities.",
		whyNeeded: "Confirms premises tenure, monthly rent obligations, and physical location security."
	},
	ip_registrations: {
		whatIsIt: "Registered trademark, patent, copyright, or industrial design certificates.",
		whyNeeded: "Proves exclusive statutory ownership and legal monopoly over company brands and inventions."
	},
	ip_certificates: {
		whatIsIt: "Trademark registry extracts, patent grant deeds, or software license grant certificates.",
		whyNeeded: "Protects proprietary technology and core brand assets against unauthorized infringement."
	},
	litigation_proceedings: {
		whatIsIt: "Court petitions, arbitration claims, or commercial dispute notices involving the business.",
		whyNeeded: "Quantifies potential legal exposure, dispute risks, and financial liability."
	},
	notices_orders_settlements: {
		whatIsIt: "Regulatory show-cause notices, tribunal orders, or signed legal settlement agreements.",
		whyNeeded: "Discloses regulatory compliance proceedings and finalized legal settlement terms."
	},
	indemnities_contingent_obligations: {
		whatIsIt: "Cross-guarantees, supplier indemnities, or performance bonds issued by the company.",
		whyNeeded: "Highlights contingent financial risks that could create future balance sheet obligations."
	}
};
/**
* Document types that commonly hold multiple files in practice
* (e.g., across multiple bank accounts, periods, tranches, or contracts).
*/
var MULTI_INSTANCE_DOCUMENT_KEYS = new Set([
	"bank_statements",
	"gst_returns",
	"tds_returns_challans",
	"customer_contracts",
	"vendor_contracts",
	"share_certificates_allotment",
	"audited_financial_statements",
	"debt_schedules",
	"lease_agreements",
	"monthly_mis",
	"budget_vs_actual",
	"tax_statutory_notices",
	"litigation_proceedings",
	"notices_orders_settlements"
]);
function isMultiInstanceDocumentType(key) {
	if (!key) return false;
	return MULTI_INSTANCE_DOCUMENT_KEYS.has(key);
}
/**
* Returns the plain-English explanation for a document type key.
*/
function getDocumentExplanation(key) {
	if (!key) return null;
	return DOCUMENT_EXPLANATIONS[key] ?? null;
}
function DocumentInfoPopover({ mode = "all", taxonomyDocument, detailLabel = "Applies to", instanceCount, guidance, metadata, className, triggerClassName }) {
	const docKey = taxonomyDocument?.key || metadata?.documentType;
	const explanation = getDocumentExplanation(docKey);
	const isMultiInstance = isMultiInstanceDocumentType(docKey);
	const hasTaxonomy = Boolean(taxonomyDocument);
	const hasExplanation = Boolean(explanation);
	const hasGuidance = Boolean(guidance?.why || guidance?.equivalents);
	const hasMetadata = Boolean(metadata?.uploadedAt || metadata?.originalName || metadata?.qualityScore !== void 0 && metadata?.qualityScore !== null || metadata?.verificationNotes);
	if (!hasTaxonomy && !hasExplanation && !hasGuidance && !hasMetadata) return null;
	const isGuidanceOnly = mode === "guidance" && !hasTaxonomy && !hasMetadata && !hasExplanation;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "View document information, purpose, and filing requirements",
			title: "Document details & purpose",
			className: cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-tertiary hover:bg-brand/10 hover:text-brand transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring select-none", triggerClassName),
			onClick: (e) => e.stopPropagation(),
			children: isGuidanceOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5 text-text-tertiary hover:text-brand" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 text-text-tertiary hover:text-brand" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		side: "top",
		align: "start",
		sideOffset: 6,
		collisionPadding: 16,
		className: cn("w-80 sm:w-92 text-xs p-3.5 shadow-xl bg-surface border border-border rounded-2xl z-50", "max-h-[var(--radix-popover-content-available-height)] overflow-y-auto overscroll-contain space-y-2.5", className),
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border/70 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "font-bold text-xs text-text-primary tracking-tight truncate",
						children: taxonomyDocument?.label ?? metadata?.originalName ?? "Document Information"
					})
				})]
			}),
			hasMetadata && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-xl bg-surface-alt/60 p-3 border border-border/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-b border-border/50 pb-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "h-3.5 w-3.5 text-success" }), "Active File Metadata"]
					}), metadata?.qualityScore !== null && metadata?.qualityScore !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-success bg-success/10 px-1.5 py-0.5 rounded",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }),
							metadata.qualityScore,
							"% Quality"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 text-[11px]",
					children: [
						metadata?.originalName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-text-tertiary flex items-center gap-1 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }), " File"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text-primary text-right truncate max-w-42.5",
								title: metadata.originalName,
								children: metadata.originalName
							})]
						}),
						metadata?.fileSizeBytes !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-text-tertiary",
								children: "Size"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-text-secondary",
								children: formatFileSize(metadata.fileSizeBytes)
							})]
						}),
						metadata?.uploadedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-text-tertiary flex items-center gap-1 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), " Uploaded on"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-text-secondary text-right",
								children: formatDocumentDate(metadata.uploadedAt)
							})]
						}),
						metadata?.uploadedBy !== void 0 && metadata?.uploadedBy !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-text-tertiary flex items-center gap-1 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3 w-3" }), " Uploaded by"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text-primary text-right",
								children: typeof metadata.uploadedBy === "number" ? `User #${metadata.uploadedBy}` : metadata.uploadedBy || "System"
							})]
						}),
						metadata?.verificationNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 pt-1.5 border-t border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wider block",
								children: "Verification Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-text-secondary text-[11px] leading-relaxed wrap-break-word bg-surface p-2 rounded-lg border border-border/50",
								children: metadata.verificationNotes
							})]
						})
					]
				})]
			}),
			explanation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 bg-surface-alt/40 p-2.5 rounded-xl border border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-brand uppercase tracking-wider block",
						children: "What is this document?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-text-primary leading-relaxed",
						children: explanation.whatIsIt
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 bg-surface-alt/40 p-2.5 rounded-xl border border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-success uppercase tracking-wider block",
						children: "Why is it needed?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-text-secondary leading-relaxed",
						children: explanation.whyNeeded
					})]
				})]
			}),
			instanceCount !== void 0 && instanceCount > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-brand/5 border border-brand/20 p-2.5 rounded-xl text-[11px] space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 font-bold text-[10px] text-brand uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Multiple Records (",
						instanceCount,
						" Files)"
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-text-secondary leading-relaxed",
					children: [
						"You have ",
						instanceCount,
						" files on record for this slot. View and manage all files in the Document Registry tab."
					]
				})]
			}) : isMultiInstance ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-surface-alt/40 border border-border/50 p-2.5 rounded-xl text-[11px] space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 font-bold text-[10px] text-text-tertiary uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Multiple Accounts / Periods" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-secondary leading-relaxed",
					children: "If you have multiple accounts or periods, you can upload a combined PDF here, or manage files in the Document Registry."
				})]
			}) : null,
			taxonomyDocument && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 text-[11px] pt-0.5 border-t border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold text-text-tertiary uppercase",
						children: detailLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-text-primary font-medium text-right text-[11px]",
						children: taxonomyDocument.detail
					})]
				}), taxonomyDocument.sourceStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold text-text-tertiary uppercase",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-text-primary",
						children: taxonomyDocument.sourceStatus
					})]
				})]
			}),
			guidance?.why && !explanation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-0.5 text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wider",
					children: "Why SpotLite needs this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-secondary leading-relaxed",
					children: guidance.why
				})]
			}),
			guidance?.equivalents && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-0.5 text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wider",
					children: "Accepted Alternatives"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-secondary leading-relaxed",
					children: guidance.equivalents
				})]
			})
		]
	})] });
}
function DocumentPreviewModal({ open, onOpenChange, document, onReplaceDocument }) {
	const [objectUrl, setObjectUrl] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let currentUrl = null;
		let isCancelled = false;
		if (open && document) {
			setIsLoading(true);
			setErrorMessage(null);
			setObjectUrl(null);
			api.download(`/api/company/documents/${document.id}/preview`).catch(() => api.download(`/api/company/documents/${document.id}/download`)).then((blob) => {
				if (!isCancelled) {
					currentUrl = URL.createObjectURL(blob);
					setObjectUrl(currentUrl);
					setIsLoading(false);
				}
			}).catch((err) => {
				if (!isCancelled) {
					setIsLoading(false);
					setErrorMessage(err instanceof Error ? err.message : "Failed to load document preview");
				}
			});
		}
		return () => {
			isCancelled = true;
			if (currentUrl) URL.revokeObjectURL(currentUrl);
		};
	}, [open, document]);
	if (!document) return null;
	const isImage = document.mime_type?.startsWith("image/") || /\.(png|jpg|jpeg|webp)$/i.test(document.filename || document.original_name);
	const isPdf = document.mime_type === "application/pdf" || /\.pdf$/i.test(document.filename || document.original_name);
	const handleDownload = () => {
		downloadDocument(document.id, document.original_name);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[92vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
					className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "pr-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "text-base font-bold font-display text-text-primary truncate",
									children: document.original_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px] font-mono px-2 py-0.5",
									children: formatFileSize(document.file_size_bytes)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary",
								children: ["Document Preview • ", document.document_type]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: handleDownload,
								className: "gap-1.5 text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Download"]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-75 flex items-center justify-center rounded-xl border border-border/70 bg-surface-alt/20 p-2 overflow-hidden",
					children: [
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center p-12 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary font-medium",
								children: "Loading document preview…"
							})]
						}),
						!isLoading && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 text-center space-y-3 max-w-md mx-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-destructive/10 text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-text-primary",
										children: "Document Physical File Unavailable"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-text-secondary leading-relaxed",
										children: errorMessage
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-center gap-2 pt-2",
									children: [onReplaceDocument && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										onClick: () => onReplaceDocument(document),
										className: "gap-1.5 text-xs font-semibold bg-brand hover:bg-brand/90 text-white rounded-xl shadow-xs cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }), " Upload File / Replace Document"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: handleDownload,
										className: "gap-1.5 text-xs font-semibold rounded-xl border-border-c cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Try Download"]
									})]
								})
							]
						}),
						!isLoading && !errorMessage && objectUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							isImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: objectUrl,
								alt: document.original_name,
								className: "max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
							}),
							isPdf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: objectUrl,
								title: document.original_name,
								className: "w-full h-[68vh] rounded-lg border-0 bg-white"
							}),
							!isImage && !isPdf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-8 text-center space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-12 w-12 text-brand" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-text-primary",
										children: "Inline preview not supported for this file format."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: handleDownload,
										className: "gap-1.5 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Download to View"]
									})
								]
							})
						] })
					]
				})
			]
		})] })
	});
}
function ReplaceDocumentDialog({ open, onOpenChange, targetDocument, targetLabel, initialFile = null, isReplacing = false, onConfirmReplace }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(initialFile);
	const [isDraggingOver, setIsDraggingOver] = (0, import_react.useState)(false);
	const dragDepth = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (open) if (initialFile) {
			const validation = validateFile(initialFile);
			if (validation.valid) setSelectedFile(initialFile);
			else {
				toast.error(validation.error || "Invalid replacement file");
				setSelectedFile(null);
			}
		} else setSelectedFile(null);
		else {
			setSelectedFile(null);
			dragDepth.current = 0;
			setIsDraggingOver(false);
		}
	}, [
		open,
		initialFile,
		targetDocument
	]);
	if (!targetDocument) return null;
	const taxonomy = getTaxonomyDocument(targetDocument.document_type);
	const displayLabel = targetLabel || taxonomy?.label || targetDocument.document_type.replace(/[-_]/g, " ");
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		const validation = validateFile(file);
		if (!validation.valid) {
			toast.error(validation.error || "Invalid file format or size.");
			return;
		}
		setSelectedFile(file);
	};
	const handleDragEnter = (e) => {
		e.preventDefault();
		if (isReplacing) return;
		dragDepth.current += 1;
		setIsDraggingOver(true);
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		dragDepth.current = Math.max(0, dragDepth.current - 1);
		if (dragDepth.current === 0) setIsDraggingOver(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		dragDepth.current = 0;
		setIsDraggingOver(false);
		if (isReplacing) return;
		const file = e.dataTransfer.files?.[0];
		if (!file) return;
		const validation = validateFile(file);
		if (!validation.valid) {
			toast.error(validation.error || "Invalid file format or size.");
			return;
		}
		setSelectedFile(file);
	};
	const handleSubmit = (e) => {
		if (e) e.preventDefault();
		if (!selectedFile || isReplacing) return;
		onConfirmReplace(selectedFile);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !isReplacing && onOpenChange(next),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[92vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
					disabled: isReplacing,
					className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "pr-6 text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-4.5 w-4.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base font-bold font-display text-text-primary",
							children: "Re-Upload"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-text-secondary mt-0.5",
							children: "Upload an updated version while maintaining full audit trail and governance."
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3.5 py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5 rounded-xl border border-brand/20 bg-brand/5 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 shrink-0 text-brand mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary leading-relaxed space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold text-text-primary",
									children: ["Version Governance • ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: displayLabel
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Uploading a new document creates",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-primary",
										children: "Version 2 (Active)"
									}),
									". The current filing is securely preserved in your corporate compliance audit history."
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border-c bg-surface-alt/40 p-3 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[11px] text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold uppercase tracking-wider text-[10px]",
										children: "Current Document On File"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-surface text-text-secondary border border-border/80",
										children: "v1 • Active"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: formatDocumentDate(targetDocument.created_at)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-border-c text-text-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-xs text-text-primary truncate",
										title: targetDocument.original_name,
										children: targetDocument.original_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-text-secondary font-mono",
										children: [
											formatFileSize(targetDocument.file_size_bytes),
											" •",
											" ",
											targetDocument.document_type
										]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							ref: fileInputRef,
							onChange: handleFileChange,
							className: "hidden",
							accept: ACCEPTED_FILE_FORMATS_STRING,
							disabled: isReplacing
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-semibold text-text-secondary block",
								children: "Select Replacement File"
							}), selectedFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 rounded-xl border border-brand/40 bg-brand/5 p-3 animate-in fade-in-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-xs text-text-primary truncate",
											title: selectedFile.name,
											children: selectedFile.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-text-secondary font-mono flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-brand/10 text-brand border border-brand/20",
												children: "Replacement File"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatFileSize(selectedFile.size), " • Ready to upload"] })]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										disabled: isReplacing,
										onClick: () => fileInputRef.current?.click(),
										className: "h-7 px-2 text-[11px] font-semibold border-border-c bg-surface cursor-pointer",
										children: "Change"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon",
										disabled: isReplacing,
										onClick: () => setSelectedFile(null),
										className: "h-7 w-7 text-text-tertiary hover:text-text-primary cursor-pointer",
										title: "Remove selected file",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onDragEnter: handleDragEnter,
								onDragOver: (e) => e.preventDefault(),
								onDragLeave: handleDragLeave,
								onDrop: handleDrop,
								onClick: () => !isReplacing && fileInputRef.current?.click(),
								className: cn("flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all duration-150", isDraggingOver ? "border-brand bg-brand/10 shadow-xs" : "border-border-c bg-surface hover:border-brand/40 hover:bg-surface-alt/30", isReplacing && "pointer-events-none opacity-60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4.5 w-4.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-text-primary",
										children: isDraggingOver ? "Drop replacement file here" : "Click to browse or drag file here"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-text-secondary font-mono",
										children: UPLOAD_CONSTRAINTS_LABEL
									})]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2 sm:gap-2 pt-2 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: isReplacing,
						onClick: () => onOpenChange(false),
						className: "text-xs font-semibold cursor-pointer",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "default",
						size: "sm",
						disabled: !selectedFile || isReplacing,
						onClick: () => handleSubmit(),
						className: "text-xs font-semibold gap-1.5 cursor-pointer shadow-xs",
						children: isReplacing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "Uploading Version 2…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }), "Re-Upload"] })
					})]
				})
			]
		})] })
	});
}
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function CreatePackageDialog({ open, onOpenChange, documents, initialSelectedDocIds, onSuccess }) {
	const createPackageMutation = useCreatePackage();
	const [newPackageName, setNewPackageName] = (0, import_react.useState)("");
	const [selectedDocIds, setSelectedDocIds] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const nameInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setNewPackageName("");
			setSelectedDocIds(initialSelectedDocIds ? [...initialSelectedDocIds] : []);
			setSearchQuery("");
			setTimeout(() => nameInputRef.current?.focus(), 50);
		}
	}, [open]);
	const toggleSelectDoc = (id) => {
		setSelectedDocIds((prev) => prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]);
	};
	const filteredDocs = (0, import_react.useMemo)(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return documents;
		return documents.filter((doc) => doc.original_name.toLowerCase().includes(q) || doc.document_type.toLowerCase().includes(q));
	}, [documents, searchQuery]);
	const toggleSelectAllFiltered = () => {
		if (filteredDocs.length === 0) return;
		if (filteredDocs.every((d) => selectedDocIds.includes(d.id))) {
			const filteredIdSet = new Set(filteredDocs.map((d) => d.id));
			setSelectedDocIds((prev) => prev.filter((id) => !filteredIdSet.has(id)));
		} else {
			const newIds = filteredDocs.map((d) => d.id);
			setSelectedDocIds((prev) => Array.from(new Set([...prev, ...newIds])));
		}
	};
	const isAllFilteredSelected = filteredDocs.length > 0 && filteredDocs.every((d) => selectedDocIds.includes(d.id));
	const handleCreateSubmit = (e) => {
		e.preventDefault();
		const name = newPackageName.trim();
		if (!name) return;
		createPackageMutation.mutate({
			name,
			document_ids: selectedDocIds
		}, {
			onSuccess: (createdPkg) => {
				onSuccess?.(createdPkg);
				toast.success(`Created package "${name}" successfully.`);
				onOpenChange(false);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Failed to create package"));
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (val) => !createPackageMutation.isPending && onOpenChange(val),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg max-h-[85vh] flex flex-col p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-base font-bold font-display text-text-primary",
					children: "Create Document Package"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-xs text-text-secondary mt-0.5",
					children: "Group documents together for due diligence, audit, or lender review workflows."
				})] })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreateSubmit,
				className: "flex flex-col flex-1 min-h-0 space-y-4 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "pkg-name-input",
							className: "text-xs font-semibold text-text-primary",
							children: ["Package Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pkg-name-input",
							ref: nameInputRef,
							required: true,
							value: newPackageName,
							onChange: (e) => setNewPackageName(e.target.value),
							placeholder: "e.g. Audit 2025, Due Diligence, GST Filings",
							className: "text-xs h-9 bg-surface border-border-c",
							disabled: createPackageMutation.isPending
						})]
					}),
					documents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 flex-1 flex flex-col min-h-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs font-semibold text-text-primary",
									children: [
										"Select Documents (",
										selectedDocIds.length,
										" selected)"
									]
								}), filteredDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: toggleSelectAllFiltered,
									className: "flex items-center gap-1 text-[11px] font-medium text-brand hover:underline cursor-pointer",
									children: isAllFilteredSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-3.5 w-3.5" }), " Deselect all"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3.5 w-3.5" }), " Select all filtered"] })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									placeholder: "Filter documents…",
									className: "h-8 pl-8 text-xs bg-surface border-border-c",
									disabled: createPackageMutation.isPending
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-y-auto max-h-55 rounded-xl border border-border/80 divide-y divide-border/60 bg-surface-alt/20",
								children: filteredDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 text-center text-xs text-text-secondary",
									children: [
										"No documents matching \"",
										searchQuery,
										"\""
									]
								}) : filteredDocs.map((doc) => {
									const isChecked = selectedDocIds.includes(doc.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onClick: () => toggleSelectDoc(doc.id),
										className: `flex items-center justify-between gap-3 p-2.5 text-xs transition-colors cursor-pointer ${isChecked ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-surface-alt/50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: isChecked,
												onCheckedChange: () => toggleSelectDoc(doc.id),
												onClick: (e) => e.stopPropagation()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium text-text-primary truncate",
													title: doc.original_name,
													children: doc.original_name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-text-secondary capitalize font-mono",
													children: [
														doc.document_type.replace(/[-_]/g, " "),
														" •",
														" ",
														formatFileSize(doc.file_size_bytes)
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "shrink-0",
											onClick: (e) => e.stopPropagation(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentQualityBadge, { document: doc })
										})]
									}, doc.id);
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:gap-0 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => onOpenChange(false),
							disabled: createPackageMutation.isPending,
							className: "text-xs cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							disabled: createPackageMutation.isPending || !newPackageName.trim(),
							className: "text-xs font-semibold gap-1.5 cursor-pointer bg-brand text-white hover:bg-brand/90",
							children: createPackageMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Creating…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Create Package ", selectedDocIds.length > 0 ? `(${selectedDocIds.length})` : ""] })
						})]
					})
				]
			})]
		})
	});
}
var Table$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table$1.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
function DocumentRegistrySection({ documents, initialSearchQuery = "", onPreviewDocument, className }) {
	const replaceMutation = useReplaceDocument();
	const deleteMutation = useDeleteDocument();
	const [internalPreviewDoc, setInternalPreviewDoc] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)(initialSearchQuery);
	const [selectedDocIds, setSelectedDocIds] = (0, import_react.useState)([]);
	const [isBulkDownloading, setIsBulkDownloading] = (0, import_react.useState)(false);
	const [isCreatePackageOpen, setIsCreatePackageOpen] = (0, import_react.useState)(false);
	const [sortColumn, setSortColumn] = (0, import_react.useState)("date");
	const [sortDirection, setSortDirection] = (0, import_react.useState)("desc");
	const [docToReplace, setDocToReplace] = (0, import_react.useState)(null);
	const [isReplacingDoc, setIsReplacingDoc] = (0, import_react.useState)(false);
	const [deletingDocId, setDeletingDocId] = (0, import_react.useState)(null);
	const [downloadingDocId, setDownloadingDocId] = (0, import_react.useState)(null);
	const [docToDelete, setDocToDelete] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setSearchQuery(initialSearchQuery);
	}, [initialSearchQuery]);
	const handleSort = (column) => {
		if (sortColumn === column) setSortDirection((prev) => prev === "asc" ? "desc" : "asc");
		else {
			setSortColumn(column);
			setSortDirection(column === "name" || column === "type" ? "asc" : "desc");
		}
	};
	const filteredDocuments = (0, import_react.useMemo)(() => {
		const q = searchQuery.toLowerCase().trim();
		return [...documents.filter((doc) => {
			if (q) {
				const originalName = (doc.original_name ?? "").toLowerCase();
				const docType = (doc.document_type ?? "").toLowerCase();
				const formatted = formatDocumentType(doc.document_type).toLowerCase();
				const notes = (doc.verification_notes ?? "").toLowerCase();
				if (!(originalName.includes(q) || docType.includes(q) || formatted.includes(q) || notes.includes(q))) return false;
			}
			return true;
		})].sort((a, b) => {
			let comp = 0;
			switch (sortColumn) {
				case "name":
					comp = (a.original_name || "").localeCompare(b.original_name || "");
					break;
				case "type":
					comp = formatDocumentType(a.document_type).localeCompare(formatDocumentType(b.document_type));
					break;
				case "size":
					comp = (a.file_size_bytes || 0) - (b.file_size_bytes || 0);
					break;
				case "date":
					comp = new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
					break;
			}
			return sortDirection === "asc" ? comp : -comp;
		});
	}, [
		documents,
		searchQuery,
		sortColumn,
		sortDirection
	]);
	const isAllFilteredSelected = (0, import_react.useMemo)(() => {
		if (filteredDocuments.length === 0) return false;
		return filteredDocuments.every((doc) => selectedDocIds.includes(doc.id));
	}, [filteredDocuments, selectedDocIds]);
	const isSomeFilteredSelected = (0, import_react.useMemo)(() => {
		return filteredDocuments.some((doc) => selectedDocIds.includes(doc.id));
	}, [filteredDocuments, selectedDocIds]);
	const toggleSelectAllFiltered = (checked) => {
		if (checked) {
			const visibleIds = filteredDocuments.map((d) => d.id);
			setSelectedDocIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
		} else {
			const visibleIds = new Set(filteredDocuments.map((d) => d.id));
			setSelectedDocIds((prev) => prev.filter((id) => !visibleIds.has(id)));
		}
	};
	const toggleSelectDoc = (docId) => {
		setSelectedDocIds((prev) => prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]);
	};
	const handleDownload = async (doc) => {
		try {
			setDownloadingDocId(doc.id);
			await downloadDocument(doc.id, doc.original_name);
			toast.success(`Downloaded ${doc.original_name}`);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Download failed"));
		} finally {
			setDownloadingDocId(null);
		}
	};
	const handleBulkDownload = async () => {
		if (selectedDocIds.length === 0 || isBulkDownloading) return;
		const selectedDocs = documents.filter((d) => selectedDocIds.includes(d.id));
		if (selectedDocs.length === 0) return;
		setIsBulkDownloading(true);
		let successCount = 0;
		let failCount = 0;
		try {
			for (const doc of selectedDocs) try {
				await downloadDocument(doc.id, doc.original_name);
				successCount++;
				await new Promise((resolve) => setTimeout(resolve, 350));
			} catch {
				failCount++;
			}
			if (successCount > 0 && failCount === 0) toast.success(`Successfully downloaded ${successCount} documents`);
			else if (successCount > 0 && failCount > 0) toast.warning(`Downloaded ${successCount} files (${failCount} failed)`);
			else toast.error("Bulk download failed for selected files");
		} finally {
			setIsBulkDownloading(false);
		}
	};
	const handleReplaceSubmit = async (file) => {
		if (!docToReplace) return;
		setIsReplacingDoc(true);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("document_type", docToReplace.document_type);
		formData.append("document_category", docToReplace.document_category);
		try {
			await replaceMutation.mutateAsync({
				docId: docToReplace.id,
				formData
			});
			toast.success(`Replaced "${docToReplace.original_name}" with "${file.name}"`);
			setDocToReplace(null);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to replace document"));
		} finally {
			setIsReplacingDoc(false);
		}
	};
	const handleDeleteConfirm = async () => {
		if (!docToDelete) return;
		const targetDoc = docToDelete;
		setDeletingDocId(targetDoc.id);
		setDocToDelete(null);
		try {
			await deleteMutation.mutateAsync(targetDoc.id);
			setSelectedDocIds((prev) => prev.filter((id) => id !== targetDoc.id));
			toast.success(`Archived "${targetDoc.original_name}"`, { description: "Corporate evidence unlinked from active vault. Audit history preserved." });
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to archive document"));
		} finally {
			setDeletingDocId(null);
		}
	};
	const previewTarget = (doc) => {
		if (onPreviewDocument) onPreviewDocument(doc);
		else setInternalPreviewDoc(doc);
	};
	const getSortIcon = (column) => {
		if (sortColumn !== column) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3 text-text-tertiary ml-1" });
		return sortDirection === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3 text-brand ml-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3 text-brand ml-1" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-4", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border-c/90 bg-surface p-4 shadow-2xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-text-primary tracking-tight",
							children: "Document Registry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-mono tabular-nums text-text-tertiary px-1.5 py-0.5 rounded-md bg-surface-alt border border-border-c/60",
							children: [
								filteredDocuments.length,
								" of ",
								documents.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [selectedDocIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 bg-brand/8 border border-brand/20 px-2.5 py-1 rounded-xl text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-brand font-mono tabular-nums",
									children: selectedDocIds.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary text-xs",
									children: "selected"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									disabled: isBulkDownloading,
									onClick: handleBulkDownload,
									className: "h-6 px-2 text-xs font-medium text-brand hover:bg-brand/10 cursor-pointer gap-1",
									children: [isBulkDownloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => setIsCreatePackageOpen(true),
									className: "h-6 px-2 text-xs font-medium text-brand hover:bg-brand/10 cursor-pointer gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Package" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelectedDocIds([]),
									className: "text-text-tertiary hover:text-text-primary p-0.5 rounded cursor-pointer ml-0.5",
									title: "Clear selection",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full sm:w-48",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-tertiary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									placeholder: "Search table…",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "h-8 pl-8 pr-8 text-xs bg-surface border-border-c rounded-xl"
								}),
								searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSearchQuery(""),
									className: "absolute right-2.5 top-2.5 text-text-tertiary hover:text-text-primary cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})
							]
						})]
					})]
				}), documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-dashed border-border-c p-8 text-center bg-surface-alt/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-8 w-8 text-text-tertiary mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-text-primary",
							children: "No documents in repository"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary mt-1",
							children: "Upload documents using the button above to begin establishing your repository."
						})
					]
				}) : filteredDocuments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-dashed border-border-c p-8 text-center bg-surface-alt/30 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-8 w-8 text-text-tertiary mb-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-text-primary",
							children: "No matching records found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Try adjusting your search query or clearing active filters."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								setSearchQuery("");
							},
							className: "mt-2 text-xs h-7 rounded-lg cursor-pointer",
							children: "Clear search"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border-c/80 overflow-hidden shadow-2xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "bg-surface-alt/60 hover:bg-surface-alt/60 border-b border-border-c/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-10 py-2.5 pl-3.5 pr-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: isAllFilteredSelected ? true : isSomeFilteredSelected ? "indeterminate" : false,
									onCheckedChange: (checked) => toggleSelectAllFiltered(Boolean(checked)),
									"aria-label": "Select all visible documents"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none",
								onClick: () => handleSort("name"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Document" }), getSortIcon("name")]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none",
								onClick: () => handleSort("type"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Type" }), getSortIcon("type")]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-bold text-xs py-2.5 text-text-primary",
								children: "Verification"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none",
								onClick: () => handleSort("size"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Size" }), getSortIcon("size")]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none",
								onClick: () => handleSort("date"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Uploaded" }), getSortIcon("date")]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-bold text-xs py-2.5 text-text-primary text-right pr-4",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredDocuments.map((doc) => {
						const isSelected = selectedDocIds.includes(doc.id);
						const isRowDownloading = downloadingDocId === doc.id;
						const isRowDeleting = deletingDocId === doc.id;
						const formattedType = formatDocumentType(doc.document_type);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: cn("transition-colors border-b border-border-c/60", isSelected ? "bg-brand/5 hover:bg-brand/8" : "hover:bg-surface-alt/40"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "py-2.5 pl-3.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: isSelected,
										onCheckedChange: () => toggleSelectDoc(doc.id),
										"aria-label": `Select ${doc.original_name}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium text-xs py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 max-w-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 shrink-0 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => previewTarget(doc),
											className: "truncate text-left text-text-primary hover:text-brand hover:underline font-semibold cursor-pointer",
											title: doc.original_name,
											children: doc.original_name
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-xs text-text-secondary py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										title: formattedType,
										className: "inline-block max-w-[220px] truncate px-2 py-0.5 rounded-md bg-surface-alt border border-border-c/70 text-xs text-text-primary font-medium",
										children: formattedType
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentQualityBadge, {
										document: doc,
										showTooltip: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-xs text-text-secondary font-mono tabular-nums py-2.5",
									children: formatFileSize$1(doc.file_size_bytes)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-xs text-text-secondary py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 font-mono tabular-nums text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDocumentDate$1(doc.created_at) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentInfoPopover, { metadata: {
											uploadedBy: doc.uploaded_by,
											uploadedAt: doc.created_at,
											qualityScore: doc.quality_score,
											verificationNotes: doc.verification_notes,
											originalName: doc.original_name,
											fileSizeBytes: doc.file_size_bytes,
											documentType: doc.document_type
										} })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right pr-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "Preview document",
												"aria-label": `Preview ${doc.original_name}`,
												disabled: isRowDownloading || isRowDeleting,
												onClick: () => previewTarget(doc),
												className: "h-7 w-7 text-text-secondary hover:text-brand hover:bg-brand/10 cursor-pointer rounded-lg",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "Download document",
												"aria-label": `Download ${doc.original_name}`,
												disabled: isRowDownloading || isRowDeleting,
												onClick: () => handleDownload(doc),
												className: "h-7 w-7 text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer rounded-lg",
												children: isRowDownloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-brand" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "versionUpload new ",
												"aria-label": `Re-Upload of ${doc.original_name}`,
												disabled: isRowDownloading || isRowDeleting,
												onClick: () => setDocToReplace(doc),
												className: "h-7 w-7 text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer rounded-lg",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "Archive document",
												"aria-label": `Archive ${doc.original_name}`,
												disabled: isRowDownloading || isRowDeleting,
												onClick: () => setDocToDelete(doc),
												className: "h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-lg",
												children: isRowDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})
										]
									})
								})
							]
						}, doc.id);
					}) })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentPreviewModal, {
				open: Boolean(internalPreviewDoc),
				onOpenChange: (open) => !open && setInternalPreviewDoc(null),
				document: internalPreviewDoc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReplaceDocumentDialog, {
				open: Boolean(docToReplace),
				onOpenChange: (open) => !open && setDocToReplace(null),
				targetDocument: docToReplace,
				targetLabel: docToReplace ? formatDocumentType(docToReplace.document_type) : void 0,
				onConfirmReplace: handleReplaceSubmit,
				isReplacing: isReplacingDoc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePackageDialog, {
				open: isCreatePackageOpen,
				onOpenChange: setIsCreatePackageOpen,
				initialSelectedDocIds: selectedDocIds,
				documents
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(docToDelete),
				onOpenChange: (open) => !open && setDocToDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "bg-surface border-border-c",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
						className: "text-sm font-bold text-text-primary",
						children: "Archive Document from Vault"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
						className: "text-xs text-text-secondary leading-relaxed",
						children: [
							"Are you sure you want to archive",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-text-primary",
								children: docToDelete?.original_name
							}),
							"? This will unlink the file from active compliance records and packages while maintaining institutional audit logs."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
						className: "text-xs h-8 rounded-lg cursor-pointer",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: handleDeleteConfirm,
						className: "text-xs h-8 rounded-lg bg-destructive hover:bg-destructive/90 text-white cursor-pointer font-semibold",
						children: "Archive Document"
					})] })]
				})
			})
		]
	});
}
function PackageCard({ package: pkg, onRename, onDisband, onRemoveDocuments, onAddDocuments, isRenaming, isDisbanding, isRemoving = false }) {
	const [isEditingName, setIsEditingName] = (0, import_react.useState)(false);
	const [nameInput, setNameInput] = (0, import_react.useState)(pkg.name);
	const [isExpanded, setIsExpanded] = (0, import_react.useState)(true);
	const [disbandDialogOpen, setDisbandDialogOpen] = (0, import_react.useState)(false);
	const [selectedDocIds, setSelectedDocIds] = (0, import_react.useState)([]);
	const [pendingRemovalDocIds, setPendingRemovalDocIds] = (0, import_react.useState)(null);
	const [removingSingleDocId, setRemovingSingleDocId] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setNameInput(pkg.name);
	}, [pkg.name]);
	(0, import_react.useEffect)(() => {
		if (isEditingName) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [isEditingName]);
	(0, import_react.useEffect)(() => {
		setSelectedDocIds((prev) => prev.filter((id) => pkg.documents.some((d) => d.id === id)));
		if (removingSingleDocId && !pkg.documents.some((d) => d.id === removingSingleDocId)) setRemovingSingleDocId(null);
		if (pendingRemovalDocIds) {
			if (pendingRemovalDocIds.filter((id) => pkg.documents.some((d) => d.id === id)).length === 0) setPendingRemovalDocIds(null);
		}
	}, [
		pkg.documents,
		removingSingleDocId,
		pendingRemovalDocIds
	]);
	const handleNameSubmit = () => {
		const trimmed = nameInput.trim();
		if (trimmed && trimmed !== pkg.name) onRename(trimmed);
		else setNameInput(pkg.name);
		setIsEditingName(false);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleNameSubmit();
		} else if (e.key === "Escape") {
			setNameInput(pkg.name);
			setIsEditingName(false);
		}
	};
	const toggleSelectDoc = (docId) => {
		setSelectedDocIds((prev) => prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]);
	};
	const handleSelectAllToggle = () => {
		if (selectedDocIds.length === pkg.documents.length) setSelectedDocIds([]);
		else setSelectedDocIds(pkg.documents.map((d) => d.id));
	};
	const handleRemoveSingle = (docId) => {
		setPendingRemovalDocIds([docId]);
	};
	const handleBulkRemove = () => {
		if (selectedDocIds.length === 0) return;
		setPendingRemovalDocIds(selectedDocIds);
	};
	const handleConfirmRemoval = () => {
		if (!pendingRemovalDocIds || pendingRemovalDocIds.length === 0) return;
		const idsToRemove = [...pendingRemovalDocIds];
		if (idsToRemove.length === 1) setRemovingSingleDocId(idsToRemove[0]);
		onRemoveDocuments(idsToRemove);
		setSelectedDocIds((prev) => prev.filter((id) => !idsToRemove.includes(id)));
		setPendingRemovalDocIds(null);
	};
	const isAllSelected = pkg.documents.length > 0 && selectedDocIds.length === pkg.documents.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-brand-secondary/20 bg-linear-to-br from-brand-secondary/3 via-surface to-surface p-5 shadow-xs hover:border-brand-secondary/35 transition-all space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 shadow-2xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: isEditingName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								ref: inputRef,
								value: nameInput,
								onChange: (e) => setNameInput(e.target.value),
								onBlur: handleNameSubmit,
								onKeyDown: handleKeyDown,
								disabled: isRenaming,
								className: "h-8 text-sm font-semibold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: handleNameSubmit,
								disabled: isRenaming || !nameInput.trim(),
								"aria-label": "Save package name",
								title: "Save package name",
								className: "h-8 w-8 text-success hover:text-success hover:bg-success/10 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-base text-text-primary tracking-tight truncate",
									children: pkg.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setIsEditingName(true),
									"aria-label": `Rename package ${pkg.name}`,
									title: "Rename package",
									className: "h-7 w-7 text-text-secondary hover:text-text-primary",
									children: isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "text-[11px] font-semibold text-text-secondary px-2 py-0.5 tabular-nums",
									children: [
										pkg.documents.length,
										" ",
										pkg.documents.length === 1 ? "document" : "documents"
									]
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0 self-end sm:self-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onAddDocuments,
							className: "h-8 text-xs font-semibold gap-1.5 border-border-c hover:border-brand/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 text-brand" }), " Add documents"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => setDisbandDialogOpen(true),
							disabled: isDisbanding,
							className: "h-8 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5",
							children: [isDisbanding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Disband"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							onClick: () => setIsExpanded((prev) => !prev),
							className: "h-8 w-8 text-text-secondary hover:text-text-primary ml-1",
							"aria-label": isExpanded ? "Collapse package documents" : "Expand package documents",
							children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				children: isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						height: 0,
						opacity: 0
					},
					animate: {
						height: "auto",
						opacity: 1
					},
					exit: {
						height: 0,
						opacity: 0
					},
					transition: {
						duration: .25,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					className: "overflow-hidden pt-2 border-t border-border/60 space-y-3",
					children: pkg.documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-dashed border-border/80 p-6 text-center bg-surface-alt/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-6 w-6 text-text-tertiary mb-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-text-secondary",
								children: "No documents in this package yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: onAddDocuments,
								className: "mt-2 text-xs font-semibold gap-1 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Add documents"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: handleSelectAllToggle,
								className: "h-7 text-xs text-text-secondary hover:text-text-primary gap-1 px-2 font-medium cursor-pointer",
								children: isAllSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-3.5 w-3.5 text-brand" }), " Deselect all"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3.5 w-3.5" }), " Select all"] })
							}), selectedDocIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-text-secondary font-medium tabular-nums",
								children: [
									"(",
									selectedDocIds.length,
									" of ",
									pkg.documents.length,
									" selected)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedDocIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: .95
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .95
							},
							transition: { duration: .15 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								disabled: isRemoving,
								onClick: handleBulkRemove,
								className: "h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive gap-1.5 font-semibold cursor-pointer",
								children: [
									isRemoving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }),
									"Remove ",
									selectedDocIds.length
								]
							})
						}) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: pkg.documents.map((doc) => {
							const isItemRemoving = removingSingleDocId === doc.id || isRemoving && selectedDocIds.includes(doc.id);
							const isChecked = selectedDocIds.includes(doc.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center justify-between gap-3 rounded-xl border border-border/60 p-2.5 px-3 transition-colors ${isChecked ? "bg-brand/5 border-brand/40" : "bg-surface-alt/30 hover:bg-surface-alt/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: isChecked,
											onCheckedChange: () => toggleSelectDoc(doc.id),
											"aria-label": `Select ${doc.original_name}`,
											className: "mr-1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 shrink-0 text-brand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 flex-wrap text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-text-primary truncate max-w-45 sm:max-w-70",
														title: doc.original_name,
														children: doc.original_name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[11px] text-text-secondary capitalize font-mono",
														children: ["• ", doc.document_type.replace(/[-_]/g, " ")]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[11px] text-text-secondary font-mono tabular-nums",
														children: ["• ", formatFileSize(doc.file_size_bytes)]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentQualityBadge, { document: doc })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									"aria-label": `Remove ${doc.original_name} from package ${pkg.name}`,
									title: "Remove from package",
									disabled: isItemRemoving,
									onClick: () => handleRemoveSingle(doc.id),
									className: "h-7 w-7 text-text-secondary hover:text-destructive hover:bg-destructive/10 shrink-0 cursor-pointer",
									children: isItemRemoving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})]
							}, doc.id);
						})
					})] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: disbandDialogOpen,
				onOpenChange: setDisbandDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					"Disband ",
					pkg.name,
					"?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This removes the package bundle, but keeps all its documents safe in your Documents list. No files will be deleted." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: isDisbanding,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: onDisband,
					disabled: isDisbanding,
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					children: isDisbanding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1.5" }), " Disbanding…"] }) : "Disband Package"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pendingRemovalDocIds && pendingRemovalDocIds.length > 0),
				onOpenChange: (open) => {
					if (!open) setPendingRemovalDocIds(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: pendingRemovalDocIds?.length === 1 ? `Remove Document from ${pkg.name}?` : `Remove ${pendingRemovalDocIds?.length} Documents from ${pkg.name}?` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"This removes the selected",
					" ",
					pendingRemovalDocIds?.length === 1 ? "document" : "documents",
					" from this package. The documents themselves will remain in your Documents list."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: isRemoving,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: handleConfirmRemoval,
					disabled: isRemoving,
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					children: isRemoving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1.5" }), " Removing…"] }) : "Remove from Package"
				})] })] })
			})
		]
	});
}
function PackageCardSkeleton({ packageName, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-brand/30 bg-surface/80 p-5 shadow-xs transition-all space-y-4 animate-pulse", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand border border-brand/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [packageName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-text-primary tracking-tight truncate",
							children: packageName
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-44 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-medium border border-brand/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Syncing package…" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-text-tertiary mt-0.5",
						children: "Updating vault with new package data…"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 shrink-0 self-end sm:self-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-28 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-md" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-2 border-t border-border/40 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-28 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-16 rounded" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-surface/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-48 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-20 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-16 rounded" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16 rounded-full shrink-0" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-surface/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-lg shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-36 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-16 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-14 rounded" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16 rounded-full shrink-0" })
					]
				})]
			})]
		})]
	});
}
function PackageDocumentPicker({ open, onOpenChange, allDocuments, alreadyInPackage = [], onConfirm, isSubmitting, title = "Select Documents", description = "Choose documents to include in this package.", confirmLabel = "Add Documents" }) {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedDocIds, setSelectedDocIds] = (0, import_react.useState)([]);
	const availableDocs = (0, import_react.useMemo)(() => {
		return allDocuments.filter((doc) => !alreadyInPackage.includes(doc.id));
	}, [allDocuments, alreadyInPackage]);
	const filteredDocs = (0, import_react.useMemo)(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return availableDocs;
		return availableDocs.filter((doc) => doc.original_name.toLowerCase().includes(query) || doc.document_type.toLowerCase().includes(query));
	}, [availableDocs, searchQuery]);
	(0, import_react.useEffect)(() => {
		if (open) {
			setSelectedDocIds([]);
			setSearchQuery("");
		}
	}, [open]);
	const toggleSelectDoc = (id) => {
		setSelectedDocIds((prev) => prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]);
	};
	const toggleSelectAll = () => {
		if (selectedDocIds.length === filteredDocs.length && filteredDocs.length > 0) setSelectedDocIds([]);
		else setSelectedDocIds(filteredDocs.map((d) => d.id));
	};
	const handleConfirm = () => {
		if (selectedDocIds.length === 0) return;
		onConfirm(selectedDocIds);
	};
	const isAllSelected = filteredDocs.length > 0 && selectedDocIds.length === filteredDocs.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg max-h-[85vh] flex flex-col p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search by file name or document type...",
							className: "pl-9 text-sm"
						})]
					}), availableDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-text-secondary px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							selectedDocIds.length,
							" of ",
							availableDocs.length,
							" selected"
						] }), filteredDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleSelectAll,
							className: "flex items-center gap-1 font-medium text-brand hover:underline cursor-pointer",
							children: isAllSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-3.5 w-3.5" }), " Deselect all"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3.5 w-3.5" }), " Select all filtered"] })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto max-h-[340px] rounded-xl border border-border/80 divide-y divide-border/60 bg-surface-alt/20 my-2",
					children: availableDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-xs text-text-secondary",
						children: "No available documents to add. All uploaded documents are already in this package or none have been uploaded yet."
					}) : filteredDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-8 text-center text-xs text-text-secondary",
						children: [
							"No documents matching \"",
							searchQuery,
							"\""
						]
					}) : filteredDocs.map((doc) => {
						const isChecked = selectedDocIds.includes(doc.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => toggleSelectDoc(doc.id),
							className: `flex items-center justify-between gap-3 p-3 text-xs transition-colors cursor-pointer ${isChecked ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-surface-alt/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: isChecked,
										onCheckedChange: () => toggleSelectDoc(doc.id),
										onClick: (e) => e.stopPropagation()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 shrink-0 text-brand" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-text-primary truncate",
											title: doc.original_name,
											children: doc.original_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-[11px] text-text-secondary font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "capitalize",
												children: doc.document_type.replace(/[-_]/g, " ")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["• ", formatFileSize(doc.file_size_bytes)] })]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "shrink-0",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentQualityBadge, { document: doc })
							})]
						}, doc.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						disabled: isSubmitting,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: handleConfirm,
						disabled: isSubmitting || selectedDocIds.length === 0,
						children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1.5" }), " Saving…"] }) : `${confirmLabel} (${selectedDocIds.length})`
					})]
				})
			]
		})
	});
}
function PackagesSection({ documents, className }) {
	const { data: packages = [], isLoading, isFetching, isError, error } = usePackages();
	const renamePackageMutation = useRenamePackage();
	const disbandPackageMutation = useDisbandPackage();
	const addDocsMutation = useAddDocumentsToPackage();
	const removeDocsMutation = useRemoveDocumentsFromPackage();
	const [renamingPkgId, setRenamingPkgId] = (0, import_react.useState)(null);
	const [disbandingPkgId, setDisbandingPkgId] = (0, import_react.useState)(null);
	const [targetPackageForAdd, setTargetPackageForAdd] = (0, import_react.useState)(null);
	const [createDialogOpen, setCreateDialogOpen] = (0, import_react.useState)(false);
	const [syncingPackageName, setSyncingPackageName] = (0, import_react.useState)(null);
	const isNewPackageLoaded = (0, import_react.useMemo)(() => {
		if (!syncingPackageName) return false;
		return packages.some((p) => p.name.trim().toLowerCase() === syncingPackageName.trim().toLowerCase());
	}, [packages, syncingPackageName]);
	(0, import_react.useEffect)(() => {
		if (isNewPackageLoaded && syncingPackageName) setSyncingPackageName(null);
	}, [isNewPackageLoaded, syncingPackageName]);
	(0, import_react.useEffect)(() => {
		if (syncingPackageName) {
			const timer = setTimeout(() => {
				setSyncingPackageName(null);
			}, 8e3);
			return () => clearTimeout(timer);
		}
	}, [syncingPackageName]);
	const showLoadingCard = Boolean(syncingPackageName && !isNewPackageLoaded);
	const handleRename = (pkgId, newName) => {
		setRenamingPkgId(pkgId);
		renamePackageMutation.mutate({
			pkgId,
			name: newName
		}, {
			onSuccess: () => {
				toast.success("Package renamed successfully.");
				setRenamingPkgId(null);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Failed to rename package"));
				setRenamingPkgId(null);
			}
		});
	};
	const handleDisband = (pkg) => {
		setDisbandingPkgId(pkg.id);
		disbandPackageMutation.mutate(pkg.id, {
			onSuccess: () => {
				toast.success(`Disbanded "${pkg.name}".`);
				setDisbandingPkgId(null);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Failed to disband package"));
				setDisbandingPkgId(null);
			}
		});
	};
	const handleAddDocsToPackage = (selectedDocIds) => {
		if (!targetPackageForAdd) return;
		addDocsMutation.mutate({
			pkgId: targetPackageForAdd.id,
			documentIds: selectedDocIds
		}, {
			onSuccess: () => {
				toast.success(`Added ${selectedDocIds.length} document${selectedDocIds.length === 1 ? "" : "s"} to "${targetPackageForAdd.name}".`);
				setTargetPackageForAdd(null);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Failed to add documents to package"));
			}
		});
	};
	const handleRemoveDocsFromPackage = (pkgId, docIds) => {
		if (docIds.length === 0) return;
		removeDocsMutation.mutate({
			pkgId,
			documentIds: docIds
		}, {
			onSuccess: () => {
				toast.success(docIds.length === 1 ? "Document removed from package." : `Removed ${docIds.length} documents from package.`);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Failed to remove documents from package"));
			}
		});
	};
	if (isLoading || packages.length === 0 && (isFetching || showLoadingCard)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("space-y-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-72" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-medium border border-brand/20 animate-pulse self-start sm:self-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), syncingPackageName ? `Syncing "${syncingPackageName}"…` : "Updating packages…"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCardSkeleton, { packageName: syncingPackageName ?? void 0 })
		})]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("space-y-4", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs text-destructive flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getApiErrorMessage(error, "Failed to load document packages.") })]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("space-y-4", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 shadow-2xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-text-primary",
							children: "Document Packages"
						}), (isFetching || showLoadingCard) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-medium border border-brand-secondary/20 animate-pulse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), syncingPackageName ? `Syncing "${syncingPackageName}"…` : "Updating packages…"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: "Organize documents into curated bundles for due diligence, audits, or investor reviews."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setCreateDialogOpen(true),
					className: "gap-1.5 text-xs font-semibold self-start sm:self-auto cursor-pointer hover:border-brand-secondary/40 hover:bg-brand-secondary/5 hover:text-brand-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 text-brand-secondary" }), " Create package"]
				})]
			}),
			packages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto h-8 w-8 text-text-tertiary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-text-secondary",
						children: "No document packages created yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-tertiary mt-1 max-w-sm mx-auto",
						children: "Bundle documents together for due diligence, tax filings, or lender reviews."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => setCreateDialogOpen(true),
						className: "gap-1.5 text-xs font-semibold cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Create first package"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [showLoadingCard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCardSkeleton, { packageName: syncingPackageName ?? void 0 }), packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, {
					package: pkg,
					onRename: (newName) => handleRename(pkg.id, newName),
					onDisband: () => handleDisband(pkg),
					onRemoveDocuments: (docIds) => handleRemoveDocsFromPackage(pkg.id, docIds),
					onAddDocuments: () => setTargetPackageForAdd(pkg),
					isRenaming: renamingPkgId === pkg.id,
					isDisbanding: disbandingPkgId === pkg.id,
					isRemoving: removeDocsMutation.isPending
				}, pkg.id))]
			}),
			targetPackageForAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageDocumentPicker, {
				open: Boolean(targetPackageForAdd),
				onOpenChange: (open) => {
					if (!open) setTargetPackageForAdd(null);
				},
				allDocuments: documents,
				alreadyInPackage: targetPackageForAdd.documents.map((d) => d.id),
				onConfirm: handleAddDocsToPackage,
				isSubmitting: addDocsMutation.isPending,
				title: `Add Documents to ${targetPackageForAdd.name}`,
				description: "Select from your available company documents to add to this bundle.",
				confirmLabel: "Add to Package"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePackageDialog, {
				open: createDialogOpen,
				onOpenChange: setCreateDialogOpen,
				documents,
				onSuccess: (createdPkg) => {
					setSyncingPackageName(createdPkg.name);
				}
			})
		]
	});
}
var EASING = [
	.16,
	1,
	.3,
	1
];
var VIEWS = [
	{
		id: "grouped",
		label: "Grouped"
	},
	{
		id: "table",
		label: "Table"
	},
	{
		id: "packages",
		label: "Packages"
	}
];
function DocumentsViewToggle({ activeView, onChange, className }) {
	const buttonRefs = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const handleKeyDown = (e, currentIndex) => {
		let nextIndex = currentIndex;
		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			nextIndex = (currentIndex + 1) % VIEWS.length;
		} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			nextIndex = (currentIndex - 1 + VIEWS.length) % VIEWS.length;
		} else if (e.key === "Home") {
			e.preventDefault();
			nextIndex = 0;
		} else if (e.key === "End") {
			e.preventDefault();
			nextIndex = VIEWS.length - 1;
		}
		if (nextIndex !== currentIndex) {
			const nextView = VIEWS[nextIndex].id;
			onChange(nextView);
			buttonRefs.current.get(nextView)?.focus();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "tablist",
		"aria-label": "Documents views",
		className: cn("inline-flex items-center p-1 rounded-xl bg-surface-alt/50 border border-border-c/70 select-none", className),
		children: VIEWS.map(({ id, label }, index) => {
			const isActive = activeView === id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				ref: (el) => {
					if (el) buttonRefs.current.set(id, el);
					else buttonRefs.current.delete(id);
				},
				role: "tab",
				id: `documents-view-tab-${id}`,
				"aria-selected": isActive,
				"aria-controls": `documents-view-panel-${id}`,
				tabIndex: isActive ? 0 : -1,
				type: "button",
				onClick: () => onChange(id),
				onKeyDown: (e) => handleKeyDown(e, index),
				className: cn("relative flex items-center justify-center px-3.5 sm:px-4 h-8 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1", isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"),
				children: [isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layoutId: "documents-view-indicator",
					className: "absolute inset-0 rounded-lg bg-surface shadow-xs border border-border-c/60 z-0",
					transition: {
						duration: .22,
						ease: EASING
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative z-10",
					children: label
				})]
			}, id);
		})
	});
}
function UploadDocumentModal({ open, onOpenChange, onUpload, activeUploads = [], onCancelUpload }) {
	const [dragActive, setDragActive] = (0, import_react.useState)(false);
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [fileError, setFileError] = (0, import_react.useState)(null);
	const [manualCategoryOverride, setManualCategoryOverride] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const activeItem = activeUploads.find((item) => item.status === "uploading" || item.status === "processing" || item.status === "queued");
	const latestDoneItem = activeUploads.find((item) => item.status === "done");
	const resetState = () => {
		setSelectedFile(null);
		setFileError(null);
		setManualCategoryOverride("");
		setDragActive(false);
	};
	const handleClose = (newOpen) => {
		if (!newOpen) resetState();
		onOpenChange(newOpen);
	};
	const handleFileSelect = (file) => {
		const validation = validateFile(file);
		if (!validation.valid) {
			setFileError(validation.error || "Invalid file format or size.");
			setSelectedFile(null);
			return;
		}
		setFileError(null);
		setSelectedFile(file);
	};
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
		else if (e.type === "dragleave") setDragActive(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedFile) return;
		onUpload(selectedFile, { documentCategory: manualCategoryOverride || void 0 });
		setSelectedFile(null);
		setManualCategoryOverride("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md p-6 bg-surface border-border-c overflow-hidden w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "space-y-1 w-full min-w-0 pr-6 text-left overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-bold text-text-primary tracking-tight",
						children: "Upload Document"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-text-secondary leading-relaxed",
						children: "Spotlight automatically detects document types, validates statutory filings, and organizes evidence into your repository."
					})]
				}),
				activeItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-brand/20 bg-brand/5 p-4 space-y-3 w-full min-w-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 w-full min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-text-primary truncate",
									title: activeItem.file.name,
									children: activeItem.file.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-brand font-medium mt-0.5 truncate",
									children: [
										activeItem.status === "uploading" && "Uploading binary payload…",
										activeItem.status === "processing" && "Analyzing contents & running statutory checks…",
										activeItem.status === "queued" && "Queued for upload…"
									]
								})]
							})]
						}), onCancelUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => onCancelUpload(activeItem.id),
							className: "h-7 px-2 text-xs text-text-tertiary hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer shrink-0",
							children: "Cancel"
						})]
					}), activeItem.verifyingMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-tertiary pl-10 animate-pulse truncate",
						children: activeItem.verifyingMessage
					})]
				}),
				latestDoneItem && !activeItem && !selectedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-success/30 bg-success/5 p-4 space-y-3 w-full min-w-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 w-full min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success mt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-text-primary truncate",
								title: latestDoneItem.file.name,
								children: latestDoneItem.file.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-primary",
										children: formatDocumentType(latestDoneItem.uploadedDocument?.document_type)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: latestDoneItem.uploadedDocument?.document_category || "Categorized" })
								]
							})]
						})]
					}), latestDoneItem.uncertainClassification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 border-t border-success/20 space-y-2 w-full min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-text-secondary",
							children: [
								"Spotlight categorized this as ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Others / Unclassified" }),
								". You can re-assign it to a canonical category if preferred:"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: manualCategoryOverride,
							onValueChange: (val) => {
								setManualCategoryOverride(val);
								if (latestDoneItem.file) onUpload(latestDoneItem.file, { documentCategory: val });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-8 text-xs rounded-xl bg-surface border-border-c w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose Category Destination" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "text-xs",
								children: ORDERED_CANONICAL_CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: cat.label,
									children: cat.label
								}, cat.id))
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4 pt-1 w-full min-w-0 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							accept: ACCEPTED_FILE_EXTENSIONS.join(","),
							onChange: (e) => {
								if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
							},
							className: "hidden"
						}),
						!selectedFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onDragEnter: handleDrag,
							onDragLeave: handleDrag,
							onDragOver: handleDrag,
							onDrop: handleDrop,
							onClick: () => fileInputRef.current?.click(),
							className: cn("flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-7 text-center cursor-pointer transition-all duration-200 select-none w-full min-w-0 overflow-hidden", dragActive ? "border-brand bg-brand/5 scale-[0.99]" : "border-border-c/90 bg-surface-alt/40 hover:border-brand/40 hover:bg-surface-alt/70"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold text-text-primary",
									children: [
										"Drag and drop your document here, or",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-brand hover:underline",
											children: "browse"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-tertiary mt-1",
									children: "PDF only • Up to 10MB per file"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-brand/25 bg-brand/4 p-4 space-y-3 w-full min-w-0 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 w-full min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 min-w-0 flex-1 overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand border border-brand/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 shrink-0" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-text-primary truncate block",
											title: selectedFile.name,
											children: selectedFile.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-mono tabular-nums text-text-secondary mt-0.5",
											children: formatFileSize$1(selectedFile.size)
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: resetState,
									className: "h-8 w-8 p-0 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface shrink-0 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Remove file"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border-c/70 bg-surface p-3 space-y-1.5 w-full min-w-0 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-semibold text-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Automatic Classification" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary leading-relaxed pl-5.5",
									children: "Spotlight will automatically identify the document type, extract key entities, and organize it into your evidence vault upon upload."
								})]
							})]
						}),
						fileError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive w-full min-w-0 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fileError })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-border-c/40 w-full min-w-0 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-tertiary min-w-0 truncate",
								title: "Uploads continue safely in background if closed.",
								children: "Uploads continue safely in background if closed."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 shrink-0 justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => handleClose(false),
									className: "text-xs h-9 rounded-xl border-border-c text-text-secondary hover:text-text-primary cursor-pointer",
									children: activeItem || latestDoneItem ? "Close" : "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									size: "sm",
									disabled: !selectedFile,
									className: "text-xs h-9 rounded-xl bg-brand hover:bg-brand/90 text-white shadow-xs cursor-pointer gap-2 disabled:opacity-50 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload & Classify" })]
								})]
							})]
						})
					]
				})
			]
		})
	});
}
function UploadActivityMonitor({ queue, onOpenUploadModal, className }) {
	const { items, inProgressItems, queuedItems, failedItems, recentCompleted, cancel, retry, dismissItem, clearCompleted, clearFailed, activeCount, queuedCount, failedCount, completedCount, hasActiveJobs, hasFailedJobs, hasInterruptedJobs } = queue;
	const [isExpanded, setIsExpanded] = (0, import_react.useState)(true);
	const [activeTab, setActiveTab] = (0, import_react.useState)(() => {
		if (failedCount > 0) return "failed";
		if (activeCount > 0) return "in-progress";
		if (queuedCount > 0) return "queued";
		return "all";
	});
	const fileInputRef = (0, import_react.useRef)(null);
	const pendingRetryIdRef = (0, import_react.useRef)(null);
	if (items.length === 0) return null;
	const handleTriggerReupload = (id) => {
		pendingRetryIdRef.current = id;
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
			fileInputRef.current.click();
		}
	};
	const handleFilePicked = (e) => {
		const file = e.target.files?.[0];
		const targetId = pendingRetryIdRef.current;
		if (file && targetId) retry(targetId, file);
		pendingRetryIdRef.current = null;
	};
	const displayItems = (() => {
		switch (activeTab) {
			case "in-progress": return inProgressItems;
			case "queued": return queuedItems;
			case "failed": return failedItems;
			case "completed": return recentCompleted;
			default: return items;
		}
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Upload activity monitor",
		className: cn("rounded-2xl border border-border-c bg-surface shadow-2xs overflow-hidden transition-all duration-200", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileInputRef,
				type: "file",
				accept: ".pdf",
				className: "hidden",
				onChange: handleFilePicked
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-surface border-b border-border-c/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand",
						children: hasActiveJobs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : hasFailedJobs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-bold text-text-primary uppercase tracking-wider",
								children: "Upload & Pipeline Activity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-mono tabular-nums text-text-tertiary",
								children: [
									"(",
									items.length,
									" ",
									items.length === 1 ? "document" : "documents",
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-text-secondary truncate mt-0.5",
							children: [
								hasActiveJobs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand font-medium",
									children: activeCount > 0 ? "Actively verifying & indexing filings" : "Jobs waiting in queue"
								}),
								!hasActiveJobs && hasFailedJobs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-destructive font-medium",
									children: [
										failedCount,
										" ",
										failedCount === 1 ? "filing needs attention" : "filings need attention"
									]
								}),
								!hasActiveJobs && !hasFailedJobs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-success font-medium",
									children: "All queued documents verified and recorded"
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						failedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: clearFailed,
							className: "h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer",
							title: "Dismiss all failed entries",
							children: [
								"Clear Failed (",
								failedCount,
								")"
							]
						}),
						completedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: clearCompleted,
							className: "h-7 px-2 text-[11px] text-text-tertiary hover:text-text-primary rounded-lg cursor-pointer",
							title: "Clear completed logs from list",
							children: "Clear Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => setIsExpanded((prev) => !prev),
							className: "h-7 w-7 p-0 rounded-lg text-text-tertiary hover:text-text-primary cursor-pointer",
							"aria-expanded": isExpanded,
							"aria-label": isExpanded ? "Collapse activity monitor" : "Expand activity monitor",
							children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
						})
					]
				})]
			}),
			isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4 bg-surface-alt/40",
				children: [
					hasInterruptedJobs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-xl border border-severity-moderate/40 bg-severity-moderate/10 p-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-severity-moderate shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-text-primary",
								children: "Previous Upload Session Was Interrupted"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-text-secondary text-[11px] leading-relaxed",
								children: [
									"The browser was closed or reloaded while transmitting document payloads. Because file binaries are discarded by browsers on reload, click",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-text-primary",
										children: "“Re-select & Retry”"
									}),
									" next to each interrupted document to resume statutory verification."
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 border-b border-border-c/70 pb-2 overflow-x-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("all"),
								className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap", activeTab === "all" ? "bg-brand text-white shadow-2xs" : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tabular-nums opacity-80",
									children: items.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("in-progress"),
								className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap", activeTab === "in-progress" ? "bg-brand text-white shadow-2xs" : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60"),
								children: [
									activeCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In Progress" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tabular-nums opacity-80",
										children: activeCount
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("queued"),
								className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap", activeTab === "queued" ? "bg-brand text-white shadow-2xs" : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Queued" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tabular-nums opacity-80",
										children: queuedCount
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("failed"),
								className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap", activeTab === "failed" ? "bg-destructive text-white shadow-2xs" : failedCount > 0 ? "bg-destructive/10 text-destructive border border-destructive/30" : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Failed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tabular-nums opacity-80",
										children: failedCount
									})
								]
							}),
							completedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("completed"),
								className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap", activeTab === "completed" ? "bg-success text-white shadow-2xs" : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ready" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tabular-nums opacity-80",
										children: completedCount
									})
								]
							})
						]
					}),
					displayItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-6 text-center text-xs text-text-tertiary",
						children: [
							"No files currently matching the “",
							activeTab,
							"” filter."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-h-80 overflow-y-auto pr-1",
						children: displayItems.map((item, idx) => {
							const isItemUploading = item.status === "uploading";
							const isItemProcessing = item.status === "processing";
							const isItemQueued = item.status === "queued";
							const isItemError = item.status === "error";
							const isItemDone = item.status === "done";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3 transition-colors", isItemError ? "border-destructive/30 bg-destructive/5" : isItemProcessing || isItemUploading ? "border-brand/30 bg-brand/5" : isItemDone ? "border-success/30 bg-surface" : "border-border-c/80 bg-surface"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5", isItemError ? "bg-destructive/15 text-destructive" : isItemProcessing ? "bg-severity-moderate/15 text-severity-moderate animate-pulse" : isItemUploading ? "bg-brand/15 text-brand" : isItemDone ? "bg-success/15 text-success" : "bg-border-c/40 text-text-tertiary"),
										children: isItemUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : isItemProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 animate-pulse" }) : isItemError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }) : isItemDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-text-primary font-mono truncate max-w-xs sm:max-w-sm",
													title: item.fileName,
													children: item.fileName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono tabular-nums text-text-tertiary",
													children: formatFileSize$1(item.fileSize)
												}),
												item.documentType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "text-[10px] h-4 px-1.5 bg-surface text-text-secondary border-border-c",
													children: formatDocumentType(item.documentType)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] leading-snug",
											children: [
												isItemUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-brand font-medium",
													children: item.stage || "Uploading binary payload to secure vault…"
												}),
												isItemProcessing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-brand font-medium flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin shrink-0" }), item.stage || "Classifying document & running statutory verification…"]
													}), item.verifyingMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-text-tertiary animate-pulse italic",
														children: item.verifyingMessage
													})]
												}),
												isItemQueued && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-text-secondary",
													children: [
														"Position (",
														idx + 1,
														") in queue • Waiting for worker slot…"
													]
												}),
												isItemDone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-success font-medium",
													children: ["Verified & stored in vault", item.uploadedDocument?.document_type && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-text-tertiary ml-1 font-normal",
														children: [
															"(",
															formatDocumentType(item.uploadedDocument.document_type),
															")"
														]
													})]
												}),
												isItemError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 rounded-lg border border-destructive/20 bg-destructive/10 p-2 text-destructive space-y-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1 font-semibold text-[11px]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Problem Diagnosis:" })]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-text-secondary font-mono leading-relaxed",
															children: item.errorMessage || "Unknown verification or network failure occurred."
														}),
														item.errorMessage?.toLowerCase().includes("duplicate") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] text-text-tertiary italic",
															children: "Tip: This file appears to already exist in the corporate vault."
														})
													]
												})
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 shrink-0 self-end sm:self-center",
									children: [
										isItemQueued && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => cancel(item.id),
											className: "h-7 px-2.5 text-xs text-text-tertiary hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cancel" })]
										}),
										isItemError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [item.isInterrupted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											onClick: () => handleTriggerReupload(item.id),
											className: "h-7 px-2.5 text-xs bg-brand hover:bg-brand/90 text-white rounded-lg cursor-pointer gap-1 font-semibold shadow-2xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Re-select & Retry" })]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											onClick: () => retry(item.id),
											className: "h-7 px-2.5 text-xs bg-brand hover:bg-brand/90 text-white rounded-lg cursor-pointer gap-1 font-semibold shadow-2xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retry Upload" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => dismissItem(item.id),
											className: "h-7 w-7 p-0 text-text-tertiary hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer",
											title: "Dismiss error",
											"aria-label": "Dismiss error",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
										})] }),
										isItemDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => dismissItem(item.id),
											className: "h-7 w-7 p-0 text-text-tertiary hover:text-text-primary rounded-lg cursor-pointer",
											title: "Dismiss completed notification",
											"aria-label": "Dismiss completed",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
										})
									]
								})]
							}, item.id);
						})
					})
				]
			})
		]
	});
}
var COMPACT_DOMAIN_EXPANSION_THRESHOLD = 6;
function DocumentsPage() {
	const navigate = useNavigate();
	const searchParams = useSearch({ strict: false });
	const { data: documents = [], isLoading, isError, error, refetch, isFetching } = useDocuments();
	const replaceMutation = useReplaceDocument();
	const deleteMutation = useDeleteDocument();
	const uploadQueue = useUploadQueue();
	const activeCategory = searchParams?.category || "all";
	const activeView = searchParams?.view === "table" ? "table" : searchParams?.view === "packages" ? "packages" : "grouped";
	const [searchQuery, setSearchQuery] = (0, import_react.useState)(searchParams?.q || "");
	const [downloadingDocId, setDownloadingDocId] = (0, import_react.useState)(null);
	const [isUploadOpen, setIsUploadOpen] = (0, import_react.useState)(false);
	const [previewDoc, setPreviewDoc] = (0, import_react.useState)(null);
	const [docToReplace, setDocToReplace] = (0, import_react.useState)(null);
	const [isReplacing, setIsReplacing] = (0, import_react.useState)(false);
	const [docToDelete, setDocToDelete] = (0, import_react.useState)(null);
	const [targetDocForPackage, setTargetDocForPackage] = (0, import_react.useState)(null);
	const [isPackageDialogOpen, setIsPackageDialogOpen] = (0, import_react.useState)(false);
	const headerButtonRefs = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [openSubcategories, setOpenSubcategories] = (0, import_react.useState)(() => {
		const initial = {};
		if (searchParams?.sub) initial[searchParams.sub] = true;
		return initial;
	});
	(0, import_react.useEffect)(() => {
		if (searchParams?.sub) setOpenSubcategories((prev) => ({
			...prev,
			[searchParams.sub]: true
		}));
	}, [searchParams?.sub]);
	(0, import_react.useEffect)(() => {
		if (searchParams?.q !== void 0 && searchParams.q !== searchQuery) setSearchQuery(searchParams.q);
	}, [searchParams?.q]);
	const handleCategoryChange = (newCategory, newSub) => {
		navigate({
			to: "/documents",
			search: {
				category: newCategory === "all" ? void 0 : newCategory,
				sub: newSub || void 0,
				view: searchParams?.view,
				q: searchQuery.trim() || void 0
			},
			replace: true
		});
	};
	const handleViewChange = (newView) => {
		navigate({
			to: "/documents",
			search: {
				category: searchParams?.category,
				sub: searchParams?.sub,
				view: newView === "grouped" ? void 0 : newView,
				q: searchQuery.trim() || void 0
			},
			replace: true
		});
	};
	const handleSearchChange = (val) => {
		setSearchQuery(val);
		navigate({
			to: "/documents",
			search: {
				category: searchParams?.category,
				sub: searchParams?.sub,
				view: searchParams?.view,
				q: val.trim() || void 0
			},
			replace: true
		});
	};
	const metrics = (0, import_react.useMemo)(() => calculateRepositoryMetrics(documents), [documents]);
	const filteredDocuments = (0, import_react.useMemo)(() => {
		return filterAndSortDocuments(documents, {
			categoryFilter: activeView === "grouped" ? activeCategory : "all",
			searchQuery,
			sortOrder: "newest"
		});
	}, [
		documents,
		activeCategory,
		searchQuery,
		activeView
	]);
	const hierarchicalSections = (0, import_react.useMemo)(() => {
		return groupDocumentsByHierarchy(filteredDocuments);
	}, [filteredDocuments]);
	const overviewStructure = (0, import_react.useMemo)(() => {
		return getRepositoryStructureOverview(documents);
	}, [documents]);
	const domainTelemetry = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const row of overviewStructure) map.set(row.domain.id, {
			count: row.totalDocuments,
			missingRequired: row.missingRequiredCount,
			needsAttention: row.needsAttentionCount
		});
		return map;
	}, [overviewStructure]);
	const isSubcategoryExpanded = (subId, domainSubcategories, domainDocCount) => {
		if (openSubcategories[subId] !== void 0) return openSubcategories[subId];
		if (searchQuery.trim().length > 0) {
			const group = domainSubcategories.find((s) => s.category.id === subId);
			return Boolean(group && group.documents.length > 0);
		}
		if (searchParams?.sub === subId) return true;
		if (domainDocCount <= COMPACT_DOMAIN_EXPANSION_THRESHOLD) {
			const group = domainSubcategories.find((s) => s.category.id === subId);
			return Boolean(group && group.documents.length > 0);
		}
		return domainSubcategories.find((s) => s.documents.length > 0)?.category.id === subId;
	};
	const toggleSubcategory = (subId, isCurrentlyExpanded) => {
		const nextState = !isCurrentlyExpanded;
		setOpenSubcategories((prev) => ({
			...prev,
			[subId]: nextState
		}));
		if (!nextState) {
			const btn = headerButtonRefs.current.get(subId);
			if (btn && btn.parentElement?.contains(document.activeElement)) btn.focus();
			if (searchParams?.sub === subId) handleCategoryChange(activeCategory, void 0);
		} else handleCategoryChange(activeCategory, subId);
	};
	const handleToggleAllSubcategories = (subcategories, expand) => {
		setOpenSubcategories((prev) => {
			const next = { ...prev };
			for (const item of subcategories) next[item.category.id] = expand;
			return next;
		});
	};
	const handleDownload = async (doc) => {
		try {
			setDownloadingDocId(doc.id);
			await downloadDocument(doc.id, doc.original_name);
			toast.success(`Downloaded ${doc.original_name}`);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to download document"));
		} finally {
			setDownloadingDocId(null);
		}
	};
	const handleReplaceSubmit = async (file) => {
		if (!docToReplace) return;
		setIsReplacing(true);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("document_type", docToReplace.document_type);
		formData.append("document_category", docToReplace.document_category);
		try {
			await replaceMutation.mutateAsync({
				docId: docToReplace.id,
				formData
			});
			toast.success(`Replaced "${docToReplace.original_name}" with "${file.name}"`);
			setDocToReplace(null);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to replace document"));
		} finally {
			setIsReplacing(false);
		}
	};
	const handleDeleteConfirm = async () => {
		if (!docToDelete) return;
		const target = docToDelete;
		setDocToDelete(null);
		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(`Archived "${target.original_name}"`, { description: "Corporate evidence unlinked from active vault. Audit history preserved." });
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to archive document"));
		}
	};
	const handleUploadFile = (file, options) => {
		uploadQueue.enqueue([file], {
			documentCategory: options?.documentCategory || "",
			documentType: options?.documentType || ""
		});
	};
	const handleAddToPackage = (doc) => {
		setTargetDocForPackage(doc);
		setIsPackageDialogOpen(true);
	};
	const handleOpenOrScrollActivity = () => {
		const el = document.getElementById("upload-activity-monitor");
		if (el && uploadQueue.items.length > 0) el.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
		else setIsUploadOpen(true);
	};
	if (isLoading && documents.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-b border-border-c pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-44" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-80" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-full" }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-44 rounded-2xl" }, i))
			})
		]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md space-y-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto h-10 w-10 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-text-primary",
					children: "Failed to load repository"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary",
					children: getApiErrorMessage(error, "An unexpected network error occurred while loading documents.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => refetch(),
					disabled: isFetching,
					className: "gap-2 cursor-pointer rounded-xl border-border-c",
					children: [isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Retry connection"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-c/80 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold font-display text-text-primary tracking-tight",
					children: "Documents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary mt-1",
					children: "Authoritative corporate documentary evidence vault."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						uploadQueue.hasActiveJobs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleOpenOrScrollActivity,
							className: "flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 hover:bg-brand/15 px-3 py-1.5 text-xs text-brand font-semibold shadow-2xs transition-colors cursor-pointer animate-pulse",
							title: "Upload in progress — click to view status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								uploadQueue.isUploading ? "Uploading" : "Processing",
								" (",
								uploadQueue.totalActiveJobs,
								" active)"
							] })]
						}),
						uploadQueue.failedCount > 0 && !uploadQueue.hasActiveJobs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleOpenOrScrollActivity,
							className: "flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 hover:bg-destructive/15 px-2.5 py-1.5 text-xs text-destructive font-semibold cursor-pointer",
							title: "Click to view error details",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [uploadQueue.failedCount, " failed"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							title: `${metrics.verifiedCount} of ${metrics.totalCount} documents verified • ${metrics.reviewedPercentage}% vault audit readiness`,
							className: "inline-flex items-center gap-2.5 rounded-full border border-border-c/90 bg-surface pl-3 pr-1.5 py-1 shadow-2xs hover:border-brand/30 transition-all select-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 text-text-tertiary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-text-primary tabular-nums",
											children: metrics.verifiedCount
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-text-secondary font-medium",
											children: [
												"/",
												metrics.totalCount,
												" Verified"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-3.5 w-px bg-border-c/80",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors", metrics.reviewedPercentage >= 80 ? "bg-success/12 text-success border-success/30" : "bg-brand/10 text-brand border-brand/25"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold tabular-nums",
										children: [metrics.reviewedPercentage, "% Ready"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => setIsUploadOpen(true),
							className: "h-9 px-4 rounded-xl bg-brand hover:bg-brand/90 text-white shadow-xs cursor-pointer gap-2 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload Document" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [activeView !== "packages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								placeholder: activeView === "table" ? "Search table records…" : activeCategory === "all" ? "Search across all domains…" : "Search within this domain…",
								value: searchQuery,
								onChange: (e) => handleSearchChange(e.target.value),
								className: "pl-8.5 pr-8 h-9 text-xs rounded-xl bg-surface border-border-c shadow-2xs",
								"aria-label": "Search documents"
							}),
							searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleSearchChange(""),
								className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary cursor-pointer p-0.5",
								title: "Clear search",
								"aria-label": "Clear search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentsViewToggle, {
						activeView,
						onChange: handleViewChange
					})]
				}), activeView === "grouped" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "tablist",
					"aria-label": "Document Domains",
					className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": activeCategory === "all",
						onClick: () => handleCategoryChange("all"),
						className: cn("px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer border flex items-center gap-1.5 motion-reduce:transform-none", activeCategory === "all" ? "bg-brand text-white border-brand shadow-xs" : "bg-surface text-text-secondary border-border-c/80 hover:border-brand/40 hover:text-text-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-mono text-xs tabular-nums", activeCategory === "all" ? "text-white/80" : "text-text-tertiary"),
							children: documents.length
						})]
					}), ORDERED_TOP_LEVEL_DOMAINS.map((domain) => {
						const tel = domainTelemetry.get(domain.id) || {
							count: 0,
							missingRequired: 0,
							needsAttention: 0
						};
						const count = tel.count;
						const isSelected = activeCategory === domain.id;
						const Icon = domain.icon;
						if (domain.id === "miscellaneous" && count === 0 && !isSelected) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							"aria-selected": isSelected,
							onClick: () => handleCategoryChange(domain.id),
							className: cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer border motion-reduce:transform-none", isSelected ? "bg-brand text-white border-brand shadow-xs" : "bg-surface text-text-secondary border-border-c/80 hover:border-brand/40 hover:text-text-primary"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-3 w-3 shrink-0", isSelected ? "text-white" : "text-text-tertiary") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: domain.shortLabel }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("font-mono text-xs tabular-nums", isSelected ? "text-white/80" : "text-text-tertiary"),
									children: count
								}),
								tel.needsAttention > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									title: `${tel.needsAttention} document unverified or needs review`,
									className: cn("flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full", isSelected ? "bg-white/20 text-white border border-white/30" : "bg-brand/10 text-brand border border-brand/20"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-2.5 w-2.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "needs attention:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tel.needsAttention })
									]
								})
							]
						}, domain.id);
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "upload-activity-monitor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadActivityMonitor, {
					queue: uploadQueue,
					onOpenUploadModal: () => setIsUploadOpen(true)
				})
			}),
			documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border-c bg-surface/70 p-12 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20 shadow-2xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 max-w-md mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-text-primary tracking-tight",
							children: "No documents in repository yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary leading-relaxed",
							children: "Upload your company's incorporation filings, statutory compliance documents, and commercial agreements to establish your documentary evidence vault."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: () => setIsUploadOpen(true),
						className: "rounded-xl bg-brand hover:bg-brand/90 text-white text-xs h-9 px-4 font-semibold shadow-xs cursor-pointer gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload Your First Document" })]
					})
				]
			}) : filteredDocuments.length === 0 && searchQuery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border-c bg-surface/70 p-10 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface-alt text-text-tertiary border border-border-c",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 max-w-sm mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-bold text-text-primary",
							children: [
								"No documents matching “",
								searchQuery,
								"”"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Try searching by a different filename, document type, or clear the search query to restore the repository view."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => handleSearchChange(""),
							className: "text-xs h-8 rounded-xl border-border-c cursor-pointer",
							children: "Clear Search Query"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				activeView === "grouped" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: activeCategory === "all" && !searchQuery.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold text-text-primary tracking-tight",
							children: "Repository Structure Overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Comprehensive evidence distribution across 5 corporate domains. Select any section to inspect documentary files."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-mono tabular-nums text-text-secondary bg-surface-alt px-2.5 py-1 rounded-lg border border-border-c/60",
							children: [
								documents.length,
								" Total ",
								documents.length === 1 ? "Document" : "Documents"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: overviewStructure.map((row) => {
							const DomainIcon = row.domain.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border-c/90 bg-surface p-5 shadow-2xs hover:border-brand/40 transition-colors flex flex-col justify-between space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 border-b border-border-c/60 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 text-brand",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainIcon, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleCategoryChange(row.domain.id),
												className: "text-sm font-bold text-text-primary hover:text-brand text-left cursor-pointer truncate flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.domain.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 opacity-60" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-text-tertiary line-clamp-1",
												children: row.domain.description
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-mono tabular-nums font-semibold text-text-primary bg-surface-alt px-2 py-0.5 rounded-md border border-border-c/60 shrink-0",
										children: [
											row.totalDocuments,
											" ",
											row.totalDocuments === 1 ? "file" : "files"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-3 space-y-1.5",
									children: row.subcategories.map((sub) => {
										const needsAttention = sub.needsAttentionCount > 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleCategoryChange(row.domain.id, sub.category.id),
											className: "w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-surface-alt transition-colors text-left cursor-pointer group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-secondary group-hover:text-text-primary font-medium truncate",
												children: sub.category.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 shrink-0",
												children: [needsAttention && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													title: `${sub.needsAttentionCount} document needs verification`,
													className: "flex items-center gap-1 text-xs text-brand font-medium bg-brand/10 px-2 py-0.5 rounded-full border border-brand/20",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-2.5 w-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Needs review" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-text-tertiary tabular-nums",
													children: sub.documentCount
												})]
											})]
										}, sub.category.id);
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 border-t border-border-c/50 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-text-tertiary",
										children: row.totalDocuments > 0 ? "Vault active & indexed" : "No documents uploaded"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => handleCategoryChange(row.domain.id),
										className: "text-xs h-7 gap-1 text-brand hover:text-brand hover:bg-brand/10 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Domain" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})]
								})]
							}, row.domain.id);
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [
						activeCategory !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-c pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-bold text-text-primary tracking-tight",
								children: ORDERED_TOP_LEVEL_DOMAINS.find((d) => d.id === activeCategory)?.label || "Domain Repository"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary hidden sm:block",
								children: ORDERED_TOP_LEVEL_DOMAINS.find((d) => d.id === activeCategory)?.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [hierarchicalSections[0]?.subcategories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-xs mr-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleToggleAllSubcategories(hierarchicalSections[0].subcategories, true),
											className: "text-xs text-text-tertiary hover:text-brand font-medium px-2 py-0.5 rounded-md hover:bg-surface-alt transition-colors cursor-pointer",
											children: "Expand all"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border-c/80",
											"aria-hidden": "true",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleToggleAllSubcategories(hierarchicalSections[0].subcategories, false),
											className: "text-xs text-text-tertiary hover:text-brand font-medium px-2 py-0.5 rounded-md hover:bg-surface-alt transition-colors cursor-pointer",
											children: "Collapse all"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-mono tabular-nums text-text-secondary bg-surface-alt px-2.5 py-1 rounded-lg border border-border-c/60",
									children: [
										filteredDocuments.length,
										" ",
										filteredDocuments.length === 1 ? "document" : "documents"
									]
								})]
							})]
						}),
						activeCategory === "all" && searchQuery.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-text-secondary border-b border-border-c pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Showing search results for “",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: searchQuery }),
								"” across all repository domains:"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleSearchChange(""),
								className: "text-brand hover:underline font-medium cursor-pointer",
								children: "Reset search"
							})]
						}),
						hierarchicalSections.map(({ domain, subcategories, totalDocuments }) => {
							const DomainIcon = domain.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-4",
								children: [activeCategory === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 border-b border-border-c/70 pb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainIcon, { className: "h-4 w-4 text-brand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-text-primary",
											children: domain.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-mono tabular-nums text-text-tertiary",
											children: [
												"(",
												totalDocuments,
												" ",
												totalDocuments === 1 ? "match" : "matches",
												")"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: subcategories.map(({ category, documents: subDocs, missingRequiredCount, needsAttentionCount }) => {
										const CategoryIcon = category.icon;
										const isExpanded = isSubcategoryExpanded(category.id, subcategories, totalDocuments);
										const sectionRegionId = `sub-content-${category.id}`;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border-c/80 bg-surface/90 shadow-2xs overflow-hidden transition-all duration-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												ref: (el) => {
													if (el) headerButtonRefs.current.set(category.id, el);
													else headerButtonRefs.current.delete(category.id);
												},
												id: `sub-header-${category.id}`,
												"aria-expanded": isExpanded,
												"aria-controls": sectionRegionId,
												onClick: () => toggleSubcategory(category.id, isExpanded),
												className: "w-full flex items-center justify-between p-3.5 text-left cursor-pointer hover:bg-surface-alt/70 active:bg-surface-alt transition-colors select-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5 min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-text-tertiary",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform duration-250 ease-out motion-reduce:transition-none", !isExpanded && "-rotate-90") })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { className: "h-4 w-4 text-brand shrink-0" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold text-text-primary truncate",
															children: category.label
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5 shrink-0",
													children: [needsAttentionCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														title: `${needsAttentionCount} document needs verification review`,
														className: "flex items-center gap-1 text-xs font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full border border-brand/20",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-2.5 w-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Needs review" })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono text-xs text-text-tertiary tabular-nums bg-surface-alt px-2 py-0.5 rounded border border-border-c/60",
														children: [
															subDocs.length,
															" ",
															subDocs.length === 1 ? "file" : "files"
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
												initial: false,
												children: isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													id: sectionRegionId,
													role: "region",
													"aria-labelledby": `sub-header-${category.id}`,
													initial: {
														height: 0,
														opacity: 0
													},
													animate: {
														height: "auto",
														opacity: 1
													},
													exit: {
														height: 0,
														opacity: 0
													},
													transition: {
														duration: .22,
														ease: [
															.16,
															1,
															.3,
															1
														]
													},
													className: "overflow-hidden border-t border-border-c/50 bg-surface",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "p-4 pt-1",
														children: subDocs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2",
															children: subDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentCard, {
																document: doc,
																isDownloading: downloadingDocId === doc.id,
																onPreview: (d) => setPreviewDoc(d),
																onDownload: handleDownload,
																onReplace: (d) => setDocToReplace(d),
																onDelete: (d) => setDocToDelete(d),
																onAddToPackage: handleAddToPackage
															}, doc.id))
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "py-6 px-4 rounded-xl border border-dashed border-border-c/90 bg-surface-alt/30 text-center space-y-2.5 my-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border-c/80 text-brand shadow-2xs",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { className: "h-4 w-4" })
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-0.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																		className: "text-xs font-semibold text-text-primary",
																		children: [
																			"No ",
																			category.label.toLowerCase(),
																			" uploaded yet"
																		]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-xs text-text-tertiary",
																		children: "Upload statutory files to complete evidence coverage for this section."
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																	type: "button",
																	variant: "outline",
																	size: "sm",
																	onClick: () => setIsUploadOpen(true),
																	className: "h-7 text-xs px-3 rounded-lg border-border-c hover:border-brand/40 text-brand hover:bg-brand/5 cursor-pointer gap-1.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Upload ", category.shortLabel || category.label] })]
																})
															]
														})
													})
												}, `sub-motion-${category.id}`)
											})]
										}, category.id);
									})
								})]
							}, domain.id);
						})
					]
				}) }),
				activeView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentRegistrySection, {
					documents: filteredDocuments,
					onPreviewDocument: (d) => setPreviewDoc(d)
				}),
				activeView === "packages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagesSection, { documents })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDocumentModal, {
				open: isUploadOpen,
				onOpenChange: setIsUploadOpen,
				onUpload: handleUploadFile,
				activeUploads: uploadQueue.items,
				onCancelUpload: uploadQueue.cancel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentPreviewModal, {
				document: previewDoc,
				open: Boolean(previewDoc),
				onOpenChange: (open) => !open && setPreviewDoc(null),
				onReplaceDocument: (doc) => {
					setPreviewDoc(null);
					setDocToReplace(doc);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReplaceDocumentDialog, {
				targetDocument: docToReplace,
				open: Boolean(docToReplace),
				onOpenChange: (open) => !open && setDocToReplace(null),
				onConfirmReplace: handleReplaceSubmit,
				isReplacing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePackageDialog, {
				documents,
				initialSelectedDocIds: targetDocForPackage ? [targetDocForPackage.id] : [],
				open: isPackageDialogOpen,
				onOpenChange: setIsPackageDialogOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(docToDelete),
				onOpenChange: (open) => !open && setDocToDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "rounded-2xl border-border-c bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
						className: "text-base font-bold text-text-primary",
						children: "Archive Document from Vault"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
						className: "text-xs text-text-secondary leading-relaxed",
						children: [
							"Are you sure you want to archive “",
							docToDelete?.original_name,
							"”? This will unlink the file from active vault indexing and packages while maintaining an institutional audit log of corporate records."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
						className: "text-xs rounded-xl border-border-c cursor-pointer",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: handleDeleteConfirm,
						className: "text-xs rounded-xl bg-destructive hover:bg-destructive/90 text-white cursor-pointer font-semibold",
						children: "Archive Document"
					})] })]
				})
			})
		]
	});
}
var SplitComponent = DocumentsPage;
//#endregion
export { SplitComponent as component };

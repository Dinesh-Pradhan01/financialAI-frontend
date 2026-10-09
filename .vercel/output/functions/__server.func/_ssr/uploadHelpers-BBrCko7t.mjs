//#region node_modules/.nitro/vite/services/ssr/assets/uploadHelpers-BBrCko7t.js
var ACCEPTED_FILE_EXTENSIONS = [".pdf"];
var ACCEPTED_FILE_FORMATS_STRING = ".pdf";
var UPLOAD_CONSTRAINTS_LABEL = "PDF only • Max 10MB";
/**
* Validates a candidate file against size and format constraints.
* Only PDF files are accepted — quality score verification requires
* text extraction which only works on PDF documents.
*/
function validateFile(file) {
	if (file.size > 10485760) return {
		valid: false,
		error: `File "${file.name}" exceeds the 10MB size limit.`
	};
	const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
	if (!ACCEPTED_FILE_EXTENSIONS.includes(ext)) return {
		valid: false,
		error: `Invalid file type for "${file.name}". Only PDF files are accepted for document verification.`
	};
	return { valid: true };
}
/**
* Constructs multipart FormData for backend document upload mutation.
* If documentType and documentCategory are omitted, backend auto-classifies the upload.
*/
function buildUploadFormData(file, options) {
	const formData = new FormData();
	formData.append("file", file);
	if (options?.documentType) formData.append("document_type", options.documentType);
	if (options?.documentCategory) formData.append("document_category", options.documentCategory);
	return formData;
}
//#endregion
export { validateFile as a, buildUploadFormData as i, ACCEPTED_FILE_FORMATS_STRING as n, UPLOAD_CONSTRAINTS_LABEL as r, ACCEPTED_FILE_EXTENSIONS as t };

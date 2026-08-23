export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
export const ACCEPTED_FILE_FORMATS_STRING = ".pdf,.png,.jpg,.jpeg";
export const UPLOAD_CONSTRAINTS_LABEL = "PDF, PNG, JPG, JPEG • Max 10MB";

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a candidate file against size and format constraints.
 */
export function validateFile(file: File): FileValidationResult {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds the 10MB size limit.`,
    };
  }

  const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!ACCEPTED_FILE_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Invalid file type for "${file.name}". Allowed formats: PDF, PNG, JPG, JPEG.`,
    };
  }

  return { valid: true };
}

/**
 * Derives a clean human-readable default document title from a filename.
 */
export function suggestLabelFromFilename(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
}

/**
 * Constructs multipart FormData for backend document upload mutation.
 */
export function buildUploadFormData(
  file: File,
  options: { documentType: string; documentCategory: string }
): FormData {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("document_type", options.documentType);
  formData.append("document_category", options.documentCategory);
  return formData;
}

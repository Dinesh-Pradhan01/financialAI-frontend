import { toast } from "sonner";

/**
 * Copies a single field in the required format: "Label: value"
 */
export async function copySingleField(label: string, value: string | number | null | undefined): Promise<boolean> {
  if (value === null || value === undefined || value === "") {
    toast.error(`No ${label.toLowerCase()} available to copy`);
    return false;
  }
  const text = `${label}: ${String(value).trim()}`;
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`Copied ${label}`);
    return true;
  } catch (err) {
    toast.error("Failed to copy to clipboard");
    return false;
  }
}

export interface FieldItem {
  label: string;
  value: string | number | null | undefined;
}

/**
 * Copies an entire block with a header line plus every visible field, one per line:
 * [Company Name] — [Block Title]
 * Label: value
 * Label: value
 */
export async function copyBlock(
  companyName: string | null | undefined,
  blockTitle: string,
  fields: FieldItem[]
): Promise<boolean> {
  const visibleFields = fields.filter(
    (f) => f.value !== null && f.value !== undefined && String(f.value).trim() !== "" && String(f.value).trim() !== "—"
  );

  if (visibleFields.length === 0) {
    toast.error(`No details available to copy for ${blockTitle}`);
    return false;
  }

  const header = `${(companyName || "Company").trim()} — ${blockTitle.trim()}`;
  const lines = [header, ...visibleFields.map((f) => `${f.label}: ${String(f.value).trim()}`)];
  const fullText = lines.join("\n");

  try {
    await navigator.clipboard.writeText(fullText);
    toast.success(`Copied ${blockTitle}`);
    return true;
  } catch (err) {
    toast.error("Failed to copy to clipboard");
    return false;
  }
}

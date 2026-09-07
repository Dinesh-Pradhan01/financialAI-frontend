export function validateDynamicField(fieldConfig: any, value: string): string | null {
  const isEmpty = !value || String(value).trim() === "";

  if (fieldConfig.required && isEmpty) {
    return "Required";
  }

  if (isEmpty) return null;

  if (fieldConfig.type === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email";
  }

  if (fieldConfig.regex) {
    try {
      const re = new RegExp(fieldConfig.regex);
      if (!re.test(value)) return "Invalid format";
    } catch {
      // Ignore invalid regex in schema
    }
  }

  if (fieldConfig.type === "number") {
    const num = Number(value);
    if (isNaN(num)) return "Must be a number";
    if (fieldConfig.min !== undefined && num < fieldConfig.min) return `Min ${fieldConfig.min}`;
    if (fieldConfig.max !== undefined && num > fieldConfig.max) return `Max ${fieldConfig.max}`;
  }

  if (fieldConfig.min_length !== undefined && value.length < fieldConfig.min_length) {
    return `Min length ${fieldConfig.min_length}`;
  }

  if (fieldConfig.custom_rule === "not_future") {
    const d = new Date(value);
    if (!isNaN(d.getTime()) && d > new Date()) return "Cannot be in the future";
  }

  return null;
}

export function formatHeaderName(name: string): string {
  const spaced = name
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.toUpperCase();
}

export function getVisibleFields(schemaDef: any, records: any[] = []): any[] {
  if (schemaDef?.fields && Array.isArray(schemaDef.fields) && schemaDef.fields.length > 0) {
    return schemaDef.fields.filter((field: any) => {
      if (field.required) return true;
      return records.some((rec) => {
        const camelCaseName = field.name.replace(/_([a-z])/g, (_: string, g: string) => g.toUpperCase());
        const snakeCaseName = field.name.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
        const val = rec[field.name] ?? rec[camelCaseName] ?? rec[snakeCaseName];
        return val != null && String(val).trim() !== "";
      });
    });
  }

  // Fallback: If no schemaDef is provided (e.g. historical upload preview),
  // infer visible columns from the records themselves
  if (records && records.length > 0) {
    const keysSet = new Set<string>();
    const ignoredKeys = new Set([
      "rowId",
      "row_id",
      "_id",
      "id",
      "__v",
      "createdAt",
      "updatedAt",
      "created_at",
      "updated_at",
      "upload_id",
      "uploadId",
      "company_id",
      "companyId",
    ]);

    for (const rec of records) {
      if (rec && typeof rec === "object") {
        for (const key of Object.keys(rec)) {
          if (!ignoredKeys.has(key) && rec[key] !== undefined && rec[key] !== null) {
            keysSet.add(key);
          }
        }
      }
    }

    return Array.from(keysSet).map((key) => ({
      name: key,
      type: typeof records[0]?.[key] === "number" ? "number" : "string",
      required: false,
    }));
  }

  return [];
}

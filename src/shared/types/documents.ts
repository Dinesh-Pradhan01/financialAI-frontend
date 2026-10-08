export interface DocumentInfo {
  id: string;
  person_id?: string;
  filename: string;
  original_name: string;
  hash_md5: string;
  file_size_bytes: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

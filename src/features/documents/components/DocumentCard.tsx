import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Eye,
  Download,
  MoreVertical,
  RefreshCw,
  PackagePlus,
  Trash2,
  Info,
  Loader2,
} from "lucide-react";
import type { CompanyDocument } from "@/shared/types/api";
import { formatDocumentType, formatFileSize, formatDocumentDate } from "../lib/presentationModel";
import { getCanonicalCategory, getDomainForCategory } from "../lib/categoryNormalizer";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

export interface DocumentCardProps {
  document: CompanyDocument;
  onPreview: (doc: CompanyDocument) => void;
  onDownload: (doc: CompanyDocument) => void;
  onReplace: (doc: CompanyDocument) => void;
  onDelete: (doc: CompanyDocument) => void;
  onAddToPackage?: (doc: CompanyDocument) => void;
  isDownloading?: boolean;
  className?: string;
}

function getFileFormatIcon(mimeType?: string | null, filename?: string) {
  const mime = (mimeType || "").toLowerCase();
  const ext = (filename || "").split(".").pop()?.toLowerCase();

  if (mime.includes("pdf") || ext === "pdf") {
    return <FileText className="h-4 w-4 text-brand" />;
  }
  if (
    mime.includes("sheet") ||
    mime.includes("excel") ||
    mime.includes("csv") ||
    ext === "xlsx" ||
    ext === "xls" ||
    ext === "csv"
  ) {
    return <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
  }
  if (
    mime.includes("image") ||
    ext === "png" ||
    ext === "jpg" ||
    ext === "jpeg" ||
    ext === "webp"
  ) {
    return <FileImage className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
  }
  return <File className="h-4 w-4 text-text-secondary" />;
}

export function DocumentCard({
  document: doc,
  onPreview,
  onDownload,
  onReplace,
  onDelete,
  onAddToPackage,
  isDownloading = false,
  className,
}: DocumentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const formattedType = formatDocumentType(doc.document_type);
  const categoryConfig = getCanonicalCategory(doc.document_category, doc.document_type);
  const domainConfig = getDomainForCategory(categoryConfig.id);
  const formattedSize = formatFileSize(doc.file_size_bytes);
  const formattedDate = formatDocumentDate(doc.created_at);
  const CategoryIcon = categoryConfig.icon;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border-c/90 bg-surface p-4.5 shadow-2xs transition-all duration-200 hover:border-brand/40 hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.995] motion-reduce:transform-none motion-reduce:transition-none min-h-[170px]",
        className,
      )}
    >
      {/* 1. Header: Format Icon + Document Type + Quality Pill */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt border border-border-c/60 shadow-2xs">
              {getFileFormatIcon(doc.mime_type, doc.original_name)}
            </div>
            <div className="min-w-0 flex-1">
              <span
                className="block truncate text-xs font-semibold text-text-primary tracking-tight"
                title={formattedType}
              >
                {formattedType}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
                <CategoryIcon className="h-3 w-3 shrink-0 text-text-tertiary" />
                <span
                  className="truncate"
                  title={`${domainConfig.label} › ${categoryConfig.label}`}
                >
                  {domainConfig.id === "miscellaneous"
                    ? categoryConfig.shortLabel
                    : `${domainConfig.shortLabel} › ${categoryConfig.shortLabel}`}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <DocumentQualityBadge document={doc} showTooltip={true} />
          </div>
        </div>

        {/* 2. Body: Original File Title + Verification Notes */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => onPreview(doc)}
            className="text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded"
          >
            <h3
              className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors line-clamp-1 break-all"
              title={doc.original_name}
            >
              {doc.original_name}
            </h3>
          </button>

          {doc.verification_notes && (
            <p
              className="text-xs text-text-tertiary line-clamp-1 mt-1 leading-relaxed"
              title={doc.verification_notes}
            >
              {doc.verification_notes}
            </p>
          )}
        </div>
      </div>

      {/* 3. Footer: File Metadata + Direct Action Triggers */}
      <div className="mt-3.5 flex items-center justify-between border-t border-border-c/50 pt-3">
        <div className="flex items-center gap-1.5 text-xs font-mono tabular-nums text-text-secondary flex-wrap">
          <span>{formattedSize}</span>
          <span className="text-text-tertiary">•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onPreview(doc)}
            title="Quick preview"
            className="h-7 w-7 p-0 rounded-lg text-text-secondary hover:text-brand hover:bg-brand/10 cursor-pointer transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="sr-only">Quick preview</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDownloading}
            onClick={() => onDownload(doc)}
            title="Download document"
            className="h-7 w-7 p-0 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer transition-colors"
          >
            {isDownloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Download</span>
          </Button>

          {/* Context Overflow Menu */}
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="More actions"
                className="h-7 w-7 p-0 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-alt cursor-pointer"
              >
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 text-xs">
              <DropdownMenuItem onClick={() => onPreview(doc)} className="cursor-pointer gap-2">
                <Eye className="h-3.5 w-3.5 text-text-tertiary" />
                <span>Quick Preview</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload(doc)} className="cursor-pointer gap-2">
                <Download className="h-3.5 w-3.5 text-text-tertiary" />
                <span>Download File</span>
              </DropdownMenuItem>

              {onAddToPackage && (
                <DropdownMenuItem
                  onClick={() => onAddToPackage(doc)}
                  className="cursor-pointer gap-2"
                >
                  <PackagePlus className="h-3.5 w-3.5 text-text-tertiary" />
                  <span>Add to Package</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={() => onReplace(doc)} className="cursor-pointer gap-2">
                <RefreshCw className="h-3.5 w-3.5 text-text-tertiary" />
                <span>Re-Upload</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => onDelete(doc)}
                className="cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Archive Document</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

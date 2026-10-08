import React from "react";
import {
  Search,
  Download,
  Pencil,
  Check,
  X,
  Trash2,
  RotateCw,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

interface DirectoryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  isEditMode: boolean;
  onToggleEdit: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
  dirtyCount?: number;
  onExport: () => void;
  isExporting?: boolean;
  selectedCount?: number;
  onBulkDelete?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  totalRecords?: number;
}

export function DirectoryToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search records...",
  filters,
  isEditMode,
  onToggleEdit,
  onSave,
  onCancel,
  isSaving = false,
  dirtyCount = 0,
  onExport,
  isExporting = false,
  selectedCount = 0,
  onBulkDelete,
  onRefresh,
  isRefreshing = false,
  totalRecords,
}: DirectoryToolbarProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Bulk action banner when items are selected */}
      {selectedCount > 0 && !isEditMode && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
              {selectedCount}
            </span>
            <span className="text-xs font-semibold text-primary">
              {selectedCount === 1 ? "1 record selected" : `${selectedCount} records selected`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onBulkDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onBulkDelete}
                className="h-8 gap-1.5 text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Selected
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Search + Filters */}
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 h-9 text-xs bg-surface border-border/80 focus-visible:ring-primary/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {filters && (
            <div className="flex items-center flex-wrap gap-2">
              {filters}
            </div>
          )}

          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-9 w-9 p-0 text-text-secondary hover:text-foreground shrink-0 border-border/80"
              title="Refresh"
            >
              <RotateCw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")} />
            </Button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Edit Mode Buttons */}
          {isEditMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isSaving}
                className="h-9 gap-1.5 text-xs font-semibold border-border/80"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                disabled={isSaving || dirtyCount === 0}
                className="h-9 gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
              >
                <Check className="h-3.5 w-3.5" />
                {isSaving ? "Saving..." : dirtyCount > 0 ? `Save Changes (${dirtyCount})` : "Save Changes"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleEdit}
                className="h-9 gap-1.5 text-xs font-semibold text-text-secondary hover:text-foreground border-border/80"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                disabled={isExporting || totalRecords === 0}
                className="h-9 gap-1.5 text-xs font-semibold text-text-secondary hover:text-foreground border-border/80"
              >
                <Download className="h-3.5 w-3.5" />
                {isExporting ? "Exporting..." : "Export to Excel"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { formatINR } from "@/shared/lib/format";
import {
  useExtractedStatement,
  useUpdateTransaction,
} from "../hooks/useTransactions";
import type {
  Transaction,
  TransactionClassification,
} from "../types/transaction";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Landmark,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  Tag,
  Edit2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";

interface StatementDetailProps {
  documentId: string | null;
  onClose: () => void;
}

const COMMON_CATEGORIES = [
  "Software & SaaS",
  "Airlines & Travel",
  "Fuel & Transport",
  "Payroll & Salaries",
  "Utilities & Rent",
  "Marketing & Ads",
  "Professional Fees",
  "Office Supplies",
  "Food & Dining",
  "General Expenses",
];

export function StatementDetail({ documentId, onClose }: StatementDetailProps) {
  const { data, isLoading, isError, error } = useExtractedStatement(documentId);
  const updateMutation = useUpdateTransaction(documentId ?? undefined);

  // Local state for tracking editing row
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<string>("");
  const [editClassification, setEditClassification] = useState<string>("expense");

  const startEdit = (tx: Transaction) => {
    setEditingTxId(tx.id);
    setEditCategory(tx.category || "General Expenses");
    setEditClassification(tx.classification || "expense");
  };

  const handleSave = async (txId: string) => {
    try {
      await updateMutation.mutateAsync({
        transactionId: txId,
        data: {
          category: editCategory.trim() || "General Expenses",
          classification: editClassification,
        },
      });
      toast.success("Transaction updated successfully");
      setEditingTxId(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update transaction",
      );
    }
  };

  const doc = data?.document;
  const account = data?.account;
  const stmtData = data?.bank_statement_data;
  const transactions = data?.transactions ?? [];

  return (
    <Dialog open={Boolean(documentId)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-background border border-border">
        {/* Header Section */}
        <DialogHeader className="p-6 border-b border-border bg-surface/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-6">
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="font-display text-lg font-bold text-foreground">
                  {doc?.original_name || doc?.filename || "Statement Ledger"}
                </DialogTitle>
                {doc?.status === "COMPLETED" && (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-success/10 text-success px-2 py-0.5 text-[0.65rem] font-semibold border border-success/20">
                    <CheckCircle2 className="h-3 w-3" /> Extracted
                  </span>
                )}
                {doc?.status === "PROCESSING" && (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-brand/10 text-brand px-2 py-0.5 text-[0.65rem] font-semibold border border-brand/20">
                    <Loader2 className="h-3 w-3 animate-spin" /> Processing
                  </span>
                )}
                {doc?.status === "FAILED" && (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-destructive/10 text-destructive px-2 py-0.5 text-[0.65rem] font-semibold border border-destructive/20">
                    <AlertTriangle className="h-3 w-3" /> Failed
                  </span>
                )}
              </div>
              <DialogDescription className="text-xs text-text-secondary mt-1">
                Parsed document metadata and extracted transactional ledger.
              </DialogDescription>
            </div>

            {/* Balances summary */}
            {stmtData && (
              <div className="flex items-center gap-4 text-right bg-surface px-3 py-1.5 rounded-xl border border-border/60">
                <div>
                  <p className="text-[0.65rem] text-text-secondary">Opening Bal</p>
                  <p className="font-num text-xs font-bold text-foreground">
                    {formatINR(stmtData.opening_balance)}
                  </p>
                </div>
                <div className="h-6 w-px bg-border/80" />
                <div>
                  <p className="text-[0.65rem] text-text-secondary">Closing Bal</p>
                  <p className="font-num text-xs font-bold text-foreground">
                    {formatINR(stmtData.closing_balance)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Account Metadata strip */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border/40 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Landmark className="h-3.5 w-3.5 text-brand" />
              {account?.bank_name || "Unknown Bank"} (••••
              {account?.account_number ? account.account_number.slice(-4) : "••••"})
            </span>
            <span>•</span>
            <span className="capitalize">{account?.account_type || "Current Account"}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {stmtData?.statement_period || stmtData?.statement_month || "Full Period"}
            </span>
            <span>•</span>
            <span className="font-semibold text-foreground font-num">
              {transactions.length} Transactions
            </span>
          </div>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border/60 rounded-xl">
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="p-8 text-center border border-destructive/20 rounded-xl bg-destructive/5">
              <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">
                Failed to load extracted statement
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {error instanceof Error ? error.message : "Document details could not be retrieved."}
              </p>
            </div>
          )}

          {!isLoading && !isError && transactions.length === 0 && (
            <div className="p-12 text-center border border-dashed border-border rounded-xl">
              <p className="text-sm font-semibold text-foreground">
                No extracted transactions found
              </p>
              <p className="text-xs text-text-secondary mt-1">
                This document may still be processing or contained no parseable rows.
              </p>
            </div>
          )}

          {!isLoading && !isError && transactions.length > 0 && (
            <div className="border border-border rounded-xl overflow-x-auto shadow-xs">
              <table className="w-full min-w-[680px] text-left text-xs border-collapse" aria-label="Extracted transactions ledger">
                <thead>
                  <tr className="bg-surface-alt/70 border-b border-border text-text-secondary uppercase text-[0.65rem] tracking-wider font-semibold">
                    <th scope="col" className="py-2.5 px-3">Date</th>
                    <th scope="col" className="py-2.5 px-3">Narration &amp; Ref</th>
                    <th scope="col" className="py-2.5 px-3">Category</th>
                    <th scope="col" className="py-2.5 px-3">Class</th>
                    <th scope="col" className="py-2.5 px-3 text-right">Debit</th>
                    <th scope="col" className="py-2.5 px-3 text-right">Credit</th>
                    <th scope="col" className="py-2.5 px-3 text-right">Balance</th>
                    <th scope="col" className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-surface">
                  {transactions.map((tx) => {
                    const isEditing = editingTxId === tx.id;
                    const isDebit = Number(tx.debit_amount) > 0;

                    return (
                      <tr
                        key={tx.id}
                        className={cn(
                          "hover:bg-surface-alt/40 transition-colors",
                          isEditing && "bg-brand/5",
                        )}
                      >
                        {/* Date */}
                        <td className="py-3 px-3 whitespace-nowrap font-num text-text-secondary">
                          {tx.transaction_date}
                        </td>

                        {/* Narration */}
                        <td className="py-3 px-3 max-w-[200px]">
                          <p className="font-medium text-foreground truncate" title={tx.narration}>
                            {tx.narration}
                          </p>
                          <p className="text-[0.65rem] text-text-secondary truncate mt-0.5">
                            {tx.reference_number || tx.utr_upi_ref || tx.cheque_number || "—"}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              list={`cat-options-${tx.id}`}
                              aria-label="Edit category for transaction"
                              className="h-7 w-32 rounded border border-border px-2 text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                            />
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-pill bg-surface-alt border border-border px-2 py-0.5 text-[0.65rem] font-medium text-foreground">
                              <Tag className="h-2.5 w-2.5 text-text-secondary" />
                              {tx.category || "General"}
                            </span>
                          )}
                          <datalist id={`cat-options-${tx.id}`}>
                            {COMMON_CATEGORIES.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                        </td>

                        {/* Classification */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={editClassification}
                              onChange={(e) => setEditClassification(e.target.value)}
                              aria-label="Edit classification for transaction"
                              className="h-7 rounded border border-border px-1.5 text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                            >
                              <option value="expense">expense</option>
                              <option value="income">income</option>
                              <option value="transfer">transfer</option>
                            </select>
                          ) : (
                            <span
                              className={cn(
                                "capitalize text-[0.65rem] font-semibold px-2 py-0.5 rounded-pill",
                                tx.classification === "expense"
                                  ? "text-danger bg-danger/10"
                                  : tx.classification === "income"
                                    ? "text-success bg-success/10"
                                    : "text-brand bg-brand/10",
                              )}
                            >
                              {tx.classification || "expense"}
                            </span>
                          )}
                        </td>

                        {/* Debit */}
                        <td className="py-3 px-3 whitespace-nowrap text-right font-num font-semibold text-danger">
                          {isDebit ? formatINR(tx.debit_amount) : "—"}
                        </td>

                        {/* Credit */}
                        <td className="py-3 px-3 whitespace-nowrap text-right font-num font-semibold text-success">
                          {Number(tx.credit_amount) > 0 ? formatINR(tx.credit_amount) : "—"}
                        </td>

                        {/* Running Balance */}
                        <td className="py-3 px-3 whitespace-nowrap text-right font-num text-text-secondary">
                          {formatINR(tx.running_balance)}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 whitespace-nowrap text-center">
                          {isEditing ? (
                            <button
                              onClick={() => handleSave(tx.id)}
                              disabled={updateMutation.isPending}
                              className="relative inline-flex items-center justify-center h-8 w-8 sm:h-7 sm:w-7 rounded-lg bg-brand text-white hover:opacity-90 transition cursor-pointer before:absolute before:-inset-1.5 before:content-['']"
                              title="Save changes"
                              aria-label="Save transaction changes"
                            >
                              {updateMutation.isPending ? (
                                <Loader2 className="h-4 w-4 sm:h-3.5 sm:w-3.5 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => startEdit(tx)}
                              className="relative inline-flex items-center justify-center h-8 w-8 sm:h-7 sm:w-7 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-alt transition cursor-pointer before:absolute before:-inset-1.5 before:content-['']"
                              title="Edit category/classification"
                              aria-label={`Edit transaction from ${tx.transaction_date}`}
                            >
                              <Edit2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

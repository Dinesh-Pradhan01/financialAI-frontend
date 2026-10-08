import { Star } from "lucide-react";
import { relationshipHealth, walletShare } from "@/shared/data/rohan";
import { formatINR } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < count ? "fill-severity-moderate text-severity-moderate" : "text-border",
          )}
        />
      ))}
    </span>
  );
}

/** Relationship map + wallet share, the SBI-facing story. */
export function RelationshipHealth({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="card-spot divide-y divide-border">
        {relationshipHealth.map((b) => (
          <div key={b.bank} className="flex items-center gap-3 px-4 py-3">
            <span className={cn("h-3 w-3 shrink-0 rounded-full", b.color)} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{b.bank}</p>
                <Stars count={b.stars} />
              </div>
              <p className="text-xs text-text-secondary">
                {b.role} · {b.tags.join(", ")}
              </p>
            </div>
            {b.external && (
              <span className="rounded-pill bg-surface-alt px-2 py-0.5 text-[10px] font-medium text-text-secondary">
                External
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="card-spot p-4">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-brand">SBI {walletShare.sbi}%</span>
          <span className="text-text-secondary">External {walletShare.external}%</span>
        </div>
        <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-surface-alt">
          <div className="h-full bg-brand" style={{ width: `${walletShare.sbi}%` }} />
        </div>
        <p className="mt-3 text-xs text-text-secondary">
          Potential migration to SBI:{" "}
          <span className="font-num font-semibold text-text-primary">
            {formatINR(walletShare.potentialMigration, { compact: true })}
          </span>
        </p>
      </div>
    </div>
  );
}

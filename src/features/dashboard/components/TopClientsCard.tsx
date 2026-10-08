import React from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatINR } from "@/shared/lib/format";
import { Users, Building, Plus } from "lucide-react";
import { useTopClients, type ClientItem } from "../hooks/useCompanyAPI";

export const TopClientsCard: React.FC = () => {
  const { data: clients = [], isLoading, isError } = useTopClients();

  // Compute total revenue and revenue share across top 5 clients
  const sortedClients = [...clients]
    .sort((a, b) => (Number(b.revenue) || 0) - (Number(a.revenue) || 0))
    .slice(0, 5);

  const totalRevenue = sortedClients.reduce(
    (sum, client) => sum + (Number(client.revenue) || 0),
    0
  );

  return (
    <Card className="h-full border border-border/80 shadow-xs bg-surface flex flex-col justify-between p-6 sm:p-7 group hover:border-border transition-colors">
      <div className="space-y-4">
        {/* Header with Title and Action Trigger */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground font-display">
                Top Clients
              </CardTitle>
              <p className="text-xs text-text-tertiary mt-0.5 font-medium">
                Based on client records provided by the company
              </p>
            </div>
          </div>
          <Link
            to="/cfo/clients"
            className="h-8 px-2.5 text-xs font-medium text-primary hover:text-primary/80 border border-primary/20 hover:border-primary/40 bg-primary/5 rounded-lg flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Manage and upload client records"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manage Clients</span>
          </Link>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="space-y-3 pt-2">
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        ) : sortedClients.length > 0 ? (
          /* Data-table register with numeric alignment and share calculation */
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  <th className="pb-2 pl-1 font-medium">Client</th>
                  <th className="pb-2 text-right font-medium">Revenue</th>
                  <th className="pb-2 text-right pr-1 font-medium">% of Top 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                {sortedClients.map((client: ClientItem, idx: number) => {
                  const revenueVal = Number(client.revenue) || 0;
                  const sharePct = totalRevenue > 0 ? (revenueVal / totalRevenue) * 100 : 0;

                  return (
                    <tr key={client.id || idx} className="hover:bg-surface-alt/40 transition-colors">
                      <td className="py-2.5 pl-1">
                        <div className="font-semibold text-foreground truncate max-w-[160px] sm:max-w-[200px]" title={client.name}>
                          {client.name}
                        </div>
                        {client.category && (
                          <div className="text-[10px] text-text-tertiary truncate">
                            {client.category}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 text-right font-num tabular-nums font-semibold text-foreground">
                        {formatINR(revenueVal, { compact: true })}
                      </td>
                      <td className="py-2.5 text-right pr-1 font-num tabular-nums text-text-secondary">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>{sharePct.toFixed(1)}%</span>
                          <div className="w-10 h-1.5 rounded-full bg-surface-alt overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${Math.min(sharePct, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Calm Empty State */
          <div className="py-9 px-4 rounded-xl bg-surface-alt/30 border border-border/40 flex flex-col items-center justify-center text-center space-y-2.5 my-auto">
            <Building className="w-7 h-7 text-text-tertiary/50" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground/80">No client revenue recorded yet</p>
              <p className="text-[11px] text-text-tertiary max-w-xs leading-relaxed">
                Client accounts and revenue contributions will populate here when recorded.
              </p>
            </div>
            <Link
              to="/cfo/clients"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-0.5"
            >
              <span>+ Record First Client</span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer Meta */}
      <div className="pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary">
        <span>Relative share among top accounts</span>
        {sortedClients.length > 0 ? (
          <span className="font-mono text-[10px] text-text-secondary">
            {formatINR(totalRevenue, { compact: true })} combined
          </span>
        ) : (
          <span className="font-mono text-[10px]">Awaiting records</span>
        )}
      </div>
    </Card>
  );
};

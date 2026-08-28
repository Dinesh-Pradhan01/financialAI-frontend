import React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { UploadCloud, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Link } from "@tanstack/react-router";

export const UploadTransactionsCard = () => {
  return (
    <Card className="border-dashed border-2 border-primary/25 bg-gradient-to-r from-primary/5 via-card to-primary/5 hover:border-primary/40 transition-colors shadow-sm group">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-6">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-primary">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-foreground">Upload Transactions</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Upload bank statements (PDF, Excel, CSV) to enrich your company's real-time financial intelligence.
            </CardDescription>
          </div>
        </div>
        <Link to="/upload" className="shrink-0 w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-brand hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-brand px-5 py-2.5 rounded-xl text-sm" variant="default">
            Start Upload <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { UploadCloud, ArrowRight } from 'lucide-react';
import { Button } from "@/shared/components/ui/button";
import { Link } from '@tanstack/react-router';

export const UploadTransactionsCard = () => {
  return (
    <Card className="h-full border-dashed border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors shadow-none flex flex-col justify-between group cursor-pointer">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Upload Transactions</CardTitle>
        <CardDescription>
          Upload bank statements (PDF, Excel, CSV) to enrich your company's financial intelligence.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link to="/upload" className="w-full block">
          <Button className="w-full group-hover:bg-primary/90" variant="default">
            Start Upload <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface LoanDetailsCardProps {
  loanAmount: number;
  purpose: string;
  applicationDate?: string;
  lastUpdated: string;
}

export function LoanDetailsCard({
  loanAmount,
  purpose,
  applicationDate,
  lastUpdated
}: LoanDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Loan Amount</dt>
            <dd className="text-base font-medium">€{loanAmount.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Purpose</dt>
            <dd className="text-base">{purpose}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Application Date</dt>
            <dd className="text-base">{applicationDate ? formatDate(applicationDate) : "N/A"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
            <dd className="text-base">{formatDate(lastUpdated)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

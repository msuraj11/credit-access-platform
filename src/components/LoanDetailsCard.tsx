
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Case } from '@/data/loanData';

interface LoanDetailsCardProps {
  loanAmount: number;
  purpose: string;
  applicationDate?: string;
  lastUpdated: string;
  caseType: Case
}

export function LoanDetailsCard({
  loanAmount,
  purpose,
  applicationDate,
  lastUpdated,
  caseType
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
            <dd className="text-base font-medium">{loanAmount.toLocaleString('de-DE')} €</dd>
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
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Case Type</dt>
            <dd className="text-base">{caseType}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

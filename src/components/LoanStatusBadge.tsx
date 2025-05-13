
import React from 'react';
import { LoanStatus } from "@/data/loanData";

interface LoanStatusBadgeProps {
  status: LoanStatus;
  pixels: string;
}

export function LoanStatusBadge({ status, pixels }: LoanStatusBadgeProps) {
  return (
    <span className={`${pixels} rounded-full text-sm font-medium ${
      status === 'Initiation' ? 'bg-blue-100 text-blue-800' :
      status === 'Review' ? 'bg-purple-100 text-purple-800' :
      'bg-green-100 text-green-800'
    }`}>
      {status}
    </span>
  );
}

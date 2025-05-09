
import React from 'react';
import { LoanStatus } from "@/data/loanData";

interface LoanStatusBadgeProps {
  status: LoanStatus;
}

export function LoanStatusBadge({ status }: LoanStatusBadgeProps) {
  return (
    <span className={`px-3.5 py-1.5 rounded-full text-sm font-medium ${
      status === 'Initiation' ? 'bg-blue-100 text-blue-800' :
      status === 'Review' ? 'bg-purple-100 text-purple-800' :
      status === 'Payment' ? 'bg-green-100 text-green-800' :
      status === 'Completion' ? 'bg-gray-100 text-gray-800' :
      'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );
}


import React from 'react';
import { LoanStatus } from "@/components/LoanProcessList";

interface LoanStatusBadgeProps {
  status: LoanStatus;
}

export function LoanStatusBadge({ status }: LoanStatusBadgeProps) {
  return (
    <span className={`px-3.5 py-1.5 rounded-full text-sm font-medium ${
      status === 'Initiation' ? 'bg-blue-100 text-blue-800' :
      status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
      status === 'Review' ? 'bg-purple-100 text-purple-800' :
      status === 'Approval' ? 'bg-orange-100 text-orange-800' :
      status === 'Payment' ? 'bg-green-100 text-green-800' :
      'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );
}

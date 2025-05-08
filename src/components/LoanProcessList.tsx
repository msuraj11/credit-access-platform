
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

// Types
export type LoanStatus = 'Initiation' | 'Processing' | 'Review' | 'Approval' | 'Payment' | 'Completion';

export type LoanProcess = {
  id: string;
  customerName: string;
  loanAmount: number;
  purpose: string;
  status: LoanStatus;
  assignedTo: string;
  lastUpdated: string;
};

// Sample data
const loanProcesses: LoanProcess[] = [
  {
    id: "LOAN-2025-001",
    customerName: "John Smith",
    loanAmount: 250000,
    purpose: "Home Purchase",
    status: "Initiation",
    assignedTo: "support",
    lastUpdated: "2025-05-07"
  },
  {
    id: "LOAN-2025-002",
    customerName: "Emily Johnson",
    loanAmount: 50000,
    purpose: "Business Expansion",
    status: "Processing",
    assignedTo: "supervisor",
    lastUpdated: "2025-05-06"
  },
  {
    id: "LOAN-2025-003",
    customerName: "Michael Williams",
    loanAmount: 75000,
    purpose: "Equipment Finance",
    status: "Review",
    assignedTo: "trade-finance",
    lastUpdated: "2025-05-05"
  },
  {
    id: "LOAN-2025-004",
    customerName: "Sarah Brown",
    loanAmount: 25000,
    purpose: "Car Loan",
    status: "Approval",
    assignedTo: "supervisor",
    lastUpdated: "2025-05-04"
  },
  {
    id: "LOAN-2025-005",
    customerName: "David Wilson",
    loanAmount: 500000,
    purpose: "Commercial Property",
    status: "Payment",
    assignedTo: "payment",
    lastUpdated: "2025-05-03"
  },
  {
    id: "LOAN-2025-006",
    customerName: "Lisa Taylor",
    loanAmount: 35000,
    purpose: "Debt Consolidation",
    status: "Processing",
    assignedTo: "support",
    lastUpdated: "2025-05-02"
  },
  {
    id: "LOAN-2025-007",
    customerName: "James Anderson",
    loanAmount: 125000,
    purpose: "Home Renovation",
    status: "Completion",
    assignedTo: "crm",
    lastUpdated: "2025-05-01"
  },
  {
    id: "LOAN-2025-008",
    customerName: "Patricia Martin",
    loanAmount: 80000,
    purpose: "Education Loan",
    status: "Review",
    assignedTo: "trade-finance",
    lastUpdated: "2025-04-30"
  }
];

// Role-based access mapping
const roleAccessMapping: Record<string, (LoanStatus | 'all')[]> = {
  'admin': ['all'],
  'support': ['Initiation', 'Processing'],
  'supervisor': ['Processing', 'Review', 'Approval'],
  'trade-finance': ['Review', 'Approval'],
  'payment': ['Approval', 'Payment'],
  'crm': ['Completion']
};

interface LoanProcessListProps {
  userRole: string | null;
}

export function LoanProcessList({ userRole }: LoanProcessListProps) {
  const navigate = useNavigate();
  
  // Filter loan processes based on user role
  const filteredLoans = loanProcesses.filter(loan => {
    if (!userRole) return false;
    
    const accessibleStatuses = roleAccessMapping[userRole];
    if (!accessibleStatuses) return false;
    
    return accessibleStatuses.includes('all') || accessibleStatuses.includes(loan.status) || loan.assignedTo === userRole;
  });
  
  const handleViewDetails = (loanId: string) => {
    navigate(`/loan/${loanId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loan ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.id}</TableCell>
                <TableCell>{loan.customerName}</TableCell>
                <TableCell>${loan.loanAmount.toLocaleString()}</TableCell>
                <TableCell>{loan.purpose}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    loan.status === 'Initiation' ? 'bg-blue-100 text-blue-800' :
                    loan.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    loan.status === 'Review' ? 'bg-purple-100 text-purple-800' :
                    loan.status === 'Approval' ? 'bg-orange-100 text-orange-800' :
                    loan.status === 'Payment' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {loan.status}
                  </span>
                </TableCell>
                <TableCell>{loan.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(loan.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No loan processes available for your role.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

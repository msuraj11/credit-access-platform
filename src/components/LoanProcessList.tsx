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
import { formatDate, upperFirst } from "@/lib/utils";
import { LoanProcess, roleAccessMapping } from '@/data/loanData';
import { LoanStatusBadge } from './LoanStatusBadge';

interface LoanProcessListProps {
  userRole: string | null;
}

export function LoanProcessList({ userRole }: LoanProcessListProps) {
  const navigate = useNavigate();
  
  // Filter loan processes based on user role
  const localLoanData = JSON.parse(localStorage.getItem('loanData'));
  const filteredLoans = localLoanData?.filter((loan: LoanProcess) => {
    if (!userRole) return false;
    
    const accessibleStatuses = roleAccessMapping[userRole];
    if (!accessibleStatuses) return false;
    
    return accessibleStatuses.includes('all') || loan.assignedTo === userRole;
  });
  
  const handleViewDetails = (loanId: string) => {
    navigate(`/loan/${loanId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Loan Account Number</TableHead>
            <TableHead>Customer/Borrower</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>Case Type</TableHead>
            <TableHead>Support Desk</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan: LoanProcess) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.id}</TableCell>
                <TableCell>{loan.loanAccount}</TableCell>
                <TableCell>{loan.customerName}</TableCell>
                <TableCell>{loan.agentName || '--'}</TableCell>
                <TableCell>{loan.caseType}</TableCell>
                <TableCell>{upperFirst(loan.assignedTo)}</TableCell>
                <TableCell>
                  <LoanStatusBadge pixels='px-2.5 py-0.5' status={loan.status} />
                </TableCell>
                <TableCell>{formatDate(loan.lastUpdated)}</TableCell>
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

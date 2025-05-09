
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { CustomerInfoCard } from "@/components/CustomerInfoCard";
import { LoanDetailsCard } from "@/components/LoanDetailsCard";
import { DocumentsCard } from "@/components/DocumentsCard";
import { LoanTimelineCard } from "@/components/LoanTimelineCard";
import { LoanStatusBadge } from "@/components/LoanStatusBadge";
import { LoanWorkflowCard } from "@/components/LoanWorkflowCard";
import { loanProcessesData, statusToStepMapping, LoanProcess, LoanStatus } from "@/data/loanData";
import { ApprovalDialog } from "@/components/ApprovalDialog";
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";

const LoanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<LoanProcess | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const userRole = sessionStorage.getItem('role') || '';
  
  useEffect(() => {
    // Get loan details - would be an API call in a real app
    const processDetails = loanProcessesData?.find(data => data.id === id);
    if (id && processDetails) {
      setLoan(processDetails);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);
  
  if (!loan) {
    return <div>Loading...</div>;
  }
  
  // Get the current step number for the workflow visual
  const currentStep = statusToStepMapping[loan.status];
  
  // Check if user role is allowed to approve loans
  const canApprove = ['admin', 'supervisor'].includes(userRole);
  
  // Check if loan is in a status that can be approved
  const isApprovableStage = ['Review', 'Payment'].includes(loan.status);
  
  const handleApprove = () => {
    setIsDialogOpen(true);
  };
  
  const handleApprovalSubmit = (comment: string) => {
    // Determine the next status based on current status
    let nextStatus: LoanStatus;
    if (loan.status === 'Review') {
      nextStatus = 'Payment';
    } else if (loan.status === 'Payment') {
      nextStatus = 'Completion';
    } else {
      // Default case - should not reach here
      nextStatus = loan.status;
    }
    
    // Create a new timeline event
    const newTimelineEvent = {
      date: new Date().toISOString().split('T')[0],
      action: `Approved and moved from ${loan.status} to ${nextStatus}`,
      user: `${userRole === 'admin' ? 'Admin' : 'Supervisor'} (${userRole})`,
    };
    
    // Create updated loan object with new status and timeline event
    const updatedLoan = {
      ...loan,
      status: nextStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      details: {
        ...loan.details,
        timeline: [
          {
            date: new Date().toISOString().split('T')[0],
            action: `Comment: ${comment}`,
            user: `${userRole === 'admin' ? 'Admin' : 'Supervisor'} (${userRole})`,
          },
          ...loan.details.timeline,
        ],
      },
    };
    
    // Update our loan data (in a real app, this would be an API call)
    // Find index of current loan in the array
    const loanIndex = loanProcessesData.findIndex(l => l.id === loan.id);
    if (loanIndex !== -1) {
      loanProcessesData[loanIndex] = updatedLoan;
    }
    
    // Update the local state
    setLoan(updatedLoan);
    setIsDialogOpen(false);
    
    // Show success message
    toast({
      title: "Loan approved successfully",
      description: `Loan status updated to ${nextStatus}`,
    });
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-loan-dark">{loan.id}</h1>
            <p className="text-muted-foreground">
              {loan.customerName} - {loan.purpose}
            </p>
          </div>
          <div>
            <LoanStatusBadge status={loan.status} />
          </div>
        </div>
      </div>
      
      {/* Approval button for supervisor and admin */}
      {canApprove && isApprovableStage && (
        <div className="mb-6">
          <Button 
            onClick={handleApprove}
            className="bg-loan-primary hover:bg-loan-primary/90"
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Approve Loan
          </Button>
        </div>
      )}
      
      {/* Loan Process Visual */}
      <LoanWorkflowCard currentStep={currentStep} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <CustomerInfoCard
          customerName={loan.customerName}
          email={loan.details.email}
          phone={loan.details.phone}
          address={loan.details.address}
        />
        
        {/* Loan Details */}
        <LoanDetailsCard
          loanAmount={loan.loanAmount}
          purpose={loan.purpose}
          applicationDate={loan.details.timeline[0]?.date}
          lastUpdated={loan.lastUpdated}
        />
        
        {/* Documents */}
        <DocumentsCard documents={loan.details.documents} />
      </div>
      
      {/* Timeline */}
      <div className="mt-6">
        <LoanTimelineCard timeline={loan.details.timeline} />
      </div>
      
      {/* Approval Dialog */}
      <ApprovalDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleApprovalSubmit}
      />
    </Layout>
  );
};

export default LoanDetail;

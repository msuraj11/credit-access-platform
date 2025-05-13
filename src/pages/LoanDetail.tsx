
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
import { statusToStepMapping, LoanProcess, LoanStatus, Roles } from "@/data/loanData";
import { ApprovalDialog } from "@/components/ApprovalDialog";
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import { PdfDialog } from '@/components/PdfDialog';

const LoanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<LoanProcess | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState({isOpen: false, docName: ''});
  const { toast } = useToast();
  const userRole = sessionStorage.getItem('userRole') || '';
  
  useEffect(() => {
    // Get loan details - would be an API call in a real app
    const localLoanData = JSON.parse(localStorage.getItem('loanData'));
    const processDetails = localLoanData?.find((loan: LoanProcess) => loan.id === id);
    if (id && processDetails) {
      setLoan(processDetails);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);
  
  if (!loan) {
    return <div>Loading...</div>;
  }

  const loanActionTimelines = loan.details.timeline;
  const timelineLength = loanActionTimelines?.length;
  
  // Get the current step number for the workflow visual
  const currentStep = statusToStepMapping[loan.status];
  
  // Check if user role is allowed to approve loans
  const canApprove = ['admin', 'supervisor'].includes(userRole);
  
  // Check if loan is in a status that can be approved
  const isApprovableStage = loan.status === 'Review';

  const handlePdfDialogOpen = (docName: string) => {
    setIsPdfDialogOpen(prevState => ({...prevState, isOpen: true, docName}));
  };

  const handlePdfClose = () => {
    setIsPdfDialogOpen(prevState => ({...prevState, isOpen: false, docName: ''}));
  }
  
  const handleComplete = () => {
    setIsDialogOpen(true);
  };
  
  const handleApprovalSubmit = (comment: string) => {
    // Determine the next status based on current status
    let nextStatus: LoanStatus, nextTeamAssignation: Roles;
    if (loan.status === 'Review') {
      nextStatus = 'Review';
      switch (loan.assignedTo) {
        case 'supervisor':
        case 'support':
          nextTeamAssignation = 'trade-finance';
          break;

        case 'trade-finance':
          nextTeamAssignation = 'treasury';
          break;

        case 'treasury':
          nextTeamAssignation = 'crm';
          break;
      
        case 'crm':
          nextStatus = 'Completion';
          nextTeamAssignation = loan.assignedTo;
          break;

        default:
          break;
      }
    }
    
    // Create updated loan object with new status and timeline event
    const updatedLoan = {
      ...loan,
      assignedTo: nextTeamAssignation,
      status: nextStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      details: {
        ...loan.details,
        timeline: [
          {
            date: new Date().toISOString().split('T')[0],
            action: `Comment: ${comment} - Current status: ${nextStatus}`,
            user: `${userRole === 'admin' ? 'Admin' : 'Supervisor'} (${userRole})`,
          },
          ...loanActionTimelines,
        ],
      },
    };
    
    // Update our loan data (in a real app, this would be an API call)
    // Find index of current loan in the array
    const localLoanData = JSON.parse(localStorage.getItem('loanData'));
    const loanIndex = localLoanData?.findIndex((l: LoanProcess) => l.id === loan.id);
    if (loanIndex !== -1) {
      localLoanData[loanIndex] = updatedLoan;
      localStorage.setItem('loanData', JSON.stringify(localLoanData));
    }
    
    // Update the local state
    setLoan(updatedLoan);
    setIsDialogOpen(false);
    
    // Show success message
    toast({
      title: "Loan approved successfully",
      description: `Loan status updated to ${nextStatus}`,
    });
    setTimeout(() => {
      navigate(-1);
    }, 5000);
  };
  
  return (
    <Layout>
      <div className="mb-3">
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
            <LoanStatusBadge pixels='px-3.5 py-1.5' status={loan.status} />
          </div>
        </div>
      </div>
      
      {/* Approval button for supervisor and admin */}
      {canApprove && isApprovableStage && (
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleComplete}
            className="bg-loan-primary hover:bg-loan-primary/90"
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Complete
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
          applicationDate={loanActionTimelines[timelineLength - 1]?.date}
          lastUpdated={loan.lastUpdated}
          caseType={loan.caseType}
        />
        
        {/* Documents */}
        <DocumentsCard
          documents={loan.details.documents}
          onPdfClick={handlePdfDialogOpen}
        />
      </div>
      
      {/* Timeline */}
      <div className="mt-6">
        <LoanTimelineCard timeline={loanActionTimelines} />
      </div>
      
      {/* Approval Dialog */}
      <ApprovalDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleApprovalSubmit}
      />

      {/* PDF Preview Dialog */}
      <PdfDialog
        isOpen={isPdfDialogOpen.isOpen}
        onClose={handlePdfClose}
        pdfUrl={`/${isPdfDialogOpen.docName}.pdf`}
        title={loan.loanAccount}
      />
    </Layout>
  );
};

export default LoanDetail;

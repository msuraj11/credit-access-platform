
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LoanStatus } from "@/components/LoanProcessList";
import { CustomerInfoCard } from "@/components/CustomerInfoCard";
import { LoanDetailsCard } from "@/components/LoanDetailsCard";
import { DocumentsCard } from "@/components/DocumentsCard";
import { LoanTimelineCard } from "@/components/LoanTimelineCard";
import { LoanStatusBadge } from "@/components/LoanStatusBadge";
import { LoanWorkflowCard } from "@/components/LoanWorkflowCard";
import { loanDetails, statusToStepMapping } from "@/data/loanData";

const LoanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<typeof loanDetails[string] | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    
    if (!storedRole) {
      navigate('/');
      return;
    }
    
    setUserRole(storedRole);
    
    // Get loan details - would be an API call in a real app
    if (id && loanDetails[id]) {
      setLoan(loanDetails[id]);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);
  
  if (!loan) {
    return <div>Loading...</div>;
  }
  
  // Get the current step number for the workflow visual
  const currentStep = statusToStepMapping[loan.status];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
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
        
        {/* Loan Process Visual */}
        <LoanWorkflowCard currentStep={currentStep} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Information */}
          <CustomerInfoCard
            customerName={loan.customerName}
            email={loan.email}
            phone={loan.phone}
            address={loan.address}
          />
          
          {/* Loan Details */}
          <LoanDetailsCard
            loanAmount={loan.loanAmount}
            purpose={loan.purpose}
            applicationDate={loan.timeline[0]?.date}
            lastUpdated={loan.lastUpdated}
          />
          
          {/* Documents */}
          <DocumentsCard documents={loan.documents} />
        </div>
        
        {/* Timeline */}
        <div className="mt-6">
          <LoanTimelineCard timeline={loan.timeline} />
        </div>
      </main>
    </div>
  );
};

export default LoanDetail;

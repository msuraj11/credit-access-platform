
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { LoanProcessVisual } from "@/components/LoanProcessVisual";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanProcess, LoanStatus } from "@/components/LoanProcessList";
import { formatDate } from "@/lib/utils";

// Sample loan details - this would come from API in a real app
const loanDetails: { [key: string]: LoanProcess & { 
  email: string; 
  phone: string; 
  address: string; 
  timeline: {date: string; action: string; user: string}[];
  documents: {name: string; type: string; uploadDate: string}[];
}} = {
  "LOAN-2025-001": {
    id: "LOAN-2025-001",
    customerName: "John Smith",
    loanAmount: 250000,
    purpose: "Home Purchase",
    status: "Initiation",
    assignedTo: "support",
    lastUpdated: "2025-05-07",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 90210",
    timeline: [
      {date: "2025-05-07", action: "Loan application submitted", user: "System"},
      {date: "2025-05-07", action: "Documents received", user: "Sarah (Support)"}
    ],
    documents: [
      {name: "Application Form", type: "PDF", uploadDate: "2025-05-07"},
      {name: "Income Verification", type: "PDF", uploadDate: "2025-05-07"},
      {name: "Property Assessment", type: "PDF", uploadDate: "2025-05-07"}
    ]
  },
  "LOAN-2025-002": {
    id: "LOAN-2025-002",
    customerName: "Emily Johnson",
    loanAmount: 50000,
    purpose: "Business Expansion",
    status: "Processing",
    assignedTo: "supervisor",
    lastUpdated: "2025-05-06",
    email: "emily.j@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Business Ave, Commerce City, NY 10001",
    timeline: [
      {date: "2025-05-04", action: "Loan application submitted", user: "System"},
      {date: "2025-05-05", action: "Documents received", user: "Mike (Support)"},
      {date: "2025-05-06", action: "Initial review completed", user: "Sarah (Support)"},
      {date: "2025-05-06", action: "Moved to processing", user: "John (Supervisor)"}
    ],
    documents: [
      {name: "Business Plan", type: "PDF", uploadDate: "2025-05-04"},
      {name: "Financial Statements", type: "PDF", uploadDate: "2025-05-04"},
      {name: "Business License", type: "PDF", uploadDate: "2025-05-05"}
    ]
  },
  "LOAN-2025-003": {
    id: "LOAN-2025-003",
    customerName: "Michael Williams",
    loanAmount: 75000,
    purpose: "Equipment Finance",
    status: "Review",
    assignedTo: "trade-finance",
    lastUpdated: "2025-05-05",
    email: "m.williams@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Industry Rd, Factoryville, TX 75001",
    timeline: [
      {date: "2025-05-01", action: "Loan application submitted", user: "System"},
      {date: "2025-05-02", action: "Documents received", user: "Laura (Support)"},
      {date: "2025-05-03", action: "Initial review completed", user: "Mike (Support)"},
      {date: "2025-05-04", action: "Moved to processing", user: "John (Supervisor)"},
      {date: "2025-05-05", action: "Processing completed", user: "Alice (Supervisor)"},
      {date: "2025-05-05", action: "Moved to review", user: "Robert (Trade Finance)"}
    ],
    documents: [
      {name: "Equipment Specifications", type: "PDF", uploadDate: "2025-05-01"},
      {name: "Vendor Quotes", type: "PDF", uploadDate: "2025-05-02"},
      {name: "Business Financials", type: "PDF", uploadDate: "2025-05-03"}
    ]
  },
};

// Mapping of loan status to workflow step number (1-6)
const statusToStepMapping: Record<LoanStatus, number> = {
  "Initiation": 1,
  "Processing": 2,
  "Review": 3,
  "Approval": 4,
  "Payment": 5,
  "Completion": 6
};

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
              <span className={`px-3.5 py-1.5 rounded-full text-sm font-medium ${
                loan.status === 'Initiation' ? 'bg-blue-100 text-blue-800' :
                loan.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                loan.status === 'Review' ? 'bg-purple-100 text-purple-800' :
                loan.status === 'Approval' ? 'bg-orange-100 text-orange-800' :
                loan.status === 'Payment' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {loan.status}
              </span>
            </div>
          </div>
        </div>
        
        {/* Loan Process Visual */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Loan Process Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <LoanProcessVisual currentStep={currentStep} />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                  <dd className="text-base">{loan.customerName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="text-base">{loan.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                  <dd className="text-base">{loan.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                  <dd className="text-base">{loan.address}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          {/* Loan Details */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Loan Amount</dt>
                  <dd className="text-base font-medium">€{loan.loanAmount.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Purpose</dt>
                  <dd className="text-base">{loan.purpose}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Application Date</dt>
                  <dd className="text-base">{loan.timeline[0]?.date ? formatDate(loan.timeline[0].date) : "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                  <dd className="text-base">{formatDate(loan.lastUpdated)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loan.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(doc.uploadDate)}</p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {doc.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Timeline */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-muted-foreground/20 ml-3 space-y-6">
              {loan.timeline.map((event, index) => (
                <li key={index} className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-loan-light rounded-full -left-3 ring-8 ring-background">
                    <div className="w-2.5 h-2.5 rounded-full bg-loan-primary"></div>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold">
                    {event.action}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                    {formatDate(event.date)}
                  </time>
                  <p className="text-sm">
                    By {event.user}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoanDetail;

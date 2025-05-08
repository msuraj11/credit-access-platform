// Types
export type LoanStatus = 'Initiation' | 'Processing' | 'Review' | 'Approval' | 'Payment' | 'Completion';

export interface TimelineEvent {
  date: string;
  action: string;
  user: string;
}

export interface Document {
  name: string;
  type: string;
  uploadDate: string;
}

export interface LoanDetails {
  email: string;
  phone: string;
  address: string;
  timeline: TimelineEvent[];
  documents: Document[];
}

export type LoanProcess = {
  id: string;
  customerName: string;
  loanAmount: number;
  purpose: string;
  status: LoanStatus;
  assignedTo: string;
  lastUpdated: string;
  details: LoanDetails;
};

// Sample data
export const loanProcessesData: LoanProcess[] = [
  {
    id: "LOAN-2025-001",
    customerName: "John Smith",
    loanAmount: 250000,
    purpose: "Home Purchase",
    status: "Initiation",
    assignedTo: "support",
    lastUpdated: "2025-05-07",
    details: {
      email: "john.smith@example.com",
      phone: "+49 123-4567",
      address: "Berliner Straße 72, 60311 Frankfurt am Main, Germany",
      timeline: [
        {date: "2025-05-07", action: "Loan application submitted", user: "System"},
        {date: "2025-05-07", action: "Documents received", user: "Sarah (Support)"}
      ],
      documents: [
        {name: "Application Form", type: "PDF", uploadDate: "2025-05-07"},
        {name: "Income Verification", type: "PDF", uploadDate: "2025-05-07"},
        {name: "Property Assessment", type: "PDF", uploadDate: "2025-05-07"}
      ]
    }
  },
  {
    id: "LOAN-2025-002",
    customerName: "Emily Johnson",
    loanAmount: 50000,
    purpose: "Business Expansion",
    status: "Processing",
    assignedTo: "supervisor",
    lastUpdated: "2025-05-06",
    details: {
      email: "emily.j@example.com",
      phone: "+49 234-5678",
      address: "Friedrich-Ebert-Anlage 48, 60325 Frankfurt am Main, Germany",
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
    }
  },
  {
    id: "LOAN-2025-003",
    customerName: "Michael Williams",
    loanAmount: 75000,
    purpose: "Equipment Finance",
    status: "Review",
    assignedTo: "trade-finance",
    lastUpdated: "2025-05-05",
    details: {
      email: "m.williams@example.com",
      phone: "+49 345-6789",
      address: "Leipziger Straße 34, 60487 Frankfurt am Main, Germany",
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
    }
  },
  {
    id: "LOAN-2025-004",
    customerName: "Sarah Brown",
    loanAmount: 25000,
    purpose: "Car Loan",
    status: "Approval",
    assignedTo: "supervisor",
    lastUpdated: "2025-05-04",
    details: {
      email: "sarah.brown@example.com",
      phone: "+49 456-7890",
      address: "Hanauer Landstraße 210, 60314 Frankfurt am Main, Germany",
      timeline: [
        {date: "2025-04-28", action: "Loan application submitted", user: "System"},
        {date: "2025-04-29", action: "Documents received", user: "Mike (Support)"},
        {date: "2025-05-01", action: "Initial review completed", user: "Sarah (Support)"},
        {date: "2025-05-02", action: "Moved to processing", user: "John (Supervisor)"},
        {date: "2025-05-03", action: "Processing completed", user: "Alice (Supervisor)"},
        {date: "2025-05-03", action: "Review completed", user: "Robert (Trade Finance)"},
        {date: "2025-05-04", action: "Moved to approval", user: "John (Supervisor)"}
      ],
      documents: [
        {name: "Car Details", type: "PDF", uploadDate: "2025-04-28"},
        {name: "Income Proof", type: "PDF", uploadDate: "2025-04-29"},
        {name: "Credit Report", type: "PDF", uploadDate: "2025-05-01"}
      ]
    }
  },
  {
    id: "LOAN-2025-005",
    customerName: "David Wilson",
    loanAmount: 500000,
    purpose: "Commercial Property",
    status: "Payment",
    assignedTo: "payment",
    lastUpdated: "2025-05-03",
    details: {
      email: "d.wilson@example.com",
      phone: "+49 567-8901",
      address: "Zeil 67, 60313 Frankfurt am Main, Germany",
      timeline: [
        {date: "2025-04-20", action: "Loan application submitted", user: "System"},
        {date: "2025-04-22", action: "Documents received", user: "Laura (Support)"},
        {date: "2025-04-25", action: "Initial review completed", user: "Mike (Support)"},
        {date: "2025-04-27", action: "Moved to processing", user: "John (Supervisor)"},
        {date: "2025-04-29", action: "Processing completed", user: "Alice (Supervisor)"},
        {date: "2025-05-01", action: "Review completed", user: "Robert (Trade Finance)"},
        {date: "2025-05-02", action: "Approval granted", user: "Maria (Director)"},
        {date: "2025-05-03", action: "Moved to payment", user: "Thomas (Payment)"}
      ],
      documents: [
        {name: "Property Details", type: "PDF", uploadDate: "2025-04-20"},
        {name: "Business Financial Records", type: "PDF", uploadDate: "2025-04-22"},
        {name: "Property Valuation", type: "PDF", uploadDate: "2025-04-25"},
        {name: "Insurance Documents", type: "PDF", uploadDate: "2025-04-27"}
      ]
    }
  },
  {
    id: "LOAN-2025-006",
    customerName: "Lisa Taylor",
    loanAmount: 35000,
    purpose: "Debt Consolidation",
    status: "Processing",
    assignedTo: "support",
    lastUpdated: "2025-05-02",
    details: {
      email: "lisa.t@example.com",
      phone: "+49 678-9012",
      address: "Hedderichstraße 51, 60594 Frankfurt am Main, Germany",
      timeline: [
        {date: "2025-05-01", action: "Loan application submitted", user: "System"},
        {date: "2025-05-01", action: "Documents received", user: "Mike (Support)"},
        {date: "2025-05-02", action: "Initial review completed", user: "Sarah (Support)"},
        {date: "2025-05-02", action: "Moved to processing", user: "Sarah (Support)"}
      ],
      documents: [
        {name: "Credit Card Statements", type: "PDF", uploadDate: "2025-05-01"},
        {name: "Income Verification", type: "PDF", uploadDate: "2025-05-01"},
        {name: "Debt Summary", type: "PDF", uploadDate: "2025-05-02"}
      ]
    }
  },
  {
    id: "LOAN-2025-007",
    customerName: "James Anderson",
    loanAmount: 125000,
    purpose: "Home Renovation",
    status: "Completion",
    assignedTo: "crm",
    lastUpdated: "2025-05-01",
    details: {
      email: "j.anderson@example.com",
      phone: "+49 789-0123",
      address: "Am Ginnheimer Wäldchen 8, 60431 Frankfurt am Main, Germany",
      timeline: [
        {date: "2025-04-01", action: "Loan application submitted", user: "System"},
        {date: "2025-04-03", action: "Documents received", user: "Laura (Support)"},
        {date: "2025-04-05", action: "Initial review completed", user: "Mike (Support)"},
        {date: "2025-04-08", action: "Moved to processing", user: "John (Supervisor)"},
        {date: "2025-04-12", action: "Processing completed", user: "Alice (Supervisor)"},
        {date: "2025-04-15", action: "Review completed", user: "Robert (Trade Finance)"},
        {date: "2025-04-18", action: "Approval granted", user: "Maria (Director)"},
        {date: "2025-04-22", action: "Payment processed", user: "Thomas (Payment)"},
        {date: "2025-05-01", action: "Loan completed", user: "Rachel (CRM)"}
      ],
      documents: [
        {name: "Property Details", type: "PDF", uploadDate: "2025-04-01"},
        {name: "Renovation Plans", type: "PDF", uploadDate: "2025-04-03"},
        {name: "Contractor Quotes", type: "PDF", uploadDate: "2025-04-05"},
        {name: "Property Valuation", type: "PDF", uploadDate: "2025-04-12"},
        {name: "Completion Certificate", type: "PDF", uploadDate: "2025-05-01"}
      ]
    }
  },
  {
    id: "LOAN-2025-008",
    customerName: "Patricia Martin",
    loanAmount: 80000,
    purpose: "Education Loan",
    status: "Review",
    assignedTo: "trade-finance",
    lastUpdated: "2025-04-30",
    details: {
      email: "p.martin@example.com",
      phone: "+49 890-1234",
      address: "444 University Ave, College Town, MA 02138",
      timeline: [
        {date: "2025-04-25", action: "Loan application submitted", user: "System"},
        {date: "2025-04-26", action: "Documents received", user: "Mike (Support)"},
        {date: "2025-04-28", action: "Initial review completed", user: "Sarah (Support)"},
        {date: "2025-04-29", action: "Moved to processing", user: "John (Supervisor)"},
        {date: "2025-04-30", action: "Processing completed", user: "Alice (Supervisor)"},
        {date: "2025-04-30", action: "Moved to review", user: "Robert (Trade Finance)"}
      ],
      documents: [
        {name: "University Acceptance Letter", type: "PDF", uploadDate: "2025-04-25"},
        {name: "Course Fee Details", type: "PDF", uploadDate: "2025-04-26"},
        {name: "Academic Records", type: "PDF", uploadDate: "2025-04-28"}
      ]
    }
  }
];

// Role-based access mapping
export const roleAccessMapping: Record<string, (LoanStatus | 'all')[]> = {
  'admin': ['all'],
  'support': ['Initiation', 'Processing'],
  'supervisor': ['Processing', 'Review', 'Approval'],
  'trade-finance': ['Review', 'Approval'],
  'payment': ['Approval', 'Payment'],
  'crm': ['Completion']
};

// Mapping of loan status to workflow step number (1-6)
export const statusToStepMapping: Record<LoanStatus, number> = {
  "Initiation": 1,
  "Processing": 2,
  "Review": 3,
  "Approval": 4,
  "Payment": 5,
  "Completion": 6
};

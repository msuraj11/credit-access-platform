
import { LoanStatus } from "@/components/LoanProcessList";

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
  id: string;
  customerName: string;
  loanAmount: number;
  purpose: string;
  status: LoanStatus;
  assignedTo: string;
  lastUpdated: string;
  email: string;
  phone: string;
  address: string;
  timeline: TimelineEvent[];
  documents: Document[];
}

// Sample loan details - this would come from API in a real app
export const loanDetails: { [key: string]: LoanDetails } = {
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
export const statusToStepMapping: Record<LoanStatus, number> = {
  "Initiation": 1,
  "Processing": 2,
  "Review": 3,
  "Approval": 4,
  "Payment": 5,
  "Completion": 6
};

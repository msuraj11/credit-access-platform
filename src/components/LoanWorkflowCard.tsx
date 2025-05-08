
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanProcessVisual } from "@/components/LoanProcessVisual";

interface LoanWorkflowCardProps {
  currentStep: number;
}

export function LoanWorkflowCard({ currentStep }: LoanWorkflowCardProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Loan Process Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <LoanProcessVisual currentStep={currentStep} />
      </CardContent>
    </Card>
  );
}

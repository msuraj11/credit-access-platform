
import React from 'react';

interface LoanProcessVisualProps {
  currentStep?: number;
}

export function LoanProcessVisual({ currentStep = 4 }: LoanProcessVisualProps) {
  const steps = [
    { title: "Initiation", step: 1 },
    { title: "Processing", step: 2 },
    { title: "Review", step: 3 },
    { title: "Approval", step: 4 },
    { title: "Payment", step: 5 },
    { title: "Completion", step: 6 },
  ];
  
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="relative">
        <div className="hidden md:block absolute top-[8.5rem] left-0 right-0 h-1 bg-loan-light">
          <div 
            className="h-full bg-loan-primary transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 mb-2 ${
                step.step <= currentStep 
                  ? "bg-loan-primary text-white" 
                  : "bg-loan-light text-loan-dark"
              }`}>
                {step.step}
              </div>
              <span className={`text-xs text-center ${
                step.step <= currentStep ? "text-loan-dark font-medium" : "text-muted-foreground"
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

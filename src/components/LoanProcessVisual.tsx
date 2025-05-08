
import React from 'react';

export function LoanProcessVisual() {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="relative">
        <div className="hidden md:block absolute top-[8.5rem] left-0 right-0 h-1 bg-loan-light">
          <div className="h-full w-3/4 bg-loan-primary"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
          {[
            { title: "Initiation", active: true },
            { title: "Processing", active: true },
            { title: "Review", active: true },
            { title: "Approval", active: true },
            { title: "Payment", active: false },
            { title: "Completion", active: false },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 mb-2 ${
                step.active 
                  ? "bg-loan-primary text-white" 
                  : "bg-loan-light text-loan-dark"
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs text-center ${
                step.active ? "text-loan-dark font-medium" : "text-muted-foreground"
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

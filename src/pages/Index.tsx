
import React from 'react';
import { Header } from "@/components/Header";
import { RoleSelection } from "@/components/RoleSelection";
import { LoanProcessVisual } from "@/components/LoanProcessVisual";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-loan-dark leading-tight">
              Loan Automation Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamline your loan processing workflow with our comprehensive banking automation solution
            </p>
          </section>
          
          {/* Process Visual */}
          <section>
            <h2 className="text-2xl font-semibold text-loan-dark mb-6 text-center">Loan Process Workflow</h2>
            <Card>
              <CardContent className="py-6">
                <LoanProcessVisual />
              </CardContent>
            </Card>
          </section>
          
          {/* Role Selection */}
          <section>
            <Card className="loan-card">
              <CardContent className="p-8">
                <RoleSelection />
              </CardContent>
            </Card>
          </section>
          
          {/* Features */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="loan-card p-6">
                <div className="h-10 w-10 rounded-full bg-loan-light/50 flex items-center justify-center text-loan-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Automated Workflows</h3>
                <p className="text-muted-foreground">Reduce manual tasks with predefined approval workflows and automated document processing</p>
              </div>
              
              <div className="loan-card p-6">
                <div className="h-10 w-10 rounded-full bg-loan-light/50 flex items-center justify-center text-loan-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-muted-foreground">Monitor loan status and key metrics in real-time with customizable dashboards</p>
              </div>
              
              <div className="loan-card p-6">
                <div className="h-10 w-10 rounded-full bg-loan-light/50 flex items-center justify-center text-loan-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Compliance & Controls</h3>
                <p className="text-muted-foreground">Ensure regulatory compliance with built-in validation and the four-eyes principle</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-loan-dark text-white py-8">
        <div className="container text-center">
          <p className="text-sm opacity-80">© 2025 Loan Automation Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

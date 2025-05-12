import React, { useEffect } from 'react';
import { RoleSelection } from "@/components/RoleSelection";
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/components/Layout';
import { loanProcessesData } from '@/data/loanData';

const Index = () => {
  useEffect(() => {
    sessionStorage.removeItem('userRole');
    if (!localStorage.getItem('loanData')) {
      localStorage.setItem('loanData', JSON.stringify(loanProcessesData));
    }
  }, [loanProcessesData]);

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-loan-dark leading-tight">
            Loan Process Automation
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Streamline your loan processing workflow with our comprehensive banking automation solution
          </p>
        </section>
        
        {/* Role Selection */}
        <section className="mt-10">
          <Card className="loan-card">
            <CardContent className="p-8">
              <RoleSelection />
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

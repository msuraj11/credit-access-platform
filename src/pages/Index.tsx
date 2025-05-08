
import React from 'react';
import { Header } from "@/components/Header";
import { RoleSelection } from "@/components/RoleSelection";
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
          
          {/* Role Selection */}
          <section className="mt-10">
            <Card className="loan-card">
              <CardContent className="p-8">
                <RoleSelection />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;

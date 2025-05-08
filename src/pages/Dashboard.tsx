
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { LoanProcessList } from "@/components/LoanProcessList";
import { DashboardCharts } from "@/components/DashboardCharts";
import { roles } from "@/components/RoleSelection";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    
    if (!storedRole) {
      navigate('/');
      return;
    }
    
    setUserRole(storedRole);
  }, [navigate]);
  
  // Get role title for display
  const roleTitle = userRole ? roles.find(r => r.id === userRole)?.title : '';
  
  // Check if user is admin
  const isAdmin = userRole === 'admin';
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-loan-dark">Dashboard</h1>
          <p className="text-muted-foreground">Logged in as {roleTitle}</p>
        </div>
        
        {/* Admin-only charts */}
        {isAdmin && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-loan-dark mb-4">Performance Overview</h2>
            <DashboardCharts />
          </section>
        )}
        
        {/* Loan processes list */}
        <section>
          <h2 className="text-xl font-semibold text-loan-dark mb-4">Loan Processes</h2>
          <LoanProcessList userRole={userRole} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

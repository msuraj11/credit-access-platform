import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanProcessList } from "@/components/LoanProcessList";
import { DashboardCharts } from "@/components/DashboardCharts";
import { roles } from "@/components/RoleSelection";
import Layout from '@/components/Layout';

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
    <Layout>
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
    </Layout>
  );
};

export default Dashboard;

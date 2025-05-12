
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, LogIn, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Roles } from '@/data/loanData';

export type Role = {
  id: Roles;
  title: string;
  description: string;
};

export const roles: Role[] = [
  {
    id: "supervisor",
    title: "Loan Ops Supervisor",
    description: "Mid-level operations with 4 eye principle"
  },
  {
    id: "support",
    title: "Loan Ops Support",
    description: "First level support for loan operations"
  },
  {
    id: "treasury",
    title: "Treasury",
    description: "Back office payment processing"
  },
  {
    id: "trade-finance",
    title: "Trade Finance Operation",
    description: "Mid-level operations for trade finance"
  },
  {
    id: "crm",
    title: "CRM",
    description: "Front office exception handling"
  },
  {
    id: "admin",
    title: "Administrator",
    description: "Apps admin with full system access"
  }
];

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) {
      toast.error("Please select a role first");
      return;
    }
    
    const role = roles.find(r => r.id === selectedRole);
    toast.success(`Logging in as ${role?.title}`);
    
    // Store role in sessionStorage for use across the app
    sessionStorage.setItem('userRole', selectedRole);
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-loan-dark mb-6">Select Your Role</h2>
      
      <RadioGroup
        value={selectedRole || ""}
        onValueChange={setSelectedRole}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {roles.map((role) => (
          <div
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'active' : ''}`}
            onClick={() => setSelectedRole(role.id)}
          >
            <RadioGroupItem
              value={role.id}
              id={role.id}
              className="absolute top-5 right-5"
            />
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-loan-light flex items-center justify-center text-loan-primary">
                  <User size={20} />
                </div>
                <div className="ml-3">
                  <Label
                    htmlFor={role.id}
                    className="text-base font-medium cursor-pointer"
                  >
                    {role.title}
                  </Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-10 flex justify-end">
        <Button 
          onClick={handleLogin} 
          className="bg-loan-primary hover:bg-loan-primary/90 text-white px-8 py-6"
          disabled={!selectedRole}
        >
          <LogIn className="mr-2 h-4 w-4" /> Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

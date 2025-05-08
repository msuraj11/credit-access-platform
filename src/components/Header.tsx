
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className, ...props }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  const handleLogout = () => {
    // Clear user role from session storage
    sessionStorage.removeItem('userRole');
    // Navigate back to landing page
    navigate('/');
  };

  return (
    <header className={cn("py-4 px-6 w-full", className)} {...props}>
      <div className="container flex items-center justify-between">
        <Link to={isLanding ? '/' : '/dashboard'}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-loan-primary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5 text-white"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-loan-dark">LoanAutomation</span>
          </div>
        </Link>
        
        {!isLanding &&
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        }
      </div>
    </header>
  );
}

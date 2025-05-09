
import React from 'react';
import { cn, upperFirst } from "@/lib/utils";
import logoUrl from '/euro-currency-sign.svg'
import { Button } from "@/components/ui/button";
import { LogOut, UserRound } from "lucide-react";
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
            <img src={logoUrl} alt="Logo" />
            </div>
            <span className="text-xl font-bold text-loan-dark">LoanAutomation</span>
          </div>
        </Link>
        
        {!isLanding &&
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <UserRound className="h-4 w-4 mr-2" />
              <div>{upperFirst(sessionStorage.getItem('userRole'))}</div>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        }
      </div>
    </header>
  );
}

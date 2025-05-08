
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerInfoCardProps {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

export function CustomerInfoCard({ 
  customerName, 
  email, 
  phone, 
  address 
}: CustomerInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
            <dd className="text-base">{customerName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
            <dd className="text-base">{email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
            <dd className="text-base">{phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Address</dt>
            <dd className="text-base">{address}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

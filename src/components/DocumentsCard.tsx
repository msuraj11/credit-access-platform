
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from '@/components/ui/button';

interface Document {
  name: string;
  type: string;
  uploadDate: string;
}

interface DocumentsCardProps {
  documents: Document[];
  onPdfClick: (docName: string) => void;
}

export function DocumentsCard({ documents, onPdfClick }: DocumentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{formatDate(doc.uploadDate)}</p>
              </div>
              <Button variant="outline" onClick={() => onPdfClick(doc.name)}>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {doc.type}
                </span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

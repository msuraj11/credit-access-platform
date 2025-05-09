
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

interface ApprovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

export function ApprovalDialog({ isOpen, onClose, onSubmit }: ApprovalDialogProps) {
  const [comment, setComment] = useState('');
  const isValid = comment.trim().length > 0;

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(comment);
      setComment(''); // Reset the comment field
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Approve Loan</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Please add a comment before approving this loan. This will be recorded in the loan timeline.
          </p>
          <Textarea
            placeholder="Add your approval comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          {!isValid && comment.length > 0 && (
            <p className="mt-2 text-sm text-destructive">A comment is required to proceed.</p>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid} 
            className="bg-loan-primary hover:bg-loan-primary/90"
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Submit Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

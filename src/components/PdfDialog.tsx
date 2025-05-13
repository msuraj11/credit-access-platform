import { Dialog, DialogContent } from '@/components/ui/dialog';
import PDFPreview from './PDFPreview';

interface PdfDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function PdfDialog({ pdfUrl, title, isOpen, onClose }: PdfDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="pdf-container">
          <PDFPreview pdfUrl={pdfUrl} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

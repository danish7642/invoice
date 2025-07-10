
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileText, Image } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useInvoice } from '@/contexts/InvoiceContext';

export const ExportPanel: React.FC = () => {
  const { invoiceData } = useInvoice();

  const handleExportPDF = async () => {
    try {
      console.log('Starting PDF export...');
      
      // Find the invoice canvas element
      const invoiceElement = document.querySelector('.invoice-canvas') as HTMLElement;
      
      if (!invoiceElement) {
        console.error('Invoice element not found');
        return;
      }

      // Store original styles to restore later
      const originalStyles = {
        position: invoiceElement.style.position,
        left: invoiceElement.style.left,
        top: invoiceElement.style.top,
        zIndex: invoiceElement.style.zIndex,
        transform: invoiceElement.style.transform,
        width: invoiceElement.style.width,
        height: invoiceElement.style.height
      };

      // Temporarily position element for better capture
      invoiceElement.style.position = 'absolute';
      invoiceElement.style.left = '0';
      invoiceElement.style.top = '0';
      invoiceElement.style.zIndex = '9999';
      invoiceElement.style.transform = 'none';

      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create canvas with optimized settings for PDF
      const canvas = await html2canvas(invoiceElement, {
        scale: 2, // Reduced scale to prevent memory issues but maintain quality
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: invoiceElement.scrollWidth,
        height: invoiceElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: invoiceElement.scrollWidth,
        windowHeight: invoiceElement.scrollHeight,
        removeContainer: false,
        foreignObjectRendering: false, // Disable foreign object rendering to prevent layout issues
        onclone: (clonedDoc) => {
          // Ensure the cloned element maintains proper styling
          const clonedElement = clonedDoc.querySelector('.invoice-canvas') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.position = 'static';
            clonedElement.style.transform = 'none';
            clonedElement.style.width = 'auto';
            clonedElement.style.height = 'auto';
          }
        }
      });

      // Restore original styles immediately after canvas creation
      Object.keys(originalStyles).forEach(key => {
        if (originalStyles[key as keyof typeof originalStyles]) {
          (invoiceElement.style )[key] = originalStyles[key as keyof typeof originalStyles];
        } else {
          (invoiceElement.style )[key] = '';
        }
      });

      // Calculate PDF dimensions (A4 size)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Add image to PDF with proper fitting
      if (imgHeight <= pdfHeight) {
        // Fits on one page
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multiple pages needed
        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Additional pages
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      // Generate filename and save
      const filename = `${invoiceData.invoiceNumber || 'invoice'}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
      
      console.log('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const handleExportPNG = async () => {
    try {
      console.log('Starting PNG export...');
      
      const invoiceElement = document.querySelector('.invoice-canvas') as HTMLElement;
      
      if (!invoiceElement) {
        console.error('Invoice element not found');
        return;
      }

      // Create high-quality canvas for PNG
      const canvas = await html2canvas(invoiceElement, {
        scale: 4, // Higher scale for PNG
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: invoiceElement.scrollWidth,
        height: invoiceElement.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${invoiceData.invoiceNumber || 'invoice'}_${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 1.0);
      
      console.log('PNG exported successfully');
    } catch (error) {
      console.error('Error exporting PNG:', error);
    }
  };

  return (
    <div className="w-64 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-l border-gray-200 dark:border-slate-700">
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Options
        </h3>
        
        <div className="space-y-3">
          <Button 
            onClick={handleExportPDF}
            className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          
          <Button 
            onClick={handleExportPNG}
            className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            variant="outline"
          >
            <Image className="h-4 w-4 mr-2" />
            Export as PNG
          </Button>
        </div>

        <div className="mt-6 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Export Tips</h4>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <li>• High-resolution PDF output</li>
            <li>• PNG for web use (4K quality)</li>
            <li>• Optimized for printing</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

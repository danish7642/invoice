
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Download, Palette, Moon, Sun } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { settings, updateSettings, invoiceData } = useInvoice();

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
    document.documentElement.classList.toggle('dark');
  };

  const handleQuickExport = async () => {
    try {
      console.log('Quick PDF export from header...');
      
      const invoiceElement = document.querySelector('.invoice-canvas') as HTMLElement;
      
      if (!invoiceElement) {
        console.error('Invoice element not found');
        return;
      }

      // Store original styles
      const originalStyles = {
        position: invoiceElement.style.position,
        left: invoiceElement.style.left,
        top: invoiceElement.style.top,
        zIndex: invoiceElement.style.zIndex,
        transform: invoiceElement.style.transform
      };

      // Temporarily position for capture
      invoiceElement.style.position = 'absolute';
      invoiceElement.style.left = '0';
      invoiceElement.style.top = '0';
      invoiceElement.style.zIndex = '9999';
      invoiceElement.style.transform = 'none';

      // Wait for layout
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create canvas
      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: invoiceElement.scrollWidth,
        height: invoiceElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false
      });

      // Restore styles
      Object.keys(originalStyles).forEach(key => {
        if (originalStyles[key as keyof typeof originalStyles]) {
          (invoiceElement.style )[key] = originalStyles[key as keyof typeof originalStyles];
        } else {
          (invoiceElement.style )[key] = '';
        }
      });

      // Create PDF
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm', 
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const filename = `${invoiceData.invoiceNumber || 'invoice'}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
      
      console.log('Quick PDF export completed');
    } catch (error) {
      console.error('Error in quick export:', error);
    }
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DG</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Danish Invoice Generator
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
          {settings.darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button variant="ghost" size="sm">
          <Palette className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          onClick={handleQuickExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export HD
        </Button>
      </div>
    </header>
  );
};

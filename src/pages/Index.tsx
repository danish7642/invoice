
import React, { useState } from 'react';
import { InvoiceProvider } from '@/contexts/InvoiceContext';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { InvoiceCanvas } from '@/components/InvoiceCanvas';
import { ExportPanel } from '@/components/ExportPanel';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex h-[calc(100vh-4rem)]">
          <Sidebar isOpen={sidebarOpen} />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-80' : 'ml-0'
          } flex flex-col`}>
            <div className="flex-1 flex">
              <InvoiceCanvas />
              <ExportPanel />
            </div>
          </main>
        </div>
      </div>
    </InvoiceProvider>
  );
};

export default Index;


import React from 'react';
import { useInvoice } from '@/contexts/InvoiceContext';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';

export const InvoiceCanvas: React.FC = () => {
  const { settings } = useInvoice();

  const renderTemplate = () => {
    switch (settings.template) {
      case 'modern':
        return <ModernTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      case 'corporate':
        return <CorporateTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-slate-900 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div 
          className="invoice-canvas bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-3xl"
          style={{ 
            fontFamily: settings.fontFamily,
            fontSize: settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const ModernTemplate: React.FC = () => {
  const { invoiceData, settings } = useInvoice();

  return (
    <div className="p-8 bg-white min-h-[800px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: settings.primaryColor }}
          >
            {invoiceData.heading}
          </h1>
          <div className="text-gray-600">
            <p>#{invoiceData.invoiceNumber}</p>
            <p>Date: {new Date(invoiceData.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800">{invoiceData.companyName}</h2>
          <div className="text-gray-600 whitespace-pre-line">
            {invoiceData.companyAddress}
          </div>
          <p className="text-gray-600">{invoiceData.companyPhone}</p>
          <p className="text-gray-600">{invoiceData.companyEmail}</p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Bill To:</h3>
        <div>
          <p className="font-medium">{invoiceData.clientName}</p>
          <div className="text-gray-600 whitespace-pre-line">{invoiceData.clientAddress}</div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div 
          className="grid grid-cols-4 gap-4 p-4 rounded-t-lg text-white font-semibold"
          style={{ backgroundColor: settings.primaryColor }}
        >
          <div>Description</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Rate</div>
          <div className="text-right">Amount</div>
        </div>
        
        {invoiceData.items.map((item, index) => (
          <div 
            key={item.id} 
            className={`grid grid-cols-4 gap-4 p-4 border-b Rs{
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div>{item.description}</div>
            <div className="text-center">{item.quantity}</div>
            <div className="text-center">Rs{item.rate.toFixed(2)}</div>
            <div className="text-right font-medium">Rs{item.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal:</span>
            <span>Rs{invoiceData.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Tax ({invoiceData.taxRate}%):</span>
            <span>Rs{invoiceData.taxAmount.toFixed(2)}</span>
          </div>
          <div 
            className="flex justify-between py-3 font-bold text-lg text-white px-4 rounded"
            style={{ backgroundColor: settings.primaryColor }}
          >
            <span>Total:</span>
            <span>Rs{invoiceData.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {(invoiceData.notes || invoiceData.terms) && (
        <div className="border-t pt-6 space-y-4">
          {invoiceData.notes && (
            <div>
              <h4 className="font-semibold mb-2">Notes:</h4>
              <p className="text-gray-600">{invoiceData.notes}</p>
            </div>
          )}
          {invoiceData.terms && (
            <div>
              <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
              <p className="text-gray-600 text-sm">{invoiceData.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

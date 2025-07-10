
import React from 'react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const MinimalTemplate: React.FC = () => {
  const { invoiceData, settings } = useInvoice();

  return (
    <div className="p-12 bg-white min-h-[800px]">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light text-gray-800 mb-8">{invoiceData.heading}</h1>
        
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Invoice Number</p>
            <p className="font-medium">{invoiceData.invoiceNumber}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{new Date(invoiceData.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Company and Client */}
      <div className="grid grid-cols-2 gap-16 mb-12">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">From</p>
          <div className="space-y-1">
            <p className="font-medium text-gray-800">{invoiceData.companyName}</p>
            <div className="text-sm text-gray-600 whitespace-pre-line">
              {invoiceData.companyAddress}
            </div>
            <p className="text-sm text-gray-600">{invoiceData.companyEmail}</p>
          </div>
        </div>
        
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">To</p>
          <div className="space-y-1">
            <p className="font-medium text-gray-800">{invoiceData.clientName}</p>
            <div className="text-sm text-gray-600 whitespace-pre-line">
              {invoiceData.clientAddress}
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-12">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <div className="grid grid-cols-4 gap-4 text-xs uppercase tracking-wide text-gray-500">
            <div>Item</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Rate</div>
            <div className="text-right">Amount</div>
          </div>
        </div>
        
        {invoiceData.items.map((item) => (
          <div key={item.id} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100">
            <div className="text-gray-800">{item.description}</div>
            <div className="text-center text-gray-600">{item.quantity}</div>
            <div className="text-center text-gray-600">Rs{item.rate.toFixed(2)}</div>
            <div className="text-right font-medium">Rs{item.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>Rs{invoiceData.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax ({invoiceData.taxRate}%)</span>
            <span>Rs{invoiceData.taxAmount.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>Rs{invoiceData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {(invoiceData.notes || invoiceData.terms) && (
        <div className="mt-16 pt-8 border-t border-gray-200 space-y-6">
          {invoiceData.notes && (
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Notes</p>
              <p className="text-sm text-gray-700">{invoiceData.notes}</p>
            </div>
          )}
          {invoiceData.terms && (
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Terms</p>
              <p className="text-xs text-gray-600 leading-relaxed">{invoiceData.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

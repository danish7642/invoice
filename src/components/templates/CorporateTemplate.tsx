
import React from 'react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const CorporateTemplate: React.FC = () => {
  const { invoiceData, settings } = useInvoice();

  return (
    <div className="bg-white min-h-[800px]">
      {/* Header Section */}
      <div 
        className="p-8 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)` 
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{invoiceData.companyName}</h1>
            <div className="opacity-90 whitespace-pre-line">
              {invoiceData.companyAddress}
            </div>
            <div className="mt-2 opacity-90">
              <p>{invoiceData.companyPhone} | {invoiceData.companyEmail}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold mb-1">{invoiceData.heading}</h2>
            <p className="text-xl opacity-90">#{invoiceData.invoiceNumber}</p>
            <p className="opacity-75">Date: {new Date(invoiceData.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Client Info */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: settings.primaryColor }}>
          <h3 className="font-bold text-lg mb-3 text-gray-800">Invoice To:</h3>
          <div>
            <p className="text-xl font-semibold text-gray-800">{invoiceData.clientName}</p>
            <div className="text-gray-600 mt-1 whitespace-pre-line">{invoiceData.clientAddress}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 shadow-sm rounded-lg overflow-hidden border">
          <table className="w-full">
            <thead style={{ backgroundColor: settings.primaryColor }}>
              <tr className="text-white">
                <th className="text-left p-4 font-semibold">DESCRIPTION</th>
                <th className="text-center p-4 font-semibold">QTY</th>
                <th className="text-center p-4 font-semibold">RATE</th>
                <th className="text-right p-4 font-semibold">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-4 font-medium">{item.description}</td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4 text-center">Rs{item.rate.toFixed(2)}</td>
                  <td className="p-4 text-right font-semibold">Rs{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-8">
          <div className="w-80 bg-gray-50 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="font-medium">Subtotal:</span>
                <span>Rs{invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Tax ({invoiceData.taxRate}%):</span>
                <span>Rs{invoiceData.taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t-2 pt-3" style={{ borderColor: settings.primaryColor }}>
                <div className="flex justify-between text-2xl font-bold" style={{ color: settings.primaryColor }}>
                  <span>TOTAL:</span>
                  <span>Rs{invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div className="border-t-2 pt-8" style={{ borderColor: settings.primaryColor }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {invoiceData.notes && (
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3" style={{ color: settings.primaryColor }}>
                    Additional Notes
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{invoiceData.notes}</p>
                </div>
              )}
              {invoiceData.terms && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3" style={{ color: settings.primaryColor }}>
                    Terms & Conditions
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{invoiceData.terms}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


import React from 'react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const ClassicTemplate: React.FC = () => {
  const { invoiceData, settings } = useInvoice();

  return (
    <div className="p-8 bg-white min-h-[800px]">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: settings.primaryColor }}>
        <h1 
          className="text-5xl font-serif font-bold mb-4"
          style={{ color: settings.primaryColor }}
        >
          {invoiceData.heading}
        </h1>
        <div className="text-lg text-gray-700">
          Invoice #{invoiceData.invoiceNumber} | Date: {new Date(invoiceData.date).toLocaleDateString()}
        </div>
      </div>

      {/* Company and Client Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg mb-3" style={{ color: settings.primaryColor }}>From:</h3>
          <div className="border-l-4 pl-4" style={{ borderColor: settings.primaryColor }}>
            <h4 className="font-semibold text-xl">{invoiceData.companyName}</h4>
            <div className="text-gray-600 whitespace-pre-line mt-2">
              {invoiceData.companyAddress}
            </div>
            <p className="text-gray-600 mt-1">{invoiceData.companyPhone}</p>
            <p className="text-gray-600">{invoiceData.companyEmail}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-3" style={{ color: settings.primaryColor }}>To:</h3>
          <div className="border-l-4 pl-4" style={{ borderColor: settings.secondaryColor }}>
            <h4 className="font-semibold text-xl">{invoiceData.clientName}</h4>
            <div className="text-gray-600 whitespace-pre-line mt-2">
              {invoiceData.clientAddress}
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-2" style={{ borderColor: settings.primaryColor }}>
          <thead>
            <tr style={{ backgroundColor: settings.primaryColor }} className="text-white">
              <th className="text-left p-4 font-bold">Description</th>
              <th className="text-center p-4 font-bold">Qty</th>
              <th className="text-center p-4 font-bold">Rate</th>
              <th className="text-right p-4 font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 border-b">{item.description}</td>
                <td className="p-4 border-b text-center">{item.quantity}</td>
                <td className="p-4 border-b text-center">Rs{item.rate.toFixed(2)}</td>
                <td className="p-4 border-b text-right font-semibold">Rs{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 text-right font-semibold">Subtotal:</td>
                <td className="py-2 text-right pl-8">Rs{invoiceData.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 text-right font-semibold">Tax ({invoiceData.taxRate}%):</td>
                <td className="py-2 text-right pl-8">Rs{invoiceData.taxAmount.toFixed(2)}</td>
              </tr>
              <tr style={{ backgroundColor: settings.primaryColor }} className="text-white">
                <td className="py-4 text-right font-bold text-lg px-4">TOTAL:</td>
                <td className="py-4 text-right font-bold text-lg px-4">Rs{invoiceData.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {(invoiceData.notes || invoiceData.terms) && (
        <div className="border-t-2 pt-6 mt-8" style={{ borderColor: settings.primaryColor }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invoiceData.notes && (
              <div>
                <h4 className="font-bold mb-3" style={{ color: settings.primaryColor }}>Notes:</h4>
                <p className="text-gray-700 leading-relaxed">{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h4 className="font-bold mb-3" style={{ color: settings.primaryColor }}>Terms & Conditions:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{invoiceData.terms}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

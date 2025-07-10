
import React from 'react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const CreativeTemplate: React.FC = () => {
  const { invoiceData, settings } = useInvoice();

  return (
    <div className="relative bg-white min-h-[800px] overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-5 transform rotate-12"
        style={{
          background: `radial-gradient(circle, ${settings.primaryColor} 2px, transparent 2px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 p-8">
        {/* Creative Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div 
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <span className="text-white font-bold text-xl">
                {invoiceData.companyName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: settings.primaryColor }}>
                {invoiceData.companyName}
              </h1>
              <p className="text-gray-600">Creative Invoice Solution</p>
            </div>
          </div>

          <div 
            className="inline-block px-6 py-3 rounded-full text-white font-bold text-xl transform -rotate-2"
            style={{ backgroundColor: settings.primaryColor }}
          >
            {invoiceData.heading} #{invoiceData.invoiceNumber}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4" style={{ borderColor: settings.primaryColor }}>
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-2">Invoice Date</h3>
            <p className="text-xl font-bold" style={{ color: settings.primaryColor }}>
              {new Date(invoiceData.date).toLocaleDateString()}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-400">
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-2">Amount Due</h3>
            <p className="text-xl font-bold text-green-600">
              Rs{invoiceData.total.toFixed(2)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-400">
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-2">Status</h3>
            <p className="text-xl font-bold text-purple-600">Pending</p>
          </div>
        </div>

        {/* Company & Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
            <div className="flex items-center mb-4">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: settings.primaryColor }}
              />
              <h3 className="font-bold text-gray-800">From</h3>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-lg">{invoiceData.companyName}</p>
              <div className="text-gray-600 text-sm whitespace-pre-line">
                {invoiceData.companyAddress}
              </div>
              <p className="text-gray-600 text-sm">{invoiceData.companyEmail}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2" />
              <h3 className="font-bold text-gray-800">To</h3>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-lg">{invoiceData.clientName}</p>
              <div className="text-gray-600 text-sm whitespace-pre-line">
                {invoiceData.clientAddress}
              </div>
            </div>
          </div>
        </div>

        {/* Creative Items Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span 
              className="w-8 h-1 mr-3 rounded"
              style={{ backgroundColor: settings.primaryColor }}
            />
            Invoice Items
          </h3>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 transform hover:scale-105 transition-transform duration-200"
                style={{ borderColor: settings.primaryColor }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800">{item.description}</h4>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded-full mr-2">
                        Qty: {item.quantity}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        Rate: Rs{item.rate.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: settings.primaryColor }}
                    >
                      Rs{item.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Totals */}
        <div className="flex justify-end mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-xl w-80">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium">Subtotal</span>
                <span>Rs{invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Tax ({invoiceData.taxRate}%)</span>
                <span>Rs{invoiceData.taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t-2 pt-4">
                <div 
                  className="flex justify-between text-3xl font-bold p-4 rounded-lg text-white transform -rotate-1"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  <span>TOTAL</span>
                  <span>Rs{invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creative Footer */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div className="space-y-6">
            {invoiceData.notes && (
              <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
                <h4 className="font-bold text-lg mb-3 text-yellow-800">📝 Notes</h4>
                <p className="text-gray-700 leading-relaxed">{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                <h4 className="font-bold text-lg mb-3 text-red-800">📋 Terms & Conditions</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  terms: string;
  heading: string;
}

export interface InvoiceSettings {
  template: 'modern' | 'classic' | 'minimal' | 'corporate' | 'creative';
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
  darkMode: boolean;
}

interface InvoiceContextType {
  invoiceData: InvoiceData;
  settings: InvoiceSettings;
  updateInvoiceData: (data: Partial<InvoiceData>) => void;
  updateSettings: (settings: Partial<InvoiceSettings>) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<InvoiceItem>) => void;
  calculateTotals: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const defaultInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  companyName: 'Your Company Name',
  companyAddress: '123 Business St.\nCity, State 12345',
  companyPhone: '+1 (555) 123-4567',
  companyEmail: 'info@yourcompany.com',
  clientName: 'Client Name',
  clientAddress: '456 Client Ave.\nCity, State 67890',
  clientPhone: '+1 (555) 987-6543',
  clientEmail: 'client@email.com',
  items: [
    {
      id: '1',
      description: 'Service/Product Description',
      quantity: 1,
      rate: 100,
      amount: 100
    }
  ],
  subtotal: 100,
  taxRate: 10,
  taxAmount: 10,
  total: 110,
  notes: 'Thank you for your business!',
  terms: 'Payment is due within 30 days.',
  heading: 'Invoice'
};

const defaultSettings: InvoiceSettings = {
  template: 'modern',
  primaryColor: '#3b82f6',
  secondaryColor: '#64748b',
  fontFamily: 'Inter',
  fontSize: 'medium',
  alignment: 'left',
  darkMode: false
};

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [settings, setSettings] = useState<InvoiceSettings>(defaultSettings);

  const updateInvoiceData = (data: Partial<InvoiceData>) => {
    setInvoiceData(prev => ({ ...prev, ...data }));
  };

  const updateSettings = (newSettings: Partial<InvoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: 'New Item',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
    calculateTotals();
  };

  const updateItem = (id: string, itemData: Partial<InvoiceItem>) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id
          ? { ...item, ...itemData, amount: (itemData.quantity || item.quantity) * (itemData.rate || item.rate) }
          : item
      )
    }));
    calculateTotals();
  };

  const calculateTotals = () => {
    setTimeout(() => {
      setInvoiceData(prev => {
        const subtotal = prev.items.reduce((sum, item) => sum + item.amount, 0);
        const taxAmount = (subtotal * prev.taxRate) / 100;
        const total = subtotal + taxAmount;
        
        return {
          ...prev,
          subtotal,
          taxAmount,
          total
        };
      });
    }, 0);
  };

  return (
    <InvoiceContext.Provider value={{
      invoiceData,
      settings,
      updateInvoiceData,
      updateSettings,
      addItem,
      removeItem,
      updateItem,
      calculateTotals
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};

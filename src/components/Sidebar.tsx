
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, FileText, Palette, Settings } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { invoiceData, settings, updateInvoiceData, updateSettings, addItem, removeItem, updateItem } = useInvoice();

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
    { id: 'classic', name: 'Classic', description: 'Traditional business style' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
    { id: 'corporate', name: 'Corporate', description: 'Professional corporate' },
    { id: 'creative', name: 'Creative', description: 'Unique and artistic' }
  ];

  const colorPresets = [
    { name: 'Blue', primary: '#3b82f6', secondary: '#64748b' },
    { name: 'Green', primary: '#10b981', secondary: '#6b7280' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#6b7280' },
    { name: 'Red', primary: '#ef4444', secondary: '#6b7280' },
    { name: 'Orange', primary: '#f97316', secondary: '#6b7280' }
  ];

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-r border-gray-200 dark:border-slate-700 transition-transform duration-300 z-40 overflow-y-auto ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Content
            </TabsTrigger>
            <TabsTrigger value="design" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Design
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Invoice Details</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="heading">Invoice Heading</Label>
                  <Input
                    id="heading"
                    value={invoiceData.heading}
                    onChange={(e) => updateInvoiceData({ heading: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice #</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => updateInvoiceData({ invoiceNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={invoiceData.date}
                      onChange={(e) => updateInvoiceData({ date: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Company Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={invoiceData.companyName}
                    onChange={(e) => updateInvoiceData({ companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyAddress">Address</Label>
                  <Textarea
                    id="companyAddress"
                    value={invoiceData.companyAddress}
                    onChange={(e) => updateInvoiceData({ companyAddress: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input
                      id="companyPhone"
                      value={invoiceData.companyPhone}
                      onChange={(e) => updateInvoiceData({ companyPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      value={invoiceData.companyEmail}
                      onChange={(e) => updateInvoiceData({ companyEmail: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Client Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={invoiceData.clientName}
                    onChange={(e) => updateInvoiceData({ clientName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="clientAddress">Address</Label>
                  <Textarea
                    id="clientAddress"
                    value={invoiceData.clientAddress}
                    onChange={(e) => updateInvoiceData({ clientAddress: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Line Items</h3>
                <Button size="sm" onClick={addItem}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {invoiceData.items.map((item) => (
                  <div key={item.id} className="border rounded-md p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        className="text-xs"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="ml-2 p-1 h-6 w-6"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                        className="text-xs"
                      />
                      <Input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                        className="text-xs"
                      />
                      <Input
                        value={`${item.amount.toFixed(2)}`}
                        readOnly
                        className="text-xs bg-gray-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={invoiceData.taxRate}
                    onChange={(e) => updateInvoiceData({ taxRate: Number(e.target.value) })}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Templates</h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={settings.template === template.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => updateSettings({ template: template.id  })}
                  >
                    <div className="text-left">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs opacity-70">{template.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className="h-12 flex items-center gap-2"
                    onClick={() => updateSettings({ 
                      primaryColor: preset.primary, 
                      secondaryColor: preset.secondary 
                    })}
                  >
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: preset.primary }}
                    />
                    {preset.name}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Typography</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select value={settings.fontFamily} onValueChange={(value) => updateSettings({ fontFamily: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select value={settings.fontSize} onValueChange={(value) => updateSettings({ fontSize: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Additional Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={invoiceData.notes}
                    onChange={(e) => updateInvoiceData({ notes: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    value={invoiceData.terms}
                    onChange={(e) => updateInvoiceData({ terms: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

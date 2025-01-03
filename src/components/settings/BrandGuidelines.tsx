"use client";
import { useState, useEffect } from 'react';
import { Save, Plus, X } from 'lucide-react';
import type { BrandGuidelines as BrandGuidelinesType } from '@/types/organization';

export default function BrandGuidelines() {
  const [guidelines, setGuidelines] = useState<BrandGuidelinesType>({
    toneGuidelines: {
      formal: [],
      casual: [],
      technical: []
    },
    approvedPhrasing: {
      greetings: [],
      closings: [],
      transitions: [],
      productReferences: [],
      companyReferences: []
    },
    prohibitedPhrasing: {
      words: [],
      phrases: [],
      contexts: []
    },
    styleRules: {
      capitalization: [],
      punctuation: [],
      formatting: []
    },
    examples: [],
    industryTerms: []
  });

  const [newItem, setNewItem] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedGuidelines = localStorage.getItem('brandGuidelines');
    if (savedGuidelines) {
      setGuidelines(JSON.parse(savedGuidelines));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('brandGuidelines', JSON.stringify(guidelines));
    setTimeout(() => setIsSaving(false), 1000);
  };

  const addItemToArray = (
    category: keyof BrandGuidelinesType['approvedPhrasing'] | 
             keyof BrandGuidelinesType['toneGuidelines'] | 
             keyof BrandGuidelinesType['prohibitedPhrasing'],
    section: 'approvedPhrasing' | 'toneGuidelines' | 'prohibitedPhrasing'
  ) => {
    if (!newItem.trim()) return;
    
    setGuidelines(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [category]: [...prev[section][category], newItem]
      }
    }));
    setNewItem('');
  };

  const removeItem = (
    category: keyof BrandGuidelinesType['approvedPhrasing'] | 
             keyof BrandGuidelinesType['toneGuidelines'] | 
             keyof BrandGuidelinesType['prohibitedPhrasing'],
    section: 'approvedPhrasing' | 'toneGuidelines' | 'prohibitedPhrasing',
    index: number
  ) => {
    setGuidelines(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [category]: prev[section][category].filter((_, i) => i !== index)
      }
    }));
  };

  const ListSection = ({ 
    title, 
    items, 
    onAdd, 
    onRemove 
  }: { 
    title: string; 
    items: string[]; 
    onAdd: () => void; 
    onRemove: (index: number) => void; 
  }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <span>{item}</span>
            <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Add new item..."
            onKeyPress={(e) => e.key === 'Enter' && onAdd()}
          />
          <button
            onClick={onAdd}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Tone Guidelines */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tone Guidelines</h2>
        <div className="space-y-6">
          <ListSection
            title="Formal Tone"
            items={guidelines.toneGuidelines.formal}
            onAdd={() => addItemToArray('formal', 'toneGuidelines')}
            onRemove={(index) => removeItem('formal', 'toneGuidelines', index)}
          />
          <ListSection
            title="Casual Tone"
            items={guidelines.toneGuidelines.casual}
            onAdd={() => addItemToArray('casual', 'toneGuidelines')}
            onRemove={(index) => removeItem('casual', 'toneGuidelines', index)}
          />
          <ListSection
            title="Technical Tone"
            items={guidelines.toneGuidelines.technical}
            onAdd={() => addItemToArray('technical', 'toneGuidelines')}
            onRemove={(index) => removeItem('technical', 'toneGuidelines', index)}
          />
        </div>
      </section>

      {/* Approved Phrasing */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Approved Phrasing</h2>
        <div className="space-y-6">
          <ListSection
            title="Greetings"
            items={guidelines.approvedPhrasing.greetings}
            onAdd={() => addItemToArray('greetings', 'approvedPhrasing')}
            onRemove={(index) => removeItem('greetings', 'approvedPhrasing', index)}
          />
          <ListSection
            title="Closings"
            items={guidelines.approvedPhrasing.closings}
            onAdd={() => addItemToArray('closings', 'approvedPhrasing')}
            onRemove={(index) => removeItem('closings', 'approvedPhrasing', index)}
          />
          <ListSection
            title="Transitions"
            items={guidelines.approvedPhrasing.transitions}
            onAdd={() => addItemToArray('transitions', 'approvedPhrasing')}
            onRemove={(index) => removeItem('transitions', 'approvedPhrasing', index)}
          />
        </div>
      </section>

      {/* Prohibited Phrasing */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Prohibited Phrasing</h2>
        <div className="space-y-6">
          <ListSection
            title="Words to Avoid"
            items={guidelines.prohibitedPhrasing.words}
            onAdd={() => addItemToArray('words', 'prohibitedPhrasing')}
            onRemove={(index) => removeItem('words', 'prohibitedPhrasing', index)}
          />
          <ListSection
            title="Phrases to Avoid"
            items={guidelines.prohibitedPhrasing.phrases}
            onAdd={() => addItemToArray('phrases', 'prohibitedPhrasing')}
            onRemove={(index) => removeItem('phrases', 'prohibitedPhrasing', index)}
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
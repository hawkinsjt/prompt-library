"use client";
import React, { useState } from 'react';
import { Edit2, Save, Copy, Search, Plus, X } from 'lucide-react';

// Define our core data structures using TypeScript interfaces
interface Prompt {
  id: number;
  title: string;
  template: string;
  variables: string[];
  category: string;
}

interface OrgSettings {
  companyName: string;
  supportNames: string[];
  brandVoice: string;
}

interface NewPromptForm {
  isOpen: boolean;
  title: string;
  template: string;
  category: string;
}

const PromptManager = () => {
  // State management using React hooks
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  
  // Initialize with sample prompts - in a real app, these would come from a database
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: 1,
      title: 'Customer Support - General Response',
      template: 'As a {{companyName}} support representative, provide a {{brandVoice}} response to: {{customerQuery}}',
      variables: ['companyName', 'brandVoice', 'customerQuery'],
      category: 'Support',
    },
    {
      id: 2,
      title: 'Feature Request Acknowledgment',
      template: "Thank you for your suggestion to improve {{companyName}}! I'm {{supportName}}, and I'll make sure our product team hears about this.",
      variables: ['companyName', 'supportName'],
      category: 'Support',
    },
  ]);

  // Organization settings that will be used to replace variables in prompts
  const [orgSettings, setOrgSettings] = useState<OrgSettings>({
    companyName: 'Acme Corp',
    supportNames: ['Sarah', 'John', 'Maria'],
    brandVoice: 'friendly and professional',
  });

  // State for the new prompt form/modal
  const [newPromptForm, setNewPromptForm] = useState<NewPromptForm>({
    isOpen: false,
    title: '',
    template: '',
    category: 'Support',
  });

  // Helper function to extract variables from a template string
  const extractVariablesFromTemplate = (template: string) => {
    const matches = template.match(/{{(.*?)}}/g) || [];
    return matches.map((match) => match.replace(/[{}]/g, ''));
  };

  // Function to handle creating a new prompt
  const createNewPrompt = () => {
    if (newPromptForm.title.trim() && newPromptForm.template.trim()) {
      const newPrompt: Prompt = {
        id: prompts.length + 1,
        title: newPromptForm.title,
        template: newPromptForm.template,
        variables: extractVariablesFromTemplate(newPromptForm.template),
        category: newPromptForm.category,
      };

      setPrompts([...prompts, newPrompt]);
      setNewPromptForm({
        isOpen: false,
        title: '',
        template: '',
        category: 'Support',
      });
    }
  };

  // Function to save changes to an existing prompt
  const savePromptChanges = (prompt: Prompt) => {
    setPrompts((prevPrompts) =>
      prevPrompts.map((p) =>
        p.id === prompt.id
          ? { ...prompt, variables: extractVariablesFromTemplate(prompt.template) }
          : p
      )
    );
  };

  // Function to delete a prompt
  const deletePrompt = (promptId: number) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      setPrompts(prompts.filter((p) => p.id !== promptId));
      if (activePrompt?.id === promptId) {
        setActivePrompt(null);
      }
    }
  };

  // Function to replace variables in a template with actual values
  const replaceVariables = (template: string) => {
    let result = template;
    Object.entries(orgSettings).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, Array.isArray(value) ? value[0] : value);
    });
    return result;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-white border-r p-6 overflow-y-auto">
        {/* New Prompt Button */}
        <button
          onClick={() => setNewPromptForm({ ...newPromptForm, isOpen: true })}
          className="w-full mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Prompt
        </button>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        {/* Prompt List */}
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => setActivePrompt(prompt)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activePrompt?.id === prompt.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium mb-2">{prompt.title}</h3>
              <div className="text-sm text-gray-500">
                Category: {prompt.category}
                <br />
                Variables: {prompt.variables.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activePrompt ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{activePrompt.title}</h2>
              <div className="space-x-2">
                <button 
                  onClick={() => deletePrompt(activePrompt.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Copy className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => savePromptChanges(activePrompt)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <textarea
                  className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                  value={activePrompt.template}
                  onChange={(e) => setActivePrompt({
                    ...activePrompt,
                    template: e.target.value
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview with Organization Settings
                </label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  {replaceVariables(activePrompt.template)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Organization Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Company Name</label>
                    <input
                      type="text"
                      value={orgSettings.companyName}
                      onChange={(e) => setOrgSettings({
                        ...orgSettings,
                        companyName: e.target.value
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Brand Voice</label>
                    <input
                      type="text"
                      value={orgSettings.brandVoice}
                      onChange={(e) => setOrgSettings({
                        ...orgSettings,
                        brandVoice: e.target.value
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            Select a prompt to start editing
          </div>
        )}
      </div>

      {/* New Prompt Modal */}
      {newPromptForm.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create New Prompt</h3>
              <button
                onClick={() => setNewPromptForm({ ...newPromptForm, isOpen: false })}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newPromptForm.title}
                  onChange={(e) => setNewPromptForm({ ...newPromptForm, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., Customer Support Response"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template
                </label>
                <textarea
                  value={newPromptForm.template}
                  onChange={(e) => setNewPromptForm({ ...newPromptForm, template: e.target.value })}
                  className="w-full h-32 p-2 border rounded-md font-mono text-sm"
                  placeholder="Enter your prompt template using {{variables}} for dynamic content"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newPromptForm.category}
                  onChange={(e) => setNewPromptForm({ ...newPromptForm, category: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Support">Support</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setNewPromptForm({ ...newPromptForm, isOpen: false })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={createNewPrompt}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptManager;
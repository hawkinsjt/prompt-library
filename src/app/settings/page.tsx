"use client";
import { useState } from 'react';
import Link from 'next/link';
import OrganizationProfile from '@/components/settings/OrganizationProfile';
import BrandGuidelines from '@/components/settings/BrandGuidelines';

export default function SettingsPage() {
  // We use state to manage which settings tab is currently active
  const [activeSection, setActiveSection] = useState<'profile' | 'brand'>('profile');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with navigation back to main page */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Organization Settings
            </h1>
            <Link 
              href="/"
              className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Back to Prompts
            </Link>
          </div>
        </div>
      </header>

      {/* Main settings area with tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Tab navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Settings sections">
              <button
                onClick={() => setActiveSection('profile')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Organization Profile
              </button>
              <button
                onClick={() => setActiveSection('brand')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'brand'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Brand Guidelines
              </button>
            </nav>
          </div>

          {/* Content area that shows either profile or brand settings */}
          <div className="p-6">
            {activeSection === 'profile' ? (
              <OrganizationProfile />
            ) : (
              <BrandGuidelines />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
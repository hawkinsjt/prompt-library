"use client";
import Link from 'next/link';
import PromptManager from '@/components/PromptManager';

export default function Home() {
  // We use a clean, simple layout that focuses on the prompt manager
  // while providing easy access to settings
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header bar with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Prompt Library
            </h1>
            <div className="flex items-center space-x-4">
              <Link 
                href="/settings"
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Organization Settings
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PromptManager />
      </div>
    </main>
  );
}
"use client";
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import type { OrganizationProfile as OrgProfileType } from '@/types/organization';

export default function OrganizationProfile() {
  const [profile, setProfile] = useState<OrgProfileType>({
    companyName: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    industry: '',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    logoUrl: '',
    socialMediaHandles: {
      twitter: '',
      linkedin: '',
      facebook: '',
      instagram: ''
    },
    brandPersonality: '',
    coreTone: '',
    valueProposition: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('orgProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('orgProfile', JSON.stringify(profile));
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={profile.contactEmail}
              onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              value={profile.contactPhone}
              onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <input
              type="text"
              value={profile.industry}
              onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Brand Voice */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Brand Voice</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Personality
            </label>
            <textarea
              value={profile.brandPersonality}
              onChange={(e) => setProfile({ ...profile, brandPersonality: e.target.value })}
              className="w-full p-2 border rounded-md h-24"
              placeholder="Describe your brand's personality..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Core Tone
            </label>
            <textarea
              value={profile.coreTone}
              onChange={(e) => setProfile({ ...profile, coreTone: e.target.value })}
              className="w-full p-2 border rounded-md h-24"
              placeholder="Describe your brand's tone of voice..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value Proposition
            </label>
            <textarea
              value={profile.valueProposition}
              onChange={(e) => setProfile({ ...profile, valueProposition: e.target.value })}
              className="w-full p-2 border rounded-md h-24"
              placeholder="What makes your company unique..."
            />
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="text"
              value={profile.socialMediaHandles.twitter}
              onChange={(e) => setProfile({
                ...profile,
                socialMediaHandles: { ...profile.socialMediaHandles, twitter: e.target.value }
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              value={profile.socialMediaHandles.linkedin}
              onChange={(e) => setProfile({
                ...profile,
                socialMediaHandles: { ...profile.socialMediaHandles, linkedin: e.target.value }
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="text"
              value={profile.socialMediaHandles.facebook}
              onChange={(e) => setProfile({
                ...profile,
                socialMediaHandles: { ...profile.socialMediaHandles, facebook: e.target.value }
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="text"
              value={profile.socialMediaHandles.instagram}
              onChange={(e) => setProfile({
                ...profile,
                socialMediaHandles: { ...profile.socialMediaHandles, instagram: e.target.value }
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
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
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 font-serif">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">At Sahaj Agri Marketplace, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>We collect only necessary information for registration, order processing, and support.</li>
          <li>Your data is never sold or shared with third parties for marketing purposes.</li>
          <li>All transactions and personal details are encrypted and securely stored.</li>
          <li>We use cookies only to enhance your experience and site functionality.</li>
          <li>You can request to view, update, or delete your data at any time.</li>
          <li>We comply with all applicable data protection laws in India.</li>
        </ul>
        <p className="text-gray-700 mb-2">For any privacy-related questions, please contact us at <a href="mailto:support@sahaj.com" className="text-green-700 underline">support@sahaj.com</a>.</p>
        <p className="text-xs text-gray-500 mt-8 text-center">Last updated: September 29, 2025</p>
      </div>
    </div>
  );
}

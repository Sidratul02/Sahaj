import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 font-serif">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Contact Us</h1>
        <p className="mb-6 text-gray-700 text-center">We’re here to help! Reach out to us for support, feedback, or partnership opportunities.</p>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-green-800">
            <Phone className="w-5 h-5" />
            <span>+91 1800-123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-green-800">
            <Mail className="w-5 h-5" />
            <span>support@sahaj.com</span>
          </div>
          <div className="flex items-center gap-3 text-green-800">
            <MapPin className="w-5 h-5" />
            <span>Sahaj Agriculture Center, Delhi, India</span>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input type="text" className="w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea className="w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" rows={4} placeholder="Type your message..."></textarea>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Send Message</button>
        </form>
      </div>
    </div>
  );
}

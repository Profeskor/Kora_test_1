import React, { useState } from 'react';
import { Home, CreditCard, FileText, Receipt, AlertCircle } from 'lucide-react';
import { PaymentsSection } from '../PaymentsSection';

interface HomeownerHomeProps {
  userName: string;
}

export function HomeownerHome({ userName }: HomeownerHomeProps) {
  const [showPayments, setShowPayments] = useState(false);
  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Welcome, {userName}!</h1>
        <p className="text-gray-500 text-sm">Manage your property</p>
      </div>

      {/* Upcoming Payment Card (future-facing tone) */}
      <div className="bg-gradient-to-br from-[#005B78] to-[#003F54] rounded-3xl p-6 sm:p-8 mb-6 text-white">
        <p className="text-[#CCE5EB] mb-2 text-sm">Upcoming Payment</p>
        <h2 className="mb-4 text-3xl sm:text-4xl">AED 15,000</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-[#CCE5EB] text-xs sm:text-sm mb-1">Scheduled</p>
            <p className="text-sm sm:text-base">Q1 2026 (Estimated)</p>
          </div>
          <div>
            <p className="text-[#CCE5EB] text-xs sm:text-sm mb-1">Amount</p>
            <p className="text-sm sm:text-base">AED 15,000</p>
          </div>
        </div>
        <button onClick={() => setShowPayments(true)} className="w-full sm:w-auto px-6 py-3 bg-white text-[#005B78] rounded-xl hover:bg-gray-100 transition-colors">
          Pay Now
        </button>
      </div>

      {/* Property Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#CCE5EB] rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-[#005B78]" />
          </div>
          <div>
            <h3 className="text-gray-900">My Property</h3>
            <p className="text-gray-500 text-sm">Marina Heights, Unit 1205</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Customer ID</p>
            <p className="text-gray-900">CUST-12345</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Unit Type</p>
            <p className="text-gray-900">2 BHK</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">Make Payment</p>
        </button>

        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Receipt className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">Payment History</p>
        </button>

        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">Documents</p>
        </button>

        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">Support</p>
        </button>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Recent Payments</h3>
          <button className="text-[#005B78] text-sm hover:text-[#004760]">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { date: 'Dec 15, 2024', amount: 'AED 15,000', status: 'Completed' },
            { date: 'Nov 15, 2024', amount: 'AED 15,000', status: 'Completed' },
            { date: 'Oct 15, 2024', amount: 'AED 15,000', status: 'Completed' },
          ].map((payment, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 text-sm">{payment.date}</p>
                <p className="text-gray-500 text-xs">{payment.status}</p>
              </div>
              <p className="text-gray-900">{payment.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <p className="text-blue-800 text-sm">
          💡 <strong>Phase 2 Coming Soon:</strong> Visitor management, amenity booking, and service requests will be available once your unit is ready for occupancy.
        </p>
      </div>
    </div>
    {showPayments && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-center p-4">
        <div className="w-full max-w-3xl bg-transparent">
          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="p-4">
              <button onClick={() => setShowPayments(false)} className="text-sm text-[#005B78] mb-4">Close</button>
              <PaymentsSection userType="homeowner" />
            </div>
          </div>
        </div>
      </div>
    )}
  );
}

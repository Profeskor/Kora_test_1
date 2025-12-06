import { useState } from 'react';
import { 
  Home, FileText, CreditCard, Users, Settings, 
  LogOut, Bell, Calendar, Wrench, Package, Menu, X, Car, UserPlus, Book 
} from 'lucide-react';
import { DocumentsSection } from './DocumentsSection';
import { PaymentsSection } from './PaymentsSection';
import { ServicesSection } from './ServicesSection';
import { CommunitySection } from './CommunitySection';
import { VisitorManagement } from './services/VisitorManagement';
import { AmenityBooking } from './services/AmenityBooking';
import { ParkingAccess } from './services/ParkingAccess';
import { CommunityDirectory } from './services/CommunityDirectory';
import type { User } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'documents' | 'payments' | 'services' | 'community' | 'visitors' | 'amenities' | 'parking' | 'directory'>('home');
  const [showSidebar, setShowSidebar] = useState(false);

  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'documents' as const, label: 'Documents', icon: FileText },
    { id: 'payments' as const, label: 'Payments', icon: CreditCard },
    { id: 'services' as const, label: 'Services', icon: Wrench },
    { id: 'visitors' as const, label: 'Visitors', icon: UserPlus },
    { id: 'amenities' as const, label: 'Amenities', icon: Calendar },
    { id: 'parking' as const, label: 'Parking', icon: Car },
    { id: 'community' as const, label: 'Community', icon: Users },
    { id: 'directory' as const, label: 'Directory', icon: Book },
  ];

  const onTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - Mobile: Hidden by default, Desktop: Always visible */}
      <div className={`${
        showSidebar ? 'fixed inset-0 z-50 md:relative' : 'hidden md:block'
      } md:w-64 bg-white border-r border-gray-200`}>
        {/* Mobile overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
        
        {/* Sidebar content */}
        <div className="relative z-10 w-64 md:w-full h-full bg-white">
          <div className="p-4 md:p-6">
            {/* Close button for mobile */}
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005B78] rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900">Kora</span>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#CCE5EB] rounded-full flex items-center justify-center">
                  <span className="text-[#005B78]">{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm truncate">{user.name}</p>
                  <p className="text-gray-500 text-xs truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setShowSidebar(false); // Close sidebar on mobile after selection
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#E6F2F5] text-[#005B78]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logout button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 border-t border-gray-200 bg-white">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-lg text-gray-900">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          {activeTab === 'home' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-gray-900 mb-1">Welcome back, {user.name}!</h1>
                  <p className="text-gray-500">Here's what's happening with your property</p>
                </div>
                <button className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 mb-1">Next Payment</p>
                  <p className="text-gray-900">$1,500</p>
                  <p className="text-green-600 text-sm mt-1">Due in 5 days</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 mb-1">Documents</p>
                  <p className="text-gray-900">8 files</p>
                  <p className="text-gray-500 text-sm mt-1">All up to date</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 mb-1">Open Requests</p>
                  <p className="text-gray-900">2 active</p>
                  <p className="text-orange-600 text-sm mt-1">1 pending</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { icon: Calendar, title: 'Community BBQ Event', desc: 'Saturday, 2:00 PM at Pool Area', color: 'blue' },
                    { icon: Package, title: 'Package Delivered', desc: 'Available for pickup at lobby', color: 'green' },
                    { icon: Wrench, title: 'Maintenance Complete', desc: 'AC repair finished', color: 'purple' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className={`w-10 h-10 bg-${item.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${item.color}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900">{item.title}</p>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && <DocumentsSection />}
          {activeTab === 'payments' && <PaymentsSection userType={user.role!} />}
          {activeTab === 'services' && <ServicesSection />}
          {activeTab === 'community' && <CommunitySection />}
          {activeTab === 'visitors' && <VisitorManagement />}
          {activeTab === 'amenities' && <AmenityBooking />}
          {activeTab === 'parking' && <ParkingAccess />}
          {activeTab === 'directory' && <CommunityDirectory />}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Home, Search, Heart, Users, Calendar, Bell } from 'lucide-react';
import { Toaster } from 'sonner@2.0.3';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { OnboardingCarousel } from './components/onboarding/OnboardingCarousel';
import { LandingPage } from './components/LandingPage';
import { UnifiedAuthPage } from './components/auth/UnifiedAuthPage';
import { RegistrationFlow } from './components/registration/RegistrationFlow';
import { MultiRoleSelector, UserRole } from './components/auth/MultiRoleSelector';
import { QuickPayScreen } from './components/QuickPayScreen';
import { BrokerHome } from './components/broker/BrokerHome';
import { BuyerHome } from './components/buyer/BuyerHome';
import { HomeownerHome } from './components/homeowner/HomeownerHome';
import { GuestHome } from './components/guest/GuestHome';
import { SignInRequired } from './components/guest/SignInRequired';
import { PropertySearch } from './components/broker/PropertySearch';
import { PropertyDetail } from './components/broker/PropertyDetail';
import { LeadManagement } from './components/broker/LeadManagement';
import { CreateLead } from './components/broker/CreateLead';
import { LeadDetail } from './components/broker/LeadDetail';
import { BookingManagement } from './components/broker/BookingManagement';
import { BookingDetail } from './components/broker/BookingDetail';
import { Shortlist } from './components/broker/Shortlist';
import { CompareProperties } from './components/broker/CompareProperties';
import { getPropertiesByIds } from './data/properties';

type Screen = 
  | 'splash'
  | 'onboarding'
  | 'landing'
  | 'auth'
  | 'registration'
  | 'multi-role-selector'
  | 'quick-pay'
  | 'app'
  | 'property-search'
  | 'property-detail'
  | 'my-leads'
  | 'lead-detail'
  | 'create-lead'
  | 'my-bookings'
  | 'booking-detail'
  | 'compare-properties';

type AppTab = 'home' | 'search' | 'shortlist' | 'leads' | 'booking';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  roles: UserRole[];
  currentRole?: UserRole;
  preferredRole?: UserRole; // For "Remember my choice" feature
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [showRoleSwitchModal, setShowRoleSwitchModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [comparisonList, setComparisonList] = useState<string[]>([]); // Array of property IDs

  // Splash and onboarding handlers
  const handleSplashComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('landing');
  };

  // Landing page handlers
  const handleExploreProperties = () => {
    // Create a guest user and start the app in guest mode
    const guestUser: AppUser = {
      id: 'guest-user',
      name: 'Guest',
      email: '',
      mobile: '',
      roles: ['guest'],
      currentRole: 'guest',
      preferredRole: undefined,
    };

    setUser(guestUser);
    setCurrentScreen('app');
  };

  const handleLoginRegister = () => {
    setCurrentScreen('auth');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('registration');
  };

  const handleQuickPay = () => {
    setCurrentScreen('quick-pay');
  };

  // Demo login handler for testing multi-role flow
  const handleDemoLogin = () => {
    // Create demo user with multiple roles
    const demoUser: AppUser = {
      id: 'demo-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@demo.com',
      mobile: '+971 50 987 6543',
      roles: ['broker', 'homeowner'], // Multiple roles for testing
      currentRole: undefined,
      preferredRole: undefined,
    };

    setUser(demoUser);
    setCurrentScreen('multi-role-selector');
  };

  // Role selection handlers
  const handleRoleSelected = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentScreen('auth');
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setCurrentScreen('role-selection');
  };

  // Auth handlers
  const handleAuthSuccess = (role: UserRole) => {
    // Simulate user with potentially multiple roles
    // In real app, this would come from backend
    const mockUser: AppUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '+971 50 123 4567',
      roles: ['broker', 'homeowner'], // Example: User has multiple roles
      currentRole: undefined,
      preferredRole: undefined,
    };

    setUser(mockUser);

    // Check if user has multiple roles AND no preferred role saved
    if (mockUser.roles.length > 1 && !mockUser.preferredRole) {
      setCurrentScreen('multi-role-selector');
    } else {
      // Use preferred role or the only available role
      const roleToUse = mockUser.preferredRole || mockUser.roles[0];
      setUser({ ...mockUser, currentRole: roleToUse });
      setCurrentScreen('app');
    }
  };

  const handleBackToAuth = () => {
    setCurrentScreen('landing');
  };

  // Multi-role selector handler with "Remember my choice" support
  const handleSelectActiveRole = (role: UserRole, rememberChoice?: boolean) => {
    if (user) {
      const updatedUser = {
        ...user,
        currentRole: role,
        preferredRole: rememberChoice ? role : user.preferredRole,
      };
      setUser(updatedUser);
      
      // If we're in the modal (switching roles), close it and stay in app
      if (showRoleSwitchModal) {
        setShowRoleSwitchModal(false);
      } else {
        // If we're in the initial role selection screen, go to app
        setCurrentScreen('app');
      }
    }
  };

  // Quick pay handlers
  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  // App navigation
  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setActiveTab('home');
    setCurrentScreen('landing');
  };

  const handleSwitchRole = () => {
    if (user && user.roles.length > 1) {
      setCurrentScreen('multi-role-selector');
    }
  };

  // Render role-specific home screen
  const renderRoleHome = () => {
    if (!user || !user.currentRole) return null;

    const userName = user.name.split(' ')[0]; // First name only

    switch (user.currentRole) {
      case 'broker':
        return <BrokerHome userName={userName} onNavigate={setCurrentScreen} comparisonCount={comparisonList.length} />;
      case 'buyer':
        return <BuyerHome userName={userName} />;
      case 'homeowner':
        return <HomeownerHome userName={userName} />;
      case 'guest':
        return <GuestHome userName={userName} />;
      default:
        return null;
    }
  };

  // Splash screen
  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Onboarding carousel
  if (currentScreen === 'onboarding') {
    return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
  }

  // Landing page
  if (currentScreen === 'landing') {
    return (
      <LandingPage
        onExploreProperties={handleExploreProperties}
        onLoginRegister={handleLoginRegister}
        onCreateAccount={handleCreateAccount}
        onQuickPay={handleQuickPay}
        onDemoLogin={handleDemoLogin}
      />
    );
  }

  // Auth screen
  if (currentScreen === 'auth') {
    return (
      <UnifiedAuthPage
        onSuccess={handleAuthSuccess}
        onBack={handleBackToAuth}
        onQuickPay={() => setCurrentScreen('quick-pay')}
      />
    );
  }

  // Registration screen
  if (currentScreen === 'registration') {
    return (
      <RegistrationFlow
        onComplete={handleBackToLanding}
        onBack={() => setCurrentScreen('landing')}
      />
    );
  }

  // Multi-role selector
  if (currentScreen === 'multi-role-selector' && user) {
    return (
      <MultiRoleSelector
        availableRoles={user.roles}
        onSelectRole={handleSelectActiveRole}
        userName={user.name.split(' ')[0]}
        onBack={() => setCurrentScreen('landing')}
      />
    );
  }

  // Quick pay screen
  if (currentScreen === 'quick-pay') {
    return <QuickPayScreen onBack={() => setCurrentScreen('auth')} />;
  }

  // Broker-specific screens
  if (currentScreen === 'property-search') {
    return (
      <PropertySearch
        onPropertySelect={(propertyId) => {
          setSelectedPropertyId(propertyId);
          setShowPropertyDetail(true);
        }}
        onBack={() => setCurrentScreen('app')}
      />
    );
  }

  if (currentScreen === 'property-detail' && selectedPropertyId) {
    return (
      <PropertyDetail
        propertyId={selectedPropertyId}
        onBack={() => setShowPropertyDetail(false)}
        onAddToLead={() => {
          setCurrentScreen('create-lead');
        }}
        onBookNow={() => {
          // For now, navigate to bookings tab where they can create a booking
          // In future, this could open a create booking modal or dedicated screen
          setShowPropertyDetail(false);
          setActiveTab('booking');
          setCurrentScreen('my-bookings');
        }}
        onAddToComparison={(propertyId) => {
          // Add property to comparison list if not already there (max 4 properties)
          let result: 'added' | 'duplicate' | 'limit_reached' = 'added';
          setComparisonList(prev => {
            if (prev.includes(propertyId)) {
              result = 'duplicate';
              return prev; // Already in comparison
            }
            if (prev.length >= 4) {
              result = 'limit_reached';
              return prev; // Max 4 properties
            }
            return [...prev, propertyId];
          });
          return result;
        }}
      />
    );
  }

  if (currentScreen === 'my-leads') {
    return (
      <LeadManagement
        onBack={() => setCurrentScreen('app')}
        onCreateLead={() => setCurrentScreen('create-lead')}
        onLeadSelect={(leadId) => {
          setSelectedLeadId(leadId);
          setCurrentScreen('lead-detail');
        }}
      />
    );
  }

  if (currentScreen === 'lead-detail' && selectedLeadId) {
    return (
      <LeadDetail
        leadId={selectedLeadId}
        onBack={() => setCurrentScreen('my-leads')}
        onEdit={(leadId) => {
          // For now, just go back to lead management where the edit modal will open
          // In future, you could pass edit state to LeadManagement
          setCurrentScreen('my-leads');
        }}
      />
    );
  }

  if (currentScreen === 'create-lead') {
    return (
      <CreateLead
        onBack={() => setCurrentScreen('my-leads')}
        onSave={() => {
          alert('Lead created successfully!');
          setCurrentScreen('my-leads');
        }}
      />
    );
  }

  if (currentScreen === 'my-bookings') {
    return (
      <BookingManagement
        onBack={() => setCurrentScreen('app')}
        onBookingSelect={(bookingId) => {
          setSelectedBookingId(bookingId);
          setCurrentScreen('booking-detail');
        }}
      />
    );
  }

  if (currentScreen === 'booking-detail' && selectedBookingId) {
    return (
      <BookingDetail
        bookingId={selectedBookingId}
        onBack={() => setCurrentScreen('my-bookings')}
        onEdit={(bookingId) => {
          // For now, just go back to booking management
          setCurrentScreen('my-bookings');
        }}
      />
    );
  }

  if (currentScreen === 'compare-properties') {
    // Get the full property data for comparison
    const comparisonProperties = getPropertiesByIds(comparisonList).map(prop => ({
      id: prop.id,
      name: prop.name,
      project: prop.project,
      location: prop.location,
      price: prop.price,
      size: prop.size,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      status: prop.status,
      type: prop.type,
      image: prop.images[0], // Use first image for comparison view
      amenities: prop.amenities,
      features: prop.features,
      handoverDate: prop.handoverDate,
    }));

    return (
      <CompareProperties
        properties={comparisonProperties}
        onBack={() => setCurrentScreen('app')}
        onRemoveProperty={(propertyId) => {
          setComparisonList(prev => prev.filter(id => id !== propertyId));
        }}
        onPropertySelect={(propertyId) => {
          setSelectedPropertyId(propertyId);
          setCurrentScreen('property-detail');
        }}
      />
    );
  }

  // Main app with bottom navigation
  if (currentScreen === 'app' && user && user.currentRole) {
    return (
      <>
        <Toaster position="bottom-center" richColors />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Top Header - Mobile */}
          <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="w-10 h-10 bg-gradient-to-br from-[#005B78] to-[#007a9e] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-white">{user.name.charAt(0)}</span>
                </button>
                <div>
                  <h1 className="text-[rgb(0,91,120)]">Hello, {user.name.split(' ')[0]}</h1>
                </div>
              </div>
              <button 
                onClick={() => setShowNotifications(true)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {/* Notification badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* Profile Modal */}
          {showProfileModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
              <div className="bg-white w-full sm:w-[400px] sm:rounded-3xl rounded-t-3xl p-6 animate-slide-up">
                {/* Close button */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-gray-900">Profile</h2>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <span className="text-gray-600">×</span>
                  </button>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#005B78] to-[#007a9e] rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-2xl">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-sm">{user.mobile}</p>
                  </div>
                </div>

                {/* Roles */}
                {user.roles.length > 1 && (
                  <div className="mb-6">
                    <p className="text-gray-700 mb-2 text-sm">Your Roles</p>
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="px-3 py-1 bg-[#E6F2F5] text-[#005B78] rounded-full text-sm capitalize"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {user.roles.length > 1 && (
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      handleSwitchRole();
                    }}
                    className="w-full px-6 py-3 bg-[#E6F2F5] text-[#005B78] rounded-xl hover:bg-[#CCE5EB] transition-colors mb-3"
                  >
                    Switch Role
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    handleLogout();
                  }}
                  className="w-full px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Notifications Modal */}
          {showNotifications && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center" onClick={() => setShowNotifications(false)}>
              <div className="bg-white w-full sm:w-[400px] sm:rounded-3xl rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-gray-900">Notifications</h2>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <span className="text-gray-600">×</span>
                  </button>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                  {/* New Lead Notification */}
                  <div className="bg-[#E6F2F5] border border-[#005B78]/20 rounded-xl p-4 hover:bg-[#CCE5EB] transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-[#005B78] rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 text-sm mb-1">New Lead Assigned</h3>
                        <p className="text-gray-600 text-xs mb-2">Ahmed Hassan is interested in Marina Heights Unit 205</p>
                        <p className="text-gray-500 text-xs">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Confirmed */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 text-sm mb-1">Booking Confirmed</h3>
                        <p className="text-gray-600 text-xs mb-2">Site visit for Sky Gardens scheduled for Dec 8, 2024</p>
                        <p className="text-gray-500 text-xs">5 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Property Update */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 text-sm mb-1">New Properties Available</h3>
                        <p className="text-gray-600 text-xs mb-2">5 new units added to Bay East Tower</p>
                        <p className="text-gray-500 text-xs">1 day ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Commission Update */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 text-sm mb-1">Special Commission Offer</h3>
                        <p className="text-gray-600 text-xs mb-2">Extra 2% commission on Marina Heights until Dec 31</p>
                        <p className="text-gray-500 text-xs">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mark All as Read */}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-6 px-6 py-3 text-[#005B78] text-sm hover:bg-[#E6F2F5] rounded-xl transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto pb-20">
            {activeTab === 'home' && !showPropertyDetail && renderRoleHome()}
            {activeTab === 'search' && !showPropertyDetail && (
              <PropertySearch
                onPropertySelect={(propertyId) => {
                  setSelectedPropertyId(propertyId);
                  setShowPropertyDetail(true);
                }}
                onBack={() => setActiveTab('home')}
              />
            )}
            {activeTab === 'search' && showPropertyDetail && selectedPropertyId && (
              <PropertyDetail
                propertyId={selectedPropertyId}
                onBack={() => setShowPropertyDetail(false)}
                onAddToLead={() => {
                  setShowPropertyDetail(false);
                  setCurrentScreen('create-lead');
                }}
                onBookNow={() => {
                  // Navigate to bookings section
                  setShowPropertyDetail(false);
                  setActiveTab('booking');
                }}
                onAddToComparison={(propertyId) => {
                  // Add property to comparison list if not already there (max 4 properties)
                  let result: 'added' | 'duplicate' | 'limit_reached' = 'added';
                  setComparisonList(prev => {
                    if (prev.includes(propertyId)) {
                      result = 'duplicate';
                      return prev; // Already in comparison
                    }
                    if (prev.length >= 4) {
                      result = 'limit_reached';
                      return prev; // Max 4 properties
                    }
                    return [...prev, propertyId];
                  });
                  return result;
                }}
              />
            )}
            {activeTab === 'shortlist' && (
              user.currentRole === 'guest' ? (
                <SignInRequired
                  feature="Shortlist"
                  onSignIn={() => setCurrentScreen('auth')}
                  onCreateAccount={() => setCurrentScreen('registration')}
                />
              ) : (
                <Shortlist
                  onBack={() => setActiveTab('home')}
                  onPropertySelect={(propertyId) => {
                    setSelectedPropertyId(propertyId);
                    setShowPropertyDetail(true);
                  }}
                />
              )
            )}
            {activeTab === 'leads' && (
              user.currentRole === 'guest' ? (
                <SignInRequired
                  feature="Leads"
                  onSignIn={() => setCurrentScreen('auth')}
                  onCreateAccount={() => setCurrentScreen('registration')}
                />
              ) : (
                <LeadManagement
                  onBack={() => setActiveTab('home')}
                  onCreateLead={() => setCurrentScreen('create-lead')}
                  onLeadSelect={(leadId) => {
                    setSelectedLeadId(leadId);
                    setCurrentScreen('lead-detail');
                  }}
                />
              )
            )}
            {activeTab === 'booking' && (
              user.currentRole === 'guest' ? (
                <SignInRequired
                  feature="Bookings"
                  onSignIn={() => setCurrentScreen('auth')}
                  onCreateAccount={() => setCurrentScreen('registration')}
                />
              ) : (
                <BookingManagement
                  onBack={() => setActiveTab('home')}
                  onBookingSelect={(bookingId) => {
                    setSelectedBookingId(bookingId);
                    setCurrentScreen('booking-detail');
                  }}
                />
              )
            )}
          </div>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-around max-w-lg mx-auto">
              {/* Home Tab - Visible for all roles */}
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative ${
                  activeTab === 'home' ? 'text-[#005B78]' : 'text-gray-500'
                }`}
              >
                {activeTab === 'home' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005B78] rounded-b-full"></div>
                )}
                <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-[#005B78]/10' : ''}`} />
                <span className="text-xs">{activeTab === 'home' ? <strong>Home</strong> : 'Home'}</span>
              </button>

              {/* Properties Tab - Visible for all roles */}
              <button
                onClick={() => setActiveTab('search')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative ${
                  activeTab === 'search' ? 'text-[#005B78]' : 'text-gray-500'
                }`}
              >
                {activeTab === 'search' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005B78] rounded-b-full"></div>
                )}
                <Search className={`w-6 h-6 ${activeTab === 'search' ? 'fill-[#005B78]/10' : ''}`} />
                <span className="text-xs">{activeTab === 'search' ? <strong>Properties</strong> : 'Properties'}</span>
              </button>

              {/* Shortlist Tab - Visible for all roles including guests */}
              <button
                onClick={() => setActiveTab('shortlist')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative ${
                  activeTab === 'shortlist' ? 'text-[#005B78]' : 'text-gray-500'
                }`}
              >
                {activeTab === 'shortlist' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005B78] rounded-b-full"></div>
                )}
                <Heart className={`w-6 h-6 ${activeTab === 'shortlist' ? 'fill-[#005B78]/10' : ''}`} />
                <span className="text-xs">{activeTab === 'shortlist' ? <strong>Shortlist</strong> : 'Shortlist'}</span>
              </button>

              {/* Leads Tab - Visible for Brokers and Guests (guests see restriction screen) */}
              {(user.currentRole === 'broker' || user.currentRole === 'guest') && (
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative ${
                    activeTab === 'leads' ? 'text-[#005B78]' : 'text-gray-500'
                  }`}
                >
                  {activeTab === 'leads' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005B78] rounded-b-full"></div>
                  )}
                  <Users className={`w-6 h-6 ${activeTab === 'leads' ? 'fill-[#005B78]/10' : ''}`} />
                  <span className="text-xs">{activeTab === 'leads' ? <strong>Leads</strong> : 'Leads'}</span>
                </button>
              )}

              {/* Bookings Tab - Visible for Brokers and Guests (guests see restriction screen) */}
              {(user.currentRole === 'broker' || user.currentRole === 'guest') && (
                <button
                  onClick={() => setActiveTab('booking')}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative ${
                    activeTab === 'booking' ? 'text-[#005B78]' : 'text-gray-500'
                  }`}
                >
                  {activeTab === 'booking' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005B78] rounded-b-full"></div>
                  )}
                  <Calendar className={`w-6 h-6 ${activeTab === 'booking' ? 'fill-[#005B78]/10' : ''}`} />
                  <span className="text-xs">{activeTab === 'booking' ? <strong>Bookings</strong> : 'Bookings'}</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </>
    );
  }

  return null;
}
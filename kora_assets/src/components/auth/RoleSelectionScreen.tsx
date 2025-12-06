import { Building2, User, Home, Briefcase, ArrowLeft } from 'lucide-react';

export type UserRole = 'broker' | 'buyer' | 'homeowner' | 'guest';

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRole) => void;
  mode: 'register' | 'login';
  onBack?: () => void;
}

export function RoleSelectionScreen({ onSelectRole, mode, onBack }: RoleSelectionScreenProps) {
  const roles = [
    {
      id: 'broker' as UserRole,
      title: 'Broker',
      description: 'Manage leads, track bookings, and access live inventory',
      icon: Briefcase,
      color: 'purple',
      features: ['Lead Management', 'Live Inventory', 'Commission Tracking', 'Client Database'],
    },
    {
      id: 'buyer' as UserRole,
      title: 'Buyer / Customer',
      description: 'Explore properties and express interest in available units',
      icon: User,
      color: 'blue',
      features: ['Property Search', 'Express Interest', 'Save Favorites', 'Schedule Visits'],
    },
    {
      id: 'homeowner' as UserRole,
      title: 'Homeowner',
      description: 'Manage your property, documents, and payments',
      icon: Home,
      color: 'green',
      features: ['Property Info', 'Payment Management', 'Document Vault', 'Service Requests'],
    },
    {
      id: 'guest' as UserRole,
      title: 'Guest',
      description: 'Explore properties and express interest in available units',
      icon: User,
      color: 'gray',
      features: ['Property Search', 'Express Interest', 'Save Favorites', 'Schedule Visits'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB]">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#005B78] mb-6 hover:text-[#004760] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-[#005B78] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-[#005B78] mb-2 text-2xl sm:text-3xl">Welcome to Kora</h1>
          </div>
          <h2 className="text-gray-900 mb-2">
            {mode === 'register' ? 'Create Your Account' : 'Continue As'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {mode === 'register' 
              ? 'Select your role to get started' 
              : 'Choose how you want to access Kora'}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#005B78] text-left group"
              >
                <div className={`w-16 h-16 bg-${role.color}-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 text-${role.color}-600`} />
                </div>
                
                <h3 className="text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                
                <div className="space-y-2 mb-6">
                  {role.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#005B78] rounded-full" />
                      <span className="text-gray-500 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-[#005B78] text-sm">Select</span>
                  <div className="w-6 h-6 rounded-full border-2 border-[#005B78] flex items-center justify-center group-hover:bg-[#005B78] transition-colors">
                    <div className="w-2 h-2 bg-[#005B78] rounded-full group-hover:bg-white" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-gray-500 text-xs sm:text-sm">
          You can add additional roles to your account later from your profile settings
        </p>
      </div>
    </div>
  );
}
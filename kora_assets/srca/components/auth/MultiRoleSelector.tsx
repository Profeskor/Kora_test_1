import { useState } from 'react';
import { Building2, User, Home, Briefcase, ChevronRight, Key, ArrowLeft } from 'lucide-react';
import { UserRole } from './RoleSelectionScreen';

interface UserRoleInfo {
  role: UserRole;
  label: string;
  description: string;
  icon: typeof Briefcase;
  color: string;
}

interface MultiRoleSelectorProps {
  availableRoles: UserRole[];
  onSelectRole: (role: UserRole, rememberChoice?: boolean) => void;
  userName?: string;
  showLogout?: boolean;
  onLogout?: () => void;
  isModal?: boolean;
  onBack?: () => void;
}

export function MultiRoleSelector({ 
  availableRoles, 
  onSelectRole, 
  userName,
  showLogout = false,
  onLogout,
  isModal = false,
  onBack
}: MultiRoleSelectorProps) {
  const [rememberChoice, setRememberChoice] = useState(false);

  const roleConfig: Record<UserRole, UserRoleInfo> = {
    broker: {
      role: 'broker',
      label: 'Broker',
      description: 'Manage your listings, clients, and deals',
      icon: Briefcase,
      color: 'bg-purple-100 text-purple-600',
    },
    buyer: {
      role: 'buyer',
      label: 'Buyer',
      description: 'Explore and purchase your dream property',
      icon: User,
      color: 'bg-blue-100 text-blue-600',
    },
    homeowner: {
      role: 'homeowner',
      label: 'Homeowner',
      description: 'Track your property value and manage your home',
      icon: Key,
      color: 'bg-green-100 text-green-600',
    },
    guest: {
      role: 'guest',
      label: 'Guest',
      description: 'Browse properties without signing in',
      icon: User,
      color: 'bg-gray-100 text-gray-600',
    },
  };

  const userRoles = availableRoles.map(role => roleConfig[role]);

  const handleRoleSelect = (role: UserRole) => {
    onSelectRole(role, rememberChoice);
  };

  const content = (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full ${isModal ? '' : 'mx-auto'}`}>
      {/* Back Button - Positioned above the card content */}
      {!isModal && onBack && (
        <div className="mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#005B78] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-gray-900 mb-2">
          {isModal ? 'Switch to another role' : `Welcome back${userName ? `, ${userName}` : ''}!`}
        </h2>
        <p className="text-gray-600 text-sm">
          {isModal ? 'Select a role to continue' : 'Choose your role to get started'}
        </p>
      </div>

      {/* Role Options */}
      <div className="space-y-3 mb-6">
        {userRoles.map((roleInfo) => {
          const Icon = roleInfo.icon;
          const [bgColor, textColor] = roleInfo.color.split(' ');
          
          return (
            <button
              key={roleInfo.role}
              onClick={() => handleRoleSelect(roleInfo.role)}
              className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-[#005B78] hover:bg-[#E6F2F5] transition-all group text-left"
            >
              <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-7 h-7 ${textColor}`} />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-gray-900 mb-1">Continue as {roleInfo.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{roleInfo.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#005B78] group-hover:translate-x-1 transition-all mt-4" />
            </button>
          );
        })}
      </div>

      {/* Remember Choice Checkbox - Only show on initial login */}
      {!isModal && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
              className="w-5 h-5 text-[#005B78] border-gray-300 rounded focus:ring-[#005B78]"
            />
            <span className="text-sm text-gray-700">Remember my choice for future logins</span>
          </label>
        </div>
      )}

      {/* Footer */}
      <div className="text-center">
        {showLogout && onLogout ? (
          <button
            onClick={onLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Not {userName}? <span className="text-[#005B78] hover:underline">Log Out</span>
          </button>
        ) : (
          <p className="text-gray-500 text-xs">
            {isModal 
              ? 'Your data will be preserved when switching roles'
              : 'You can switch between roles anytime from your profile'}
          </p>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {content}
    </div>
  );
}
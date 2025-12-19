import { Briefcase, Search, Home, ArrowLeft } from 'lucide-react';

export type UserRegistrationType = 'broker' | 'buyer' | 'homeowner';

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRegistrationType) => void;
  onBack?: () => void;
}

export function RoleSelectionScreen({ onSelectRole, onBack }: RoleSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#005B78] mb-4 hover:text-[#004760] transition-colors self-start"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        )}

        {/* Header */}
        <div className="mb-8 mt-8">
          <h1 className="text-gray-900 text-center mb-3">Welcome to Kora Properties</h1>
          <p className="text-gray-600 text-center">Tell us how you&apos;ll be using the app.</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4 flex-1">
          {/* Broker Card */}
          <button
            onClick={() => onSelectRole('broker')}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#005B78] hover:bg-[#E6F2F5] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-xl flex items-center justify-center group-hover:bg-[#005B78] transition-colors">
                <Briefcase className="w-6 h-6 text-[#005B78] group-hover:text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-1">Broker</h3>
                <p className="text-gray-500 text-sm">Register as a real estate broker or brokerage firm</p>
              </div>
            </div>
          </button>

          {/* Buyer Card */}
          <button
            onClick={() => onSelectRole('buyer')}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#005B78] hover:bg-[#E6F2F5] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-xl flex items-center justify-center group-hover:bg-[#005B78] transition-colors">
                <Search className="w-6 h-6 text-[#005B78] group-hover:text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-1">Buyer</h3>
                <p className="text-gray-500 text-sm">Looking to purchase a property</p>
              </div>
            </div>
          </button>

          {/* Homeowner Card */}
          <button
            onClick={() => onSelectRole('homeowner')}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#005B78] hover:bg-[#E6F2F5] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-xl flex items-center justify-center group-hover:bg-[#005B78] transition-colors">
                <Home className="w-6 h-6 text-[#005B78] group-hover:text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-1">Homeowner</h3>
                <p className="text-gray-500 text-sm">Manage your Kora property</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Select the option that best describes your role
        </p>
      </div>
    </div>
  );
}
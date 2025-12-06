import { Home, User } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelected: (role: 'homeowner' | 'tenant') => void;
}

export function RoleSelection({ onRoleSelected }: RoleSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-[#005B78] mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose how you'd like to use Kora</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Homeowner Card */}
          <button
            onClick={() => onRoleSelected('homeowner')}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group"
          >
            <div className="w-16 h-16 bg-[#CCE5EB] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#005B78] transition-colors">
              <Home className="w-8 h-8 text-[#005B78] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-gray-900 mb-3">Homeowner</h2>
            <p className="text-gray-600 mb-6">
              I own a property in the community and want to manage my ownership details, documents, and services.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#005B78] rounded-full"></span>
                Manage property ownership
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#005B78] rounded-full"></span>
                Upload title deeds
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#005B78] rounded-full"></span>
                View property documents
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#005B78] rounded-full"></span>
                Access community services
              </li>
            </ul>
          </button>

          {/* Tenant Card */}
          <button
            onClick={() => onRoleSelected('tenant')}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
              <User className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-gray-900 mb-3">Tenant</h2>
            <p className="text-gray-600 mb-6">
              I'm renting a property and want to complete move-in registration, make payments, and use community services.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Complete move-in process
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Upload Ejari and documents
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Manage payments
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Book amenities
              </li>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
}
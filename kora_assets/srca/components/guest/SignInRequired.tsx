import { Lock, UserPlus, LogIn } from 'lucide-react';

interface SignInRequiredProps {
  feature: 'Shortlist' | 'Leads' | 'Bookings';
  onSignIn: () => void;
  onCreateAccount: () => void;
}

export function SignInRequired({
  feature,
  onSignIn,
  onCreateAccount,
}: SignInRequiredProps) {
  const featureDescriptions = {
    Shortlist: 'Save your favorite properties and compare them side-by-side. Keep track of units you\'re interested in.',
    Leads: 'Manage your client relationships, track inquiries, and close more deals with our powerful CRM tools.',
    Bookings: 'Schedule and manage property viewings, site visits, and client appointments all in one place.',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pb-20">
      <div className="max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB] rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-[#005B78]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[#005B78] text-2xl text-center mb-3">
          Unlock Exclusive Features
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-2">
          Access to <strong>{feature}</strong> is restricted
        </p>

        {/* Description */}
        <p className="text-gray-600 text-center text-sm mb-8">
          {featureDescriptions[feature]}
        </p>

        {/* Benefits List */}
        <div className="bg-white rounded-2xl p-5 mb-8 border border-gray-200">
          <p className="text-[#005B78] mb-3 text-sm">
            Sign in or register to access:
          </p>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2 text-gray-700 text-sm">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Personalized property shortlists</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 text-sm">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Lead and client management</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 text-sm">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Site visit scheduling</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 text-sm">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Property comparison tools</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 text-sm">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Exclusive broker insights</span>
            </li>
          </ul>
        </div>

        {/* Call to Action Buttons */}
        <div className="space-y-3">
          {/* Primary CTA - Sign In */}
          <button
            onClick={onSignIn}
            className="w-full px-6 py-4 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>

          {/* Secondary CTA - Create Account */}
          <button
            onClick={onCreateAccount}
            className="w-full px-6 py-4 bg-white text-[#005B78] rounded-xl hover:bg-gray-50 transition-colors border-2 border-[#005B78] flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-gray-500 text-xs text-center mt-6">
          Already have an account? Sign in to access all features immediately.
        </p>
      </div>
    </div>
  );
}

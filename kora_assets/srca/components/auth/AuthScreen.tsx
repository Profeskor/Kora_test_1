import { useState } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { UserRole } from './RoleSelectionScreen';

interface AuthScreenProps {
  onSuccess: (role: UserRole) => void;
  mode: 'login' | 'register';
  selectedRole: UserRole;
  onBack?: () => void;
}

export function AuthScreen({ onSuccess, mode, selectedRole, onBack }: AuthScreenProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    otp: '',
    name: '',
  });

  const koraLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwNUI3OCI+S09SQTwvdGV4dD48L3N2Zz4=';

  const getRoleTitle = () => {
    switch (selectedRole) {
      case 'broker':
        return 'Broker';
      case 'buyer':
        return 'Buyer';
      case 'homeowner':
        return 'Homeowner';
      default:
        return '';
    }
  };

  const handleSendOTP = () => {
    setOtpSent(true);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onSuccess(selectedRole);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <img src={koraLogo} alt="Kora Properties" className="h-10 sm:h-12 mx-auto" />
          </div>
          <h1 className="text-[#005B78] mb-2 text-2xl sm:text-3xl">
            {mode === 'register' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {mode === 'register' ? `Register as ${getRoleTitle()}` : `Continue as ${getRoleTitle()}`}
          </p>
          {onBack && (
            <button
              onClick={onBack}
              className="text-[#005B78] text-sm mt-2 hover:text-[#004760]"
            >
              ← Choose different role
            </button>
          )}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-4 sm:mb-6">
          <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                loginMethod === 'email'
                  ? 'border-[#005B78] bg-[#E6F2F5] text-[#005B78]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Email</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('mobile')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                loginMethod === 'mobile'
                  ? 'border-[#005B78] bg-[#E6F2F5] text-[#005B78]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Mobile</span>
            </button>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-6">
            {mode === 'register' && (
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none text-sm sm:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {loginMethod === 'email' ? (
              <>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm sm:text-base">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none text-sm sm:text-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm sm:text-base">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none text-sm sm:text-base"
                    placeholder={mode === 'register' ? 'Create a password' : 'Enter your password'}
                    required
                  />
                  {mode === 'login' && (
                    <button
                      type="button"
                      className="text-[#005B78] text-xs sm:text-sm hover:text-[#004760] mt-2"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm sm:text-base">Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none text-sm sm:text-base"
                    placeholder="+971 50 123 4567"
                    required
                  />
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors mb-4 text-sm sm:text-base"
                  >
                    Send OTP
                  </button>
                ) : (
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm sm:text-base">Enter OTP</label>
                    <input
                      type="text"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none text-center tracking-widest text-sm sm:text-base"
                      placeholder="0 0 0 0 0 0"
                      maxLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="w-full text-[#005B78] text-xs sm:text-sm mt-2 hover:text-[#004760]"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {mode === 'register' ? 'Create Account' : 'Sign In'}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
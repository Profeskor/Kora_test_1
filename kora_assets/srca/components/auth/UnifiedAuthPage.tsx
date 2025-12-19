import { useState } from 'react';
import { Briefcase, Search, Home, Eye, EyeOff, CreditCard, ArrowLeft } from 'lucide-react';

export type UserRole = 'broker' | 'buyer' | 'homeowner' | 'guest';

interface UnifiedAuthPageProps {
  onSuccess: (role: UserRole) => void;
  onBack?: () => void;
  onQuickPay?: () => void;
}

export function UnifiedAuthPage({ onSuccess, onBack, onQuickPay }: UnifiedAuthPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    emailOrMobile: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login' || (authMode === 'register' && selectedRole)) {
      // For login, use a default role or show role selector after successful login
      const role = selectedRole || 'buyer';
      onSuccess(role);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#005B78] mb-6 hover:text-[#004760]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">
            {authMode === 'register' ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-500 text-sm">
            {authMode === 'register' 
              ? 'Join us to find your perfect property.' 
              : 'Sign in to continue to your account.'}
          </p>
        </div>

        {/* Quick Pay Banner */}
        {onQuickPay && (
          <div className="mb-6 bg-gradient-to-r from-[#005B78] to-[#007a9e] rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-5 h-5 text-white" />
                  <h3 className="text-white">Quick Pay</h3>
                </div>
                <p className="text-white/90 text-xs">
                  Pay your property dues instantly without logging in
                </p>
              </div>
              <button
                onClick={onQuickPay}
                type="button"
                className="ml-4 px-4 py-2 bg-white text-[#005B78] rounded-xl hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {/* Login/Register Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 rounded-xl text-sm transition-all ${
              authMode === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 rounded-xl text-sm transition-all ${
              authMode === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - only for register */}
          {authMode === 'register' && (
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-sm placeholder:text-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {authMode === 'register' ? (
            <>
              {/* Email - for register */}
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-sm placeholder:text-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Mobile - for register */}
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-sm placeholder:text-gray-400"
                  placeholder="+971 50 123 4567"
                  required
                />
              </div>
            </>
          ) : (
            /* Email / Mobile - for login */
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Email / Mobile</label>
              <input
                type="text"
                value={formData.emailOrMobile}
                onChange={(e) => setFormData({ ...formData, emailOrMobile: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-sm placeholder:text-gray-400"
                placeholder="Enter your email or mobile"
                required
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-sm placeholder:text-gray-400 pr-12"
                placeholder={authMode === 'register' ? 'Create a strong password' : 'Enter your password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Role Selection - only for register */}
          {authMode === 'register' && (
            <div>
              <label className="block text-gray-700 mb-3 text-sm">I am a...</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('broker')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'broker'
                      ? 'border-[#005B78] bg-[#E6F2F5]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Briefcase className={`w-6 h-6 mb-2 ${
                    selectedRole === 'broker' ? 'text-[#005B78]' : 'text-gray-600'
                  }`} />
                  <span className={`text-xs ${
                    selectedRole === 'broker' ? 'text-[#005B78]' : 'text-gray-600'
                  }`}>Broker</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('buyer')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'buyer'
                      ? 'border-[#005B78] bg-[#E6F2F5]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Search className={`w-6 h-6 mb-2 ${
                    selectedRole === 'buyer' ? 'text-[#005B78]' : 'text-gray-600'
                  }`} />
                  <span className={`text-xs ${
                    selectedRole === 'buyer' ? 'text-[#005B78]' : 'text-gray-600'
                  }`}>Buyer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('homeowner')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'homeowner'
                      ? 'border-[#005B78] bg-[#E6F2F5]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Home className={`w-6 h-6 mb-2 ${
                    selectedRole === 'homeowner' ? 'text-[#005B78]' : 'text-gray-600'
                  }`} />
                  <span className={`text-xs ${
                    selectedRole === 'homeowner' ? 'text-[#005B78]' : 'text-gray-600'
                  }`}>Homeowner</span>
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={authMode === 'register' && !selectedRole}
            className="w-full bg-[#005B78] text-white py-3.5 rounded-xl hover:bg-[#004a61] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {authMode === 'register' ? 'Register' : 'Login'}
          </button>

          {/* Links */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              className="text-[#FF8C42] text-sm hover:underline"
            >
              Login with OTP
            </button>
            <button
              type="button"
              className="text-[#FF8C42] text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F5F5F5] px-4 text-sm text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm text-gray-700">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm text-gray-700">Apple</span>
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-gray-400 text-xs mt-8">
          By registering, you agree to our{' '}
          <button type="button" className="text-[#FF8C42] hover:underline">
            Terms of Service
          </button>
          {' '}&{' '}
          <button type="button" className="text-[#FF8C42] hover:underline">
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('code');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset successful
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-500 mb-6">
            {step === 'email' && 'Enter your registered email address'}
            {step === 'code' && 'Enter the code we sent to your email'}
            {step === 'reset' && 'Create your new password'}
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-2 rounded-full ${step === 'email' ? 'bg-[#005B78]' : 'bg-green-500'}`} />
            <div className={`flex-1 h-2 rounded-full ${step === 'code' ? 'bg-[#005B78]' : step === 'reset' ? 'bg-green-500' : 'bg-gray-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step === 'reset' ? 'bg-[#005B78]' : 'bg-gray-200'}`} />
          </div>

          {step === 'email' && (
            <form onSubmit={handleSendCode}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
              >
                Send Authentication Code
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleVerifyCode}>
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">We've sent a code to:</p>
                <p className="text-gray-900">{email}</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 text-center">Enter Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-center tracking-widest"
                  placeholder="0 0 0 0 0 0"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="button"
                className="w-full text-[#005B78] text-sm mb-4 hover:text-[#004760]"
              >
                Resend Code
              </button>

              <button
                type="submit"
                className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
              >
                Verify Code
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Enter new password"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
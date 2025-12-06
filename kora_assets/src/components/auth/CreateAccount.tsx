import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface CreateAccountProps {
  onBack: () => void;
  onComplete: (user: { id: string; name: string; email: string; mobile: string }) => void;
}

export function CreateAccount({ onBack, onComplete }: CreateAccountProps) {
  const [step, setStep] = useState<'details' | 'verification'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationSent(true);
    setStep('verification');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      id: '1',
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB]">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6">
            {step === 'details' ? 'Enter your details to get started' : 'Verify your identity'}
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-2 rounded-full ${step === 'details' ? 'bg-[#005B78]' : 'bg-green-500'}`} />
            <div className={`flex-1 h-2 rounded-full ${step === 'verification' ? 'bg-[#005B78]' : 'bg-gray-200'}`} />
          </div>

          {step === 'details' && (
            <form onSubmit={handleSubmitDetails} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="+971 50 123 4567"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors flex items-center justify-center gap-2 mt-6"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 'verification' && (
            <form onSubmit={handleVerify}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#CCE5EB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#005B78]" />
                </div>
                <p className="text-gray-600 mb-2">We've sent a verification code to:</p>
                <p className="text-gray-900">{formData.email}</p>
                <p className="text-gray-900">{formData.mobile}</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 text-center">Enter Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
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
                Verify & Continue
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
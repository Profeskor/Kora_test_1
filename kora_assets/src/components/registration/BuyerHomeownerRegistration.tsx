import { useState } from 'react';
import { ChevronLeft, Upload, X, CheckCircle } from 'lucide-react';

interface BuyerHomeownerRegistrationProps {
  userType: 'buyer' | 'homeowner';
  onComplete: () => void;
  onBack: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  emiratesId: File | null;
}

export function BuyerHomeownerRegistration({ userType, onComplete, onBack }: BuyerHomeownerRegistrationProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '+971 ',
    emiratesId: null,
  });

  const handleFileUpload = (file: File | null) => {
    setFormData({ ...formData, emiratesId: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-3">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
            Welcome to Kora Properties. You can now browse available inventory and explore our listings.
          </p>
          <button
            onClick={onComplete}
            className="w-full bg-[#005B78] text-white py-3.5 rounded-xl hover:bg-[#004a62] transition-colors"
          >
            Start Browsing Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="flex-1 text-center text-gray-900 mr-8">Quick Registration</h2>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h3 className="text-gray-900 mb-2">
              {userType === 'buyer' ? 'Register as Buyer' : 'Register as Homeowner'}
            </h3>
            <p className="text-gray-600 text-sm">
              Quick and easy registration to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Email ID</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                placeholder="+971 50 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Emirates ID</label>
              {formData.emiratesId ? (
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#005B78]" />
                    <span className="text-sm text-gray-900">{formData.emiratesId.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileUpload(null)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#005B78] transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                    className="hidden"
                    id="emirates-id-upload"
                  />
                  <label htmlFor="emirates-id-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload Emirates ID</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                  </label>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#005B78] text-white py-3.5 rounded-xl hover:bg-[#004a62] transition-colors mt-6"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            By registering, you agree to our{' '}
            <button type="button" className="text-[#005B78] hover:underline">
              Terms of Service
            </button>
            {' '}&{' '}
            <button type="button" className="text-[#005B78] hover:underline">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

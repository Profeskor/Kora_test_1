import { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, Home, ArrowRight } from 'lucide-react';
import type { User } from '../../App';

interface HomeownerRegistrationProps {
  user: User;
  onComplete: () => void;
}

export function HomeownerRegistration({ user, onComplete }: HomeownerRegistrationProps) {
  const [step, setStep] = useState<'property' | 'documents' | 'review'>('property');
  const [formData, setFormData] = useState({
    community: '',
    building: '',
    unit: '',
    propertyType: '',
    emiratesId: null as File | null,
    passport: null as File | null,
    titleDeed: null as File | null,
  });

  const handleFileUpload = (field: 'emiratesId' | 'passport' | 'titleDeed', file: File) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-4">Homeowner Registration</h1>
          <div className="flex gap-2">
            {['property', 'documents', 'review'].map((s, idx) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  ['property', 'documents', 'review'].indexOf(step) >= idx
                    ? 'bg-indigo-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          {step === 'property' && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Property Information</h2>
                  <p className="text-gray-500">Tell us about your property</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Community</label>
                  <select
                    value={formData.community}
                    onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">Select Community</option>
                    <option value="Marina Heights">Marina Heights</option>
                    <option value="Palm Gardens">Palm Gardens</option>
                    <option value="Downtown Residences">Downtown Residences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Building</label>
                  <input
                    type="text"
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Building name or number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Unit Number</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., 1501"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep('documents')}
                disabled={!formData.community || !formData.building || !formData.unit}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {step === 'documents' && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Upload Documents</h2>
                  <p className="text-gray-500">Verify your ownership</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Emirates ID */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Emirates ID <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                    formData.emiratesId ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-400'
                  }`}>
                    {formData.emiratesId ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.emiratesId.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload Emirates ID</p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileUpload('emiratesId', e.target.files[0])}
                          className="hidden"
                          id="emiratesId"
                          accept="image/*,.pdf"
                        />
                        <label
                          htmlFor="emiratesId"
                          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700"
                        >
                          Choose File
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Passport */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Passport <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                    formData.passport ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-400'
                  }`}>
                    {formData.passport ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.passport.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload Passport</p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileUpload('passport', e.target.files[0])}
                          className="hidden"
                          id="passport"
                          accept="image/*,.pdf"
                        />
                        <label
                          htmlFor="passport"
                          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700"
                        >
                          Choose File
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Title Deed (Optional) */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Title Deed <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                    formData.titleDeed ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-400'
                  }`}>
                    {formData.titleDeed ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.titleDeed.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload Title Deed</p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileUpload('titleDeed', e.target.files[0])}
                          className="hidden"
                          id="titleDeed"
                          accept="image/*,.pdf"
                        />
                        <label
                          htmlFor="titleDeed"
                          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700"
                        >
                          Choose File
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('property')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('review')}
                  disabled={!formData.emiratesId || !formData.passport}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 'review' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-gray-900 mb-2">Registration Submitted</h2>
                <p className="text-gray-600">Your homeowner registration is under review</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-gray-900 mb-4">Submitted Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Community</span>
                    <span className="text-gray-900">{formData.community}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Building</span>
                    <span className="text-gray-900">{formData.building}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit</span>
                    <span className="text-gray-900">{formData.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents</span>
                    <span className="text-gray-900">
                      {[formData.emiratesId, formData.passport, formData.titleDeed].filter(Boolean).length} uploaded
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-blue-900 text-sm">
                  <strong>What's next?</strong> Our team will review your submission within 24-48 hours. 
                  You'll receive a notification once your account is verified. You can still access basic 
                  features while we review your registration.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

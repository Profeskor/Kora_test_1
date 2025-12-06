import { useState } from 'react';
import { Home, FileText, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import type { User } from '../../App';

interface TenantOnboardingProps {
  user: User;
  onComplete: () => void;
}

export function TenantOnboarding({ user, onComplete }: TenantOnboardingProps) {
  const [journey, setJourney] = useState<'select' | 'movein' | 'register'>('select');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    community: '',
    building: '',
    unit: '',
    moveInDate: '',
    ejari: null as File | null,
    emiratesId: null as File | null,
  });

  const handleJourneySelect = (type: 'movein' | 'register') => {
    setJourney(type);
    setStep(1);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (journey === 'select') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="w-full max-w-2xl">
          <h1 className="text-gray-900 text-center mb-8">Tenant Registration</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleJourneySelect('movein')}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <Home className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h2 className="text-gray-900 mb-3">Move-In</h2>
              <p className="text-gray-600 mb-4">
                I'm moving into a new property and need to complete the move-in registration.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complete move-in process</li>
                <li>• Upload required documents</li>
                <li>• Set move-in date</li>
                <li>• Get access to amenities</li>
              </ul>
            </button>

            <button
              onClick={() => handleJourneySelect('register')}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <FileText className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h2 className="text-gray-900 mb-3">Register</h2>
              <p className="text-gray-600 mb-4">
                I'm already living here and want to register my tenancy details.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Register existing tenancy</li>
                <li>• Update property details</li>
                <li>• Upload documents</li>
                <li>• Access all services</li>
              </ul>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-4">
            {journey === 'movein' ? 'Move-In Registration' : 'Tenant Registration'}
          </h1>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  step >= s ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Property Details</h2>
                  <p className="text-gray-500">Where are you living?</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Community</label>
                  <select
                    value={formData.community}
                    onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Building name or number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Unit Number</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="e.g., 1501"
                  />
                </div>

                {journey === 'movein' && (
                  <div>
                    <label className="block text-gray-700 mb-2">Move-In Date</label>
                    <input
                      type="date"
                      value={formData.moveInDate}
                      onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.community || !formData.building || !formData.unit}
                className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Upload Documents</h2>
                  <p className="text-gray-500">Required documents for verification</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Ejari <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center ${
                    formData.ejari ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}>
                    {formData.ejari ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.ejari.name}</span>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload Ejari Certificate</p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && setFormData({ ...formData, ejari: e.target.files[0] })}
                          className="hidden"
                          id="ejari"
                        />
                        <label
                          htmlFor="ejari"
                          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700"
                        >
                          Choose File
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Emirates ID / Passport <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center ${
                    formData.emiratesId ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}>
                    {formData.emiratesId ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>{formData.emiratesId.name}</span>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload ID Document</p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && setFormData({ ...formData, emiratesId: e.target.files[0] })}
                          className="hidden"
                          id="emiratesId"
                        />
                        <label
                          htmlFor="emiratesId"
                          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700"
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
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.ejari || !formData.emiratesId}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:bg-gray-300"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-gray-900 mb-2">
                  {journey === 'movein' ? 'Move-In Request Submitted!' : 'Registration Complete!'}
                </h2>
                <p className="text-gray-600">Your tenancy details have been recorded</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-gray-900 mb-4">Submitted Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property</span>
                    <span className="text-gray-900">{formData.community} - {formData.building} #{formData.unit}</span>
                  </div>
                  {journey === 'movein' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Move-In Date</span>
                      <span className="text-gray-900">{formData.moveInDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents</span>
                    <span className="text-gray-900">2 uploaded</span>
                  </div>
                </div>
              </div>

              {journey === 'movein' && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-blue-900 text-sm mb-2">
                    <strong>Move-In Timeline:</strong>
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Document verification: 24 hours</li>
                    <li>• Access card preparation: 2-3 days</li>
                    <li>• Property inspection: Before move-in</li>
                  </ul>
                </div>
              )}

              <button
                onClick={handleComplete}
                className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
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

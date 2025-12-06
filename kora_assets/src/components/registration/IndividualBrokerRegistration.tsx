import { useState } from 'react';
import { ChevronLeft, Upload, X, CheckCircle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface IndividualBrokerRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

interface FormData {
  // Step 1: Personal Details
  fullName: string;
  phone: string;
  email: string;
  emiratesId: File | null;
  passport: File | null;
  nationality: string;
  
  // Step 2: Address Information
  country: string;
  city: string;
  fullAddress: string;
  
  // Step 3: Bank Information
  bankName: string;
  accountHolderName: string;
  iban: string;
  
  // Step 4: Documents
  passportDoc: File | null;
  emiratesIdDoc: File | null;
  reraCertificate: File | null;
  bankDetails: File | null;
  
  // Step 5: Declaration
  declaration: boolean;
}

export function IndividualBrokerRegistration({ onComplete, onBack }: IndividualBrokerRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '+971 ',
    email: '',
    emiratesId: null,
    passport: null,
    nationality: '',
    country: '',
    city: '',
    fullAddress: '',
    bankName: '',
    accountHolderName: '',
    iban: '',
    passportDoc: null,
    emiratesIdDoc: null,
    reraCertificate: null,
    bankDetails: null,
    declaration: false,
  });

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-3">Account Under Review</h2>
          <p className="text-gray-600 mb-8">
            We will notify you via email upon approval. This usually takes 1-2 business days.
          </p>
          <button
            onClick={onComplete}
            className="w-full bg-[#005B78] text-white py-3.5 rounded-xl hover:bg-[#004a62] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={5} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={handlePrevious} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="flex-1 text-center text-gray-900 mr-8">Individual Broker Registration</h2>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Personal Details</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter your full name"
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
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Email ID</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Nationality</label>
                <select
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select nationality</option>
                  <option value="uae">United Arab Emirates</option>
                  <option value="india">India</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="uk">United Kingdom</option>
                  <option value="usa">United States</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <FileUploadField
                label="Emirates ID"
                file={formData.emiratesId}
                onUpload={(file) => handleFileUpload('emiratesId', file)}
                required
              />

              <FileUploadField
                label="Passport"
                file={formData.passport}
                onUpload={(file) => handleFileUpload('passport', file)}
                required
              />
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Address Information</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select country</option>
                  <option value="uae">United Arab Emirates</option>
                  <option value="saudi">Saudi Arabia</option>
                  <option value="qatar">Qatar</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select city</option>
                  <option value="dubai">Dubai</option>
                  <option value="abu-dhabi">Abu Dhabi</option>
                  <option value="sharjah">Sharjah</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Full Address</label>
                <textarea
                  value={formData.fullAddress}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter your complete address"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Bank Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Bank Information</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Account Holder Name</label>
                <input
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter account holder name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">IBAN</label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="AE07 0331 2345 6789 0123 456"
                />
              </div>
            </div>
          )}

          {/* Step 4: Upload Documents */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Upload Documents</h3>
              
              <FileUploadField
                label="Passport"
                file={formData.passportDoc}
                onUpload={(file) => handleFileUpload('passportDoc', file)}
                required
              />

              <FileUploadField
                label="Emirates ID"
                file={formData.emiratesIdDoc}
                onUpload={(file) => handleFileUpload('emiratesIdDoc', file)}
                required
              />

              <FileUploadField
                label="RERA Certificate"
                file={formData.reraCertificate}
                onUpload={(file) => handleFileUpload('reraCertificate', file)}
                required
              />

              <FileUploadField
                label="Bank Details"
                file={formData.bankDetails}
                onUpload={(file) => handleFileUpload('bankDetails', file)}
                required
              />
            </div>
          )}

          {/* Step 5: Submission & Declaration */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-gray-900 mb-6">Review & Submit</h3>
              
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="text-gray-900 text-sm">Application Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-gray-900">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nationality:</span>
                    <span className="text-gray-900">{formData.nationality || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Declaration */}
              <div className="border border-gray-200 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declaration}
                    onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                    className="mt-1 w-5 h-5 text-[#005B78] border-gray-300 rounded focus:ring-[#005B78]"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm the details provided are accurate and I agree to the terms and conditions.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004a62] transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!formData.declaration}
              className="flex-1 bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004a62] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit for Approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface FileUploadFieldProps {
  label: string;
  file: File | null;
  onUpload: (file: File | null) => void;
  required?: boolean;
}

function FileUploadField({ label, file, onUpload, required }: FileUploadFieldProps) {
  const inputId = `file-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div>
      <label className="block text-gray-700 mb-2 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {file ? (
        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#005B78]" />
            <span className="text-sm text-gray-900">{file.name}</span>
          </div>
          <button
            onClick={() => onUpload(null)}
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
            onChange={(e) => onUpload(e.target.files?.[0] || null)}
            className="hidden"
            id={inputId}
          />
          <label htmlFor={inputId} className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
          </label>
        </div>
      )}
    </div>
  );
}

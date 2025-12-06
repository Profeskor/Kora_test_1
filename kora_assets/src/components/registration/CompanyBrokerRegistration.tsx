import { useState } from 'react';
import { ChevronLeft, Upload, X, CheckCircle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface CompanyBrokerRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

interface FormData {
  // Step 1: Company Representative
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  
  // Step 2: Agency Details
  agencyName: string;
  agencyNameArabic: string;
  corporateAgencyType: string;
  crNumber: string;
  tradeLicenseExpiry: string;
  dateOfIncorporation: string;
  countryOfIncorporation: string;
  cityOfIncorporation: string;
  agencyCorporateType: string;
  ornNumber: string;
  reraExpiry: string;
  agencyEmail: string;
  alternateEmail: string;
  agencyLogo: File | null;
  
  // Step 3: Agency Address
  fullAddress: string;
  country: string;
  city: string;
  emirate: string;
  
  // Step 4: Tax Information
  taxRegistrationNumber: string;
  vatCertificateDate: string;
  
  // Step 5: Documents
  passportCopy: File | null;
  bankInfoLetter: File | null;
  vatCertificate: File | null;
  tradeLicense: File | null;
  
  // Step 6: Declaration
  declaration: boolean;
}

export function CompanyBrokerRegistration({ onComplete, onBack }: CompanyBrokerRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '+971 ',
    email: '',
    agencyName: '',
    agencyNameArabic: '',
    corporateAgencyType: '',
    crNumber: '',
    tradeLicenseExpiry: '',
    dateOfIncorporation: '',
    countryOfIncorporation: '',
    cityOfIncorporation: '',
    agencyCorporateType: '',
    ornNumber: '',
    reraExpiry: '',
    agencyEmail: '',
    alternateEmail: '',
    agencyLogo: null,
    fullAddress: '',
    country: '',
    city: '',
    emirate: '',
    taxRegistrationNumber: '',
    vatCertificateDate: '',
    passportCopy: null,
    bankInfoLetter: null,
    vatCertificate: null,
    tradeLicense: null,
    declaration: false,
  });

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleNext = () => {
    if (currentStep < 6) {
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
      <ProgressBar currentStep={currentStep} totalSteps={6} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={handlePrevious} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="flex-1 text-center text-gray-900 mr-8">Company Broker Registration</h2>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Step 1: Company Representative */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Company Representative</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter last name"
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
            </div>
          )}

          {/* Step 2: Agency Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Agency Details</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Agency Type</label>
                <input
                  type="text"
                  value="Corporate"
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Agency Name</label>
                <input
                  type="text"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter agency name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Agency Name (Arabic)</label>
                <input
                  type="text"
                  value={formData.agencyNameArabic}
                  onChange={(e) => setFormData({ ...formData, agencyNameArabic: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="أدخل اسم الوكالة"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Corporate Agency Type</label>
                <select
                  value={formData.corporateAgencyType}
                  onChange={(e) => setFormData({ ...formData, corporateAgencyType: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="llc">LLC</option>
                  <option value="llp">LLP</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">CR Number</label>
                <input
                  type="text"
                  value={formData.crNumber}
                  onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter CR number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Trade License Expiry Date</label>
                <input
                  type="date"
                  value={formData.tradeLicenseExpiry}
                  onChange={(e) => setFormData({ ...formData, tradeLicenseExpiry: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Date of Incorporation</label>
                <input
                  type="date"
                  value={formData.dateOfIncorporation}
                  onChange={(e) => setFormData({ ...formData, dateOfIncorporation: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Country of Incorporation</label>
                <select
                  value={formData.countryOfIncorporation}
                  onChange={(e) => setFormData({ ...formData, countryOfIncorporation: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select country</option>
                  <option value="uae">United Arab Emirates</option>
                  <option value="saudi">Saudi Arabia</option>
                  <option value="qatar">Qatar</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">City of Incorporation</label>
                <select
                  value={formData.cityOfIncorporation}
                  onChange={(e) => setFormData({ ...formData, cityOfIncorporation: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select city</option>
                  <option value="dubai">Dubai</option>
                  <option value="abu-dhabi">Abu Dhabi</option>
                  <option value="sharjah">Sharjah</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Agency Corporate Type</label>
                <select
                  value={formData.agencyCorporateType}
                  onChange={(e) => setFormData({ ...formData, agencyCorporateType: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="non-real-estate">Non-Real Estate</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">ORN Number</label>
                <input
                  type="text"
                  value={formData.ornNumber}
                  onChange={(e) => setFormData({ ...formData, ornNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter ORN number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">RERA Expiry Date</label>
                <input
                  type="date"
                  value={formData.reraExpiry}
                  onChange={(e) => setFormData({ ...formData, reraExpiry: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Agency Email Address</label>
                <input
                  type="email"
                  value={formData.agencyEmail}
                  onChange={(e) => setFormData({ ...formData, agencyEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="agency@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Alternate Email Address</label>
                <input
                  type="email"
                  value={formData.alternateEmail}
                  onChange={(e) => setFormData({ ...formData, alternateEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="alternate@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Agency Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#005B78] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('agencyLogo', e.target.files?.[0] || null)}
                    className="hidden"
                    id="agency-logo"
                  />
                  <label htmlFor="agency-logo" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.agencyLogo ? formData.agencyLogo.name : 'Click to upload logo'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Agency Address */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Agency Address</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Full Agency Address</label>
                <textarea
                  value={formData.fullAddress}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>

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
                <label className="block text-gray-700 mb-2 text-sm">Emirate</label>
                <select
                  value={formData.emirate}
                  onChange={(e) => setFormData({ ...formData, emirate: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                >
                  <option value="">Select emirate</option>
                  <option value="dubai">Dubai</option>
                  <option value="abu-dhabi">Abu Dhabi</option>
                  <option value="sharjah">Sharjah</option>
                  <option value="ajman">Ajman</option>
                  <option value="rak">Ras Al Khaimah</option>
                  <option value="fujairah">Fujairah</option>
                  <option value="uaq">Umm Al Quwain</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Tax Information */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Tax Information</h3>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Tax Registration Number</label>
                <input
                  type="text"
                  value={formData.taxRegistrationNumber}
                  onChange={(e) => setFormData({ ...formData, taxRegistrationNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                  placeholder="Enter TRN"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">VAT Certificate Registration Date</label>
                <input
                  type="date"
                  value={formData.vatCertificateDate}
                  onChange={(e) => setFormData({ ...formData, vatCertificateDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 5: Upload Documents */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-6">Upload Documents</h3>
              
              <FileUploadField
                label="Passport Copy (Company Representative)"
                file={formData.passportCopy}
                onUpload={(file) => handleFileUpload('passportCopy', file)}
                required
              />

              <FileUploadField
                label="Bank Information Letter"
                file={formData.bankInfoLetter}
                onUpload={(file) => handleFileUpload('bankInfoLetter', file)}
                required
              />

              <FileUploadField
                label="VAT Certificate"
                file={formData.vatCertificate}
                onUpload={(file) => handleFileUpload('vatCertificate', file)}
                required
              />

              <FileUploadField
                label="Trade License"
                file={formData.tradeLicense}
                onUpload={(file) => handleFileUpload('tradeLicense', file)}
                required
              />
            </div>
          )}

          {/* Step 6: Submission & Declaration */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-gray-900 mb-6">Review & Submit</h3>
              
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="text-gray-900 text-sm">Application Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Representative:</span>
                    <span className="text-gray-900">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agency:</span>
                    <span className="text-gray-900">{formData.agencyName || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">{formData.phone}</span>
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
                    I declare that I am not a Kora employee or relative, and all information provided is accurate and complete.
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
          {currentStep < 6 ? (
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

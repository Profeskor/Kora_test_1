import { useState } from 'react';
import { ChevronLeft, User, Phone, Mail, DollarSign, Home, Bed, Save } from 'lucide-react';

interface CreateLeadProps {
  onBack: () => void;
  onSave: () => void;
}

export function CreateLead({ onBack, onSave }: CreateLeadProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budgetMin: '',
    budgetMax: '',
    propertyType: '',
    bedrooms: '',
    location: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and save lead
    onSave();
  };

  const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio'];
  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5+'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-gray-900">Create New Lead</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Buyer Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#005B78]" />
            Buyer Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter buyer's name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="buyer@email.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-[#005B78]" />
            Property Requirements
          </h3>

          <div className="space-y-4">
            {/* Budget Range */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Budget Range (AED)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={formData.budgetMin}
                  onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                  placeholder="Min"
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
                <input
                  type="number"
                  value={formData.budgetMax}
                  onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                  placeholder="Max"
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Property Type</label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <Bed className="w-4 h-4" />
                Bedrooms
              </label>
              <div className="grid grid-cols-3 gap-2">
                {bedroomOptions.map((bedroom) => (
                  <button
                    key={bedroom}
                    type="button"
                    onClick={() => setFormData({ ...formData, bedrooms: bedroom })}
                    className={`py-3 rounded-xl border transition-colors ${
                      formData.bedrooms === bedroom
                        ? 'bg-[#005B78] text-white border-[#005B78]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#005B78]'
                    }`}
                  >
                    {bedroom}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Location */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Preferred Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Dubai Marina, Downtown Dubai"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4">Additional Notes</h3>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any additional information or requirements..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Lead</span>
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { 
  ChevronLeft, 
  Plus, 
  Search, 
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Edit,
  MessageSquare,
  X,
  User,
  DollarSign,
  Home,
  Bed,
  Save,
  CheckCircle
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'New' | 'Contacted' | 'Site Visit' | 'Offer' | 'Booked' | 'Lost';
  budget: string;
  propertyType: string;
  bedrooms: string;
  linkedUnits: string[];
  createdDate: string;
  lastContact: string;
  notes: string[];
}

interface LeadManagementProps {
  onBack: () => void;
  onCreateLead: () => void;
  onLeadSelect: (leadId: string) => void;
}

export function LeadManagement({ onBack, onCreateLead, onLeadSelect }: LeadManagementProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'New' as Lead['status'],
    budget: '',
    propertyType: '',
    bedrooms: '',
    notes: ''
  });

  // Mock leads data
  const leads: Lead[] = [
    {
      id: '1',
      name: 'Ahmed Al Mansouri',
      phone: '+971 50 123 4567',
      email: 'ahmed.m@email.com',
      status: 'Site Visit',
      budget: 'AED 2M - 3M',
      propertyType: 'Apartment',
      bedrooms: '2-3',
      linkedUnits: ['Marina Heights - Unit 205'],
      createdDate: '2024-12-01',
      lastContact: '2 hours ago',
      notes: ['Interested in marina view', 'Prefers high floor']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+971 55 987 6543',
      email: 'sarah.j@email.com',
      status: 'Offer',
      budget: 'AED 3M - 4M',
      propertyType: 'Penthouse',
      bedrooms: '3',
      linkedUnits: ['Bay East - Penthouse 3'],
      createdDate: '2024-11-28',
      lastContact: '1 day ago',
      notes: ['Ready to close', 'Bank approval in progress']
    },
    {
      id: '3',
      name: 'Mohammed Hassan',
      phone: '+971 52 456 7890',
      email: 'mohammed.h@email.com',
      status: 'New',
      budget: 'AED 4M+',
      propertyType: 'Villa',
      bedrooms: '4+',
      linkedUnits: [],
      createdDate: '2024-12-05',
      lastContact: 'Not contacted',
      notes: []
    },
    {
      id: '4',
      name: 'Emily Chen',
      phone: '+971 56 234 5678',
      email: 'emily.c@email.com',
      status: 'Contacted',
      budget: 'AED 1.5M - 2M',
      propertyType: 'Apartment',
      bedrooms: '2',
      linkedUnits: [],
      createdDate: '2024-12-03',
      lastContact: '5 hours ago',
      notes: ['First time buyer', 'Needs financing']
    },
  ];

  const statusFilters = ['all', 'New', 'Contacted', 'Site Visit', 'Offer', 'Booked', 'Lost'];

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      'New': 'bg-blue-50 text-blue-700 border-blue-200',
      'Contacted': 'bg-purple-50 text-purple-700 border-purple-200',
      'Site Visit': 'bg-orange-50 text-orange-700 border-orange-200',
      'Offer': 'bg-amber-50 text-amber-700 border-amber-200',
      'Booked': 'bg-green-50 text-green-700 border-green-200',
      'Lost': 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return colors[status];
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = activeFilter === 'all' || lead.status === activeFilter;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLeadCounts = () => {
    const counts: Record<string, number> = { all: leads.length };
    statusFilters.forEach(status => {
      if (status !== 'all') {
        counts[status] = leads.filter(lead => lead.status === status).length;
      }
    });
    return counts;
  };

  const counts = getLeadCounts();

  // Handle edit lead
  const handleEditLead = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation(); // Prevent card click
    setEditingLead(lead);
    setEditFormData({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      status: lead.status,
      budget: lead.budget,
      propertyType: lead.propertyType,
      bedrooms: lead.bedrooms,
      notes: lead.notes.join('\n')
    });
    setShowEditModal(true);
  };

  // Handle save edited lead
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the lead in the database
    setShowEditModal(false);
    setToastMessage(`Lead "${editFormData.name}" updated successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio'];
  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5+', '2-3', '4+'];
  const statusOptions: Lead['status'][] = ['New', 'Contacted', 'Site Visit', 'Offer', 'Booked', 'Lost'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-gray-900">My Leads</h1>
          </div>
          <button
            onClick={onCreateLead}
            className="flex items-center gap-2 px-4 py-2 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">New Lead</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, phone, or email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-[#005B78] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              {' '}
              <span className="text-xs opacity-75">({counts[filter] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="px-4 py-6">
        <p className="text-gray-600 text-sm mb-4">
          {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} found
        </p>

        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="relative w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              {/* Edit Button */}
              <button
                onClick={(e) => handleEditLead(e, lead)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#005B78] text-white rounded-lg hover:bg-[#004A5F] transition-colors flex items-center justify-center z-10"
                title="Edit Lead"
              >
                <Edit className="w-4 h-4" />
              </button>

              {/* Lead Card Content - clickable */}
              <button
                onClick={() => onLeadSelect(lead.id)}
                className="w-full text-left"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 pr-10">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{lead.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{lead.lastContact}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{lead.email}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-700">
                    <MapPin className="w-3 h-3" />
                    <span>{lead.propertyType}</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-700">
                    {lead.bedrooms} BR
                  </div>
                  <div className="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-700">
                    {lead.budget}
                  </div>
                </div>

                {/* Linked Units */}
                {lead.linkedUnits.length > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-[#E6F2F5] rounded-xl">
                    <Building2 className="w-4 h-4 text-[#005B78] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-blue-700 mb-1">Linked Units</p>
                      {lead.linkedUnits.map((unit, idx) => (
                        <p key={idx} className="text-xs text-blue-900">{unit}</p>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No leads found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Edit Lead Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-[#005B78]">Edit Lead</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Lead Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as Lead['status'] })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Budget Range <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.budget}
                    onChange={(e) => setEditFormData({ ...editFormData, budget: e.target.value })}
                    placeholder="AED 2M - 3M"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editFormData.propertyType}
                    onChange={(e) => setEditFormData({ ...editFormData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Bedrooms <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editFormData.bedrooms}
                    onChange={(e) => setEditFormData({ ...editFormData, bedrooms: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900"
                  >
                    {bedroomOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#005B78] mb-2">
                    Notes
                  </label>
                  <textarea
                    value={editFormData.notes}
                    onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                    placeholder="Add any additional notes about the lead..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900 resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-700">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
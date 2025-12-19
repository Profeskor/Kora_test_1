import { useState } from 'react';
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Home,
  Bed,
  Calendar,
  Clock,
  Building2,
  Edit,
  MessageSquare,
  Plus,
  User,
  CheckCircle,
  X,
  Send,
  FileText,
  TrendingUp
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
  source?: string;
  nationality?: string;
  occupation?: string;
}

interface LeadDetailProps {
  leadId: string;
  onBack: () => void;
  onEdit: (leadId: string) => void;
}

export function LeadDetail({ leadId, onBack, onEdit }: LeadDetailProps) {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'units'>('overview');

  // Mock lead data - in real app, fetch based on leadId
  const lead: Lead = {
    id: leadId,
    name: 'Ahmed Al Mansouri',
    phone: '+971 50 123 4567',
    email: 'ahmed.m@email.com',
    status: 'Site Visit',
    budget: 'AED 2M - 3M',
    propertyType: 'Apartment',
    bedrooms: '2-3',
    linkedUnits: ['Marina Heights - Unit 205', 'Bay East - Unit 3B'],
    createdDate: '2024-12-01',
    lastContact: '2 hours ago',
    notes: [
      'Interested in marina view properties',
      'Prefers high floor (15+)',
      'Looking to move in Q1 2025',
      'Has mortgage pre-approval from Emirates NBD'
    ],
    source: 'Website Inquiry',
    nationality: 'UAE',
    occupation: 'Business Owner'
  };

  // Mock activity timeline
  const activities = [
    {
      id: '1',
      type: 'call',
      title: 'Phone Call',
      description: 'Discussed budget and location preferences',
      timestamp: '2 hours ago',
      date: '2024-12-06 14:30'
    },
    {
      id: '2',
      type: 'site_visit',
      title: 'Site Visit Scheduled',
      description: 'Marina Heights - Unit 205 on Dec 8, 2024',
      timestamp: '1 day ago',
      date: '2024-12-05 10:00'
    },
    {
      id: '3',
      type: 'email',
      title: 'Email Sent',
      description: 'Property brochure and floor plans shared',
      timestamp: '2 days ago',
      date: '2024-12-04 16:20'
    },
    {
      id: '4',
      type: 'note',
      title: 'Note Added',
      description: 'Has mortgage pre-approval from Emirates NBD',
      timestamp: '3 days ago',
      date: '2024-12-03 09:15'
    },
    {
      id: '5',
      type: 'created',
      title: 'Lead Created',
      description: 'New lead from website inquiry',
      timestamp: '5 days ago',
      date: '2024-12-01 11:30'
    }
  ];

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'site_visit':
        return <Building2 className="w-4 h-4" />;
      case 'note':
        return <FileText className="w-4 h-4" />;
      case 'created':
        return <User className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setShowNoteModal(false);
      setToastMessage('Note added successfully!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
            <div>
              <h1 className="text-[#005B78]">{lead.name}</h1>
              <p className="text-xs text-gray-500">Lead ID: #{lead.id}</p>
            </div>
          </div>
          <button
            onClick={() => onEdit(lead.id)}
            className="w-10 h-10 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors flex items-center justify-center"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs border ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">Created {lead.createdDate}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#005B78] text-[#005B78]'
                : 'border-transparent text-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-sm transition-colors border-b-2 ${
              activeTab === 'activity'
                ? 'border-[#005B78] text-[#005B78]'
                : 'border-transparent text-gray-600'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('units')}
            className={`flex-1 py-3 text-sm transition-colors border-b-2 ${
              activeTab === 'units'
                ? 'border-[#005B78] text-[#005B78]'
                : 'border-transparent text-gray-600'
            }`}
          >
            Linked Units
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`tel:${lead.phone}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#005B78] rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Call</span>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#005B78] rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Email</span>
              </a>
              <button
                onClick={() => setShowNoteModal(true)}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#005B78] rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Note</span>
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-[#005B78]">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-[#005B78]">{lead.email}</p>
                  </div>
                </div>
                {lead.nationality && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Nationality</p>
                      <p className="text-gray-900">{lead.nationality}</p>
                    </div>
                  </div>
                )}
                {lead.occupation && (
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Occupation</p>
                      <p className="text-gray-900">{lead.occupation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Requirements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="text-[#005B78]">{lead.budget}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Property Type</p>
                  <p className="text-gray-900">{lead.propertyType}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Bedrooms</p>
                  <p className="text-gray-900">{lead.bedrooms}</p>
                </div>
                {lead.source && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Source</p>
                    <p className="text-gray-900">{lead.source}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#005B78] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Notes ({lead.notes.length})
                </h3>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="text-[#005B78] text-sm flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  Add Note
                </button>
              </div>
              {lead.notes.length > 0 ? (
                <div className="space-y-2">
                  {lead.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No notes yet</p>
              )}
            </div>
          </>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Activity Timeline
            </h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="relative">
                  {index !== activities.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200" />
                  )}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-[#005B78]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#005B78] relative z-10">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-[#005B78]">{activity.title}</p>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'units' && (
          <div className="space-y-3">
            {lead.linkedUnits.length > 0 ? (
              lead.linkedUnits.map((unit, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#005B78]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-[#005B78]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#005B78] mb-1">{unit}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">
                          2 BR
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">
                          1,200 sqft
                        </span>
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs">
                          Available
                        </span>
                      </div>
                      <button className="text-sm text-[#005B78] hover:underline">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-1">No linked units</p>
                <p className="text-sm text-gray-500">
                  Link properties to this lead to track interest
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-[#005B78]">Add Note</h2>
              <button
                onClick={() => setShowNoteModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddNote} className="p-6">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter note about this lead..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent text-gray-900 resize-none"
                rows={4}
                autoFocus
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Add Note</span>
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

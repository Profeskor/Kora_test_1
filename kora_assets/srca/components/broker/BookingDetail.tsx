import { useState } from 'react';
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Home,
  Calendar,
  Clock,
  Building2,
  Edit,
  MessageSquare,
  User,
  CheckCircle,
  X,
  Download,
  FileText,
  CreditCard,
  AlertCircle,
  Check,
  Upload,
  Share2
} from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  property: string;
  unitNumber: string;
  viewingDate: string;
  viewingTime: string;
  bookingDate: string;
  bookingAmount: string;
  totalAmount: string;
  commission: string;
  paymentStatus: 'Pending' | 'Partial' | 'Paid';
  notes: string[];
  propertyType?: string;
  bedrooms?: string;
  area?: string;
  preferredContact?: string;
}

interface BookingDetailProps {
  bookingId: string;
  onBack: () => void;
  onEdit: (bookingId: string) => void;
}

export function BookingDetail({ bookingId, onBack, onEdit }: BookingDetailProps) {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'property'>('overview');

  // Mock booking data - in real app, fetch based on bookingId
  const booking: Booking = {
    id: bookingId,
    customerName: 'Ahmed Al Mansouri',
    phone: '+971 50 123 4567',
    email: 'ahmed.m@email.com',
    status: 'Confirmed',
    property: 'Marina Heights Tower A',
    unitNumber: 'Unit 205',
    viewingDate: '2024-12-08',
    viewingTime: '10:00 AM',
    bookingDate: '2024-12-01',
    bookingAmount: 'AED 50,000',
    totalAmount: 'AED 2,500,000',
    commission: 'AED 50,000',
    paymentStatus: 'Partial',
    notes: [
      'Customer confirmed viewing appointment',
      'Documents received and verified',
      'Booking amount transferred successfully'
    ],
    propertyType: '2 Bedroom Apartment',
    bedrooms: '2',
    area: '1,200 sqft',
    preferredContact: 'WhatsApp'
  };

  // Mock timeline activities
  const timeline = [
    {
      id: '1',
      type: 'payment',
      title: 'Booking Payment Received',
      description: 'AED 50,000 received via bank transfer',
      timestamp: '1 hour ago',
      date: '2024-12-06 15:30',
      status: 'success'
    },
    {
      id: '2',
      type: 'document',
      title: 'Documents Verified',
      description: 'Emirates ID and passport verified',
      timestamp: '3 hours ago',
      date: '2024-12-06 13:00',
      status: 'success'
    },
    {
      id: '3',
      type: 'confirmed',
      title: 'Booking Confirmed',
      description: 'Site visit scheduled for Dec 8, 2024 at 10:00 AM',
      timestamp: '1 day ago',
      date: '2024-12-05 16:20',
      status: 'success'
    },
    {
      id: '4',
      type: 'call',
      title: 'Phone Call',
      description: 'Discussed property details and pricing',
      timestamp: '2 days ago',
      date: '2024-12-04 11:15',
      status: 'completed'
    },
    {
      id: '5',
      type: 'created',
      title: 'Booking Created',
      description: 'New booking request received',
      timestamp: '5 days ago',
      date: '2024-12-01 09:30',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: Booking['status']) => {
    const colors = {
      'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Confirmed': 'bg-green-50 text-green-700 border-green-200',
      'Completed': 'bg-blue-50 text-blue-700 border-blue-200',
      'Cancelled': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status];
  };

  const getPaymentStatusColor = (status: Booking['paymentStatus']) => {
    const colors = {
      'Pending': 'bg-gray-50 text-gray-700 border-gray-200',
      'Partial': 'bg-orange-50 text-orange-700 border-orange-200',
      'Paid': 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[status];
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'created':
        return <Calendar className="w-4 h-4" />;
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

  const handleDownloadDocument = (docType: string) => {
    setToastMessage(`${docType} downloaded successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
              <h1 className="text-[#005B78]">{booking.property}</h1>
              <p className="text-xs text-gray-500">Booking ID: #{booking.id}</p>
            </div>
          </div>
          <button
            onClick={() => onEdit(booking.id)}
            className="w-10 h-10 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors flex items-center justify-center"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs border ${getPaymentStatusColor(booking.paymentStatus)}`}>
            Payment: {booking.paymentStatus}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">Booked {booking.bookingDate}</span>
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
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-3 text-sm transition-colors border-b-2 ${
              activeTab === 'timeline'
                ? 'border-[#005B78] text-[#005B78]'
                : 'border-transparent text-gray-600'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('property')}
            className={`flex-1 py-3 text-sm transition-colors border-b-2 ${
              activeTab === 'property'
                ? 'border-[#005B78] text-[#005B78]'
                : 'border-transparent text-gray-600'
            }`}
          >
            Property
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
                href={`tel:${booking.phone}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#005B78] rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-700">Call</span>
              </a>
              <a
                href={`mailto:${booking.email}`}
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

            {/* Viewing Details */}
            <div className="bg-gradient-to-br from-[#005B78] to-[#007a9e] rounded-2xl p-5 shadow-md text-white">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5" />
                <h3>Viewing Appointment</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Date</span>
                  <span className="text-sm">{new Date(booking.viewingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Time</span>
                  <span className="text-sm">{booking.viewingTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Unit</span>
                  <span className="text-sm">{booking.unitNumber}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-[#005B78]">{booking.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-[#005B78]">{booking.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-[#005B78]">{booking.email}</p>
                  </div>
                </div>
                {booking.preferredContact && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Preferred Contact</p>
                      <p className="text-gray-900">{booking.preferredContact}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Booking Amount</span>
                  <span className="text-[#005B78]">{booking.bookingAmount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="text-gray-900">{booking.totalAmount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-green-700">Your Commission</span>
                  <span className="text-green-700">{booking.commission}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getPaymentStatusColor(booking.paymentStatus)}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleDownloadDocument('Booking Agreement')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#005B78]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#005B78]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-900">Booking Agreement</p>
                      <p className="text-xs text-gray-500">PDF • 245 KB</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={() => handleDownloadDocument('Payment Receipt')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#005B78]/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#005B78]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-900">Payment Receipt</p>
                      <p className="text-xs text-gray-500">PDF • 128 KB</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={() => handleDownloadDocument('Customer Documents')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#005B78]/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-[#005B78]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-900">Customer Documents</p>
                      <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#005B78] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Notes ({booking.notes.length})
                </h3>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="text-[#005B78] text-sm flex items-center gap-1 hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  Add Note
                </button>
              </div>
              {booking.notes.length > 0 ? (
                <div className="space-y-2">
                  {booking.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-xl flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
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

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Booking Timeline
            </h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={item.id} className="relative">
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200" />
                  )}
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                      item.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-[#005B78]/10 text-[#005B78]'
                    }`}>
                      {getTimelineIcon(item.type)}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-[#005B78]">{item.title}</p>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'property' && (
          <div className="space-y-4">
            {/* Property Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-48 bg-gradient-to-br from-[#005B78] to-[#007a9e] flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white opacity-50" />
              </div>
              <div className="p-5">
                <h3 className="text-[#005B78] mb-2">{booking.property}</h3>
                <p className="text-gray-600 mb-4">{booking.unitNumber}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                    {booking.propertyType}
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                    {booking.bedrooms} BR
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
                    {booking.area}
                  </span>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Unit Number</span>
                  <span className="text-gray-900">{booking.unitNumber}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="text-gray-900">{booking.propertyType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Bedrooms</span>
                  <span className="text-gray-900">{booking.bedrooms}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Area</span>
                  <span className="text-gray-900">{booking.area}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="text-[#005B78]">{booking.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#005B78] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-900">Dubai Marina</p>
                  <p className="text-xs text-gray-500 mt-1">Dubai, UAE</p>
                </div>
                <button className="w-full px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  View on Map
                </button>
              </div>
            </div>

            {/* Share Property */}
            <button className="w-full px-4 py-3 border-2 border-[#005B78] text-[#005B78] rounded-xl hover:bg-[#005B78] hover:text-white transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Property Details
            </button>
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
                placeholder="Enter note about this booking..."
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
                  <MessageSquare className="w-4 h-4" />
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

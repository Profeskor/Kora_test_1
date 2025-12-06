import { useState } from 'react';
import { ChevronLeft, Search, Calendar, DollarSign, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';

interface Booking {
  id: string;
  buyerName: string;
  buyerPhone: string;
  unitName: string;
  project: string;
  price: number;
  bookingAmount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  bookingDate: string;
  handoverDate: string;
}

interface BookingManagementProps {
  onBack: () => void;
  onBookingSelect: (bookingId: string) => void;
}

export function BookingManagement({ onBack, onBookingSelect }: BookingManagementProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      buyerName: 'Ahmed Al Mansouri',
      buyerPhone: '+971 50 123 4567',
      unitName: 'Marina Heights - Unit 205',
      project: 'Marina Heights',
      price: 1850000,
      bookingAmount: 370000,
      status: 'Approved',
      bookingDate: '2024-12-01',
      handoverDate: 'Q4 2025'
    },
    {
      id: '2',
      buyerName: 'Sarah Johnson',
      buyerPhone: '+971 55 987 6543',
      unitName: 'Bay East - Penthouse 3',
      project: 'Bay East',
      price: 3200000,
      bookingAmount: 640000,
      status: 'Pending',
      bookingDate: '2024-12-03',
      handoverDate: 'Q2 2026'
    },
    {
      id: '3',
      buyerName: 'Mohammed Hassan',
      buyerPhone: '+971 52 456 7890',
      unitName: 'Sky Gardens - Villa 12',
      project: 'Sky Gardens',
      price: 4500000,
      bookingAmount: 900000,
      status: 'Under Review',
      bookingDate: '2024-12-04',
      handoverDate: 'Q1 2026'
    },
    {
      id: '4',
      buyerName: 'Emily Chen',
      buyerPhone: '+971 56 234 5678',
      unitName: 'Waterfront Towers - Unit 1802',
      project: 'Waterfront Towers',
      price: 2750000,
      bookingAmount: 550000,
      status: 'Approved',
      bookingDate: '2024-11-28',
      handoverDate: 'Q3 2025'
    },
    {
      id: '5',
      buyerName: 'David Miller',
      buyerPhone: '+971 54 321 9876',
      unitName: 'Pearl Residence - Unit 405',
      project: 'Pearl Residence',
      price: 1600000,
      bookingAmount: 320000,
      status: 'Rejected',
      bookingDate: '2024-11-25',
      handoverDate: 'Q2 2025'
    },
  ];

  const statusFilters = ['all', 'Pending', 'Approved', 'Under Review', 'Rejected'];

  const getStatusConfig = (status: Booking['status']) => {
    const configs = {
      'Pending': {
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Clock,
        iconColor: 'text-amber-600'
      },
      'Approved': {
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-600'
      },
      'Under Review': {
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: Eye,
        iconColor: 'text-blue-600'
      },
      'Rejected': {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: XCircle,
        iconColor: 'text-red-600'
      },
    };
    return configs[status];
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    const matchesSearch = booking.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBookingCounts = () => {
    const counts: Record<string, number> = { all: bookings.length };
    statusFilters.forEach(status => {
      if (status !== 'all') {
        counts[status] = bookings.filter(booking => booking.status === status).length;
      }
    });
    return counts;
  };

  const counts = getBookingCounts();

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-gray-900">My Bookings</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookings by buyer or property..."
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

      {/* Bookings List */}
      <div className="px-4 py-6">
        <p className="text-gray-600 text-sm mb-4">
          {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'} found
        </p>

        <div className="space-y-3">
          {filteredBookings.map((booking) => {
            const statusConfig = getStatusConfig(booking.status);
            const StatusIcon = statusConfig.icon;

            return (
              <button
                key={booking.id}
                onClick={() => onBookingSelect(booking.id)}
                className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{booking.unitName}</h3>
                    <p className="text-gray-600 text-sm mb-2">{booking.buyerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                    <span className={`inline-block px-3 py-1 rounded-full text-xs border ${statusConfig.color}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Price Info */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Total Price</p>
                    <p className="text-gray-900 text-sm">{formatPrice(booking.price)}</p>
                  </div>
                  <div className="p-3 bg-[#E6F2F5] rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Booking Amount</p>
                    <p className="text-[#005B78] text-sm">{formatPrice(booking.bookingAmount)}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Booked: {formatDate(booking.bookingDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Handover: {booking.handoverDate}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No bookings found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
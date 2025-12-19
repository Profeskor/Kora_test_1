import { useState } from 'react';
import { Calendar, Clock, Dumbbell, Waves, UtensilsCrossed, Users, CheckCircle } from 'lucide-react';

export function AmenityBooking() {
  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const amenities = [
    { id: 'gym', name: 'Gym', icon: Dumbbell, color: 'orange', available: true },
    { id: 'pool', name: 'Swimming Pool', icon: Waves, color: 'blue', available: true },
    { id: 'bbq', name: 'BBQ Area', icon: UtensilsCrossed, color: 'red', available: true },
    { id: 'hall', name: 'Community Hall', icon: Users, color: 'purple', available: true },
  ];

  const timeSlots = [
    { id: '08:00', time: '08:00 AM - 09:00 AM', available: true },
    { id: '09:00', time: '09:00 AM - 10:00 AM', available: true },
    { id: '10:00', time: '10:00 AM - 11:00 AM', available: false },
    { id: '11:00', time: '11:00 AM - 12:00 PM', available: true },
    { id: '14:00', time: '02:00 PM - 03:00 PM', available: true },
    { id: '15:00', time: '03:00 PM - 04:00 PM', available: true },
    { id: '16:00', time: '04:00 PM - 05:00 PM', available: true },
    { id: '17:00', time: '05:00 PM - 06:00 PM', available: false },
    { id: '18:00', time: '06:00 PM - 07:00 PM', available: true },
    { id: '19:00', time: '07:00 PM - 08:00 PM', available: true },
  ];

  const bookings = [
    { id: 1, amenity: 'Gym', date: '2024-12-03', time: '06:00 AM - 07:00 AM', status: 'Confirmed' },
    { id: 2, amenity: 'Swimming Pool', date: '2024-12-05', time: '04:00 PM - 05:00 PM', status: 'Confirmed' },
  ];

  const handleBooking = () => {
    if (selectedAmenity && selectedDate && selectedSlot) {
      alert('Booking confirmed!');
      setSelectedAmenity(null);
      setSelectedDate('');
      setSelectedSlot('');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Amenity Booking</h1>
        <p className="text-gray-500 text-sm">Reserve community facilities</p>
      </div>

      {/* Amenity Selection */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-gray-900 mb-4">Select Amenity</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <button
                key={amenity.id}
                onClick={() => setSelectedAmenity(amenity.id)}
                className={`p-4 sm:p-6 rounded-2xl border-2 transition-all ${
                  selectedAmenity === amenity.id
                    ? 'border-[#005B78] bg-[#E6F2F5]'
                    : 'border-gray-200 bg-white hover:border-[#005B78]'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 flex items-center justify-center">
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      selectedAmenity === amenity.id ? 'text-[#005B78]' : 'text-gray-600'
                    }`} />
                  </div>
                  <p className={`text-center text-sm sm:text-base ${selectedAmenity === amenity.id ? 'text-[#005B78]' : 'text-gray-900'}`}>
                    {amenity.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date and Time Selection */}
      {selectedAmenity && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm mb-6">
          <h2 className="text-gray-900 mb-4 sm:mb-6">Select Date & Time</h2>
          
          <div className="mb-6 sm:mb-8">
            <label className="block text-gray-700 mb-3 text-sm sm:text-base">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
            />
          </div>

          {selectedDate && (
            <div>
              <label className="block text-gray-700 mb-3 text-sm sm:text-base">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedSlot === slot.id
                        ? 'border-[#005B78] bg-[#E6F2F5]'
                        : slot.available
                        ? 'border-gray-200 bg-white hover:border-[#005B78]'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className={`w-4 h-4 ${
                        selectedSlot === slot.id ? 'text-[#005B78]' : slot.available ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm sm:text-base ${
                        selectedSlot === slot.id ? 'text-[#005B78]' : slot.available ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {slot.time}
                      </span>
                    </div>
                    <p className={`text-xs ${slot.available ? 'text-green-600' : 'text-gray-400'}`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSlot && (
            <button
              onClick={handleBooking}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors mt-6 sm:mt-8"
            >
              Confirm Booking
            </button>
          )}
        </div>
      )}

      {/* My Bookings */}
      <div>
        <h2 className="text-gray-900 mb-4">My Bookings</h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{booking.amenity}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {booking.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {booking.time}
                    </span>
                  </div>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm whitespace-nowrap">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
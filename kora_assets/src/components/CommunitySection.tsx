import { useState } from 'react';
import { Users, Calendar, MapPin, Clock, MessageCircle, Bell, Wifi, Dumbbell, Coffee } from 'lucide-react';

export function CommunitySection() {
  const [selectedTab, setSelectedTab] = useState<'events' | 'amenities' | 'announcements'>('events');

  const events = [
    {
      id: 1,
      title: 'Community BBQ',
      date: '2024-12-07',
      time: '2:00 PM - 6:00 PM',
      location: 'Pool Area',
      attendees: 24,
      description: 'Join us for our monthly community BBQ. Bring your family and friends!',
      image: 'bg-gradient-to-br from-orange-400 to-red-500'
    },
    {
      id: 2,
      title: 'Yoga Class',
      date: '2024-12-05',
      time: '7:00 AM - 8:00 AM',
      location: 'Fitness Center',
      attendees: 12,
      description: 'Morning yoga session. All levels welcome!',
      image: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      id: 3,
      title: 'Holiday Decorating Contest',
      date: '2024-12-15',
      time: 'All Day',
      location: 'Throughout Community',
      attendees: 18,
      description: 'Decorate your home and win prizes! Judging on Dec 20th.',
      image: 'bg-gradient-to-br from-green-400 to-emerald-500'
    },
  ];

  const amenities = [
    { id: 1, name: 'Fitness Center', icon: Dumbbell, hours: '5:00 AM - 11:00 PM', status: 'Open' },
    { id: 2, name: 'Swimming Pool', icon: Wifi, hours: '6:00 AM - 10:00 PM', status: 'Open' },
    { id: 3, name: 'Coffee Lounge', icon: Coffee, hours: '24/7', status: 'Open' },
    { id: 4, name: 'Business Center', icon: Users, hours: '24/7', status: 'Open' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Pool Maintenance Scheduled',
      date: '2024-11-29',
      content: 'The pool will be closed for maintenance on December 3rd from 9 AM to 3 PM.',
      priority: 'important'
    },
    {
      id: 2,
      title: 'New Parcel Locker System',
      date: '2024-11-27',
      content: 'We\'ve installed new smart parcel lockers in the lobby. Check your email for access instructions.',
      priority: 'normal'
    },
    {
      id: 3,
      title: 'Guest Parking Update',
      date: '2024-11-25',
      content: 'Reminder: Guest parking permits can now be requested through the app.',
      priority: 'normal'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Community</h1>
        <p className="text-gray-500">Stay connected with your community</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedTab('events')}
          className={`px-6 py-3 rounded-xl whitespace-nowrap transition-colors ${
            selectedTab === 'events'
              ? 'bg-[#005B78] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setSelectedTab('amenities')}
          className={`px-6 py-3 rounded-xl whitespace-nowrap transition-colors ${
            selectedTab === 'amenities'
              ? 'bg-[#005B78] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Amenities
        </button>

        <button
          onClick={() => setSelectedTab('announcements')}
          className={`px-6 py-3 rounded-xl whitespace-nowrap transition-colors ${
            selectedTab === 'announcements'
              ? 'bg-[#005B78] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Announcements
        </button>
      </div>

      {/* Events Tab */}
      {selectedTab === 'events' && (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-32 ${event.image} flex items-center justify-center`}>
                <Calendar className="w-12 h-12 text-white opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.attendees} attending</span>
                  </div>
                  <button className="px-4 py-2 bg-[#005B78] text-white rounded-lg hover:bg-[#004760] transition-colors">
                    RSVP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Amenities Tab */}
      {selectedTab === 'amenities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div key={amenity.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#CCE5EB] rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#005B78]" />
                    </div>
                    <div>
                      <h3 className="text-gray-900">{amenity.name}</h3>
                      <p className="text-gray-500 text-sm">{amenity.hours}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {amenity.status}
                  </span>
                </div>
                <button className="w-full px-4 py-2 border-2 border-[#005B78] text-[#005B78] rounded-xl hover:bg-[#E6F2F5] transition-colors">
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Announcements Tab */}
      {selectedTab === 'announcements' && (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  announcement.priority === 'important' 
                    ? 'bg-red-100' 
                    : 'bg-blue-100'
                }`}>
                  <Bell className={`w-6 h-6 ${
                    announcement.priority === 'important' 
                      ? 'text-red-600' 
                      : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900">{announcement.title}</h3>
                    <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{announcement.date}</span>
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
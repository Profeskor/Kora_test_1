import { useState } from 'react';
import { UserPlus, QrCode, Clock, CheckCircle, X, Calendar, Share2 } from 'lucide-react';

export function VisitorManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const [visitorData, setVisitorData] = useState({
    name: '',
    mobile: '',
    purpose: '',
    vehicle: '',
    date: '',
    time: '',
  });

  const visitors = [
    { id: 1, name: 'Ahmed Ali', mobile: '+971 50 123 4567', purpose: 'Personal Visit', date: '2024-12-02', time: '14:00', status: 'Approved' },
    { id: 2, name: 'Sarah Mohammed', mobile: '+971 55 987 6543', purpose: 'Delivery', date: '2024-12-01', time: '10:30', status: 'Pending' },
    { id: 3, name: 'John Doe', mobile: '+971 56 456 7890', purpose: 'Maintenance', date: '2024-11-30', time: '09:00', status: 'Scheduled' },
  ];

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
    // Reset form
    setVisitorData({
      name: '',
      mobile: '',
      purpose: '',
      vehicle: '',
      date: '',
      time: '',
    });
  };

  const handleGenerateQR = (visitor: any) => {
    setSelectedVisitor(visitor);
    setShowQRModal(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">Visitor Management</h1>
          <p className="text-gray-500 text-sm">Pre-register and manage your guests</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Visitor</span>
        </button>
      </div>

      {/* Visitors List */}
      <div className="space-y-4">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#CCE5EB] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#005B78]">{visitor.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1 truncate">{visitor.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{visitor.mobile}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {visitor.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {visitor.time}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap flex-shrink-0 ${
                  visitor.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  visitor.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {visitor.status}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleGenerateQR(visitor)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#E6F2F5] text-[#005B78] rounded-lg hover:bg-[#CCE5EB] transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="text-sm">QR Code</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Visitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 mb-6">Add Visitor</h2>

            <form onSubmit={handleAddVisitor} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  value={visitorData.name}
                  onChange={(e) => setVisitorData({ ...visitorData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Mobile Number</label>
                <input
                  type="tel"
                  value={visitorData.mobile}
                  onChange={(e) => setVisitorData({ ...visitorData, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  placeholder="+971 50 123 4567"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm sm:text-base">Visit Date</label>
                  <input
                    type="date"
                    value={visitorData.date}
                    onChange={(e) => setVisitorData({ ...visitorData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm sm:text-base">Visit Time</label>
                  <input
                    type="time"
                    value={visitorData.time}
                    onChange={(e) => setVisitorData({ ...visitorData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Purpose of Visit</label>
                <select
                  value={visitorData.purpose}
                  onChange={(e) => setVisitorData({ ...visitorData, purpose: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                >
                  <option value="personal">Personal Visit</option>
                  <option value="delivery">Delivery</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors order-1 sm:order-2"
                >
                  Add Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedVisitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center">
            <h2 className="text-gray-900 mb-6">Visitor QR Code</h2>
            
            <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
              <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-white rounded-xl flex items-center justify-center">
                <QrCode className="w-32 h-32 sm:w-48 sm:h-48 text-gray-800" />
              </div>
            </div>

            <div className="text-left mb-6 bg-gray-50 rounded-xl p-4">
              <p className="text-gray-900 mb-1">{selectedVisitor.name}</p>
              <p className="text-gray-500 text-sm mb-2">{selectedVisitor.mobile}</p>
              <p className="text-gray-500 text-sm">{selectedVisitor.date} at {selectedVisitor.time}</p>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
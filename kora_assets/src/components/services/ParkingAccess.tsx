import { useState } from 'react';
import { Car, CreditCard, Plus, CheckCircle, Clock } from 'lucide-react';

export function ParkingAccess() {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showRequestCard, setShowRequestCard] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    color: '',
    plateNumber: '',
    type: 'car',
  });

  const vehicles = [
    { id: 1, make: 'Toyota', model: 'Camry', color: 'Silver', plate: 'ABC 1234', type: 'Car', status: 'Active' },
    { id: 2, make: 'Honda', model: 'Civic', color: 'Black', plate: 'XYZ 5678', type: 'Car', status: 'Active' },
  ];

  const accessCards = [
    { id: 1, type: 'Parking Card', number: 'PC-001234', status: 'Active', issuedDate: '2024-01-15' },
    { id: 2, type: 'Access Card', number: 'AC-005678', status: 'Active', issuedDate: '2024-01-15' },
  ];

  const cardRequests = [
    { id: 1, type: 'Replacement Card', reason: 'Lost Card', status: 'In Progress', date: '2024-11-28' },
  ];

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddVehicle(false);
    setVehicleData({
      make: '',
      model: '',
      color: '',
      plateNumber: '',
      type: 'car',
    });
  };

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Parking & Access Cards</h1>

      {/* Registered Vehicles */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-gray-900">Registered Vehicles</h2>
          <button
            onClick={() => setShowAddVehicle(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Vehicle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-gray-500 text-sm">{vehicle.color} • {vehicle.type}</p>
                    <p className="text-gray-900 mt-1">{vehicle.plate}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs whitespace-nowrap flex-shrink-0">
                  {vehicle.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Cards */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-gray-900">My Access Cards</h2>
          <button
            onClick={() => setShowRequestCard(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#005B78] text-[#005B78] rounded-xl hover:bg-[#E6F2F5] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Request Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accessCards.map((card) => (
            <div key={card.id} className="bg-gradient-to-br from-[#005B78] to-[#003F54] rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-indigo-100 text-sm mb-1">{card.type}</p>
                  <p className="text-xl mb-2">{card.number}</p>
                  <p className="text-indigo-100 text-sm">Issued: {card.issuedDate}</p>
                </div>
                <CreditCard className="w-8 h-8 text-[#CCE5EB]" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-indigo-400">
                <span className="text-[#CCE5EB] text-sm">Status</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">{card.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Requests */}
      {cardRequests.length > 0 && (
        <div>
          <h2 className="text-gray-900 mb-4">Pending Requests</h2>
          <div className="space-y-3">
            {cardRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate">{request.type}</p>
                      <p className="text-gray-500 text-sm truncate">{request.reason} • Requested on {request.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs whitespace-nowrap">
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 mb-6">Add Vehicle</h2>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Vehicle Type</label>
                <select
                  value={vehicleData.type}
                  onChange={(e) => setVehicleData({ ...vehicleData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                >
                  <option value="car">Car</option>
                  <option value="suv">SUV</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="van">Van</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Make</label>
                <input
                  type="text"
                  value={vehicleData.make}
                  onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  placeholder="e.g., Toyota"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Model</label>
                <input
                  type="text"
                  value={vehicleData.model}
                  onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  placeholder="e.g., Camry"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Color</label>
                <input
                  type="text"
                  value={vehicleData.color}
                  onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  placeholder="e.g., Silver"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Plate Number</label>
                <input
                  type="text"
                  value={vehicleData.plateNumber}
                  onChange={(e) => setVehicleData({ ...vehicleData, plateNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  placeholder="ABC 1234"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddVehicle(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] order-1 sm:order-2"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Card Modal */}
      {showRequestCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 mb-6">Request Access Card</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Request Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none">
                  <option value="new">New Card</option>
                  <option value="replacement">Replacement Card</option>
                  <option value="additional">Additional Card</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Reason</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none resize-none"
                  rows={4}
                  placeholder="Provide details..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowRequestCard(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowRequestCard(false)}
                  className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] order-1 sm:order-2"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
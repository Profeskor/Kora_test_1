import { useState } from 'react';
import { Wrench, Plus, Clock, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

export function ServicesSection() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const requests = [
    { 
      id: 1, 
      title: 'AC Repair', 
      category: 'HVAC', 
      status: 'In Progress', 
      date: '2024-11-28',
      assignedTo: 'John Technician',
      priority: 'High'
    },
    { 
      id: 2, 
      title: 'Leaking Faucet', 
      category: 'Plumbing', 
      status: 'Pending', 
      date: '2024-11-29',
      assignedTo: 'Unassigned',
      priority: 'Medium'
    },
    { 
      id: 3, 
      title: 'Light Fixture Replacement', 
      category: 'Electrical', 
      status: 'Completed', 
      date: '2024-11-20',
      assignedTo: 'Sarah Electrician',
      priority: 'Low'
    },
    { 
      id: 4, 
      title: 'Door Lock Issue', 
      category: 'General', 
      status: 'Completed', 
      date: '2024-11-15',
      assignedTo: 'Mike Handyman',
      priority: 'High'
    },
  ];

  const stats = [
    { label: 'Pending', value: '1', color: 'orange', icon: Clock },
    { label: 'In Progress', value: '1', color: 'blue', icon: Wrench },
    { label: 'Completed', value: '2', color: 'green', icon: CheckCircle },
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRequestModal(false);
    setCategory('');
    setDescription('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'open') return request.status === 'Pending';
    if (activeFilter === 'in-progress') return request.status === 'In Progress';
    if (activeFilter === 'completed') return request.status === 'Completed';
    return false;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">Service Requests</h1>
          <p className="text-gray-500 text-sm">Manage maintenance and service requests</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mb-1">{stat.label}</p>
              <p className="text-gray-900 text-lg sm:text-xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'open', 'in-progress', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl whitespace-nowrap transition-colors text-sm sm:text-base ${
              activeFilter === tab
                ? 'bg-[#005B78] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-[#CCE5EB] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-[#005B78]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1 truncate">{request.title}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{request.description}</p>
                    <p className="text-gray-400 text-xs">Request #{request.id} • {request.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ml-2 ${
                  request.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                  request.status === 'In Progress' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {request.status}
                </span>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-[#005B78] hover:bg-[#E6F2F5] rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 mb-6">New Service Request</h2>

            <form onSubmit={handleSubmitRequest} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="ac">Air Conditioning</option>
                  <option value="maintenance">General Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none resize-none"
                  rows={5}
                  placeholder="Please describe the issue in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Upload Photos (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#005B78] transition-colors cursor-pointer">
                  <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Click to upload images</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors order-1 sm:order-2"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
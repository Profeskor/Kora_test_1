import { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, Clock, Download, Plus, DollarSign } from 'lucide-react';

interface PaymentsSectionProps {
  userType?: 'homeowner' | 'tenant';
}

export function PaymentsSection({ userType }: PaymentsSectionProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank' | null>(null);

  const payments = [
    { id: 1, type: 'Rent', amount: 1500, date: '2024-12-01', status: 'Paid', method: 'Card ending in 4242' },
    { id: 2, type: 'Utilities', amount: 150, date: '2024-12-01', status: 'Paid', method: 'Bank transfer' },
    { id: 3, type: 'Rent', amount: 1500, date: '2024-11-01', status: 'Paid', method: 'Card ending in 4242' },
    { id: 4, type: 'Parking', amount: 75, date: '2024-11-15', status: 'Paid', method: 'Card ending in 4242' },
    { id: 5, type: 'Rent', amount: 1500, date: '2024-10-01', status: 'Paid', method: 'Bank transfer' },
  ];

  const upcomingPayments = [
    { id: 1, type: 'Rent', amount: 1500, dueDate: '2025-01-01', autopay: true },
    { id: 2, type: 'Utilities', amount: 150, dueDate: '2025-01-01', autopay: false },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">Payments</h1>
          <p className="text-gray-500 text-sm">Manage your rent and payments</p>
        </div>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Make Payment</span>
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#005B78] to-[#003F54] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 text-white">
        <p className="text-[#CCE5EB] mb-2 text-sm sm:text-base">Current Balance</p>
        <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl">$1,650.00</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#CCE5EB] text-xs sm:text-sm mb-1">Next Payment</p>
            <p className="text-sm sm:text-base">Jan 1, 2025</p>
          </div>
          <div>
            <p className="text-[#CCE5EB] text-xs sm:text-sm mb-1">Amount Due</p>
            <p className="text-sm sm:text-base">$1,650.00</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { icon: CreditCard, label: 'Pay Rent', color: 'blue' },
          { icon: Download, label: 'Download Receipt', color: 'green' },
          { icon: Calendar, label: 'Schedule Payment', color: 'purple' },
          { icon: DollarSign, label: 'Payment Methods', color: 'orange' },
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${action.color}-600`} />
              </div>
              <p className="text-gray-900 text-xs sm:text-sm">{action.label}</p>
            </button>
          );
        })}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Payment History</h3>
          <button className="text-[#005B78] text-sm hover:text-[#004760]">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { date: 'Dec 1, 2024', amount: '$1,650.00', status: 'Paid', method: 'Credit Card' },
            { date: 'Nov 1, 2024', amount: '$1,650.00', status: 'Paid', method: 'Bank Transfer' },
            { date: 'Oct 1, 2024', amount: '$1,650.00', status: 'Paid', method: 'Credit Card' },
          ].map((payment, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-2 sm:gap-0">
              <div className="flex-1">
                <p className="text-gray-900 text-sm sm:text-base">{payment.date}</p>
                <p className="text-gray-500 text-xs sm:text-sm">{payment.method}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <p className="text-gray-900 text-sm sm:text-base">{payment.amount}</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs whitespace-nowrap">
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 mb-6">Make Payment</h2>

            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Amount</label>
                <input
                  type="number"
                  defaultValue="1650.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-3 text-sm sm:text-base">Payment Method</label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                      selectedMethod === 'card' ? 'border-[#005B78] bg-[#E6F2F5]' : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 ${selectedMethod === 'card' ? 'text-[#005B78]' : 'text-gray-400'}`} />
                    <span className={selectedMethod === 'card' ? 'text-[#005B78]' : 'text-gray-700'}>
                      Card ending in 4242
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bank')}
                    className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                      selectedMethod === 'bank' ? 'border-[#005B78] bg-[#E6F2F5]' : 'border-gray-200'
                    }`}
                  >
                    <Calendar className={`w-5 h-5 ${selectedMethod === 'bank' ? 'text-[#005B78]' : 'text-gray-400'}`} />
                    <span className={selectedMethod === 'bank' ? 'text-[#005B78]' : 'text-gray-700'}>
                      Bank Transfer
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedMethod}
                  className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors order-1 sm:order-2"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
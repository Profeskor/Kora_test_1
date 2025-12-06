import { useState } from 'react';
import { ArrowLeft, CreditCard, Download, CheckCircle } from 'lucide-react';

interface QuickPayProps {
  onBack: () => void;
}

export function QuickPay({ onBack }: QuickPayProps) {
  const [step, setStep] = useState<'search' | 'payment' | 'receipt'>('search');
  const [searchType, setSearchType] = useState<'account' | 'name'>('account');
  const [searchValue, setSearchValue] = useState('');
  const [selectedDues, setSelectedDues] = useState<number[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | null>(null);

  const mockDues = [
    { id: 1, type: 'Rent', amount: 1500, dueDate: '2025-01-01' },
    { id: 2, type: 'Utilities', amount: 150, dueDate: '2025-01-01' },
    { id: 3, type: 'Service Charge', amount: 200, dueDate: '2025-01-05' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    setStep('receipt');
  };

  const toggleDue = (id: number) => {
    setSelectedDues(prev =>
      prev.includes(id) ? prev.filter(dueId => dueId !== id) : [...prev, id]
    );
  };

  const totalAmount = mockDues
    .filter(due => selectedDues.includes(due.id))
    .reduce((sum, due) => sum + due.amount, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          {step === 'search' && (
            <>
              <h2 className="text-gray-900 mb-2">Quick Pay</h2>
              <p className="text-gray-500 mb-6">Pay without logging in</p>

              <form onSubmit={handleSearch}>
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setSearchType('account')}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                      searchType === 'account'
                        ? 'border-[#005B78] bg-[#E6F2F5] text-[#005B78]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Account Number
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('name')}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                      searchType === 'name'
                        ? 'border-[#005B78] bg-[#E6F2F5] text-[#005B78]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Last Name
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    {searchType === 'account' ? 'Customer Account Number' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder={searchType === 'account' ? 'Enter account number' : 'Enter last name'}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
                >
                  Retrieve Dues
                </button>
              </form>
            </>
          )}

          {step === 'payment' && (
            <>
              <h2 className="text-gray-900 mb-2">Outstanding Dues</h2>
              <p className="text-gray-500 mb-6">Select items to pay</p>

              <div className="space-y-3 mb-6">
                {mockDues.map(due => (
                  <button
                    key={due.id}
                    type="button"
                    onClick={() => toggleDue(due.id)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      selectedDues.includes(due.id)
                        ? 'border-[#005B78] bg-[#E6F2F5]'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">{due.type}</p>
                        <p className="text-gray-500 text-sm">Due: {due.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">AED {due.amount.toFixed(2)}</p>
                        {selectedDues.includes(due.id) && (
                          <CheckCircle className="w-5 h-5 text-[#005B78] ml-auto" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedDues.length > 0 && (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700">Total Amount</span>
                      <span className="text-gray-900">AED {totalAmount.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 mb-2">Payment Method</label>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full flex items-center gap-3 p-3 border-2 rounded-xl ${
                          paymentMethod === 'card'
                            ? 'border-[#005B78] bg-white'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span>Credit/Debit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`w-full flex items-center gap-3 p-3 border-2 rounded-xl ${
                          paymentMethod === 'bank'
                            ? 'border-[#005B78] bg-white'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span>Bank Transfer</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!paymentMethod}
                    className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Pay Now
                  </button>
                </>
              )}
            </>
          )}

          {step === 'receipt' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-500">Your payment has been processed</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="text-gray-900">TXN-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="text-gray-900">AED {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="text-gray-900">
                      {paymentMethod === 'card' ? 'Credit Card' : 'Bank Transfer'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </button>

              <button
                onClick={onBack}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Search,
  CreditCard,
  ArrowLeft,
  Download,
  CheckCircle,
} from "lucide-react";

interface QuickPayScreenProps {
  onBack: () => void;
}

export function QuickPayScreen({ onBack }: QuickPayScreenProps) {
  const [step, setStep] = useState<"search" | "payment" | "success">("search");
  const [accountNumber, setAccountNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [foundAccount, setFoundAccount] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate account lookup (use customerId and future-focused breakdown)
    setFoundAccount({
      customerId: "CUST-12345",
      name: "John Doe",
      property: "IL Vento Residences, Unit 1205",
      outstanding: 15000,
      breakdown: [
        { description: "Unit Payment - Q1 2026 (Scheduled)", amount: 12000 },
        { description: "Service Charge", amount: 3000 },
      ],
    });
    setStep("payment");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-[#005B78] mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your payment has been processed
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
              <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                <span className="text-gray-600">Transaction ID</span>
                <span className="text-[#005B78]">TXN-2024-001234</span>
              </div>
              <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                <span className="text-gray-600">Amount Paid</span>
                <span className="text-[#005B78]">AED 15,000.00</span>
              </div>
              <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                <span className="text-gray-600">Customer ID</span>
                <span className="text-[#005B78]">
                  {foundAccount?.customerId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="text-[#005B78]">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                /* Download receipt */
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors mb-3"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>

            <button
              onClick={onBack}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "payment" && foundAccount) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB]">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => setStep("search")}
            className="flex items-center gap-2 text-[#005B78] mb-6 hover:text-[#004760]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </button>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-[#005B78] mb-6">Payment Details</h2>

            {/* Account Info */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="mb-4">
                <p className="text-gray-500 text-sm mb-1">Account Holder</p>
                <p className="text-[#005B78]">{foundAccount.name}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-500 text-sm mb-1">Property</p>
                <p className="text-[#005B78]">{foundAccount.property}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Customer ID</p>
                <p className="text-[#005B78]">{foundAccount.customerId}</p>
              </div>
            </div>

            {/* Outstanding Breakdown */}
            <div className="mb-6">
              <h3 className="text-[#005B78] mb-4">Outstanding Amount</h3>
              <div className="space-y-3">
                {foundAccount.breakdown.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                  >
                    <span className="text-gray-700">{item.description}</span>
                    <span className="text-[#005B78]">
                      AED {item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-4 bg-[#005B78] text-white rounded-xl">
                  <span>Total Amount Due</span>
                  <span className="text-xl">
                    AED {foundAccount.outstanding.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <form onSubmit={handlePayment}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === "card"
                        ? "border-[#005B78] bg-[#E6F2F5]"
                        : "border-gray-200"
                    }`}
                  >
                    <CreditCard
                      className={`w-5 h-5 ${
                        paymentMethod === "card"
                          ? "text-[#005B78]"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={
                        paymentMethod === "card"
                          ? "text-[#005B78]"
                          : "text-gray-700"
                      }
                    >
                      Credit / Debit Card
                    </span>
                  </button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
              >
                Pay AED {foundAccount.outstanding.toLocaleString()}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB]">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#005B78] mb-6 hover:text-[#004760]"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#CCE5EB] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-[#005B78]" />
            </div>
            <h2 className="text-[#005B78] mb-2">Quick Pay</h2>
            <p className="text-gray-600 text-sm">
              Pay your property dues without logging in
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Customer ID</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your customer ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#005B78] text-white py-3 rounded-xl hover:bg-[#004760] transition-colors"
            >
              <Search className="w-5 h-5" />
              Search Customer
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Create an account to access more features
              like payment history, documents, and service requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

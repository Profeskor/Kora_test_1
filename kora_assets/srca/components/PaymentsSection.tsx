import { useState } from "react";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Plus,
  DollarSign,
} from "lucide-react";

interface PaymentsSectionProps {
  userType?: "homeowner" | "tenant";
}

export function PaymentsSection({ userType }: PaymentsSectionProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | null>(
    null
  );
  const [flowStep, setFlowStep] = useState<
    "details" | "chooseMethod" | "otp" | "receipt"
  >("details");
  const [amount, setAmount] = useState<number>(1650);
  const [chosenMethod, setChosenMethod] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const demoOtp = "123456";
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const payments = [
    {
      id: 1,
      type: "Rent",
      amount: 1500,
      date: "2024-12-01",
      status: "Paid",
      method: "Card ending in 4242",
    },
    {
      id: 2,
      type: "Utilities",
      amount: 150,
      date: "2024-12-01",
      status: "Paid",
      method: "Bank transfer",
    },
    {
      id: 3,
      type: "Rent",
      amount: 1500,
      date: "2024-11-01",
      status: "Paid",
      method: "Card ending in 4242",
    },
    {
      id: 4,
      type: "Parking",
      amount: 75,
      date: "2024-11-15",
      status: "Paid",
      method: "Card ending in 4242",
    },
    {
      id: 5,
      type: "Rent",
      amount: 1500,
      date: "2024-10-01",
      status: "Paid",
      method: "Bank transfer",
    },
  ];

  const upcomingPayments = [
    { id: 1, type: "Rent", amount: 1500, dueDate: "2025-01-01", autopay: true },
    {
      id: 2,
      type: "Utilities",
      amount: 150,
      dueDate: "2025-01-01",
      autopay: false,
    },
  ];

  // Mock saved payment methods (what we'll show in the "chooseMethod" step)
  const savedPaymentMethods = [
    { id: "card-4242", label: "Card ending in 4242", type: "card" },
    { id: "bank-uae", label: "Bank Transfer (UAEBANK)", type: "bank" },
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
        <p className="text-[#CCE5EB] mb-2 text-sm sm:text-base">
          Current Balance
        </p>
        <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl">$1,650.00</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#CCE5EB] text-xs sm:text-sm mb-1">
              Next Payment
            </p>
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
          { icon: CreditCard, label: "Pay Rent", color: "blue" },
          { icon: Download, label: "Download Receipt", color: "green" },
          { icon: Calendar, label: "Schedule Payment", color: "purple" },
          { icon: DollarSign, label: "Payment Methods", color: "orange" },
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-${action.color}-600`}
                />
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
          <button className="text-[#005B78] text-sm hover:text-[#004760]">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {[
            {
              date: "Dec 1, 2024",
              amount: "$1,650.00",
              status: "Paid",
              method: "Credit Card",
            },
            {
              date: "Nov 1, 2024",
              amount: "$1,650.00",
              status: "Paid",
              method: "Bank Transfer",
            },
            {
              date: "Oct 1, 2024",
              amount: "$1,650.00",
              status: "Paid",
              method: "Credit Card",
            },
          ].map((payment, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-2 sm:gap-0"
            >
              <div className="flex-1">
                <p className="text-gray-900 text-sm sm:text-base">
                  {payment.date}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {payment.method}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <p className="text-gray-900 text-sm sm:text-base">
                  {payment.amount}
                </p>
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
            {/* flowStep: details -> chooseMethod -> otp -> receipt */}
            {flowStep === "details" && (
              <div>
                <h2 className="text-gray-900 mb-6">Make Payment</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e: any) => setAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-3 text-sm sm:text-base">
                      Payment Method (select to preview saved methods)
                    </label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setFlowStep("chooseMethod")}
                        className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all border-gray-200`}
                      >
                        <CreditCard className={`w-5 h-5 text-gray-400`} />
                        <span className={"text-gray-700"}>
                          Choose from saved payment methods
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPaymentModal(false);
                        setFlowStep("details");
                      }}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlowStep("chooseMethod")}
                      className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors order-1 sm:order-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {flowStep === "chooseMethod" && (
              <div>
                <h2 className="text-gray-900 mb-4">Choose Payment Method</h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Select one of your saved payment methods to continue
                </p>
                <div className="space-y-3 mb-6">
                  {savedPaymentMethods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setChosenMethod(m.label);
                        setFlowStep("otp");
                      }}
                      className="w-full p-4 border-2 rounded-xl text-left transition-all border-gray-200 hover:border-[#005B78]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900">{m.label}</p>
                          <p className="text-gray-500 text-sm">
                            {m.type === "card"
                              ? "Credit / Debit Card"
                              : "Bank Transfer"}
                          </p>
                        </div>
                        <div className="text-gray-700">
                          {m.type === "card" ? "•••• 4242" : "UAEBANK"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setFlowStep("details")}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setChosenMethod(savedPaymentMethods[0].label);
                      setFlowStep("otp");
                    }}
                    className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760]"
                  >
                    Use First Method
                  </button>
                </div>
              </div>
            )}

            {flowStep === "otp" && (
              <div>
                <h2 className="text-gray-900 mb-2">Confirm Payment</h2>
                <p className="text-gray-500 mb-6 text-sm">
                  We will charge <strong>AED {amount}</strong> using{" "}
                  <strong>{chosenMethod}</strong>. Enter the OTP sent to your
                  registered contact to confirm.
                </p>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 text-sm">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e: any) => setEnteredOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005B78] outline-none"
                  />
                  <p className="text-gray-500 text-xs mt-2">
                    Demo OTP: <strong>{demoOtp}</strong>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setFlowStep("chooseMethod")}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      // simple demo verification
                      if (enteredOtp === demoOtp) {
                        setTransactionId(`TXN-${Date.now()}`);
                        setFlowStep("receipt");
                      } else {
                        // small client-side feedback; in real app show toast / validation
                        alert("Invalid OTP. Try the demo OTP shown.");
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760]"
                  >
                    Verify & Pay
                  </button>
                </div>
              </div>
            )}

            {flowStep === "receipt" && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-500">
                    Your payment has been processed
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID</span>
                      <span className="text-gray-900">{transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="text-gray-900">
                        AED {amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="text-gray-900">{chosenMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setFlowStep("details");
                      setEnteredOtp("");
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      /* Download receipt stub */
                    }}
                    className="flex-1 px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760]"
                  >
                    Download Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

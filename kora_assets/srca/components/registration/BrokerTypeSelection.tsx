import { Building2, User, ChevronLeft } from 'lucide-react';

export type BrokerType = 'company' | 'individual';

interface BrokerTypeSelectionProps {
  onSelectType: (type: BrokerType) => void;
  onBack: () => void;
}

export function BrokerTypeSelection({ onSelectType, onBack }: BrokerTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="flex-1 text-center text-gray-900 mr-8">Broker Registration</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          <div className="mb-8">
            <p className="text-gray-600 text-center">Which type of account do you need?</p>
          </div>

          <div className="space-y-4 flex-1">
            {/* Company Account */}
            <button
              onClick={() => onSelectType('company')}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#005B78] hover:bg-[#E6F2F5] transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#E6F2F5] rounded-xl flex items-center justify-center group-hover:bg-[#005B78] transition-colors">
                  <Building2 className="w-6 h-6 text-[#005B78] group-hover:text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-1">Company</h3>
                  <p className="text-gray-500 text-sm">Create account for brokerage firm</p>
                </div>
              </div>
            </button>

            {/* Individual Account */}
            <button
              onClick={() => onSelectType('individual')}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#005B78] hover:bg-[#E6F2F5] transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#E6F2F5] rounded-xl flex items-center justify-center group-hover:bg-[#005B78] transition-colors">
                  <User className="w-6 h-6 text-[#005B78] group-hover:text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-1">Individual</h3>
                  <p className="text-gray-500 text-sm">Create single broker account</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

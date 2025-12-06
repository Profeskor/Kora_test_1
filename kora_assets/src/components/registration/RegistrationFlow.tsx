import { useState } from 'react';
import { RoleSelectionScreen, UserRegistrationType } from './RoleSelectionScreen';
import { BrokerTypeSelection, BrokerType } from './BrokerTypeSelection';
import { CompanyBrokerRegistration } from './CompanyBrokerRegistration';
import { IndividualBrokerRegistration } from './IndividualBrokerRegistration';
import { BuyerHomeownerRegistration } from './BuyerHomeownerRegistration';

type RegistrationStep = 
  | 'role-selection'
  | 'broker-type-selection'
  | 'company-broker-registration'
  | 'individual-broker-registration'
  | 'buyer-homeowner-registration';

interface RegistrationFlowProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function RegistrationFlow({ onComplete, onBack }: RegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('role-selection');
  const [selectedRole, setSelectedRole] = useState<UserRegistrationType | null>(null);
  const [selectedBrokerType, setSelectedBrokerType] = useState<BrokerType | null>(null);

  const handleRoleSelection = (role: UserRegistrationType) => {
    setSelectedRole(role);
    
    if (role === 'broker') {
      setCurrentStep('broker-type-selection');
    } else {
      setCurrentStep('buyer-homeowner-registration');
    }
  };

  const handleBrokerTypeSelection = (type: BrokerType) => {
    setSelectedBrokerType(type);
    
    if (type === 'company') {
      setCurrentStep('company-broker-registration');
    } else {
      setCurrentStep('individual-broker-registration');
    }
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setSelectedBrokerType(null);
    setCurrentStep('role-selection');
  };

  const handleBackToBrokerTypeSelection = () => {
    setSelectedBrokerType(null);
    setCurrentStep('broker-type-selection');
  };

  if (currentStep === 'role-selection') {
    return <RoleSelectionScreen onSelectRole={handleRoleSelection} onBack={onBack} />;
  }

  if (currentStep === 'broker-type-selection') {
    return (
      <BrokerTypeSelection
        onSelectType={handleBrokerTypeSelection}
        onBack={handleBackToRoleSelection}
      />
    );
  }

  if (currentStep === 'company-broker-registration') {
    return (
      <CompanyBrokerRegistration
        onComplete={onComplete}
        onBack={handleBackToBrokerTypeSelection}
      />
    );
  }

  if (currentStep === 'individual-broker-registration') {
    return (
      <IndividualBrokerRegistration
        onComplete={onComplete}
        onBack={handleBackToBrokerTypeSelection}
      />
    );
  }

  if (currentStep === 'buyer-homeowner-registration' && selectedRole) {
    return (
      <BuyerHomeownerRegistration
        userType={selectedRole as 'buyer' | 'homeowner'}
        onComplete={onComplete}
        onBack={handleBackToRoleSelection}
      />
    );
  }

  return null;
}
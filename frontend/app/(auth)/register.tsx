import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette, backgrounds } from "@/src/constants/colors";
import {
  IndividualFormData,
  CompanyFormData,
  BrokerType,
} from "../../src/types/registration";
import {
  validateIndividualStep1,
  validateIndividualStep2,
  validateIndividualStep3,
  validateIndividualStep5 as validateIndividualStep4Documents,
  validateCompanyStep1,
  validateCompanyStep2,
  validateCompanyStep3,
  validateCompanyStep4,
  validateCompanyStep5,
  validateCompanyStep6,
} from "../../src/utils/validation";
import Toast from "../../src/components/forms/Toast";
import {
  Step1Credentials,
  Step2PersonalDetails,
  Step3Address,
  Step4Documents,
} from "@/src/components/registration/components/IndividualSteps";
import {
  Step1Representative,
  Step2AgencyDetails,
  Step3ContactAddress,
  Step4TaxInfo,
  Step5BankDetails as CompanyStep5BankDetails,
  Step6Documents as CompanyStep6Documents,
} from "@/src/components/registration/components/CompanySteps";
// import { buildFormData } from "../../../src/components/registration/utils/formDataBuilder"; // Uncomment when implementing real API
import ProgressIndicator from "@/src/components/registration/components/ProgressIndicator";
import StepNavigation from "@/src/components/registration/components/StepNavigation";

const TOTAL_STEPS_INDIVIDUAL = 4;
const TOTAL_STEPS_COMPANY = 6;

export default function RegisterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    selectedRole?: string;
    brokerType?: string;
  }>();

  const brokerType = (params.brokerType as BrokerType) || "individual";
  const isCompany = brokerType === "company";
  const totalSteps = isCompany ? TOTAL_STEPS_COMPANY : TOTAL_STEPS_INDIVIDUAL;

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ visible: false, message: "", type: "info" });

  // Individual Form State
  const [individualData, setIndividualData] = useState<IndividualFormData>({
    email: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
    full_name: "",
    nationality: "",
    dob: null,
    address_line_1: "",
    city: "",
    country: "UAE",
    po_box: "",
    bank_name: "",
    account_holder_name: "",
    iban: "",
    swift_code: "",
    passport_copy: null,
    emirates_id_front: null,
    emirates_id_back: null,
    rera_certificate: null,
  });

  // Company Form State
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    email: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
    rep_designation: "",
    company_name: "",
    trade_license_number: "",
    trade_license_expiry: null,
    rera_registration_number: "",
    rera_expiry_date: null,
    office_address: "",
    landline_number: "",
    website_url: "",
    trn_number: "",
    vat_certificate_expiry: null,
    bank_name: "",
    account_holder_name: "",
    iban: "",
    swift_code: "",
    trade_license_copy: null,
    rera_certificate_copy: null,
    vat_certificate_copy: null,
    memorandum_of_association: null,
    passport_visa_copies: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ visible: true, message, type });
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: Record<string, string> = {};

    if (isCompany) {
      switch (currentStep) {
        case 1:
          stepErrors = validateCompanyStep1(companyData);
          break;
        case 2:
          stepErrors = validateCompanyStep2(companyData);
          break;
        case 3:
          stepErrors = validateCompanyStep3(companyData);
          break;
        case 4:
          stepErrors = validateCompanyStep4(companyData);
          break;
        case 5:
          stepErrors = validateCompanyStep5(companyData);
          break;
        case 6:
          stepErrors = validateCompanyStep6(companyData);
          break;
      }
    } else {
      switch (currentStep) {
        case 1:
          stepErrors = validateIndividualStep1(individualData);
          break;
        case 2:
          stepErrors = validateIndividualStep2(individualData);
          break;
        case 3:
          stepErrors = validateIndividualStep3(individualData);
          break;
        case 4:
          stepErrors = validateIndividualStep4Documents(individualData);
          break;
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      console.log("Registration failed (invalid step)", errors);
      return;
    }

    setLoading(true);

    try {
      // MOCK API CALL - Simulate document upload and processing
      // This simulates a realistic upload experience with a 3-second delay
      // NOTE: In production, replace this entire block with:
      // const formDataToSend = buildFormData(individualData, companyData, brokerType);
      // const response = await axios.post(
      //   "https://api.example.com/register/broker",
      //   formDataToSend,
      //   { headers: { "Content-Type": "multipart/form-data" } }
      // );
      // if (response.status === 200 || response.status === 201) {
      //   router.replace("/(auth)/register/success");
      // } else {
      //   throw new Error(response.data?.message || "Registration failed");
      // }

      // Simulate upload processing time
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock: Always succeed - navigate to success page
      console.log("Registration successful (mock)");
      router.replace("/(auth)/register/success");
    } catch (error: any) {
      // Error handling for future real API integration
      // This should not execute in mock mode
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      showToast(errorMessage, "error");
      setLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    if (isCompany) {
      setCompanyData(
        (prev) => ({ ...prev, [field]: value } as CompanyFormData)
      );
    } else {
      setIndividualData(
        (prev) => ({ ...prev, [field]: value } as IndividualFormData)
      );
    }
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Auto-fill account_holder_name for Company Step 5
  React.useEffect(() => {
    if (
      isCompany &&
      currentStep === 5 &&
      companyData.company_name &&
      !companyData.account_holder_name
    ) {
      setCompanyData((prev) => ({
        ...prev,
        account_holder_name: prev.company_name,
      }));
    }
  }, [
    currentStep,
    isCompany,
    companyData.company_name,
    companyData.account_holder_name,
  ]);

  const renderStepContent = () => {
    if (isCompany) {
      switch (currentStep) {
        case 1:
          return (
            <Step1Representative
              data={companyData}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 2:
          return (
            <Step2AgencyDetails
              data={companyData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 3:
          return (
            <Step3ContactAddress
              data={companyData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 4:
          return (
            <Step4TaxInfo
              data={companyData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 5:
          return (
            <CompanyStep5BankDetails
              data={companyData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 6:
          return (
            <CompanyStep6Documents
              data={companyData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return (
            <Step1Credentials
              data={individualData}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 2:
          return (
            <Step2PersonalDetails
              data={individualData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 3:
          return (
            <Step3Address
              data={individualData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        case 4:
          return (
            <Step4Documents
              data={individualData}
              errors={errors}
              onUpdateField={updateField}
              stepNumber={currentStep}
              totalSteps={totalSteps}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={palette.brand.primary} />
          <Text style={styles.loadingText}>Submitting application...</Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={20} color={palette.brand.primary} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            isCompany={isCompany}
          />

          {renderStepContent()}

          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast({ ...toast, visible: false })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButtonText: {
    color: palette.brand.primary,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  loginLink: {
    marginTop: 16,
    alignSelf: "center",
  },
  loginLinkText: {
    color: palette.brand.primary,
    fontSize: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: palette.brand.primary,
    fontWeight: "500",
  },
});

import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import ForgotPasswordUsername from "../../src/components/auth/ForgotPasswordUsername";
import ForgotPasswordOTP from "../../src/components/auth/ForgotPasswordOTP";
import ForgotPasswordNewPassword from "../../src/components/auth/ForgotPasswordNewPassword";
import ForgotPasswordSuccess from "../../src/components/auth/ForgotPasswordSuccess";

type ForgotPasswordStep = "username" | "otp" | "password" | "success";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] =
    useState<ForgotPasswordStep>("username");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUsernameNext = (email: string) => {
    setEmailOrUsername(email);
    setCurrentStep("otp");
  };

  const handleOTPNext = (otpCode: string) => {
    setOtp(otpCode);
    setCurrentStep("password");
  };

  const handlePasswordNext = (password: string) => {
    setNewPassword(password);
    setCurrentStep("success");
  };

  const handleBack = () => {
    if (currentStep === "otp") {
      setCurrentStep("username");
      setEmailOrUsername("");
    } else if (currentStep === "password") {
      setCurrentStep("otp");
      setOtp("");
    } else if (currentStep === "success") {
      setCurrentStep("password");
      setNewPassword("");
    }
  };

  const handleSuccessLogin = () => {
    // Reset all state
    setCurrentStep("username");
    setEmailOrUsername("");
    setOtp("");
    setNewPassword("");
  };

  return (
    <View style={{ flex: 1 }}>
      {currentStep === "username" && (
        <ForgotPasswordUsername
          onNext={handleUsernameNext}
          onBack={() => router.back()}
        />
      )}
      {currentStep === "otp" && (
        <ForgotPasswordOTP
          emailOrUsername={emailOrUsername}
          onNext={handleOTPNext}
          onBack={handleBack}
        />
      )}
      {currentStep === "password" && (
        <ForgotPasswordNewPassword
          onNext={handlePasswordNext}
          onBack={handleBack}
        />
      )}
      {currentStep === "success" && (
        <ForgotPasswordSuccess onLoginPress={handleSuccessLogin} />
      )}
    </View>
  );
}

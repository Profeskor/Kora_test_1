import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { CompanyFormData } from "../../../../../src/types/registration";
import PhoneInput from "../../../../../src/components/forms/PhoneInput";
import StepWrapper from "../../../../../src/components/registration/components/StepWrapper";

interface Step1RepresentativeProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onUpdateField: (field: string, value: any) => void;
}

export default function Step1Representative({
  data,
  errors,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  onUpdateField,
}: Step1RepresentativeProps) {
  return (
    <StepWrapper
      stepNumber={1}
      totalSteps={6}
      title="Representative Credentials"
      subtitle="Create login for company representative"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Email <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={data.email}
          onChangeText={(text) => onUpdateField("email", text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View
          style={[styles.passwordWrapper, errors.password && styles.inputError]}
        >
          <TextInput
            style={styles.passwordInput}
            placeholder="Create a strong password"
            secureTextEntry={!showPassword}
            value={data.password}
            onChangeText={(text) => onUpdateField("password", text)}
          />
          <TouchableOpacity onPress={onTogglePassword} style={styles.eyeButton}>
            {showPassword ? (
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Confirm Password <Text style={styles.required}>*</Text>
        </Text>
        <View
          style={[
            styles.passwordWrapper,
            errors.confirm_password && styles.inputError,
          ]}
        >
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm your password"
            secureTextEntry={!showConfirmPassword}
            value={data.confirm_password}
            onChangeText={(text) => onUpdateField("confirm_password", text)}
          />
          <TouchableOpacity
            onPress={onToggleConfirmPassword}
            style={styles.eyeButton}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        </View>
        {errors.confirm_password && (
          <Text style={styles.errorText}>{errors.confirm_password}</Text>
        )}
      </View>

      <PhoneInput
        label="Mobile Number"
        value={data.mobile_number}
        onChangeText={(text) => onUpdateField("mobile_number", text)}
        error={errors.mobile_number}
        required
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Representative Designation <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.rep_designation && styles.inputError]}
          placeholder="e.g., Manager, Admin"
          value={data.rep_designation}
          onChangeText={(text) => onUpdateField("rep_designation", text)}
        />
        {errors.rep_designation && (
          <Text style={styles.errorText}>{errors.rep_designation}</Text>
        )}
      </View>
    </StepWrapper>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 14,
    backgroundColor: "white",
    fontSize: 16,
    color: "#111827",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "white",
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});

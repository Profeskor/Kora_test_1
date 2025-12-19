import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { CompanyFormData } from "@/src/types/registration";
import DatePicker from "@/src/components/forms/DatePicker";
import StepWrapper from "../StepWrapper";

interface Step2AgencyDetailsProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function Step2AgencyDetails({
  data,
  errors,
  onUpdateField,
  stepNumber,
  totalSteps,
}: Step2AgencyDetailsProps) {
  return (
    <StepWrapper
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title="Agency Details"
      subtitle="Company information"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Company Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.company_name && styles.inputError]}
          placeholder="Enter company name"
          value={data.company_name}
          onChangeText={(text) => onUpdateField("company_name", text)}
        />
        {errors.company_name && (
          <Text style={styles.errorText}>{errors.company_name}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Trade License Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            errors.trade_license_number && styles.inputError,
          ]}
          placeholder="Enter trade license number"
          value={data.trade_license_number}
          onChangeText={(text) => onUpdateField("trade_license_number", text)}
        />
        {errors.trade_license_number && (
          <Text style={styles.errorText}>{errors.trade_license_number}</Text>
        )}
      </View>

      <DatePicker
        label="Trade License Expiry"
        value={data.trade_license_expiry}
        onChange={(date: Date) => onUpdateField("trade_license_expiry", date)}
        error={errors.trade_license_expiry}
        required
        minimumDate={new Date()}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          RERA Registration Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            errors.rera_registration_number && styles.inputError,
          ]}
          placeholder="Enter RERA registration number"
          value={data.rera_registration_number}
          onChangeText={(text) =>
            onUpdateField("rera_registration_number", text)
          }
        />
        {errors.rera_registration_number && (
          <Text style={styles.errorText}>
            {errors.rera_registration_number}
          </Text>
        )}
      </View>

      <DatePicker
        label="RERA Expiry Date"
        value={data.rera_expiry_date}
        onChange={(date) => onUpdateField("rera_expiry_date", date)}
        error={errors.rera_expiry_date}
        required
      />
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
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});

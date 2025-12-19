import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { CompanyFormData } from "../../../../../src/types/registration";
import PhoneInput from "../../../../../src/components/forms/PhoneInput";
import StepWrapper from "../../../../../src/components/registration/components/StepWrapper";

interface Step3ContactAddressProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export default function Step3ContactAddress({
  data,
  errors,
  onUpdateField,
}: Step3ContactAddressProps) {
  return (
    <StepWrapper
      stepNumber={3}
      totalSteps={6}
      title="Contact & Address"
      subtitle="Office information"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Office Address <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.textArea, errors.office_address && styles.inputError]}
          placeholder="Enter office address"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={data.office_address}
          onChangeText={(text) => onUpdateField("office_address", text)}
        />
        {errors.office_address && (
          <Text style={styles.errorText}>{errors.office_address}</Text>
        )}
      </View>

      <PhoneInput
        label="Landline Number"
        value={data.landline_number}
        onChangeText={(text) => onUpdateField("landline_number", text)}
        error={errors.landline_number}
        required
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Website URL (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com"
          keyboardType="url"
          autoCapitalize="none"
          value={data.website_url}
          onChangeText={(text) => onUpdateField("website_url", text)}
        />
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
  textArea: {
    minHeight: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 14,
    paddingVertical: 12,
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

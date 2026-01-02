import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { CompanyFormData } from "../../../../../src/types/registration";
import {
  textColors,
  backgrounds,
  borders,
  palette,
} from "@/src/constants/colors";
import DatePicker from "../../../../../src/components/forms/DatePicker";
import StepWrapper from "../../../../../src/components/registration/components/StepWrapper";

interface Step4TaxInfoProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export default function Step4TaxInfo({
  data,
  errors,
  onUpdateField,
}: Step4TaxInfoProps) {
  return (
    <StepWrapper
      stepNumber={4}
      totalSteps={6}
      title="Tax Information"
      subtitle="Tax registration details"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          TRN Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.trn_number && styles.inputError]}
          placeholder="Enter 15-digit TRN"
          keyboardType="numeric"
          value={data.trn_number}
          onChangeText={(text) => onUpdateField("trn_number", text)}
          maxLength={15}
        />
        {errors.trn_number && (
          <Text style={styles.errorText}>{errors.trn_number}</Text>
        )}
      </View>

      <DatePicker
        label="VAT Certificate Expiry"
        value={data.vat_certificate_expiry}
        onChange={(date) => onUpdateField("vat_certificate_expiry", date)}
        error={errors.vat_certificate_expiry}
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
    color: textColors.body,
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {
    color: palette.status.error,
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.default,
    paddingHorizontal: 14,
    backgroundColor: backgrounds.card,
    fontSize: 16,
    color: textColors.heading,
  },
  inputError: {
    borderColor: palette.status.error,
  },
  errorText: {
    fontSize: 12,
    color: palette.status.error,
    marginTop: 4,
  },
});

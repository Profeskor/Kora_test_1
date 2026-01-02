import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { CompanyFormData } from "@/src/types/registration";
import StepWrapper from "../StepWrapper";
import {
  palette,
  textColors,
  borders,
  backgrounds,
} from "../../../../constants/colors";

interface Step5BankDetailsProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function Step5BankDetails({
  data,
  errors,
  onUpdateField,
  stepNumber,
  totalSteps,
}: Step5BankDetailsProps) {
  return (
    <StepWrapper
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title="Bank Details"
      subtitle="For commission payouts"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Bank Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.bank_name && styles.inputError]}
          placeholder="Enter bank name"
          value={data.bank_name}
          onChangeText={(text) => onUpdateField("bank_name", text)}
        />
        {errors.bank_name && (
          <Text style={styles.errorText}>{errors.bank_name}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Account Holder Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            errors.account_holder_name && styles.inputError,
          ]}
          placeholder="Account holder name"
          value={data.account_holder_name}
          onChangeText={(text) => onUpdateField("account_holder_name", text)}
        />
        {errors.account_holder_name && (
          <Text style={styles.errorText}>{errors.account_holder_name}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          IBAN <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.iban && styles.inputError]}
          placeholder="AE07 0331 2345 6789 0123 456"
          value={data.iban}
          onChangeText={(text) => onUpdateField("iban", text.toUpperCase())}
        />
        {errors.iban && <Text style={styles.errorText}>{errors.iban}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          SWIFT Code <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.swift_code && styles.inputError]}
          placeholder="Enter SWIFT code"
          value={data.swift_code}
          onChangeText={(text) =>
            onUpdateField("swift_code", text.toUpperCase())
          }
        />
        {errors.swift_code && (
          <Text style={styles.errorText}>{errors.swift_code}</Text>
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
    color: textColors.body,
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {
    color: palette.brand.secondary,
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
    borderColor: palette.brand.secondary,
  },
  errorText: {
    fontSize: 12,
    color: palette.brand.secondary,
    marginTop: 4,
  },
});

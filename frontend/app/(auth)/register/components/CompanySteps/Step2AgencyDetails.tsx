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

interface Step2AgencyDetailsProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export default function Step2AgencyDetails({
  data,
  errors,
  onUpdateField,
}: Step2AgencyDetailsProps) {
  return (
    <StepWrapper
      stepNumber={2}
      totalSteps={6}
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

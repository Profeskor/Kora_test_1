import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { IndividualFormData } from "@/src/types/registration";
import DatePicker from "@/src/components/forms/DatePicker";
import Dropdown from "@/src/components/forms/Dropdown";
import { nationalities } from "@/src/utils/nationalities";
import StepWrapper from "../StepWrapper";
import {
  palette,
  textColors,
  borders,
  backgrounds,
} from "../../../../constants/colors";

interface Step2PersonalDetailsProps {
  data: IndividualFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function Step2PersonalDetails({
  data,
  errors,
  onUpdateField,
  stepNumber,
  totalSteps,
}: Step2PersonalDetailsProps) {
  return (
    <StepWrapper
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title="Personal Details"
      subtitle="Tell us about yourself"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Full Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.full_name && styles.inputError]}
          placeholder="Enter your full name"
          value={data.full_name}
          onChangeText={(text) => onUpdateField("full_name", text)}
        />
        {errors.full_name && (
          <Text style={styles.errorText}>{errors.full_name}</Text>
        )}
      </View>

      <Dropdown
        label="Nationality"
        value={data.nationality}
        options={nationalities}
        onSelect={(value: string) => onUpdateField("nationality", value)}
        error={errors.nationality}
        required
        searchable
      />

      <DatePicker
        label="Date of Birth"
        value={data.dob}
        onChange={(date) => onUpdateField("dob", date)}
        error={errors.dob}
        required
        maximumDate={new Date()}
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

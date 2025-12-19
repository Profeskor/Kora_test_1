import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { IndividualFormData } from "@/src/types/registration";
import Dropdown from "@/src/components/forms/Dropdown";
import StepWrapper from "../StepWrapper";

interface Step3AddressProps {
  data: IndividualFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function Step3Address({
  data,
  errors,
  onUpdateField,
  stepNumber,
  totalSteps,
}: Step3AddressProps) {
  return (
    <StepWrapper
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title="Address Information"
      subtitle="Your residential address"
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Address Line 1 <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.address_line_1 && styles.inputError]}
          placeholder="Enter your address"
          value={data.address_line_1}
          onChangeText={(text) => onUpdateField("address_line_1", text)}
        />
        {errors.address_line_1 && (
          <Text style={styles.errorText}>{errors.address_line_1}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          City <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.city && styles.inputError]}
          placeholder="Enter your city"
          value={data.city}
          onChangeText={(text) => onUpdateField("city", text)}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      </View>

      <Dropdown
        label="Country"
        value={data.country}
        options={[{ label: "United Arab Emirates", value: "UAE" }]}
        onSelect={(value: string) => onUpdateField("country", value)}
        error={errors.country}
        required
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>PO Box (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PO Box"
          keyboardType="numeric"
          value={data.po_box}
          onChangeText={(text) => onUpdateField("po_box", text)}
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
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});

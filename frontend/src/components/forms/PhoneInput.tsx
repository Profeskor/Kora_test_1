import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Phone } from "lucide-react-native";

interface PhoneInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export default function PhoneInput({
  label,
  value,
  onChangeText,
  placeholder = "+971 50 123 4567",
  error,
  required,
}: PhoneInputProps) {
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters
    const digits = text.replace(/\D/g, "");

    // If starts with 971, keep it, otherwise prepend +971
    let formatted = digits;
    if (digits.length > 0 && !digits.startsWith("971")) {
      formatted = "971" + digits;
    }

    // Format: +971 XX XXX XXXX
    if (formatted.length > 3) {
      const countryCode = formatted.substring(0, 3);
      const rest = formatted.substring(3);

      if (rest.length > 0) {
        const part1 = rest.substring(0, 2);
        const part2 = rest.substring(2, 5);
        const part3 = rest.substring(5, 9);

        let result = `+${countryCode}`;
        if (part1) result += ` ${part1}`;
        if (part2) result += ` ${part2}`;
        if (part3) result += ` ${part3}`;

        return result;
      }
      return `+${countryCode}`;
    }

    return formatted ? `+${formatted}` : "";
  };

  const handleChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    onChangeText(formatted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <Phone size={20} color="#9CA3AF" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType="phone-pad"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "white",
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});

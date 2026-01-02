import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  error,
  required,
  maximumDate,
  minimumDate,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS - handled by Done button
      if (selectedDate) {
        onChange(selectedDate);
      }
    }
  };

  const handleDone = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        style={[styles.inputWrapper, error && styles.inputError]}
        onPress={() => setShowPicker(true)}
      >
        <Calendar size={20} color={textColors.secondary} style={styles.icon} />
        <Text style={[styles.input, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {showPicker && (
        <>
          {Platform.OS === "ios" ? (
            <Modal
              transparent
              animationType="slide"
              visible={showPicker}
              onRequestClose={() => setShowPicker(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={() => setShowPicker(false)}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleDone}
                      style={styles.doneButton}
                    >
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                  />
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.default,
    backgroundColor: backgrounds.card,
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: palette.status.error,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: textColors.heading,
  },
  placeholder: {
    color: textColors.secondary,
  },
  errorText: {
    fontSize: 12,
    color: palette.status.error,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: backgrounds.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: textColors.secondary,
  },
  doneButton: {
    padding: 8,
  },
  doneText: {
    fontSize: 16,
    color: palette.brand.primary,
    fontWeight: "600",
  },
});

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Building2, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type BrokerType = "company" | "individual";

interface BrokerTypeOption {
  type: BrokerType;
  icon: any;
  title: string;
  description: string;
}

const brokerTypeOptions: BrokerTypeOption[] = [
  {
    type: "company",
    icon: Building2,
    title: "Company",
    description: "Create account for brokerage firm",
  },
  {
    type: "individual",
    icon: User,
    title: "Individual",
    description: "Create single broker account",
  },
];

export default function BrokerTypeSelectionScreen() {
  const router = useRouter();

  const handleTypeSelect = (type: BrokerType) => {
    router.push({
      pathname: "/(auth)/register",
      params: { selectedRole: "broker", brokerType: type },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color="#005B78" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Broker Registration</Text>
        </View>

        <Text style={styles.question}>Which type of account do you need?</Text>

        <View style={styles.optionsContainer}>
          {brokerTypeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.type}
                style={styles.optionCard}
                onPress={() => handleTypeSelect(option.type)}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <Icon size={24} color="#005B78" />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButtonText: {
    color: "#005B78",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
});

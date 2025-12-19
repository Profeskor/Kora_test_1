import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Phone, MessageSquare, Mail } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Property } from "../../types";
import { useBookingStore } from "../../store/bookingStore";
import { useUserStore } from "../../store/userStore";

interface BrokerBookingFlowProps {
  property: Property;
  unitId?: string;
  agents: { name: string; phone: string; email?: string }[];
  onClose: () => void;
  onBookingCreated?: (bookingId: string) => void;
}

type FlowStep = "agent_selection" | "create_booking";

export default function BrokerBookingFlow({
  property,
  unitId,
  agents,
  onClose,
  onBookingCreated,
}: BrokerBookingFlowProps) {
  const router = useRouter();
  const { addBooking } = useBookingStore();
  const { setBrokerClientSession } = useUserStore();

  const [currentStep, setCurrentStep] = useState<FlowStep>("agent_selection");
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[0] | null>(
    null
  );
  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Step 1: Agent Selection
  const handleProceedToBooking = () => {
    if (!selectedAgent) {
      Alert.alert("Agent Required", "Please select an agent to proceed");
      return;
    }
    setCurrentStep("create_booking");
  };

  // Step 2: Create Booking
  const handleCreateBooking = () => {
    if (
      !clientFormData.name ||
      !clientFormData.email ||
      !clientFormData.phone
    ) {
      Alert.alert(
        "Required Fields",
        "Please fill in name, email, and phone number"
      );
      return;
    }

    // Save client details to session
    setBrokerClientSession({
      name: clientFormData.name,
      email: clientFormData.email,
      phone: clientFormData.phone,
      address: clientFormData.address,
      agentName: selectedAgent?.name,
    });

    // Create the booking
    const newBooking = addBooking(
      property,
      unitId,
      {
        name: clientFormData.name,
        email: clientFormData.email,
        phone: clientFormData.phone,
      },
      selectedAgent?.name
    );

    // Mark as self_created
    const { updateBooking } = useBookingStore.getState();
    updateBooking(newBooking.id, {
      source: "self_created",
      client: {
        name: clientFormData.name,
        email: clientFormData.email,
        phone: clientFormData.phone,
      },
    });

    Alert.alert("Success", "Booking created successfully!");

    // Use callback if provided (for proper iOS modal handling), otherwise navigate directly
    if (onBookingCreated) {
      onBookingCreated(newBooking.id);
    } else {
      // Fallback for direct navigation (Android works fine)
      router.push(
        `/(main)/bookings/${newBooking.id}?source=property&propertyId=${property.id}`
      );
    }
  };

  const handleGoBack = () => {
    if (currentStep === "agent_selection") {
      onClose();
    } else {
      setCurrentStep("agent_selection");
    }
  };

  // Render: Agent Selection Screen
  if (currentStep === "agent_selection") {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select RM</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.subtitle}>
            Choose a Relationship Manager to represent you in this booking
          </Text>

          <View style={styles.agentsContainer}>
            {agents.map((agent) => (
              <TouchableOpacity
                key={agent.phone}
                style={[
                  styles.agentCard,
                  selectedAgent?.phone === agent.phone &&
                    styles.agentCardSelected,
                ]}
                onPress={() => setSelectedAgent(agent)}
              >
                <View style={styles.agentCardContent}>
                  <View style={styles.agentAvatar}>
                    <Text style={styles.agentAvatarText}>
                      {agent.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.agentInfo}>
                    <Text style={styles.agentName}>{agent.name}</Text>
                    <Text style={styles.agentPhone}>{agent.phone}</Text>
                  </View>
                  {selectedAgent?.phone === agent.phone && (
                    <View style={[styles.checkmark]}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.proceedButton,
              !selectedAgent && styles.proceedButtonDisabled,
            ]}
            onPress={handleProceedToBooking}
            disabled={!selectedAgent}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render: Create Booking Screen
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Contact Agent Card */}
        {selectedAgent && (
          <View style={styles.contactAgentCard}>
            <Text style={styles.contactAgentTitle}>Your RM</Text>
            <View style={styles.contactAgentContent}>
              <View style={styles.contactAgentAvatar}>
                <Text style={styles.contactAgentAvatarText}>
                  {selectedAgent.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.contactAgentInfo}>
                <Text style={styles.contactAgentName}>
                  {selectedAgent.name}
                </Text>
                <Text style={styles.contactAgentPhone}>
                  {selectedAgent.phone}
                </Text>
              </View>
            </View>
            <View style={styles.contactAgentActions}>
              <TouchableOpacity style={styles.contactAction}>
                <Phone size={18} color="#005B78" />
                <Text style={styles.contactActionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactAction}>
                <MessageSquare size={18} color="#005B78" />
                <Text style={styles.contactActionText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactAction}>
                <Mail size={18} color="#005B78" />
                <Text style={styles.contactActionText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Client Details Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Client Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Full Name *</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter client name"
              value={clientFormData.name}
              onChangeText={(text) =>
                setClientFormData({ ...clientFormData, name: text })
              }
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address *</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter email"
              value={clientFormData.email}
              onChangeText={(text) =>
                setClientFormData({ ...clientFormData, email: text })
              }
              keyboardType="email-address"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Phone Number *</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter phone number"
              value={clientFormData.phone}
              onChangeText={(text) =>
                setClientFormData({ ...clientFormData, phone: text })
              }
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Address</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter address"
              value={clientFormData.address}
              onChangeText={(text) =>
                setClientFormData({ ...clientFormData, address: text })
              }
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.createBookingButton}
          onPress={handleCreateBooking}
        >
          <Text style={styles.createBookingButtonText}>Create Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center",
  },
  agentsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  agentCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  agentCardSelected: {
    borderColor: "#005B78",
    backgroundColor: "#F0F9FF",
  },
  agentCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  agentAvatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  agentPhone: {
    fontSize: 14,
    color: "#6B7280",
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  proceedButton: {
    backgroundColor: "#005B78",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  contactAgentCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#005B78",
  },
  contactAgentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  contactAgentContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  contactAgentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  contactAgentAvatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  contactAgentInfo: {
    flex: 1,
  },
  contactAgentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  contactAgentPhone: {
    fontSize: 14,
    color: "#6B7280",
  },
  contactAgentActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  contactAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  contactActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#005B78",
  },
  formSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
  },
  createBookingButton: {
    backgroundColor: "#005B78",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  createBookingButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});

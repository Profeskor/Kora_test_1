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
import {
  ChevronLeft,
  Phone,
  MessageSquare,
  Mail,
  FileText,
  AlertCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Property } from "../../types";
import { useBookingStore } from "../../store/bookingStore";
import { useUserStore } from "../../store/userStore";
import FileUpload, { FileInfo } from "../forms/FileUpload";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

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

  // Document upload state
  const [emiratesIdDoc, setEmiratesIdDoc] = useState<FileInfo | null>(null);
  const [passportDoc, setPassportDoc] = useState<FileInfo | null>(null);
  const [documentErrors, setDocumentErrors] = useState<{
    emiratesId?: string;
    passport?: string;
  }>({});

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
    // Reset document errors
    setDocumentErrors({});

    // Validate required fields
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

    // Validate mandatory documents
    const docErrors: { emiratesId?: string; passport?: string } = {};

    if (!emiratesIdDoc) {
      docErrors.emiratesId = "Emirates ID is required to proceed";
    }

    if (!passportDoc) {
      docErrors.passport = "Passport is required to proceed";
    }

    if (docErrors.emiratesId || docErrors.passport) {
      setDocumentErrors(docErrors);
      Alert.alert(
        "Documents Required",
        "Both Emirates ID and Passport must be uploaded before creating a booking. This is a mandatory compliance requirement.",
        [{ text: "OK" }]
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

    // Create the booking with documents
    const newBooking = addBooking(
      property,
      unitId,
      {
        name: clientFormData.name,
        email: clientFormData.email,
        phone: clientFormData.phone,
      },
      selectedAgent?.name,
      {
        emiratesId: emiratesIdDoc!,
        passport: passportDoc!,
      }
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
            <ChevronLeft size={24} color={textColors.heading} />
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
          <ChevronLeft size={24} color={textColors.heading} />
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
                <Phone size={18} color={palette.brand.primary} />
                <Text style={styles.contactActionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactAction}>
                <MessageSquare size={18} color={palette.brand.primary} />
                <Text style={styles.contactActionText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactAction}>
                <Mail size={18} color={palette.brand.primary} />
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
              placeholderTextColor={textColors.secondary}
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
              placeholderTextColor={textColors.secondary}
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
              placeholderTextColor={textColors.secondary}
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
              placeholderTextColor={textColors.secondary}
            />
          </View>
        </View>

        {/* Required Documents Section */}
        <View style={styles.formSection}>
          <View style={styles.documentSectionHeader}>
            <Text style={styles.formTitle}>Required Documents</Text>
            <View style={styles.mandatoryBadge}>
              <AlertCircle size={12} color={palette.status.error} />
              <Text style={styles.mandatoryBadgeText}>Mandatory</Text>
            </View>
          </View>
          <Text style={styles.documentSectionSubtitle}>
            Both documents are required for compliance. The booking cannot
            proceed without them.
          </Text>

          <FileUpload
            label="Emirates ID"
            file={emiratesIdDoc}
            onUpload={(file) => {
              setEmiratesIdDoc(file);
              if (file) {
                setDocumentErrors((prev) => ({
                  ...prev,
                  emiratesId: undefined,
                }));
              }
            }}
            required
            error={documentErrors.emiratesId}
          />

          <FileUpload
            label="Passport"
            file={passportDoc}
            onUpload={(file) => {
              setPassportDoc(file);
              if (file) {
                setDocumentErrors((prev) => ({ ...prev, passport: undefined }));
              }
            }}
            required
            error={documentErrors.passport}
          />

          {/* Documents Status Summary */}
          <View style={styles.documentsStatus}>
            <View style={styles.documentStatusItem}>
              <View
                style={[
                  styles.documentStatusDot,
                  emiratesIdDoc
                    ? styles.documentStatusDotSuccess
                    : styles.documentStatusDotPending,
                ]}
              />
              <Text style={styles.documentStatusText}>
                Emirates ID: {emiratesIdDoc ? "Uploaded" : "Not uploaded"}
              </Text>
            </View>
            <View style={styles.documentStatusItem}>
              <View
                style={[
                  styles.documentStatusDot,
                  passportDoc
                    ? styles.documentStatusDotSuccess
                    : styles.documentStatusDotPending,
                ]}
              />
              <Text style={styles.documentStatusText}>
                Passport: {passportDoc ? "Uploaded" : "Not uploaded"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.createBookingButton,
            (!emiratesIdDoc || !passportDoc) &&
              styles.createBookingButtonDisabled,
          ]}
          onPress={handleCreateBooking}
        >
          <Text style={styles.createBookingButtonText}>Create Booking</Text>
        </TouchableOpacity>
        {(!emiratesIdDoc || !passportDoc) && (
          <Text style={styles.footerWarning}>
            Upload both documents to enable booking
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: backgrounds.card,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: textColors.heading,
    fontFamily: "Marcellus-Regular",
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
    color: textColors.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
  agentsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  agentCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: borders.default,
  },
  agentCardSelected: {
    borderColor: palette.brand.primary,
    backgroundColor: backgrounds.subtle,
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
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  agentAvatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: textColors.onDark,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 4,
  },
  agentPhone: {
    fontSize: 14,
    color: textColors.secondary,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.onDark,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: backgrounds.card,
    borderTopWidth: 1,
    borderTopColor: borders.default,
  },
  proceedButton: {
    backgroundColor: palette.brand.primary,
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
    color: textColors.onDark,
  },
  contactAgentCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: palette.brand.primary,
  },
  contactAgentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.secondary,
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
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  contactAgentAvatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: textColors.onDark,
  },
  contactAgentInfo: {
    flex: 1,
  },
  contactAgentName: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 4,
  },
  contactAgentPhone: {
    fontSize: 14,
    color: textColors.secondary,
  },
  contactAgentActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: borders.default,
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
    backgroundColor: backgrounds.subtle,
  },
  contactActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.brand.primary,
  },
  formSection: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: borders.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: textColors.heading,
  },
  createBookingButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  createBookingButtonDisabled: {
    opacity: 0.5,
  },
  createBookingButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.onDark,
  },
  // Document Section Styles
  documentSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mandatoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mandatoryBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: palette.status.error,
    textTransform: "uppercase",
  },
  documentSectionSubtitle: {
    fontSize: 13,
    color: textColors.secondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  documentsStatus: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: borders.default,
    gap: 8,
  },
  documentStatusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  documentStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  documentStatusDotSuccess: {
    backgroundColor: palette.status.success,
  },
  documentStatusDotPending: {
    backgroundColor: palette.status.warning,
  },
  documentStatusText: {
    fontSize: 13,
    color: textColors.secondary,
  },
  footerWarning: {
    fontSize: 12,
    color: palette.status.warning,
    textAlign: "center",
    marginTop: 8,
  },
});

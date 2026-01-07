import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  CreditCard,
  Search,
  CheckCircle,
  Plus,
  X,
  User,
  Calendar,
  Lock,
  Check,
} from "lucide-react-native";
import { useAppState } from "../src/store/appState";
import { useUserStore } from "../src/store/userStore";
import { Button } from "../src/components/common/Button";
import {
  Heading1,
  Heading2,
  BodyText,
  Label,
  Caption,
} from "../src/components/common/Typography";
import {
  spacing,
  borderRadius,
  typography,
} from "../src/constants/designSystem";
import { palette, textColors, backgrounds } from "@/src/constants/colors";

export default function QuickPayScreen() {
  const router = useRouter();
  const { setScreen } = useAppState();
  const user = useUserStore((state) => state.user);
  const isHomeowner = user?.currentRole === "homeowner";

  // For homeowners, skip search and go straight to chooseMethod
  const [step, setStep] = useState<
    "search" | "payment" | "chooseMethod" | "otp" | "receipt"
  >(isHomeowner ? "chooseMethod" : "search");
  const [accountNumber, setAccountNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Saved payment methods state (with add card modal)
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    {
      id: "card-4242",
      label: "Card ending in 4242",
      type: "card",
      lastFour: "4242",
    },
    {
      id: "bank-uae",
      label: "Bank Transfer (UAEBANK)",
      type: "bank",
      lastFour: "",
    },
  ]);
  const [chosenMethod, setChosenMethod] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const demoOtp = "123456";
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Add Card Modal state
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);

  // Mock found account (future-facing values; use customerId)
  const foundAccount = {
    customerId: "CUST-12345",
    name: "John Doe",
    property: "Marina Heights, Unit 1205",
    outstanding: 15000,
    breakdown: [
      { description: "Unit Payment - Q1 2026 (Scheduled)", amount: 12000 },
      { description: "Service Charge", amount: 3000 },
    ],
  };

  const [amount, setAmount] = useState<number>(foundAccount.outstanding);
  useEffect(() => {
    setScreen("quick-pay");
  }, [setScreen]);

  // Card utility functions
  const detectCardType = (number: string): "visa" | "mastercard" | null => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5")) return "mastercard";
    return null;
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19);
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleAddNewCard = () => {
    const cleanedNumber = newCardNumber.replace(/\s/g, "");
    if (cleanedNumber.length < 13 || cleanedNumber.length > 19) return;
    if (!newCardHolder.trim()) return;
    if (!newCardExpiry || newCardExpiry.length !== 5) return;
    if (!newCardCvv || newCardCvv.length < 3) return;

    const cardType = detectCardType(cleanedNumber) || "visa";
    const lastFour = cleanedNumber.slice(-4);
    const newCard = {
      id: `card-${lastFour}-${Date.now()}`,
      label: `${
        cardType === "visa" ? "Visa" : "Mastercard"
      } ending in ${lastFour}`,
      type: "card" as const,
      lastFour,
    };

    setSavedPaymentMethods((prev) => [...prev, newCard]);
    setShowAddCardModal(false);
    setNewCardNumber("");
    setNewCardHolder("");
    setNewCardExpiry("");
    setNewCardCvv("");
    setSetAsDefault(false);
  };

  const handleSearch = () => {
    setError(null);
    setIsSearching(true);
    // Simulate a lookup delay
    setTimeout(() => {
      setIsSearching(false);
      // Simple mock match
      if (
        accountNumber.trim().toUpperCase() === foundAccount.customerId &&
        lastName.trim().toLowerCase() === "doe"
      ) {
        setStep("payment");
      } else {
        setError(
          "Account not found. Check details or try demo: CUST-12345 / Doe"
        );
      }
    }, 900);
  };

  const handlePayment = () => {
    // move to choose method step (show saved methods)
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setStep("chooseMethod");
    }, 600);
  };

  const handleSelectMethod = (method: {
    id: string;
    label: string;
    type: string;
  }) => {
    setChosenMethod(method.label);
    // go to OTP entry
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === demoOtp) {
      // demo transaction id
      setTransactionId(`TXN-${Date.now()}`);
      setStep("receipt");
    } else {
      alert("Invalid OTP — use demo OTP shown.");
    }
  };

  const renderSearch = () => (
    <View style={styles.card}>
      <View style={styles.headerCenter}>
        <View style={styles.iconCircle}>
          <CreditCard size={32} color={palette.brand.primary} />
        </View>
        <Heading1 color={textColors.heading}>Quick Pay</Heading1>
        <BodyText
          align="center"
          color={textColors.secondary}
          style={{ marginTop: spacing.sm }}
        >
          Pay your property dues without logging in
        </BodyText>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Label>Customer ID</Label>
          <TextInput
            style={styles.input}
            placeholder="Enter your customer ID"
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholderTextColor={textColors.secondary}
          />
        </View>
        <View style={styles.inputGroup}>
          <Label>Last Name</Label>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={textColors.secondary}
          />
        </View>
        <Button
          variant="primary"
          size="lg"
          onPress={handleSearch}
          disabled={isSearching}
          loading={isSearching}
          fullWidth
        >
          Search Customer
        </Button>
      </View>

      {error ? (
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: palette.status.errorLight,
              borderColor: palette.status.error,
            },
          ]}
        >
          <Caption color={palette.status.error}>{error}</Caption>
        </View>
      ) : null}

      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: palette.status.infoLight,
            borderColor: palette.status.info,
          },
        ]}
      >
        <Caption color={palette.status.info}>
          💡 Tip: Create an account to access more features like payment
          history, documents, and service requests.
        </Caption>
      </View>
    </View>
  );

  const renderPayment = () => (
    <ScrollView style={styles.card}>
      <Heading2 style={{ marginBottom: spacing.lg }} color={textColors.heading}>
        Payment Details
      </Heading2>

      {/* Account Info */}
      <View style={styles.infoSection}>
        <View style={styles.row}>
          <Label>Account Holder</Label>
          <BodyText style={{ marginTop: spacing.xs }}>
            {foundAccount.name}
          </BodyText>
        </View>
        <View style={styles.row}>
          <Label>Property</Label>
          <BodyText style={{ marginTop: spacing.xs }}>
            {foundAccount.property}
          </BodyText>
        </View>
        <View style={styles.row}>
          <Label>Customer ID</Label>
          <BodyText style={{ marginTop: spacing.xs }}>
            {foundAccount.customerId}
          </BodyText>
        </View>
      </View>

      {/* Breakdown */}
      <View style={styles.breakdownSection}>
        <Heading1 color={textColors.heading} style={{ fontSize: 18 }}>
          Outstanding Amount
        </Heading1>
        {foundAccount.breakdown.map((item, idx) => (
          <View key={idx} style={styles.breakdownRow}>
            <BodyText color={textColors.secondary}>{item.description}</BodyText>
            <BodyText color={textColors.heading} style={{ fontWeight: "600" }}>
              AED {item.amount.toLocaleString()}
            </BodyText>
          </View>
        ))}
        <View style={styles.totalRow}>
          <BodyText color={textColors.secondary} style={{ fontWeight: "600" }}>
            Total Amount Due
          </BodyText>
          <BodyText
            color={textColors.heading}
            style={{ fontSize: 18, fontWeight: "700" }}
          >
            AED {foundAccount.outstanding.toLocaleString()}
          </BodyText>
        </View>
      </View>

      <Button
        variant="primary"
        size="lg"
        onPress={handlePayment}
        disabled={isPaying}
        loading={isPaying}
        fullWidth
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Pay AED {foundAccount.outstanding.toLocaleString()}
      </Button>
    </ScrollView>
  );

  const renderChooseMethod = () => (
    <ScrollView style={styles.card}>
      <Text
        style={{ fontSize: 24, fontWeight: "600", marginBottom: spacing.md }}
      >
        Choose Payment Method
      </Text>
      <BodyText
        color={textColors.secondary}
        style={{ marginBottom: spacing.md }}
      >
        {isHomeowner
          ? `Pay AED ${foundAccount.outstanding.toLocaleString()} for ${
              foundAccount.property
            }`
          : "Select one of your saved payment methods"}
      </BodyText>

      {/* Payment Summary for homeowners */}
      {isHomeowner && (
        <View style={styles.paymentSummaryBox}>
          <View style={styles.summaryRow}>
            <Label color={textColors.secondary}>Property</Label>
            <BodyText>{foundAccount.property}</BodyText>
          </View>
          <View style={styles.summaryRow}>
            <Label color={textColors.secondary}>Customer ID</Label>
            <BodyText>{foundAccount.customerId}</BodyText>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
            <Label color={textColors.secondary}>Amount Due</Label>
            <BodyText style={{ fontWeight: "700", color: textColors.heading }}>
              AED {foundAccount.outstanding.toLocaleString()}
            </BodyText>
          </View>
        </View>
      )}

      {savedPaymentMethods.map((m) => (
        <TouchableOpacity
          key={m.id}
          style={{
            padding: spacing.md,
            backgroundColor: backgrounds.subtle,
            borderRadius: borderRadius.md,
            marginBottom: spacing.sm,
            borderWidth: 1,
            borderColor: palette.ui.border,
          }}
          onPress={() => handleSelectMethod(m)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.sm,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: backgrounds.subtle,
                  borderWidth: 1,
                  borderColor: palette.ui.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CreditCard size={20} color={palette.brand.primary} />
              </View>
              <View>
                <BodyText style={{ fontWeight: "600" }}>{m.label}</BodyText>
                <Caption color={textColors.secondary}>
                  {m.type === "card" ? "Credit / Debit Card" : "Bank Transfer"}
                </Caption>
              </View>
            </View>
            <Caption color={textColors.secondary}>
              {m.type === "card" ? `•••• ${m.lastFour}` : "UAEBANK"}
            </Caption>
          </View>
        </TouchableOpacity>
      ))}

      {/* Add New Payment Method Button */}
      <TouchableOpacity
        style={styles.addPaymentButton}
        onPress={() => setShowAddCardModal(true)}
        activeOpacity={0.85}
      >
        <View style={styles.addPaymentIcon}>
          <Plus size={20} color={palette.brand.primary} />
        </View>
        <View>
          <BodyText style={{ fontWeight: "600" }}>Add New Card</BodyText>
          <Caption color={textColors.secondary}>Credit or Debit Card</Caption>
        </View>
      </TouchableOpacity>

      {/* 
      {!isHomeowner && (
        <View
          style={{
            flexDirection: "row",
            gap: spacing.md,
            marginTop: spacing.md,
          }}
        >
          <Button
            variant="secondary"
            size="lg"
            onPress={() => setStep("payment")}
            // fullWidth
          >
            Back
          </Button>
        </View>
      )} */}
    </ScrollView>
  );

  const renderOtp = () => (
    <View style={[styles.card, { paddingTop: spacing.lg }]}>
      <Heading2 style={{ marginBottom: spacing.lg }} color={textColors.heading}>
        Confirm Payment
      </Heading2>
      <BodyText
        color={textColors.secondary}
        style={{ marginBottom: spacing.md }}
      >
        We will charge{" "}
        <BodyText color={textColors.heading} style={{ fontWeight: "700" }}>
          AED {amount.toLocaleString()}
        </BodyText>{" "}
        using{" "}
        <BodyText color={textColors.heading} style={{ fontWeight: "700" }}>
          {chosenMethod}
        </BodyText>
        . Enter OTP to confirm.
      </BodyText>

      <View style={{ marginBottom: spacing.md }}>
        <Label>Enter OTP</Label>
        <TextInput
          value={enteredOtp}
          onChangeText={setEnteredOtp}
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          placeholderTextColor={textColors.secondary}
        />
        <Caption color={textColors.secondary} style={{ marginTop: spacing.sm }}>
          Demo OTP: <Caption style={{ fontWeight: "700" }}>{demoOtp}</Caption>
        </Caption>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Button
          variant="secondary"
          size="lg"
          onPress={() => setStep("chooseMethod")}
        >
          Cancel
        </Button>
        <Button variant="primary" size="lg" onPress={handleVerifyOtp}>
          Verify & Pay
        </Button>
      </View>
    </View>
  );

  const renderReceipt = () => (
    <View
      style={[
        styles.card,
        { alignItems: "center", paddingVertical: spacing.xs },
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: palette.status.successLight },
        ]}
      >
        <CheckCircle size={40} color={palette.status.success} />
      </View>
      <Heading1 color={textColors.heading} style={{ marginTop: spacing.md }}>
        Payment Successful!
      </Heading1>
      <BodyText
        align="center"
        color={textColors.secondary}
        style={{ marginBottom: spacing.lg }}
      >
        Your payment has been processed
      </BodyText>

      <View style={styles.receiptBox}>
        <View style={styles.receiptRow}>
          <Label color={textColors.secondary}>Transaction ID</Label>
          <BodyText color={textColors.heading} style={{ fontWeight: "600" }}>
            {transactionId}
          </BodyText>
        </View>
        <View style={styles.receiptRow}>
          <Label color={textColors.secondary}>Amount Paid</Label>
          <BodyText color={textColors.heading} style={{ fontWeight: "600" }}>
            AED {amount.toFixed(2)}
          </BodyText>
        </View>
        <View style={styles.receiptRow}>
          <Label color={textColors.secondary}>Date</Label>
          <BodyText color={textColors.heading} style={{ fontWeight: "600" }}>
            {new Date().toLocaleDateString()}
          </BodyText>
        </View>
        <View style={styles.receiptRow}>
          <Label color={textColors.secondary}>Payment Method</Label>
          <BodyText color={textColors.heading} style={{ fontWeight: "600" }}>
            {chosenMethod}
          </BodyText>
        </View>
      </View>

      <Button
        variant="primary"
        size="lg"
        onPress={() => router.back()}
        // fullWidth
      >
        Back to Home
      </Button>
    </View>
  );

  // const renderSuccess = () => (
  //   <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
  //     <View
  //       style={[
  //         styles.iconCircle,
  //         { backgroundColor: palette.status.successLight },
  //       ]}
  //     >
  //       <CheckCircle size={40} color={palette.status.success} />
  //     </View>
  //     <Text
  //       style={[styles.title, { color: palette.brand.primary, marginTop: 16 }]}
  //     >
  //       Payment Successful!
  //     </Text>
  //     <Text style={styles.subtitle}>Your payment has been processed</Text>

  //     <View style={styles.receiptBox}>
  //       <View style={styles.receiptRow}>
  //         <Text style={styles.receiptLabel}>Transaction ID</Text>
  //         <Text style={styles.receiptValue}>TXN-2024-001234</Text>
  //       </View>
  //       <View style={styles.receiptRow}>
  //         <Text style={styles.receiptLabel}>Amount Paid</Text>
  //         <Text style={styles.receiptValue}>AED 15,000.00</Text>
  //       </View>
  //       <View style={styles.receiptRow}>
  //         <Text style={styles.receiptLabel}>Date</Text>
  //         <Text style={styles.receiptValue}>
  //           {new Date().toLocaleDateString()}
  //         </Text>
  //       </View>
  //     </View>

  //     <TouchableOpacity
  //       style={styles.outlineButton}
  //       onPress={() => router.back()}
  //     >
  //       <Text style={styles.outlineButtonText}>Back to Home</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // Card Preview component for modal
  const CardPreview = () => {
    const cardType = detectCardType(newCardNumber);

    const displayNumber = newCardNumber
      ? newCardNumber
          .replace(/\s/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim()
      : "•••• •••• •••• ••••";
    const displayName = newCardHolder || "YOUR NAME";
    const displayExpiry = newCardExpiry || "MM/YY";

    return (
      <View style={styles.cardPreview}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <CreditCard size={18} color={textColors.onDark} />
            <Text
              style={{
                color: textColors.onDark,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              CARD
            </Text>
          </View>
          {cardType && (
            <Text
              style={{
                color: textColors.onDark,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {cardType === "visa" ? "VISA" : "MASTERCARD"}
            </Text>
          )}
        </View>
        <Text
          style={{
            color: textColors.onDark,
            fontSize: 20,
            fontWeight: "600",
            letterSpacing: 2,
            marginVertical: spacing.md,
          }}
        >
          {displayNumber}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{ color: textColors.onDark, opacity: 0.8, fontSize: 10 }}
            >
              CARD HOLDER
            </Text>
            <Text style={{ color: textColors.onDark, fontWeight: "600" }}>
              {displayName.toUpperCase()}
            </Text>
          </View>
          <View>
            <Text
              style={{ color: textColors.onDark, opacity: 0.8, fontSize: 10 }}
            >
              EXPIRES
            </Text>
            <Text style={{ color: textColors.onDark, fontWeight: "600" }}>
              {displayExpiry}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Add Card Modal
  const renderAddCardModal = () => (
    <Modal
      visible={showAddCardModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowAddCardModal(false)}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={() => setShowAddCardModal(false)}
        />
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Heading2 color={textColors.heading}>Add New Card</Heading2>
            <TouchableOpacity
              onPress={() => setShowAddCardModal(false)}
              style={styles.modalCloseButton}
            >
              <X size={20} color={textColors.secondary} />
            </TouchableOpacity>
          </View>

          <CardPreview />

          <ScrollView
            style={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formField}>
              <View style={styles.fieldLabelRow}>
                <View style={styles.fieldIcon}>
                  <CreditCard size={16} color={palette.brand.secondary} />
                </View>
                <Label>Card Number</Label>
              </View>
              <TextInput
                value={newCardNumber}
                onChangeText={(text) =>
                  setNewCardNumber(formatCardNumber(text))
                }
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={textColors.secondary}
                style={styles.formInput}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.formField}>
              <View style={styles.fieldLabelRow}>
                <View style={styles.fieldIcon}>
                  <User size={16} color={palette.brand.secondary} />
                </View>
                <Label>Card Holder Name</Label>
              </View>
              <TextInput
                value={newCardHolder}
                onChangeText={setNewCardHolder}
                placeholder="JOHN DOE"
                placeholderTextColor={textColors.secondary}
                style={styles.formInput}
              />
            </View>

            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <View style={{ flex: 1 }}>
                <View style={styles.formField}>
                  <View style={styles.fieldLabelRow}>
                    <View style={styles.fieldIcon}>
                      <Calendar size={16} color={palette.brand.secondary} />
                    </View>
                    <Label>Expiry Date</Label>
                  </View>
                  <TextInput
                    value={newCardExpiry}
                    onChangeText={(text) =>
                      setNewCardExpiry(formatExpiry(text))
                    }
                    placeholder="MM/YY"
                    placeholderTextColor={textColors.secondary}
                    style={styles.formInput}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.formField}>
                  <View style={styles.fieldLabelRow}>
                    <View style={styles.fieldIcon}>
                      <Lock size={16} color={palette.brand.secondary} />
                    </View>
                    <Label>CVV</Label>
                  </View>
                  <TextInput
                    value={newCardCvv}
                    onChangeText={(text) =>
                      setNewCardCvv(text.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="123"
                    placeholderTextColor={textColors.secondary}
                    style={styles.formInput}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setSetAsDefault(!setAsDefault)}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.checkbox,
                  setAsDefault && styles.checkboxChecked,
                ]}
              >
                {setAsDefault && <Check size={14} color={textColors.onDark} />}
              </View>
              <View>
                <BodyText>Set as default payment method</BodyText>
                <Caption color={textColors.secondary}>
                  Use this card for all transactions
                </Caption>
              </View>
            </TouchableOpacity>

            <View style={styles.securityNote}>
              <Lock size={16} color={palette.brand.primary} />
              <Caption
                color={textColors.secondary}
                style={{ flex: 1, marginLeft: spacing.sm }}
              >
                Your card information is encrypted with 256-bit SSL and stored
                securely.
              </Caption>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              variant="secondary"
              size="lg"
              onPress={() => setShowAddCardModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              onPress={handleAddNewCard}
              fullWidth
            >
              Add Card
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (step === "search") router.back();
              else if (step === "payment") setStep("search");
              else if (step === "chooseMethod") {
                // For homeowners, go back to home; for guests, go to payment step
                if (isHomeowner) router.back();
                else setStep("payment");
              } else if (step === "otp") setStep("chooseMethod");
              else if (step === "receipt") router.back();
            }}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={palette.brand.primary} />
            <BodyText
              color={palette.brand.primary}
              style={{ marginLeft: spacing.sm, fontWeight: "500" }}
            >
              {step === "search" || (step === "chooseMethod" && isHomeowner)
                ? "Back to Home"
                : "Back"}
            </BodyText>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            justifyContent: "flex-start",
            padding: spacing.lg,
            paddingTop: spacing.md,
          }}
        >
          {step === "search" && renderSearch()}
          {step === "payment" && renderPayment()}
          {step === "chooseMethod" && renderChooseMethod()}
          {step === "otp" && renderOtp()}
          {step === "receipt" && renderReceipt()}
        </KeyboardAvoidingView>

        {renderAddCardModal()}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.screenLight,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: palette.ui.border,
    shadowColor: palette.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerCenter: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: backgrounds.subtle,
    borderWidth: 1,
    borderColor: palette.ui.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.ui.border,
    backgroundColor: palette.base.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: palette.text.body,
  },
  infoBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
    borderWidth: 1,
  },
  infoSection: {
    backgroundColor: backgrounds.subtle,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: palette.ui.border,
  },
  row: {
    marginBottom: spacing.xs,
  },
  breakdownSection: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: backgrounds.subtle,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: palette.ui.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: backgrounds.subtle,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: palette.ui.border,
  },
  receiptBox: {
    backgroundColor: backgrounds.subtle,
    width: "100%",
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
    marginVertical: spacing.lg,
    borderWidth: 1,
    borderColor: palette.ui.border,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: palette.ui.border,
    paddingBottom: spacing.md,
  },
  // Payment summary box for homeowners
  paymentSummaryBox: {
    backgroundColor: backgrounds.subtle,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: palette.ui.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: palette.ui.border,
  },
  // Add payment button
  addPaymentButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: backgrounds.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: palette.ui.border,
    borderStyle: "dashed",
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  addPaymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: backgrounds.subtle,
    borderWidth: 1,
    borderColor: palette.ui.border,
    alignItems: "center",
    justifyContent: "center",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: backgrounds.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.ui.border,
    alignItems: "center",
    justifyContent: "center",
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalFooter: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  cardPreview: {
    backgroundColor: palette.brand.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    height: 180,
    justifyContent: "space-between",
  },
  formField: {
    marginBottom: spacing.md,
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  fieldIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    borderWidth: 1,
    borderColor: palette.ui.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: palette.text.heading,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: palette.ui.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: palette.brand.primary,
    borderColor: palette.brand.primary,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.subtle,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: palette.ui.border,
  },
});

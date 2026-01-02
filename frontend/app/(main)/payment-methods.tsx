import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  CreditCard,
  Check,
  Trash2,
  Plus,
  Building2,
  Smartphone,
  Shield,
  X,
  User,
  Calendar,
  Lock,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Button } from "../../src/components/common/Button";
import {
  Heading1,
  Heading2,
  BodyText,
  Label,
  Caption,
} from "../../src/components/common/Typography";
import {
  spacing,
  borderRadius,
  typography,
} from "../../src/constants/designSystem";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "@/src/constants/colors";

type Card = {
  id: string;
  type: "visa" | "mastercard";
  lastFour: string;
  holderName: string;
  expiry: string;
  isDefault: boolean;
};

const Section = ({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeading}>
      <View style={styles.sectionDot} />
      <Heading2 color={palette.brand.primary}>{title}</Heading2>
      {count !== undefined && (
        <Caption color={textColors.secondary}>{count} cards</Caption>
      )}
    </View>
    {children}
  </View>
);

const CardDisplay = ({
  card,
  onSetDefault,
  onRemove,
}: {
  card: Card;
  onSetDefault: () => void;
  onRemove: () => void;
}) => {
  const isVisa = card.type === "visa";

  return (
    <View style={styles.cardWrapper}>
      <View
        style={[styles.cardBlock, { backgroundColor: palette.brand.primary }]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTypeRow}>
            <CreditCard size={20} color={textColors.onDark} />
            <Text style={[styles.cardTypeText, { color: textColors.onDark }]}>
              {isVisa ? "VISA" : "Mastercard"}
            </Text>
          </View>
          {card.isDefault && (
            <View style={styles.defaultBadge}>
              <Check size={12} color={textColors.onDark} />
              <Text style={styles.defaultBadgeText}>DEFAULT</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardNumber}>••••••••••••{card.lastFour}</Text>
        <View style={styles.cardFooter}>
          <View>
            <Caption style={{ color: textColors.onDark, opacity: 0.8 }}>
              CARD HOLDER
            </Caption>
            <BodyText style={{ color: textColors.onDark, fontWeight: "600" }}>
              {card.holderName}
            </BodyText>
          </View>
          <View style={styles.cardExpiry}>
            <Caption style={{ color: textColors.onDark, opacity: 0.8 }}>
              EXPIRES
            </Caption>
            <BodyText style={{ color: textColors.onDark, fontWeight: "600" }}>
              {card.expiry}
            </BodyText>
          </View>
        </View>
      </View>
      <View style={styles.cardActions}>
        {!card.isDefault && (
          <Button
            variant="secondary"
            size="sm"
            onPress={onSetDefault}
            fullWidth
          >
            Set as Default
          </Button>
        )}
        <TouchableOpacity
          style={[styles.removeButton]}
          onPress={onRemove}
          activeOpacity={0.85}
        >
          <Trash2 size={16} color={palette.status.error} />
          <BodyText color={palette.status.error} style={{ fontWeight: "600" }}>
            Remove
          </BodyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OptionCard = ({
  icon,
  iconBg,
  title,
  subtitle,
  comingSoon = false,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  comingSoon?: boolean;
}) => (
  <TouchableOpacity
    style={styles.optionCard}
    activeOpacity={0.85}
    disabled={comingSoon}
  >
    <View style={[styles.optionIcon, { backgroundColor: iconBg }]}>{icon}</View>
    <View style={styles.optionContent}>
      <BodyText style={{ fontWeight: "600" }}>{title}</BodyText>
      <Caption color={textColors.secondary}>{subtitle}</Caption>
    </View>
    {comingSoon && (
      <View style={styles.comingSoonBadge}>
        <Caption style={{ fontWeight: "600", color: palette.brand.secondary }}>
          Coming Soon
        </Caption>
      </View>
    )}
  </TouchableOpacity>
);

const CardPreview = ({
  cardNumber,
  holderName,
  expiry,
  cardType,
}: {
  cardNumber: string;
  holderName: string;
  expiry: string;
  cardType: "visa" | "mastercard" | null;
}) => {
  const displayNumber = cardNumber
    ? cardNumber
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    : "•••• •••• •••• ••••";
  const displayName = holderName || "YOUR NAME";
  const displayExpiry = expiry || "MM/YY";

  return (
    <View
      style={[styles.cardPreview, { backgroundColor: palette.brand.primary }]}
    >
      <View style={styles.cardPreviewHeader}>
        <View style={styles.cardPreviewTypeRow}>
          <CreditCard size={18} color={textColors.onDark} />
          <Text
            style={[styles.cardPreviewTypeText, { color: textColors.onDark }]}
          >
            CARD
          </Text>
        </View>
        {cardType && (
          <Text style={[styles.cardPreviewBrand, { color: textColors.onDark }]}>
            {cardType === "visa" ? "VISA" : "MASTERCARD"}
          </Text>
        )}
      </View>
      <Text style={styles.cardPreviewNumber}>{displayNumber}</Text>
      <View style={styles.cardPreviewFooter}>
        <View>
          <Caption style={{ color: textColors.onDark, opacity: 0.8 }}>
            CARD HOLDER
          </Caption>
          <BodyText style={{ color: textColors.onDark, fontWeight: "600" }}>
            {displayName.toUpperCase()}
          </BodyText>
        </View>
        <View style={styles.cardPreviewExpiry}>
          <Caption style={{ color: textColors.onDark, opacity: 0.8 }}>
            EXPIRES
          </Caption>
          <BodyText style={{ color: textColors.onDark, fontWeight: "600" }}>
            {displayExpiry}
          </BodyText>
        </View>
      </View>
    </View>
  );
};

const FormField = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  maxLength,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
  maxLength?: number;
}) => (
  <View style={styles.formField}>
    <View style={styles.fieldLabelRow}>
      <View style={styles.fieldIcon}>{icon}</View>
      <Label>{label}</Label>
    </View>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={textColors.secondary}
      style={styles.formInput}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  </View>
);

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      type: "visa",
      lastFour: "4532",
      holderName: "Ahmed Hassan",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "2",
      type: "mastercard",
      lastFour: "8901",
      holderName: "Ahmed Hassan",
      expiry: "08/25",
      isDefault: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);

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

  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (text: string) => {
    const formatted = formatExpiry(text);
    setExpiry(formatted);
  };

  const handleAddCard = () => {
    const cleanedNumber = cardNumber.replace(/\s/g, "");
    if (cleanedNumber.length < 13 || cleanedNumber.length > 19) return;
    if (!holderName.trim()) return;
    if (!expiry || expiry.length !== 5) return;
    if (!cvv || cvv.length < 3) return;

    const cardType = detectCardType(cleanedNumber) || "visa";
    const lastFour = cleanedNumber.slice(-4);
    const newCard: Card = {
      id: Date.now().toString(),
      type: cardType,
      lastFour,
      holderName: holderName.trim(),
      expiry,
      isDefault: setAsDefault || cards.length === 0,
    };

    if (setAsDefault) {
      setCards((prev) =>
        prev.map((c) => ({ ...c, isDefault: false })).concat(newCard)
      );
    } else {
      setCards((prev) => prev.concat(newCard));
    }

    setShowModal(false);
    setCardNumber("");
    setHolderName("");
    setExpiry("");
    setCvv("");
    setSetAsDefault(false);
  };

  const cardType = detectCardType(cardNumber);

  const handleSetDefault = (id: string) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  const handleRemove = (id: string) => {
    setCards((prev) => {
      const filtered = prev.filter((card) => card.id !== id);
      if (filtered.length > 0 && !filtered.some((c) => c.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.hero, { backgroundColor: palette.brand.primary }]}>
        <View style={styles.heroHeader}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            hitSlop={10}
            style={styles.backButton}
          >
            <View style={styles.backCircle}>
              <ArrowLeft size={18} color={palette.brand.primary} />
            </View>
          </TouchableOpacity>
          <Heading2 style={{ color: textColors.onDark }}>
            Payment Methods
          </Heading2>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <Section title="Saved Cards" count={cards.length}>
        <View style={styles.cardsContainer}>
          {cards.map((card) => (
            <CardDisplay
              key={card.id}
              card={card}
              onSetDefault={() => handleSetDefault(card.id)}
              onRemove={() => handleRemove(card.id)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.addCardButton}
          activeOpacity={0.85}
          onPress={() => setShowModal(true)}
        >
          <View style={styles.addCardIcon}>
            <Plus size={20} color={palette.brand.primary} />
          </View>
          <View style={styles.addCardContent}>
            <BodyText style={{ fontWeight: "600" }}>Add New Card</BodyText>
            <Caption color={textColors.secondary}>Credit or Debit Card</Caption>
          </View>
        </TouchableOpacity>
      </Section>

      <Section title="Other Options">
        <View style={styles.optionsContainer}>
          <OptionCard
            icon={<Building2 size={20} color={palette.status.success} />}
            iconBg={palette.status.successLight}
            title="Bank Transfer"
            subtitle="Direct bank payment"
            comingSoon
          />
          <OptionCard
            icon={<Smartphone size={20} color={palette.brand.primary} />}
            iconBg={palette.status.infoLight}
            title="Digital Wallets"
            subtitle="Apple Pay, Google Pay"
            comingSoon
          />
        </View>
      </Section>

      <View style={styles.securityBlock}>
        <View style={styles.securityIcon}>
          <Shield size={20} color={palette.brand.primary} />
        </View>
        <View style={styles.securityContent}>
          <BodyText style={{ fontWeight: "600" }}>Secure Payments</BodyText>
          <Caption
            color={textColors.secondary}
            style={{ marginTop: spacing.xs }}
          >
            All payment information is encrypted and securely stored. We never
            share your card details with third parties.
          </Caption>
        </View>
      </View>

      <View style={styles.footerSpacing} />

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          />
          <SafeAreaView style={styles.modalContent} edges={["bottom"]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalHeader}>
                <Heading2 color={palette.brand.primary}>Add New Card</Heading2>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={styles.modalCloseButton}
                >
                  <X size={20} color={textColors.secondary} />
                </TouchableOpacity>
              </View>

              <CardPreview
                cardNumber={cardNumber}
                holderName={holderName}
                expiry={expiry}
                cardType={cardType}
              />

              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
              >
                <FormField
                  label="Card Number"
                  icon={
                    <CreditCard size={16} color={palette.brand.secondary} />
                  }
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  maxLength={19}
                />

                <FormField
                  label="Card Holder Name"
                  icon={<User size={16} color={palette.brand.secondary} />}
                  value={holderName}
                  onChangeText={setHolderName}
                  placeholder="JOHN DOE"
                />

                <View style={styles.rowFields}>
                  <View style={styles.halfField}>
                    <FormField
                      label="Expiry Date"
                      icon={
                        <Calendar size={16} color={palette.brand.secondary} />
                      }
                      value={expiry}
                      onChangeText={handleExpiryChange}
                      placeholder="MM/YY"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  <View style={styles.halfField}>
                    <FormField
                      label="CVV"
                      icon={<Lock size={16} color={palette.brand.secondary} />}
                      value={cvv}
                      onChangeText={(text) =>
                        setCvv(text.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="123"
                      keyboardType="numeric"
                      maxLength={4}
                    />
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
                    {setAsDefault && (
                      <Check size={14} color={textColors.onDark} />
                    )}
                  </View>
                  <View style={styles.checkboxContent}>
                    <BodyText>Set as default payment method</BodyText>
                    <Caption color={textColors.secondary}>
                      Use this card for all transactions
                    </Caption>
                  </View>
                </TouchableOpacity>

                <View style={styles.modalSecurityBlock}>
                  <View style={styles.modalSecurityIcon}>
                    <Lock size={18} color={palette.brand.primary} />
                  </View>
                  <View style={styles.modalSecurityContent}>
                    <BodyText style={{ fontWeight: "600" }}>
                      Secure & Encrypted
                    </BodyText>
                    <Caption
                      color={textColors.secondary}
                      style={{ marginTop: spacing.xs }}
                    >
                      Your card information is encrypted with 256-bit SSL and
                      stored securely. We never share your details.
                    </Caption>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <Button
                  variant="secondary"
                  size="lg"
                  onPress={() => setShowModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onPress={handleAddCard}
                  fullWidth
                >
                  Add Card
                </Button>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgrounds.screenLight,
    paddingBottom: 24,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: textColors.onDark,
    fontSize: 18,
    fontWeight: "800",
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 18,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionDot: {
    width: 3,
    height: 18,
    backgroundColor: palette.brand.secondary,
    borderRadius: 999,
  },
  sectionTitle: {
    color: textColors.secondary,
    fontWeight: "800",
    letterSpacing: 0.3,
    flex: 1,
  },
  sectionCount: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 13,
  },
  cardsContainer: {
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 4,
  },
  cardBlock: {
    borderRadius: 18,
    padding: 18,
    ...shadows.card,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTypeText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  defaultBadgeText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.3,
  },
  cardNumber: {
    color: textColors.onDark,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  cardValue: {
    color: textColors.onDark,
    fontSize: 14,
    fontWeight: "800",
  },
  cardExpiry: {
    alignItems: "flex-end",
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    paddingLeft: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: backgrounds.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.default,
  },
  removeButton: {
    borderColor: palette.status.errorLight,
  },
  actionButtonText: {
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 13,
  },
  removeButtonText: {
    color: palette.status.error,
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
    borderRadius: 18,
    padding: 16,
    marginTop: 8,
  },
  addCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.status.infoLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  addCardContent: {
    flex: 1,
    gap: 4,
  },
  addCardTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
  },
  addCardSubtitle: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
    borderRadius: 18,
    padding: 16,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
  },
  optionSubtitle: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  comingSoonBadge: {
    backgroundColor: backgrounds.subtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  comingSoonText: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 12,
  },
  securityBlock: {
    flexDirection: "row",
    backgroundColor: backgrounds.subtle,
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 18,
    gap: 12,
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: palette.status.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
  securityContent: {
    flex: 1,
    gap: 6,
  },
  securityTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
  },
  securityText: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  footerSpacing: {
    height: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: backgrounds.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingBottom: Platform.OS === "ios" ? 0 : 20,
    ...shadows.modal,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: textColors.heading,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  cardPreview: {
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    minHeight: 200,
    justifyContent: "space-between",
  },
  cardPreviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cardPreviewTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardPreviewTypeText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },
  cardPreviewBrand: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  cardPreviewNumber: {
    color: textColors.onDark,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 24,
  },
  cardPreviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardPreviewLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  cardPreviewValue: {
    color: textColors.onDark,
    fontSize: 13,
    fontWeight: "800",
  },
  cardPreviewExpiry: {
    alignItems: "flex-end",
  },
  modalScroll: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  formField: {
    marginBottom: 16,
    gap: 8,
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    color: textColors.secondary,
    fontWeight: "800",
    fontSize: 13,
  },
  formInput: {
    backgroundColor: backgrounds.subtle,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 15,
  },
  rowFields: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: borders.default,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: palette.brand.primary,
    borderColor: palette.brand.primary,
  },
  checkboxContent: {
    flex: 1,
    gap: 4,
  },
  checkboxText: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 14,
  },
  checkboxSubtext: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 12,
  },
  modalSecurityBlock: {
    flexDirection: "row",
    backgroundColor: backgrounds.subtle,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    gap: 12,
  },
  modalSecurityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: palette.status.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
  modalSecurityContent: {
    flex: 1,
    gap: 4,
  },
  modalSecurityTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 14,
  },
  modalSecurityText: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
  },
  modalFooter: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: borders.default,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: backgrounds.card,
    borderWidth: 2,
    borderColor: palette.brand.primary,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
  },
  addCardButtonModal: {
    flex: 1,
  },
  addCardButtonGradient: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  addCardButtonText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 15,
  },
});

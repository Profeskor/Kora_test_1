import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useUserStore } from "../../src/store/userStore";
import { ArrowLeft, Info, Download, DollarSign } from "lucide-react-native";
import { useRouter } from "expo-router";
import GuestGuard from "@/src/components/guest/GuestGuard";
import {
  Heading3,
  BodyText,
  Caption,
} from "../../src/components/common/Typography";
import {
  colors,
  spacing,
  borderRadius,
} from "../../src/constants/designSystem";

const tiers = [
  { id: "gold", title: "Gold", range: "15M - 49.9M AED" },
  {
    id: "platinum",
    title: "Platinum",
    range: "50M - 99.9M AED",
  },
  { id: "diamond", title: "Diamond", range: "100M & above" },
];

// Benefits for each tier
const tierBenefits: Record<
  string,
  { id: string; title: string; subtitle: string; image: string }[]
> = {
  gold: [
    {
      id: "g1",
      title: "30% Off on Food & Beverage",
      subtitle: "Exclusive partner venues",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=400",
    },
    {
      id: "g2",
      title: "Priority Property Viewings",
      subtitle: "Skip queues and get concierge slots",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400",
    },
  ],
  platinum: [
    {
      id: "p1",
      title: "40% Off on Food & Beverage",
      subtitle: "Premium partner venues + lounges",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=400",
    },
    {
      id: "p2",
      title: "VIP Property Viewings",
      subtitle: "Dedicated concierge & private tours",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400",
    },
    {
      id: "p3",
      title: "Exclusive Networking Events",
      subtitle: "Quarterly platinum member meetups",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400",
    },
    {
      id: "p4",
      title: "Priority Commission Payouts",
      subtitle: "Faster processing within 48 hours",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400",
    },
  ],
  diamond: [
    {
      id: "d1",
      title: "50% Off on Food & Beverage",
      subtitle: "All partner venues + exclusive clubs",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=400",
    },
    {
      id: "d2",
      title: "White Glove Property Service",
      subtitle: "Personal property advisor assigned",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400",
    },
    {
      id: "d3",
      title: "Exclusive Investment Access",
      subtitle: "Early access to off-market properties",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400",
    },
    {
      id: "d4",
      title: "Annual Luxury Retreat",
      subtitle: "All-expenses-paid diamond member trip",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=400",
    },
    {
      id: "d5",
      title: "Instant Commission Payouts",
      subtitle: "Same-day processing guaranteed",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400",
    },
    {
      id: "d6",
      title: "Complimentary Chauffeur Service",
      subtitle: "For property viewings & client meetings",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400",
    },
  ],
};

// Sample commission sheet URL - replace with actual URL later
const COMMISSION_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1S0NIC-laaiis9f00yyZmfhjJs2L2PZwwiD5eHEV5-_I/edit?usp=sharing";

export default function KoraCardScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const name = user?.name || "Kora Member";
  const roleRaw = user?.currentRole || "guest";

  if (roleRaw === "guest") {
    return (
      <GuestGuard>
        <></>
      </GuestGuard>
    );
  }

  const role = String(roleRaw).toUpperCase();
  const memberSince = user?.memberSince || "2022";
  const { width: screenWidth } = useWindowDimensions();

  // Build units array from user data if available
  const units = useMemo(() => {
    // Possible shapes: user.units, user.properties -> units
    if (user?.units && Array.isArray(user.units) && user.units.length) {
      return user.units.map((u: any) => ({
        id: u.id || u.label,
        label: u.label || u.name,
        property: u.property || u.building || u.project || "Property",
        customerId: u.customerId || user.id || "CUST-0000",
      }));
    }
    if (
      user?.properties &&
      Array.isArray(user.properties) &&
      user.properties.length
    ) {
      return user.properties.flatMap((p: any) =>
        (p.units || [{ id: p.id, label: p.name }]).map((u: any) => ({
          id: u.id || `${p.id}-${u?.id || u?.label}`,
          label: u.label || u?.label || u?.name || p.name,
          property: p.name || "Property",
          customerId: p.customerId || user.id || "CUST-0000",
        }))
      );
    }

    // Fallback single unit
    return [
      {
        id: "U-001",
        label: "Unit 12B",
        property: "Palm Residency",
        customerId: user?.id || "CUST-12345",
      },
    ];
  }, [user]);

  const [index, setIndex] = useState(0);
  const [selectedTier, setSelectedTier] = useState("gold");
  const cardWidth = Math.min(360, screenWidth - 40);

  const handleOpenCommissionSheet = async () => {
    try {
      // const canOpen = await Linking.canOpenURL(COMMISSION_SHEET_URL);
      // if (canOpen) {
      await Linking.openURL(COMMISSION_SHEET_URL);
      // } else {
      //   Alert.alert(
      //     "Error",
      //     "Unable to open commission sheet. Please try again later."
      //   );
      // }
    } catch (error) {
      Alert.alert("Error", "Failed to open commission sheet.");
    }
  };

  const currentBenefits = tierBenefits[selectedTier] || tierBenefits.gold;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <ArrowLeft size={22} color={colors.text.primary} />
        </TouchableOpacity>
        <Heading3 color={colors.text.primary} fontWeight="800">
          Access Card
        </Heading3>
        <View style={{ width: 22 }} />
      </View>

      {/* Homeowner: simplified card with QR and multi-unit support */}
      {roleRaw === "homeowner" ? (
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const px = e.nativeEvent.contentOffset.x;
              const newIndex = Math.round(px / cardWidth);
              setIndex(newIndex);
            }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {units.map((u: any) => (
              <View key={u.id} style={[styles.homeCard, { width: cardWidth }]}>
                <View style={styles.homeMeta}>
                  <Heading3 color={colors.text.primary} fontWeight="800">
                    {name}
                  </Heading3>
                  <BodyText
                    fontWeight="800"
                    color={colors.primary.teal}
                    style={{ marginTop: spacing.xs }}
                  >
                    {u.label}
                  </BodyText>
                  <Caption
                    color={colors.text.secondary}
                    style={{ marginTop: spacing.xs }}
                  >
                    {u.property}
                  </Caption>
                  <Caption color={colors.text.secondary} fontWeight="700">
                    ID: {u.customerId}
                  </Caption>
                </View>

                <View style={styles.homeQrWrap}>
                  <Image
                    source={{
                      uri: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                        `kora://access/${u.customerId}/${u.id}`
                      )}`,
                    }}
                    style={styles.homeQr}
                  />
                  <Caption
                    color={colors.text.secondary}
                    fontWeight="700"
                    style={{ marginTop: spacing.sm }}
                  >
                    Scan to verify
                  </Caption>
                </View>
              </View>
            ))}
          </ScrollView>

          {units.length > 1 && (
            <View style={styles.dotsRow}>
              {units.map((_: any, i: number) => (
                <View
                  key={_.id}
                  style={[styles.dot, i === index && styles.dotActive]}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        // Default / Broker and others: keep existing Alliance-style card and benefits
        <>
          <LinearGradient
            colors={["#9d7531", "#3b2a14"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardHeader}>
              <BodyText
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "800",
                  letterSpacing: 1,
                }}
              >
                ALLIANCE
              </BodyText>
              <Caption
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  letterSpacing: 0.4,
                  opacity: 0.9,
                }}
              >
                by Kora
              </Caption>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.metaColumn}>
                <Caption
                  style={{
                    color: "#F5D58A",
                    fontWeight: "800",
                    letterSpacing: 0.6,
                  }}
                >
                  GOLD
                </Caption>
                <BodyText
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "800",
                    letterSpacing: 0.3,
                  }}
                >
                  {name}
                </BodyText>
                <Caption
                  style={{ color: "rgba(255,255,255,0.9)", fontWeight: "600" }}
                >
                  Member since {memberSince}
                </Caption>
                <Caption
                  style={{ color: "rgba(255,255,255,0.9)", fontWeight: "600" }}
                >
                  Role • {role}
                </Caption>
                <Caption
                  style={{ color: "rgba(255,255,255,0.9)", fontWeight: "600" }}
                >
                  Member ID • KORA-2048
                </Caption>
              </View>

              <View style={styles.qrContainer}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
                  style={styles.qrWrap}
                >
                  <Image
                    source={{
                      uri: "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=KoraAccessCard",
                    }}
                    style={styles.qr}
                  />
                  <Caption
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: "700",
                      marginTop: spacing.sm,
                    }}
                  >
                    Scan to verify
                  </Caption>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.tierRow}>
            {tiers.map((tier) => (
              <TouchableOpacity
                key={tier.id}
                onPress={() => setSelectedTier(tier.id)}
                activeOpacity={0.8}
                style={{ flex: 1 }}
              >
                <LinearGradient
                  colors={
                    selectedTier === tier.id
                      ? ["#d6b16b", "#b1843f"]
                      : ["#e5e7eb", "#d1d5db"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.tierCard,
                    selectedTier === tier.id && styles.tierCardActive,
                  ]}
                >
                  <Caption
                    fontWeight="700"
                    style={{
                      fontSize: 14,
                      color: selectedTier === tier.id ? "#2c1a07" : "#4B5563",
                    }}
                  >
                    {tier.title}
                  </Caption>
                  <Caption
                    fontWeight="600"
                    style={{
                      marginTop: spacing.xs,
                      color: selectedTier === tier.id ? "#2c1a07" : "#6B7280",
                    }}
                  >
                    {tier.range}
                  </Caption>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* <View style={styles.eligibilityBanner}>
            <Info size={16} color="#B98A44" />
            <Caption fontWeight="700" color="#2c1a07">
              Reach 15M AED sales to be eligible for Gold benefits
            </Caption>
          </View> */}

          {/* Commission Button for Brokers */}
          {roleRaw === "broker" && (
            <TouchableOpacity
              style={styles.commissionButton}
              onPress={handleOpenCommissionSheet}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[colors.primary.teal, "#003F54"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.commissionButtonGradient}
              >
                <DollarSign size={20} color="#fff" />
                <BodyText
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    marginLeft: spacing.sm,
                  }}
                >
                  View My Commission
                </BodyText>
                <Download
                  size={18}
                  color="#fff"
                  style={{ marginLeft: "auto" }}
                />
              </LinearGradient>
            </TouchableOpacity>
          )}

          <Heading3
            color={colors.text.primary}
            fontWeight="800"
            style={{ marginTop: spacing.md }}
          >
            {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}{" "}
            Benefits
          </Heading3>
          <View style={styles.benefitsList}>
            {currentBenefits.map((benefit) => (
              <TouchableOpacity
                key={benefit.id}
                style={styles.benefitCard}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: benefit.image }}
                  style={styles.benefitImage}
                  contentFit="cover"
                />
                <View style={styles.benefitContent}>
                  <BodyText fontWeight="800" color={colors.text.primary}>
                    {benefit.title}
                  </BodyText>
                  <Caption color={colors.text.secondary} fontWeight="600">
                    {benefit.subtitle}
                  </Caption>
                </View>
                <Caption fontWeight="700" color={colors.text.tertiary}>
                  {">"}
                </Caption>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
    flexGrow: 1,
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.18,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  metaColumn: {
    flex: 1,
    gap: spacing.xs,
  },
  qrContainer: {
    width: 140,
    alignItems: "center",
  },
  qrWrap: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  qr: {
    width: 110,
    height: 110,
    borderRadius: borderRadius.md,
    backgroundColor: "#fff",
  },
  /* Homeowner card styles */
  homeCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginRight: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  homeMeta: {
    flex: 1,
    gap: spacing.xs,
  },
  homeQrWrap: {
    width: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  homeQr: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.sm,
    backgroundColor: "#fff",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border.light,
    marginHorizontal: spacing.xs,
  },
  dotActive: {
    backgroundColor: colors.primary.teal,
  },
  tierRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  tierCard: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: "#E5E7EB",
  },
  tierCardActive: {
    shadowColor: "#b1843f",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  eligibilityBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#F7EAD2",
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  commissionButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
    overflow: "hidden",
    shadowColor: colors.primary.teal,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  commissionButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  benefitsList: {
    gap: spacing.sm,
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  benefitImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  benefitContent: {
    flex: 1,
    gap: spacing.xs,
  },
});

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
import { spacing, borderRadius } from "../../src/constants/designSystem";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "@/src/constants/colors";

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
          <ArrowLeft size={22} color={textColors.heading} />
        </TouchableOpacity>
        <Heading3 color={textColors.heading} fontWeight="800">
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
                  <Heading3 color={textColors.heading} fontWeight="800">
                    {name}
                  </Heading3>
                  <BodyText
                    fontWeight="800"
                    color={palette.brand.primary}
                    style={{ marginTop: spacing.xs }}
                  >
                    {u.label}
                  </BodyText>
                  <Caption
                    color={textColors.secondary}
                    style={{ marginTop: spacing.xs }}
                  >
                    {u.property}
                  </Caption>
                  <Caption color={textColors.secondary} fontWeight="700">
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
                    color={textColors.secondary}
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
          <View
            style={[styles.card, { backgroundColor: palette.brand.primary }]}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardHeader}>
              <BodyText
                style={{
                  color: textColors.onDark,
                  fontSize: 18,
                  fontWeight: "800",
                  letterSpacing: 1,
                }}
              >
                ALLIANCE
              </BodyText>
              <Caption
                style={{
                  color: textColors.onDark,
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
                    color: textColors.onDark,
                    fontWeight: "800",
                    letterSpacing: 0.6,
                  }}
                >
                  GOLD
                </Caption>
                <BodyText
                  style={{
                    color: textColors.onDark,
                    fontSize: 20,
                    fontWeight: "800",
                    letterSpacing: 0.3,
                  }}
                >
                  {name}
                </BodyText>
                <Caption
                  style={{
                    color: textColors.onDark,
                    opacity: 0.9,
                    fontWeight: "600",
                  }}
                >
                  Member since {memberSince}
                </Caption>
                <Caption
                  style={{
                    color: textColors.onDark,
                    opacity: 0.9,
                    fontWeight: "600",
                  }}
                >
                  Role • {role}
                </Caption>
                <Caption
                  style={{
                    color: textColors.onDark,
                    opacity: 0.9,
                    fontWeight: "600",
                  }}
                >
                  Member ID • KORA-2048
                </Caption>
              </View>

              <View style={styles.qrContainer}>
                <View style={styles.qrWrap}>
                  <Image
                    source={{
                      uri: "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=KoraAccessCard",
                    }}
                    style={styles.qr}
                  />
                  <Caption
                    style={{
                      color: textColors.onDark,
                      opacity: 0.85,
                      fontWeight: "700",
                      marginTop: spacing.sm,
                    }}
                  >
                    Scan to verify
                  </Caption>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.tierRow}>
            {tiers.map((tier) => (
              <TouchableOpacity
                key={tier.id}
                onPress={() => setSelectedTier(tier.id)}
                activeOpacity={0.8}
                style={{ flex: 1 }}
              >
                <View
                  style={[
                    styles.tierCard,
                    selectedTier === tier.id && styles.tierCardActive,
                    {
                      backgroundColor:
                        selectedTier === tier.id
                          ? palette.brand.primary
                          : borders.default,
                    },
                  ]}
                >
                  <Caption
                    fontWeight="700"
                    style={{
                      fontSize: 14,
                      color:
                        selectedTier === tier.id
                          ? textColors.onDark
                          : textColors.body,
                    }}
                  >
                    {tier.title}
                  </Caption>
                  <Caption
                    fontWeight="600"
                    style={{
                      marginTop: spacing.xs,
                      color:
                        selectedTier === tier.id
                          ? textColors.onDark
                          : textColors.secondary,
                    }}
                  >
                    {tier.range}
                  </Caption>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* <View style={styles.eligibilityBanner}>
            <Info size={16} color={palette.brand.secondary} />
            <Caption fontWeight="700" color={textColors.heading}>
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
              <View
                style={[
                  styles.commissionButtonGradient,
                  { backgroundColor: palette.brand.primary },
                ]}
              >
                <DollarSign size={20} color={textColors.onDark} />
                <BodyText
                  style={{
                    color: textColors.onDark,
                    fontWeight: "700",
                    marginLeft: spacing.sm,
                  }}
                >
                  View My Commission
                </BodyText>
                <Download
                  size={18}
                  color={textColors.onDark}
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </TouchableOpacity>
          )}

          <Heading3
            color={textColors.heading}
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
                  <BodyText fontWeight="800" color={textColors.heading}>
                    {benefit.title}
                  </BodyText>
                  <Caption color={textColors.secondary} fontWeight="600">
                    {benefit.subtitle}
                  </Caption>
                </View>
                <Caption fontWeight="700" color={textColors.secondary}>
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
    backgroundColor: backgrounds.subtle,
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
    ...shadows.card,
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
    backgroundColor: backgrounds.card,
  },
  /* Homeowner card styles */
  homeCard: {
    backgroundColor: backgrounds.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginRight: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    ...shadows.card,
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
    backgroundColor: backgrounds.card,
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
    backgroundColor: borders.default,
    marginHorizontal: spacing.xs,
  },
  dotActive: {
    backgroundColor: palette.brand.primary,
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
    backgroundColor: borders.default,
  },
  tierCardActive: {
    ...shadows.button,
  },
  eligibilityBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: backgrounds.subtle,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  commissionButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
    overflow: "hidden",
    shadowColor: palette.brand.primary,
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
    backgroundColor: backgrounds.card,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    ...shadows.card,
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

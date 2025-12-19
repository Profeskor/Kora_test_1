import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
  ScrollView,
  Dimensions,
  ColorValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import {
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react-native";

const palette = {
  background: "#f6f7fb",
  card: "#0F1C2E",
  textPrimary: "#0D1B2A",
  textSecondary: "#64748B",
  goldStart: "#DAB56A",
  goldEnd: "#B98A44",
  navy: "#0A1422",
  slate: "#1B2735",
  glass: "rgba(255,255,255,0.12)",
};

const gradientGold = [palette.goldStart, palette.goldEnd] as const;
const gradientTeal = ["#005B78", "#007C91"] as const;
const gradientIndigo = ["#1f375f", "#0f172a"] as const;
const gradientCard = ["#111827", "#0b1320"] as const;

type BannerItem = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
};

type FilterItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

type StatItem = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  gradient?: readonly [string, string];
};

type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  badge?: string;
  image: string;
};

type Experience = {
  id: string;
  title: string;
  subtitle: string;
  views: string;
  image: string;
};

export const SectionHeader = ({
  title,
  actionLabel,
  onPressAction,
}: {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {actionLabel && onPressAction && (
      <TouchableOpacity onPress={onPressAction} activeOpacity={0.85}>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// const GradientButton = ({
//   label,
//   onPress,
// }: {
//   label: string;
//   onPress?: () => void;
// }) => (
//   <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
//     <LinearGradient
//       colors={gradientGold as [ColorValue, ColorValue]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.gradientButton}
//     >
//       <Text style={styles.gradientButtonText}>{label}</Text>
//     </LinearGradient>
//   </TouchableOpacity>
// );

const FilterPill = ({
  item,
  onPress,
}: {
  item: FilterItem;
  onPress?: () => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (to: number) =>
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], marginRight: 12 }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
        onPress={onPress}
      >
        <LinearGradient
          colors={gradientTeal as [ColorValue, ColorValue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.filterPill}
        >
          <View style={styles.filterPillInner}>
            {item.icon}
            <Text style={styles.filterPillText}>{item.label}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const FilterRow = ({
  filters,
  searchPlaceholder = "Search luxury properties...",
  onFilterPress,
  onPillPress,
}: {
  filters: FilterItem[];
  searchPlaceholder?: string;
  onFilterPress?: () => void;
  onPillPress?: (filterId: string) => void;
}) => {
  return (
    <View style={styles.filterRow}>
      <View style={styles.searchBar}>
        <Search color={palette.textSecondary} size={18} />
        <TextInput
          placeholder={searchPlaceholder}
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.filterIconButton}
          onPress={onFilterPress}
          activeOpacity={0.85}
        >
          <SlidersHorizontal size={18} color={palette.navy} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterPillsContainer}>
          {filters.map((filter) => (
            <FilterPill
              key={filter.id}
              item={filter}
              onPress={() => onPillPress?.(filter.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export const BannerCarousel = ({
  items,
  onPressCTA,
}: {
  items: BannerItem[];
  onPressCTA?: (item: BannerItem) => void;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[index];

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerCard}>
        <Image
          source={{ uri: current.image }}
          style={styles.bannerImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.65)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.bannerContent}>
          <View style={styles.bannerBadge}>
            <Sparkles size={14} color="#fff" />
            <Text style={styles.bannerBadgeText}>{current.tag}</Text>
          </View>
          <Text style={styles.bannerTitle}>{current.title}</Text>
          <Text style={styles.bannerSubtitle}>{current.subtitle}</Text>
          {/* <GradientButton
            // label={current.cta}
            label={"Explore Now"}
            onPress={() => onPressCTA?.(current)}
          /> */}
        </View>
        <TouchableOpacity
          style={[styles.carouselArrow, { left: 14 }]}
          onPress={() =>
            setIndex((prev) => (prev - 1 + items.length) % items.length)
          }
        >
          <ChevronLeft size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.carouselArrow, { right: 14 }]}
          onPress={() => setIndex((prev) => (prev + 1) % items.length)}
        >
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.carouselDots}>
          {items.map((_, i) => (
            <View
              key={_.id}
              style={[
                styles.carouselDot,
                i === index && styles.carouselDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export const EliteAccessCard = ({
  userName,
  status,
  memberSince,
}: {
  userName: string;
  status: string;
  memberSince: string;
}) => (
  <LinearGradient
    colors={gradientCard as [ColorValue, ColorValue]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.eliteCard}
  >
    <View style={styles.eliteCardHeader}>
      <Text style={styles.eliteCardLabel}>Kora</Text>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
    <View style={styles.eliteNameRow}>
      <Text style={styles.eliteName}>{userName}</Text>
      <Star size={18} color={palette.goldStart} />
    </View>
    <View style={styles.eliteFooter}>
      <LinearGradient
        colors={gradientGold as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.eliteAccent}
      />
      <View>
        <Text style={styles.eliteMetaLabel}>Elite Access Card</Text>
        <Text style={styles.eliteMetaValue}>Member since {memberSince}</Text>
      </View>
    </View>
  </LinearGradient>
);

export const StatsRow = ({
  stats,
}: // onPress,
{
  stats: StatItem[];
  // onPress?: () => void;
}) => (
  <View style={styles.statsRow}>
    {stats.map((stat) => (
      <LinearGradient
        key={stat.id}
        colors={stat.gradient ?? gradientIndigo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statCard}
        // onPress={onPress}
      >
        <Text style={styles.statLabel}>{stat.label}</Text>
        <Text style={styles.statValue}>{stat.value}</Text>
        {stat.delta && <Text style={styles.statDelta}>{stat.delta}</Text>}
      </LinearGradient>
    ))}
  </View>
);

const PropertyCard = ({
  property,
  variant = "primary",
  onPress,
}: {
  property: Property;
  variant?: "primary" | "compact";
  onPress?: (property: Property) => void;
}) => {
  const cardWidth = variant === "compact" ? 260 : 320;
  const imageHeight = variant === "compact" ? 160 : 180;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(property)}
      style={[styles.propertyCard, { width: cardWidth }]}
    >
      {/* Image Section */}
      <View style={[styles.propertyImageWrap, { height: imageHeight }]}>
        <Image
          source={{ uri: property.image }}
          style={styles.propertyImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.5)"]}
          style={StyleSheet.absoluteFill}
        />
        {/* Badge - Top Left */}
        {property.badge && (
          <View style={styles.propertyTopRow}>
            <LinearGradient
              colors={gradientGold}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.propertyBadge}
            >
              <Text style={styles.propertyBadgeText}>{property.badge}</Text>
            </LinearGradient>
          </View>
        )}
      </View>

      {/* Content Section - Clear Hierarchy */}
      <View style={styles.propertyContent}>
        {/* Row 1: Title */}
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {property.title}
        </Text>

        {/* Row 2: Location */}
        <View style={styles.propertyLocationRow}>
          <MapPin size={14} color={palette.textSecondary} />
          <Text style={styles.propertyLocation} numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.propertyDivider} />

        {/* Row 3: Specs - Beds, Baths, Area */}
        <View style={styles.propertySpecs}>
          <View style={styles.specItem}>
            <Bed size={16} color={palette.textSecondary} />
            <Text style={styles.specText}>
              {property.beds === 0 ? "Studio" : `${property.beds} Beds`}
            </Text>
          </View>
          <View style={styles.specDot} />
          <View style={styles.specItem}>
            <Bath size={16} color={palette.textSecondary} />
            <Text style={styles.specText}>{property.baths} Baths</Text>
          </View>
          <View style={styles.specDot} />
          <View style={styles.specItem}>
            <Maximize2 size={16} color={palette.textSecondary} />
            <Text style={styles.specText}>{property.area}</Text>
          </View>
        </View>

        {/* Row 4: Price - Prominent */}
        <View style={styles.propertyPriceRow}>
          <Text style={styles.propertyPrice}>{property.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const PropertyCarousel = ({
  title,
  properties,
  actionLabel,
  onPressItem,
  onPressAction,
}: {
  title: string;
  properties: Property[];
  actionLabel?: string;
  onPressItem?: (property: Property) => void;
  onPressAction?: () => void;
}) => (
  <View style={styles.section}>
    <SectionHeader
      title={title}
      actionLabel={actionLabel}
      onPressAction={onPressAction}
    />

    <FlatList
      data={properties}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16, paddingHorizontal: 4 }}
      renderItem={({ item }) => (
        <PropertyCard
          property={item}
          onPress={() => onPressItem?.(item)} // ✅ PASS PROPERTY
        />
      )}
    />
  </View>
);

export const ExperienceCard = ({ experience }: { experience: Experience }) => (
  <View style={styles.section}>
    <SectionHeader title="Experience" />
    <View style={styles.experienceCard}>
      <Image
        source={{ uri: experience.image }}
        style={styles.experienceImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.75)"]}
        style={StyleSheet.absoluteFill}
      />
      <TouchableOpacity style={styles.playButton}>
        <LinearGradient
          colors={gradientGold}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.playButtonInner}
        >
          <Play size={18} color={palette.navy} />
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.experienceContent}>
        <View style={styles.experienceBadge}>
          <Text style={styles.experienceBadgeText}>Instagram</Text>
          <Text style={styles.experienceBadgeDot}>•</Text>
          <Text style={styles.experienceBadgeText}>
            {experience.views} views
          </Text>
        </View>
        <Text style={styles.experienceTitle}>{experience.title}</Text>
        <Text style={styles.experienceSubtitle}>{experience.subtitle}</Text>
      </View>
    </View>
  </View>
);

export const TopPicksRow = ({
  properties,
  onPressItem,
  onPressAction,
}: {
  properties: Property[];
  onPressItem?: (property: Property) => void;
  onPressAction?: () => void;
}) => (
  // <View style={styles.section}>
  //   <SectionHeader
  //     title="Top Picks"
  //     actionLabel="View All"
  //     onPressAction={onPressAction}
  //   />
  //   <FlatList
  //     data={properties}
  //     horizontal
  //     showsHorizontalScrollIndicator={false}
  //     keyExtractor={(item) => item.id}
  //     contentContainerStyle={{ gap: 16, paddingHorizontal: 4 }}
  //     renderItem={({ item }) => (
  //       <PropertyCard
  //         property={item}
  //         variant="compact"
  //         onPress={() => onPressItem?.(item)}
  //       />
  //     )}
  //   />
  // </View>
  <View style={styles.section}>
    <SectionHeader
      title={"Top Picks"}
      actionLabel={"Explore All"}
      onPressAction={onPressAction}
    />

    <FlatList
      data={properties}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16, paddingHorizontal: 4 }}
      renderItem={({ item }) => (
        <PropertyCard
          property={item}
          onPress={() => onPressItem?.(item)} // ✅ PASS PROPERTY
        />
      )}
    />
  </View>
);

export const GoldDivider = () => (
  <LinearGradient
    colors={gradientGold}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.goldDivider}
  />
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary,
    letterSpacing: 0.2,
  },
  sectionAction: {
    color: palette.textSecondary,
    fontWeight: "600",
    fontSize: 13,
  },
  gradientButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: palette.goldEnd,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  gradientButtonText: {
    color: palette.navy,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.2,
  },
  filterRow: {
    gap: 14,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: palette.textPrimary,
  },
  filterIconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F2E8D6",
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillsContainer: {
    flexDirection: "row",
    paddingHorizontal: 2,
  },
  filterPill: {
    borderRadius: 100,
  },
  filterPillInner: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    color: "#fff",
  },
  filterPillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerCard: {
    borderRadius: 28,
    overflow: "hidden",
    height: 420,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerContent: {
    position: "absolute",
    bottom: 28,
    left: 22,
    right: 22,
    gap: 8,
  },
  bannerBadge: {
    alignSelf: "flex-start",
    backgroundColor: palette.glass,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bannerBadgeText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontSize: 12,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  bannerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    lineHeight: 22,
  },
  carouselArrow: {
    position: "absolute",
    top: "50%",
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  carouselDots: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  carouselDotActive: {
    width: 22,
    backgroundColor: "#fff",
  },
  eliteCard: {
    borderRadius: 18,
    padding: 18,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  eliteCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eliteCardLabel: {
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  eliteNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eliteName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  eliteFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  eliteAccent: {
    width: 6,
    height: 48,
    borderRadius: 999,
  },
  eliteMetaLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
  },
  eliteMetaValue: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  statDelta: {
    color: "#A5F3FC",
    fontWeight: "700",
    marginTop: 6,
    fontSize: 12,
  },
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    // height: "100%",
  },
  propertyImageWrap: {
    position: "relative",
  },
  propertyImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  propertyTopRow: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  propertyBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  propertyBadgeText: {
    color: palette.navy,
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  propertyContent: {
    padding: 16,
    gap: 10,
  },
  propertyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: palette.textPrimary,
    lineHeight: 22,
  },
  propertyLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  propertyLocation: {
    color: palette.textSecondary,
    fontWeight: "500",
    fontSize: 14,
    flex: 1,
  },
  propertyDivider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 4,
  },
  propertySpecs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  specText: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.textSecondary,
  },
  specDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
  },
  propertyPriceRow: {
    marginTop: 4,
  },
  propertyPrice: {
    color: palette.navy,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  experienceCard: {
    height: Dimensions.get("window").height * 0.85,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#0f172a",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
  experienceImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "42%",
    left: "44%",
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  playButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  experienceContent: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    gap: 8,
  },
  experienceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  experienceBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  experienceBadgeDot: {
    color: "#fff",
    fontSize: 14,
  },
  experienceTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  experienceSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  goldDivider: {
    height: 2,
    borderRadius: 999,
    marginVertical: 16,
  },
});

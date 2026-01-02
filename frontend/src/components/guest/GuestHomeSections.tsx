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
} from "react-native";
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
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "../../constants/colors";

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
        <View style={styles.filterPill}>
          <View style={styles.filterPillInner}>
            {item.icon}
            <Text style={styles.filterPillText}>{item.label}</Text>
          </View>
        </View>
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
        <Search color={palette.brand.secondary} size={18} />
        <TextInput
          placeholder={searchPlaceholder}
          placeholderTextColor={textColors.secondary}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.filterIconButton}
          onPress={onFilterPress}
          activeOpacity={0.85}
        >
          <SlidersHorizontal size={18} color={palette.brand.primary} />
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
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
          <View style={styles.bannerBadge}>
            <Sparkles size={14} color={textColors.onDark} />
            <Text style={styles.bannerBadgeText}>{current.tag}</Text>
          </View>
          <Text style={styles.bannerTitle}>{current.title}</Text>
          <Text style={styles.bannerSubtitle}>{current.subtitle}</Text>
        </View>
        <TouchableOpacity
          style={[styles.carouselArrow, { left: 14 }]}
          onPress={() =>
            setIndex((prev) => (prev - 1 + items.length) % items.length)
          }
        >
          <ChevronLeft size={20} color={textColors.onDark} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.carouselArrow, { right: 14 }]}
          onPress={() => setIndex((prev) => (prev + 1) % items.length)}
        >
          <ChevronRight size={20} color={textColors.onDark} />
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
  <View style={styles.eliteCard}>
    <View style={styles.eliteCardHeader}>
      <Text style={styles.eliteCardLabel}>Kora</Text>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
    <View style={styles.eliteNameRow}>
      <Text style={styles.eliteName}>{userName}</Text>
      <Star size={18} color={palette.brand.secondary} />
    </View>
    <View style={styles.eliteFooter}>
      <View style={styles.eliteAccent} />
      <View>
        <Text style={styles.eliteMetaLabel}>Elite Access Card</Text>
        <Text style={styles.eliteMetaValue}>Member since {memberSince}</Text>
      </View>
    </View>
  </View>
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
      <View key={stat.id} style={styles.statCard}>
        <Text style={styles.statLabel}>{stat.label}</Text>
        <Text style={styles.statValue}>{stat.value}</Text>
        {stat.delta && <Text style={styles.statDelta}>{stat.delta}</Text>}
      </View>
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
        <View style={styles.propertyImageOverlay} />
        {/* Badge - Top Left */}
        {property.badge && (
          <View style={styles.propertyTopRow}>
            <View style={styles.propertyBadge}>
              <Text style={styles.propertyBadgeText}>{property.badge}</Text>
            </View>
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
          <MapPin size={14} color={palette.brand.secondary} />
          <Text style={styles.propertyLocation} numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.propertyDivider} />

        {/* Row 3: Specs - Beds, Baths, Area */}
        <View style={styles.propertySpecs}>
          <View style={styles.specItem}>
            <Bed size={16} color={palette.brand.secondary} />
            <Text style={styles.specText}>
              {property.beds === 0 ? "Studio" : `${property.beds} Beds`}
            </Text>
          </View>
          <View style={styles.specDot} />
          <View style={styles.specItem}>
            <Bath size={16} color={palette.brand.secondary} />
            <Text style={styles.specText}>{property.baths} Baths</Text>
          </View>
          <View style={styles.specDot} />
          <View style={styles.specItem}>
            <Maximize2 size={16} color={palette.brand.secondary} />
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
      <View style={styles.experienceOverlay} />
      <TouchableOpacity style={styles.playButton}>
        <View style={styles.playButtonInner}>
          <Play size={18} color={textColors.onDark} />
        </View>
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

export const GoldDivider = () => <View style={styles.goldDivider} />;

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
    color: textColors.heading,
    letterSpacing: 0.2,
    fontFamily: "Marcellus-Regular",
  },
  sectionAction: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  filterRow: {
    gap: 14,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: palette.ui.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: textColors.heading,
  },
  filterIconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillsContainer: {
    flexDirection: "row",
    paddingHorizontal: 2,
  },
  filterPill: {
    borderRadius: 100,
    backgroundColor: palette.brand.primary,
  },
  filterPillInner: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterPillText: {
    color: textColors.onDark,
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
    shadowColor: palette.ui.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    backgroundColor: backgrounds.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: borders.default,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bannerBadgeText: {
    color: textColors.secondary,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontSize: 12,
  },
  bannerTitle: {
    color: textColors.onDark,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.4,
    fontFamily: "Marcellus-Regular",
  },
  bannerSubtitle: {
    color: textColors.onDark,
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  carouselArrow: {
    position: "absolute",
    top: "50%",
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.brand.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: borders.default,
    opacity: 0.9,
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
    backgroundColor: palette.base.white,
    opacity: 0.4,
  },
  carouselDotActive: {
    width: 22,
    backgroundColor: palette.base.white,
    opacity: 1,
  },
  eliteCard: {
    borderRadius: 18,
    padding: 18,
    gap: 12,
    backgroundColor: palette.brand.primary,
    shadowColor: palette.ui.shadow,
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
    color: textColors.onDark,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    opacity: 0.7,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
  },
  statusText: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 12,
  },
  eliteNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eliteName: {
    color: textColors.onDark,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.4,
    fontFamily: "Marcellus-Regular",
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
    backgroundColor: palette.brand.secondary,
  },
  eliteMetaLabel: {
    color: textColors.onDark,
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.7,
  },
  eliteMetaValue: {
    color: textColors.onDark,
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
    backgroundColor: palette.brand.primary,
    shadowColor: palette.ui.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  statLabel: {
    color: textColors.onDark,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.2,
    opacity: 0.8,
  },
  statValue: {
    color: textColors.onDark,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  statDelta: {
    color: textColors.onDark,
    fontWeight: "700",
    marginTop: 6,
    fontSize: 12,
    opacity: 0.8,
  },
  propertyCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: palette.ui.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
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
  propertyImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
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
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
  },
  propertyBadgeText: {
    color: textColors.secondary,
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
    color: textColors.heading,
    lineHeight: 22,
    fontFamily: "Marcellus-Regular",
  },
  propertyLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  propertyLocation: {
    color: textColors.secondary,
    fontWeight: "500",
    fontSize: 14,
    flex: 1,
  },
  propertyDivider: {
    height: 1,
    backgroundColor: borders.default,
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
    color: textColors.secondary,
  },
  specDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: borders.default,
  },
  propertyPriceRow: {
    marginTop: 4,
  },
  propertyPrice: {
    color: palette.brand.primary,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  experienceCard: {
    height: Dimensions.get("window").height * 0.85,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: palette.ui.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
  experienceImage: {
    width: "100%",
    height: "100%",
  },
  experienceOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    backgroundColor: palette.brand.primary,
    borderWidth: 1,
    borderColor: borders.default,
    opacity: 0.9,
  },
  playButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.brand.primary,
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
    color: textColors.onDark,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  experienceBadgeDot: {
    color: textColors.onDark,
    fontSize: 14,
  },
  experienceTitle: {
    color: textColors.onDark,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
    fontFamily: "Marcellus-Regular",
  },
  experienceSubtitle: {
    color: textColors.onDark,
    fontSize: 13,
    opacity: 0.9,
  },
  goldDivider: {
    height: 2,
    borderRadius: 999,
    marginVertical: 16,
    backgroundColor: borders.default,
  },
});

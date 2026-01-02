import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Search,
  Heart,
  Calendar,
  MapPin,
  TrendingUp,
  Building2,
} from "lucide-react-native";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  badges,
  shadows,
} from "../../constants/colors";

const { width } = Dimensions.get("window");

interface BuyerHomeProps {
  userName: string;
}

export default function BuyerHome({ userName }: BuyerHomeProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.subText}>Find your dream property</Text>
      </View>

      {/* Featured Banner - No gradients, using solid brand.primary */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerHeader}>
            <Building2
              size={32}
              color={palette.base.white}
              style={{ marginRight: 12 }}
            />
            <View>
              <Text style={styles.bannerTitle}>New Launch: Marina Heights</Text>
              <Text style={styles.bannerSub}>
                Luxury waterfront living from AED 1.2M
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions - No color-coded icons, using neutral icon boxes */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <Search size={24} color={palette.brand.primary} />
          </View>
          <Text style={styles.cardText}>Explore Properties</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <Heart size={24} color={palette.brand.primary} />
          </View>
          <Text style={styles.cardText}>My Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <Calendar size={24} color={palette.brand.primary} />
          </View>
          <Text style={styles.cardText}>My Visits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <MapPin size={24} color={palette.brand.primary} />
          </View>
          <Text style={styles.cardText}>Nearby</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.tagsContainer}>
          {["1 BHK", "2 BHK", "3 BHK", "Downtown", "Marina", "Under 1M"].map(
            (tag) => (
              <TouchableOpacity key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* My Requests - No color-coded status badges */}
      <View style={styles.requestSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Requests</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requestCard}>
          <View style={styles.requestIcon}>
            <Calendar size={20} color={palette.brand.secondary} />
          </View>
          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>Site Visit Request</Text>
            <Text style={styles.requestSub}>Marina Heights - Pending</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Pending</Text>
          </View>
        </View>

        <View style={styles.requestCard}>
          <View style={styles.requestIcon}>
            <TrendingUp size={20} color={palette.brand.secondary} />
          </View>
          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>Interest Expressed</Text>
            <Text style={styles.requestSub}>Palm Residences - In Progress</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Active</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: textColors.secondary,
  },
  banner: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    backgroundColor: palette.brand.primary,
  },
  bannerContent: {
    gap: 16,
  },
  bannerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  bannerTitle: {
    color: textColors.onDark,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bannerSub: {
    color: textColors.onDark,
    fontSize: 12,
    opacity: 0.8,
  },
  bannerButton: {
    backgroundColor: backgrounds.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: palette.brand.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: (width - 52) / 2,
    backgroundColor: backgrounds.card,
    padding: 16,
    borderRadius: 16,
    ...shadows.card,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: backgrounds.subtle,
    borderWidth: 1,
    borderColor: borders.default,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: textColors.heading,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: borders.default,
    backgroundColor: backgrounds.card,
  },
  tagText: {
    color: textColors.body,
    fontSize: 14,
  },
  requestSection: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 20,
    ...shadows.card,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAll: {
    color: palette.brand.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: backgrounds.subtle,
    borderRadius: 12,
    marginBottom: 12,
  },
  requestIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 2,
  },
  requestSub: {
    fontSize: 12,
    color: textColors.secondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: badges.background,
    borderWidth: 1,
    borderColor: badges.border,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: badges.text,
  },
});

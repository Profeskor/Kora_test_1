import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Image as ImageIcon,
  Video,
  MapPin,
  Lock,
  Eye,
  Database,
  Download,
  Gauge,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "@/src/constants/colors";

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeading}>
      <View style={styles.sectionDot} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {description && (
      <Text style={styles.sectionDescription}>{description}</Text>
    )}
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const ToggleRow = ({
  icon,
  iconBg,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View style={styles.toggleRow}>
    <View style={[styles.toggleIcon, { backgroundColor: iconBg }]}>{icon}</View>
    <View style={styles.toggleContent}>
      <Text style={styles.toggleTitle}>{title}</Text>
      <Text style={styles.toggleSubtitle}>{subtitle}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? palette.base.white : backgrounds.subtle}
      trackColor={{ false: borders.default, true: palette.brand.primary }}
    />
  </View>
);

const DataUsageOption = ({
  title,
  subtitle,
  selected,
  onSelect,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <TouchableOpacity
    style={[styles.dataOption, selected && styles.dataOptionSelected]}
    onPress={onSelect}
    activeOpacity={0.85}
  >
    <View style={styles.dataOptionContent}>
      <Text style={styles.dataOptionTitle}>{title}</Text>
      <Text style={styles.dataOptionSubtitle}>{subtitle}</Text>
    </View>
    {selected && (
      <View style={styles.radioButton}>
        <View style={styles.radioButtonInner} />
      </View>
    )}
  </TouchableOpacity>
);

const StorageRow = ({
  icon,
  iconBg,
  title,
  value,
  onClear,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  onClear?: () => void;
}) => (
  <View style={styles.storageRow}>
    <View style={[styles.storageIcon, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <View style={styles.storageContent}>
      <Text style={styles.storageTitle}>{title}</Text>
      <Text style={styles.storageValue}>{value}</Text>
    </View>
    {onClear && (
      <TouchableOpacity
        style={styles.clearButton}
        onPress={onClear}
        activeOpacity={0.85}
      >
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function AppSettingsScreen() {
  const router = useRouter();

  // Media & Downloads
  const [autoDownloadImages, setAutoDownloadImages] = useState(true);
  const [highQualityImages, setHighQualityImages] = useState(true);
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);

  // Data Usage
  const [dataUsage, setDataUsage] = useState<"low" | "medium" | "high">(
    "medium"
  );

  // Privacy & Security
  const [locationServices, setLocationServices] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [showPropertyPrices, setShowPropertyPrices] = useState(true);

  // Storage & Cache
  const [appCache, setAppCache] = useState("156 MB");
  const [offlineData] = useState("23 MB");

  const handleClearCache = () => {
    Alert.alert("Clear Cache", "Are you sure you want to clear app cache?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          setAppCache("0 MB");
          Alert.alert("Success", "App cache cleared successfully");
          setTimeout(() => {
            setAppCache("156 MB");
          }, 2000);
        },
      },
    ]);
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
          <Text style={styles.heroTitle}>App Settings</Text>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <Section title="Media & Downloads">
        <ToggleRow
          icon={<ImageIcon size={18} color={palette.brand.primary} />}
          iconBg={palette.status.infoLight}
          title="Auto-Download Images"
          subtitle="Download property images automatically"
          value={autoDownloadImages}
          onValueChange={setAutoDownloadImages}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<ImageIcon size={18} color={palette.brand.secondary} />}
          iconBg={backgrounds.subtle}
          title="High Quality Images"
          subtitle="Load images in higher resolution"
          value={highQualityImages}
          onValueChange={setHighQualityImages}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Video size={18} color={palette.status.error} />}
          iconBg={palette.status.errorLight}
          title="Auto-Play Videos"
          subtitle="Videos start automatically on WiFi"
          value={autoPlayVideos}
          onValueChange={setAutoPlayVideos}
        />
      </Section>

      <Section
        title="Data Usage"
        description="Choose how much data the app can use"
      >
        <DataUsageOption
          title="Low"
          subtitle="Minimal data usage"
          selected={dataUsage === "low"}
          onSelect={() => setDataUsage("low")}
        />
        <View style={styles.divider} />
        <DataUsageOption
          title="Medium"
          subtitle="Balanced performance"
          selected={dataUsage === "medium"}
          onSelect={() => setDataUsage("medium")}
        />
        <View style={styles.divider} />
        <DataUsageOption
          title="High"
          subtitle="Best quality"
          selected={dataUsage === "high"}
          onSelect={() => setDataUsage("high")}
        />
      </Section>

      <Section title="Privacy & Security">
        <ToggleRow
          icon={<MapPin size={18} color={palette.status.success} />}
          iconBg={palette.status.successLight}
          title="Location Services"
          subtitle="Find properties near you"
          value={locationServices}
          onValueChange={setLocationServices}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Lock size={18} color={palette.brand.secondary} />}
          iconBg={backgrounds.subtle}
          title="Biometric Login"
          subtitle="Use fingerprint or Face ID"
          value={biometricLogin}
          onValueChange={setBiometricLogin}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Eye size={18} color={palette.brand.primary} />}
          iconBg={palette.status.infoLight}
          title="Show Property Prices"
          subtitle="Display prices publicly"
          value={showPropertyPrices}
          onValueChange={setShowPropertyPrices}
        />
      </Section>

      <Section title="Storage & Cache">
        <StorageRow
          icon={<Database size={18} color={palette.brand.secondary} />}
          iconBg={backgrounds.subtle}
          title="App Cache"
          value={appCache}
          onClear={handleClearCache}
        />
        <View style={styles.divider} />
        <StorageRow
          icon={<Download size={18} color={palette.status.success} />}
          iconBg={palette.status.successLight}
          title="Offline Data"
          value={offlineData}
        />
      </Section>

      <View style={styles.performanceCard}>
        <View style={styles.performanceIcon}>
          <Gauge size={20} color={palette.brand.secondary} />
        </View>
        <View style={styles.performanceContent}>
          <Text style={styles.performanceTitle}>App Performance</Text>
          <Text style={styles.performanceSubtitle}>
            Adjusting these settings can affect app performance and data usage.
          </Text>
        </View>
      </View>

      <View style={styles.footerSpacing} />
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
    fontFamily: "Marcellus-Regular",
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 24,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
    fontFamily: "Marcellus-Regular",
  },
  sectionDescription: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 11,
  },
  sectionCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 18,
    paddingVertical: 4,
    ...shadows.card,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 12,
  },
  toggleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContent: {
    flex: 1,
    gap: 4,
  },
  toggleTitle: {
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "Marcellus-Regular",
  },
  toggleSubtitle: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: backgrounds.subtle,
    marginHorizontal: 12,
  },
  dataOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "transparent",
  },
  dataOptionSelected: {
    borderColor: palette.brand.primary,
    backgroundColor: palette.status.infoLight,
  },
  dataOptionContent: {
    flex: 1,
    gap: 4,
  },
  dataOptionTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
    fontFamily: "Marcellus-Regular",
  },
  dataOptionSubtitle: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.brand.primary,
  },
  storageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 12,
  },
  storageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  storageContent: {
    flex: 1,
    gap: 4,
  },
  storageTitle: {
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 15,
  },
  storageValue: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: palette.status.errorLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.status.errorLight,
  },
  clearButtonText: {
    color: palette.status.error,
    fontWeight: "800",
    fontSize: 13,
  },
  performanceCard: {
    flexDirection: "row",
    backgroundColor: backgrounds.subtle,
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 24,
    gap: 12,
  },
  performanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  performanceContent: {
    flex: 1,
    gap: 6,
  },
  performanceTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
  },
  performanceSubtitle: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  footerSpacing: {
    height: 16,
  },
});

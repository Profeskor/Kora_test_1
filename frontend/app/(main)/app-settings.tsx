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
      thumbColor={value ? "#fff" : "#f4f4f5"}
      trackColor={{ false: "#E5E7EB", true: "#0D7EA3" }}
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
      <LinearGradient
        colors={["#0d7ea3", "#0a5b78"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroHeader}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            hitSlop={10}
            style={styles.backButton}
          >
            <View style={styles.backCircle}>
              <ArrowLeft size={18} color="#0D7EA3" />
            </View>
          </TouchableOpacity>
          <Text style={styles.heroTitle}>App Settings</Text>
          <View style={{ width: 44 }} />
        </View>
      </LinearGradient>

      <Section title="Media & Downloads">
        <ToggleRow
          icon={<ImageIcon size={18} color="#0D7EA3" />}
          iconBg="#DBEAFE"
          title="Auto-Download Images"
          subtitle="Download property images automatically"
          value={autoDownloadImages}
          onValueChange={setAutoDownloadImages}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<ImageIcon size={18} color="#9333EA" />}
          iconBg="#F3E8FF"
          title="High Quality Images"
          subtitle="Load images in higher resolution"
          value={highQualityImages}
          onValueChange={setHighQualityImages}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Video size={18} color="#EF4444" />}
          iconBg="#FEE2E2"
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
          icon={<MapPin size={18} color="#10B981" />}
          iconBg="#D1FAE5"
          title="Location Services"
          subtitle="Find properties near you"
          value={locationServices}
          onValueChange={setLocationServices}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Lock size={18} color="#F97316" />}
          iconBg="#FED7AA"
          title="Biometric Login"
          subtitle="Use fingerprint or Face ID"
          value={biometricLogin}
          onValueChange={setBiometricLogin}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon={<Eye size={18} color="#0D7EA3" />}
          iconBg="#DBEAFE"
          title="Show Property Prices"
          subtitle="Display prices publicly"
          value={showPropertyPrices}
          onValueChange={setShowPropertyPrices}
        />
      </Section>

      <Section title="Storage & Cache">
        <StorageRow
          icon={<Database size={18} color="#F97316" />}
          iconBg="#FED7AA"
          title="App Cache"
          value={appCache}
          onClear={handleClearCache}
        />
        <View style={styles.divider} />
        <StorageRow
          icon={<Download size={18} color="#10B981" />}
          iconBg="#D1FAE5"
          title="Offline Data"
          value={offlineData}
        />
      </Section>

      <View style={styles.performanceCard}>
        <View style={styles.performanceIcon}>
          <Gauge size={20} color="#6B7280" />
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
    backgroundColor: "#fff",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
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
    backgroundColor: "#CBB68B",
    borderRadius: 999,
  },
  sectionTitle: {
    color: "#5E6A75",
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  sectionDescription: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 11,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 4,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
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
    color: "#0D1B2A",
    fontWeight: "700",
    fontSize: 15,
  },
  toggleSubtitle: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
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
    borderColor: "#0D7EA3",
    backgroundColor: "#F0F9FF",
  },
  dataOptionContent: {
    flex: 1,
    gap: 4,
  },
  dataOptionTitle: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 15,
  },
  dataOptionSubtitle: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 13,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0D7EA3",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0D7EA3",
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
    color: "#0D1B2A",
    fontWeight: "700",
    fontSize: 15,
  },
  storageValue: {
    color: "#6B7280",
    fontWeight: "700",
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  clearButtonText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 13,
  },
  performanceCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
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
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  performanceContent: {
    flex: 1,
    gap: 6,
  },
  performanceTitle: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 15,
  },
  performanceSubtitle: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  footerSpacing: {
    height: 16,
  },
});

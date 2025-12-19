import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Building,
  MapPin,
  User,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "../../src/store/userStore";
import { AppUser } from "../../src/types";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeading}>
      <View style={styles.sectionDot} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const Field = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad";
}) => (
  <View style={styles.field}>
    <View style={styles.fieldLabelRow}>
      <View style={styles.fieldIcon}>{icon}</View>
      <Text style={styles.fieldLabel}>{label}</Text>
    </View>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      style={styles.input}
      keyboardType={keyboardType}
    />
  </View>
);

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const defaults = useMemo(
    () => ({
      name: user?.name || "Sarthak",
      email: user?.email || "sarthak@demo.com",
      phone: user?.mobile || "+971 50 987 6543",
      dob: user?.dob || "",
      company: user?.company || "",
      jobTitle: user?.jobTitle || "",
      address: user?.address || "",
      city: user?.city || "",
    }),
    [user]
  );

  const [name, setName] = useState(defaults.name);
  const [email, setEmail] = useState(defaults.email);
  const [phone, setPhone] = useState(defaults.phone);
  const [dob, setDob] = useState(defaults.dob);
  const [company, setCompany] = useState(defaults.company);
  const [jobTitle, setJobTitle] = useState(defaults.jobTitle);
  const [address, setAddress] = useState(defaults.address);
  const [city, setCity] = useState(defaults.city);

  const handleSave = () => {
    const existing: AppUser = user ?? {
      id: "guest",
      name,
      email,
      mobile: phone,
      roles: ["guest"],
      currentRole: "guest",
    };

    setUser({
      ...existing,
      name,
      email,
      mobile: phone,
      dob,
      company,
      jobTitle,
      address,
      city,
    });
    router.push("/(main)/more");
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
          >
            <ArrowLeft size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Edit Profile</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.85}>
            <Camera size={16} color="#0D7EA3" />
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Tap to change profile picture</Text>
        </View>
      </LinearGradient>

      <Section title="Personal Information">
        <Field
          label="Full Name"
          icon={<User size={16} color="#B98A44" />}
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
        />
        <Field
          label="Email Address"
          icon={<Mail size={16} color="#B98A44" />}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
        />
        <Field
          label="Phone Number"
          icon={<Phone size={16} color="#B98A44" />}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
        <Field
          label="Date of Birth"
          icon={<Calendar size={16} color="#B98A44" />}
          value={dob}
          onChangeText={setDob}
          placeholder="DD/MM/YYYY"
        />
      </Section>

      <Section title="Professional Information">
        <Field
          label="Company"
          icon={<Building size={16} color="#B98A44" />}
          value={company}
          onChangeText={setCompany}
          placeholder="Enter company name"
        />
        <Field
          label="Job Title"
          icon={<Briefcase size={16} color="#B98A44" />}
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder="Enter job title"
        />
      </Section>

      <Section title="Location">
        <Field
          label="Address"
          icon={<MapPin size={16} color="#B98A44" />}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
        <Field
          label="City"
          icon={<MapPin size={16} color="#B98A44" />}
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
        />
      </Section>

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.9}
        onPress={handleSave}
      >
        <LinearGradient
          colors={["#d6b16b", "#b1843f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.saveGradient}
        >
          <Text style={styles.saveText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7FB",
    paddingBottom: 24,
    gap: 16,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  avatarCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#CBB68B",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  cameraBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F4F8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -18,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarHint: {
    color: "#6B7280",
    fontWeight: "700",
    marginTop: 6,
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 6,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
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
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    gap: 12,
  },
  field: {
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
    backgroundColor: "#F8F1E2",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    color: "#5E6A75",
    fontWeight: "800",
  },
  input: {
    backgroundColor: "#F5F7FA",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#0D1B2A",
    fontWeight: "700",
  },
  saveButton: {
    paddingHorizontal: 18,
    marginTop: 4,
  },
  saveGradient: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#b1843f",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  saveText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});

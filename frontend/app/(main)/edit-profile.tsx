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
import { backgrounds, palette, textColors } from "@/src/constants";

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
      placeholderTextColor={palette.brand.secondary}
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
      <View style={styles.hero}>
        <View style={styles.heroHeader}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            hitSlop={10}
          >
            <ArrowLeft size={22} color={textColors.onDark} />
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
            <Camera size={16} color={palette.brand.primary} />
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Tap to change profile picture</Text>
        </View>
      </View>

      <Section title="Personal Information">
        <Field
          label="Full Name"
          icon={<User size={16} color={palette.brand.primary} />}
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
        />
        <Field
          label="Email Address"
          icon={<Mail size={16} color={palette.brand.primary} />}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
        />
        <Field
          label="Phone Number"
          icon={<Phone size={16} color={palette.brand.primary} />}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
        <Field
          label="Date of Birth"
          icon={<Calendar size={16} color={palette.brand.primary} />}
          value={dob}
          onChangeText={setDob}
          placeholder="DD/MM/YYYY"
        />
      </Section>

      <Section title="Professional Information">
        <Field
          label="Company"
          icon={<Building size={16} color={palette.brand.primary} />}
          value={company}
          onChangeText={setCompany}
          placeholder="Enter company name"
        />
        <Field
          label="Job Title"
          icon={<Briefcase size={16} color={palette.brand.primary} />}
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder="Enter job title"
        />
      </Section>

      <Section title="Location">
        <Field
          label="Address"
          icon={<MapPin size={16} color={palette.brand.primary} />}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
        <Field
          label="City"
          icon={<MapPin size={16} color={palette.brand.primary} />}
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
        <View style={styles.saveButtonInner}>
          <Text style={styles.saveText}>Save</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgrounds.subtle,
    paddingBottom: 24,
    gap: 16,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: palette.brand.primary,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    color: textColors.onDark,
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "Marcellus-Regular",
  },
  avatarCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: textColors.onDark,
    fontSize: 28,
    fontWeight: "800",
  },
  cameraBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -18,
    marginBottom: 8,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarHint: {
    color: textColors.secondary,
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
    backgroundColor: palette.brand.primary,
    borderRadius: 999,
  },
  sectionTitle: {
    color: textColors.secondary,
    fontWeight: "800",
    letterSpacing: 0.3,
    fontFamily: "Marcellus-Regular",
  },
  sectionCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 18,
    padding: 14,
    shadowColor: palette.brand.primary,
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
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    color: textColors.secondary,
    fontWeight: "800",
  },
  input: {
    backgroundColor: backgrounds.subtle,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: textColors.heading,
    fontWeight: "700",
  },
  saveButton: {
    paddingHorizontal: 18,
    marginTop: 4,
  },
  saveButtonInner: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: palette.brand.primary,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  saveText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});

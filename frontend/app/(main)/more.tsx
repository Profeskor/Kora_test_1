import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  HelpCircle,
  ShieldCheck,
  Bell,
  CreditCard,
  Globe,
  SlidersHorizontal,
  FileText,
  Lock,
  Star,
  Share2,
  Building2,
  LogOut,
  Crown,
  ChevronRight,
  Mail,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useUserStore } from "../../src/store/userStore";
import MultiRoleSelector from "../../src/components/auth/MultiRoleSelector";
import { UserRole } from "../../src/types";
import {
  Heading2,
  BodyText,
  Caption,
} from "../../src/components/common/Typography";
import {
  colors,
  spacing,
  borderRadius,
} from "../../src/constants/designSystem";

type Row = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  right?: React.ReactNode;
};

// Items with dedicated pages
const ITEMS_WITH_PAGES = [
  "edit",
  "documents",
  "notifications",
  "payments",
  "app-settings",
  "help",
  "share",
];

export default function MoreScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setCurrentRole = useUserStore((state) => state.setCurrentRole);
  const logout = useUserStore((state) => state.logout);
  const name = user?.name || "Sarthak";
  const role = user?.currentRole || "guest";
  const email = user?.email || "sarthak@demo.com";
  const phone = user?.phone || user?.mobile || "+971 50 987 6543";
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      paddingBottom: spacing.xl,
    },
    hero: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      borderBottomLeftRadius: borderRadius.lg,
      borderBottomRightRadius: borderRadius.lg,
    },
    accessWrap: {
      marginTop: spacing.xs,
      marginHorizontal: spacing.sm,
      marginBottom: spacing.xs,
    },
    accessCard: {
      backgroundColor: colors.background.primary,
      borderRadius: borderRadius.md,
      padding: spacing.sm,
      marginRight: spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 6 },
    },
    accessLeft: {
      flex: 1,
    },
    accessName: {
      color: colors.text.primary,
      fontWeight: "800",
      fontSize: 16,
    },
    accessUnit: {
      color: colors.primary.teal,
      fontWeight: "800",
      marginTop: spacing.xs,
    },
    accessProperty: {
      color: colors.text.secondary,
      marginTop: spacing.sm,
    },
    accessCustomer: {
      color: colors.text.secondary,
      marginTop: spacing.xs,
      fontWeight: "700",
    },
    qrWrap: {
      width: 110,
      height: 110,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: spacing.sm,
    },
    qrBox: {
      width: 100,
      height: 100,
      backgroundColor: colors.background.tertiary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius.sm,
    },
    qrText: {
      color: colors.text.tertiary,
      fontWeight: "800",
    },
    dotsRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.xs,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border.medium,
      marginHorizontal: spacing.sm,
    },
    dotActive: {
      backgroundColor: colors.primary.teal,
    },
    heroHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    heroTitle: {
      color: colors.text.inverse,
      fontSize: 18,
      fontWeight: "800",
    },
    profileCard: {
      backgroundColor: colors.background.primary,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary.gold.dark,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.sm,
    },
    avatarText: {
      color: colors.text.inverse,
      fontWeight: "800",
      fontSize: 20,
    },
    profileMeta: {
      flex: 1,
      gap: spacing.xs,
    },
    profileName: {
      color: colors.text.primary,
      fontWeight: "800",
      fontSize: 16,
    },
    rolePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: "#E5F4F8",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 999,
      alignSelf: "flex-start",
    },
    roleText: {
      color: colors.primary.teal,
      fontWeight: "800",
      fontSize: 12,
    },
    contactRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    contactText: {
      color: colors.text.primary,
      fontWeight: "600",
    },
    editWrap: {
      paddingLeft: spacing.sm,
    },
    editIcon: {
      color: colors.primary.teal,
      fontSize: 16,
      fontWeight: "800",
    },
    section: {
      paddingHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
    sectionHeading: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xs,
      gap: spacing.xs,
    },
    sectionDot: {
      width: 3,
      height: 18,
      backgroundColor: colors.primary.gold.dark,
      borderRadius: 999,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontWeight: "800",
    },
    card: {
      backgroundColor: colors.background.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.xs,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 8 },
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    },
    rowIcon: {
      width: 36,
      height: 36,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.background.tertiary,
      alignItems: "center",
      justifyContent: "center",
    },
    rowMeta: {
      flex: 1,
      gap: spacing.xs,
    },
    rowTitle: {
      color: colors.text.primary,
      fontWeight: "700",
    },
    rowSubtitle: {
      color: colors.text.secondary,
      fontWeight: "600",
      fontSize: 12,
    },
    rowWithPage: {
      backgroundColor: "#F0F9FF",
      borderLeftWidth: 3,
      borderLeftColor: colors.primary.teal,
    },
    rowIconHighlighted: {
      backgroundColor: "#DBEAFE",
    },
    rowTitleHighlighted: {
      color: colors.primary.teal,
      fontWeight: "800",
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: "#F8F1E2",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 999,
    },
    badgeText: {
      color: colors.primary.gold.dark,
      fontWeight: "800",
      fontSize: 12,
    },
    logout: {
      marginTop: spacing.xl,
      marginHorizontal: spacing.lg,
      backgroundColor: colors.semantic.error + "08",
      borderColor: colors.semantic.error,
      borderWidth: 1.5,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.sm,
    },
    logoutText: {
      color: colors.semantic.error,
      fontWeight: "800",
    },
    version: {
      textAlign: "center",
      color: colors.text.tertiary,
      marginTop: spacing.md,
      fontWeight: "700",
      marginBottom: spacing.md,
    },
    roleSwitcherButton: {
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
      marginBottom: spacing.md,
      backgroundColor: "#E6F2F5",
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      borderWidth: 1.5,
      borderColor: "#B3D9E3",
    },
    roleSwitcherIcon: {
      width: 40,
      height: 40,
      borderRadius: borderRadius.sm,
      backgroundColor: "#DBEAFE",
      alignItems: "center",
      justifyContent: "center",
    },
    roleSwitcherContent: {
      flex: 1,
    },
    roleSwitcherTitle: {
      color: colors.primary.teal,
      fontWeight: "800",
      fontSize: 14,
    },
    roleSwitcherSubtitle: {
      color: colors.primary.teal,
      fontWeight: "600",
      fontSize: 12,
      opacity: 0.8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "transparent",
      justifyContent: "flex-end",
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
      backgroundColor: colors.background.secondary,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      paddingBottom: spacing.xl,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
    },
  });

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
        <Heading2 color={colors.text.primary}>{title}</Heading2>
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );

  const RowItem = ({ item }: { item: Row }) => {
    const hasPage = ITEMS_WITH_PAGES.includes(item.id);

    return (
      <TouchableOpacity
        disabled={!item.onPress}
        onPress={item.onPress}
        activeOpacity={0.85}
        style={[styles.row, hasPage && styles.rowWithPage]}
      >
        <View style={[styles.rowIcon, hasPage && styles.rowIconHighlighted]}>
          {item.icon}
        </View>
        <View style={styles.rowMeta}>
          <BodyText
            color={hasPage ? colors.primary.teal : colors.text.primary}
            fontWeight="700"
          >
            {item.title}
          </BodyText>
          {item.subtitle ? (
            <Caption color={colors.text.secondary}>{item.subtitle}</Caption>
          ) : null}
        </View>
        {item.right ||
          (hasPage && <ChevronRight size={18} color={colors.primary.teal} />)}
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    logout();
    router.replace("/landing");
  };

  const handleSwitchRole = (selectedRole: UserRole) => {
    if (selectedRole === role) return;

    setIsLoadingRole(true);

    setTimeout(() => {
      setCurrentRole(selectedRole);
      setIsLoadingRole(false);
      setShowRoleSwitcher(false);

      // Navigate back to home (index tab)
      router.push("/(main)");
    }, 300);
  };

  const accountRows: Row[] = useMemo(() => {
    const rows: Row[] = [
      {
        id: "role",
        title: "Role Management",
        subtitle: `Current: ${role}`,
        icon: <ShieldCheck size={18} color="#0D1B2A" />,
        onPress: () => {},
        right: (
          <View style={styles.badge}>
            <Crown size={12} color="#B98A44" />
            <Text style={styles.badgeText}>{role}</Text>
          </View>
        ),
      },
      {
        id: "notifications",
        title: "Notifications",
        subtitle: "View app updates",
        icon: <Bell size={18} color="#0D1B2A" />,
        onPress: () => router.push("/(main)/notifications"),
      },
      {
        id: "documents",
        title: "My Documents",
        subtitle: "View and download uploaded docs",
        icon: <FileText size={18} color="#0D1B2A" />,
        onPress: () => router.push("/(main)/documents"),
      },
      {
        id: "payments",
        title: "Payment Methods",
        subtitle: "Manage your payment options",
        icon: <CreditCard size={18} color="#0D1B2A" />,
        onPress: () => router.push("/(main)/payment-methods"),
      },
    ];

    if (role === "broker") {
      return rows.filter((row) => row.id !== "payments");
    }

    return rows;
  }, [role, router, styles]);

  const prefRows: Row[] = [
    {
      id: "language",
      title: "Language & Region",
      subtitle: "English (UAE)",
      icon: <Globe size={18} color="#0D1B2A" />,
      onPress: () => {},
    },
    {
      id: "app-settings",
      title: "App Settings",
      subtitle: "Customize your experience",
      icon: <SlidersHorizontal size={18} color="#0D1B2A" />,
      onPress: () => router.push("/(main)/app-settings"),
    },
  ];

  const supportRows: Row[] = [
    {
      id: "help",
      title: "Help Center",
      subtitle: "FAQs and support",
      icon: <HelpCircle size={18} color="#0D1B2A" />,
      onPress: () => router.push("/(main)/help-center"),
    },
    {
      id: "contact",
      title: "Contact Support",
      subtitle: "support@kora.com",
      icon: <Mail size={18} color="#0D1B2A" />,
      onPress: () => {
        const mailto = `mailto:support@kora.com?subject=${encodeURIComponent(
          `Support request from ${name}`
        )}`;
        try {
          Linking.openURL(mailto);
        } catch (e) {
          console.warn("Could not open mail client", e);
        }
      },
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      subtitle: "Legal information",
      icon: <FileText size={18} color="#0D1B2A" />,
      onPress: () => {},
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      subtitle: "How we protect your data",
      icon: <Lock size={18} color="#0D1B2A" />,
      onPress: () => {},
    },
  ];

  const moreRows: Row[] = [
    {
      id: "rate",
      title: "Rate Us",
      subtitle: "Share your feedback",
      icon: <Star size={18} color="#0D1B2A" />,
      onPress: () => {},
    },
    {
      id: "share",
      title: "Share App",
      subtitle: "Invite friends to Kora",
      icon: <Share2 size={18} color="#0D1B2A" />,
      onPress: () => router.push("/(main)/share"),
    },
    {
      id: "about",
      title: "About Kora",
      subtitle: "Version 1.0.0",
      icon: <Building2 size={18} color="#0D1B2A" />,
      onPress: () => {},
    },
  ];

  // For brokers show commission dashboard link under Account
  // if (role === "broker") {
  //   moreRows.splice(1, 0, {
  //     id: "commission",
  //     title: "Commission Dashboard",
  //     subtitle: "View earnings & payouts",
  //     icon: <CreditCard size={18} color={colors.text.primary} />,
  //     onPress: () => {}, // TODO: implement commission page
  //   });
  // }

  // If the user is a guest, show only a logout option per request
  if (role === "guest") {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={[colors.primary.teal, "#0a5b78"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <BodyText
                fontWeight="800"
                color={colors.text.inverse}
                style={{ fontSize: 20 }}
              >
                {name.charAt(0).toUpperCase()}
              </BodyText>
            </View>
            <View style={styles.profileMeta}>
              <BodyText fontWeight="800" color={colors.text.primary}>
                {name}
              </BodyText>
              <Caption color={colors.text.secondary}>Guest</Caption>
            </View>
          </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <TouchableOpacity
            style={[
              styles.logout,
              {
                borderColor: colors.semantic.error,
                backgroundColor: colors.semantic.error + "08",
              },
            ]}
            activeOpacity={0.9}
            onPress={handleLogout}
          >
            <LogOut size={18} color={colors.semantic.error} />
            <BodyText fontWeight="800" color={colors.semantic.error}>
              Log Out
            </BodyText>
          </TouchableOpacity>
        </View>

        <Caption
          color={colors.text.tertiary}
          style={{
            textAlign: "center",
            marginTop: spacing.lg,
            marginBottom: spacing.md,
          }}
        >
          Kora Unified Mobile App{"\n"}Version 1.0.0 (Build 100)
        </Caption>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={[colors.primary.teal, "#0a5b78"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        {/* <View style={styles.heroHeader}>
          <Heading2 color={colors.text.inverse}>More</Heading2>
          <TouchableOpacity activeOpacity={0.8}>
            <Settings2 size={20} color={colors.text.inverse} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <BodyText
              fontWeight="800"
              color={colors.text.inverse}
              style={{ fontSize: 20 }}
            >
              {name.charAt(0).toUpperCase()}
            </BodyText>
          </View>
          <View style={styles.profileMeta}>
            <BodyText fontWeight="800" color={colors.text.primary}>
              {name}
            </BodyText>
            <View style={styles.rolePill}>
              <Crown size={12} color={colors.primary.teal} />
              <Caption fontWeight="800" color={colors.primary.teal}>
                {role.toUpperCase()} MEMBER
              </Caption>
            </View>
            <View style={styles.contactRow}>
              <BodyText fontWeight="600" color={colors.text.primary}>
                {email}
              </BodyText>
            </View>
            <View style={styles.contactRow}>
              <BodyText fontWeight="600" color={colors.text.primary}>
                {phone}
              </BodyText>
            </View>
          </View>
          {/* <View style={styles.editWrap}>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </LinearGradient>

      {/* Role Switcher Button - Show when user has multiple roles */}
      {/* {user?.roles && user.roles.length > 1 && (
        <TouchableOpacity
          style={styles.roleSwitcherButton}
          activeOpacity={0.85}
          onPress={() => setShowRoleSwitcher(true)}
        >
          <View style={styles.roleSwitcherIcon}>
            <Repeat2 size={18} color={colors.primary.teal} />
          </View>
          <View style={styles.roleSwitcherContent}>
            <BodyText weight="800" color={colors.primary.teal}>Switch Role</BodyText>
            <Caption color={colors.primary.teal} style={{ opacity: 0.8 }}>
              You have {user.roles.length} available roles
            </Caption>
          </View>
          <ChevronRight size={18} color={colors.primary.teal} />
        </TouchableOpacity>
      )} */}

      <Section title="Account">
        {accountRows.map((row) => (
          <RowItem key={row.id} item={row} />
        ))}
      </Section>

      <Section title="Preferences">
        {prefRows.map((row) => (
          <RowItem key={row.id} item={row} />
        ))}
      </Section>

      <Section title="Support & Legal">
        {supportRows.map((row) => (
          <RowItem key={row.id} item={row} />
        ))}
      </Section>

      <Section title="More">
        {moreRows.map((row) => (
          <RowItem key={row.id} item={row} />
        ))}
      </Section>

      <View
        style={{
          marginTop: spacing.xl,
          marginHorizontal: spacing.lg,
          marginBottom: spacing.xl,
        }}
      >
        <TouchableOpacity
          style={[
            styles.logout,
            {
              borderColor: colors.semantic.error,
              backgroundColor: colors.semantic.error + "08",
            },
          ]}
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <LogOut size={18} color={colors.semantic.error} />
          <BodyText fontWeight="800" color={colors.semantic.error}>
            Log Out
          </BodyText>
        </TouchableOpacity>
      </View>

      <Caption
        color={colors.text.tertiary}
        style={{ textAlign: "center", marginBottom: spacing.lg }}
      >
        Kora Unified Mobile App{"\n"}Version 1.0.0 (Build 100)
      </Caption>

      {/* Role Switcher Modal */}
      <Modal
        visible={showRoleSwitcher}
        transparent
        animationType="slide"
        onRequestClose={() => !isLoadingRole && setShowRoleSwitcher(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => !isLoadingRole && setShowRoleSwitcher(false)}
          />
          <View style={styles.modalContainer}>
            <MultiRoleSelector
              availableRoles={user?.roles || []}
              onSelectRole={handleSwitchRole}
              userName={name}
              isModal={true}
              onBack={() => !isLoadingRole && setShowRoleSwitcher(false)}
              currentRole={role}
            />
            {isLoadingRole && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={colors.primary.teal} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

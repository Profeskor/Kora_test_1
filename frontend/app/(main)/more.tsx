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
  palette,
  textColors,
  backgrounds,
  borders,
  badges,
} from "@/src/constants/colors";

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
      backgroundColor: backgrounds.subtle,
      paddingBottom: 24,
    },
    hero: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
      backgroundColor: palette.brand.primary,
    },
    accessWrap: {
      marginTop: 4,
      marginHorizontal: 12,
      marginBottom: 4,
    },
    accessCard: {
      backgroundColor: backgrounds.card,
      borderRadius: 12,
      padding: 12,
      marginRight: 12,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: palette.brand.primary,
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 6 },
    },
    accessLeft: {
      flex: 1,
    },
    accessName: {
      color: textColors.heading,
      fontWeight: "800",
      fontSize: 16,
    },
    accessUnit: {
      color: palette.brand.primary,
      fontWeight: "800",
      marginTop: 4,
    },
    accessProperty: {
      color: textColors.secondary,
      marginTop: 12,
    },
    accessCustomer: {
      color: textColors.secondary,
      marginTop: 4,
      fontWeight: "700",
    },
    qrWrap: {
      width: 110,
      height: 110,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 12,
    },
    qrBox: {
      width: 100,
      height: 100,
      backgroundColor: backgrounds.subtle,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    qrText: {
      color: textColors.secondary,
      fontWeight: "800",
    },
    dotsRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 4,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: borders.default,
      marginHorizontal: 12,
    },
    dotActive: {
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
    profileCard: {
      backgroundColor: backgrounds.card,
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: palette.brand.primary,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: palette.brand.primary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    avatarText: {
      color: textColors.onDark,
      fontWeight: "800",
      fontSize: 20,
    },
    profileMeta: {
      flex: 1,
      gap: 4,
    },
    profileName: {
      color: textColors.heading,
      fontWeight: "800",
      fontSize: 16,
      fontFamily: "Marcellus-Regular",
    },
    rolePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: backgrounds.subtle,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 999,
      alignSelf: "flex-start",
    },
    roleText: {
      color: palette.brand.primary,
      fontWeight: "800",
      fontSize: 12,
    },
    contactRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    contactText: {
      color: textColors.heading,
      fontWeight: "600",
    },
    editWrap: {
      paddingLeft: 12,
    },
    editIcon: {
      color: palette.brand.primary,
      fontSize: 16,
      fontWeight: "800",
    },
    section: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    sectionHeading: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
      gap: 4,
    },
    sectionDot: {
      width: 3,
      height: 18,
      backgroundColor: palette.brand.primary,
      borderRadius: 999,
    },
    sectionTitle: {
      color: textColors.heading,
      fontWeight: "800",
      fontFamily: "Marcellus-Regular",
    },
    card: {
      backgroundColor: backgrounds.card,
      borderRadius: 12,
      paddingVertical: 4,
      shadowColor: palette.brand.primary,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 8 },
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 12,
      gap: 12,
    },
    rowIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: backgrounds.subtle,
      alignItems: "center",
      justifyContent: "center",
    },
    rowMeta: {
      flex: 1,
      gap: 4,
    },
    rowTitle: {
      color: textColors.heading,
      fontWeight: "700",
      fontFamily: "Marcellus-Regular",
    },
    rowSubtitle: {
      color: textColors.secondary,
      fontWeight: "600",
      fontSize: 12,
    },
    rowWithPage: {
      backgroundColor: backgrounds.subtle,
      borderLeftWidth: 3,
      borderLeftColor: palette.brand.primary,
    },
    rowIconHighlighted: {
      backgroundColor: backgrounds.subtle,
    },
    rowTitleHighlighted: {
      color: palette.brand.primary,
      fontWeight: "800",
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: badges.background,
      borderWidth: 1,
      borderColor: badges.border,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 999,
    },
    badgeText: {
      color: badges.text,
      fontWeight: "800",
      fontSize: 12,
    },
    logout: {
      marginTop: 24,
      marginHorizontal: 20,
      backgroundColor: palette.base.white,
      borderColor: palette.brand.secondary,
      borderWidth: 1.5,
      borderRadius: 12,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    logoutText: {
      color: textColors.heading,
      fontWeight: "800",
    },
    version: {
      textAlign: "center",
      color: textColors.secondary,
      marginTop: 16,
      fontWeight: "700",
      marginBottom: 16,
    },
    roleSwitcherButton: {
      marginHorizontal: 20,
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: backgrounds.subtle,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1.5,
      borderColor: borders.default,
    },
    roleSwitcherIcon: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: backgrounds.subtle,
      alignItems: "center",
      justifyContent: "center",
    },
    roleSwitcherContent: {
      flex: 1,
    },
    roleSwitcherTitle: {
      color: palette.brand.primary,
      fontWeight: "800",
      fontSize: 14,
      fontFamily: "Marcellus-Regular",
    },
    roleSwitcherSubtitle: {
      color: palette.brand.primary,
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
      backgroundColor: backgrounds.subtle,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      paddingBottom: 24,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
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
        <Heading2 color={textColors.heading}>{title}</Heading2>
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
            color={hasPage ? palette.brand.primary : textColors.heading}
            fontWeight="700"
          >
            {item.title}
          </BodyText>
          {item.subtitle ? (
            <Caption color={textColors.secondary}>{item.subtitle}</Caption>
          ) : null}
        </View>
        {item.right ||
          (hasPage && <ChevronRight size={18} color={palette.brand.primary} />)}
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
        icon: <ShieldCheck size={18} color={palette.brand.primary} />,
        onPress: () => {},
        right: (
          <View style={styles.badge}>
            <Crown size={12} color={palette.brand.secondary} />
            <Text style={styles.badgeText}>{role}</Text>
          </View>
        ),
      },
      {
        id: "notifications",
        title: "Notifications",
        subtitle: "View app updates",
        icon: <Bell size={18} color={palette.brand.primary} />,
        onPress: () => router.push("/(main)/notifications"),
      },
      {
        id: "documents",
        title: "My Documents",
        subtitle: "View and download uploaded docs",
        icon: <FileText size={18} color={palette.brand.primary} />,
        onPress: () => router.push("/(main)/documents"),
      },
      {
        id: "payments",
        title: "Payment Methods",
        subtitle: "Manage your payment options",
        icon: <CreditCard size={18} color={palette.brand.primary} />,
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
      icon: <Globe size={18} color={palette.brand.primary} />,
      onPress: () => {},
    },
    {
      id: "app-settings",
      title: "App Settings",
      subtitle: "Customize your experience",
      icon: <SlidersHorizontal size={18} color={palette.brand.primary} />,
      onPress: () => router.push("/(main)/app-settings"),
    },
  ];

  const supportRows: Row[] = [
    {
      id: "help",
      title: "Help Center",
      subtitle: "FAQs and support",
      icon: <HelpCircle size={18} color={palette.brand.primary} />,
      onPress: () => router.push("/(main)/help-center"),
    },
    {
      id: "contact",
      title: "Contact Support",
      subtitle: "support@kora.com",
      icon: <Mail size={18} color={palette.brand.primary} />,
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
      icon: <FileText size={18} color={palette.brand.primary} />,
      onPress: () => {},
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      subtitle: "How we protect your data",
      icon: <Lock size={18} color={palette.brand.primary} />,
      onPress: () => {},
    },
  ];

  const moreRows: Row[] = [
    {
      id: "rate",
      title: "Rate Us",
      subtitle: "Share your feedback",
      icon: <Star size={18} color={palette.brand.primary} />,
      onPress: () => {},
    },
    {
      id: "share",
      title: "Share App",
      subtitle: "Invite friends to Kora",
      icon: <Share2 size={18} color={palette.brand.primary} />,
      onPress: () => router.push("/(main)/share"),
    },
    {
      id: "about",
      title: "About Kora",
      subtitle: "Version 1.0.0",
      icon: <Building2 size={18} color={palette.brand.primary} />,
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
        <View style={styles.hero}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <BodyText
                fontWeight="800"
                color={textColors.onDark}
                style={{ fontSize: 20 }}
              >
                {name.charAt(0).toUpperCase()}
              </BodyText>
            </View>
            <View style={styles.profileMeta}>
              <BodyText fontWeight="800" color={textColors.heading}>
                {name}
              </BodyText>
              <Caption color={textColors.secondary}>Guest</Caption>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <TouchableOpacity
            style={[
              styles.logout,
              {
                borderColor: palette.status.error,
                backgroundColor: palette.status.errorLight,
              },
            ]}
            activeOpacity={0.9}
            onPress={handleLogout}
          >
            <LogOut size={18} color={palette.status.error} />
            <BodyText fontWeight="800" color={palette.status.error}>
              Log Out
            </BodyText>
          </TouchableOpacity>
        </View>

        <Caption
          color={textColors.secondary}
          style={{
            textAlign: "center",
            marginTop: 20,
            marginBottom: 16,
          }}
        >
          Kora Unified Mobile App{"\n"}Version 1.0.0 (Build 100)
        </Caption>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        {/* <View style={styles.heroHeader}>
          <Heading2 color={textColors.onDark}>More</Heading2>
          <TouchableOpacity activeOpacity={0.8}>
            <Settings2 size={20} color={textColors.onDark} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <BodyText
              fontWeight="800"
              color={textColors.onDark}
              style={{ fontSize: 20 }}
            >
              {name.charAt(0).toUpperCase()}
            </BodyText>
          </View>
          <View style={styles.profileMeta}>
            <BodyText fontWeight="800" color={textColors.heading}>
              {name}
            </BodyText>
            <View style={styles.rolePill}>
              <Crown size={12} color={palette.brand.primary} />
              <Caption fontWeight="800" color={palette.brand.primary}>
                {role.toUpperCase()} MEMBER
              </Caption>
            </View>
            <View style={styles.contactRow}>
              <BodyText fontWeight="600" color={textColors.heading}>
                {email}
              </BodyText>
            </View>
            <View style={styles.contactRow}>
              <BodyText fontWeight="600" color={textColors.heading}>
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
      </View>

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
          marginTop: 24,
          marginHorizontal: 20,
          marginBottom: 24,
        }}
      >
        <TouchableOpacity
          style={[
            styles.logout,
            {
              borderColor: palette.status.error,
              backgroundColor: palette.status.errorLight,
            },
          ]}
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <LogOut size={18} color={palette.status.error} />
          <BodyText fontWeight="800" color={palette.status.error}>
            Log Out
          </BodyText>
        </TouchableOpacity>
      </View>

      <Caption
        color={textColors.secondary}
        style={{ textAlign: "center", marginBottom: 20 }}
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
                <ActivityIndicator size="large" color={palette.brand.primary} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

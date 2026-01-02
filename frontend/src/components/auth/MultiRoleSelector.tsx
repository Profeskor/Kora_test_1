import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import {
  ArrowLeft,
  Briefcase,
  Key,
  ChevronRight,
  Building2,
} from "lucide-react-native";
import { UserRole } from "../../types";
import {
  palette,
  textColors,
  backgrounds,
  borders,
  shadows,
} from "../../constants/colors";

interface MultiRoleSelectorProps {
  availableRoles: UserRole[];
  onSelectRole: (role: UserRole, remember?: boolean) => void;
  userName?: string;
  showLogout?: boolean;
  onLogout?: () => void;
  isModal?: boolean;
  onBack?: () => void;
  currentRole?: UserRole;
}

const ROLE_CONFIG: Record<
  UserRole,
  { title: string; subtitle: string; color: string; tint: string; Icon: any }
> = {
  broker: {
    title: "Continue as Broker",
    subtitle: "Manage your listings, clients, and deals",
    color: palette.status.error,
    tint: backgrounds.subtle,
    Icon: Briefcase,
  },
  homeowner: {
    title: "Continue as Homeowner",
    subtitle: "Track your property value and manage your home",
    color: palette.status.success,
    tint: backgrounds.subtle,
    Icon: Key,
  },
  buyer: {
    title: "Continue as Buyer",
    subtitle: "Discover and shortlist the best properties",
    color: palette.brand.primary,
    tint: backgrounds.subtle,
    Icon: Building2,
  },
  guest: {
    title: "Continue as Guest",
    subtitle: "Browse available inventory only",
    color: palette.brand.secondary,
    tint: backgrounds.subtle,
    Icon: Building2,
  },
};

export default function MultiRoleSelector({
  availableRoles,
  onSelectRole,
  userName,
  showLogout,
  onLogout,
  isModal,
  onBack,
  currentRole,
}: MultiRoleSelectorProps) {
  const [rememberChoice, setRememberChoice] = React.useState(true);
  const name = userName || "there";

  return (
    <View style={[styles.container, isModal && styles.modal]}>
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={18} color={textColors.heading} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
        <View style={styles.headerSpacer} />
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Building2 size={28} color={palette.status.error} />
        </View>
        <Text style={styles.heroTitle}>Welcome back, {name}!</Text>
        <Text style={styles.heroSubtitle}>Choose your role to get started</Text>
      </View>

      <View style={styles.list}>
        {availableRoles.map((role) => {
          const config = ROLE_CONFIG[role] || ROLE_CONFIG.guest;
          const RoleIcon = config.Icon;
          const isCurrentRole = currentRole === role;

          return (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleCard,
                isCurrentRole && styles.roleCardDisabled,
              ]}
              activeOpacity={isCurrentRole ? 1 : 0.9}
              disabled={isCurrentRole}
              onPress={() => onSelectRole(role, rememberChoice)}
            >
              <View
                style={[
                  styles.roleAvatar,
                  { backgroundColor: config.tint },
                  isCurrentRole && styles.roleAvatarDisabled,
                ]}
              >
                <RoleIcon
                  size={20}
                  color={isCurrentRole ? borders.default : config.color}
                />
              </View>
              <View style={styles.roleMeta}>
                <Text
                  style={[
                    styles.roleTitle,
                    isCurrentRole && styles.roleTitleDisabled,
                  ]}
                >
                  {config.title}
                </Text>
                <Text
                  style={[
                    styles.roleSubtitle,
                    isCurrentRole && styles.roleSubtitleDisabled,
                  ]}
                >
                  {isCurrentRole ? "Current role" : config.subtitle}
                </Text>
              </View>
              <ChevronRight
                size={18}
                color={
                  isCurrentRole ? borders.default : palette.brand.secondary
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.rememberRow}>
        <TouchableOpacity
          style={[styles.checkbox, rememberChoice && styles.checkboxChecked]}
          onPress={() => setRememberChoice((v) => !v)}
        >
          {rememberChoice ? <View style={styles.checkboxDot} /> : null}
        </TouchableOpacity>
        <Text style={styles.rememberText}>
          Remember my choice for future logins
        </Text>
      </View>

      <View style={styles.helper}>
        <Text style={styles.helperText}>
          You can switch between roles anytime from your profile
        </Text>
      </View>

      {showLogout && onLogout ? (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgrounds.subtle,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 22,
  },
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  headerSpacer: {
    flex: 1,
  },
  hero: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
    gap: 8,
  },
  heroIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: textColors.heading,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
  },
  list: {
    gap: 12,
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borders.default,
    ...shadows.card,
    gap: 12,
  },
  roleCardDisabled: {
    backgroundColor: backgrounds.subtle,
    borderColor: borders.default,
    opacity: 0.6,
  },
  roleAvatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  roleAvatarDisabled: {
    backgroundColor: backgrounds.subtle,
  },
  roleMeta: {
    flex: 1,
    gap: 4,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.heading,
  },
  roleTitleDisabled: {
    color: textColors.secondary,
  },
  roleSubtitle: {
    fontSize: 13,
    color: textColors.secondary,
  },
  roleSubtitleDisabled: {
    color: borders.default,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: palette.brand.secondary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.base.white,
  },
  checkboxChecked: {
    borderColor: palette.brand.primary,
    backgroundColor: palette.brand.primary,
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: palette.base.white,
  },
  rememberText: {
    color: textColors.heading,
    fontSize: 14,
    flex: 1,
  },
  helper: {
    marginTop: 14,
  },
  helperText: {
    textAlign: "center",
    color: textColors.secondary,
    fontSize: 13,
  },
  logoutButton: {
    marginTop: 18,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logoutText: {
    color: palette.brand.primary,
    fontWeight: "600",
  },
});

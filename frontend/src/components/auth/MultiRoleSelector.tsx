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
    color: "#7C3AED",
    tint: "rgba(124,58,237,0.12)",
    Icon: Briefcase,
  },
  homeowner: {
    title: "Continue as Homeowner",
    subtitle: "Track your property value and manage your home",
    color: "#10B981",
    tint: "rgba(16,185,129,0.12)",
    Icon: Key,
  },
  buyer: {
    title: "Continue as Buyer",
    subtitle: "Discover and shortlist the best properties",
    color: "#2563EB",
    tint: "rgba(37,99,235,0.12)",
    Icon: Building2,
  },
  guest: {
    title: "Continue as Guest",
    subtitle: "Browse available inventory only",
    color: "#6B7280",
    tint: "rgba(107,114,128,0.12)",
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
            <ArrowLeft size={18} color="#1F2937" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
        <View style={styles.headerSpacer} />
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Building2 size={28} color="#0F5C6E" />
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
                  color={isCurrentRole ? "#D1D5DB" : config.color}
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
                color={isCurrentRole ? "#D1D5DB" : "#9CA3AF"}
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
    backgroundColor: "#F9FAFB",
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
    backgroundColor: "#EEF2F7",
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
    backgroundColor: "rgba(0,92,110,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  list: {
    gap: 12,
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    gap: 12,
  },
  roleCardDisabled: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
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
    backgroundColor: "#E5E7EB",
  },
  roleMeta: {
    flex: 1,
    gap: 4,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  roleTitleDisabled: {
    color: "#9CA3AF",
  },
  roleSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  roleSubtitleDisabled: {
    color: "#D1D5DB",
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
    borderColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: "#111827",
    backgroundColor: "#111827",
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#F3F4F6",
  },
  rememberText: {
    color: "#111827",
    fontSize: 14,
    flex: 1,
  },
  helper: {
    marginTop: 14,
  },
  helperText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
  },
  logoutButton: {
    marginTop: 18,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});

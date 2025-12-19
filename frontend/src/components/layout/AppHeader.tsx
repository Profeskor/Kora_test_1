import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Bell,
  UserCircle,
  // Home,
  Heart,
  X,
  Users,
  Calendar,
  Building2,
  Gift,
  Briefcase,
  Key,
  Crown,
  User,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "../../store/userStore";
import { useAppState } from "../../store/appState";
import {
  useNotificationStore,
  NotificationType,
} from "../../store/notificationStore";
import { SafeAreaView } from "react-native-safe-area-context";
import MultiRoleSelector from "../auth/MultiRoleSelector";
import { UserRole } from "../../types";

interface AppHeaderProps {
  title?: string;
}

const ROLE_ICON_CONFIG: Record<
  UserRole,
  { Icon: any; color: string; bg: string }
> = {
  broker: { Icon: Briefcase, color: "#7C3AED", bg: "#F3E8FF" },
  homeowner: { Icon: Key, color: "#10B981", bg: "#D1FAE5" },
  buyer: { Icon: Building2, color: "#2563EB", bg: "#DBEAFE" },
  guest: { Icon: User, color: "#6B7280", bg: "#F3F4F6" },
  tenant: { Icon: Crown, color: "#F59E0B", bg: "#FEF3C7" },
};

export default function AppHeader({ title }: AppHeaderProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setCurrentRole = useUserStore((state) => state.setCurrentRole);
  const { showNotifications, toggleNotifications } = useAppState();
  const { markAllRead, getNotificationsForRole } = useNotificationStore();
  const role = user?.currentRole || "guest";
  const firstName = user?.name?.split(" ")[0] || "Guest";
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [isLoadingRole, setIsLoadingRole] = useState(false);
  const goHome = () => router.push("/(main)");

  // Filter notifications based on user role
  const roleNotifications = getNotificationsForRole(role);
  const roleUnreadCount = roleNotifications.filter((n) => !n.read).length;

  const handleSwitchRole = (selectedRole: UserRole) => {
    if (selectedRole === role) return;

    setIsLoadingRole(true);
    setTimeout(() => {
      setShowRoleSwitcher(false);
      setCurrentRole(selectedRole);
      setIsLoadingRole(false);
      // No navigation needed - the HomeScreen and other components
      // automatically re-render based on the role from the store
    }, 300);
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  const getNotificationIcon = (type?: NotificationType) => {
    switch (type) {
      case "lead":
        return Users;
      case "booking":
        return Calendar;
      case "property":
        return Building2;
      case "offer":
        return Gift;
      default:
        return Bell;
    }
  };

  const getNotificationIconColor = (type?: NotificationType) => {
    switch (type) {
      case "lead":
        return "#00B0BB";
      case "booking":
        return "#28A745";
      case "property":
        return "#2196F3";
      case "offer":
        return "#FFC107";
      default:
        return "#005B78";
    }
  };

  const getNotificationIconBg = (type?: NotificationType) => {
    switch (type) {
      case "lead":
        return "#E0F2F7";
      case "booking":
        return "#D4EDDA";
      case "property":
        return "#E0F7FA";
      case "offer":
        return "#FFF8E1";
      default:
        return "#E6F2F5";
    }
  };

  const roleConfig = ROLE_ICON_CONFIG[role] || ROLE_ICON_CONFIG.guest;
  const RoleIcon = roleConfig.Icon;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.roleIndicator, { backgroundColor: roleConfig.bg }]}
          onPress={() =>
            user?.roles && user.roles.length > 1 && setShowRoleSwitcher(true)
          }
          activeOpacity={user?.roles && user.roles.length > 1 ? 0.8 : 1}
        >
          <RoleIcon size={20} color={roleConfig.color} />
          <Text style={[styles.roleLabel, { color: roleConfig.color }]}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.identity}
          onPress={goHome}
          activeOpacity={0.7}
        >
          {/* <Text style={styles.name}>{title || firstName}</Text> */}
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(main)/shortlist")}
          >
            <Heart size={22} color="#005B78" />
          </TouchableOpacity>
          {role !== "guest" && (
            <>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => toggleNotifications(true)}
              >
                <Bell size={22} color="#005B78" />
                {roleUnreadCount > 0 && <View style={styles.unreadDot} />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push("/(main)/more")}
              >
                <UserCircle size={22} color="#005B78" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <Modal visible={showNotifications} transparent animationType="fade">
        <TouchableOpacity
          style={styles.notificationOverlay}
          activeOpacity={1}
          onPress={() => toggleNotifications(false)}
        >
          <TouchableOpacity
            style={styles.modalCard}
            activeOpacity={1}
            onPress={() => {}}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity
                style={styles.closeIconButton}
                onPress={() => toggleNotifications(false)}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {roleNotifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No notifications yet.</Text>
              </View>
            ) : (
              <ScrollView
                style={styles.notificationsList}
                showsVerticalScrollIndicator={false}
              >
                {roleNotifications.map((notif) => {
                  const IconComponent = getNotificationIcon(notif.type);
                  const iconColor = getNotificationIconColor(notif.type);
                  const iconBg = getNotificationIconBg(notif.type);

                  return (
                    <View
                      key={notif.id}
                      style={[
                        styles.notificationCard,
                        !notif.read && styles.unreadCard,
                      ]}
                    >
                      <View
                        style={[
                          styles.notificationIcon,
                          { backgroundColor: iconBg },
                        ]}
                      >
                        <IconComponent size={20} color={iconColor} />
                      </View>
                      <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}>
                          {notif.title}
                        </Text>
                        <Text style={styles.notificationMessage}>
                          {notif.message}
                        </Text>
                        <Text style={styles.notificationTime}>
                          {formatTimeAgo(notif.createdAt)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}

            {roleNotifications.length > 0 && (
              <TouchableOpacity
                style={styles.markAllReadButton}
                onPress={() => {
                  markAllRead();
                }}
              >
                <Text style={styles.markAllReadText}>Mark all as read</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

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
          <View style={styles.roleSwitcherContainer}>
            <MultiRoleSelector
              availableRoles={user?.roles || []}
              onSelectRole={handleSwitchRole}
              userName={firstName}
              isModal={true}
              onBack={() => !isLoadingRole && setShowRoleSwitcher(false)}
              currentRole={role}
            />
            {isLoadingRole && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#0D7EA3" />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
    color: "#0F172A",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  closeIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
  },
  notificationsList: {
    maxHeight: 400,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  unreadCard: {
    backgroundColor: "#E0F2F7",
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  markAllReadButton: {
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: 8,
  },
  markAllReadText: {
    color: "#005B78",
    fontSize: 15,
    fontWeight: "600",
  },
  unreadDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "white",
  },
  roleIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
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
  roleSwitcherContainer: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 34,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { Tabs, useRouter } from "expo-router";
import { Home, Search, MoreHorizontal, Calendar } from "lucide-react-native";
import { Pressable, View, StyleSheet, Image } from "react-native";
import { useUserStore } from "../../src/store/userStore";
import AppHeader from "../../src/components/layout/AppHeader";
import { KORA_NAV_LOGO } from "../../src/constants/assets";
import { palette, backgrounds } from "@/src/constants/colors";

export default function MainLayout() {
  const user = useUserStore((state) => state.user);
  const role = user?.currentRole || "guest";
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: palette.brand.primary,
        tabBarInactiveTintColor: palette.brand.secondary,
        headerShown: true,
        header: () => {
          const titles: Record<string, string> = {
            index: "Home",
            properties: "Properties",
            bookings: "Bookings",
            more: "More",
            "kora-card": "Kora",
          };

          return <AppHeader title={titles[route.name] || "Kora"} />;
        },
      })}
      screenListeners={({ navigation }) => ({
        tabPress: (e) => {
          // Allow normal tab navigation
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: "Properties",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="kora-card"
        options={{
          title: "Kora",
          tabBarLabel: "",
          tabBarIcon: () => null,
          tabBarButton: () => (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(main)/kora-card")}
              style={({ pressed }) => [
                styles.koraButton,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
            >
              <View style={styles.koraInner}>
                <Image
                  source={KORA_NAV_LOGO}
                  style={styles.koraLogo}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <MoreHorizontal color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="bookings/[id]" options={{ href: null }} />
      <Tabs.Screen name="shortlist" options={{ href: null }} />
      <Tabs.Screen name="leads" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="payment-methods" options={{ href: null }} />
      <Tabs.Screen name="help-center" options={{ href: null }} />
      <Tabs.Screen name="share" options={{ href: null }} />
      <Tabs.Screen name="app-settings" options={{ href: null }} />
      <Tabs.Screen name="documents" options={{ href: null }} />
      <Tabs.Screen name="my-properties" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  koraButton: {
    marginTop: -16,
    justifyContent: "center",
    alignItems: "center",
  },
  koraInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: palette.base.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    borderWidth: 2,
    borderColor: palette.brand.primary,
    overflow: "hidden",
  },
  koraLogo: {
    width: 44,
    height: 44,
  },
});

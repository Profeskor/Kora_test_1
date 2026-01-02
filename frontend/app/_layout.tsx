import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Marcellus-Regular": require("../assets/fonts/Marcellus/Marcellus-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="landing" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="quick-pay" />
        <Stack.Screen name="property/[id]" />
        <Stack.Screen name="compare" />
        <Stack.Screen name="unit-selection" />
        <Stack.Screen name="bookings/detail" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

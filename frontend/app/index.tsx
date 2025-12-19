import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useUserStore } from "../src/store/userStore";
import { useAppState } from "../src/store/appState";
import SplashHero from "../src/components/onboarding/SplashScreen";

export default function Index() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { currentScreen, setScreen } = useAppState();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    setScreen("splash");
    const timer = setTimeout(() => {
      setBooting(false);
      if (user) {
        setScreen("app");
      } else {
        setScreen("onboarding");
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [user, setScreen]);

  if (booting || currentScreen === "splash") {
    return (
      <View style={{ flex: 1 }}>
        <SplashHero onComplete={() => router.replace("/onboarding")} />
      </View>
    );
  }

  if (user && currentScreen === "app") {
    return <Redirect href="/(main)" />;
  }

  if (currentScreen === "onboarding") {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/landing" />;
}

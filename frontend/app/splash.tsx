import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import SplashHero from "../src/components/onboarding/SplashScreen";
import { useAppState } from "../src/store/appState";

export default function SplashScreenPage() {
  const router = useRouter();
  const { setScreen } = useAppState();

  useEffect(() => {
    setScreen("splash");
    const timer = setTimeout(() => {
      setScreen("onboarding");
      router.replace("/onboarding");
    }, 900);
    return () => clearTimeout(timer);
  }, [router, setScreen]);

  return <SplashHero onComplete={() => router.replace("/onboarding")} />;
}

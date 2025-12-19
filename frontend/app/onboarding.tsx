import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import OnboardingCarousel from "../src/components/onboarding/OnboardingCarousel";
import { useAppState } from "../src/store/appState";

export default function OnboardingPage() {
  const router = useRouter();
  const { setScreen } = useAppState();

  useEffect(() => {
    setScreen("onboarding");
  }, [setScreen]);

  const handleComplete = () => {
    setScreen("landing");
    router.replace("/landing");
  };

  return (
    <View style={styles.container}>
      <OnboardingCarousel onComplete={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});

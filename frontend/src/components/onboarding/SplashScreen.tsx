import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

// Using require for local asset
const SPLASH_BG = require("../../../assets/images/splash-background.png");

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <Image source={SPLASH_BG} style={styles.image} contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Fallback
  },
  image: {
    width: width,
    height: height,
  },
});

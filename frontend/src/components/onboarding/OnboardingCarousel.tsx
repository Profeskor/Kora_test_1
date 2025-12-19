import React, { useState, useCallback, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1730005523015-422bd53dda0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9wZXJ0eSUyMHRlYWwlMjBvY2VhbnxlbnwxfHx8fDE3NjQ5MzMzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Luxury and Comfort,",
    subtitle: "Just a Tap Away",
    description:
      "Discover premium properties with world-class amenities and exceptional service designed for your lifestyle",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1763467941420-a971deda1779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB0dXJxdW9pc2UlMjB3YXRlcnxlbnwxfHx8fDE3NjQ5MzMzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Book with Ease,",
    subtitle: "Live with Style",
    description:
      "Schedule site visits, express interest, and secure your dream property with our streamlined booking process",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1762681947187-f63117047d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHRlYWwlMjBibHVlfGVufDF8fHx8MTc2NDkzMzMzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Your Home,",
    subtitle: "Your Way",
    description:
      "Manage payments, documents, and services all in one place for a seamless homeownership experience",
  },
];

interface Props {
  onComplete: () => void;
}

export default function OnboardingCarousel({ onComplete }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoTimer = useRef<any>(null);

  const handleContinue = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }

    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [currentSlide, onComplete]);

  const handleSkip = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Auto-advance every 3 seconds
    autoTimer.current = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < SLIDES.length - 1) return prev + 1;
        // Last slide: clear timer and stay on last slide
        if (autoTimer.current) {
          clearInterval(autoTimer.current);
          autoTimer.current = null;
        }
        return prev;
      });
    }, 3000);

    return () => {
      if (autoTimer.current) {
        clearInterval(autoTimer.current);
        autoTimer.current = null;
      }
    };
  }, []);

  // Handle auto-complete when we reach the last slide and timer stops
  useEffect(() => {
    if (currentSlide === SLIDES.length - 1 && !autoTimer.current) {
      // Small delay to ensure we're not in a render cycle
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(completeTimeout);
    }
  }, [currentSlide, onComplete]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.slidesContainer}>
        {SLIDES.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              StyleSheet.absoluteFill,
              { opacity: index === currentSlide ? 1 : 0 },
            ]}
          >
            <Image
              source={{ uri: slide.image }}
              style={styles.backgroundImage}
              contentFit="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {currentSlide < SLIDES.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <SafeAreaView style={styles.controlsContainer}>
        {/* {currentSlide < SLIDES.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )} */}

        <View style={styles.dotsContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentSlide && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  slidesContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  contentContainer: {
    position: "absolute",
    bottom: 180,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    width: 32,
    backgroundColor: "#005B78",
  },
  button: {
    width: "100%",
    backgroundColor: "#005B78",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  skipButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 10,
    zIndex: 10,
    elevation: 10,
    marginTop: 50,
  },
  skipText: {
    color: "white",
    opacity: 0.8,
  },
});

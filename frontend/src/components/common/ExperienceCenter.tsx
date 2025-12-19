import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Play } from "lucide-react-native";
import AppHeader from "../layout/AppHeader";
import { ExperienceVideoModal } from "./ExperienceVideoModal";
import { SectionHeader } from "../guest/GuestHomeSections";

const palette = {
  navy: "#0D1B2A",
  goldStart: "#F5D58A",
  goldEnd: "#E3B873",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.8)",
};
const gradientGold = [palette.goldStart, palette.goldEnd];

export const ExperienceCenterCard = ({
  experience,
}: {
  experience: {
    id: string;
    title: string;
    subtitle: string;
    views: string;
    image: string;
    videoUrl: string;
  };
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.section}>
        <SectionHeader title="Experience" />
        <TouchableOpacity activeOpacity={0.9} onPress={() => setOpen(true)}>
          <View style={styles.experienceCard}>
            <Image
              source={{ uri: experience.image }}
              style={styles.experienceImage}
              contentFit="cover"
            />

            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.75)"]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.playButton}>
              <LinearGradient
                colors={gradientGold}
                style={styles.playButtonInner}
              >
                <Play size={18} color={palette.navy} />
              </LinearGradient>
            </View>

            <View style={styles.experienceContent}>
              <View style={styles.experienceBadge}>
                <Text style={styles.experienceBadgeText}>Instagram</Text>
                <Text style={styles.experienceBadgeDot}>•</Text>
                <Text style={styles.experienceBadgeText}>
                  {experience.views} views
                </Text>
              </View>

              <Text style={styles.experienceTitle}>{experience.title}</Text>
              <Text style={styles.experienceSubtitle}>
                {experience.subtitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* VIDEO MODAL */}
      <ExperienceVideoModal
        visible={open}
        onClose={() => setOpen(false)}
        videoUrl={experience.videoUrl}
      />
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.textPrimary,
    letterSpacing: 0.2,
  },
  sectionAction: {
    color: palette.textSecondary,
    fontWeight: "600",
    fontSize: 13,
  },
  gradientButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: palette.goldEnd,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  experienceCard: {
    width: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 12,
  },
  experienceImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  playButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: palette.goldEnd,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  experienceContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  experienceBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  experienceBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: palette.textSecondary,
  },
  experienceBadgeDot: {
    fontSize: 10,
    fontWeight: "600",
    color: palette.textSecondary,
    marginHorizontal: 4,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.textPrimary,
    marginBottom: 4,
  },
  experienceSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: palette.textSecondary,
  },
});

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Play } from "lucide-react-native";
import AppHeader from "../layout/AppHeader";
import { ExperienceVideoModal } from "./ExperienceVideoModal";
import { SectionHeader } from "../guest/GuestHomeSections";
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "../../constants/colors";

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

            <View style={styles.imageOverlay} />

            <View style={styles.playButton}>
              <View style={styles.playButtonInner}>
                <Play size={18} color={textColors.onDark} />
              </View>
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
    color: textColors.heading,
    letterSpacing: 0.2,
  },
  sectionAction: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  experienceCard: {
    width: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: palette.brand.primary,
    marginBottom: 12,
  },
  experienceImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    backgroundColor: palette.brand.primary,
    shadowColor: palette.ui.shadow,
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
    color: textColors.onDark,
  },
  experienceBadgeDot: {
    fontSize: 10,
    fontWeight: "600",
    color: textColors.onDark,
    marginHorizontal: 4,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.onDark,
    marginBottom: 4,
  },
  experienceSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: textColors.onDark,
  },
});

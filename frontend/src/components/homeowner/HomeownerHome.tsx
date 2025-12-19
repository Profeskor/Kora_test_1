import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import HomeownerDashboard from "./HomeownerDashboard";
import {
  GoldDivider,
  PropertyCarousel,
  TopPicksRow,
} from "../guest/GuestHomeSections";
import { ExperienceCenterCard } from "../common/ExperienceCenter";
import { Property } from "@/src/types";

interface HomeownerHomeProps {
  userName: string;
}

const defaultContent = {
  properties: [
    {
      id: "PROP-001",
      title: "IL Vento Residences",
      location: "Dubai Maritime City",
      price: "AED 815K",
      beds: 3,
      baths: 3,
      area: "1,881 sqft",
      badge: "New Launch",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716", // Dubai waterfront towers
    },
    {
      id: "PROP-003",
      title: "La Marina Heights",
      location: "Dubai Marina Walk",
      price: "AED 579K",
      beds: 3,
      baths: 3,
      area: "1,894 sqft",
      badge: "Popular",
      image:
        "https://images.pexels.com/photos/34378029/pexels-photo-34378029.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200", // Dubai Marina skyline
    },
    {
      id: "PROP-005",
      title: "Azure Bay Residences",
      location: "Downtown Dubai",
      price: "AED 626K",
      beds: 3,
      baths: 3,
      area: "1,883 sqft",
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", // Downtown Dubai luxury towers
    },
  ],
  experience: {
    id: "xp-1",
    title: "Tour of IL Vento Residences",
    subtitle: "Explore premium waterfront living in Dubai Maritime City.",
    views: "12.5K",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", // Luxury Dubai interior / lifestyle
  },
};

export default function HomeownerHome({ userName }: HomeownerHomeProps) {
  const router = useRouter();

  const goToProperties = () => router.push("/(main)/properties");
  const goToProperty = (property: Property) =>
    router.push(`/unit-selection?propertyId=${property.id}`);
  // router.push(`/property/${property.id}?unitId=${property.units?.[0]?.id}`);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Homeowner Dashboard - replaces banner carousel */}
      <HomeownerDashboard userName={userName} />

      <GoldDivider />

      {/* Properties Section */}
      <View style={styles.section}>
        <PropertyCarousel
          title="Explore Properties"
          properties={defaultContent.properties}
          actionLabel="View All"
          onPressAction={goToProperties}
          onPressItem={goToProperty}
        />
      </View>

      {/* Experience Section */}
      {defaultContent.experience && (
        <View style={styles.section}>
          <ExperienceCenterCard
            experience={{ ...defaultContent.experience, videoUrl: "" }}
          />
        </View>
      )}

      {/* Top Picks Section */}
      <View style={styles.section}>
        <TopPicksRow
          properties={defaultContent.properties.slice(0, 3)}
          onPressItem={goToProperty}
          onPressAction={goToProperties}
        />
      </View>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F6F7FB",
  },
  section: {
    paddingHorizontal: 18,
  },
  footerSpacing: {
    height: 32,
  },
});

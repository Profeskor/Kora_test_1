import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import {
  BannerCarousel,
  EliteAccessCard,
  FilterRow,
  GoldDivider,
  PropertyCarousel,
  StatsRow,
  TopPicksRow,
} from "../guest/GuestHomeSections";
import { Building2, Crown, Home, MapPin } from "lucide-react-native";
import StaticAccessCard from "../broker/AccessCard";
import { ExperienceCenterCard } from "../common/ExperienceCenter";
import { Property } from "@/src/types";
import { palette, backgrounds } from "../../constants/colors";

type HomeContent = {
  banners?: {
    id: string;
    tag: string;
    title: string;
    subtitle: string;
    image: string;
    cta: string;
  }[];
  filters?: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  stats?: {
    id: string;
    label: string;
    value: string;
    delta?: string;
  }[];
  properties?: {
    id: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    badge?: string;
    image: string;
  }[];
  experience?: {
    id: string;
    title: string;
    subtitle: string;
    views: string;
    image: string;
  };
};

export type HomePageProps = {
  userName: string;
  role?: "guest" | "broker" | "buyer" | "homeowner";
  showFilters?: boolean;
  showMembership?: boolean;
  showStats?: boolean;
  showProperties?: boolean;
  showExperience?: boolean;
  showTopPicks?: boolean;
  content?: HomeContent;
};

const defaultContent: Required<HomeContent> = {
  banners: [
    {
      id: "1",
      tag: "Latest Launch",
      title: "Avelia at The Valley",
      subtitle:
        "A home designed to quiet the mind's noise, where mornings feel cinematic.",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
      cta: "View Details",
    },
    {
      id: "2",
      tag: "Waterfront Living",
      title: "Marina Heights Penthouse",
      subtitle:
        "Glass-edge pool, skyline views, and a private marina concierge.",
      image:
        "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1200",
      cta: "Book a Tour",
    },
    {
      id: "3",
      tag: "Exclusive Offer",
      title: "Bay East Residences",
      subtitle:
        "Modern calm interiors with curated amenities and golden sunsets.",
      image:
        "https://images.unsplash.com/photo-1515260268569-9271009adfdb?q=80&w=1200",
      cta: "Explore Now",
    },
  ],
  filters: [
    {
      id: "ilvento",
      label: "IL Vento",
      icon: <Building2 size={16} color={palette.base.white} />,
    },
    {
      id: "marina",
      label: "Dubai Marina",
      icon: <MapPin size={16} color={palette.base.white} />,
    },
    {
      id: "downtown",
      label: "Downtown",
      icon: <Crown size={16} color={palette.base.white} />,
    },
    {
      id: "studio",
      label: "Studio",
      icon: <Home size={16} color={palette.base.white} />,
    },
    {
      id: "3bed",
      label: "3 Bedrooms",
      icon: <Home size={16} color={palette.base.white} />,
    },
  ],
  stats: [
    { id: "leads", label: "Active Leads", value: "17", delta: "+4 this week" },
    { id: "bookings", label: "Bookings", value: "10", delta: "2 pending" },
  ],
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
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
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
        "https://images.pexels.com/photos/34378029/pexels-photo-34378029.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200",
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
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },
  ],
  experience: {
    id: "xp-1",
    title: "Tour of IL Vento Residences",
    subtitle: "Explore premium waterfront living in Dubai Maritime City.",
    views: "12.5K",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
  },
};

export default function HomePage({
  userName,
  role = "guest",
  showFilters = true,
  showMembership = true,
  showStats = false,
  showProperties = true,
  showExperience = true,
  showTopPicks = true,
  content = {},
}: HomePageProps) {
  const router = useRouter();
  const data = {
    banners: content.banners ?? defaultContent.banners,
    filters: content.filters ?? defaultContent.filters,
    stats: content.stats ?? defaultContent.stats,
    properties: content.properties ?? defaultContent.properties,
    experience: content.experience ?? defaultContent.experience,
  };
  const [showCardModal, setShowCardModal] = useState(false);

  const goToProperties = () => router.push("/(main)/properties");
  const goToProperty = (property: Property) =>
    router.push(`/unit-selection?propertyId=${property.id}`);
  // // bypass the unit selection for brokers - go directly to property details
  // router.push(`/property/${property.id}?unitId=${property.id}`);

  const handleFilterPillPress = (filterId: string) => {
    // Map filter IDs to search parameters - using actual project names from data
    const filterMap: Record<
      string,
      {
        query?: string;
        community?: string;
        category?: string;
        bedrooms?: string;
      }
    > = {
      ilvento: { community: "IL Vento" },
      marina: { community: "Dubai Marina Community" },
      downtown: { community: "Downtown Community" },
      studio: { bedrooms: "0" },
      "3bed": { bedrooms: "3" },
    };

    const filter = filterMap[filterId] || {};
    const params = new URLSearchParams();

    if (filter.query) {
      params.set("q", filter.query);
    }
    if (filter.community) {
      params.set("community", filter.community);
    }
    if (filter.category) {
      params.set("category", filter.category);
    }
    if (filter.bedrooms) {
      params.set("bedrooms", filter.bedrooms);
    }

    router.push(`/(main)/properties?${params.toString()}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <View style={styles.kickerRow} />
        </View>
        <View style={styles.headerText}>
          <View style={styles.kickerSpacer} />
        </View>
      </View>

      {showFilters && (
        <FilterRow
          filters={data.filters}
          onFilterPress={goToProperties}
          onPillPress={handleFilterPillPress}
        />
      )}

      <BannerCarousel
        items={data.banners}
        onPressCTA={(item) => goToProperties()}
      />

      {showMembership && (
        <View style={styles.sectionSpacer}>
          <Pressable
            disabled={role !== "broker"}
            onPress={() => setShowCardModal(true)}
            style={({ pressed }) => [
              pressed && role === "broker" && { opacity: 0.9 },
            ]}
          >
            <EliteAccessCard
              userName={userName}
              status={role === "homeowner" ? "Owner Member" : "Broker Member"}
              memberSince="2022"
            />
          </Pressable>
        </View>
      )}

      {showStats && (
        <Pressable
          onPress={() => {
            router.push("/(main)/bookings");
          }}
        >
          <StatsRow stats={data.stats} />
        </Pressable>
      )}

      <GoldDivider />

      {showProperties && (
        <PropertyCarousel
          title="Explore Properties"
          properties={data.properties}
          actionLabel="View All"
          onPressAction={goToProperties}
          onPressItem={goToProperty}
        />
      )}

      {showExperience && data.experience && (
        <ExperienceCenterCard
          experience={{
            ...data.experience,
            videoUrl: "https://www.youtube.com/watch?v=QH2_TGUlwu4",
          }}
        />
      )}

      {showTopPicks && (
        <TopPicksRow
          properties={data.properties.slice(0, 3)}
          onPressItem={goToProperty}
          onPressAction={goToProperties}
        />
      )}

      <View style={styles.footerSpacing} />

      <Modal
        visible={showCardModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCardModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowCardModal(false)}
          />

          <View style={styles.modalContent}>
            <StaticAccessCard
              name={userName}
              memberSince="2022"
              role={role === "homeowner" ? "Owner Member" : "Broker Member"}
              tier="Gold"
              memberID="KORA-2048"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 36,
    backgroundColor: backgrounds.subtle,
    gap: 14,
  },
  header: {
    gap: 6,
    marginBottom: 4,
  },
  kickerRow: {
    height: 0,
  },
  headerText: {
    gap: 2,
  },
  kickerSpacer: {
    height: 0,
  },
  sectionSpacer: {
    marginTop: 6,
    marginBottom: 4,
  },
  footerSpacing: {
    height: 32,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
  },
});

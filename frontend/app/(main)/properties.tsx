import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertySearch from "../../src/components/broker/PropertySearch";
import { backgrounds } from "@/src/constants/colors";

export default function PropertiesScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: backgrounds.subtle }}
      edges={[]}
    >
      <PropertySearch />
    </SafeAreaView>
  );
}

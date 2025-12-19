import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertySearch from "../../src/components/broker/PropertySearch";

export default function PropertiesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }} edges={[]}>
      <PropertySearch />
    </SafeAreaView>
  );
}

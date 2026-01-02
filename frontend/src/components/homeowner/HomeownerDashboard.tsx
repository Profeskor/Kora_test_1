import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { backgrounds } from "../../constants/colors";
import HomeownerPaymentCard, {
  PaymentSchedule,
  PropertyInfo,
} from "./HomeownerPaymentCard";
import MyPropertiesCard, { OwnedProperty } from "./MyPropertiesCard";

interface HomeownerDashboardProps {
  userName: string;
}

export default function HomeownerDashboard({
  userName,
}: HomeownerDashboardProps) {
  const router = useRouter();

  // Dynamic date calculation - no hardcoded months/years
  // In a real app, this would come from API/store
  const payments: PaymentSchedule[] = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Generate sample payments relative to current date
    // This demonstrates the card's flexibility with dynamic data
    const generatedPayments: PaymentSchedule[] = [];

    // Past payments (3 months back) - marked as paid
    for (let i = 3; i >= 1; i--) {
      let month = currentMonth - i;
      let year = currentYear;
      while (month < 0) {
        month += 12;
        year -= 1;
      }
      generatedPayments.push({
        id: `payment-past-${i}`,
        month,
        year,
        amount: 15000,
        currency: "AED",
        scheduledDate: new Date(year, month, 1),
        status: "paid",
      });
    }

    // Current month - due
    generatedPayments.push({
      id: "payment-current",
      month: currentMonth,
      year: currentYear,
      amount: 15000,
      currency: "AED",
      scheduledDate: new Date(currentYear, currentMonth, 1),
      status: "due",
    });

    // Future payments (3 months ahead) - upcoming
    for (let i = 1; i <= 3; i++) {
      let month = currentMonth + i;
      let year = currentYear;
      while (month > 11) {
        month -= 12;
        year += 1;
      }
      generatedPayments.push({
        id: `payment-future-${i}`,
        month,
        year,
        amount: 15000,
        currency: "AED",
        scheduledDate: new Date(year, month, 1),
        status: "upcoming",
      });
    }

    return generatedPayments;
  }, []);

  const property: PropertyInfo = useMemo(
    () => ({
      id: "PROP-001",
      name: "Marina Heights",
      unitNumber: "Unit 1205",
    }),
    []
  );

  // Owned properties data - in a real app, this would come from API/store
  // Using realistic mock data for development preview
  const ownedProperties: OwnedProperty[] = useMemo(
    () => [
      {
        id: "PROP-001",
        name: "Marina Heights",
        unitNumber: "Unit 1205",
        unitType: "2 Bed Apartment",
        status: "occupied",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop",
      },
      {
        id: "PROP-002",
        name: "Il Vento Residences",
        unitNumber: "Unit 804",
        unitType: "3 Bed Villa",
        status: "vacant",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=200&fit=crop",
      },
    ],
    []
  );

  const handlePayNow = (payment: PaymentSchedule) => {
    // Navigate to quick-pay with payment context
    router.push("/quick-pay");
  };

  const handlePropertyPress = (property: OwnedProperty) => {
    // Navigate to property detail
    router.push("/my-properties");
  };

  return (
    <View style={styles.container}>
      {/* Homeowner Payment Card - New Premium Design */}
      <HomeownerPaymentCard
        payments={payments}
        property={property}
        onPayNow={handlePayNow}
        monthsToShow={5}
      />

      {/* My Properties Card - New Design */}
      <MyPropertiesCard
        properties={ownedProperties}
        collapsedLimit={2}
        onPropertyPress={handlePropertyPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: backgrounds.subtle,
    gap: 16,
  },
});

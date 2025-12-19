import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import GuestGuard from "../../../src/components/guest/GuestGuard";
import BrokerDealFile from "../../../src/components/booking/BrokerDealFile";
import BuyerJourneyView from "../../../src/components/booking/BuyerJourneyView";
import { useUserStore } from "../../../src/store/userStore";

export default function BookingDetailScreen() {
  const { id, source, propertyId } = useLocalSearchParams<{
    id: string;
    source?: string; // 'property' | 'list' - where we came from
    propertyId?: string; // property ID if coming from property page
  }>();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const role = user?.currentRole || "guest";

  const handleBack = () => {
    // If we came from property page (after creating booking), go back to property
    if (source === "property" && propertyId) {
      router.replace(`/property/${propertyId}`);
      return;
    }

    // Otherwise, go to bookings list (not back, to avoid going to home)
    router.replace("/(main)/bookings");
  };

  const handleSwitchProperty = (bookingId: string) => {
    router.replace(`/(main)/bookings/${bookingId}`);
  };

  const handleBookingSelect = (bookingId: string) => {
    router.replace(`/(main)/bookings/${bookingId}`);
  };

  if (!id) {
    return null;
  }

  const content = (
    <>
      {role === "broker" ? (
        <BrokerDealFile
          bookingId={id}
          onBack={handleBack}
          onBookingSelect={handleBookingSelect}
        />
      ) : role === "buyer" || role === "homeowner" ? (
        <BuyerJourneyView
          bookingId={id}
          onBack={handleBack}
          onSwitchProperty={handleSwitchProperty}
        />
      ) : (
        <GuestGuard>
          <></>
        </GuestGuard>
      )}
    </>
  );

  return content;
}

import React, { useState } from "react";
import { useRouter } from "expo-router";
import GuestGuard from "../../src/components/guest/GuestGuard";
import BrokerPipeline from "../../src/components/booking/BrokerPipeline";
import BuyerPortfolio from "../../src/components/booking/BuyerPortfolio";
import { useUserStore } from "../../src/store/userStore";

export default function BookingsScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const role = user?.currentRole || "guest";

  const content = (
    <>
      {role === "broker" ? (
        <BrokerPipeline
          onBookingSelect={(bookingId: string) => {
            router.push(`/(main)/bookings/${bookingId}`);
          }}
        />
      ) : role === "buyer" || role === "homeowner" ? (
        <BuyerPortfolio
          onBookingSelect={(bookingId: string) => {
            router.push(`/(main)/bookings/${bookingId}`);
          }}
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

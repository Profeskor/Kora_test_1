import React from "react";
import HomePage from "../home/HomePage";

interface GuestHomeProps {
  userName?: string;
}

export default function GuestHome({ userName = "Guest" }: GuestHomeProps) {
  return (
    <HomePage
      userName={userName}
      role="guest"
      showMembership={false}
      showStats={false}
    />
  );
}

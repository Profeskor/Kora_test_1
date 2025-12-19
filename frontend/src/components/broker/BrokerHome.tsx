import React from "react";
import HomePage from "../home/HomePage";

export default function BrokerHome({ userName }: { userName: string }) {
  return (
    <HomePage
      userName={userName}
      role="broker"
      showMembership
      showStats={true}
      showTopPicks
      showProperties
      showExperience
    />
  );
}

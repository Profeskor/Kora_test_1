import React from "react";
import { StyleSheet } from "react-native";
import { useUserStore } from "../../src/store/userStore";
import BrokerHome from "../../src/components/broker/BrokerHome";
import BuyerHome from "../../src/components/buyer/BuyerHome";
import HomeownerHome from "../../src/components/homeowner/HomeownerHome";
import GuestHome from "../../src/components/guest/GuestHome";

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const role = user?.currentRole || "guest";
  const userName = user?.name || "Guest";

  return (
    <React.Fragment>
      {role === "broker" && <BrokerHome userName={userName} />}
      {role === "buyer" && <BuyerHome userName={userName} />}
      {role === "homeowner" && <HomeownerHome userName={userName} />}
      {role === "guest" && <GuestHome userName={userName} />}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});

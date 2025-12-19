import React from "react";
import SignInRequired from "./SignInRequired";
import { useUserStore } from "../../store/userStore";

interface Props {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const role = useUserStore((state) => state.user?.currentRole || "guest");

  if (role === "guest") {
    return <SignInRequired feature={""} />;
  }

  return <>{children}</>;
}

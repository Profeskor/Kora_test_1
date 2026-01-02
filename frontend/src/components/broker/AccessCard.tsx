import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { palette, textColors, borders, shadows } from "../../constants/colors";

export default function StaticAccessCard({
  name,
  tier,
  memberSince,
  role,
  memberID,
}: {
  name: string;
  tier: string;
  memberSince: string;
  role: string;
  memberID: string;
}) {
  return (
    <View style={styles.card}>
      {/* LEFT SIDE — TEXT */}
      <View style={styles.left}>
        <Text style={styles.tier} maxFontSizeMultiplier={1.3}>
          {tier}
        </Text>

        <Text style={styles.name} maxFontSizeMultiplier={1.4} numberOfLines={2}>
          {name}
        </Text>

        <Text style={styles.meta} maxFontSizeMultiplier={1.4}>
          Member since {memberSince}
        </Text>

        <Text style={styles.meta} maxFontSizeMultiplier={1.4}>
          Role • {role}
        </Text>

        <Text style={styles.meta} maxFontSizeMultiplier={1.4}>
          Member ID • {memberID}
        </Text>
      </View>

      {/* RIGHT SIDE — QR */}
      <View style={styles.right}>
        <View style={styles.qrFrame}>
          <Image
            source={{
              uri: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=KORA-2048",
            }}
            style={styles.qr}
            contentFit="contain"
          />
        </View>

        <Text style={styles.qrLabel} maxFontSizeMultiplier={1.3}>
          Scan to verify
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: palette.brand.primary,
    // ...shadows.md,
  },

  /* LEFT */
  left: {
    flex: 1,
    padding: 18,
    justifyContent: "center",
    gap: 6,
  },
  tier: {
    // color: palette.accent.,
    fontWeight: "800",
    letterSpacing: 1,
  },
  name: {
    color: textColors.onDark,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },
  meta: {
    color: textColors.onDark,
    fontSize: 13,
    fontWeight: "600",
  },

  /* RIGHT */
  right: {
    flex: 1,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  qrFrame: {
    width: "100%",
    aspectRatio: 1, // ⬅️ makes it always square
    borderRadius: 18,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: borders.default,
    justifyContent: "center",
    alignItems: "center",
  },

  qr: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: palette.base.white,
  },

  qrLabel: {
    marginTop: 10,
    color: textColors.onDark,
    fontSize: 12,
    fontWeight: "700",
  },
});

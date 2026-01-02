import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import {
  ArrowLeft,
  Copy,
  Gift,
  Users,
  Sparkles,
  MessageCircle,
  Mail,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  MoreHorizontal,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "@/src/constants/colors";

const sharePlatforms = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <MessageCircle size={24} color={palette.base.white} />,
    color: palette.status.success,
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail size={24} color={palette.base.white} />,
    color: palette.status.info,
  },
  {
    id: "sms",
    label: "SMS",
    icon: <MessageSquare size={24} color={palette.base.white} />,
    color: palette.brand.secondary,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <Facebook size={24} color={palette.base.white} />,
    color: palette.status.info,
  },
  {
    id: "twitter",
    label: "Twitter",
    icon: <Twitter size={24} color={palette.base.white} />,
    color: palette.status.info,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin size={24} color={palette.base.white} />,
    color: palette.brand.primary,
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: <Send size={24} color={palette.base.white} />,
    color: palette.status.info,
  },
  {
    id: "more",
    label: "More",
    icon: <MoreHorizontal size={24} color={palette.base.white} />,
    color: palette.brand.secondary,
  },
];

const benefits = [
  {
    id: "friends",
    title: "For Your Friends",
    description:
      "They get exclusive welcome bonuses and priority support when signing up with your code.",
    icon: <Users size={24} color={palette.status.success} />,
    iconBg: palette.status.successLight,
  },
  {
    id: "you",
    title: "For You",
    description:
      "Earn reward points for each successful referral, redeemable for premium features.",
    icon: <Gift size={24} color={palette.brand.secondary} />,
    iconBg: backgrounds.subtle,
  },
  {
    id: "unlimited",
    title: "Unlimited Referrals",
    description:
      "No limit on how many friends you can refer. The more you share, the more you earn!",
    icon: <Sparkles size={24} color={palette.brand.primary} />,
    iconBg: palette.status.infoLight,
  },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeading}>
      <View style={styles.sectionDot} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

export default function ShareScreen() {
  const router = useRouter();
  const referralCode = "KORA2025";
  const referralLink = `https://kora.ae/app?ref=${referralCode}`;

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(referralLink);
    Alert.alert("Copied!", "Referral link copied to clipboard");
  };

  const handleShare = async (platform: string) => {
    const message = `Join me on Kora! Use my referral code ${referralCode} to get exclusive benefits. ${referralLink}`;
    const encodedMessage = encodeURIComponent(message);
    const encodedLink = encodeURIComponent(referralLink);

    try {
      switch (platform) {
        case "whatsapp":
          await Linking.openURL(`whatsapp://send?text=${encodedMessage}`);
          break;
        case "email":
          await Linking.openURL(
            `mailto:?subject=Join me on Kora&body=${encodedMessage}`
          );
          break;
        case "sms":
          await Linking.openURL(`sms:?body=${encodedMessage}`);
          break;
        case "facebook":
          await Linking.openURL(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`
          );
          break;
        case "twitter":
          await Linking.openURL(
            `https://twitter.com/intent/tweet?text=${encodedMessage}`
          );
          break;
        case "linkedin":
          await Linking.openURL(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`
          );
          break;
        case "telegram":
          await Linking.openURL(
            `https://t.me/share/url?url=${encodedLink}&text=${encodedMessage}`
          );
          break;
        case "more":
          await Clipboard.setStringAsync(referralLink);
          Alert.alert("Copied!", "Referral link copied to clipboard");
          break;
        default:
          Alert.alert("Share", `Sharing via ${platform}`);
      }
    } catch (error) {
      Alert.alert("Error", "Could not open sharing app");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.hero, { backgroundColor: palette.brand.primary }]}>
        <View style={styles.heroHeader}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            hitSlop={10}
            style={styles.backButton}
          >
            <View style={styles.backCircle}>
              <ArrowLeft size={18} color={palette.brand.primary} />
            </View>
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Share Kora</Text>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <View style={styles.rewardsCard}>
        <View
          style={[
            styles.rewardsGradient,
            { backgroundColor: palette.brand.primary },
          ]}
        >
          <View style={styles.rewardsHeader}>
            <Gift size={24} color={textColors.onDark} />
            <Text style={styles.rewardsTitle}>Referral Rewards</Text>
          </View>
          <Text style={styles.rewardsDescription}>
            Share Kora with friends and earn rewards when they join! Both you
            and your friend get exclusive benefits.
          </Text>
          <Text style={styles.referralLabel}>Your Referral Code</Text>
          <View style={styles.referralCodeBox}>
            <Text style={styles.referralCode}>{referralCode}</Text>
          </View>
        </View>
      </View>

      <Section title="Share Link">
        <View style={styles.linkContainer}>
          <TextInput
            value={referralLink}
            editable={false}
            style={styles.linkInput}
          />
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyLink}
            activeOpacity={0.85}
          >
            <Copy size={18} color={palette.base.white} />
          </TouchableOpacity>
        </View>
      </Section>

      <Section title="Share Via">
        <View style={styles.shareGrid}>
          {sharePlatforms.map((platform) => (
            <TouchableOpacity
              key={platform.id}
              style={styles.shareButton}
              onPress={() => handleShare(platform.id)}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.shareIconCircle,
                  { backgroundColor: platform.color },
                ]}
              >
                {platform.icon}
              </View>
              <Text style={styles.shareLabel}>{platform.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Section>

      <Section title="QR Code">
        <View style={styles.qrContainer}>
          <View style={styles.qrCodeBox}>
            <Image
              source={{
                uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  referralLink
                )}`,
              }}
              style={styles.qrCode}
            />
          </View>
          <Text style={styles.qrTitle}>Scan to Download</Text>
          <Text style={styles.qrDescription}>
            Share this QR code for easy access
          </Text>
        </View>
      </Section>

      <Section title="Referral Benefits">
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit) => (
            <View key={benefit.id} style={styles.benefitCard}>
              <View
                style={[
                  styles.benefitIcon,
                  { backgroundColor: benefit.iconBg },
                ]}
              >
                {benefit.icon}
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>
                  {benefit.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgrounds.subtle,
    paddingBottom: 24,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: textColors.onDark,
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "Marcellus-Regular",
  },
  rewardsCard: {
    marginHorizontal: 18,
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    ...shadows.card,
  },
  rewardsGradient: {
    padding: 20,
    gap: 12,
  },
  rewardsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rewardsTitle: {
    color: textColors.onDark,
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "Marcellus-Regular",
  },
  rewardsDescription: {
    color: textColors.onDark,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  referralLabel: {
    color: textColors.onDark,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 8,
  },
  referralCodeBox: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  referralCode: {
    color: textColors.onDark,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 24,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionDot: {
    width: 3,
    height: 18,
    backgroundColor: palette.brand.secondary,
    borderRadius: 999,
  },
  sectionTitle: {
    color: textColors.secondary,
    fontWeight: "800",
    letterSpacing: 0.3,
    fontFamily: "Marcellus-Regular",
  },
  linkContainer: {
    flexDirection: "row",
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 4,
    ...shadows.card,
    gap: 8,
  },
  linkInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 14,
  },
  copyButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  shareGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  shareButton: {
    width: "22%",
    alignItems: "center",
    gap: 8,
  },
  shareIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  shareIconText: {
    fontSize: 24,
    color: palette.base.white,
  },
  shareLabel: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },
  qrContainer: {
    backgroundColor: backgrounds.card,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    ...shadows.card,
    gap: 12,
  },
  qrCodeBox: {
    width: 200,
    height: 200,
    borderRadius: 12,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: borders.default,
  },
  qrCode: {
    width: 180,
    height: 180,
  },
  qrTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 16,
    marginTop: 8,
    fontFamily: "Marcellus-Regular",
  },
  qrDescription: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitCard: {
    flexDirection: "row",
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 16,
    ...shadows.card,
    gap: 14,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  benefitContent: {
    flex: 1,
    gap: 6,
  },
  benefitTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
    fontFamily: "Marcellus-Regular",
  },
  benefitDescription: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  footerSpacing: {
    height: 16,
  },
});

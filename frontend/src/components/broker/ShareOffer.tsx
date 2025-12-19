import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  Share,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Share2, Copy, X, Check } from "lucide-react-native";

interface ShareOfferProps {
  propertyId: string;
  propertyName: string;
}

export default function ShareOffer({
  propertyId,
  propertyName,
}: ShareOfferProps) {
  const [showModal, setShowModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareLink = `https://kora.ae/property/${propertyId}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this property: ${propertyName}\n${shareLink}`,
        title: propertyName,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error("Error copying link:", error);
      Alert.alert("Error", "Failed to copy link");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
        >
          <Share2 size={20} color="#005B78" />
          <Text style={styles.shareButtonText}>Share The Offer</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Property</Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              <Text style={styles.linkLabel}>Property Link</Text>
              <View style={styles.linkBox}>
                <Text style={styles.linkText} numberOfLines={1}>
                  {shareLink}
                </Text>
                <TouchableOpacity
                  onPress={handleCopyLink}
                  style={styles.copyButton}
                >
                  {linkCopied ? (
                    <Check size={18} color="#10B981" />
                  ) : (
                    <Copy size={18} color="#005B78" />
                  )}
                </TouchableOpacity>
              </View>
              {linkCopied && (
                <Text style={styles.copiedText}>Link copied!</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.shareActionButton}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Share2 size={20} color="white" />
              <Text style={styles.shareActionButtonText}>
                {/* Share via {Platform.OS === "ios" ? "iOS" : "Android"} Share */}
                Share as Link
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareActionButton}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Share2 size={20} color="white" />
              <Text style={styles.shareActionButtonText}>
                {/* Share via {Platform.OS === "ios" ? "iOS" : "Android"} Share */}
                Share as file
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.secondaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#005B78",
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#005B78",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  closeButton: {
    padding: 4,
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  linkBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  copyButton: {
    padding: 4,
  },
  copiedText: {
    fontSize: 12,
    color: "#10B981",
    marginTop: 6,
    marginLeft: 14,
  },
  shareActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#005B78",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  shareActionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  secondaryButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
});

import React, { useEffect } from "react";
import { Modal, View, Pressable, StyleSheet } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { X } from "lucide-react-native";

export function ExperienceVideoModal({
  visible,
  onClose,
  videoUrl,
}: {
  visible: boolean;
  onClose: () => void;
  videoUrl: string;
}) {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
  });

  // Play / pause based on modal visibility
  useEffect(() => {
    if (visible) {
      player.play();
    } else {
      player.pause();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.playerContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />

          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  playerContainer: {
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 24,
  },
});

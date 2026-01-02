import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { X, AlertCircle, CheckCircle } from "lucide-react-native";
import { palette } from "../../constants/colors";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "info",
  visible,
  onDismiss,
  duration = 4000,
}: ToastProps) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 8,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      handleDismiss();
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} color={palette.status.success} />;
      case "error":
        return <AlertCircle size={20} color={palette.status.error} />;
      default:
        return <AlertCircle size={20} color={palette.status.info} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return palette.status.successLight;
      case "error":
        return palette.status.errorLight;
      default:
        return palette.status.infoLight;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return palette.status.successDark;
      case "error":
        return palette.status.errorDark;
      default:
        return palette.status.infoDark;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: getBackgroundColor() }]}>
        <View style={styles.content}>
          {getIcon()}
          <Text style={[styles.message, { color: getTextColor() }]}>
            {message}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
          <X size={18} color={getTextColor()} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
});

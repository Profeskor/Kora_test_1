import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Upload, X, FileText } from "lucide-react-native";

interface FileUploadProps {
  label: string;
  file: FileInfo | null;
  onUpload: (file: FileInfo | null) => void;
  required?: boolean;
  error?: string;
  accept?: string[];
}

export interface FileInfo {
  uri: string;
  name: string;
  size: number;
  type: string;
}

export default function FileUpload({
  label,
  file,
  onUpload,
  required,
  error,
  accept = ["application/pdf", "image/jpeg", "image/png"],
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handlePickDocument = async () => {
    try {
      setUploading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: accept,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const fileInfo: FileInfo = {
          uri: asset.uri,
          name: asset.name || "document",
          size: asset.size || 0,
          type: asset.mimeType || "application/pdf",
        };

        // Check file size (max 5MB)
        if (fileInfo.size > 5 * 1024 * 1024) {
          Alert.alert(
            "File too large",
            "Please select a file smaller than 5MB"
          );
          setUploading(false);
          return;
        }

        onUpload(fileInfo);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to pick document");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    Alert.alert("Remove file", "Are you sure you want to remove this file?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => onUpload(null),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      {file ? (
        <View style={styles.fileContainer}>
          <View style={styles.fileInfo}>
            <FileText size={20} color="#005B78" />
            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1}>
                {file.name}
              </Text>
              <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <X size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadArea, error && styles.uploadAreaError]}
          onPress={handlePickDocument}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#005B78" />
          ) : (
            <>
              <Upload size={24} color="#9CA3AF" />
              <Text style={styles.uploadText}>Click to upload</Text>
              <Text style={styles.uploadHint}>PDF, JPG, or PNG (Max 5MB)</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  uploadAreaError: {
    borderColor: "#EF4444",
  },
  uploadText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    fontWeight: "500",
  },
  uploadHint: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  fileSize: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});

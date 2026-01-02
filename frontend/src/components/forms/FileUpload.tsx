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
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

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
            <FileText size={20} color={palette.brand.primary} />
            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1}>
                {file.name}
              </Text>
              <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <X size={20} color={palette.status.error} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadArea, error && styles.uploadAreaError]}
          onPress={handlePickDocument}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color={palette.brand.primary} />
          ) : (
            <>
              <Upload size={24} color={textColors.secondary} />
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
    color: textColors.body,
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {
    color: palette.status.error,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: borders.default,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgrounds.subtle,
  },
  uploadAreaError: {
    borderColor: palette.status.error,
  },
  uploadText: {
    fontSize: 14,
    color: textColors.secondary,
    marginTop: 8,
    fontWeight: "500",
  },
  uploadHint: {
    fontSize: 12,
    color: textColors.secondary,
    marginTop: 4,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.default,
    backgroundColor: backgrounds.card,
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
    color: textColors.heading,
    fontWeight: "500",
  },
  fileSize: {
    fontSize: 12,
    color: textColors.secondary,
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: palette.status.error,
    marginTop: 4,
  },
});

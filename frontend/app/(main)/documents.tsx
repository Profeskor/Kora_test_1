import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import * as DocumentPicker from "expo-document-picker";
import {
  ArrowLeft,
  ShieldCheck,
  Clock3,
  Download,
  Eye,
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  FileText,
  CreditCard,
  BookOpen,
  Clipboard,
  Building2,
  FileCheck,
  File,
  Upload,
} from "lucide-react-native";

type DocStatus = "verified" | "pending" | "under_review" | "rejected";

type DocumentItem = {
  id: string;
  title: string;
  uploadedOn: string;
  expiresOn?: string;
  verifiedOn?: string;
  status: DocStatus;
  reason?: string;
};

const statusMeta: Record<
  DocStatus,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  verified: {
    label: "Verified",
    color: "#0F9B6C",
    bg: "#E6F6EF",
    icon: <CheckCircle2 size={16} color="#0F9B6C" />,
  },
  pending: {
    label: "Pending",
    color: "#C67A00",
    bg: "#FFF5E5",
    icon: <Clock3 size={16} color="#C67A00" />,
  },
  under_review: {
    label: "Under Review",
    color: "#C67A00",
    bg: "#FFF5E5",
    icon: <Clock3 size={16} color="#C67A00" />,
  },
  rejected: {
    label: "Rejected",
    color: "#D14343",
    bg: "#FDE8E8",
    icon: <XCircle size={16} color="#D14343" />,
  },
};

type DocumentType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export default function DocumentsScreen() {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(
    null
  );
  const [pickedFileName, setPickedFileName] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updateDocTitle, setUpdateDocTitle] = useState<string | null>(null);

  const documentTypes: DocumentType[] = [
    {
      id: "emirates-id",
      label: "Emirates ID",
      icon: <CreditCard size={20} color="#0D1B2A" />,
    },
    {
      id: "passport",
      label: "Passport",
      icon: <BookOpen size={20} color="#0D1B2A" />,
    },
    {
      id: "residence-visa",
      label: "Residence Visa",
      icon: <Clipboard size={20} color="#0D1B2A" />,
    },
    {
      id: "bank-statement",
      label: "Bank Statement",
      icon: <Building2 size={20} color="#0D1B2A" />,
    },
    {
      id: "pre-approval",
      label: "Pre-Approval Letter",
      icon: <FileCheck size={20} color="#0F9B6C" />,
    },
    {
      id: "other",
      label: "Other Document",
      icon: <File size={20} color="#0D1B2A" />,
    },
  ];

  const documents: DocumentItem[] = useMemo(
    () => [
      {
        id: "emirates-id",
        title: "Emirates ID",
        uploadedOn: "Nov 15, 2024",
        expiresOn: "Nov 14, 2026",
        verifiedOn: "Nov 16, 2024",
        status: "verified",
      },
      {
        id: "passport",
        title: "Passport",
        uploadedOn: "Nov 15, 2024",
        expiresOn: "May 20, 2029",
        verifiedOn: "Nov 16, 2024",
        status: "verified",
      },
      {
        id: "visa",
        title: "UAE Residence Visa",
        uploadedOn: "Dec 10, 2025",
        expiresOn: "Aug 30, 2026",
        status: "under_review",
      },
      {
        id: "bank-statement",
        title: "Bank Statement (Nov 2024)",
        uploadedOn: "Dec 8, 2024",
        status: "rejected",
        reason:
          "Document is older than 3 months. Please upload a recent statement.",
      },
    ],
    []
  );

  const verifiedCount = documents.filter((d) => d.status === "verified").length;
  const pendingCount = documents.filter(
    (d) => d.status === "pending" || d.status === "under_review"
  ).length;

  const handleDownload = async (docTitle: string) => {
    const sample =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    try {
      await Linking.openURL(sample);
    } catch {
      Alert.alert("Download failed", `Could not download ${docTitle}`);
    }
  };

  const handleUpdate = (docTitle: string) => {
    setUpdateDocTitle(docTitle);
    setPickedFileName(null);
    setShowUploadModal(true);
  };

  const renderMeta = (
    label: string,
    value: string,
    icon?: React.ReactNode,
    muted?: boolean
  ) => (
    <View style={styles.metaRow}>
      {icon}
      <Text style={[styles.metaLabel, muted && styles.metaMuted]}>{label}</Text>
      <Text style={[styles.metaValue, muted && styles.metaMuted]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#0C7489", "#0B5B78"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            style={styles.backBtn}
            hitSlop={10}
          >
            <ArrowLeft size={20} color="#0C7489" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Documents</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <ShieldCheck size={18} color="#0F9B6C" />
            </View>
            <Text style={styles.statLabel}>Verified</Text>
            <Text style={styles.statValue}>{verifiedCount}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "#FFF5E5" }]}>
              <Clock3 size={18} color="#C67A00" />
            </View>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Info size={16} color="#0C7489" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.infoTitle}>Why verify documents?</Text>
          <Text style={styles.infoBody}>
            Verified documents help speed up property transactions and ensure
            compliance with UAE regulations.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Your Documents</Text>

      <View style={styles.cardsStack}>
        {documents.map((doc) => {
          const meta = statusMeta[doc.status];
          return (
            <View
              key={doc.id}
              style={[
                styles.docCard,
                doc.status === "rejected" && { borderColor: "#FBD5D5" },
              ]}
            >
              <View style={styles.docHeader}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                {meta.icon}
              </View>
              <Text style={styles.docUploaded}>Uploaded {doc.uploadedOn}</Text>
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: meta.bg, borderColor: meta.bg },
                ]}
              >
                <Text style={[styles.statusText, { color: meta.color }]}>
                  {meta.label}
                </Text>
              </View>

              {doc.expiresOn
                ? renderMeta(
                    "Expires:",
                    doc.expiresOn,
                    <Clock3 size={16} color="#6B7280" />,
                    true
                  )
                : null}
              {doc.verifiedOn && doc.status === "verified"
                ? renderMeta(
                    "Verified on",
                    doc.verifiedOn,
                    <CheckCircle2 size={16} color="#0F9B6C" />
                  )
                : null}

              {doc.status === "rejected" && doc.reason ? (
                <View style={styles.reasonBox}>
                  <View style={styles.reasonHeader}>
                    <AlertTriangle size={16} color="#D14343" />
                    <Text style={styles.reasonTitle}>Rejected</Text>
                  </View>
                  <Text style={styles.reasonText}>{doc.reason}</Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.linkText}>Upload New Document</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionGhost}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDoc(doc)}
                >
                  <Eye size={16} color="#0D1B2A" />
                  <Text style={styles.actionGhostText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionPrimary}
                  activeOpacity={0.85}
                  onPress={() => handleDownload(doc.title)}
                >
                  <Download size={16} color="#fff" />
                  <Text style={styles.actionPrimaryText}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionPrimary}
                  activeOpacity={0.85}
                  onPress={() => handleUpdate(doc.title)}
                >
                  <Upload size={16} color="#fff" />
                  <Text style={styles.actionPrimaryText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Need to verify a new document?</Text>
        <Text style={styles.ctaBody}>
          Request document verification for property purchases, visa
          applications, and more.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.9}
          onPress={() => setShowRequestModal(true)}
        >
          <Text style={styles.ctaButtonText}>+ Request New Verification</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 32 }} />

      <Modal
        visible={!!selectedDoc}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedDoc(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedDoc?.title}</Text>
              <TouchableOpacity
                onPress={() => setSelectedDoc(null)}
                style={styles.modalClose}
                hitSlop={10}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalPreview}>
              <View style={styles.modalPreviewIconWrap}>
                <FileText size={42} color="#828A96" />
              </View>
              <Text style={styles.modalPreviewTitle}>Document Preview</Text>
              <Text style={styles.modalPreviewSubtitle}>
                {selectedDoc?.title}
              </Text>
            </View>

            <View style={styles.modalMetaSection}>
              <View style={styles.modalMetaRow}>
                <Text style={styles.modalMetaLabel}>Status</Text>
                {selectedDoc ? (
                  <View
                    style={[
                      styles.modalStatusPill,
                      {
                        backgroundColor: statusMeta[selectedDoc.status].bg,
                        borderColor: statusMeta[selectedDoc.status].bg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalStatusText,
                        { color: statusMeta[selectedDoc.status].color },
                      ]}
                    >
                      {statusMeta[selectedDoc.status].label}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.modalMetaRow}>
                <Text style={styles.modalMetaLabel}>Uploaded</Text>
                <Text style={styles.modalMetaValue}>
                  {selectedDoc?.uploadedOn || "—"}
                </Text>
              </View>
              <View style={styles.modalMetaRow}>
                <Text style={styles.modalMetaLabel}>Expires</Text>
                <Text style={styles.modalMetaValue}>
                  {selectedDoc?.expiresOn || "—"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalDownload}
              activeOpacity={0.9}
              onPress={() => {
                if (selectedDoc) {
                  handleDownload(selectedDoc.title);
                }
              }}
            >
              <Download size={18} color="#fff" />
              <Text style={styles.modalDownloadText}>Download Document</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showRequestModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowRequestModal(false)}
          />
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetTitle}>
                Request Document Verification
              </Text>
              <Text style={styles.bottomSheetSubtitle}>
                Select the type of document you&apos;d like to upload for
                verification.
              </Text>

              <View style={styles.documentTypesList}>
                {documentTypes.map((docType) => (
                  <TouchableOpacity
                    key={docType.id}
                    style={styles.documentTypeItem}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedDocType(docType);
                      setPickedFileName(null);
                      setShowRequestModal(false);
                      setShowUploadModal(true);
                    }}
                  >
                    <View style={styles.documentTypeIcon}>{docType.icon}</View>
                    <Text style={styles.documentTypeLabel}>
                      {docType.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.bottomSheetCancel}
                activeOpacity={0.8}
                onPress={() => setShowRequestModal(false)}
              >
                <Text style={styles.bottomSheetCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Upload flow modal */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.uploadCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedDocType?.label || updateDocTitle || "Upload Document"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowUploadModal(false);
                  setSelectedDocType(null);
                  setUpdateDocTitle(null);
                  setPickedFileName(null);
                }}
                style={styles.modalClose}
                hitSlop={10}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.uploadSubtitle}>
              Select a file from your device to upload for verification.
            </Text>

            {/* File Upload Area */}
            <TouchableOpacity
              style={[
                styles.uploadArea,
                pickedFileName && styles.uploadAreaSelected,
              ]}
              activeOpacity={0.85}
              onPress={async () => {
                try {
                  setUploading(true);
                  const res = await DocumentPicker.getDocumentAsync({
                    type: ["application/pdf", "image/jpeg", "image/png"],
                    copyToCacheDirectory: true,
                  });
                  if (!res.canceled && res.assets && res.assets[0]) {
                    setPickedFileName(res.assets[0].name || "Selected file");
                  }
                } catch (err) {
                  console.warn("File selection failed", err);
                  Alert.alert("File selection failed", "Please try again.");
                } finally {
                  setUploading(false);
                }
              }}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#0B5B78" />
              ) : pickedFileName ? (
                <>
                  <View style={styles.fileSelectedIcon}>
                    <FileText size={24} color="#0B5B78" />
                  </View>
                  <Text style={styles.fileSelectedName} numberOfLines={1}>
                    {pickedFileName}
                  </Text>
                  <Text style={styles.uploadHintSelected}>
                    Tap to change file
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.uploadIconWrap}>
                    <Upload size={28} color="#6B7280" />
                  </View>
                  <Text style={styles.uploadAreaTitle}>Tap to upload</Text>
                  <Text style={styles.uploadAreaHint}>
                    PDF, JPG, or PNG (Max 5MB)
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.uploadActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={() => {
                  setShowUploadModal(false);
                  setSelectedDocType(null);
                  setUpdateDocTitle(null);
                  setPickedFileName(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !pickedFileName && styles.submitButtonDisabled,
                ]}
                activeOpacity={pickedFileName ? 0.9 : 1}
                onPress={() => {
                  if (!pickedFileName) {
                    Alert.alert(
                      "Select a file",
                      "Please choose a file to upload."
                    );
                    return;
                  }
                  setShowUploadModal(false);
                  setShowSuccessModal(true);
                }}
              >
                <Upload size={18} color="#fff" />
                <Text style={styles.submitButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success modal */}
      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconWrap}>
              <CheckCircle2 size={48} color="#0F9B6C" />
            </View>
            <Text style={styles.successTitle}>Document Uploaded!</Text>
            <Text style={styles.successBody}>
              Your document is now under review. We&apos;ll notify you once the
              verification is complete.
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              activeOpacity={0.9}
              onPress={() => {
                setShowSuccessModal(false);
                setSelectedDocType(null);
                setUpdateDocTitle(null);
                setPickedFileName(null);
              }}
            >
              <Text style={styles.successButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: "#F6F7FB",
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 18,
    paddingBottom: 20,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: "#0f172a",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E7F4F9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    gap: 6,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E6F6EF",
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    color: "#E2ECF4",
    fontWeight: "700",
    fontSize: 13,
  },
  statValue: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 24,
  },
  infoCard: {
    marginTop: 16,
    marginHorizontal: 18,
    backgroundColor: "#EDF5FF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    gap: 10,
  },
  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#D9ECF7",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    color: "#0C7489",
    fontWeight: "800",
    fontSize: 14,
  },
  infoBody: {
    color: "#2D3748",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 17,
  },
  sectionLabel: {
    marginTop: 16,
    marginHorizontal: 18,
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 16,
  },
  cardsStack: {
    marginTop: 10,
    gap: 12,
    paddingHorizontal: 18,
  },
  docCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  docHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  docTitle: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 15,
  },
  docUploaded: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 8,
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
    borderWidth: 1,
  },
  statusText: {
    fontWeight: "800",
    fontSize: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  metaLabel: {
    color: "#6B7280",
    fontWeight: "700",
    fontSize: 12,
  },
  metaValue: {
    color: "#0D1B2A",
    fontWeight: "700",
    fontSize: 12,
  },
  metaMuted: {
    color: "#9CA3AF",
  },
  reasonBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#FDE8E8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F8B4B4",
    gap: 6,
  },
  reasonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reasonTitle: {
    color: "#D14343",
    fontWeight: "800",
    fontSize: 13,
  },
  reasonText: {
    color: "#8B0000",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 17,
  },
  linkText: {
    color: "#0B5B78",
    fontWeight: "800",
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  actionGhost: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F9FAFB",
  },
  actionGhostText: {
    color: "#0D1B2A",
    fontWeight: "800",
  },
  actionPrimary: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#0B5B78",
    shadowColor: "#0B5B78",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  actionPrimaryText: {
    color: "#fff",
    fontWeight: "800",
  },
  ctaCard: {
    marginTop: 16,
    marginHorizontal: 18,
    backgroundColor: "#0B5B78",
    borderRadius: 16,
    padding: 16,
    gap: 8,
    shadowColor: "#0B5B78",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  ctaTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  ctaBody: {
    color: "#D7E8F2",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  ctaButton: {
    marginTop: 6,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonText: {
    color: "#0B5B78",
    fontWeight: "800",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 18,
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    color: "#4B5563",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22,
  },
  modalPreview: {
    marginTop: 4,
    backgroundColor: "#F3F5F8",
    borderRadius: 16,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  modalPreviewIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: "#ECEFF3",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPreviewTitle: {
    color: "#4B5563",
    fontWeight: "800",
    fontSize: 16,
  },
  modalPreviewSubtitle: {
    color: "#6B7280",
    fontWeight: "700",
    fontSize: 13,
  },
  modalMetaSection: {
    marginTop: 16,
    gap: 10,
  },
  modalMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalMetaLabel: {
    color: "#4B5563",
    fontWeight: "700",
    fontSize: 14,
  },
  modalMetaValue: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 14,
  },
  modalStatusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  modalStatusText: {
    fontWeight: "800",
    fontSize: 12,
  },
  modalDownload: {
    marginTop: 20,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0B5B78",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#0B5B78",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  modalDownloadText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 34,
    shadowColor: "#0f172a",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
  },
  bottomSheetTitle: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  bottomSheetSubtitle: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  documentTypesList: {
    gap: 12,
    marginBottom: 20,
  },
  documentTypeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 14,
  },
  documentTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  documentTypeLabel: {
    color: "#0D1B2A",
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
  },
  bottomSheetCancel: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bottomSheetCancelText: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 16,
  },
  uploadCard: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  uploadSubtitle: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 14,
  },
  filePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#F9FAFB",
    marginBottom: 16,
  },
  filePickerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  filePickerLabel: {
    color: "#0D1B2A",
    fontWeight: "700",
  },
  filePickerHint: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 12,
  },
  filePickerAction: {
    color: "#0B5B78",
    fontWeight: "800",
    fontSize: 13,
  },
  successCard: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    gap: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  successIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E6F6EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  successTitle: {
    color: "#0D1B2A",
    fontWeight: "800",
    fontSize: 20,
    marginTop: 4,
  },
  successBody: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  successButton: {
    marginTop: 16,
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0B5B78",
    alignItems: "center",
    justifyContent: "center",
  },
  successButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  // Upload area styles
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    marginBottom: 20,
    minHeight: 160,
  },
  uploadAreaSelected: {
    borderColor: "#0B5B78",
    borderStyle: "solid",
    backgroundColor: "#E7F4F9",
  },
  uploadIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadAreaTitle: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  uploadAreaHint: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: 13,
  },
  fileSelectedIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#D9ECF7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  fileSelectedName: {
    color: "#0B5B78",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    maxWidth: "80%",
  },
  uploadHintSelected: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 4,
  },
  uploadActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: {
    color: "#4B5563",
    fontWeight: "700",
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0B5B78",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#0B5B78",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  submitButtonDisabled: {
    backgroundColor: "#A7C5D6",
    shadowOpacity: 0,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});

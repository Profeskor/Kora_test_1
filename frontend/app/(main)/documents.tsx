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
  Home,
} from "lucide-react-native";
import { useUserStore } from "@/src/store/userStore";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "@/src/constants/colors";

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
    color: palette.status.success,
    bg: palette.status.successLight,
    icon: <CheckCircle2 size={16} color={palette.status.success} />,
  },
  pending: {
    label: "Pending",
    color: palette.brand.secondary,
    bg: backgrounds.subtle,
    icon: <Clock3 size={16} color={palette.brand.secondary} />,
  },
  under_review: {
    label: "Under Review",
    color: palette.brand.secondary,
    bg: backgrounds.subtle,
    icon: <Clock3 size={16} color={palette.brand.secondary} />,
  },
  rejected: {
    label: "Rejected",
    color: palette.status.error,
    bg: palette.status.errorLight,
    icon: <XCircle size={16} color={palette.status.error} />,
  },
};

type DocumentType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export default function DocumentsScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const role = user?.currentRole;
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(
    null
  );
  const [pickedFileName, setPickedFileName] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [titleDeedFileName, setTitleDeedFileName] = useState<string | null>(
    null
  );
  const [uploadingTitleDeed, setUploadingTitleDeed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updateDocTitle, setUpdateDocTitle] = useState<string | null>(null);

  const baseDocumentTypes: DocumentType[] = [
    {
      id: "emirates-id",
      label: "Emirates ID",
      icon: <CreditCard size={20} color={textColors.heading} />,
    },
    {
      id: "passport",
      label: "Passport",
      icon: <BookOpen size={20} color={textColors.heading} />,
    },
    {
      id: "residence-visa",
      label: "Residence Visa",
      icon: <Clipboard size={20} color={textColors.heading} />,
    },
    {
      id: "bank-statement",
      label: "Bank Statement",
      icon: <Building2 size={20} color={textColors.heading} />,
    },
    {
      id: "pre-approval",
      label: "Pre-Approval Letter",
      icon: <FileCheck size={20} color={palette.status.success} />,
    },
    {
      id: "other",
      label: "Other Document",
      icon: <File size={20} color={textColors.heading} />,
    },
  ];

  // Add Title Deed option only for homeowners (not in onboarding, only in document request)
  const documentTypes: DocumentType[] =
    role === "homeowner"
      ? [
          ...baseDocumentTypes.slice(0, -1), // All except "other"
          {
            id: "title-deed",
            label: "Title Deed",
            icon: <Home size={20} color={palette.brand.primary} />,
          },
          baseDocumentTypes[baseDocumentTypes.length - 1], // "other" at the end
        ]
      : baseDocumentTypes;

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
      <View style={[styles.header, { backgroundColor: palette.brand.primary }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            style={styles.backBtn}
            hitSlop={10}
          >
            <ArrowLeft size={20} color={palette.brand.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Documents</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <ShieldCheck size={18} color={palette.status.success} />
            </View>
            <Text style={styles.statLabel}>Verified</Text>
            <Text style={styles.statValue}>{verifiedCount}</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: backgrounds.subtle },
              ]}
            >
              <Clock3 size={18} color={palette.brand.secondary} />
            </View>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Info size={16} color={palette.brand.secondary} />
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
                doc.status === "rejected" && {
                  borderColor: palette.status.errorLight,
                },
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
                    <Clock3 size={16} color={textColors.secondary} />,
                    true
                  )
                : null}
              {doc.verifiedOn && doc.status === "verified"
                ? renderMeta(
                    "Verified on",
                    doc.verifiedOn,
                    <CheckCircle2 size={16} color={palette.status.success} />
                  )
                : null}

              {doc.status === "rejected" && doc.reason ? (
                <View style={styles.reasonBox}>
                  <View style={styles.reasonHeader}>
                    <AlertTriangle size={16} color={palette.status.error} />
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
                  <Eye size={16} color={textColors.heading} />
                  <Text style={styles.actionGhostText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionPrimary}
                  activeOpacity={0.85}
                  onPress={() => handleDownload(doc.title)}
                >
                  <Download size={16} color={textColors.onDark} />
                  <Text style={styles.actionPrimaryText}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionPrimary}
                  activeOpacity={0.85}
                  onPress={() => handleUpdate(doc.title)}
                >
                  <Upload size={16} color={textColors.onDark} />
                  <Text style={styles.actionPrimaryText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Title Deed Section - Only for Homeowners */}
      {role === "homeowner" && (
        <>
          <Text style={styles.sectionLabel}>Property Documents</Text>
          <View style={styles.titleDeedCard}>
            <View style={styles.titleDeedHeader}>
              <View style={styles.titleDeedIconWrap}>
                <Home size={24} color={palette.brand.primary} />
              </View>
              <View style={styles.titleDeedInfo}>
                <Text style={styles.titleDeedTitle}>Title Deed</Text>
                <Text style={styles.titleDeedSubtitle}>
                  Upload your property ownership document
                </Text>
              </View>
            </View>

            {titleDeedFileName ? (
              <View style={styles.titleDeedUploaded}>
                <View style={styles.titleDeedFileRow}>
                  <FileText size={20} color={palette.brand.primary} />
                  <Text style={styles.titleDeedFileName} numberOfLines={1}>
                    {titleDeedFileName}
                  </Text>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: backgrounds.subtle },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: palette.brand.secondary },
                      ]}
                    >
                      Pending Review
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.titleDeedChangeBtn}
                  activeOpacity={0.8}
                  onPress={async () => {
                    try {
                      setUploadingTitleDeed(true);
                      const res = await DocumentPicker.getDocumentAsync({
                        type: ["application/pdf", "image/jpeg", "image/png"],
                        copyToCacheDirectory: true,
                      });
                      if (!res.canceled && res.assets && res.assets[0]) {
                        setTitleDeedFileName(
                          res.assets[0].name || "Title Deed"
                        );
                      }
                    } catch (err) {
                      console.warn("File selection failed", err);
                      Alert.alert("File selection failed", "Please try again.");
                    } finally {
                      setUploadingTitleDeed(false);
                    }
                  }}
                >
                  <Text style={styles.titleDeedChangeBtnText}>
                    Change Document
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.titleDeedUploadArea}
                activeOpacity={0.85}
                onPress={async () => {
                  try {
                    setUploadingTitleDeed(true);
                    const res = await DocumentPicker.getDocumentAsync({
                      type: ["application/pdf", "image/jpeg", "image/png"],
                      copyToCacheDirectory: true,
                    });
                    if (!res.canceled && res.assets && res.assets[0]) {
                      setTitleDeedFileName(res.assets[0].name || "Title Deed");
                    }
                  } catch (err) {
                    console.warn("File selection failed", err);
                    Alert.alert("File selection failed", "Please try again.");
                  } finally {
                    setUploadingTitleDeed(false);
                  }
                }}
                disabled={uploadingTitleDeed}
              >
                {uploadingTitleDeed ? (
                  <ActivityIndicator
                    size="small"
                    color={palette.brand.primary}
                  />
                ) : (
                  <>
                    <View style={styles.titleDeedUploadIconWrap}>
                      <Upload size={28} color={palette.brand.primary} />
                    </View>
                    <Text style={styles.titleDeedUploadTitle}>Title Deed</Text>
                    <Text style={styles.titleDeedUploadText}>
                      Tap to upload your document
                    </Text>
                    <Text style={styles.titleDeedUploadHint}>
                      PDF, JPG, or PNG (Max 5MB)
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

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
                <FileText size={42} color={textColors.secondary} />
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
              <Download size={18} color={textColors.onDark} />
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
                <ActivityIndicator size="small" color={palette.brand.primary} />
              ) : pickedFileName ? (
                <>
                  <View style={styles.fileSelectedIcon}>
                    <FileText size={24} color={palette.brand.primary} />
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
                    <Upload size={28} color={textColors.secondary} />
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
                <Upload size={18} color={textColors.onDark} />
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
              <CheckCircle2 size={48} color={palette.status.success} />
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
    backgroundColor: backgrounds.subtle,
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 18,
    paddingBottom: 20,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    ...shadows.card,
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
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: textColors.onDark,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
    fontFamily: "Marcellus-Regular",
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
    backgroundColor: palette.status.successLight,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    color: textColors.onDark,
    fontWeight: "700",
    fontSize: 13,
  },
  statValue: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 24,
  },
  infoCard: {
    marginTop: 16,
    marginHorizontal: 18,
    backgroundColor: palette.status.infoLight,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    gap: 10,
  },
  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: palette.status.infoLight,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    color: palette.brand.primary,
    fontWeight: "800",
    fontSize: 14,
    fontFamily: "Marcellus-Regular",
  },
  infoBody: {
    color: textColors.body,
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 17,
  },
  sectionLabel: {
    marginTop: 16,
    marginHorizontal: 18,
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 16,
  },
  cardsStack: {
    marginTop: 10,
    gap: 12,
    paddingHorizontal: 18,
  },
  docCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: borders.default,
    ...shadows.card,
  },
  docHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  docTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 15,
    fontFamily: "Marcellus-Regular",
  },
  docUploaded: {
    color: textColors.body,
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
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 12,
  },
  metaValue: {
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 12,
  },
  metaMuted: {
    color: textColors.secondary,
  },
  reasonBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: palette.status.errorLight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.status.errorLight,
    gap: 6,
  },
  reasonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reasonTitle: {
    color: palette.status.error,
    fontWeight: "800",
    fontSize: 13,
  },
  reasonText: {
    color: palette.status.errorDark,
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 17,
  },
  linkText: {
    color: palette.brand.primary,
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
    borderColor: borders.default,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: backgrounds.subtle,
  },
  actionGhostText: {
    color: textColors.heading,
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
    backgroundColor: palette.brand.primary,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  actionPrimaryText: {
    color: textColors.onDark,
    fontWeight: "800",
  },
  ctaCard: {
    marginTop: 16,
    marginHorizontal: 18,
    backgroundColor: palette.brand.primary,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  ctaTitle: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 16,
    fontFamily: "Marcellus-Regular",
  },
  ctaBody: {
    color: textColors.onDark,
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  ctaButton: {
    marginTop: 6,
    height: 48,
    borderRadius: 12,
    backgroundColor: backgrounds.card,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonText: {
    color: palette.brand.primary,
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
    backgroundColor: backgrounds.card,
    borderRadius: 24,
    padding: 16,
    ...shadows.modal,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 18,
    fontFamily: "Marcellus-Regular",
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    color: textColors.body,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22,
  },
  modalPreview: {
    marginTop: 4,
    backgroundColor: backgrounds.subtle,
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
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPreviewTitle: {
    color: textColors.body,
    fontWeight: "800",
    fontSize: 16,
  },
  modalPreviewSubtitle: {
    color: textColors.secondary,
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
    color: textColors.body,
    fontWeight: "700",
    fontSize: 14,
  },
  modalMetaValue: {
    color: textColors.heading,
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
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  modalDownloadText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 16,
  },
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: backgrounds.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 34,
    ...shadows.modal,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: borders.default,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
  },
  bottomSheetTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  bottomSheetSubtitle: {
    color: textColors.secondary,
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
    backgroundColor: backgrounds.subtle,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: borders.default,
    gap: 14,
  },
  documentTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: backgrounds.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: borders.default,
  },
  documentTypeLabel: {
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
  },
  bottomSheetCancel: {
    backgroundColor: backgrounds.subtle,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: borders.default,
  },
  bottomSheetCancelText: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 16,
  },
  uploadCard: {
    width: "92%",
    backgroundColor: backgrounds.card,
    borderRadius: 20,
    padding: 16,
    ...shadows.modal,
  },
  uploadSubtitle: {
    color: textColors.body,
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 14,
  },
  filePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: borders.default,
    borderRadius: 14,
    padding: 12,
    backgroundColor: backgrounds.subtle,
    marginBottom: 16,
  },
  filePickerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: borders.default,
    alignItems: "center",
    justifyContent: "center",
  },
  filePickerLabel: {
    color: textColors.heading,
    fontWeight: "700",
  },
  filePickerHint: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 12,
  },
  filePickerAction: {
    color: palette.brand.primary,
    fontWeight: "800",
    fontSize: 13,
  },
  successCard: {
    width: "88%",
    backgroundColor: backgrounds.card,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    gap: 12,
    ...shadows.modal,
  },
  successIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.status.successLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  successTitle: {
    color: textColors.heading,
    fontWeight: "800",
    fontSize: 20,
    marginTop: 4,
  },
  successBody: {
    color: textColors.body,
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
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  successButtonText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 16,
  },
  // Upload area styles
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: borders.default,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgrounds.subtle,
    marginBottom: 20,
    minHeight: 160,
  },
  uploadAreaSelected: {
    borderColor: palette.brand.primary,
    borderStyle: "solid",
    backgroundColor: palette.status.infoLight,
  },
  uploadIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: borders.default,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadAreaTitle: {
    color: textColors.body,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  uploadAreaHint: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 13,
  },
  fileSelectedIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.status.infoLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  fileSelectedName: {
    color: palette.brand.primary,
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    maxWidth: "80%",
  },
  uploadHintSelected: {
    color: textColors.secondary,
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
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: borders.default,
  },
  cancelButtonText: {
    color: textColors.body,
    fontWeight: "700",
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  submitButtonDisabled: {
    backgroundColor: textColors.secondary,
    shadowOpacity: 0,
  },
  submitButtonText: {
    color: textColors.onDark,
    fontWeight: "800",
    fontSize: 16,
  },
  // Title Deed Styles
  titleDeedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: borders.default,
    ...shadows.card,
  },
  titleDeedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  titleDeedIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.status.infoLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  titleDeedInfo: {
    flex: 1,
  },
  titleDeedTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 2,
  },
  titleDeedSubtitle: {
    fontSize: 13,
    color: textColors.secondary,
    fontWeight: "500",
  },
  titleDeedUploadArea: {
    borderWidth: 2,
    borderColor: palette.brand.primary,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.status.infoLight,
    gap: 6,
  },
  titleDeedUploadIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: palette.brand.primary,
  },
  titleDeedUploadTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: textColors.heading,
  },
  titleDeedUploadText: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.brand.primary,
  },
  titleDeedUploadHint: {
    fontSize: 12,
    color: textColors.secondary,
    fontWeight: "500",
    marginTop: 4,
  },
  titleDeedUploaded: {
    gap: 12,
  },
  titleDeedFileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: backgrounds.subtle,
    padding: 12,
    borderRadius: 10,
  },
  titleDeedFileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: textColors.heading,
  },
  titleDeedChangeBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: backgrounds.subtle,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borders.default,
  },
  titleDeedChangeBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: textColors.body,
  },
});

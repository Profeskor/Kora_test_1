import { create } from "zustand";

export type NotificationType =
  | "lead"
  | "booking"
  | "property"
  | "offer"
  | "interest";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  type?: NotificationType;
  // Which roles can see this notification
  visibleTo?: ("broker" | "homeowner" | "buyer" | "tenant" | "guest")[];
};

// Hardcoded notifications for brokers
const BROKER_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "broker-1",
    title: "🔥 Hot Lead Assigned",
    message:
      "Ahmed Al Mansouri is interested in IL Vento Residences - Unit 501 (2BR Canal View)",
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
    read: false,
    type: "lead",
    visibleTo: ["broker"],
  },
  {
    id: "broker-2",
    title: "Site Visit Scheduled",
    message:
      "Fatima Al Zahra confirmed site visit for La Marina Heights tomorrow at 3:00 PM",
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 mins ago
    read: false,
    type: "booking",
    visibleTo: ["broker"],
  },
  {
    id: "broker-3",
    title: "Offer Accepted!",
    message:
      "David Miller accepted your offer for Azure Bay Unit 708 - AED 2.97M",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: false,
    type: "offer",
    visibleTo: ["broker"],
  },
  {
    id: "broker-4",
    title: "Commission Credited",
    message: "AED 59,399 commission credited for Azure Bay Unit 708 sale",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    type: "offer",
    visibleTo: ["broker"],
  },
  {
    id: "broker-5",
    title: "Follow-up Reminder",
    message:
      "Reminder: Follow up with Ahmed Al Mansouri about payment plan options",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    type: "lead",
    visibleTo: ["broker"],
  },
];

// Hardcoded notifications for homeowners
const HOMEOWNER_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "homeowner-1",
    title: "🏗️ Construction Update",
    message:
      "Vento Harbour Views - Floor 24 structural work complete. Your Unit 2404 is progressing well!",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
    read: false,
    type: "property",
    visibleTo: ["homeowner"],
  },
  {
    id: "homeowner-2",
    title: "Payment Received",
    message:
      "Thank you! Your installment of AED 165,387 for Vento Harbour Views has been received.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    type: "booking",
    visibleTo: ["homeowner"],
  },
  {
    id: "homeowner-3",
    title: "📅 Next Payment Reminder",
    message:
      "Your next installment of AED 165,387 is due in 30 days (Jan 18, 2026)",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: false,
    type: "booking",
    visibleTo: ["homeowner"],
  },
  {
    id: "homeowner-4",
    title: "🎉 Handover Update",
    message:
      "IL Vento Residences Unit 1205 - Keys ready for collection! Schedule your handover appointment.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
    type: "property",
    visibleTo: ["homeowner"],
  },
  {
    id: "homeowner-5",
    title: "Document Uploaded",
    message:
      "Your SPA agreement for Marina Crest Unit 3408 has been uploaded to your documents.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: "property",
    visibleTo: ["homeowner"],
  },
  {
    id: "homeowner-6",
    title: "Community Notice",
    message:
      "Marina Crest Residences: Amenities preview event on Dec 28. You're invited!",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
    type: "property",
    visibleTo: ["homeowner"],
  },
];

// Combine all hardcoded notifications
const ALL_NOTIFICATIONS: NotificationItem[] = [
  ...BROKER_NOTIFICATIONS,
  ...HOMEOWNER_NOTIFICATIONS,
];

interface NotificationStore {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (
    title: string,
    message: string,
    type?: NotificationType
  ) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  getNotificationsForRole: (role: string) => NotificationItem[];
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: ALL_NOTIFICATIONS,
  unreadCount: ALL_NOTIFICATIONS.filter((n) => !n.read).length,

  addNotification: (title, message, type = "interest") => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      createdAt: new Date(),
      read: false,
      type,
    };
    const notifications = [item, ...get().notifications];
    const unreadCount = notifications.filter((n) => !n.read).length;
    set({ notifications, unreadCount });
  },

  markAllRead: () => {
    const notifications = get().notifications.map((n) => ({
      ...n,
      read: true,
    }));
    set({ notifications, unreadCount: 0 });
  },

  markRead: (id) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    const unreadCount = notifications.filter((n) => !n.read).length;
    set({ notifications, unreadCount });
  },

  getNotificationsForRole: (role: string) => {
    return get().notifications.filter(
      (n) => !n.visibleTo || n.visibleTo.includes(role as any)
    );
  },
}));

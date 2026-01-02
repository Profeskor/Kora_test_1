import React, { useState, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building,
  ArrowRight,
  Copy,
  CheckCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
} from "../../constants/designSystem";
import { palette } from "@/src/constants";

// ============================================================================
// TYPES
// ============================================================================

export interface PaymentSchedule {
  id: string;
  month: number; // 0-11 (JavaScript month index)
  year: number;
  amount: number;
  currency?: string;
  scheduledDate: Date;
  status: "upcoming" | "due" | "overdue" | "paid";
  /** Flag to identify mock/fallback data - not shown in UI */
  _isMockData?: boolean;
}

export interface PropertyInfo {
  id: string;
  name: string;
  unitNumber: string;
}

export interface HomeownerPaymentCardProps {
  /** Array of scheduled payments - component will find the relevant one based on selected month */
  payments?: PaymentSchedule[];
  /** Property information for the footer */
  property?: PropertyInfo;
  /** Callback when Pay Now is pressed */
  onPayNow?: (payment: PaymentSchedule) => void;
  /** Custom month range to display (default: 5 months centered on current selection) */
  monthsToShow?: number;
  /** Initial selected month/year (defaults to current date) */
  initialDate?: { month: number; year: number };
  /** Base payment amount for mock data generation (default: 15000) */
  basePaymentAmount?: number;
  /** Currency for mock data (default: "AED") */
  defaultCurrency?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CARD_BACKGROUND = "#0A2942"; // Deep navy blue matching the design
const DEFAULT_PAYMENT_AMOUNT = 15000;
const DEFAULT_CURRENCY = "AED";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get localized month name from month index (0-11)
 * Uses Intl.DateTimeFormat for proper localization
 */
const getMonthName = (
  monthIndex: number,
  format: "short" | "long" = "short"
): string => {
  const date = new Date(2000, monthIndex, 1);
  return new Intl.DateTimeFormat("en-US", { month: format }).format(date);
};

/**
 * Get the current date - centralized for easy mocking in tests
 */
const getCurrentDate = (): Date => new Date();

/**
 * Compare two month/year combinations
 * Returns: -1 if a < b, 0 if equal, 1 if a > b
 */
const compareMonthYear = (
  aMonth: number,
  aYear: number,
  bMonth: number,
  bYear: number
): number => {
  if (aYear !== bYear) return aYear < bYear ? -1 : 1;
  if (aMonth !== bMonth) return aMonth < bMonth ? -1 : 1;
  return 0;
};

/**
 * Determine the temporal context of a month relative to current date
 */
const getTimeContext = (
  month: number,
  year: number
): "past" | "current" | "future" => {
  const now = getCurrentDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const comparison = compareMonthYear(month, year, currentMonth, currentYear);
  if (comparison < 0) return "past";
  if (comparison > 0) return "future";
  return "current";
};

/**
 * Determine appropriate payment status based on time context
 */
const getStatusForTimeContext = (
  timeContext: "past" | "current" | "future"
): PaymentSchedule["status"] => {
  switch (timeContext) {
    case "past":
      return "paid";
    case "current":
      return "due";
    case "future":
      return "upcoming";
  }
};

/**
 * Generate a mock payment for a given month/year
 * Used as fallback when no real payment data exists
 */
const generateMockPayment = (
  month: number,
  year: number,
  baseAmount: number = DEFAULT_PAYMENT_AMOUNT,
  currency: string = DEFAULT_CURRENCY
): PaymentSchedule => {
  const timeContext = getTimeContext(month, year);
  const status = getStatusForTimeContext(timeContext);

  // For past months, use the 1st of that month as paid date
  // For current/future, use 1st of the month as scheduled date
  const scheduledDate = new Date(year, month, 1);

  return {
    id: `mock-${year}-${month}`,
    month,
    year,
    amount: baseAmount,
    currency,
    scheduledDate,
    status,
    _isMockData: true,
  };
};

const formatCurrency = (
  amount: number,
  currency = DEFAULT_CURRENCY
): string => {
  return `${currency} ${amount.toLocaleString()}`;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = getMonthName(date.getMonth(), "short");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onSelectMonth: (month: number, year: number) => void;
  monthsToShow: number;
  hasRealPayment: (month: number, year: number) => boolean;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  selectedYear,
  onSelectMonth,
  monthsToShow,
  hasRealPayment,
}) => {
  // Generate visible months centered around selected month
  const visibleMonths = useMemo(() => {
    const months: { month: number; year: number; key: string }[] = [];
    const offset = Math.floor(monthsToShow / 2);

    for (let i = -offset; i <= offset; i++) {
      let m = selectedMonth + i;
      let y = selectedYear;

      // Handle year boundaries
      while (m < 0) {
        m += 12;
        y -= 1;
      }
      while (m > 11) {
        m -= 12;
        y += 1;
      }

      months.push({
        month: m,
        year: y,
        key: `${y}-${m}`,
      });
    }

    return months;
  }, [selectedMonth, selectedYear, monthsToShow]);

  const handlePrevious = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    onSelectMonth(newMonth, newYear);
  };

  const handleNext = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    onSelectMonth(newMonth, newYear);
  };

  return (
    <View style={monthStyles.container}>
      <TouchableOpacity
        onPress={handlePrevious}
        style={monthStyles.arrowButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ChevronLeft size={20} color="rgba(255, 255, 255, 0.7)" />
      </TouchableOpacity>

      <View style={monthStyles.monthsRow}>
        {visibleMonths.map(({ month, year, key }) => {
          const isSelected = month === selectedMonth && year === selectedYear;
          const hasPayment = hasRealPayment(month, year);

          return (
            <TouchableOpacity
              key={key}
              onPress={() => onSelectMonth(month, year)}
              style={[
                monthStyles.monthItem,
                isSelected && monthStyles.monthItemSelected,
              ]}
            >
              <Text
                style={[
                  monthStyles.monthText,
                  isSelected && monthStyles.monthTextSelected,
                  !hasPayment && !isSelected && monthStyles.monthTextDim,
                ]}
              >
                {getMonthName(month)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={monthStyles.arrowButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ChevronRight size={20} color="rgba(255, 255, 255, 0.7)" />
      </TouchableOpacity>
    </View>
  );
};

const monthStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
    backgroundColor: palette.brand.primary,
  },
  arrowButton: {
    padding: spacing.xs,
  },
  monthsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  monthItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  monthItemSelected: {
    backgroundColor: palette.brand.secondary,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.base.white,
  },
  monthTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  monthTextDim: {
    color: "rgba(255, 255, 255, 0.4)",
  },
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HomeownerPaymentCard({
  payments = [],
  property,
  onPayNow,
  monthsToShow = 5,
  initialDate,
  basePaymentAmount = DEFAULT_PAYMENT_AMOUNT,
  defaultCurrency = DEFAULT_CURRENCY,
}: HomeownerPaymentCardProps) {
  const router = useRouter();

  // Get current date dynamically - no hardcoding
  const now = useMemo(() => getCurrentDate(), []);
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Create a map for quick payment lookup by month-year key (real payments only)
  const realPaymentsMap = useMemo(() => {
    const map = new Map<string, PaymentSchedule>();
    payments.forEach((payment) => {
      const key = `${payment.year}-${payment.month}`;
      // If multiple payments in same month, prefer actionable ones (upcoming/due)
      const existing = map.get(key);
      if (
        !existing ||
        payment.status === "upcoming" ||
        payment.status === "due"
      ) {
        map.set(key, payment);
      }
    });
    return map;
  }, [payments]);

  // Check if a month has real (non-mock) payment data
  const hasRealPayment = useCallback(
    (month: number, year: number): boolean => {
      const key = `${year}-${month}`;
      return realPaymentsMap.has(key);
    },
    [realPaymentsMap]
  );

  // Get payment for a month - returns real data or generates mock fallback
  const getPaymentForMonth = useCallback(
    (month: number, year: number): PaymentSchedule => {
      const key = `${year}-${month}`;
      const realPayment = realPaymentsMap.get(key);

      if (realPayment) {
        // Update status based on current time context if needed
        const timeContext = getTimeContext(month, year);
        const expectedStatus = getStatusForTimeContext(timeContext);

        // If real payment status doesn't match time context, adjust it
        // (e.g., a payment marked "upcoming" but month is now past should be "paid")
        if (
          (timeContext === "past" && realPayment.status !== "paid") ||
          (timeContext === "current" && realPayment.status === "upcoming")
        ) {
          return { ...realPayment, status: expectedStatus };
        }
        return realPayment;
      }

      // Generate mock data for months without real payments
      return generateMockPayment(
        month,
        year,
        basePaymentAmount,
        defaultCurrency
      );
    },
    [realPaymentsMap, basePaymentAmount, defaultCurrency]
  );

  // Determine initial selection - default to current month
  const getInitialDate = useCallback(() => {
    if (initialDate) return initialDate;

    // Default to current real date - no hardcoding
    return { month: currentMonth, year: currentYear };
  }, [initialDate, currentMonth, currentYear]);

  const initial = getInitialDate();
  const [selectedMonth, setSelectedMonth] = useState(initial.month);
  const [selectedYear, setSelectedYear] = useState(initial.year);

  // Get current payment for selected month (real or mock)
  const currentPayment = useMemo(
    () => getPaymentForMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear, getPaymentForMonth]
  );

  // Determine time context for selected month
  const timeContext = useMemo(
    () => getTimeContext(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );

  // Determine if payment is actionable (can be paid)
  const isPaymentActionable = useMemo(() => {
    // Only current and future payments are actionable
    // Past payments are already completed
    return timeContext !== "past" && currentPayment.status !== "paid";
  }, [timeContext, currentPayment.status]);

  const handleSelectMonth = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handlePayNow = () => {
    if (isPaymentActionable && onPayNow) {
      onPayNow(currentPayment);
    } else if (isPaymentActionable) {
      // Default behavior: navigate to quick-pay
      router.push("/quick-pay");
    }
  };

  // Default property if none provided
  const displayProperty = property || {
    id: "default",
    name: "Marina Heights",
    unitNumber: "Unit 1205",
  };

  // Get display labels based on payment state
  const getPaymentLabel = (): string => {
    if (currentPayment.status === "paid") return "Payment Completed";
    if (currentPayment.status === "due") return "Payment Due";
    if (currentPayment.status === "overdue") return "Payment Overdue";
    return "Upcoming Payment";
  };

  const getDateLabel = (): string => {
    if (currentPayment.status === "paid") return "Paid On";
    return "Scheduled Date";
  };

  const getButtonContent = (): { text: string; showArrow: boolean } => {
    if (currentPayment.status === "paid") {
      return { text: "Paid", showArrow: false };
    }
    return { text: "Pay Now", showArrow: true };
  };

  const buttonContent = getButtonContent();

  return (
    <View style={styles.card}>
      {/* Month Selector */}
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onSelectMonth={handleSelectMonth}
        monthsToShow={monthsToShow}
        hasRealPayment={hasRealPayment}
      />

      {/* Payment Summary */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentLabel}>{getPaymentLabel()}</Text>
        <View style={styles.amountRow}>
          <Text style={styles.paymentAmount}>
            {formatCurrency(currentPayment.amount, currentPayment.currency)}
          </Text>
          <TouchableOpacity style={styles.copyButton} activeOpacity={0.7}>
            <Copy size={18} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scheduled/Paid Date */}
      <View style={styles.dateSection}>
        <Text style={styles.dateLabel}>{getDateLabel()}</Text>
        <View style={styles.dateRow}>
          <Calendar size={16} color="#FFFFFF" />
          <Text style={styles.dateValue}>
            {formatDate(currentPayment.scheduledDate)}
          </Text>
        </View>
      </View>

      {/* Action Button - Pay Now or Paid indicator */}
      <TouchableOpacity
        style={[
          styles.payButton,
          !isPaymentActionable && styles.payButtonCompleted,
        ]}
        onPress={handlePayNow}
        activeOpacity={isPaymentActionable ? 0.9 : 1}
        disabled={!isPaymentActionable}
      >
        {currentPayment.status === "paid" && (
          <CheckCircle size={18} color={colors.semantic.success} />
        )}
        <Text
          style={[
            styles.payButtonText,
            !isPaymentActionable && styles.payButtonTextCompleted,
          ]}
        >
          {buttonContent.text}
        </Text>
        {buttonContent.showArrow && (
          <ArrowRight size={18} color={colors.primary.navy} />
        )}
      </TouchableOpacity>

      {/* Property Info Footer */}
      <View style={styles.footer}>
        <Building size={16} color="rgba(255, 255, 255, 0.6)" />
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerLabel}>Payment for Property</Text>
          <Text style={styles.footerProperty}>
            {displayProperty.name}, {displayProperty.unitNumber}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.brand.primary,
    borderRadius: borderRadius.xl + 4, // 20px
    padding: spacing.xl,
    paddingTop: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    ...shadows.lg,
  },

  // Payment Summary
  paymentSection: {
    marginBottom: spacing.lg,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: spacing.xs,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  copyButton: {
    padding: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: borderRadius.md,
  },

  // Scheduled Date
  dateSection: {
    marginBottom: spacing.xl,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: spacing.xs,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dateValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Pay Now Button
  payButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  payButtonCompleted: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary.navy,
  },
  payButtonTextCompleted: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerTextContainer: {
    flex: 1,
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 2,
  },
  footerProperty: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  ArrowLeft,
  Search,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Building,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "@/src/constants/colors";

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const categories: Category[] = [
  {
    id: "all",
    label: "All Topics",
    icon: <BookOpen size={18} color={palette.base.white} />,
  },
  {
    id: "account",
    label: "Account",
    icon: <HelpCircle size={18} color={textColors.secondary} />,
  },
  {
    id: "properties",
    label: "Properties",
    icon: <HelpCircle size={18} color={textColors.secondary} />,
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: <HelpCircle size={18} color={textColors.secondary} />,
  },
  {
    id: "payments",
    label: "Payments",
    icon: <HelpCircle size={18} color={textColors.secondary} />,
  },
];

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I create an account?",
    answer:
      "To create an account, tap on 'Sign Up' from the landing page, fill in your details including name, email, and phone number, then select your role (Broker, Buyer, or Homeowner). Verify your email and you're all set!",
    category: "account",
  },
  {
    id: "2",
    question: "Can I have multiple roles on one account?",
    answer:
      "Yes! You can switch between different roles using the role selector in your profile. Each role gives you access to role-specific features and tools.",
    category: "account",
  },
  {
    id: "3",
    question: "How do I search for properties?",
    answer:
      "Use the search bar on the home page or navigate to the Properties tab. You can filter by location, price range, property type, bedrooms, and more. Tap on any property to view detailed information.",
    category: "properties",
  },
  {
    id: "4",
    question:
      "What is the difference between Off-Plan and Completed properties?",
    answer:
      "Off-Plan properties are still under construction and will be ready for handover in the future. Completed properties are ready for immediate occupancy. Both offer different investment opportunities and payment plans.",
    category: "properties",
  },
  {
    id: "5",
    question: "How do I book a property viewing?",
    answer:
      "Navigate to the property details page and tap 'Book Viewing'. Select your preferred date and time from the available slots. You'll receive a confirmation with all the details.",
    category: "bookings",
  },
  {
    id: "6",
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes, you can reschedule or cancel your booking from the Bookings section in your profile. Tap on the booking you want to modify and select your preferred action.",
    category: "bookings",
  },
  {
    id: "7",
    question: "What payment methods are accepted?",
    answer:
      "We accept credit cards, debit cards, and bank transfers. You can add multiple payment methods in the Payment Methods section of your profile. All transactions are secure and encrypted.",
    category: "payments",
  },
  {
    id: "8",
    question: "How do I add a property to comparison?",
    answer:
      "While viewing a property, tap the 'Compare' button. You can compare up to 3 properties at once. Access your comparison list from the Compare tab in the navigation.",
    category: "properties",
  },
  {
    id: "9",
    question: "How do I contact a broker?",
    answer:
      "You can contact brokers directly through their profile page or property listings. Tap on 'Contact Broker' to send a message or schedule a call. Brokers typically respond within 24 hours.",
    category: "properties",
  },
  {
    id: "10",
    question: "What is the Virtual Tour feature?",
    answer:
      "Virtual Tours allow you to explore properties remotely using 360-degree views and interactive walkthroughs. Look for the 'Virtual Tour' button on property detail pages to experience properties from anywhere.",
    category: "properties",
  },
];

const Section = ({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeading}>
      <View style={styles.sectionDot} />
      <Text style={styles.sectionTitle}>{title}</Text>
      {count !== undefined && (
        <Text style={styles.sectionCount}>{count} questions</Text>
      )}
    </View>
    {children}
  </View>
);

const FAQItem = ({
  faq,
  isExpanded,
  onToggle,
}: {
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity
    style={styles.faqCard}
    onPress={onToggle}
    activeOpacity={0.85}
  >
    <View style={styles.faqIcon}>
      <HelpCircle size={20} color={palette.brand.primary} />
    </View>
    <View style={styles.faqContent}>
      <Text style={styles.faqQuestion}>{faq.question}</Text>
      {isExpanded && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
    </View>
    <ChevronDown
      size={20}
      color={textColors.secondary}
      style={[styles.faqChevron, isExpanded && styles.faqChevronExpanded]}
    />
  </TouchableOpacity>
);

export default function HelpCenterScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
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
          <Text style={styles.heroTitle}>Help Center</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.searchBar}>
          <Search size={18} color={palette.base.white} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for help..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.searchInput}
          />
        </View>
      </View>

      <Section title="Categories">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  isActive && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.85}
              >
                {isActive ? (
                  <View style={styles.categoryIconActive}>{category.icon}</View>
                ) : (
                  <View style={styles.categoryIcon}>{category.icon}</View>
                )}
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Section>

      <Section title="Frequently Asked Questions" count={filteredFAQs.length}>
        <View style={styles.faqsContainer}>
          {filteredFAQs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isExpanded={expandedIds.has(faq.id)}
              onToggle={() => toggleExpanded(faq.id)}
            />
          ))}
        </View>
      </Section>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgrounds.screenLight,
    paddingBottom: 24,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: palette.brand.primary,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: textColors.onDark,
    fontSize: 15,
    fontWeight: "600",
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
    backgroundColor: palette.brand.primary,
    borderRadius: 999,
  },
  sectionTitle: {
    color: textColors.secondary,
    fontWeight: "800",
    letterSpacing: 0.3,
    flex: 1,
    fontFamily: "Marcellus-Regular",
  },
  sectionCount: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 13,
  },
  categoriesContainer: {
    gap: 10,
    paddingRight: 18,
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: borders.default,
  },
  categoryTabActive: {
    backgroundColor: palette.brand.primary,
    borderColor: palette.brand.primary,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIconActive: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    color: textColors.secondary,
    fontWeight: "700",
    fontSize: 14,
  },
  categoryTextActive: {
    color: textColors.onDark,
  },
  faqsContainer: {
    gap: 12,
  },
  faqCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    gap: 12,
  },
  faqIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: borders.default,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  faqContent: {
    flex: 1,
    gap: 8,
  },
  faqQuestion: {
    color: textColors.heading,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 22,
  },
  faqAnswer: {
    color: textColors.secondary,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
  },
  faqChevron: {
    marginTop: 2,
  },
  faqChevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  footerSpacing: {
    height: 16,
  },
});

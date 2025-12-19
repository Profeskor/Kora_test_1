import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Wrench,
  AlertCircle,
  Building2,
} from "lucide-react";

export function CommunityDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "emergency" | "management" | "services"
  >("all");

  const contacts = [
    {
      id: 1,
      name: "Security Control Room",
      category: "emergency",
      phone: "+971 4 123 4567",
      email: "security@koracommunity.com",
      hours: "24/7",
      icon: Shield,
      color: "red",
    },
    {
      id: 2,
      name: "Emergency Services",
      category: "emergency",
      phone: "999",
      email: "emergency@uae.gov",
      hours: "24/7",
      icon: AlertCircle,
      color: "red",
    },
    {
      id: 3,
      name: "Facilities Management",
      category: "management",
      phone: "+971 4 234 5678",
      email: "fm@koracommunity.com",
      hours: "8:00 AM - 6:00 PM",
      icon: Building2,
      color: "blue",
    },
    {
      id: 4,
      name: "Maintenance Helpdesk",
      category: "services",
      phone: "+971 4 345 6789",
      email: "maintenance@koracommunity.com",
      hours: "7:00 AM - 10:00 PM",
      icon: Wrench,
      color: "orange",
    },
    {
      id: 5,
      name: "Community Manager",
      category: "management",
      phone: "+971 4 456 7890",
      email: "manager@koracommunity.com",
      hours: "9:00 AM - 5:00 PM",
      icon: Building2,
      color: "blue",
    },
    {
      id: 6,
      name: "Reception",
      category: "services",
      phone: "+971 4 567 8901",
      email: "reception@koracommunity.com",
      hours: "24/7",
      icon: Phone,
      color: "green",
    },
  ];

  const categories = [
    { id: "all" as const, label: "All Contacts" },
    { id: "emergency" as const, label: "Emergency" },
    { id: "management" as const, label: "Management" },
    { id: "services" as const, label: "Services" },
  ];

  const filteredContacts =
    selectedCategory === "all"
      ? contacts
      : contacts.filter((c) => c.category === selectedCategory);

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Community Directory</h1>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? "bg-[#005B78] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Emergency Banner */}
      {selectedCategory === "all" && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-900 mb-2">Emergency Contacts</h3>
              <p className="text-red-700 mb-3">
                For immediate assistance, contact:
              </p>
              <div className="space-y-2">
                <a
                  href="tel:999"
                  className="flex items-center gap-2 text-red-900 hover:text-red-600"
                >
                  <Phone className="w-4 h-4" />
                  <span>Police/Ambulance/Fire: 999</span>
                </a>
                <a
                  href="tel:+97141234567"
                  className="flex items-center gap-2 text-red-900 hover:text-red-600"
                >
                  <Phone className="w-4 h-4" />
                  <span>Security: +971 4 123 4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 bg-${contact.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-6 h-6 text-${contact.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-3">{contact.name}</h3>

                  <div className="space-y-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-[#005B78] hover:text-[#004760]"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{contact.phone}</span>
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{contact.email}</span>
                    </a>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{contact.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-3 bg-[#E6F2F5] text-[#005B78] rounded-xl hover:bg-[#CCE5EB] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-blue-50 rounded-2xl p-6">
        <h3 className="text-blue-900 mb-2">Community Address</h3>
        <div className="flex items-start gap-2 text-blue-700">
          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            IL Vento Community
            <br />
            Dubai Maritime City, Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  );
}

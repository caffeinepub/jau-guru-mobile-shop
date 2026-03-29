import {
  ChevronRight,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const contactItems = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 7077109109",
    href: "tel:+917077109109",
    color: "bg-green-500",
    description: "Tap to call directly",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/917077109109",
    color: "bg-[#25D366]",
    description: "Quick reply guaranteed",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@i__am___anup__",
    href: "https://www.instagram.com/i__am___anup__?igsh=MnV5ZHpyb3N3d2c2",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    description: "Follow us for updates",
  },
];

export default function ContactPage({
  onNavigate: _onNavigate,
}: ContactPageProps) {
  return (
    <main className="min-h-screen bg-gray-950 text-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-10 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-yellow-400 mb-1"
        >
          Contact Us
        </motion.h1>
        <p className="text-purple-200 text-sm">We&apos;re here to help you</p>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Contact Cards */}
        {contactItems.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("tel") ? undefined : "_blank"}
            rel="noopener noreferrer"
            data-ocid={`contact.${item.label.toLowerCase()}.link`}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all shadow-lg active:scale-95"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} shrink-0`}
            >
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="font-semibold text-white truncate">{item.value}</p>
              <p className="text-xs text-purple-400">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.a>
        ))}

        {/* Shop Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-4 rounded-2xl bg-gray-900 border border-gray-800"
          data-ocid="contact.hours.card"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gray-900" />
            </div>
            <p className="font-semibold text-white">Shop Hours</p>
          </div>
          <div className="space-y-1 text-sm pl-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Mon &ndash; Sat</span>
              <span className="text-green-400 font-medium">
                9:00 AM &ndash; 8:00 PM
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sunday</span>
              <span className="text-red-400 font-medium">Closed</span>
            </div>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-4 rounded-2xl bg-gray-900 border border-gray-800"
          data-ocid="contact.location.card"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <p className="font-semibold text-white">Find Us</p>
          </div>
          <div className="rounded-xl overflow-hidden h-40 bg-gray-800 flex items-center justify-center border border-gray-700">
            <a
              href="https://maps.app.goo.gl/g2yG7XYf88k48DWD7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-purple-400 hover:text-yellow-400 transition-colors"
              data-ocid="contact.maps.link"
            >
              <MapPin className="w-8 h-8" />
              <span className="text-sm font-medium">View Shop Location</span>
              <span className="text-xs text-gray-500">
                Jau Guru Mobile Shop
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

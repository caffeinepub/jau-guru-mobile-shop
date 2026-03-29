import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle2, Loader2, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitRepairBooking } from "../hooks/useQueries";

const COMMON_ISSUES = [
  "Screen Cracked/Broken",
  "Battery Draining Fast",
  "Phone Not Charging",
  "Camera Not Working",
  "Speaker Issue",
  "Water Damage",
  "Software Problem",
  "Other",
];

interface RepairPageProps {
  onNavigate: (page: string) => void;
}

export default function RepairPage({ onNavigate }: RepairPageProps) {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    deviceModel: "",
    issue: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const submitBooking = useSubmitRepairBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.deviceModel || !form.issue) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const id = await submitBooking.mutateAsync(form);
      setBookingId(Number(id));
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          data-ocid="repair.success_state"
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 mb-4">
            Your repair booking{" "}
            <span className="font-bold text-primary">#{bookingId}</span> has
            been submitted successfully.
          </p>
          <div className="bg-purple-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Name:</span> {form.customerName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Phone:</span> {form.phone}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Device:</span> {form.deviceModel}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Issue:</span> {form.issue}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Our technician will contact you within 2-4 hours to confirm your
            appointment.
          </p>
          <Button
            data-ocid="repair.primary_button"
            onClick={() => onNavigate("home")}
            className="w-full flipkart-gradient text-white font-bold"
          >
            Back to Home
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flipkart-gradient text-white py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="repair.secondary_button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-3 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Book a Repair</h1>
              <p className="text-purple-200 text-sm">
                Fast, reliable mobile repair service
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Common Issues */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-xs border border-gray-100">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">
            Common Issues — Quick Select:
          </h3>
          <div className="flex flex-wrap gap-2">
            {COMMON_ISSUES.map((issue) => (
              <button
                type="button"
                key={issue}
                data-ocid="repair.toggle"
                onClick={() => setForm((p) => ({ ...p, issue }))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  form.issue === issue
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {issue}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          data-ocid="repair.panel"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 shadow-xs border border-gray-100 space-y-4"
        >
          <h3 className="font-bold text-gray-800 text-lg border-b pb-3">
            Your Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                data-ocid="repair.input"
                id="name"
                placeholder="e.g. Rahul Sharma"
                value={form.customerName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, customerName: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="repPhone">Phone Number *</Label>
              <Input
                data-ocid="repair.input"
                id="repPhone"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="device">Device Model *</Label>
            <Input
              data-ocid="repair.input"
              id="device"
              placeholder="e.g. Samsung Galaxy S21, iPhone 13"
              value={form.deviceModel}
              onChange={(e) =>
                setForm((p) => ({ ...p, deviceModel: e.target.value }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="issue">Issue Description *</Label>
            <Textarea
              data-ocid="repair.textarea"
              id="issue"
              placeholder="Describe your device issue in detail..."
              value={form.issue}
              onChange={(e) =>
                setForm((p) => ({ ...p, issue: e.target.value }))
              }
              rows={4}
              className="mt-1"
            />
          </div>
          <Button
            data-ocid="repair.submit_button"
            type="submit"
            disabled={submitBooking.isPending}
            className="w-full flipkart-gradient text-white font-bold h-12 text-base"
          >
            {submitBooking.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Repair Booking →"
            )}
          </Button>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { icon: "⚡", title: "Quick Turnaround", desc: "2-4 hours" },
            { icon: "🔒", title: "Secure Repair", desc: "Data protected" },
            { icon: "💰", title: "Transparent", desc: "No hidden costs" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-3 text-center shadow-xs border border-gray-100"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="font-semibold text-gray-700 text-xs">
                {item.title}
              </p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

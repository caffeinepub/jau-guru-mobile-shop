import { Clock, Instagram, MapPin, Phone, Wrench } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-gray-900 text-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/uploads/img_20260329_072244-019d374c-0acd-770c-a15d-15f434fb8564-1.png"
                alt="Jau Guru"
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/generated/jau-guru-logo-transparent.dim_200x200.png";
                }}
              />
              <div>
                <p className="text-yellow-400 font-bold">
                  Jau Guru Mobile Shop
                </p>
                <p className="text-gray-400 text-xs">
                  Your trusted repair partner
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Expert mobile repair services with genuine parts and unbeatable
              prices.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-3">Services</h3>
            <ul className="space-y-1.5 text-sm">
              {[
                "Screen Repair",
                "Battery Replacement",
                "Water Damage Repair",
                "Software Issues",
                "New & Used Phones",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  <Wrench className="w-3 h-3" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <a
                href="tel:7077109109"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>+91 7077109109</span>
              </a>
              <a
                href="https://www.instagram.com/i__am___anup__?igsh=MnV5ZHpyb3N3d2c2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@i__am___anup__</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Main Market, Near Bus Stand, Your City</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Mon–Sat: 9 AM – 8 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © {year} Jau Guru Mobile Shop. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

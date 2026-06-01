import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  ExternalLink,
  Heart,
  ArrowRight,
} from "lucide-react";
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_ADDRESS_REGION,
  BUSINESS_HOURS,
  EMERGENCY_DISCLAIMER,
  SERVICES,
  SERVICE_AREAS,
  LOGO_PATH,
  SITE_TAGLINE,
} from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#061E3A] to-[#030F1E] text-white overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer */}
      <div className="container-custom py-14 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-0">
              <Image
                src={LOGO_PATH}
                alt={SITE_NAME}
                width={140}
                height={48}
                className="h-18 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              {SITE_TAGLINE}
            </p>
            {/* Service Areas */}
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                Serving
              </p>
              <p className="text-sm text-white/50">
                {SERVICE_AREAS.map((area) => area.name).join(" · ")}
              </p>
            </div>
            <div className="flex gap-2 mt-3 ">
              <a
                href="#"
                className="p-2.5 bg-white/5 hover:bg-accent/20 hover:text-accent rounded-xl transition-all duration-300"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-white/5 hover:bg-accent/20 hover:text-accent rounded-xl transition-all duration-300"
                aria-label="Social Media"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-white!">
              Our Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-accent" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-accent hover:text-accent-light transition-colors font-semibold"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-white!">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Service Areas", href: "/service-areas" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
                { label: "Partner With Us", href: "/partner" },
                { label: "Become a Driver", href: "/become-a-driver" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-accent" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-white!">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <div className="flex items-center justify-center w-9 h-9 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors shrink-0">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <div className="flex items-center justify-center w-9 h-9 bg-primary-sky/10 group-hover:bg-primary-sky/20 rounded-lg transition-colors shrink-0">
                    <Mail className="h-4 w-4 text-primary-sky" />
                  </div>
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="flex items-center justify-center w-9 h-9 bg-white/5 rounded-lg shrink-0">
                  <MapPin className="h-4 w-4 text-white/60" />
                </div>
                {BUSINESS_ADDRESS}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="flex items-center justify-center w-9 h-9 bg-white/5 rounded-lg shrink-0">
                  <Clock className="h-4 w-4 text-white/60" />
                </div>
                <span className="leading-relaxed">{BUSINESS_HOURS}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Disclaimer */}
      <div className="border-t border-white/5 bg-emergency/10">
        <div className="container-custom py-3 text-center">
          <p className="text-sm text-red-600 font-semibold">
            {EMERGENCY_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            © {currentYear} {SITE_NAME}. Made with{" "}
            <Heart className="h-3 w-3 text-emergency fill-emergency" /> in {BUSINESS_ADDRESS_REGION === 'FL' ? 'Florida' : 'Ohio'}.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/accessibility"
              className="text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  Monitor,
  Keyboard,
  Eye,
  Volume2,
  Smartphone,
  Car,
  CheckCircle2,
} from "lucide-react";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, BUSINESS_EMAIL, BUSINESS_PHONE } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Accessibility Statement",
  description: `Accessibility commitment from ${SITE_NAME}. Learn about our website accessibility features, ADA-compliant fleet, and how to report accessibility concerns.`,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Accessibility", href: "/accessibility" },
  ]);

  const lastUpdated = "May 15, 2026";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="gradient-hero section-padding pb-0! mb-0!">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary text-sm font-medium rounded-full mb-6">
              <Accessibility className="h-4 w-4" />
              Our Commitment
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Accessibility Statement
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-padding bg-white p-16!">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-primary mb-6">
              Our Commitment to Accessibility
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                {SITE_NAME} is committed to ensuring that our website and our
                transportation services are accessible to all individuals,
                including people with disabilities. We believe that everyone
                deserves equal access to medical transportation and the digital
                tools to book and manage their rides.
              </p>
              <p>
                We strive to conform to the Web Content Accessibility Guidelines
                (WCAG) 2.1 Level AA standards, as published by the World Wide
                Web Consortium (W3C). These guidelines provide a framework for
                making web content more accessible to people with a wide range
                of disabilities, including visual, auditory, physical, speech,
                cognitive, language, learning, and neurological disabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Website Accessibility Features */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-primary text-center mb-6">
              Website Accessibility Features
            </h2>
            <div className="max-w-3xl mx-auto mb-10 p-4 bg-white border border-border rounded-xl text-sm text-muted-foreground leading-relaxed">
              Our website is built following WCAG 2.1 Level AA coding standards.
              We do not currently offer an on-screen accessibility toolbar, but
              our website natively supports keyboard navigation, screen readers,
              and system-level accessibility settings (such as high contrast
              mode and reduced motion). Users with visual or hearing impairments
              may also contact us directly by phone at{" "}
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}
                className="text-primary hover:underline"
              >
                {BUSINESS_PHONE}
              </a>{" "}
              or by email at{" "}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="text-primary hover:underline"
              >
                {BUSINESS_EMAIL}
              </a>{" "}
              for assistance.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Keyboard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Keyboard Navigation
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our entire website can be navigated using only a keyboard.
                    All interactive elements -- links, buttons, form fields, and
                    menus -- are accessible via the Tab key, and visible focus
                    indicators show which element is currently selected. A
                    &quot;Skip to Content&quot; link is provided to bypass
                    repetitive navigation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Color Contrast
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All text and interactive elements on our website meet WCAG
                    2.1 AA contrast ratio requirements. We do not rely on color
                    alone to convey information -- text labels, icons, and
                    patterns are used alongside color to communicate meaning
                    clearly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Screen Reader Compatibility
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our website is built with semantic HTML and ARIA (Accessible
                    Rich Internet Applications) attributes to ensure
                    compatibility with screen readers such as JAWS, NVDA, and
                    VoiceOver. All images include descriptive alt text, and form
                    fields are properly labeled for screen reader users.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Responsive Design
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our website is fully responsive and works across all device
                    sizes, from mobile phones to desktop monitors. Content
                    reflows to fit smaller screens without requiring horizontal
                    scrolling, and touch targets are sized appropriately for
                    mobile users.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Reduced Motion Support
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    For users who prefer reduced motion, our website respects
                    the &quot;prefers-reduced-motion&quot; operating system
                    setting. When enabled, animations and transitions are
                    minimized or disabled to prevent discomfort for users with
                    vestibular disorders or motion sensitivity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Form Accessibility
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All forms on our website, including the booking form and
                    contact forms, feature clear labels, helpful placeholder
                    text, and descriptive error messages. Form validation errors
                    are announced to screen readers and presented in a way that
                    allows users to easily identify and correct issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Accessibility */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-14 h-14 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                <Car className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-primary mb-2">
                  Transportation Fleet Accessibility
                </h2>
                <p className="text-muted-foreground">
                  Our commitment to accessibility extends beyond the website to
                  our transportation services.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "ADA-compliant vehicles with wheelchair ramps and lifts",
                "Secure wheelchair tie-down and occupant restraint systems",
                "Wide vehicle doors and low-step entry for ambulatory passengers",
                "Climate-controlled interiors for passenger comfort",
                "Trained drivers who assist passengers with boarding, exiting, and securement",
                "Door-to-door and building-to-building assistance available",
                "Accommodation for service animals at no additional charge",
                "Vehicles regularly inspected and maintained to meet ADA requirements",
                "Communication accommodations for passengers with hearing or speech disabilities",
                "Patience and sensitivity training for all drivers serving passengers with disabilities",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Efforts */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-primary mb-6">
              Our Ongoing Accessibility Efforts
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Accessibility is not a one-time effort -- it is an ongoing
                commitment. We continuously work to improve the accessibility of
                our website and services by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Conducting regular accessibility audits of our website using
                  both automated tools and manual testing with assistive
                  technologies
                </li>
                <li>
                  Incorporating accessibility considerations into the design and
                  development of all new features and content
                </li>
                <li>
                  Training our team members on accessibility best practices
                </li>
                <li>
                  Monitoring for and addressing accessibility issues as they are
                  identified
                </li>
                <li>
                  Seeking feedback from users with disabilities to understand
                  their experience and improve our services
                </li>
                <li>
                  Keeping our fleet updated with the latest ADA-compliant
                  equipment and safety features
                </li>
                <li>
                  Staying informed about changes to accessibility standards and
                  regulations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-primary mb-6">
              Known Limitations
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                While we strive for full WCAG 2.1 Level AA compliance, some
                third-party content or features may not be fully accessible.
                These may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Embedded Google Maps components used for address autocomplete
                  and map displays. We provide text-based alternatives where
                  possible
                </li>
                <li>
                  Third-party analytics scripts that may introduce elements not
                  under our direct control
                </li>
              </ul>
              <p>
                We are actively working to address these limitations and provide
                accessible alternatives wherever third-party components fall
                short of accessibility standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Feedback */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-primary mb-6">
              Report an Accessibility Concern
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                We welcome feedback about the accessibility of our website and
                transportation services. If you encounter an accessibility
                barrier, have difficulty using any part of our website with
                assistive technology, or have suggestions for improvement,
                please let us know.
              </p>
              <p>When reporting an accessibility issue, please include:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A description of the issue you encountered</li>
                <li>The page or feature where the issue occurred</li>
                <li>The assistive technology you were using (if applicable)</li>
                <li>Your browser and device information</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 mt-8 shadow-[var(--shadow-card)] space-y-4">
              <h3 className="font-heading text-xl font-semibold text-primary">
                Contact Us About Accessibility
              </h3>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="text-primary hover:underline"
                  >
                    {BUSINESS_EMAIL}
                  </a>
                  <br />
                  <span className="text-sm">
                    Please include &quot;Accessibility&quot; in the subject line
                  </span>
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Phone:</strong>{" "}
                  <a
                    href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}
                    className="text-primary hover:underline"
                  >
                    {BUSINESS_PHONE}
                  </a>
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Contact Form:</strong>{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Visit our Contact page
                  </Link>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                We aim to respond to all accessibility inquiries within two
                business days. If your concern requires immediate attention,
                please call us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-primary mb-6">
              Regulatory Compliance
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                {SITE_NAME} complies with the Americans with Disabilities Act
                (ADA) and all applicable federal, state, and local laws
                regarding accessibility of transportation services and digital
                content. Our transportation fleet meets or exceeds the ADA
                requirements for non-emergency medical transportation vehicles,
                and our website is designed to meet WCAG 2.1 Level AA standards.
              </p>
              <p>
                We are committed to providing an inclusive experience for all
                users. If you feel that we have not met our accessibility goals,
                we encourage you to contact us so we can address your concerns
                promptly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

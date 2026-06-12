import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import {
  SITE_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${SITE_NAME}. Review our policies on bookings, cancellations, passenger responsibilities, liability, and use of our non-emergency medical transportation services.`,
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Terms & Conditions", href: "/terms" },
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
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white p-16!">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none text-foreground space-y-8">
              {/* Introduction */}
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms and Conditions (&quot;Terms&quot;) govern your use
                  of the {SITE_NAME} website at{" "}
                  <Link href="/" className="text-primary hover:underline">
                    {SITE_URL}
                  </Link>{" "}
                  and our non-emergency medical transportation (NEMT) services.
                  By using our website or booking a ride, you agree to be bound
                  by these Terms. If you do not agree with any part of these
                  Terms, please do not use our website or services.
                </p>
              </div>

              {/* 1. Service Description */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  1. Service Description
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {SITE_NAME} provides non-emergency medical transportation
                  services in Southwest Ohio, including Cincinnati, Mason, West
                  Chester, Liberty Township, Hamilton, Middletown, and
                  surrounding areas. Our services include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Ambulatory transportation (walk-on passengers)</li>
                  <li>Wheelchair-accessible transportation</li>
                  <li>
                    Transportation to and from medical appointments, dialysis
                    treatments, hospital discharges, and other
                    healthcare-related destinations
                  </li>
                  <li>One-way, round-trip, and recurring ride scheduling</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3 font-semibold">
                  IMPORTANT: {SITE_NAME} does NOT provide emergency medical
                  transportation or ambulance services. For medical emergencies,
                  call 911 immediately.
                </p>
              </div>

              {/* 2. Booking Process */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  2. Booking Process
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Rides may be booked through our online booking system at{" "}
                  <Link href="/book" className="text-primary hover:underline">
                    {SITE_URL}/book
                  </Link>{" "}
                  or by contacting our dispatch team by phone.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Booking Requests:</strong> All bookings submitted
                    through our website are ride requests, not confirmed
                    reservations. Each request is reviewed by our dispatch team
                    before confirmation
                  </li>
                  <li>
                    <strong>Confirmation:</strong> A ride is only confirmed when
                    you receive an official confirmation communication (email or
                    phone call) from our team. Submission of the booking form
                    alone does not guarantee service
                  </li>
                  <li>
                    <strong>Advance Booking:</strong> We recommend booking rides
                    at least 24 hours in advance. Same-day requests will be
                    accommodated when possible but are subject to availability
                  </li>
                  <li>
                    <strong>Accuracy of Information:</strong> You are
                    responsible for providing accurate booking information,
                    including passenger details, pickup/drop-off addresses,
                    appointment times, and mobility requirements. Inaccurate
                    information may result in service delays or inability to
                    provide service
                  </li>
                </ul>
              </div>

              {/* 3. Cancellation Policy */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  3. Cancellation Policy
                </h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Cancellations with Notice:</strong> Rides may be
                    cancelled without charge if notice is provided at least 2
                    hours before the scheduled pickup time. Contact our dispatch
                    team by phone to cancel a ride
                  </li>
                  <li>
                    <strong>Late Cancellations:</strong> Cancellations made less
                    than 2 hours before the scheduled pickup time may be subject
                    to a cancellation fee
                  </li>
                  <li>
                    <strong>Recurring Rides:</strong> For recurring ride
                    schedules, please notify us as early as possible of any
                    changes. Cancellation of an entire recurring series requires
                    at least 48 hours&apos; notice
                  </li>
                  <li>
                    <strong>Cancellation by {SITE_NAME}:</strong> We reserve the
                    right to cancel or reschedule a ride due to unforeseen
                    circumstances, including severe weather, vehicle
                    emergencies, or safety concerns. In such cases, we will make
                    every effort to arrange alternative transportation or
                    reschedule at no additional cost
                  </li>
                </ul>
              </div>

              {/* 4. No-Show Policy */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  4. No-Show Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  A &quot;no-show&quot; occurs when a driver arrives at the
                  confirmed pickup location at the scheduled time and the
                  passenger is not present or not ready for pickup.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    Drivers will wait up to 15 minutes past the scheduled pickup
                    time for the passenger to arrive
                  </li>
                  <li>
                    After the wait period, the driver will attempt to contact
                    the passenger by phone. If the passenger cannot be reached,
                    the ride will be recorded as a no-show
                  </li>
                  <li>
                    No-show rides may be subject to a no-show fee, which covers
                    the driver&apos;s time and fuel costs for traveling to the
                    pickup location
                  </li>
                  <li>
                    Repeated no-shows (three or more within a 30-day period) may
                    result in suspension of booking privileges until the matter
                    is resolved with our dispatch team
                  </li>
                  <li>
                    No-show fees do not apply to rides cancelled in accordance
                    with our Cancellation Policy (Section 3)
                  </li>
                </ul>
              </div>

              {/* 5. Payment and Pricing */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  5. Payment and Pricing
                </h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Price Estimates:</strong> Pricing estimates provided
                    during the booking process are based on distance, transport
                    type, and applicable surcharges. Final pricing may vary
                    based on actual trip conditions (route changes, wait time,
                    additional stops)
                  </li>
                  <li>
                    <strong>Insurance:</strong> For insurance-covered rides, we
                    will coordinate with the insurance provider. Any portion not
                    covered by insurance is the passenger&apos;s responsibility
                  </li>
                  <li>
                    <strong>Private Pay:</strong> Self-pay passengers are
                    responsible for the full cost of the ride. Payment is
                    expected upon completion of service or as otherwise agreed
                  </li>
                  <li>
                    <strong>Facility Billing:</strong> For rides arranged
                    through a healthcare facility partner, billing is handled
                    according to the terms of our facility partnership agreement
                  </li>
                </ul>
              </div>

              {/* 6. Passenger Responsibilities */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  6. Passenger Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  As a passenger using {SITE_NAME} services, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>
                    Be ready for pickup at the scheduled time and designated
                    location
                  </li>
                  <li>
                    Provide accurate information about your mobility needs and
                    any assistance required
                  </li>
                  <li>Wear seatbelts at all times during transport</li>
                  <li>
                    Treat drivers and other passengers with respect and courtesy
                  </li>
                  <li>
                    Refrain from smoking, vaping, or consuming alcohol or
                    illegal substances in the vehicle
                  </li>
                  <li>Not bring weapons of any kind into the vehicle</li>
                  <li>
                    Keep food and drinks secured and clean up after yourself
                  </li>
                  <li>
                    Ensure that any companion or attendant accompanying you
                    follows these same guidelines
                  </li>
                  <li>
                    Notify us in advance if you require wheelchair accommodation
                    or special assistance
                  </li>
                  <li>
                    Inform the driver of any changes to your condition that may
                    affect transportation during the ride
                  </li>
                </ul>
              </div>

              {/* 7. Liability and Disclaimers */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  7. Liability and Disclaimers
                </h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Transportation Only:</strong> {SITE_NAME} provides
                    transportation services only. We are not a healthcare
                    provider, and our drivers are not medical professionals.
                    Drivers do not provide medical advice, administer
                    medications, or perform any medical procedures
                  </li>
                  <li>
                    <strong>Not an Emergency Service:</strong> Our services are
                    not a substitute for emergency medical services. If you
                    experience a medical emergency before, during, or after your
                    ride, call 911 immediately
                  </li>
                  <li>
                    <strong>Insurance Coverage:</strong> {SITE_NAME} maintains
                    commercial auto insurance and general liability insurance to
                    cover incidents during transportation. Details of our
                    coverage are available upon request
                  </li>
                  <li>
                    <strong>Limitation of Liability:</strong> To the maximum
                    extent permitted by law, {SITE_NAME} shall not be liable for
                    indirect, incidental, special, consequential, or punitive
                    damages arising from the use of our services, including but
                    not limited to missed appointments, delays, or service
                    interruptions caused by circumstances beyond our reasonable
                    control
                  </li>
                  <li>
                    <strong>Force Majeure:</strong> We are not liable for
                    failure to perform our obligations due to events beyond our
                    reasonable control, including natural disasters, severe
                    weather, government actions, pandemics, road closures, or
                    civil disturbances
                  </li>
                </ul>
              </div>

              {/* 8. Personal Belongings */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  8. Personal Belongings
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Passengers are responsible for their personal belongings
                  during transportation. While our drivers will make reasonable
                  efforts to assist with personal items,
                  {SITE_NAME} is not liable for loss, theft, or damage to
                  personal property left in our vehicles. If you believe you
                  have left an item in one of our vehicles, please contact our
                  dispatch team as soon as possible so we can attempt to locate
                  and return it.
                </p>
              </div>

              {/* 9. Website Use */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  9. Website Use
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  By using our website, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>
                    Use the website only for its intended purpose (learning
                    about our services, booking rides, managing your account)
                  </li>
                  <li>
                    Not attempt to interfere with the website&apos;s
                    functionality, security, or accessibility
                  </li>
                  <li>
                    Not use automated tools to scrape, crawl, or extract data
                    from the website without our express written permission
                  </li>
                  <li>Not create false or misleading bookings</li>
                  <li>
                    Not impersonate another person or misrepresent your identity
                  </li>
                </ul>
              </div>

              {/* 10. User Accounts */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  10. User Accounts
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you create an account on our website, you are responsible
                  for maintaining the confidentiality of your login credentials
                  and for all activity that occurs under your account. You agree
                  to notify us immediately if you suspect any unauthorized use
                  of your account. We reserve the right to suspend or terminate
                  accounts that violate these Terms or are used for fraudulent
                  purposes.
                </p>
              </div>

              {/* 11. Intellectual Property */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  11. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website -- including text, graphics,
                  logos, images, and software -- is the property of {SITE_NAME}{" "}
                  or its licensors and is protected by copyright, trademark, and
                  other intellectual property laws. You may not reproduce,
                  distribute, modify, or create derivative works from any
                  content on this website without our prior written consent.
                </p>
              </div>

              {/* 12. Governing Law */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  12. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by and construed in accordance with
                  the laws of the State of Ohio, without regard to its conflict
                  of law principles. Any disputes arising from these Terms or
                  your use of our services shall be resolved in the courts of
                  Hamilton County, Ohio.
                </p>
              </div>

              {/* 13. Modifications */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  13. Modifications to These Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time.
                  Material changes will be reflected by updating the &quot;Last
                  updated&quot; date at the top of this page. Your continued use
                  of our website and services after modifications are posted
                  constitutes your acceptance of the revised Terms. We encourage
                  you to review these Terms periodically.
                </p>
              </div>

              {/* 14. Severability */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  14. Severability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be invalid or
                  unenforceable by a court of competent jurisdiction, the
                  remaining provisions shall continue in full force and effect.
                </p>
              </div>

              {/* 15. Contact */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  15. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions about these Terms and Conditions, please
                  contact us:
                </p>
                <div className="bg-muted rounded-lg p-6 space-y-2">
                  <p className="text-foreground font-semibold">{SITE_NAME}</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="text-primary hover:underline"
                    >
                      {BUSINESS_EMAIL}
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    Phone:{" "}
                    <a
                      href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`}
                      className="text-primary hover:underline"
                    >
                      {BUSINESS_PHONE}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_EMAIL, BUSINESS_PHONE, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information when you use our non-emergency medical transportation services.`,
  path: '/privacy',
})

export default function PrivacyPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Privacy Policy', href: '/privacy' },
  ])

  const lastUpdated = 'May 15, 2026'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="gradient-hero section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none text-foreground space-y-8">

              {/* Introduction */}
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed
                  to protecting your privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your personal information when you visit our website at{' '}
                  <Link href="/" className="text-primary hover:underline">{SITE_URL}</Link>{' '}
                  or use our non-emergency medical transportation (NEMT) services. Please read
                  this policy carefully. By using our website or services, you consent to the
                  practices described in this Privacy Policy.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  1. Information We Collect
                </h2>

                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                  1.1 Information You Provide Directly
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  When you book a ride, create an account, submit a contact form, apply for a
                  driver position, or submit a partnership inquiry, we may collect the following
                  information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Full name, email address, phone number, and date of birth</li>
                  <li>Pickup and drop-off addresses</li>
                  <li>Medical appointment details (facility name, appointment time, department)</li>
                  <li>Transportation type and mobility assistance needs</li>
                  <li>Insurance or Medicaid information for billing purposes</li>
                  <li>Emergency contact information</li>
                  <li>Special instructions related to your ride (gate codes, mobility notes)</li>
                  <li>Account credentials (email and password)</li>
                  <li>Driver application details (license number, experience, certifications)</li>
                  <li>Partnership inquiry details (organization name, contact information)</li>
                </ul>

                <h3 className="font-heading text-lg font-semibold text-primary mb-2 mt-6">
                  1.2 Information Collected Automatically
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  When you visit our website, we may automatically collect certain information,
                  including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>IP address and approximate geographic location</li>
                  <li>Browser type, version, and operating system</li>
                  <li>Pages visited, time spent on pages, and navigation patterns</li>
                  <li>Referring website or source</li>
                  <li>Device type (mobile, tablet, desktop)</li>
                </ul>

                <h3 className="font-heading text-lg font-semibold text-primary mb-2 mt-6">
                  1.3 Information from Third Parties
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may receive information from third-party services that integrate with our
                  platform, including Google Maps (for address validation and distance
                  calculation) and payment processors (for transaction confirmation). We do not
                  receive your full payment card details from payment processors.
                </p>
              </div>

              {/* 2. How We Use Your Information */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>To process and manage ride bookings and provide transportation services</li>
                  <li>To communicate with you about your rides, including confirmations,
                    updates, and follow-ups</li>
                  <li>To calculate pricing and distance estimates using mapping services</li>
                  <li>To process billing through Medicaid, insurance, or private payment</li>
                  <li>To create and manage your user account</li>
                  <li>To respond to inquiries, partnership requests, and driver applications</li>
                  <li>To improve our website, services, and user experience</li>
                  <li>To send administrative communications (policy changes, service updates)</li>
                  <li>To comply with legal obligations, including record-keeping requirements</li>
                  <li>To protect the safety and security of our passengers, drivers, and staff</li>
                </ul>
              </div>

              {/* 3. Cookies and Tracking Technologies */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  3. Cookies and Tracking Technologies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Our website uses cookies and similar tracking technologies to enhance your
                  browsing experience and collect usage data. These include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for the website to function
                    properly (session management, security, form functionality)</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our
                    website (Google Analytics, Vercel Analytics). These cookies collect
                    aggregated, anonymized data</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings
                    to provide a personalized experience (booking form progress)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  You can manage your cookie preferences through your browser settings. Please
                  note that disabling certain cookies may impact the functionality of our
                  website, including the ability to save booking form progress.
                </p>
              </div>

              {/* 4. How We Share Your Information */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  4. How We Share Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not sell your personal information to third parties. We may share your
                  information in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Service Providers:</strong> We share information with trusted
                    third-party service providers who assist in operating our business (email
                    delivery, payment processing, hosting, analytics). These providers are
                    contractually obligated to protect your data</li>
                  <li><strong>Healthcare Facilities:</strong> When you book a ride to or from a
                    medical facility, we may share limited ride information (pickup time,
                    passenger name) with that facility to coordinate your transportation</li>
                  <li><strong>Insurance and Medicaid:</strong> For rides billed to insurance or
                    Medicaid, we share necessary trip and passenger information with the
                    applicable payer as required for claims processing</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if
                    required by law, court order, or governmental regulation, or when we
                    believe disclosure is necessary to protect our rights, your safety, or
                    the safety of others</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition,
                    or sale of assets, your information may be transferred as part of that
                    transaction. We will notify you of any such change</li>
                </ul>
              </div>

              {/* 5. Data Security */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  5. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction. These measures include encrypted data transmission (HTTPS/TLS),
                  secure password hashing, access controls, and regular security assessments.
                  However, no method of transmission over the internet or electronic storage is
                  completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* 6. Data Retention */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  6. Data Retention
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the
                  purposes for which it was collected, including to satisfy legal, regulatory,
                  accounting, or reporting requirements. Ride records and associated billing
                  information may be retained for up to seven (7) years in accordance with
                  healthcare industry record-keeping standards and applicable state and federal
                  regulations. You may request deletion of your account data by contacting us at
                  the email address listed below, subject to our legal retention obligations.
                </p>
              </div>

              {/* 7. Health Information Considerations */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  7. Health Information Considerations
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  While {SITE_NAME} is a transportation service provider and not a healthcare
                  provider or health plan, we recognize that the information collected during the
                  booking process may include health-related details (such as mobility needs,
                  medical appointment types, and insurance information). We treat this
                  information with the highest level of care and confidentiality:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>We limit access to health-related information to staff members who need it
                    to coordinate your transportation</li>
                  <li>We do not use health-related information for marketing purposes</li>
                  <li>We train our staff on the importance of protecting sensitive personal and
                    health information</li>
                  <li>We do not disclose health-related information except as necessary to
                    provide transportation services or as required by law</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  If you have questions about how your health-related information is handled,
                  please contact us directly.
                </p>
              </div>

              {/* 8. Your Rights */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  8. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Depending on your location, you may have certain rights regarding your personal
                  information, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>The right to access the personal information we hold about you</li>
                  <li>The right to request correction of inaccurate information</li>
                  <li>The right to request deletion of your personal information (subject to
                    legal retention requirements)</li>
                  <li>The right to withdraw consent for data processing</li>
                  <li>The right to opt out of marketing communications</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  To exercise any of these rights, please contact us at{' '}
                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="text-primary hover:underline"
                  >
                    {BUSINESS_EMAIL}
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </div>

              {/* 9. Children's Privacy */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website and booking system are not directed to individuals under the age
                  of 18. We do transport minor passengers when accompanied by or booked by a
                  parent or legal guardian. We do not knowingly collect personal information
                  from children under 13 without parental consent. If we become aware that we
                  have collected information from a child under 13 without verification of
                  parental consent, we will take steps to delete that information.
                </p>
              </div>

              {/* 10. Third-Party Links */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  10. Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites, including Google Maps,
                  social media platforms, and healthcare facility websites. We are not
                  responsible for the privacy practices or content of these external sites. We
                  encourage you to review the privacy policies of any third-party websites you
                  visit.
                </p>
              </div>

              {/* 11. Changes to This Policy */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices, services, or legal requirements. When we make material changes, we
                  will update the &quot;Last updated&quot; date at the top of this page. We
                  encourage you to review this page periodically. Your continued use of our
                  website and services after any changes constitutes your acceptance of the
                  updated Privacy Policy.
                </p>
              </div>

              {/* 12. Contact Us */}
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
                  12. Contact Us About Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or
                  how we handle your personal information, please contact us:
                </p>
                <div className="bg-muted rounded-lg p-6 space-y-2">
                  <p className="text-foreground font-semibold">{SITE_NAME}</p>
                  <p className="text-muted-foreground">
                    Email:{' '}
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="text-primary hover:underline"
                    >
                      {BUSINESS_EMAIL}
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    Phone:{' '}
                    <a
                      href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
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
  )
}

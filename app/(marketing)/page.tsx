import { generatePageMetadata, generateLocalBusinessJsonLd } from '@/lib/seo'
import { SITE_NAME } from '@/lib/constants'
import { HeroSection } from '@/components/marketing/HeroSection'
import { TrustBadgesSection } from '@/components/marketing/TrustBadgesSection'
import { StatsSection } from '@/components/marketing/StatsSection'
import { ServicesSection } from '@/components/marketing/ServicesSection'
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection'
import { WhyChooseUsSection } from '@/components/marketing/WhyChooseUsSection'
import { ServiceAreaSection } from '@/components/marketing/ServiceAreaSection'

import { CTASection } from '@/components/marketing/CTASection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { ContactStripSection } from '@/components/marketing/ContactStripSection'

export const metadata = generatePageMetadata({
  title: `${SITE_NAME} | Safe, Reliable Medical Transportation in Ohio`,
  description:
    `${SITE_NAME} provides safe, reliable non-emergency medical transportation (NEMT) in Cincinnati, Mason, West Chester, Hamilton, Middletown, and surrounding Ohio areas. Book your ride today.`,
  path: '/',
})

export default function HomePage() {
  const jsonLd = generateLocalBusinessJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <TrustBadgesSection />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <ServiceAreaSection />

      <CTASection />
      <TestimonialsSection />
      <ContactStripSection />
    </>
  )
}

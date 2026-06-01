// --- Demo Mode Toggle ---
// Set NEXT_PUBLIC_DEMO_MODE=true in .env to switch to demo branding
const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// --- Brand Configurations ---
const CRT_OHIO_BRAND = {
  siteName: 'Care Ride Transportation',
  siteTagline: 'Safe, Reliable Non-Emergency Medical Transportation in Ohio',
  siteUrl: 'https://crtohio.com',
  siteDescription:
    'Care Ride Transportation provides safe, reliable non-emergency medical transportation (NEMT) in Cincinnati, Mason, West Chester, Hamilton, Middletown, and surrounding Ohio areas. Book your ride today.',
  businessPhone: '(513) 513-0403',
  businessPhoneRaw: '+5135130403',
  businessEmail: 'info@crtohio.com',
  businessAddress: 'Cincinnati, OH',
  businessAddressLocality: 'Cincinnati',
  businessAddressRegion: 'OH',
  businessHours: 'Mon–Fri: 6:00 AM – 8:00 PM | Sat: 7:00 AM – 5:00 PM | Sun: Closed',
  logoPath: '/CRTOhio-logo.png',
} as const

const MEDSTATS_BRAND = {
  siteName: 'MedStats Transportation',
  siteTagline: 'Safe, Reliable Non-Emergency Medical Transportation in Florida',
  siteUrl: 'https://medstatsbilling.com',
  siteDescription:
    'MedStats Transportation provides safe, reliable non-emergency medical transportation (NEMT) in Tampa, Brandon, Riverview, Lakeland, Clearwater, and surrounding Florida areas. Book your ride today.',
  businessPhone: '(888) 791-9424',
  businessPhoneRaw: '+18887919424',
  businessEmail: 'info@medstatsbilling.com',
  businessAddress: '4627 W. Sunset Blvd Tampa, FL 33629',
  businessAddressLocality: 'Tampa',
  businessAddressRegion: 'FL',
  businessHours: 'Mon–Fri: 6:00 AM – 8:00 PM | Sat: 7:00 AM – 5:00 PM | Sun: Closed',
  logoPath: '/Medstats-logo.png',
} as const

// --- Active Brand (auto-switches based on DEMO_MODE) ---
const BRAND = IS_DEMO ? MEDSTATS_BRAND : CRT_OHIO_BRAND

// --- Exported Constants ---
export const SITE_NAME = BRAND.siteName
export const SITE_TAGLINE = BRAND.siteTagline
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || BRAND.siteUrl
export const SITE_DESCRIPTION = BRAND.siteDescription
export const BUSINESS_PHONE = BRAND.businessPhone
export const BUSINESS_PHONE_RAW = BRAND.businessPhoneRaw
export const BUSINESS_EMAIL = BRAND.businessEmail
export const BUSINESS_ADDRESS = BRAND.businessAddress
export const BUSINESS_ADDRESS_LOCALITY = BRAND.businessAddressLocality
export const BUSINESS_ADDRESS_REGION = BRAND.businessAddressRegion
export const BUSINESS_HOURS = BRAND.businessHours
export const LOGO_PATH = BRAND.logoPath

export const EMERGENCY_DISCLAIMER =
  'For medical emergencies, call 911. We do not provide emergency ambulance services.'

export const BOOKING_DISCLAIMER =
  'Your ride request has been received. This is not a final confirmation. Our team will review your request and contact you shortly.'

// --- Service Areas (switches by demo mode) ---
export const SERVICE_AREAS = IS_DEMO
  ? ([
      { name: 'Tampa', slug: 'cincinnati' },
      { name: 'Brandon', slug: 'mason' },
      { name: 'Riverview', slug: 'west-chester' },
      { name: 'Lakeland', slug: 'liberty-township' },
      { name: 'Clearwater', slug: 'hamilton' },
      { name: 'St. Petersburg', slug: 'middletown' },
    ] as const)
  : ([
      { name: 'Cincinnati', slug: 'cincinnati' },
      { name: 'Mason', slug: 'mason' },
      { name: 'West Chester', slug: 'west-chester' },
      { name: 'Liberty Township', slug: 'liberty-township' },
      { name: 'Hamilton', slug: 'hamilton' },
      { name: 'Middletown', slug: 'middletown' },
    ] as const)

export const SERVICES = [
  {
    title: 'Ambulatory Transportation',
    slug: 'ambulatory',
    description: 'Door-to-door transportation for passengers who can walk independently or with minimal assistance.',
    icon: 'PersonStanding',
  },
  {
    title: 'Wheelchair Transportation',
    slug: 'wheelchair',
    description: 'ADA-compliant vehicles with wheelchair ramps and secure tie-down systems for safe transport.',
    icon: 'Accessibility',
  },
  {
    title: 'Dialysis Transportation',
    slug: 'dialysis',
    description: 'Reliable recurring rides to and from dialysis centers, scheduled around your treatment times.',
    icon: 'HeartPulse',
  },
  {
    title: 'Medical Appointments',
    slug: 'medical-appointments',
    description: 'On-time transportation to doctor visits, specialist appointments, and medical procedures.',
    icon: 'Stethoscope',
  },
  {
    title: 'Hospital Discharge',
    slug: 'hospital-discharge',
    description: 'Safe rides home after hospital stays, surgeries, or outpatient procedures.',
    icon: 'Hospital',
  },
  {
    title: 'Facility Transportation',
    slug: 'facility',
    description: 'Group and individual transportation for nursing homes, assisted living, and care facilities.',
    icon: 'Building2',
  },
  {
    title: 'Private Pay Rides',
    slug: 'private-pay',
    description: 'Self-pay medical transportation with transparent pricing. No insurance required.',
    icon: 'Wallet',
  },
  {
    title: 'Recurring Rides',
    slug: 'recurring',
    description: 'Scheduled recurring transportation for regular treatments, therapy sessions, and check-ups.',
    icon: 'CalendarClock',
  },
] as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Partner With Us', href: '/partner' },
  { label: 'Become a Driver', href: '/become-a-driver' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export const PRICING_CONFIG = {
  baseFareAmbulatory: 40,
  baseFareWheelchair: 75,
  perMileAmbulatory: 2.75,
  perMileWheelchair: 3.75,
  afterHoursMultiplier: 1.25,   // +25% on base (before 7am / after 7pm / weekends)
  buildingAssist: 10,
  stairs: 15,
  waitGraceMinutes: 10,
  waitPerMinute: 0.5,
  roundTripDiscount: 0.9,       // 10% off total
} as const

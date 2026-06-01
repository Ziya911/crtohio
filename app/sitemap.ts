import type { MetadataRoute } from 'next'
import { SERVICES, SERVICE_AREAS, SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  const staticPages = [
    '',
    '/about',
    '/services',
    '/service-areas',
    '/pricing',
    '/faq',
    '/contact',
    '/partner',
    '/become-a-driver',
    '/privacy',
    '/terms',
    '/accessibility',
    '/book',
  ]

  const servicePages = SERVICES.map((s) => `/services/${s.slug}`)
  const areaPages = SERVICE_AREAS.map((a) => `/service-areas/${a.slug}`)

  const allPages = [...staticPages, ...servicePages, ...areaPages]

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/services/') || path.startsWith('/service-areas/') ? 0.8 : 0.7,
  }))
}

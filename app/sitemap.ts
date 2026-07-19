import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://artecai.it'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/cookie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/termini`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}

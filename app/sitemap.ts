import type { MetadataRoute } from 'next';
import { areRegistrationsEnabled } from '@/lib/site-settings';

const BASE_URL = 'https://www.tcvernouillet.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const registrationsEnabled = await areRegistrationsEnabled();
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/ecole-de-tennis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/terrains`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/calendrier`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/cgv`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  if (registrationsEnabled) {
    routes.splice(4, 0, {
      url: `${BASE_URL}/inscription`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }

  return routes;
}

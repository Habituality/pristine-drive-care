// src/config/seo.ts
// Central SEO-konfiguration – ett ställe för domän och helpers.
// Uppdatera SEO_BASE_URL om domänen ändras, inget annat behöver ändras.

export const SEO_BASE_URL = "https://glanziostockholm.se";

/** Standard OG-bild (1200×630 px, placeras i /public/og-image.jpg) */
export const SEO_DEFAULT_IMAGE = `${SEO_BASE_URL}/og-image.jpg`;

/** Bygger en absolut canonical URL från en relativ sökväg, t.ex. "/galleri" */
export const makeCanonical = (path: string): string =>
  `${SEO_BASE_URL}${path}`;

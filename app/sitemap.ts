import { MetadataRoute } from "next";
import { getArtists, getExhibitions } from "@/services/dbService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aryanartgallery.com";

  const staticRoutes = [
    "",
    "/artists",
    "/exhibitions",
    "/events",
    "/press",
    "/publications",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const artists = await getArtists();
    const artistRoutes = artists.map((a) => ({
      url: `${baseUrl}/artists/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const exhibitions = await getExhibitions();
    const exhibitionRoutes = exhibitions.map((e) => ({
      url: `${baseUrl}/exhibitions/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...artistRoutes, ...exhibitionRoutes];
  } catch (error) {
    console.error("Sitemap generation error, compiling static index routes:", error);
    return staticRoutes;
  }
}

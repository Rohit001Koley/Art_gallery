import { NextResponse } from "next/server";
import { getArtists, getArtworks } from "@/services/dbService";
import { sanitizeInput } from "@/lib/security";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "artists";
    const q = sanitizeInput(searchParams.get("q") || "").trim().toLowerCase();

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    if (category === "artists") {
      const artists = await getArtists();
      const results = artists
        .filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.nationality.toLowerCase().includes(q) ||
            a.style.toLowerCase().includes(q)
        )
        .map((a) => ({
          type: "artist",
          title: a.name,
          subtitle: `${a.nationality} • ${a.style}`,
          slug: a.slug,
          image: a.image,
        }));
      return NextResponse.json({ results });
    } else if (category === "subjects") {
      const artworks = await getArtworks();
      
      // Filter by subject, medium or title
      const results = artworks
        .filter(
          (w) =>
            w.subject.toLowerCase().includes(q) ||
            w.title.toLowerCase().includes(q) ||
            w.medium.toLowerCase().includes(q)
        )
        .map((w) => ({
          type: "artwork",
          id: w.id,
          title: w.title,
          subtitle: `${w.medium} (${w.year})`,
          slug: w.slug,
          image: w.image,
        }));

      // Unique results (in case duplicates occur)
      return NextResponse.json({ results });
    }

    return NextResponse.json({ results: [] });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

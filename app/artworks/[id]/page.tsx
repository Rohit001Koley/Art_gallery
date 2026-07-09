import { notFound } from "next/navigation";
import ArtworkDetailClient from "@/components/ArtworkDetail/ArtworkDetailClient";
import { getArtworkById, getArtists } from "@/services/dbService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const artwork = await getArtworkById(id);
  if (!artwork) return { title: "Artwork Not Found" };

  return {
    title: `${artwork.title} (${artwork.year})`,
    description: artwork.description,
  };
}

export default async function ArtworkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const artwork = await getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  // Find the artist info
  const artists = await getArtists();
  const artist = artists.find((a) => a.id === artwork.artistId) || null;

  return <ArtworkDetailClient artwork={artwork} artist={artist} />;
}

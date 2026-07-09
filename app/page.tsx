import HomeClient from "@/components/Home/HomeClient";
import {
  getArtists,
  getArtworks,
  getExhibitions,
  getEvents,
  getPublications,
} from "@/services/dbService";

export const revalidate = 60; // SSR Cache Revalidation every 60 seconds

export default async function Home() {
  const [artists, artworks, exhibitions, events, publications] = await Promise.all([
    getArtists(),
    getArtworks(),
    getExhibitions(),
    getEvents(),
    getPublications(),
  ]);

  return (
    <HomeClient
      artists={artists}
      artworks={artworks}
      exhibitions={exhibitions}
      events={events}
      publications={publications}
    />
  );
}

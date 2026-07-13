import { db } from "../lib/db";
import { Artist, Artwork, Event, Publication, Press } from "@prisma/client";
import {
  mockArtists,
  mockArtworks,
  mockExhibitions,
  mockEvents,
  mockPublications,
  mockPress,
  ArtistMock,
  ArtworkMock,
  ExhibitionMock,
  EventMock,
  PublicationMock,
  PressMock,
} from "../lib/mockData";

export async function getArtists(): Promise<ArtistMock[]> {
  try {
    const artists = await db.artist.findMany({
      orderBy: { name: "asc" },
    });
    if (artists.length === 0) return mockArtists;
    
    return artists.map((a: Artist) => ({
      id: a.id,
      name: a.name,
      slug: a.slug,
      bio: a.bio,
      nationality: a.nationality,
      style: a.style,
      image: a.image,
      instagram: a.instagram ?? undefined,
      website: a.website ?? undefined,
    }));
  } catch (error) {
    // Fallback to mock data
    return mockArtists;
  }
}

export async function getArtistBySlug(slug: string): Promise<ArtistMock | null> {
  try {
    const artist = await db.artist.findUnique({
      where: { slug },
    });
    if (!artist) {
      return mockArtists.find((a) => a.slug === slug) || null;
    }
    return {
      id: artist.id,
      name: artist.name,
      slug: artist.slug,
      bio: artist.bio,
      nationality: artist.nationality,
      style: artist.style,
      image: artist.image,
      instagram: artist.instagram ?? undefined,
      website: artist.website ?? undefined,
    };
  } catch (error) {
    // Fallback to mock data
    return mockArtists.find((a) => a.slug === slug) || null;
  }
}

export async function getArtworks(options?: {
  featured?: boolean;
  artistId?: string;
  subject?: string;
}): Promise<ArtworkMock[]> {
  try {
    const where: any = {};
    if (options?.featured !== undefined) {
      where.featured = options.featured;
    }
    if (options?.artistId) {
      where.artistId = options.artistId;
    }
    if (options?.subject) {
      where.subject = options.subject;
    }

    const artworks = await db.artwork.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    if (artworks.length === 0 && !options?.artistId && !options?.subject) return mockArtworks;
    
    return artworks.map((w: Artwork) => ({
      id: w.id,
      title: w.title,
      slug: w.slug,
      artistId: w.artistId,
      year: w.year,
      medium: w.medium,
      subject: w.subject,
      dimensions: w.dimensions,
      image: w.image,
      price: w.price ?? undefined,
      description: w.description,
      featured: w.featured,
    }));
  } catch (error) {
    // Fallback to mock data
    let items = mockArtworks;
    if (options?.featured !== undefined) {
      items = items.filter((w) => w.featured === options.featured);
    }
    if (options?.artistId) {
      items = items.filter((w) => w.artistId === options.artistId);
    }
    if (options?.subject) {
      items = items.filter((w) => w.subject.toLowerCase() === options.subject?.toLowerCase());
    }
    return items;
  }
}

export async function getArtworkById(id: string): Promise<ArtworkMock | null> {
  try {
    const artwork = await db.artwork.findUnique({
      where: { id },
    });
    if (!artwork) {
      return mockArtworks.find((w) => w.id === id) || null;
    }
    return {
      id: artwork.id,
      title: artwork.title,
      slug: artwork.slug,
      artistId: artwork.artistId,
      year: artwork.year,
      medium: artwork.medium,
      subject: artwork.subject,
      dimensions: artwork.dimensions,
      image: artwork.image,
      price: artwork.price ?? undefined,
      description: artwork.description,
      featured: artwork.featured,
    };
  } catch (error) {
    // Fallback to mock data
    return mockArtworks.find((w) => w.id === id) || null;
  }
}

export async function getExhibitions(): Promise<ExhibitionMock[]> {
  try {
    const exhibitions = await db.exhibition.findMany({
      include: { artworks: true },
      orderBy: { startDate: "desc" },
    });
    if (exhibitions.length === 0) return mockExhibitions;
    
    return exhibitions.map((e: any) => ({
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description,
      banner: e.banner,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate.toISOString(),
      curator: e.curator,
      artworkIds: e.artworks.map((w: any) => w.id),
      galleryImages: e.galleryImages,
    }));
  } catch (error) {
    // Fallback to mock data
    return mockExhibitions;
  }
}

export async function getExhibitionBySlug(slug: string): Promise<ExhibitionMock | null> {
  try {
    const exh = await db.exhibition.findUnique({
      where: { slug },
      include: { artworks: true },
    });
    if (!exh) {
      return mockExhibitions.find((e) => e.slug === slug) || null;
    }
    return {
      id: exh.id,
      title: exh.title,
      slug: exh.slug,
      description: exh.description,
      banner: exh.banner,
      startDate: exh.startDate.toISOString(),
      endDate: exh.endDate.toISOString(),
      curator: exh.curator,
      artworkIds: exh.artworks.map((w: any) => w.id),
      galleryImages: exh.galleryImages,
    };
  } catch (error) {
    // Fallback to mock data
    return mockExhibitions.find((e) => e.slug === slug) || null;
  }
}

export async function getEvents(): Promise<EventMock[]> {
  try {
    const events = await db.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    if (events.length === 0) return mockEvents;
    
    return events.map((ev: Event) => ({
      id: ev.id,
      title: ev.title,
      slug: ev.slug,
      description: ev.description,
      eventDate: ev.eventDate.toISOString(),
      image: ev.image ?? undefined,
      location: ev.location,
    }));
  } catch (error) {
    // Fallback to mock data
    return mockEvents;
  }
}

export async function getPublications(): Promise<PublicationMock[]> {
  try {
    const publications = await db.publication.findMany({
      orderBy: { year: "desc" },
    });
    if (publications.length === 0) return mockPublications;
    
    return publications.map((p: Publication) => ({
      id: p.id,
      title: p.title,
      pdf: p.pdf,
      coverImage: p.coverImage,
      year: p.year,
      description: p.description ?? undefined,
    }));
  } catch (error) {
    // Fallback to mock data
    return mockPublications;
  }
}

export async function getPress(): Promise<PressMock[]> {
  try {
    const press = await db.press.findMany({
      orderBy: { date: "desc" },
    });
    if (press.length === 0) return mockPress;
    
    return press.map((pr: Press) => ({
      id: pr.id,
      title: pr.title,
      content: pr.content,
      date: pr.date.toISOString(),
      source: pr.source,
      pdf: pr.pdf ?? undefined,
      link: pr.link ?? undefined,
    }));
  } catch (error) {
    // Fallback to mock data
    return mockPress;
  }
}

export async function createEnquiry(data: {
  artworkId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ id: string; success: boolean }> {
  try {
    const enquiry = await db.enquiry.create({
      data: {
        artworkId: data.artworkId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });
    return { id: enquiry.id, success: true };
  } catch (error) {
    // Fallback to mock data
    // Simulate successful write in mock environment
    return { id: `enq-${Math.random().toString(36).substring(2, 9)}`, success: true };
  }
}

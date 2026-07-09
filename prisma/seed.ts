import { PrismaClient } from "@prisma/client";
import { mockArtists, mockArtworks, mockExhibitions, mockEvents, mockPublications, mockPress } from "../lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");
  await prisma.enquiry.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.publication.deleteMany({});
  await prisma.press.deleteMany({});
  await prisma.exhibition.deleteMany({});
  await prisma.artwork.deleteMany({});
  await prisma.artist.deleteMany({});

  console.log("Seeding artists...");
  for (const a of mockArtists) {
    await prisma.artist.create({
      data: {
        id: a.id,
        name: a.name,
        slug: a.slug,
        bio: a.bio,
        nationality: a.nationality,
        style: a.style,
        image: a.image,
        instagram: a.instagram,
        website: a.website,
      },
    });
  }

  console.log("Seeding artworks...");
  for (const w of mockArtworks) {
    await prisma.artwork.create({
      data: {
        id: w.id,
        title: w.title,
        slug: w.slug,
        artistId: w.artistId,
        year: w.year,
        medium: w.medium,
        subject: w.subject,
        dimensions: w.dimensions,
        image: w.image,
        price: w.price,
        description: w.description,
        featured: w.featured,
      },
    });
  }

  console.log("Seeding exhibitions...");
  for (const e of mockExhibitions) {
    await prisma.exhibition.create({
      data: {
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        banner: e.banner,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        curator: e.curator,
        galleryImages: e.galleryImages,
        artworks: {
          connect: e.artworkIds.map((id) => ({ id })),
        },
      },
    });
  }

  console.log("Seeding events...");
  for (const ev of mockEvents) {
    await prisma.event.create({
      data: {
        id: ev.id,
        title: ev.title,
        slug: ev.slug,
        description: ev.description,
        eventDate: new Date(ev.eventDate),
        image: ev.image,
        location: ev.location,
      },
    });
  }

  console.log("Seeding publications...");
  for (const p of mockPublications) {
    await prisma.publication.create({
      data: {
        id: p.id,
        title: p.title,
        pdf: p.pdf,
        coverImage: p.coverImage,
        year: p.year,
        description: p.description,
      },
    });
  }

  console.log("Seeding press...");
  for (const pr of mockPress) {
    await prisma.press.create({
      data: {
        id: pr.id,
        title: pr.title,
        content: pr.content,
        date: new Date(pr.date),
        source: pr.source,
        pdf: pr.pdf,
        link: pr.link,
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

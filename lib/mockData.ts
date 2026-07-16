export interface ArtistMock {
  id: string;
  name: string;
  slug: string;
  bio: string;
  nationality: string;
  style: string;
  image: string;
  instagram?: string;
  website?: string;
}

export interface ArtworkMock {
  id: string;
  title: string;
  slug: string;
  artistId: string;
  year: string;
  medium: string;
  subject: string;
  dimensions: string;
  image: string;
  price?: string;
  description: string;
  featured: boolean;
}

export interface ExhibitionMock {
  id: string;
  title: string;
  slug: string;
  description: string;
  banner: string;
  startDate: string;
  endDate: string;
  curator: string;
  artworkIds: string[];
  galleryImages: string[];
}

export interface EventMock {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  image?: string;
  location: string;
}

export interface PublicationMock {
  id: string;
  title: string;
  pdf: string;
  coverImage: string;
  year: string;
  description?: string;
}

export interface PressMock {
  id: string;
  title: string;
  content: string;
  date: string;
  source: string;
  pdf?: string;
  link?: string;
}

export const mockArtists: ArtistMock[] = [
  {
    id: "art-1",
    name: "Alexandre Dubois",
    slug: "alexandre-dubois",
    bio: "Alexandre Dubois is a French neo-classical painter who merges traditional 18th-century portraiture techniques with contemporary surrealist elements. His work invites viewers into a dreamlike sphere where history and modern identity intersect, using delicate glazes and dramatic chiaroscuro.",
    nationality: "French",
    style: "Neo-Classical Surrealism",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    instagram: "alexandredubois_art",
    website: "https://alexandredubois.art",
  },
  {
    id: "art-2",
    name: "Elena Rostova",
    slug: "elena-rostova",
    bio: "Born in St. Petersburg and currently working in London, Elena Rostova uses vibrant palette knives and thick impasto layers to create textured abstract landscapes. Her paintings capture the emotional resonance of space, light, and movement, capturing natural phenomena in their purest forms.",
    nationality: "Russian / British",
    style: "Textured Expressionist Abstraction",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    instagram: "elena_rostova_paintings",
    website: "https://elenarostova.art",
  },
  {
    id: "art-3",
    name: "Marcus Aurelius Vance",
    slug: "marcus-vance",
    bio: "Marcus Vance is a sculptor and installation artist who explores structural minimalism, mass, and tension. Working primarily with raw steel, Italian marble, and cast bronze, Vance creates silent monolithic structures that interact with natural lighting and architectural dimensions.",
    nationality: "American",
    style: "Structural Minimalism & Sculpture",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    instagram: "marcusvance_sculpts",
  },
  {
    id: "art-4",
    name: "Sofia Chen",
    slug: "sofia-chen",
    bio: "Sofia Chen bridges Eastern ink-wash painting traditions with Western abstract expressionism. Her massive canvas compositions use raw pigment, charcoal, and ink to investigate themes of heritage, nature, and the flowing transience of memory.",
    nationality: "Taiwanese / Canadian",
    style: "Contemporary Ink Abstraction",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
    instagram: "sofiachen_ink",
    website: "https://sofiachen.studio",
  },
  {
    id: "art-5",
    name: "Jean-Pierre Cloutier",
    slug: "jean-pierre-cloutier",
    bio: "Jean-Pierre Cloutier is a Montreal-based sculptor focusing on geometric abstractions using hand-carved basalt, polished limestone, and linear wire. His work challenges the boundaries between architectural weight and gravity, inviting visitors to experience space from new structural perspectives.",
    nationality: "Canadian / French",
    style: "Geometric Basalt Sculpture",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    instagram: "jpcloutier_sculpture",
    website: "https://jpcloutier.studio",
  },
  {
    id: "art-6",
    name: "Amara Okafor",
    slug: "amara-okafor",
    bio: "Amara Okafor integrates traditional West African weaving with modern canvas structures. Working with natural jute, hand-dyed linen, and copper threads, she creates large-scale tapestries exploring ancestral memory, cultural migration, and material heritage.",
    nationality: "Nigerian / British",
    style: "Contemporary Textile Tapestry",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
    instagram: "amara_okafor_art",
  },
  {
    id: "art-7",
    name: "Hiroshi Tanaka",
    slug: "hiroshi-tanaka",
    bio: "Hiroshi Tanaka is an installation artist working with neon, long-exposure photography, and space. His atmospheric installations study the subtle interaction between transient light and dark spaces, creating immersive sensory experiences for the viewers.",
    nationality: "Japanese",
    style: "Conceptual Light & Space Installation",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400",
    instagram: "hiroshi_light_art",
    website: "https://hiroshitanaka.jp",
  },
  {
    id: "art-8",
    name: "Beatriz Gomez",
    slug: "beatriz-gomez",
    bio: "Beatriz Gomez combines bold gestures, structural oil stick applications, and raw linen borders to create emotional narratives. Her works depict structural silhouettes wrestling with empty backgrounds, capturing intense internal dialogues.",
    nationality: "Spanish",
    style: "Gestural Neo-expressionism",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
    instagram: "beatriz_gomez_paintings",
  },
];

export const mockArtworks: ArtworkMock[] = [
  {
    id: "work-1",
    title: "The Silent Canopy",
    slug: "the-silent-canopy",
    artistId: "art-2",
    year: "2024",
    medium: "Oil and Acrylic on Canvas",
    subject: "Abstract Landscape",
    dimensions: "150 x 180 cm",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800",
    price: "$14,500",
    description: "An exploration of forest canopies during twilight. Rostova uses thick palette knife strokes to capture the filtering of golden rays through dense, dark leaves, creating a heavy, majestic atmosphere of solitude.",
    featured: true,
  },
  {
    id: "work-2",
    title: "Portrait of a Golden Shadow",
    slug: "portrait-of-a-golden-shadow",
    artistId: "art-1",
    year: "2025",
    medium: "Oil on Linen Panel",
    subject: "Neo-Classical Portrait",
    dimensions: "90 x 110 cm",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800",
    price: "$18,000",
    description: "This masterful portrait blends traditional oil glazing techniques with modern abstract overlays. A gold leaf halo floats behind the subject, representing the hidden divinity in ordinary moments.",
    featured: true,
  },
  {
    id: "work-3",
    title: "Tension in Stone IV",
    slug: "tension-in-stone-iv",
    artistId: "art-3",
    year: "2023",
    medium: "Carrara Marble and Corten Steel",
    subject: "Minimalist Sculpture",
    dimensions: "180 x 60 x 60 cm",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800",
    price: "$22,500",
    description: "A monumental marble monolith balances precariously inside a weathered rust-colored steel cage. Vance explores the contrast between the eternal, polished white marble and the organic, decaying steel.",
    featured: false,
  },
  {
    id: "work-4",
    title: "Echoes of the River",
    slug: "echoes-of-the-river",
    artistId: "art-4",
    year: "2025",
    medium: "Chinese Ink and Pigment on Canvas",
    subject: "Contemporary Landscape",
    dimensions: "200 x 200 cm",
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=800",
    price: "$19,500",
    description: "A sprawling masterpiece referencing the flowing water of the Yangtze. The mix of heavy charcoal wash and bright gold pigment highlights the flow of memory over time.",
    featured: true,
  },
  {
    id: "work-5",
    title: "The Melancholic Voyager",
    slug: "the-melancholic-voyager",
    artistId: "art-1",
    year: "2024",
    medium: "Oil on Canvas",
    subject: "Surrealist Portrait",
    dimensions: "120 x 140 cm",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800",
    price: "$16,000",
    description: "A lone figure sits in an ornate 18th-century salon that is slowly filling with water, expressing themes of climate anxiety and historical loss.",
    featured: false,
  },
  {
    id: "work-6",
    title: "Neon Echoes",
    slug: "neon-echoes",
    artistId: "art-2",
    year: "2025",
    medium: "Mixed Media on Canvas",
    subject: "Urban Abstraction",
    dimensions: "100 x 120 cm",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800",
    price: "$9,200",
    description: "Elena Rostova shifts her focus to the urban night, capturing neon reflection glimmers on rain-slicked asphalt through intense red and deep burgundy brush strokes.",
    featured: false,
  },
];

export const mockExhibitions: ExhibitionMock[] = [
  {
    id: "exh-1",
    title: "Whispers of the Horizon",
    slug: "whispers-of-the-horizon",
    description: "An extraordinary survey of contemporary landscape painting, exploring how modern artists represent spatial boundaries and natural elements in an era of digital separation. Curated by Dr. Beatrice Moretti.",
    banner: "https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=1200",
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    curator: "Dr. Beatrice Moretti",
    artworkIds: ["work-1", "work-4"],
    galleryImages: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800",
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800",
    ],
  },
  {
    id: "exh-2",
    title: "Echoes of Identity",
    slug: "echoes-of-identity",
    description: "An exploration of human form, portraiture, and presence, bridging historical styles with modern narratives of fragmentation. Curated by Julian Vance.",
    banner: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200",
    startDate: "2026-09-15T00:00:00.000Z",
    endDate: "2026-11-15T00:00:00.000Z",
    curator: "Julian Vance",
    artworkIds: ["work-2", "work-5"],
    galleryImages: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
    ],
  },
];

export const mockEvents: EventMock[] = [
  {
    id: "ev-1",
    title: "Opening Reception: Whispers of the Horizon",
    slug: "opening-reception-whispers",
    description: "Join us for the official opening reception of 'Whispers of the Horizon'. The evening will feature opening remarks by curator Dr. Beatrice Moretti and exhibiting artists Elena Rostova and Sofia Chen. Wine and Hors d'oeuvres will be served.",
    eventDate: "2026-06-01T18:00:00.000Z",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    location: "Main Gallery Wing & Sculpture Garden",
  },
  {
    id: "ev-2",
    title: "Artist Panel: The Evolution of Minimalism",
    slug: "artist-panel-minimalism",
    description: "A panel discussion exploring the trajectory of minimalist sculpture from the 1960s to today. Featuring Marcus Vance and guest panelist Prof. Arthur Sterling from the Royal College of Art.",
    eventDate: "2026-07-20T14:00:00.000Z",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800",
    location: "Gallery Auditorium",
  },
];

export const mockPublications: PublicationMock[] = [
  {
    id: "pub-1",
    title: "Alexandre Dubois: Classical Dialogues",
    pdf: "/documents/alexandre-dubois-catalog.pdf",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400",
    year: "2025",
    description: "A 120-page monograph documenting Dubois' paintings from 2018 to 2025, featuring essays by leading art historians.",
  },
  {
    id: "pub-2",
    title: "Whispers of the Horizon - Exhibition Brochure",
    pdf: "/documents/whispers-horizon-brochure.pdf",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400",
    year: "2026",
    description: "The complete visual program and curator's guide for the Summer 2026 landscape showcase.",
  },
];

export const mockPress: PressMock[] = [
  {
    id: "pr-1",
    title: "Aryan Art Gallery Announces Summer 2026 Landscape Survey Exhibition",
    content: "Aryan Art Gallery is pleased to announce 'Whispers of the Horizon', a major exhibition running from June 1 to August 31, 2026, bringing together five international artists exploring landscape painting through modern lenses.",
    date: "2026-05-10T00:00:00.000Z",
    source: "Artforum International",
    pdf: "/press/press_release_summer_2026.pdf",
  },
  {
    id: "pr-2",
    title: "An Interview with Sculptor Marcus Vance on Monolithic Balance",
    content: "We sit down with sculptor Marcus Vance to discuss his latest series 'Tension in Stone', current exhibitions at Aryan Art Gallery, and the dialogue between Carrara marble and industrial Corten steel.",
    date: "2026-06-25T00:00:00.000Z",
    source: "The Art Newspaper",
    link: "https://theartnewspaper.example.com/marcus-vance-interview",
  },
];

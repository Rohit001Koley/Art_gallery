import { MapPin, Mail, Phone, Clock, Award, History, Users, Compass } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about the curatorial history, mission, team, and contact information for Aryan Art Gallery.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Beatrice Moretti",
      role: "Lead Curator &amp; Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
      bio: "Dr. Moretti holds a PhD in Art History from the Sorbonne. She has curated international biennials and oversees the gallery's contemporary landscape catalog.",
    },
    {
      name: "Julian Vance",
      role: "Director of Acquisitions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
      bio: "With over 15 years in private fine art consulting, Julian advises major private foundations and manages the gallery's neoclassical collection.",
    },
    {
      name: "Claire Chen-Lafayette",
      role: "Registrar &amp; Logistics Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
      bio: "Claire coordinates global shipping, restoration condition reports, and custom museum-grade installations for acquisitions.",
    },
  ];

  const milestones = [
    {
      year: "2012",
      title: "Gallery Founding",
      desc: "Aryan Art Gallery was established in Paris, displaying French neoclassicist works to private collectors.",
    },
    {
      year: "2016",
      title: "London Relocation",
      desc: "Opened our flagship Mayfair space, expanding representation to include contemporary abstract expressionism.",
    },
    {
      year: "2020",
      title: "Venice Biennial Alliance",
      desc: "Partnered to support the Central Exhibition program, launching our digital monographs imprint.",
    },
    {
      year: "2024",
      title: "Sculpture Pavilion Expansion",
      desc: "Inaugurated the dedicated courtyard wing, representing modernist minimalist sculptors.",
    },
  ];

  const handleMapClick = () => {
    const mapUrl =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      "https://maps.google.com/?q=Aryan+Art+Gallery+Mayfair+London";
    // NextJS Client action triggers window open
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* 1. Page Header */}
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-xs font-semibold uppercase tracking-luxury text-primary">The Institution</span>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-luxury font-light text-foreground mt-1">
          About Aryan Art Gallery
        </h1>
      </div>

      {/* 2. Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div className="lg:col-span-8 space-y-6 text-sm text-muted-foreground leading-relaxed leading-7">
          <h2 className="text-xl font-serif font-semibold text-foreground flex items-center">
            <History className="h-5 w-5 text-primary mr-2.5" />
            Our History &amp; Vision
          </h2>
          <p>
            Established in 2012, Aryan Art Gallery has dedicated itself to presenting fine artworks that challenge conventional spatial dimensions and explore neo-classical surrealist motifs. We operate on a foundation of aesthetic excellence, curating programs that bring historical methods into dialogue with the abstract tendencies of today.
          </p>
          <p>
            With our flagship space located in the historic heart of London&apos;s Mayfair district, the gallery serves as a quiet sanctuary for collectors, scholars, and art lovers. Our curatorial focus bridges classical craftsmanship with minimalism, offering a distinct vision in a fast-evolving contemporary landscape.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-foreground">
            <div className="p-5 border border-border rounded bg-stone-50 dark:bg-stone-900/10 space-y-2">
              <span className="text-primary font-serif font-bold text-lg flex items-center">
                <Compass className="h-5 w-5 mr-2" />
                Our Mission
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To identify, represent, and cultivate international artists who combine rigorous physical skills with deep philosophical reflection.
              </p>
            </div>
            <div className="p-5 border border-border rounded bg-stone-50 dark:bg-stone-900/10 space-y-2">
              <span className="text-primary font-serif font-bold text-lg flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Our Achievements
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Honored with the London Fine Art Preservation Award and recognized for producing museum-grade monographs and publications.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery space mock snapshot */}
        <div className="lg:col-span-4 aspect-square bg-muted border border-border overflow-hidden rounded-sm shadow-sm relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600"
            alt="Aryan Art Gallery Space"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Timeline Milestones Section */}
      <div className="space-y-8 mb-20 border-t border-border pt-16">
        <h2 className="text-2xl font-serif font-light tracking-luxury text-foreground">
          Historical Timeline
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((stone, idx) => (
            <div key={idx} className="relative p-5 border border-border bg-card rounded flex flex-col space-y-3">
              <span className="text-3xl font-serif italic font-bold text-primary/45">{stone.year}</span>
              <h4 className="font-serif font-bold text-foreground text-sm">{stone.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{stone.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Curatorial Team Section */}
      <div className="space-y-8 mb-20 border-t border-border pt-16">
        <div className="flex items-center space-x-3">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-serif font-light tracking-luxury text-foreground">
            Gallery Directors &amp; Staff
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col border border-border rounded-sm bg-card p-5 space-y-4">
              <div className="aspect-[4/5] bg-muted overflow-hidden border border-border/60 rounded">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-foreground text-base">{member.name}</h4>
                <p className="text-xs text-primary uppercase tracking-wider font-semibold">{member.role}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed leading-5">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Contact Section (#contact) */}
      <div id="contact" className="space-y-8 border-t border-border pt-16 scroll-mt-20">
        <h2 className="text-2xl font-serif font-light tracking-luxury text-foreground">
          Contact &amp; Visit Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 border border-border bg-card p-6 md:p-8 rounded flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-foreground text-lg">Aryan Art Gallery</h3>
                <p className="text-xs text-muted-foreground">London Imprint</p>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Our Address</p>
                    <p className="text-xs">12 Mayfair Gardens, London, W1S 4NS, United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Phone Number</p>
                    <p className="text-xs">+44 (20) 7946 0192</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Acquisition Inquiries</p>
                    <p className="text-xs">info@aryanartgallery.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-primary" />
                Open 10 AM &ndash; 6 PM
              </span>
              <a
                href="https://maps.google.com/?q=Aryan+Art+Gallery+Mayfair+London"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Open Google Maps &rarr;
              </a>
            </div>
          </div>

          {/* Interactive Map Embed Mock Container */}
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto border border-border bg-stone-50 dark:bg-stone-900/30 rounded overflow-hidden relative flex flex-col items-center justify-center p-6 text-center">
            {/* Visual background elements */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 filter grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')" }} />
            <div className="relative space-y-4 z-10 max-w-sm">
              <MapPin className="h-12 w-12 text-primary mx-auto animate-bounce" />
              <h4 className="font-serif font-bold text-foreground text-lg">Interactive Location Finder</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click below to open Google Maps navigation directly pointing to the gallery courtyard entry in London Mayfair.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://maps.google.com/?q=Aryan+Art+Gallery+Mayfair+London"}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2.5 bg-primary text-primary-foreground text-xs uppercase tracking-luxury hover:bg-primary/95 transition-all rounded font-semibold cursor-pointer"
              >
                Start Navigation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

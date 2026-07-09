"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, MapPin, User, Check, Sparkles, Clock } from "lucide-react";
import { getEvents } from "@/services/dbService";
import { mockEvents, EventMock } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

export default function EventsPage() {
  const [events, setEvents] = useState<EventMock[]>([]);
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  const handleRsvp = (eventId: string) => {
    setRsvpStatus((prev) => ({ ...prev, [eventId]: true }));
  };

  const now = new Date();

  const filteredEvents = events.filter((ev) => {
    const evDate = new Date(ev.eventDate);
    if (activeTab === "upcoming") return evDate >= now;
    if (activeTab === "past") return evDate < now;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-border pb-8 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-luxury text-primary">Gallery Calendar</span>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-luxury font-light text-foreground mt-1">
            Events &amp; Programs
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Join our panel debates, opening receptions, and curator-led walkthroughs designed for collectors and art enthusiasts.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex border border-border p-1 rounded bg-stone-100 dark:bg-stone-900/50 text-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`ml-1 px-4 py-2 rounded font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "upcoming" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`ml-1 px-4 py-2 rounded font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "past" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Events Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => {
            const isRsvped = rsvpStatus[ev.id];
            const evDate = new Date(ev.eventDate);
            const isPast = evDate < now;

            return (
              <div
                key={ev.id}
                className="border border-border bg-card rounded-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow h-full"
              >
                {/* Event Cover Image */}
                {ev.image ? (
                  <div className="w-full md:w-48 aspect-[16/10] md:aspect-square overflow-hidden bg-muted border-r border-border flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-48 aspect-[16/10] md:aspect-square bg-muted flex items-center justify-center border-r border-border flex-shrink-0 text-muted-foreground">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}

                {/* Event details block */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-xs text-primary font-semibold space-x-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(ev.eventDate)}</span>
                      <span className="text-muted-foreground">•</span>
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {evDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-foreground leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed leading-5">
                      {ev.description}
                    </p>

                    <div className="flex items-center text-xs text-muted-foreground space-x-1.5 pt-1">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    {isPast ? (
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider bg-stone-100 dark:bg-stone-800 px-2 py-0.5 border border-border">
                        Ended
                      </span>
                    ) : isRsvped ? (
                      <div className="flex items-center text-xs text-emerald-500 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded">
                        <Check className="h-4 w-4 mr-1.5" />
                        RSVP Confirmed
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRsvp(ev.id)}
                        className="px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold uppercase tracking-luxury rounded transition-all flex items-center cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        RSVP Now
                      </button>
                    )}

                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      Admission Free
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-16 text-muted-foreground border border-dashed border-border rounded">
            <p className="text-sm">No events listed for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

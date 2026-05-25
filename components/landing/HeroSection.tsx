// components/landing/HeroSection.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Info,
  Play,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimeItem } from "@/types/landing/types";

type HeroSectionProps = {
  anime: AnimeItem[];
  onOpenDetails: (anime: AnimeItem) => void;
};

export default function HeroSection({
  anime,
  onOpenDetails,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAnime = anime[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % anime.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? anime.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [anime.length]);

  if (!activeAnime) return null;

  return (
    <section className="w-full">
      <div className="relative min-h-[620px] w-full overflow-hidden bg-[#070713]">
        <div
          key={activeAnime.id}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${activeAnime.image})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#070713] via-[#070713]/85 to-[#070713]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070713] via-transparent to-[#070713]/30" />

        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-fuchsia-500 px-4 py-1.5 text-white hover:bg-fuchsia-500">
                Featured Anime
              </Badge>

              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur"
              >
                {activeAnime.year}
              </Badge>

              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur"
              >
                {activeAnime.category}
              </Badge>
            </div>

            <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {activeAnime.title}
            </h2>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                {activeAnime.rating}/10
              </span>

              <span>{activeAnime.votes} votes</span>
              <span>{activeAnime.episodes} episodes</span>
              <span>{activeAnime.duration}</span>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {activeAnime.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 text-base font-bold text-white shadow-lg shadow-fuchsia-500/25 hover:opacity-90">
                <Play className="mr-2 h-5 w-5 fill-white" />
                Play Now
              </Button>

              <Button
                variant="outline"
                className="h-12 rounded-2xl border-white/15 bg-white/10 px-7 text-base font-bold text-white backdrop-blur hover:bg-white/15 hover:text-white"
              >
                <Bookmark className="mr-2 h-5 w-5" />
                My List
              </Button>

              <Button
                onClick={() => onOpenDetails(activeAnime)}
                variant="outline"
                className="h-12 rounded-2xl border-white/15 bg-white/10 px-7 text-base font-bold text-white backdrop-blur hover:bg-white/15 hover:text-white"
              >
                <Info className="mr-2 h-5 w-5" />
                Info
              </Button>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-fuchsia-500/20 blur-2xl" />
              <img
                key={activeAnime.image}
                src={activeAnime.image}
                alt={activeAnime.title}
                className="relative h-[470px] w-[330px] rounded-[2rem] object-cover shadow-2xl transition-all duration-700"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:bg-black/70 md:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:bg-black/70 md:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {anime.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-9 bg-fuchsia-400"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
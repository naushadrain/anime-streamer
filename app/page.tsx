// app/page.tsx

"use client";

import { useState } from "react";
import { Clock, Flame, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AnimeRow from "@/components/landing/AnimeRow";
import GenreOffcanvas from "@/components/landing/GenreOffcanvas";
import AnimeDetailModal from "@/components/landing/AnimeDetailModal";
import ProfileModal from "@/components/landing/ProfileModal";
import ConfirmModal from "@/components/landing/ConfirmModal";
import { AnimeItem } from "@/types/landing/types";

const animeList: AnimeItem[] = [
  {
    id: "1",
    title: "Shadow Blade: The Last Moon",
    description:
      "A dark fantasy animated series where a young warrior discovers an ancient power hidden beneath a moonlit kingdom.",
    category: "Action",
    year: "2026",
    rating: "9.6",
    votes: "2.5K",
    episodes: "12",
    studio: "Nova Animation",
    director: "Akira Tanabe",
    duration: "24m",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Cyber Samurai: Neon City",
    description:
      "In a futuristic city filled with neon lights, a cyber samurai protects humans from rogue machines.",
    category: "Sci-Fi",
    year: "2026",
    rating: "9.2",
    votes: "1.8K",
    episodes: "10",
    studio: "Pixel Storm",
    director: "Hiro Kenta",
    duration: "18m",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "The Lost Dragon Kingdom",
    description:
      "A forgotten dragon kingdom rises again when a village girl unlocks a magical stone buried for centuries.",
    category: "Fantasy",
    year: "2025",
    rating: "8.9",
    votes: "950",
    episodes: "16",
    studio: "DreamFrame",
    director: "Mina Sato",
    duration: "32m",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Dream Hunter Academy",
    description:
      "Students enter dreams to fight nightmares before they escape into the real world.",
    category: "Anime",
    year: "2024",
    rating: "9.1",
    votes: "1.1K",
    episodes: "20",
    studio: "SkyLine Studio",
    director: "Ren Aoki",
    duration: "21m",
    image:
      "https://images.unsplash.com/photo-1618331833071-ce81bd50d300?q=80&w=900&auto=format&fit=crop",
  },
];

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Supernatural",
  "Slice of Life",
];

export default function HomePage() {
  const [genreOpen, setGenreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetails = (anime: AnimeItem) => {
    setSelectedAnime(anime);
    setDetailOpen(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070713] text-white">
      <Navbar
        onOpenProfile={() => setProfileOpen(true)}
        onOpenGenres={() => setGenreOpen(true)}
        onOpenMyList={() => setConfirmOpen(true)}
      />

      <HeroSection anime={animeList} onOpenDetails={openDetails} />
      <AnimeRow
        title="Continue Watching"
        icon={<Clock className="h-6 w-6 text-sky-400" />}
        items={animeList}
        onOpenDetails={openDetails}
      />

      <AnimeRow
        title="Top 10 This Week"
        icon={<Flame className="h-6 w-6 text-orange-400" />}
        items={animeList}
        onOpenDetails={openDetails}
      />

      <AnimeRow
        title="Trending Now"
        icon={<TrendingUp className="h-6 w-6 text-green-400" />}
        items={animeList}
        onOpenDetails={openDetails}
      />

      <AnimeRow
        title="New Releases"
        icon={<Sparkles className="h-6 w-6 text-fuchsia-400" />}
        items={animeList}
        onOpenDetails={openDetails}
      />

      <GenreOffcanvas
        open={genreOpen}
        onOpenChange={setGenreOpen}
        genres={genres}
      />

      <AnimeDetailModal
        anime={selectedAnime}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />

      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="My List"
        message="Your watchlist is empty. After adding anime, it will appear here."
        confirmText="Okay"
        onConfirm={() => setConfirmOpen(false)}
      />
    </main>
  )

}
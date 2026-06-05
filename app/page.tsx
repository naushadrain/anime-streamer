// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Clock, Flame, Sparkles, TrendingUp } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AnimeRow from "@/components/landing/AnimeRow";
import GenreOffcanvas from "@/components/landing/GenreOffcanvas";
import AnimeDetailModal from "@/components/landing/AnimeDetailModal";
import ProfileModal from "@/components/landing/ProfileModal";
import ConfirmModal from "@/components/landing/ConfirmModal";

import { AnimeItem } from "@/types/landing/types";

const API_BASE_URL = "https://floxanimeindia.com";

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

type HeroSliderApiItem = {
  id: string | number | null;
  title: string;
  description: string;
  category: string;
  year: string;
  rating: string;
  votes: string;
  episodes: string;
  studio: string | null;
  director: string | null;
  duration: string;
  image: string;
  status: number;
  sort_order: number;
};

type HeroSliderApiResponse = {
  status: boolean;
  message: string;
  data?: HeroSliderApiItem[];
  error?: string;
};

export default function HomePage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [genreOpen, setGenreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetails = (anime: AnimeItem) => {
    setSelectedAnime(anime);
    setDetailOpen(true);
  };

  const normalizeImageUrl = (image: string) => {
    if (!image) return "/logo.png";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_BASE_URL}${image}`;
    }

    return `${API_BASE_URL}/${image}`;
  };

  const getHeroSliders = async () => {
    try {
      setLoading(true);
      setApiError("");

      const response = await fetch(`${API_BASE_URL}/api/hero-sliders`, {
        method: "GET",
        cache: "no-store",
      });

      const result: HeroSliderApiResponse = await response.json();

      if (!response.ok || !result.status) {
        setApiError(result.message || "Failed to fetch hero sliders");
        setAnimeList([]);
        return;
      }

      const formattedData: AnimeItem[] = (result.data || [])
        .filter((item) => item.status === 1)
        .map((item, index) => ({
          id: item.id ? String(item.id) : `slider-${index + 1}`,
          title: item.title || "Untitled",
          description: item.description || "",
          category: item.category || "Anime",
          year: item.year || "",
          rating: item.rating || "0",
          votes: item.votes || "0",
          episodes: item.episodes || "0",
          studio: item.studio || null,
          director: item.director || null,
          duration: item.duration || "",
          image: normalizeImageUrl(item.image),
        }));

      setAnimeList(formattedData);
    } catch (error) {
      console.error("Hero slider fetch error:", error);
      setApiError("Something went wrong while fetching hero sliders");
      setAnimeList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeroSliders();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070713] text-white">
      <Navbar
        onOpenProfile={() => setProfileOpen(true)}
        onOpenGenres={() => setGenreOpen(true)}
        onOpenMyList={() => setConfirmOpen(true)}
      />

      {loading ? (
        <section className="flex min-h-[620px] items-center justify-center bg-[#070713] text-white">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-500" />
            <p className="mt-4 text-sm text-slate-400">
              Loading hero sliders...
            </p>
          </div>
        </section>
      ) : apiError ? (
        <section className="flex min-h-[620px] items-center justify-center bg-[#070713] px-4 text-white">
          <div className="max-w-md rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-sm font-semibold text-red-300">{apiError}</p>

            <button
              type="button"
              onClick={getHeroSliders}
              className="mt-5 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white"
            >
              Retry
            </button>
          </div>
        </section>
      ) : animeList.length > 0 ? (
        <HeroSection anime={animeList} onOpenDetails={openDetails} />
      ) : (
        <section className="flex min-h-[620px] items-center justify-center bg-[#070713] text-white">
          <p className="text-sm text-slate-400">No active sliders found.</p>
        </section>
      )}

      {animeList.length > 0 && (
        <>
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
        </>
      )}

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
  );
}
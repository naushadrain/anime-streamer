// components/landing/AnimeDetailModal.tsx

"use client";

import {
  Calendar,
  Clapperboard,
  Clock,
  Film,
  Info,
  Star,
  User,
  X,
} from "lucide-react";

import { AnimeItem } from "@/types/landing/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AnimeDetailModalProps = {
  anime: AnimeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type InfoBoxProps = {
  label: string;
  value?: string | number | null;
};

function InfoBox({ label, value }: InfoBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value ? String(value) : "N/A"}
      </p>
    </div>
  );
}

export default function AnimeDetailModal({
  anime,
  open,
  onOpenChange,
}: AnimeDetailModalProps) {
  if (!anime) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[92vh]
          w-[92vw]
          max-w-5xl
          overflow-y-auto
          border-white/10
          bg-[#080812]
          p-0
          text-white
          shadow-2xl
          sm:max-w-5xl
        "
      >
        <div className="relative">
          <div className="relative h-[320px] overflow-hidden rounded-t-lg">
            <img
              src={anime.image}
              alt={anime.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-[#080812]/70 to-transparent" />

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-fuchsia-500 px-4 py-1.5 text-white hover:bg-fuchsia-500">
                  {anime.category || "Anime"}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur"
                >
                  {anime.year || "N/A"}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur"
                >
                  {anime.duration || "N/A"}
                </Badge>
              </div>

              <DialogHeader>
                <DialogTitle className="text-3xl font-black leading-tight text-white sm:text-5xl">
                  {anime.title}
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-5 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  {anime.rating || "0"}/10
                </span>

                <span className="flex items-center gap-2">
                  <User className="h-5 w-5 text-slate-400" />
                  {anime.votes || "0"} votes
                </span>

                <span className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-slate-400" />
                  {anime.episodes || "0"} episodes
                </span>

                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  {anime.duration || "N/A"}
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5 text-fuchsia-300" />
                  <h3 className="text-lg font-black text-white">
                    Description
                  </h3>
                </div>

                <p className="text-base leading-8 text-slate-300">
                  {anime.description || "No description available."}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button className="h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 text-base font-bold text-white shadow-lg shadow-fuchsia-500/25 hover:opacity-90">
                  <Clapperboard className="mr-2 h-5 w-5" />
                  Watch Now
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/15 bg-white/10 px-7 text-base font-bold text-white backdrop-blur hover:bg-white/15 hover:text-white"
                >
                  Add to List
                </Button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-[420px] w-full object-cover"
                />
              </div>

              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
                <InfoBox label="Episodes" value={anime.episodes} />
                <InfoBox label="Studio" value={anime.studio} />
                <InfoBox label="Director" value={anime.director} />
                <InfoBox label="Duration" value={anime.duration} />
                <InfoBox label="Year" value={anime.year} />
                <InfoBox label="Category" value={anime.category} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
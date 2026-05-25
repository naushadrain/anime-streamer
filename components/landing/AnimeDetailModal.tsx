// components/landing/AnimeDetailModal.tsx

"use client";

import { Play, PlusCircle, Star } from "lucide-react";
import { AnimeItem } from "@/types/landing/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AnimeDetailModalProps = {
  anime: AnimeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

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
          w-[92vw]
          max-w-[1300px]
          max-h-[90vh]
          overflow-y-auto
          border-white/10
          bg-[#090918]
          p-0
          text-white
          shadow-2xl
          sm:max-w-[1300px]
          lg:w-[70vw]
          xl:w-[65vw]
        "
      >
        <div className="p-6 sm:p-8 lg:p-10">
          <DialogHeader className="mb-6 pr-10">
            <DialogTitle className="text-3xl font-black leading-tight text-white lg:text-4xl">
              {anime.title}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <img
                src={anime.image}
                alt={anime.title}
                className="h-[420px] w-full object-cover shadow-2xl"
              />

              <Button className="mt-4 h-12 w-full cursor-pointer rounded-2xl bg-fuchsia-500 text-white hover:bg-fuchsia-600">
                <Play className="mr-2 h-5 w-5 fill-white" />
                Watch Now
              </Button>

              <Button
                variant="outline"
                className="mt-3 h-12 w-full cursor-pointer rounded-2xl border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add to List
              </Button>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge className="bg-sky-500 px-3 py-1.5 text-white">
                  {anime.year}
                </Badge>

                <Badge className="bg-fuchsia-500 px-3 py-1.5 text-white">
                  {anime.category}
                </Badge>

                <Badge className="bg-yellow-400 px-3 py-1.5 text-black">
                  <Star className="mr-1 h-4 w-4 fill-black" />
                  {anime.rating}
                </Badge>
              </div>

              <p className="mb-5 text-sm text-slate-400">
                {anime.votes} votes
              </p>

              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <InfoBox label="Episodes" value={anime.episodes} />
                <InfoBox label="Studio" value={anime.studio} />
                <InfoBox label="Director" value={anime.director} />
                <InfoBox label="Duration" value={anime.duration} />
              </div>

              <h3 className="mt-7 text-xl font-black text-white">
                Description
              </h3>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                {anime.description}
              </p>

              <h3 className="mt-7 text-xl font-black text-white">
                Rating Breakdown
              </h3>

              <div className="mt-4 max-w-3xl space-y-4">
                <RatingBar label="9.0+" percent="65%" width="65%" color="bg-fuchsia-500" />
                <RatingBar label="7.0 - 9.0" percent="25%" width="25%" color="bg-sky-500" />
                <RatingBar label="Below 7.0" percent="10%" width="10%" color="bg-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-white">{value}</p>
    </div>
  );
}

function RatingBar({
  label,
  percent,
  width,
  color,
}: {
  label: string;
  percent: string;
  width: string;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span>{percent}</span>
      </div>

      <div className="h-2 rounded-full bg-white/10">
        <div className={`h-2 rounded-full ${color}`} style={{ width }} />
      </div>
    </div>
  );
}
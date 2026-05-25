// components/landing/AnimeCard.tsx

"use client";

import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimeItem } from "@/types/landing/types";

type AnimeCardProps = {
  anime: AnimeItem;
  onClick: (anime: AnimeItem) => void;
};

export default function AnimeCard({ anime, onClick }: AnimeCardProps) {
  return (
    <Card
      onClick={() => onClick(anime)}
      className="group w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-white shadow-none transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
        <img
          src={anime.image}
          alt={anime.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <Button
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onClick(anime);
          }}
          className="absolute left-1/2 top-1/2 h-13 w-13 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100 hover:bg-fuchsia-500"
        >
          <Play className="h-6 w-6 fill-white text-white" />
        </Button>

        <Badge className="absolute left-3 top-3 rounded-full border-0 bg-black/60 text-white backdrop-blur">
          {anime.category}
        </Badge>

        <Badge className="absolute right-3 top-3 rounded-full border-0 bg-black/60 text-white backdrop-blur">
          {anime.duration}
        </Badge>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="line-clamp-1 text-base font-black text-white">
            {anime.title}
          </h3>

          <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {anime.rating}
            </span>
            <span>{anime.year}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
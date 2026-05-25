// components/landing/AnimeRow.tsx

"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimeCard from "./AnimeCard";
import { AnimeItem } from "@/types/landing/types";

type AnimeRowProps = {
  title: string;
  icon?: React.ReactNode;
  items: AnimeItem[];
  onOpenDetails: (anime: AnimeItem) => void;
};

export default function AnimeRow({
  title,
  icon,
  items,
  onOpenDetails,
}: AnimeRowProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-black text-white">
          {icon}
          {title}
        </h2>

        <Button
          variant="ghost"
          className="rounded-2xl text-slate-300 hover:bg-white/10 hover:text-white"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-3">
        {items.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onClick={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
}
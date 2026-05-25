// components/landing/GenreOffcanvas.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type GenreOffcanvasProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  genres: string[];
};

export default function GenreOffcanvas({
  open,
  onOpenChange,
  genres,
}: GenreOffcanvasProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="border-white/10 bg-[#090918] text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Genres</SheetTitle>
        </SheetHeader>

        <div className="mt-6 grid gap-3">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant="ghost"
              className="justify-start rounded-2xl bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {genre}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
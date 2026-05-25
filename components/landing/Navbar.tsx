// components/landing/Navbar.tsx

"use client";

import { useState } from "react";
import { Bell, Film, Heart, Menu, Search, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LoginModal from "@/components/landing/LoginModal";

type NavbarProps = {
  onOpenProfile: () => void;
  onOpenMyList?: () => void;
  onOpenGenres: () => void;
};

export default function Navbar({
  onOpenProfile,
  onOpenMyList,
  onOpenGenres,
}: NavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080812]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/25">
              <Film className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-black leading-none text-white">
                AnimeStreamer
              </h1>
              <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                Watch animated videos online
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            <button className="transition hover:text-white">Browse</button>
            <button className="transition hover:text-white">Trending</button>
            <button className="transition hover:text-white">New Releases</button>
            <button onClick={onOpenGenres} className="transition hover:text-white">
              Genres
            </button>
          </nav>

          <div className="mx-auto hidden w-full max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 md:flex">
            <Search className="h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search anime..."
              className="h-9 border-0 bg-transparent text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              onClick={onOpenMyList}
              size="icon"
              variant="ghost"
              className="hidden rounded-2xl bg-white/10 text-white hover:bg-white/15 hover:text-white sm:inline-flex"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-2xl bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hidden rounded-2xl bg-white/10 text-white hover:bg-white/15 hover:text-white sm:inline-flex"
                >
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onOpenProfile}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setLoginOpen(true)}
                  className="font-semibold text-fuchsia-500 focus:bg-fuchsia-500/10 focus:text-fuchsia-400"
                >
                  LogIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-2xl bg-white/10 text-white hover:bg-white/15 hover:text-white lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent className="border-white/10 bg-[#090918] text-white">
                <div className="mt-8 space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-white">
                    Browse
                  </Button>

                  <Button variant="ghost" className="w-full justify-start text-white">
                    Trending
                  </Button>

                  <Button variant="ghost" className="w-full justify-start text-white">
                    New Releases
                  </Button>

                  <Button
                    onClick={onOpenGenres}
                    variant="ghost"
                    className="w-full justify-start text-white"
                  >
                    Genres
                  </Button>

                  <Button
                    onClick={onOpenProfile}
                    variant="ghost"
                    className="w-full justify-start text-white"
                  >
                    Profile
                  </Button>

                  <Button
                    onClick={() => setLoginOpen(true)}
                    className="w-full justify-start rounded-2xl bg-fuchsia-500 text-white hover:bg-fuchsia-600"
                  >
                    LogIn
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="px-4 pb-4 md:hidden">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2">
            <Search className="h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search anime..."
              className="h-9 border-0 bg-transparent text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
            />
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
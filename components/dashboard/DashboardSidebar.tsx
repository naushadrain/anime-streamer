// components/dashboard/DashboardSidebar.tsx

"use client";

import {
  Clapperboard,
  Film,
  LayoutDashboard,
  MessageCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Video,
  X,ImageIcon
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Videos",
    icon: Video,
    active: false,
  },
  {
    title: "Hero Sliders",
    href: "/dashboard/hero-sliders",
    icon: ImageIcon,
  },
  {
    title: "Categories",
    icon: Film,
    active: false,
  },
  {
    title: "Upload Video",
    icon: Upload,
    active: false,
  },
  {
    title: "Comments",
    icon: MessageCircle,
    active: false,
  },
  {
    title: "Users",
    icon: Users,
    active: false,
  },
  {
    title: "Roles & Permissions",
    icon: ShieldCheck,
    active: false,
  },
  {
    title: "Settings",
    icon: Settings,
    active: false,
  },
];

type DashboardSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
}: DashboardSidebarProps) {
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#090918] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-fuchsia-500/25">
              <img
                src="/logo.png"
                alt="Flox Anime India Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-xl font-black leading-none">
                Flox Anime
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Video Management
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2 px-4 py-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  item.active
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/20">
              <Sparkles className="h-5 w-5 text-fuchsia-300" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Premium Studio
              </p>
              <p className="text-xs text-slate-400">
                Manage your anime platform
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
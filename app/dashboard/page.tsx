// app/dashboard/page.tsx

"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Clapperboard,
  Film,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Users,
  Video,
  X,
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

const videos = [
  {
    id: 1,
    title: "Shadow Blade: The Last Moon",
    category: "Action",
    views: "24.5K",
    status: "Active",
    duration: "24m",
    date: "02 Jun 2026",
  },
  {
    id: 2,
    title: "Cyber Samurai: Neon City",
    category: "Sci-Fi",
    views: "18.2K",
    status: "Pending",
    duration: "18m",
    date: "01 Jun 2026",
  },
  {
    id: 3,
    title: "The Lost Dragon Kingdom",
    category: "Fantasy",
    views: "9.8K",
    status: "Active",
    duration: "32m",
    date: "28 May 2026",
  },
  {
    id: 4,
    title: "Dream Hunter Academy",
    category: "Anime",
    views: "12.1K",
    status: "Inactive",
    duration: "21m",
    date: "25 May 2026",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#070713] text-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#090918] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/30">
              <Clapperboard className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-black leading-none">
                AnimeAdmin
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

      {/* Main Content */}
      <section className="lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070713]/80 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-2xl bg-white/10 p-3 text-white hover:bg-white/20 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <h2 className="text-xl font-black lg:text-2xl">
                  Dashboard
                </h2>
                <p className="hidden text-sm text-slate-400 sm:block">
                  Welcome back, manage your anime video platform.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-12 w-80 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 md:flex">
                <Search className="mr-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search videos, users..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <button
                type="button"
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-fuchsia-500" />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setProfileDropdownOpen((prev) => !prev)
                  }
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <User className="h-5 w-5 text-white" />
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-bold text-white">
                      Test User
                    </p>
                    <p className="text-xs text-slate-400">Admin</p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111122] shadow-2xl">
                    <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
                      <User className="h-4 w-4" />
                      Profile
                    </button>

                    <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>

                    <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-8 p-5 lg:p-8">
          {/* Stats Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Videos</p>
                  <h3 className="mt-2 text-3xl font-black">128</h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
                  <Video className="h-7 w-7 text-violet-300" />
                </div>
              </div>

              <p className="mt-5 text-sm text-green-400">
                +12 new this month
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Views</p>
                  <h3 className="mt-2 text-3xl font-black">1.2M</h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/20">
                  <PlayCircle className="h-7 w-7 text-fuchsia-300" />
                </div>
              </div>

              <p className="mt-5 text-sm text-green-400">
                +18.4% from last week
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Users</p>
                  <h3 className="mt-2 text-3xl font-black">8,430</h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/20">
                  <Users className="h-7 w-7 text-sky-300" />
                </div>
              </div>

              <p className="mt-5 text-sm text-green-400">
                +320 registered today
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Pending Reviews</p>
                  <h3 className="mt-2 text-3xl font-black">14</h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20">
                  <ShieldCheck className="h-7 w-7 text-orange-300" />
                </div>
              </div>

              <p className="mt-5 text-sm text-orange-400">
                Need admin approval
              </p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid gap-8 xl:grid-cols-3">
            {/* Videos Table */}
            <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl">
              <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-black">Recent Videos</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Latest uploaded animation videos
                  </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-90">
                  <Upload className="h-4 w-4" />
                  Upload Video
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-sm text-slate-400">
                      <th className="px-6 py-4 font-semibold">Video</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Views</th>
                      <th className="px-6 py-4 font-semibold">Duration</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {videos.map((video) => (
                      <tr
                        key={video.id}
                        className="border-b border-white/5 text-sm transition hover:bg-white/[0.03]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30">
                              <PlayCircle className="h-6 w-6 text-white" />
                            </div>

                            <div>
                              <p className="font-bold text-white">
                                {video.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: #{video.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {video.category}
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {video.views}
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {video.duration}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              video.status === "Active"
                                ? "bg-green-500/15 text-green-400"
                                : video.status === "Pending"
                                ? "bg-orange-500/15 text-orange-400"
                                : "bg-red-500/15 text-red-400"
                            }`}
                          >
                            {video.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-400">
                          {video.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
                <h3 className="text-xl font-black">Quick Actions</h3>

                <div className="mt-5 space-y-3">
                  <button className="flex w-full items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-4 text-left transition hover:bg-white/10">
                    <Upload className="h-5 w-5 text-fuchsia-300" />
                    <span className="font-semibold">Upload New Video</span>
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-4 text-left transition hover:bg-white/10">
                    <Film className="h-5 w-5 text-sky-300" />
                    <span className="font-semibold">Create Category</span>
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-4 text-left transition hover:bg-white/10">
                    <Users className="h-5 w-5 text-green-300" />
                    <span className="font-semibold">Manage Users</span>
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-4 text-left transition hover:bg-white/10">
                    <Home className="h-5 w-5 text-orange-300" />
                    <span className="font-semibold">Back to Website</span>
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
                <h3 className="text-xl font-black">Recent Activity</h3>

                <div className="mt-5 space-y-5">
                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-green-400" />
                    <div>
                      <p className="text-sm font-semibold">
                        New video approved
                      </p>
                      <p className="text-xs text-slate-400">
                        Shadow Blade is now active
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-orange-400" />
                    <div>
                      <p className="text-sm font-semibold">
                        Video waiting review
                      </p>
                      <p className="text-xs text-slate-400">
                        Cyber Samurai needs approval
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-fuchsia-400" />
                    <div>
                      <p className="text-sm font-semibold">
                        New user registered
                      </p>
                      <p className="text-xs text-slate-400">
                        320 new users today
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-sky-400" />
                    <div>
                      <p className="text-sm font-semibold">
                        Category updated
                      </p>
                      <p className="text-xs text-slate-400">
                        Fantasy category edited
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
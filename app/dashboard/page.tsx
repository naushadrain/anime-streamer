// app/dashboard/page.tsx

"use client";

import {
  Film,
  Home,
  PlayCircle,
  ShieldCheck,
  Upload,
  Users,
  Video,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

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
  return (
    <DashboardLayout>
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

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl xl:col-span-2">
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
    </DashboardLayout>
  );
}
// components/dashboard/DashboardTopbar.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import { toast } from "sonner";

type DashboardTopbarProps = {
  setSidebarOpen: (open: boolean) => void;
};

export default function DashboardTopbar({
  setSidebarOpen,
}: DashboardTopbarProps) {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roleId");

    toast.success("Logout successful");
    router.push("/");
  };

  return (
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
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
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

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
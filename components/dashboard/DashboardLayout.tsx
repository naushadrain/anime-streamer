// components/dashboard/DashboardLayout.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070713] text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-500" />
          <p className="mt-4 text-sm text-slate-400">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070713] text-white">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <section className="lg:pl-72">
        <DashboardTopbar setSidebarOpen={setSidebarOpen} />

        <div className="space-y-8 p-5 lg:p-8">{children}</div>
      </section>
    </main>
  );
}
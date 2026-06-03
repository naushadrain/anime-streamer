// app/dashboard/hero-sliders/page.tsx

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  ImageIcon,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

type HeroSlider = {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  rating: string;
  votes: string;
  episodes: string;
  studio: string | null;
  director: string | null;
  duration: string;
  image: string;
  status: number;
  sort_order: number;
};

type FormState = {
  title: string;
  description: string;
  category: string;
  year: string;
  rating: string;
  votes: string;
  episodes: string;
  studio: string;
  director: string;
  duration: string;
  sort_order: string;
  status: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  category: "",
  year: "2026",
  rating: "9.0",
  votes: "0",
  episodes: "12",
  studio: "",
  director: "",
  duration: "24m",
  sort_order: "0",
  status: "1",
};

export default function HeroSlidersPage() {
  const [sliders, setSliders] = useState<HeroSlider[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const apiUrl = useMemo(() => {
    return `${baseUrl}/api/hero-sliders`;
  }, [baseUrl]);

  const fetchSliders = async () => {
    try {
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        toast.error(result.message || "Failed to fetch hero sliders");
        return;
      }

      setSliders(result.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while loading sliders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, [apiUrl]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
    onDropRejected: () => {
      toast.error("Only JPG, PNG, WEBP images below 5MB are allowed");
    },
  });

  const updateForm = (key: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!form.category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!form.year.trim()) {
      toast.error("Year is required");
      return;
    }

    if (!form.duration.trim()) {
      toast.error("Duration is required");
      return;
    }

    if (!imageFile) {
      toast.error("Slider image is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("year", form.year);
      formData.append("rating", form.rating);
      formData.append("votes", form.votes);
      formData.append("episodes", form.episodes);
      formData.append("studio", form.studio);
      formData.append("director", form.director);
      formData.append("duration", form.duration);
      formData.append("sort_order", form.sort_order);
      formData.append("status", form.status);
      formData.append("image", imageFile);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        toast.error(result.message || "Failed to create slider");
        return;
      }

      toast.success("Hero slider created successfully");

      resetForm();
      fetchSliders();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving slider");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Hero Sliders</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create and manage homepage slider banners.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchSliders}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/20">
              <Plus className="h-6 w-6 text-fuchsia-300" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Add New Slider
              </h2>
              <p className="text-sm text-slate-400">
                Upload image and enter slider details.
              </p>
            </div>
          </div>

          <div
            {...getRootProps()}
            className={`mb-6 flex min-h-[240px] cursor-default flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed p-5 text-center transition ${
              isDragActive
                ? "border-fuchsia-400 bg-fuchsia-500/10"
                : "border-white/10 bg-black/20"
            }`}
          >
            <input {...getInputProps()} />

            {imagePreview ? (
              <div className="relative h-full w-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-[240px] w-full rounded-2xl object-cover"
                />

                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-fuchsia-500/20">
                  <UploadCloud className="h-8 w-8 text-fuchsia-300" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  Drag & drop slider image
                </h3>

                <p className="mt-2 max-w-sm text-sm text-slate-400">
                  Recommended size: 1600x900. Supported: JPG, PNG, WEBP. Max
                  size 5MB.
                </p>

                <button
                  type="button"
                  onClick={open}
                  className="mt-5 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20 hover:opacity-90"
                >
                  Choose Image
                </button>
              </>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Enter slider title"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Enter description"
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Category
              </label>
              <input
                value={form.category}
                onChange={(e) => updateForm("category", e.target.value)}
                placeholder="Action"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Year
              </label>
              <input
                value={form.year}
                onChange={(e) => updateForm("year", e.target.value)}
                placeholder="2026"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Rating
              </label>
              <input
                value={form.rating}
                onChange={(e) => updateForm("rating", e.target.value)}
                placeholder="9.5"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Votes
              </label>
              <input
                value={form.votes}
                onChange={(e) => updateForm("votes", e.target.value)}
                placeholder="2.5K"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Episodes
              </label>
              <input
                value={form.episodes}
                onChange={(e) => updateForm("episodes", e.target.value)}
                placeholder="12"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Duration
              </label>
              <input
                value={form.duration}
                onChange={(e) => updateForm("duration", e.target.value)}
                placeholder="24m"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Studio
              </label>
              <input
                value={form.studio}
                onChange={(e) => updateForm("studio", e.target.value)}
                placeholder="Nova Animation"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Director
              </label>
              <input
                value={form.director}
                onChange={(e) => updateForm("director", e.target.value)}
                placeholder="Akira Tanabe"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => updateForm("sort_order", e.target.value)}
                placeholder="1"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => updateForm("status", e.target.value)}
                className="h-12 w-full rounded-2xl border border-white/10 bg-[#111122] px-4 text-sm text-white outline-none focus:border-fuchsia-500"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Slider
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="inline-flex h-13 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-xl font-black text-white">Slider List</h2>
            <p className="mt-1 text-sm text-slate-400">
              All homepage hero sliders from database.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-fuchsia-400" />
                <p className="mt-3 text-sm text-slate-400">
                  Loading sliders...
                </p>
              </div>
            </div>
          ) : sliders.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center px-6 text-center">
              <div>
                <ImageIcon className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-3 text-sm text-slate-400">
                  No hero sliders found.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-h-[850px] space-y-4 overflow-y-auto p-6">
              {sliders.map((slider) => (
                <div
                  key={slider.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-black/20"
                >
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="line-clamp-1 text-lg font-black text-white">
                          {slider.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {slider.category} • {slider.year} •{" "}
                          {slider.duration}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          slider.status === 1
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {slider.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="line-clamp-2 text-sm leading-6 text-slate-400">
                      {slider.description}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-2xl bg-white/[0.05] p-3">
                        <p className="text-xs text-slate-500">Rating</p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {slider.rating}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/[0.05] p-3">
                        <p className="text-xs text-slate-500">Votes</p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {slider.votes}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/[0.05] p-3">
                        <p className="text-xs text-slate-500">Order</p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {slider.sort_order}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
// app/dashboard/upload-video/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Clapperboard,
  Eye,
  Film,
  Hash,
  ImageIcon,
  LinkIcon,
  Loader2,
  PlayCircle,
  Save,
  User,
} from "lucide-react";
import { toast } from "sonner";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

const videoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(191)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and use hyphens only"),
  description: z.string().optional(),
  videoUrl: z.string().min(1, "Video URL is required").url("Enter a valid video URL"),
  thumbnailUrl: z.string().optional().refine((value) => !value || z.string().url().safeParse(value).success, {
    message: "Enter a valid thumbnail URL",
  }),
  duration: z
    .string()
    .optional()
    .refine((value) => !value || Number(value) >= 0, {
      message: "Duration must be a valid number",
    }),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
  userId: z.string().min(1, "User ID is required"),
  categoryId: z.string().optional(),
});

type VideoFormValues = z.infer<typeof videoSchema>;

export default function UploadVideoPage() {
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      duration: "",
      status: "PENDING",
      userId: "",
      categoryId: "",
    },
  });

  const title = watch("title");
  const videoUrl = watch("videoUrl");
  const thumbnailUrl = watch("thumbnailUrl");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user?.id) {
          setValue("userId", user.id);
        }
      } catch {
        console.log("User parse failed");
      }
    }
  }, [setValue]);

  useEffect(() => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setValue("slug", slug);
  }, [title, setValue]);

  const onSubmit = async (data: VideoFormValues) => {
    try {
      setSaving(true);

      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          duration: data.duration ? Number(data.duration) : null,
          thumbnailUrl: data.thumbnailUrl || null,
          categoryId: data.categoryId || null,
          description: data.description || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        toast.error(result.message || "Failed to create video");
        return;
      }

      toast.success("Video created successfully");

      reset({
        title: "",
        slug: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        duration: "",
        status: "PENDING",
        userId: data.userId,
        categoryId: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating video");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Create Video</h1>
          <p className="mt-2 text-sm text-slate-400">
            Add video using URL, thumbnail URL, category, user, and status.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-3 text-sm font-semibold text-fuchsia-300">
          <Clapperboard className="h-5 w-5" />
          URL Based Video Entry
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-full">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/20">
              <Film className="h-6 w-6 text-fuchsia-300" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">Video Details</h2>
              <p className="text-sm text-slate-400">
                Fill all fields according to your videos table.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Title
              </label>
              <input
                {...register("title")}
                placeholder="Shadow Blade: The Last Moon"
                className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
              {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Slug
              </label>
              <input
                {...register("slug")}
                placeholder="shadow-blade-the-last-moon"
                className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
              {errors.slug && <p className="mt-2 text-sm text-red-400">{errors.slug.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Write video description..."
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Video URL
              </label>
              <div className="flex h-13 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-fuchsia-500">
                <LinkIcon className="mr-3 h-5 w-5 text-slate-500" />
                <input
                  {...register("videoUrl")}
                  placeholder="https://example.com/video.mp4"
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              {errors.videoUrl && (
                <p className="mt-2 text-sm text-red-400">{errors.videoUrl.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Thumbnail URL
              </label>
              <div className="flex h-13 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-fuchsia-500">
                <ImageIcon className="mr-3 h-5 w-5 text-slate-500" />
                <input
                  {...register("thumbnailUrl")}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              {errors.thumbnailUrl && (
                <p className="mt-2 text-sm text-red-400">{errors.thumbnailUrl.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Duration
              </label>
              <input
                type="number"
                {...register("duration")}
                placeholder="24"
                className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-500"
              />
              {errors.duration && (
                <p className="mt-2 text-sm text-red-400">{errors.duration.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Status
              </label>
              <select
                {...register("status")}
                className="h-13 w-full rounded-2xl border border-white/10 bg-[#111122] px-4 text-sm text-white outline-none focus:border-fuchsia-500"
              >
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              {errors.status && <p className="mt-2 text-sm text-red-400">{errors.status.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                User ID
              </label>
              <div className="flex h-13 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-fuchsia-500">
                <User className="mr-3 h-5 w-5 text-slate-500" />
                <input
                  {...register("userId")}
                  placeholder="user_001"
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              {errors.userId && <p className="mt-2 text-sm text-red-400">{errors.userId.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Category ID
              </label>
              <div className="flex h-13 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-fuchsia-500">
                <Hash className="mr-3 h-5 w-5 text-slate-500" />
                <input
                  {...register("categoryId")}
                  placeholder="category_001"
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              {errors.categoryId && (
                <p className="mt-2 text-sm text-red-400">{errors.categoryId.message}</p>
              )}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                  Create Video
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                reset({
                  title: "",
                  slug: "",
                  description: "",
                  videoUrl: "",
                  thumbnailUrl: "",
                  duration: "",
                  status: "PENDING",
                  userId: watch("userId"),
                  categoryId: "",
                })
              }
              className="inline-flex h-13 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
// components/landing/ProfileModal.tsx

"use client";

import { useState } from "react";
import { CheckCircle, Pencil, UserCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProfileModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl border-white/10 bg-[#090918] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-black">
            <UserCircle className="h-7 w-7" />
            My Profile
          </DialogTitle>
        </DialogHeader>

        {!editMode ? (
          <div>
            <div className="mb-6 text-center">
              <UserCircle className="mx-auto h-24 w-24 text-fuchsia-400" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ProfileInfo label="Name" value="Guest User" />
              <ProfileInfo label="Email" value="guest@animestreamer.com" />
              <ProfileInfo label="Country" value="Nepal" />
              <ProfileInfo label="Language" value="English" />
              <ProfileInfo label="Watch History" value="0" />
              <ProfileInfo label="My List" value="0" />
            </div>

            <Button
              onClick={() => setEditMode(true)}
              className="mt-6 rounded-2xl bg-fuchsia-500 text-white hover:bg-fuchsia-600"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input className="rounded-2xl border-white/10 bg-white/10 text-white" placeholder="Full Name" />
            <Input className="rounded-2xl border-white/10 bg-white/10 text-white" placeholder="Email Address" />
            <Input className="rounded-2xl border-white/10 bg-white/10 text-white" placeholder="Country" />
            <Input className="rounded-2xl border-white/10 bg-white/10 text-white" placeholder="Preferred Language" />

            <div className="flex gap-3">
              <Button
                onClick={() => setEditMode(false)}
                className="rounded-2xl bg-fuchsia-500 text-white hover:bg-fuchsia-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Changes
              </Button>

              <Button
                onClick={() => setEditMode(false)}
                variant="outline"
                className="rounded-2xl border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-fuchsia-300">{value}</p>
    </div>
  );
}
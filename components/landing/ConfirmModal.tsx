// components/landing/ConfirmModal.tsx

"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onOpenChange,
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-white/10 bg-[#090918] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <AlertTriangle className={danger ? "text-red-500" : "text-yellow-400"} />
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-slate-300">{message}</p>

        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            className={
              danger
                ? "rounded-2xl bg-red-600 text-white hover:bg-red-700"
                : "rounded-2xl bg-fuchsia-500 text-white hover:bg-fuchsia-600"
            }
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
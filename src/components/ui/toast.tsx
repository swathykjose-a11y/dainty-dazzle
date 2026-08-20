"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Toast Types ─────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "info" | "error";

export interface ToastAction {
  label: string;
  href: string;
}

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
  productImage?: string;
  productTitle?: string;
  action?: ToastAction;
  duration?: number;
}

interface ToastOptions {
  variant?: ToastVariant;
  productImage?: string;
  productTitle?: string;
  action?: ToastAction;
  duration?: number;
}

// ─── Global Listener Registry ────────────────────────────────────────────────

let toastListeners: Array<(toast: ToastData) => void> = [];

/** Call from anywhere (client-side) to show a custom toast */
export function showToast(message: string, options?: ToastOptions) {
  const toast: ToastData = {
    id: crypto.randomUUID(),
    message,
    variant: options?.variant ?? "success",
    productImage: options?.productImage,
    productTitle: options?.productTitle,
    action: options?.action,
    duration: options?.duration ?? 4000,
  };
  toastListeners.forEach((fn) => fn(toast));
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-600 shrink-0"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-charcoal/60 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ─── Individual Toast ────────────────────────────────────────────────────────

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 4000;

  const dismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  }, [onDismiss, toast.id]);

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [dismiss, duration]);

  // Progress bar animation
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  const variantIcon = {
    success: <CheckIcon />,
    info: <InfoIcon />,
    error: <ErrorIcon />,
  };

  const progressColor = {
    success: "bg-emerald-500/60",
    info: "bg-charcoal/20",
    error: "bg-red-400/60",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        pointer-events-auto relative overflow-hidden
        bg-card-white backdrop-blur-sm
        border border-sage-border/80
        rounded-lg shadow-lg shadow-charcoal/8
        w-[340px] max-w-[calc(100vw-2rem)]
        transition-all duration-300 ease-out
        ${isExiting ? "toast-exit" : "toast-enter"}
      `}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Product image thumbnail */}
        {toast.productImage ? (
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-sage-canvas shrink-0 border border-sage-border/50">
            <Image
              src={toast.productImage}
              alt={toast.productTitle || "Product"}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          /* Variant icon when no product image */
          <div className="w-8 h-8 rounded-full bg-sage-canvas flex items-center justify-center shrink-0 mt-0.5">
            {variantIcon[toast.variant ?? "success"]}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          {toast.productTitle && (
            <p className="font-secondary text-sm text-charcoal font-normal tracking-tight leading-tight truncate">
              {toast.productTitle}
            </p>
          )}
          <p
            className={`font-primary text-xs leading-relaxed ${
              toast.productTitle ? "text-sage-muted mt-0.5" : "text-charcoal/80"
            }`}
          >
            {toast.message}
          </p>

          {/* Action button */}
          {toast.action && (
            <Link
              href={toast.action.href}
              className="
                inline-flex items-center gap-1.5 mt-2.5
                text-[10px] font-primary font-medium uppercase tracking-[0.16em]
                text-charcoal bg-sage-canvas/80 hover:bg-sage-canvas
                border border-sage-border/60 hover:border-charcoal/30
                px-3 py-1.5 rounded-sm
                transition-all duration-200
              "
            >
              {toast.action.label}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={dismiss}
          className="
            shrink-0 p-1 -mr-1 -mt-1
            text-charcoal/30 hover:text-charcoal/70
            transition-colors duration-150 cursor-pointer
          "
          aria-label="Dismiss notification"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] w-full bg-sage-border/30">
        <div
          className={`h-full ${progressColor[toast.variant ?? "success"]} transition-none`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Toast Container ─────────────────────────────────────────────────────────

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: ToastData) => {
    setToasts((prev) => {
      // Limit to 3 visible toasts max
      const next = [...prev, toast];
      return next.length > 3 ? next.slice(-3) : next;
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== addToast);
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[100] flex flex-col-reverse gap-2.5 sm:bottom-6 sm:right-6"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
}

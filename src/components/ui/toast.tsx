"use client";

import { useEffect, useState, useCallback } from "react";

interface Toast {
  id: string;
  message: string;
}

let toastListeners: Array<(toast: Toast) => void> = [];

/** Call from anywhere (client-side) to show a toast */
export function showToast(message: string) {
  const toast: Toast = { id: crypto.randomUUID(), message };
  toastListeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== addToast);
    };
  }, [addToast]);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="
            pointer-events-auto
            bg-parchment text-umber font-primary text-sm
            px-4 py-3 rounded-sm border-l-[3px] border-l-gilt
            shadow-sm
            animate-[slideIn_0.25s_ease-out]
          "
          role="status"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

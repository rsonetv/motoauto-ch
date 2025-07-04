'use client';

import React from 'react';
import { useToast, type Toast } from './use-toast';

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 w-full max-w-sm p-4 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg p-4 shadow-lg ${
            toast.variant === 'destructive' 
              ? 'bg-red-600 text-white' 
              : toast.variant === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-white border shadow-md'
          }`}
        >
          {toast.title && (
            <div className="font-semibold">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm">{toast.description}</div>
          )}
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-xs opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

// Export jako named export
export { toast } from './use-toast';

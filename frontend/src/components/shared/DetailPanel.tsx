"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}

export default function DetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "sm:w-[480px]",
}: DetailPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
          />

          {/* Panel Slide In */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className={`relative w-full ${width} bg-white h-full shadow-2xl flex flex-col justify-between z-50 p-6 overflow-y-auto border-l border-stone-200`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-stone-900 leading-tight">{title}</h3>
                  {subtitle && <p className="text-[12px] text-stone-500 mt-0.5">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="pt-2">{children}</div>
            </div>

            <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-end">
              <button
                onClick={onClose}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[12px] font-medium px-4 py-2 rounded-lg transition"
              >
                Close Panel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

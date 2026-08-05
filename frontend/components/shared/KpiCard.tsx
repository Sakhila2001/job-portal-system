"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface KpiCardProps {
  title: string;
  value: string | number;
  trendDelta?: string;
  trendDirection?: "up" | "down" | "neutral" | "good";
  subtitle?: string;
  index?: number;
  className?: string;
  icon?: React.ElementType;
}

export default function KpiCard({
  title,
  value,
  trendDelta,
  trendDirection = "neutral",
  subtitle,
  index = 0,
  className = "",
  icon: Icon,
}: KpiCardProps) {
  const getTrendColor = () => {
    if (trendDirection === "up" || trendDirection === "good") return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (trendDirection === "down") return "text-rose-600 bg-rose-50 border-rose-200";
    return "text-stone-600 bg-stone-100 border-stone-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className={`bg-white border border-stone-200 rounded-xl p-5 shadow-2xs hover:border-stone-300 transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-stone-500 truncate">{title}</span>
        {Icon && (
          <div className="p-1.5 rounded-md bg-stone-100 text-stone-600 shrink-0">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <div className="text-[24px] font-semibold tracking-tight text-stone-900 font-mono tabular-nums">
          {value}
        </div>
      </div>

      {(trendDelta || subtitle) && (
        <div className="mt-2 flex items-center justify-between text-[11px] font-medium">
          {trendDelta ? (
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${getTrendColor()}`}>
              {trendDirection === "up" && <TrendingUp className="h-3 w-3" />}
              {trendDirection === "down" && <TrendingDown className="h-3 w-3" />}
              {trendDirection === "neutral" && <Minus className="h-3 w-3" />}
              <span>{trendDelta}</span>
            </span>
          ) : <span />}
          
          {subtitle && <span className="text-stone-400 font-normal truncate">{subtitle}</span>}
        </div>
      )}
    </motion.div>
  );
}

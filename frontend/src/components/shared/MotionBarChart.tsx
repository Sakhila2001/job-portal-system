"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface BarDataItem {
  label: string;
  value: number;
  color?: string;
}

interface MotionBarChartProps {
  title: string;
  subtitle?: string;
  data: BarDataItem[];
  unit?: string;
  className?: string;
  /** Height of the chart area in px */
  chartHeight?: number;
  /** Colour for all bars (override per-bar color) */
  barColor?: string;
  /** Show value labels above each bar */
  showValueLabels?: boolean;
  /** Animate on first scroll-into-view */
  animateOnView?: boolean;
}

export default function MotionBarChart({
  title,
  subtitle,
  data,
  unit = "",
  className = "",
  chartHeight = 140,
  barColor = "#0F172A",
  showValueLabels = true,
  animateOnView = true,
}: MotionBarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [shouldAnimate, setShouldAnimate] = useState(!animateOnView);

  useEffect(() => {
    if (inView) setShouldAnimate(true);
  }, [inView]);

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      ref={ref}
      className={`bg-white border border-stone-200 rounded-xl p-4 shadow-2xs ${className}`}
    >
      <div className="mb-3">
        <h4 className="text-[13px] font-medium text-stone-900">{title}</h4>
        {subtitle && <p className="text-[11px] text-stone-400 mt-0.5">{subtitle}</p>}
      </div>

      <div
        className="flex items-end gap-1.5"
        style={{ height: chartHeight }}
      >
        {data.map((item, idx) => {
          const heightPct = (item.value / max) * 100;
          const color = item.color ?? barColor;

          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
            >
              {/* Value label */}
              {showValueLabels && (
                <motion.span
                  className="text-[10px] font-mono font-semibold text-stone-700 leading-none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.05 + 0.3, duration: 0.2 }}
                >
                  {item.value}{unit}
                </motion.span>
              )}

              {/* Bar */}
              <motion.div
                className="w-full rounded-t-md relative overflow-hidden"
                style={{ backgroundColor: color, opacity: 0.15 + (heightPct / 100) * 0.85 }}
                initial={{ height: 0 }}
                animate={shouldAnimate ? { height: `${heightPct}%` } : { height: 0 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Shimmer highlight on top */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-md"
                  style={{ backgroundColor: color, opacity: 0.9 }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex gap-1.5 mt-1.5">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex-1 text-center text-[10px] text-stone-400 font-mono truncate"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  bars: { key: string; name: string; color: string }[];
  xAxisKey: string;
  className?: string;
  height?: number;
}

export default function ChartCard({
  title,
  subtitle,
  data,
  bars,
  xAxisKey,
  className = "",
  height = 240,
}: ChartCardProps) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-medium text-stone-900">{title}</h3>
          {subtitle && <p className="text-[12px] text-stone-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#78716C" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#78716C" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E7E5E4",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: "11px", paddingTop: "-10px" }}
            />
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.name}
                fill={bar.color}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

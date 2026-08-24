"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronLeft, ChevronRight, Calendar, Clock,
  User, Video, Bell, BellOff, CalendarDays,
} from "lucide-react";
import { InterviewDetail } from "@/lib/types";

// ── Bikram Sambat Conversion ────────────────────────────────────────────────
// Month lengths per BS year: [Baishakh, Jestha, Ashadh, Shrawan, Bhadra, Ashwin,
//                             Kartik, Mangsir, Poush, Magh, Falgun, Chaitra]
const BS_YEAR_DATA: Record<number, number[]> = {
  2079: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2083: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
};

const BS_MONTH_EN = [
  "Baishakh","Jestha","Ashadh","Shrawan",
  "Bhadra","Ashwin","Kartik","Mangsir",
  "Poush","Magh","Falgun","Chaitra",
];

// Reference: BS 2082 Baishakh 1 = AD 2025 April 14
const REF_AD = new Date(2025, 3, 14);

function adToBS(adDate: Date): { year: number; month: number; day: number; monthName: string } {
  const totalDays = Math.round((adDate.getTime() - REF_AD.getTime()) / 86400000);
  let year = 2082;
  let month = 0; // 0 = Baishakh
  let day = 1 + totalDays;

  // Normalise forward
  while (day > (BS_YEAR_DATA[year]?.[month] ?? 30)) {
    day -= BS_YEAR_DATA[year]?.[month] ?? 30;
    month++;
    if (month >= 12) { month = 0; year++; }
  }
  // Normalise backward
  while (day < 1) {
    month--;
    if (month < 0) { month = 11; year--; }
    day += BS_YEAR_DATA[year]?.[month] ?? 30;
  }

  return { year, month, day, monthName: BS_MONTH_EN[month] };
}

// ── Component ───────────────────────────────────────────────────────────────
interface Props {
  interviews: InterviewDetail[];
}

const AD_MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["S","M","T","W","T","F","S"];

function parseInterviewDate(dateStr: string): Date | null {
  const months: Record<string, number> = {
    Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,
    Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11,
  };
  const m = dateStr.match(/^(\w+)\s+(\d+),\s+(\d+)$/);
  if (!m) return null;
  const month = months[m[1]];
  if (month === undefined) return null;
  return new Date(parseInt(m[3]), month, parseInt(m[2]));
}

export default function ApplicationCalendar({ interviews }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [reminderState, setReminderState] = useState<Record<string, boolean>>(
    interviews.reduce(
      (acc, i) => ({ ...acc, [i.id]: i.reminderSet }),
      {} as Record<string, boolean>
    )
  );

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  // Map day-of-month -> interviews this month
  const eventsByDay = useMemo(() => {
    const map: Record<number, InterviewDetail[]> = {};
    for (const inv of interviews) {
      const d = parseInterviewDate(inv.date);
      if (d && d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(inv);
      }
    }
    return map;
  }, [interviews, viewYear, viewMonth]);

  // Build grid cells
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = Array.from({ length: totalCells }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  const isToday = (day: number | null) =>
    day !== null &&
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] ?? []) : [];

  // BS info for selected day
  const selectedBS = selectedDay
    ? adToBS(new Date(viewYear, viewMonth, selectedDay))
    : null;

  return (
    <div className="flex flex-col sm:flex-row gap-0 sm:gap-5 min-h-[360px]">

      {/* ── Left: Calendar grid ─────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <p className="text-[13px] font-bold text-stone-900">
              {AD_MONTH_NAMES[viewMonth]} {viewYear}
            </p>
            {/* Show BS month range for the view */}
            <p className="text-[10px] text-stone-400 font-medium">
              {adToBS(new Date(viewYear, viewMonth, 1)).monthName}{" "}
              {adToBS(new Date(viewYear, viewMonth, 1)).year} BS
            </p>
          </div>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_NAMES.map((d, i) => (
            <div key={i} className="text-center text-[10px] font-bold text-stone-400 uppercase py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-px">
          {cells.map((day, idx) => {
            const hasEvents = day !== null && !!eventsByDay[day];
            const eventCount = day !== null ? (eventsByDay[day]?.length ?? 0) : 0;
            const isSelected = day !== null && day === selectedDay;
            const todayFlag = isToday(day);

            // Compute BS day for this cell
            const bsDay = day !== null
              ? adToBS(new Date(viewYear, viewMonth, day)).day
              : null;

            return (
              <button
                key={idx}
                disabled={day === null}
                onClick={() => {
                  if (day === null) return;
                  setSelectedDay(isSelected ? null : day);
                }}
                className={[
                  "relative flex flex-col items-center justify-start pt-1.5 pb-1 rounded-xl transition-all min-h-[52px]",
                  day === null ? "pointer-events-none" : "cursor-pointer",
                  isSelected
                    ? "bg-stone-900 text-white"
                    : todayFlag
                    ? "bg-stone-100 text-stone-900 ring-2 ring-stone-400/30"
                    : day !== null
                    ? "hover:bg-stone-100 text-stone-800"
                    : "",
                ].join(" ")}
              >
                {day !== null && (
                  <>
                    {/* AD date */}
                    <span className="text-[12px] font-bold leading-none">{day}</span>
                    {/* BS date */}
                    <span className={`text-[9px] font-medium leading-none mt-0.5 ${isSelected ? "text-white/60" : "text-stone-400"}`}>
                      {bsDay}
                    </span>
                    {/* Event indicator */}
                    {hasEvents && (
                      <span
                        className={`mt-1 inline-flex items-center justify-center rounded-full text-[8px] font-bold leading-none px-1.5 py-0.5 ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        {eventCount}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-3 text-[10px] text-stone-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 h-3.5 bg-stone-200 rounded-full text-[8px] font-bold text-stone-600 flex items-center justify-center">1</span>
            Event count
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block text-[9px] text-stone-400">32</span>
            BS date
          </span>
        </div>
      </div>

      {/* ── Right: Event detail panel ────────────────────────── */}
      <div className="sm:w-[260px] shrink-0 sm:border-l sm:border-stone-100 sm:pl-5 pt-3 sm:pt-0">
        {selectedDay === null ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full py-10 text-center">
            <CalendarDays className="w-8 h-8 text-stone-300 mb-2" />
            <p className="text-[12px] font-semibold text-stone-400">Select a date</p>
            <p className="text-[11px] text-stone-300 mt-1">to view interview details</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Selected date header */}
            <div className="pb-2 border-b border-stone-100">
              <p className="text-[13px] font-bold text-stone-900">
                {AD_MONTH_NAMES[viewMonth]} {selectedDay}, {viewYear}
              </p>
              {selectedBS && (
                <p className="text-[11px] text-stone-400 font-medium mt-0.5">
                  {selectedBS.monthName} {selectedBS.day}, {selectedBS.year} BS
                </p>
              )}
            </div>

            {/* Events or empty */}
            {selectedEvents.length === 0 ? (
              <div className="py-8 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-1.5 text-stone-300" />
                <p className="text-[11px] font-medium text-stone-400">No interviews this day</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[340px] pr-0.5">
                {selectedEvents.map((inv) => (
                  <div
                    key={inv.id}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2.5"
                  >
                    {/* Company + round */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[12px] font-bold text-stone-900">{inv.companyName}</p>
                        <p className="text-[10px] text-stone-500 font-medium mt-0.5">{inv.jobTitle}</p>
                      </div>
                      <span className="shrink-0 px-1.5 py-0.5 bg-stone-100 border border-stone-200/60 text-[9px] font-extrabold text-stone-600 uppercase tracking-wider rounded-md">
                        {inv.round}
                      </span>
                    </div>

                    {/* Time + interviewer */}
                    <div className="space-y-1 text-[10px] font-mono text-stone-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                        {inv.time}
                      </span>
                      {inv.interviewerName && (
                        <span className="flex items-center gap-1.5 truncate">
                          <User className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">{inv.interviewerName}</span>
                          {inv.interviewerRole && (
                            <span className="text-stone-400 font-sans">({inv.interviewerRole})</span>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      {inv.meetLink && inv.status === "upcoming" && (
                        <a
                          href={inv.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 bg-stone-900 text-white text-[10px] font-bold rounded-lg hover:bg-stone-800 transition active:scale-95"
                        >
                          <Video className="w-3 h-3" />
                          Join Meeting
                        </a>
                      )}
                      <button
                        onClick={() =>
                          setReminderState(s => ({ ...s, [inv.id]: !s[inv.id] }))
                        }
                        className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                          reminderState[inv.id]
                            ? "bg-stone-100 border-stone-300 text-stone-700"
                            : "bg-white border-stone-200 text-stone-400 hover:text-stone-600"
                        }`}
                        title={reminderState[inv.id] ? "Reminder on" : "Set reminder"}
                      >
                        {reminderState[inv.id]
                          ? <Bell className="w-3 h-3 fill-current" />
                          : <BellOff className="w-3 h-3" />
                        }
                      </button>
                      {inv.status === "completed" && (
                        <span className="text-[10px] font-semibold text-stone-400">Completed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}